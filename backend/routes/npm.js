import express from "express";
import { getCache, setCache } from "../utils/redis.js";

const router = express.Router();

const NPM_USER = process.env.NPM_USERNAME || "honeypathkar";
// The day the first package went live. Everything is counted from here, so a
// single range call per package covers the whole history.
const START_DATE = process.env.NPM_STATS_START_DATE || "2026-08-01";
const REGISTRY = "https://registry.npmjs.org";
const DOWNLOADS_API = "https://api.npmjs.org/downloads";

const CACHE_KEY = `cache:npm:downloads:${NPM_USER}`;
const STALE_KEY = `${CACHE_KEY}:stale`;
const CACHE_TTL = Number(process.env.NPM_CACHE_TTL_SECONDS) || 60 * 60 * 24 * 7; // weekly
const PARTIAL_TTL = 60 * 10; // a degraded result must not sit around for a week
const STALE_TTL = 60 * 60 * 24 * 30; // last known-good copy, if npm is unreachable

// npm's downloads API silently clamps any range longer than 18 months. The
// start date above keeps us well inside that today; this only matters years out.
const MAX_SPAN_DAYS = 540;

// api.npmjs.org sits behind Cloudflare and returns 429 (error 1015) very
// readily, so every request goes through one throttled, retrying queue.
const MIN_GAP_MS = 150;
const MAX_RETRIES = 5;

const fmt = (d) => d.toISOString().slice(0, 10);
const addDays = (d, n) => new Date(d.getTime() + n * 86400000);
const daysBetween = (a, b) => Math.round((b - a) / 86400000);
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

let queue = Promise.resolve();

/** Serialises requests with a minimum gap, retrying on throttle/5xx. */
function enqueue(url) {
  const run = queue.then(async () => {
    for (let attempt = 0; ; attempt++) {
      const res = await fetch(url, {
        headers: { accept: "application/json", "user-agent": `portfolio-npm-stats/${NPM_USER}` },
      });

      if (res.ok) {
        const json = await res.json();
        await sleep(MIN_GAP_MS);
        return json;
      }

      // 404 is a real answer: no download data for that package/range.
      if (res.status === 404) {
        await sleep(MIN_GAP_MS);
        return null;
      }

      const retryable = res.status === 429 || res.status >= 500;
      if (!retryable || attempt >= MAX_RETRIES) {
        await sleep(MIN_GAP_MS);
        throw new Error(`${res.status} ${res.statusText} for ${url}`);
      }

      const retryAfter = Number(res.headers.get("retry-after"));
      const backoff = Number.isFinite(retryAfter) && retryAfter > 0
        ? retryAfter * 1000
        : Math.min(500 * 2 ** attempt, 8000) + Math.floor(Math.random() * 250);
      console.warn(`npm: ${res.status} on attempt ${attempt + 1}, backing off ${backoff}ms`);
      await sleep(backoff);
    }
  });

  // Keep the chain alive even when a link rejects.
  queue = run.catch(() => {});
  return run;
}

async function listPackages() {
  // Authoritative and instant — unlike the search index, it has no publish lag.
  try {
    const owned = await enqueue(`${REGISTRY}/-/user/${encodeURIComponent(NPM_USER)}/package`);
    const names = Object.keys(owned || {});
    if (names.length) return names;
  } catch (err) {
    console.error("npm: user package listing failed:", err.message);
  }

  // Fallback: the public search index.
  const search = await enqueue(
    `${REGISTRY}/-/v1/search?text=maintainer:${encodeURIComponent(NPM_USER)}&size=250`
  );
  return (search?.objects || []).map((o) => o.package.name);
}

/** START_DATE → today, split only if it ever outgrows npm's 18-month ceiling. */
function historyWindows(today) {
  const start = new Date(`${START_DATE}T00:00:00Z`);
  if (Number.isNaN(start.getTime())) {
    throw new Error(`Invalid NPM_STATS_START_DATE: ${START_DATE}`);
  }

  const windows = [];
  let cursor = start;
  while (cursor <= today) {
    const end = new Date(Math.min(addDays(cursor, MAX_SPAN_DAYS - 1).getTime(), today.getTime()));
    windows.push([fmt(cursor), fmt(end)]);
    cursor = addDays(end, 1);
  }
  if (windows.length > 1) {
    console.warn(`npm: history now spans ${daysBetween(start, today)} days — using ${windows.length} requests per package`);
  }
  return windows;
}

/**
 * One request per package (today), covering START_DATE → now. The daily array
 * it returns yields the all-time total plus the day/week/month figures, so
 * there is nothing else to fetch.
 */
async function packageStats(pkg, windows, today) {
  const encoded = encodeURIComponent(pkg); // scoped names keep their "/" for the API
  let total = 0;
  let recent = { lastDay: 0, lastWeek: 0, lastMonth: 0 };

  for (const [from, to] of windows) {
    const data = await enqueue(`${DOWNLOADS_API}/range/${from}:${to}/${encoded}`);
    const days = data?.downloads || [];
    if (!days.length) continue;

    total += days.reduce((acc, d) => acc + (d.downloads || 0), 0);

    // npm hasn't finished counting the current UTC day, so it always reports 0.
    // Drop it — npm's own last-day/last-week windows end on the last complete
    // day too, and leaving it in drags every recent figure down.
    if (to === fmt(today)) {
      const complete = days.filter((d) => d.day < fmt(today));
      const sumLast = (n) => complete.slice(-n).reduce((acc, d) => acc + (d.downloads || 0), 0);
      recent = { lastDay: sumLast(1), lastWeek: sumLast(7), lastMonth: sumLast(30) };
    }
  }

  return { name: pkg, total, ...recent };
}

async function buildStats(previous) {
  const today = new Date();
  const windows = historyWindows(today);
  const names = await listPackages();
  const priorByName = new Map((previous?.packages || []).map((p) => [p.name, p]));

  const packages = [];
  const failed = [];

  for (const name of names) {
    try {
      packages.push(await packageStats(name, windows, today));
    } catch (err) {
      console.error(`npm: stats failed for ${name}:`, err.message);
      failed.push(name);
      // Fall back to the last known figure. Dropping to 0 would silently
      // under-report the headline total, which is exactly the bug this avoids.
      const prior = priorByName.get(name);
      if (prior) packages.push({ ...prior });
    }
  }

  packages.sort((a, b) => b.total - a.total);
  const sum = (key) => packages.reduce((acc, p) => acc + p[key], 0);

  return {
    status: true,
    username: NPM_USER,
    profile: `https://www.npmjs.com/~${NPM_USER}`,
    since: START_DATE,
    totalPackages: packages.length,
    totalDownloads: sum("total"),
    lastDay: sum("lastDay"),
    lastWeek: sum("lastWeek"),
    lastMonth: sum("lastMonth"),
    packages,
    partial: failed.length > 0,
    ...(failed.length ? { failedPackages: failed } : {}),
    updatedAt: new Date().toISOString(),
  };
}

// ---------------------------------------------------------------------------
// Caching: an in-process layer in front of Redis, plus single-flight.
// The memory layer keeps a warm instance from touching Redis at all, and still
// works if Redis is down. Single-flight means N simultaneous misses trigger one
// rebuild instead of N, which is what kept tripping npm's rate limiter.
// ---------------------------------------------------------------------------
let memoryCache = null; // { data, expiresAt }
let inFlight = null;

const readMemory = () =>
  memoryCache && memoryCache.expiresAt > Date.now() ? memoryCache.data : null;

const writeMemory = (data, ttl) => {
  memoryCache = { data, expiresAt: Date.now() + ttl * 1000 };
};

async function refresh() {
  if (inFlight) return inFlight; // coalesce concurrent misses

  inFlight = (async () => {
    const previous = readMemory() || (await getCache(STALE_KEY)) || (await getCache(CACHE_KEY));
    const stats = await buildStats(previous);
    const ttl = stats.partial ? PARTIAL_TTL : CACHE_TTL;

    writeMemory(stats, ttl);
    await setCache(CACHE_KEY, stats, ttl);
    // Never let a degraded run overwrite the known-good snapshot.
    if (!stats.partial) await setCache(STALE_KEY, stats, STALE_TTL);

    return stats;
  })().finally(() => {
    inFlight = null;
  });

  return inFlight;
}

router.get("/downloads", async (req, res) => {
  res.set("Cache-Control", `public, max-age=3600, stale-while-revalidate=${CACHE_TTL}`);

  try {
    if (req.query.refresh !== "true") {
      const hot = readMemory();
      if (hot) return res.status(200).json({ ...hot, cached: "memory" });

      const cached = await getCache(CACHE_KEY);
      if (cached) {
        console.log("⚡ [Redis Cache HIT] npm downloads");
        writeMemory(cached, CACHE_TTL);
        return res.status(200).json({ ...cached, cached: "redis" });
      }
    }

    console.log("🐢 [Cache MISS] Fetching npm download stats...");
    const stats = await refresh();
    res.status(200).json({ ...stats, cached: false });
  } catch (error) {
    console.error("npm downloads error:", error);

    // Serve the last good snapshot rather than breaking the hero counter.
    const stale = readMemory() || (await getCache(STALE_KEY));
    if (stale) return res.status(200).json({ ...stale, cached: true, stale: true });

    res.status(500).json({ status: false, error: "Failed to fetch npm download stats" });
  }
});

export default router;

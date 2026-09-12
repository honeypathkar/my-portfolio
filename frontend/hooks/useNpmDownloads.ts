"use client";
import { useEffect, useRef, useState } from "react";

const API_BASE = process.env.NEXT_PUBLIC_DATA_API || "https://api.honeypathkar.com";
const POLL_MS = 5 * 60 * 1000;

export interface NpmPackageStat {
  name: string;
  total: number;
  lastDay: number;
  lastWeek: number;
  lastMonth: number;
}

export interface NpmDownloadStats {
  status: boolean;
  username: string;
  profile: string;
  totalPackages: number;
  totalDownloads: number;
  lastDay: number;
  lastWeek: number;
  lastMonth: number;
  packages: NpmPackageStat[];
  updatedAt: string;
}

export function useNpmDownloads() {
  const [data, setData] = useState<NpmDownloadStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    const controller = new AbortController();

    const load = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/npm/downloads`, { signal: controller.signal });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json: NpmDownloadStats = await res.json();
        if (alive && json?.status) setData(json);
      } catch {
        // Silent — the card just keeps showing the last known value.
      } finally {
        if (alive) setLoading(false);
      }
    };

    load();
    const id = setInterval(load, POLL_MS);
    // Refresh when the tab regains focus so a returning visitor sees fresh numbers.
    const onVisible = () => document.visibilityState === "visible" && load();
    document.addEventListener("visibilitychange", onVisible);

    return () => {
      alive = false;
      controller.abort();
      clearInterval(id);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, []);

  return { data, loading };
}

/** Eases a number up to `target` so the counter feels live rather than snapping. */
export function useCountUp(target: number, duration = 1400) {
  const [value, setValue] = useState(0);
  const fromRef = useRef(0);

  useEffect(() => {
    if (target <= 0) return;
    const from = fromRef.current;
    const delta = target - from;
    if (delta === 0) return;

    let frame = 0;
    const start = performance.now();

    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(Math.round(from + delta * eased));
      if (t < 1) frame = requestAnimationFrame(tick);
      else fromRef.current = target;
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target, duration]);

  return value;
}

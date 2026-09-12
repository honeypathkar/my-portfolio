const MONTHS = [
  "jan", "feb", "mar", "apr", "may", "jun",
  "jul", "aug", "sep", "oct", "nov", "dec",
];

const PRESENT = /^(present|current|now|ongoing|today|date)$/i;

/** Parses "Jun 2025", "June 2025", "06/2025" or "2025-06" into {year, month}. */
function parseMonthYear(raw: string): { year: number; month: number } | null {
  const text = raw.trim().replace(/,/g, " ").replace(/\s+/g, " ");
  if (!text) return null;

  const named = text.match(/^([A-Za-z]{3,})\s+(\d{4})$/);
  if (named) {
    const month = MONTHS.indexOf(named[1].slice(0, 3).toLowerCase());
    if (month >= 0) return { year: Number(named[2]), month };
  }

  const numeric = text.match(/^(\d{1,2})[/\-.](\d{4})$/);
  if (numeric) {
    const month = Number(numeric[1]) - 1;
    if (month >= 0 && month <= 11) return { year: Number(numeric[2]), month };
  }

  const iso = text.match(/^(\d{4})[/\-.](\d{1,2})$/);
  if (iso) {
    const month = Number(iso[2]) - 1;
    if (month >= 0 && month <= 11) return { year: Number(iso[1]), month };
  }

  return null;
}

/** Total months between two points, counted inclusively — the LinkedIn convention. */
function monthsBetween(
  from: { year: number; month: number },
  to: { year: number; month: number }
) {
  return (to.year - from.year) * 12 + (to.month - from.month) + 1;
}

export function formatMonthSpan(totalMonths: number) {
  if (totalMonths <= 0) return "";
  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;
  const parts: string[] = [];
  if (years) parts.push(`${years} yr${years > 1 ? "s" : ""}`);
  if (months) parts.push(`${months} mo${months > 1 ? "s" : ""}`);
  return parts.join(" ");
}

/**
 * Turns a stored duration such as "Jun 2025 - Present" into the elapsed span
 * ("1 yr 4 mos"). Returns "" for anything unparseable so the raw string from
 * the CMS is still shown on its own.
 */
export function getDurationLength(duration?: string, now = new Date()): string {
  if (!duration) return "";

  // A bare "-" must stay glued to ISO dates like "2025-06", so the ASCII
  // hyphen only separates when it has whitespace on both sides.
  const parts = duration.split(/\s*[–—]\s*|\s+-\s+|\s+to\s+/i).filter(Boolean);
  if (parts.length < 2) return "";
  const rawStart = parts[0];
  const rawEnd = parts[parts.length - 1];

  const start = parseMonthYear(rawStart);
  if (!start) return "";

  const end = PRESENT.test(rawEnd.trim())
    ? { year: now.getFullYear(), month: now.getMonth() }
    : parseMonthYear(rawEnd);
  if (!end) return "";

  return formatMonthSpan(monthsBetween(start, end));
}

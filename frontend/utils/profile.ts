// Next.js inlines NEXT_PUBLIC_* at build time, so this must stay a full
// static `process.env.X` expression — changing .env needs a rebuild.
export const YEARS_EXPERIENCE = process.env.NEXT_PUBLIC_YEARS_EXPERIENCE || "1.5+";

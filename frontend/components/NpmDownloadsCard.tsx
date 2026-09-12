"use client";
import React from "react";
import { SiNpm } from "react-icons/si";
import { TrendingUp } from "lucide-react";
import LiquidGlassCard from "./LiquidGlassCard";
import { useNpmDownloads, useCountUp } from "../hooks/useNpmDownloads";

export default function NpmDownloadsCard() {
  const { data, loading } = useNpmDownloads();
  const total = useCountUp(data?.totalDownloads ?? 0);

  return (
    <a
      href={data?.profile || "https://www.npmjs.com/~honeypathkar"}
      target="_blank"
      rel="noopener noreferrer"
      className="block mt-3"
    >
      <LiquidGlassCard className="hero-metric p-3 opacity-0">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <SiNpm className="w-5 h-5 text-brand-400 shrink-0" />
            <div className="min-w-0">
              <div className="flex items-baseline gap-2">
                <span className="text-lg font-bold text-white tabular-nums">
                  {loading && !data ? "—" : total.toLocaleString("en-US")}
                </span>
                <span className="relative flex h-1.5 w-1.5" aria-hidden="true">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
                </span>
              </div>
              <div className="text-[10px] text-gray-500 font-mono mt-0.5 truncate">
                NPM Downloads
                {data ? ` · ${data.totalPackages} packages` : ""}
              </div>
            </div>
          </div>

          {data && data.lastWeek > 0 && (
            <div className="text-right shrink-0">
              <div className="flex items-center justify-end gap-1 text-emerald-400">
                <TrendingUp className="w-3 h-3" />
                <span className="text-xs font-semibold tabular-nums">
                  +{data.lastWeek.toLocaleString("en-US")}
                </span>
              </div>
              <div className="text-[10px] text-gray-500 font-mono mt-0.5">this week</div>
            </div>
          )}
        </div>
      </LiquidGlassCard>
    </a>
  );
}

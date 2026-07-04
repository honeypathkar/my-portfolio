"use client";
import React, { useId } from "react";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  variant?: "subtle" | "medium" | "strong";
  noBorder?: boolean;
  hover?: boolean;
  style?: React.CSSProperties;
}

const variantStyles = {
  subtle: "bg-white/[0.03] border-white/[0.06]",
  medium: "bg-white/[0.06] border-white/[0.1]",
  strong: "bg-white/[0.08] border-white/[0.12]",
};

export default function GlassCard({
  children,
  className = "",
  variant = "subtle",
  noBorder = false,
  hover = false,
  style,
}: GlassCardProps) {
  return (
    <div
      className={`relative rounded-2xl backdrop-blur-xl ${variantStyles[variant]} ${
        noBorder ? "border-0" : "border"
      } ${hover ? "transition-all duration-300 hover:-translate-y-1 hover:bg-white/[0.06]" : ""} ${className}`}
      style={{
        boxShadow: `
          0 0 2px 1px rgba(255, 255, 255, 0.05) inset,
          0 4px 16px rgba(0, 0, 0, 0.08),
          0 8px 24px rgba(0, 0, 0, 0.05)
        `,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

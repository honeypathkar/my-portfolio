"use client";
import React, { useEffect, useRef, useId } from "react";

interface GlassDisplacementProps {
  children: React.ReactNode;
  className?: string;
  width?: number;
  height?: number;
  radius?: number;
  border?: number;
  lightness?: number;
  alpha?: number;
  blur?: number;
  scale?: number;
  frost?: number;
  saturation?: number;
  xChannel?: "R" | "G" | "B";
  yChannel?: "R" | "G" | "B";
  style?: React.CSSProperties;
}

export default function GlassDisplacement({
  children,
  className = "",
  width = 336,
  height = 96,
  radius = 16,
  border = 0.07,
  lightness = 50,
  alpha = 0.93,
  blur = 11,
  scale = -180,
  frost = 0.05,
  saturation = 1,
  xChannel = "R",
  yChannel = "B",
  style,
}: GlassDisplacementProps) {
  const id = useId().replace(/:/g, "");
  const containerRef = useRef<HTMLDivElement>(null);

  const filterId = `glass-filter-${id}`;
  const redId = `red-${id}`;
  const greenId = `green-${id}`;
  const blueId = `blue-${id}`;

  const borderPx = Math.min(width, height) * border * 0.5;
  const innerBorder = Math.min(width, height) * border * 0.5;

  return (
    <div
      ref={containerRef}
      className={`relative ${className}`}
      style={{
        width: `calc(${width}px)`,
        height: `calc(${height}px)`,
        borderRadius: `${radius}px`,
        backdropFilter: `url(#${filterId}) saturate(${saturation})`,
        boxShadow: `
          0 0 2px 1px rgba(255, 255, 255, 0.08) inset,
          0 0 10px 4px rgba(255, 255, 255, 0.05) inset,
          0 4px 16px rgba(0, 0, 0, 0.05),
          0 8px 24px rgba(0, 0, 0, 0.05),
          0 16px 56px rgba(0, 0, 0, 0.05)
        `,
        background: `rgba(255, 255, 255, ${frost})`,
        ...style,
      }}
    >
      {children}

      {/* Hidden SVG filter definition */}
      <svg
        className="absolute pointer-events-none"
        style={{ width: 0, height: 0, position: "absolute" }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter id={filterId} colorInterpolationFilters="sRGB">
            <feImage
              x="0"
              y="0"
              width="100%"
              height="100%"
              result="map"
              href={`data:image/svg+xml,${encodeURIComponent(
                `<svg viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <linearGradient id="red" x1="100%" y1="0%" x2="0%" y2="0%">
                      <stop offset="0%" stop-color="#000"/>
                      <stop offset="100%" stop-color="red"/>
                    </linearGradient>
                    <linearGradient id="blue" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stop-color="#000"/>
                      <stop offset="100%" stop-color="blue"/>
                    </linearGradient>
                  </defs>
                  <rect x="0" y="0" width="${width}" height="${height}" fill="black"/>
                  <rect x="0" y="0" width="${width}" height="${height}" rx="${radius}" fill="url(#red)"/>
                  <rect x="0" y="0" width="${width}" height="${height}" rx="${radius}" fill="url(#blue)" style="mix-blend-mode: difference"/>
                  <rect x="${borderPx}" y="${innerBorder}" width="${width - borderPx * 2}" height="${height - innerBorder * 2}" rx="${radius}" fill="hsl(0 0% ${lightness}% / ${alpha})" style="filter:blur(${blur}px)"/>
                </svg>`
              )}`}
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="map"
              id={redId}
              xChannelSelector={xChannel}
              yChannelSelector={yChannel}
              result="dispRed"
              scale={scale}
            />
            <feColorMatrix
              in="dispRed"
              type="matrix"
              values="1 0 0 0 0
                      0 0 0 0 0
                      0 0 0 0 0
                      0 0 0 1 0"
              result="red"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="map"
              id={greenId}
              xChannelSelector={xChannel}
              yChannelSelector={yChannel}
              result="dispGreen"
              scale={scale + 10}
            />
            <feColorMatrix
              in="dispGreen"
              type="matrix"
              values="0 0 0 0 0
                      0 1 0 0 0
                      0 0 0 0 0
                      0 0 0 1 0"
              result="green"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="map"
              id={blueId}
              xChannelSelector={xChannel}
              yChannelSelector={yChannel}
              result="dispBlue"
              scale={scale + 20}
            />
            <feColorMatrix
              in="dispBlue"
              type="matrix"
              values="0 0 0 0 0
                      0 0 0 0 0
                      0 0 1 0 0
                      0 0 0 1 0"
              result="blue"
            />
            <feBlend in="red" in2="green" mode="screen" result="rg" />
            <feBlend in="rg" in2="blue" mode="screen" result="output" />
            <feGaussianBlur in="output" stdDeviation="0.7" />
          </filter>
        </defs>
      </svg>
    </div>
  );
}

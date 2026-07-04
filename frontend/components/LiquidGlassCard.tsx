"use client";
import React, { useId, useState, useEffect, useRef } from "react";

interface LiquidGlassCardProps {
  children: React.ReactNode;
  className?: string;
  intensity?: number; // scale of displacement distortion (default: -20)
  interactive?: boolean; // whether to respond to hover/mouse
  style?: React.CSSProperties;
}

export default function LiquidGlassCard({
  children,
  className = "",
  intensity = -20,
  interactive = true,
  style,
}: LiquidGlassCardProps) {
  const id = useId().replace(/:/g, "");
  const filterId = `liquid-glass-${id}`;
  const [isHovered, setIsHovered] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(300);
  const [height, setHeight] = useState(100);

  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setWidth(entry.contentRect.width || 300);
        setHeight(entry.contentRect.height || 100);
      }
    });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const isPositioned = className.includes("absolute") || className.includes("fixed") || className.includes("relative");

  const scale = isHovered ? intensity * 1.5 : intensity;
  const border = 0.07;
  const borderPx = Math.min(width, height) * border * 0.5;
  const innerBorder = Math.min(width, height) * border * 0.5;

  return (
    <div
      ref={containerRef}
      className={`${isPositioned ? "" : "relative"} rounded-2xl border border-white/[0.08] transition-all duration-500 overflow-hidden ${
        isHovered ? "-translate-y-1" : ""
      } ${className}`}
      style={{
        backdropFilter: `url(#${filterId}) saturate(1.4)`,
        WebkitBackdropFilter: `url(#${filterId}) saturate(1.4)`,
        boxShadow: `
          0 0 2px 1px rgba(255, 255, 255, 0.05) inset,
          0 0 10px 4px rgba(255, 255, 255, 0.02) inset,
          0 4px 16px rgba(0, 0, 0, 0.1)
        `,
        ...style,
      }}
      onMouseEnter={() => interactive && setIsHovered(true)}
      onMouseLeave={() => interactive && setIsHovered(false)}
    >
      {/* Dynamic SVG Filter */}
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
                  <rect x="0" y="0" width="${width}" height="${height}" rx="16" fill="url(#red)"/>
                  <rect x="0" y="0" width="${width}" height="${height}" rx="16" fill="url(#blue)" style="mix-blend-mode: difference"/>
                  <rect x="${borderPx}" y="${innerBorder}" width="${width - borderPx * 2}" height="${height - innerBorder * 2}" rx="16" fill="hsl(0 0% 50% / 0.93)" style="filter:blur(11px)"/>
                </svg>`
              )}`}
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="map"
              id="redchannel"
              xChannelSelector="R"
              yChannelSelector="G"
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
              id="greenchannel"
              xChannelSelector="R"
              yChannelSelector="G"
              result="dispGreen"
              scale={scale + 5}
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
              id="bluechannel"
              xChannelSelector="R"
              yChannelSelector="G"
              result="dispBlue"
              scale={scale + 10}
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

      <div className="relative z-10 w-full h-full">
        {children}
      </div>
    </div>
  );
}

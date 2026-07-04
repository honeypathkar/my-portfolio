import type { Metadata, Viewport } from 'next'
import "./globals.css";
import React from "react";
import Footer from "../components/Footer";
import { Toaster } from "sonner";
import { Analytics } from "@vercel/analytics/next";
import { Geist, Geist_Mono, Bebas_Neue } from "next/font/google";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas-neue",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://honeypathkar.com'),
  title: "Honey Pathkar | Full Stack + Mobile Engineer",
  description:
    "Full Stack & Mobile Engineer building premium web and mobile experiences with React, Node.js, React Native, and Flutter.",
  icons: {
    icon: "/favicon.ico",
    shortcut: '/favicon-32x32.png',
    apple: '/apple-touch-icon.png',
    other: [
      {
        url: '/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
      {
        url: '/favicon-16x16.png',
        sizes: '16x16',
        type: 'image/png',
      },
    ],
  },
  openGraph: {
    title: "Honey Pathkar | Full Stack + Mobile Engineer",
    description:
      "Building premium web and mobile experiences with React, Node.js, React Native & Flutter.",
    url: "https://honeypathkar.com",
    siteName: "Honey Pathkar Portfolio",
    images: [
      {
        url: process.env.NEXT_PUBLIC_PROFILE_PIC || "https://res.cloudinary.com/dbfyjoiub/image/upload/v1771066355/20260202_214003_szoj9j.jpg",
        width: 1200,
        height: 630,
        alt: "Honey Pathkar Portfolio Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Honey Pathkar | Full Stack + Mobile Engineer",
    description:
      "Building premium web and mobile experiences with React, Node.js, React Native & Flutter.",
    images: [process.env.NEXT_PUBLIC_PROFILE_PIC || "https://res.cloudinary.com/dbfyjoiub/image/upload/v1771066355/20260202_214003_szoj9j.jpg"],
  },
  other: {
    "application/ld+json": JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Person",
      "name": "Honey Pathkar",
      "url": "https://honeypathkar.com",
      "image": process.env.NEXT_PUBLIC_PROFILE_PIC || "https://res.cloudinary.com/dbfyjoiub/image/upload/v1771066355/20260202_214003_szoj9j.jpg",
      "sameAs": [
        "https://github.com/honeypathkar",
        "https://www.linkedin.com/in/honeypathkar"
      ],
      "jobTitle": "Full Stack & Mobile Engineer",
      "description": "Full Stack & Mobile Engineer building premium web and mobile experiences with React, Node.js, React Native, and Flutter.",
    }),
  },
};

export const viewport: Viewport = {
  themeColor: '#09090b',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${geist.variable} ${geistMono.variable} ${bebasNeue.variable}`}>
      <body>
        {/* SVG Filter Definitions for Glass Displacement Effect */}
        <svg
          style={{ position: "absolute", width: 0, height: 0, overflow: "hidden" }}
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <filter id="glass-displacement-filter" colorInterpolationFilters="sRGB">
              <feImage
                x="0"
                y="0"
                width="100%"
                height="100%"
                result="map"
                href={`data:image/svg+xml,${encodeURIComponent(
                  `<svg viewBox="0 0 400 100" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <linearGradient id="glass-red" x1="100%" y1="0%" x2="0%" y2="0%">
                        <stop offset="0%" stop-color="#000"/>
                        <stop offset="100%" stop-color="red"/>
                      </linearGradient>
                      <linearGradient id="glass-blue" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stop-color="#000"/>
                        <stop offset="100%" stop-color="blue"/>
                      </linearGradient>
                    </defs>
                    <rect x="0" y="0" width="400" height="100" fill="black"/>
                    <rect x="0" y="0" width="400" height="100" rx="16" fill="url(#glass-red)"/>
                    <rect x="0" y="0" width="400" height="100" rx="16" fill="url(#glass-blue)" style="mix-blend-mode: difference"/>
                    <rect x="14" y="3.5" width="372" height="93" rx="16" fill="hsl(0 0% 50% / 0.93)" style="filter:blur(11px)"/>
                  </svg>`
                )}`}
              />
              <feDisplacementMap
                in="SourceGraphic"
                in2="map"
                id="glass-red-channel"
                xChannelSelector="R"
                yChannelSelector="B"
                result="dispRed"
                scale="-180"
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
                id="glass-green-channel"
                xChannelSelector="R"
                yChannelSelector="B"
                result="dispGreen"
                scale="-170"
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
                id="glass-blue-channel"
                xChannelSelector="R"
                yChannelSelector="B"
                result="dispBlue"
                scale="-160"
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

        <Toaster richColors position="top-right" theme="dark" closeButton />
        {children}
        <Analytics />
        <Footer />
      </body>
    </html>
  );
}

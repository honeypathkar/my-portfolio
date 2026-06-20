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
        <Toaster richColors position="top-right" theme="dark" closeButton />
        {children}
        <Analytics />
        <Footer />
      </body>
    </html>
  );
}

import type { Metadata, Viewport } from 'next'
import "./globals.css";
import React from "react";
import Footer from "../components/Footer";
import { Toaster } from "sonner";
import { Analytics } from "@vercel/analytics/next";
import { Bricolage_Grotesque } from "next/font/google";

const bricolageGrotesque = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://honeypathkar.com'),
  title: "Honey | Portfolio | MERN Stack Developer | Android Developer | Programmer",
  description:
    "I am a MERN Stack developer with a passion for building dynamic, user-focused web and mobile applications. With solid experience in MongoDB, Express.js, React.js, and Node.js.",
  icons: {
    icon: "/favicon.ico",
    shortcut: '/android-chrome-512x512.png',
    apple: '/android-chrome-512x512.png',
  },
  openGraph: {
    title: "Honey Pathkar | MERN Stack & Android Developer",
    description:
      "Building cool web & mobile apps with React, Node.js & Flutter 🚀",
    url: "https://honeypathkar.com",
    siteName: "Honey Pathkar Portfolio",
    images: [
      {
        url: "/preview.jpg",
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
    title: "Honey Pathkar | MERN Stack & Android Developer",
    description:
      "Building sleek and fast web & mobile experiences with the MERN Stack 🚀",
    images: ["/preview.jpg"],
  },
  other: {
    "application/ld+json": JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Person",
      "name": "Honey Pathkar",
      "url": "https://honeypathkar.com",
      "image": "https://honeypathkar.com/preview.jpg",
      "sameAs": [
        "https://github.com/honeypathkar",
        "https://www.linkedin.com/in/honeypathkar"
      ],
      "jobTitle": "MERN Stack & Android Developer",
      "description": "Full Stack Developer passionate about building web & mobile apps with React, Node.js, and Flutter.",
    }),
  },
};


export const viewport: Viewport = {
  themeColor: '#111827cc',
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={bricolageGrotesque.className}>
      <body>
        <Toaster richColors position="top-right" theme="dark" closeButton />
        {children}
        <Analytics />
        <Footer />
      </body>
    </html>
  );
}
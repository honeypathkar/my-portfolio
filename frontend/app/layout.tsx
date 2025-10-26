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
  title:
    "Honey | Portfolio | MERN Stack Developer | Android Developer | Programmer",
  description:
    "I am a MERN Stack developer with a passion for building dynamic, user-focused web and mobile applications. With solid experience in MongoDB, Express.js, React.js, and Node.js. ",
  
  icons: {
    shortcut: '/android-chrome-512x512.png',
  }
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
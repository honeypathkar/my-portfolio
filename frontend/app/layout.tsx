export const metadata = {
  title: "Honey | Portfolio",
  description: "Honey Pathkar personal portfolio",
};

import "./globals.css";
import React from "react";
import Footer from "../components/Footer";
import { Toaster } from "sonner";
import { Analytics } from "@vercel/analytics/next"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
       <link rel="shortcut icon" href="/android-chrome-512x512.png" type="image/x-icon" />
      </head>
      <body>
        <Toaster richColors position="top-right" theme="dark" closeButton />
        {children}
        <Analytics />
        <Footer />
      </body>
    </html>
  );
}



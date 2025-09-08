export const metadata = {
  title: "Honey | Portfolio",
  description: "Honey Pathkar personal portfolio",
};

import "./globals.css";
import React from "react";
import Footer from "../components/Footer";
import { Toaster } from "sonner";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Toaster richColors position="top-right" theme="dark" closeButton />
        {children}
        <Footer />
      </body>
    </html>
  );
}



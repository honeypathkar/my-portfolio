export const metadata = {
  title: "Honey | Portfolio | MERN Stack Developer | Android Developer | Programmer",
  description:
    "I am a MERN Stack developer with a passion for building dynamic, user-focused web and mobile applications. With solid experience in MongoDB, Express.js, React.js, and Node.js, I create full-stack solutions that are scalable, high-performing, and visually appealing. In addition to web development, I work on Android app development using React Native and Flutter, enabling me to craft cross-platform mobile experiences with smooth performance and responsive UI. I have solved 500+ Data Structures and Algorithms problems across various platforms, which has sharpened my logical thinking and coding skills. My skill set also includes HTML, CSS, JavaScript, and modern styling frameworks like Tailwind CSS and Bootstrap, allowing me to turn complex ideas into clean, user-friendly interfaces.",
};

import "./globals.css";
import React from "react";
import Footer from "../components/Footer";
import { Toaster } from "sonner";
import { Analytics } from "@vercel/analytics/next";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          rel="shortcut icon"
          href="/android-chrome-512x512.png"
          type="image/x-icon"
        />
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

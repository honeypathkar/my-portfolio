"use client";
import React from "react";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";
import Link from "next/link";

const socials = [
  { icon: FaGithub, href: "https://github.com/honeypathkar", label: "GitHub" },
  { icon: FaLinkedin, href: "https://www.linkedin.com/in/honey-pathkar/", label: "LinkedIn" },
  { icon: FaInstagram, href: "https://instagram.com/honey.jsx", label: "Instagram" },
  { icon: SiLeetcode, href: "https://leetcode.com/u/honeypathkar70/", label: "LeetCode" },
];

const links = [
  { label: "Home", href: "/" },
  { label: "About", href: "/#about" },
  { label: "Skills", href: "/#skills" },
  { label: "Projects", href: "/#projects" },
  { label: "Blogs", href: "/blogs" },
  { label: "Contact", href: "/#contact" },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.04] bg-surface">
      <div className="section-container py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div>
            <Link href="/" className="inline-block mb-4">
              <span className="text-xl font-bold text-white">honey</span>
              <span className="text-brand-400 text-xl font-bold">.</span>
            </Link>
            <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
              Full Stack & Mobile Engineer crafting premium web and mobile experiences.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-mono text-brand-400 uppercase tracking-widest mb-4">Navigation</h4>
            <div className="grid grid-cols-2 gap-2">
              {links.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-sm text-gray-500 hover:text-white transition-colors py-1"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-xs font-mono text-brand-400 uppercase tracking-widest mb-4">Connect</h4>
            <div className="flex gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center text-gray-500 hover:text-brand-400 hover:border-brand-500/30 transition-all duration-300"
                >
                  <s.icon size={16} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/[0.04] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-600 text-xs font-mono">
            &copy; {new Date().getFullYear()} Honey Pathkar. All rights reserved.
          </p>
          <p className="text-gray-600 text-xs font-mono">
            Built with Next.js, Tailwind & GSAP
          </p>
        </div>
      </div>
    </footer>
  );
}

"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

type Props = {
  home: string;
  about: string;
  skills: string;
  project: string;
  contact: string;
  experience: string;
};

export default function Navbar({ home, about, skills, project, contact }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const pathname = usePathname();
  const isHome = pathname === "/";
  const filterId = "navbar-liquid-glass";

  const navRef = useRef<HTMLElement>(null);
  const [navWidth, setNavWidth] = useState(1200);
  const [navHeight, setNavHeight] = useState(80);

  useEffect(() => {
    if (!navRef.current) return;
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setNavWidth(entry.contentRect.width || 1200);
        setNavHeight(entry.contentRect.height || 80);
      }
    });
    observer.observe(navRef.current);
    return () => observer.disconnect();
  }, []);

  const scale = -25;
  const border = 0.07;
  const borderPx = Math.min(navWidth, navHeight) * border * 0.5;
  const innerBorder = Math.min(navWidth, navHeight) * border * 0.5;

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
      if (!isHome) return;
      const sections = ["home", "about", "skills", "experience", "projects", "contact"];
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 150) {
            setActiveSection(id);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const url: { name: string; link: string; isExternal?: boolean }[] = [
    { name: "Home", link: home },
    { name: "About", link: about },
    { name: "Skills", link: skills },
    { name: "Experience", link: "experience" },
    { name: "Projects", link: project },
    { name: "Contact", link: contact },
  ];

  const getLink = (item: any) => {
    if (item.isExternal) return `/${item.link}`;
    return isHome ? `#${item.link}` : `/#${item.link}`;
  };

  const isActive = (item: any) => {
    if (item.isExternal) return pathname === `/${item.link}`;
    return activeSection === item.link;
  };

  return (
    <>
      <motion.nav
        ref={navRef}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          scrolled
            ? "glass-nav-scrolled"
            : "bg-transparent"
        }`}
        style={scrolled ? {
          backdropFilter: `url(#${filterId}) saturate(1.5)`,
          WebkitBackdropFilter: `url(#${filterId}) saturate(1.5)`,
          background: "rgba(9, 9, 11, 0.65)",
          border: "none",
          boxShadow: "none"
        } : undefined}
      >
        <div className="section-container">
          <div className="flex items-center justify-between h-16 sm:h-20">
            <Link href="/" className="relative group">
              <span className="text-2xl font-bebas tracking-wider text-white group-hover:text-brand-400 transition-colors duration-300">
                honey
              </span>
              <span className="text-brand-400 text-xl font-bold">.</span>
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-500 group-hover:w-full transition-all duration-300" />
            </Link>

            <div className="hidden md:flex items-center gap-1">
              {url.map((data) => {
                const isBlogs = data.isExternal;
                const active = isActive(data);
                return (
                  <Link
                    key={data.name}
                    href={getLink(data)}
                    className={`relative px-4 py-2 text-[13px] font-medium rounded-xl transition-all duration-300 ${
                      active
                        ? isBlogs
                          ? "text-brand-400 bg-white/[0.06] border border-white/[0.12]"
                          : "text-brand-400"
                        : "text-gray-400 hover:text-white"
                    }`}
                  >
                    {active && !isBlogs && (
                      <motion.div
                        layoutId="navbar-active"
                        className="absolute inset-0 rounded-xl border border-white/[0.12] bg-white/[0.04] shadow-[0_0_2px_1px_rgba(255,255,255,0.05)_inset,0_4px_12px_rgba(0,0,0,0.15)]"
                        style={{ backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)" }}
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10">{data.name}</span>
                  </Link>
                );
              })}
            </div>

            <Link 
              href="/blogs"
              className="hidden md:flex items-center gap-2 px-5 py-2.5 bg-brand-600 hover:bg-brand-500 text-white text-sm font-semibold rounded-xl transition-all duration-300 hover:shadow-glow-sm active:scale-95"
            >
              Blogs
            </Link>

            <button
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
              className="md:hidden p-2 text-gray-400 hover:text-white transition-colors rounded-xl hover:bg-white/5"
            >
              {isOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsOpen(false)} />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="absolute right-0 top-0 bottom-0 w-72 bg-white/[0.03] border-l border-white/[0.08] shadow-[-20px_0_40px_rgba(0,0,0,0.5)] p-6 pt-24 flex flex-col"
              style={{ backdropFilter: "blur(32px) saturate(2)", WebkitBackdropFilter: "blur(32px) saturate(2)" }}
            >
              <div className="flex flex-col gap-1">
                {url.map((data, i) => {
                  const isBlogs = data.isExternal;
                  const active = isActive(data);
                  return (
                    <motion.div
                      key={data.name}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      <Link
                        href={getLink(data)}
                        onClick={() => setIsOpen(false)}
                        className={`block px-4 py-3 text-base font-medium rounded-xl transition-all ${
                          active
                            ? isBlogs
                              ? "text-brand-400 bg-brand-500/15 border border-brand-500/25"
                              : "text-brand-400 bg-brand-500/10"
                            : "text-gray-400 hover:text-white hover:bg-white/5"
                        }`}
                      >
                        {data.name}
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
              <div className="mt-8 pt-6 border-t border-white/[0.06]">
                <Link
                  href="/blogs"
                  className="flex items-center justify-center gap-2 w-full py-3 bg-brand-600 hover:bg-brand-500 text-white text-sm font-semibold rounded-xl transition-all"
                >
                  Blogs
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* SVG Filter for Navbar Liquid Glass Refraction */}
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
                `<svg viewBox="0 0 ${navWidth} ${navHeight}" xmlns="http://www.w3.org/2000/svg">
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
                  <rect x="0" y="0" width="${navWidth}" height="${navHeight}" fill="black"/>
                  <rect x="0" y="0" width="${navWidth}" height="${navHeight}" rx="0" fill="url(#red)"/>
                  <rect x="0" y="0" width="${navWidth}" height="${navHeight}" rx="0" fill="url(#blue)" style="mix-blend-mode: difference"/>
                  <rect x="${borderPx}" y="${innerBorder}" width="${navWidth - borderPx * 2}" height="${navHeight - innerBorder * 2}" rx="0" fill="hsl(0 0% 50% / 0.93)" style="filter:blur(11px)"/>
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
    </>
  );
}

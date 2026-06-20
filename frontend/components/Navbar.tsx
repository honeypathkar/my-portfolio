"use client";
import React, { useState, useEffect } from "react";
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
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          scrolled
            ? "bg-surface/80 backdrop-blur-xl border-b border-white/[0.06] shadow-glass"
            : "bg-transparent"
        }`}
      >
        <div className="section-container">
          <div className="flex items-center justify-between h-16 sm:h-20">
            <Link href="/" className="relative group">
              <span className="text-xl font-bold tracking-tight text-white group-hover:text-brand-400 transition-colors duration-300">
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
                          ? "text-brand-400 bg-brand-500/15 border border-brand-500/25"
                          : "text-brand-400"
                        : "text-gray-400 hover:text-white"
                    }`}
                  >
                    {active && !isBlogs && (
                      <motion.div
                        layoutId="navbar-active"
                        className="absolute inset-0 bg-brand-500/10 border border-brand-500/20 rounded-xl"
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
              className="absolute right-0 top-0 bottom-0 w-72 bg-surface-100/95 backdrop-blur-2xl border-l border-white/[0.06] p-6"
            >
              <div className="flex justify-end mb-8">
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 text-gray-400 hover:text-white rounded-xl hover:bg-white/5"
                >
                  <X size={22} />
                </button>
              </div>
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
    </>
  );
}

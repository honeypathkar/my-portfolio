"use client";
import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DiJavascript1, DiReact, DiNodejsSmall, DiMongodb, DiHtml5, DiCss3, DiBootstrap, DiGithubBadge, DiMysql } from "react-icons/di";
import { SiExpress, SiFlutter, SiTypescript, SiTailwindcss, SiRedux, SiDart, SiNextdotjs, SiShadcnui, SiPostgresql, SiVercel, SiAmazonwebservices } from "react-icons/si";
import { VscVscode } from "react-icons/vsc";
import { RiSupabaseLine, RiFirebaseLine } from "react-icons/ri";
import { TbApi } from "react-icons/tb";
import { useLiquidGlass } from "../hooks/useLiquidGlass";
import { motion } from "framer-motion";

type Skill = { name: string; icon: React.ReactNode };

type Category = {
  name: string;
  color: string;
  skills: Skill[];
};

const categories: Category[] = [
  {
    name: "Frontend",
    color: "from-blue-500/20 to-cyan-500/20",
    skills: [
      { name: "React", icon: <DiReact /> },
      { name: "Next.js", icon: <SiNextdotjs /> },
      { name: "TypeScript", icon: <SiTypescript /> },
      { name: "JavaScript", icon: <DiJavascript1 /> },
      { name: "HTML", icon: <DiHtml5 /> },
      { name: "CSS", icon: <DiCss3 /> },
      { name: "Tailwind", icon: <SiTailwindcss /> },
      { name: "Redux", icon: <SiRedux /> },
      { name: "ShadCN/UI", icon: <SiShadcnui /> },
      { name: "Bootstrap", icon: <DiBootstrap /> },
    ],
  },
  {
    name: "Backend",
    color: "from-green-500/20 to-emerald-500/20",
    skills: [
      { name: "Node.js", icon: <DiNodejsSmall /> },
      { name: "Express", icon: <SiExpress /> },
      { name: "REST APIs", icon: <TbApi /> },
    ],
  },
  {
    name: "Mobile",
    color: "from-brand-500/20 to-pink-500/20",
    skills: [
      { name: "React Native", icon: <DiReact /> },
      { name: "Flutter", icon: <SiFlutter /> },
      { name: "Dart", icon: <SiDart /> },
    ],
  },
  {
    name: "Database",
    color: "from-yellow-500/20 to-orange-500/20",
    skills: [
      { name: "MongoDB", icon: <DiMongodb /> },
      { name: "MySQL", icon: <DiMysql /> },
      { name: "PostgreSQL", icon: <SiPostgresql /> },
      { name: "Firebase", icon: <RiFirebaseLine /> },
      { name: "Supabase", icon: <RiSupabaseLine /> },
    ],
  },
  {
    name: "DevOps & Tools",
    color: "from-purple-500/20 to-violet-500/20",
    skills: [
      { name: "Git & GitHub", icon: <DiGithubBadge /> },
      { name: "VS Code", icon: <VscVscode /> },
      { name: "AWS", icon: <SiAmazonwebservices /> },
      { name: "Vercel", icon: <SiVercel /> },
    ],
  },
];

const GLASS_CONFIG = JSON.stringify({
  blurAmount: 0.25,
  cornerRadius: 20,
  brightness: -0.3,
});

const TAB_GLASS_CONFIG = JSON.stringify({
  blurAmount: 0.25,
  cornerRadius: 12,
  brightness: -0.2,
});

export default function SkillsPage() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState(0);

  useLiquidGlass(rootRef);

  useEffect(() => {
    if (!rootRef.current) return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo(".skills-label", { opacity: 0, y: 20 }, {
        opacity: 1, y: 0, duration: 0.6,
        scrollTrigger: { trigger: rootRef.current, start: "top 80%", once: true }
      });
      gsap.fromTo(".skills-title", { opacity: 0, y: 30 }, {
        opacity: 1, y: 0, duration: 0.7, delay: 0.1,
        scrollTrigger: { trigger: rootRef.current, start: "top 80%", once: true }
      });
      gsap.fromTo(".category-tab", { opacity: 0, y: 10 }, {
        opacity: 1, y: 0, duration: 0.4, stagger: 0.05, delay: 0.2,
        scrollTrigger: { trigger: rootRef.current, start: "top 75%", once: true }
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    gsap.fromTo(".skill-card", { opacity: 0, y: 15, scale: 0.97 }, {
      opacity: 1, y: 0, scale: 1, duration: 0.4, stagger: 0.03, ease: "power2.out"
    });
  }, [activeCategory]);

  const currentSkills = categories[activeCategory].skills;

  return (
    <section className="section-padding bg-surface-50">
      {/* Root div: glass elements MUST be direct children of this */}
      <div
        ref={rootRef}
        className="section-container relative grid gap-3"
        style={{ gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))" }}
      >
        {/* Non-glass: header spans full width */}
        <div className="col-span-full">
          <div className="skills-label flex items-center gap-3 mb-4">
            <div className="h-px w-12 bg-brand-500" />
            <span className="text-brand-400 text-xs font-mono font-medium uppercase tracking-widest">Skills</span>
          </div>
          <h2 className="skills-title text-section text-white mb-4">
            Tech <span className="text-gradient">Arsenal</span>
          </h2>
          <p className="text-gray-500 text-lg max-w-xl mb-12">
            A curated stack of technologies I use to build production-grade applications.
          </p>
        </div>

        {/* Non-glass: category tabs span full width */}
        <div className="col-span-full category-tabs flex flex-nowrap overflow-x-auto max-w-full gap-1 mb-8 p-1.5 bg-white/[0.02] border border-white/[0.04] rounded-full w-fit">
          {categories.map((cat, i) => (
            <button
              key={cat.name}
              onClick={() => setActiveCategory(i)}
              className={`category-tab relative px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap ${
                activeCategory === i
                  ? "text-white"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              {activeCategory === i && (
                <motion.div
                  layoutId="active-skill-tab"
                  className="absolute inset-0 rounded-full border border-white/[0.08] bg-white/[0.04] shadow-[0_0_2px_1px_rgba(255,255,255,0.05)_inset,0_0_10px_4px_rgba(255,255,255,0.02)_inset,0_4px_12px_rgba(0,0,0,0.15)]"
                  style={{
                    backdropFilter: "blur(12px)",
                    WebkitBackdropFilter: "blur(12px)",
                  }}
                  transition={{ type: "spring", stiffness: 350, damping: 28 }}
                />
              )}
              <span className="relative z-10">{cat.name}</span>
            </button>
          ))}
        </div>

        {/* Glass elements: each card is a direct child of rootRef */}
        {currentSkills.map((skill) => (
          <div
            key={skill.name}
            className="skill-card group liquid-glass px-4 py-3.5 flex items-center gap-3 hover:border-brand-500/20 transition-all duration-300 cursor-default rounded-2xl"
            data-config={GLASS_CONFIG}
          >
            <div className="text-brand-400 text-xl group-hover:scale-110 transition-transform duration-300 shrink-0">
              {skill.icon}
            </div>
            <span className="text-white text-sm font-medium">{skill.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

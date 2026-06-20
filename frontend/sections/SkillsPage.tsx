"use client";
import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DiJavascript1, DiReact, DiNodejsSmall, DiMongodb, DiHtml5, DiCss3, DiBootstrap, DiGithubBadge, DiMysql } from "react-icons/di";
import { SiExpress, SiFlutter, SiTypescript, SiTailwindcss, SiRedux, SiDart, SiNextdotjs, SiShadcnui, SiPostgresql, SiVercel, SiAmazonwebservices } from "react-icons/si";
import { VscVscode } from "react-icons/vsc";
import { RiSupabaseLine, RiFirebaseLine } from "react-icons/ri";
import { TbApi } from "react-icons/tb";

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

export default function SkillsPage() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState(0);

  useEffect(() => {
    if (!sectionRef.current) return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo(".skills-label", { opacity: 0, y: 20 }, {
        opacity: 1, y: 0, duration: 0.6,
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%", once: true }
      });
      gsap.fromTo(".skills-title", { opacity: 0, y: 30 }, {
        opacity: 1, y: 0, duration: 0.7, delay: 0.1,
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%", once: true }
      });
      gsap.fromTo(".category-tab", { opacity: 0, y: 10 }, {
        opacity: 1, y: 0, duration: 0.4, stagger: 0.05, delay: 0.2,
        scrollTrigger: { trigger: ".category-tabs", start: "top 85%", once: true }
      });
      gsap.fromTo(".skill-card", { opacity: 0, y: 20, scale: 0.95 }, {
        opacity: 1, y: 0, scale: 1, duration: 0.4, stagger: 0.04, delay: 0.3,
        scrollTrigger: { trigger: ".skills-grid", start: "top 85%", once: true }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [activeCategory]);

  const currentSkills = categories[activeCategory].skills;

  return (
    <section ref={sectionRef} className="section-padding bg-surface-50">
      <div className="section-container">
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

        <div className="category-tabs flex flex-wrap gap-2 mb-10">
          {categories.map((cat, i) => (
            <button
              key={cat.name}
              onClick={() => setActiveCategory(i)}
              className={`category-tab relative px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 border backdrop-blur-md ${
                activeCategory === i
                  ? "text-white border-white/[0.2] bg-white/[0.15] shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]"
                  : "text-gray-400 hover:text-gray-200 bg-white/[0.06] hover:bg-white/[0.1] border-white/[0.08] shadow-[0_4px_12px_0_rgba(0,0,0,0.15)]"
              }`}
            >
              <span className="relative z-10">{cat.name}</span>
            </button>
          ))}
        </div>

        <div className="skills-grid grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
          {currentSkills.map((skill) => (
            <div
              key={skill.name}
              className="skill-card group glass-card px-4 py-3.5 flex items-center gap-3 hover:border-brand-500/20 transition-all duration-300 cursor-default"
            >
              <div className="text-brand-400 text-xl group-hover:scale-110 transition-transform duration-300 shrink-0">
                {skill.icon}
              </div>
              <span className="text-white text-sm font-medium">{skill.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

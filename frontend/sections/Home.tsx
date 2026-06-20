"use client";
import React, { useEffect, useRef, useMemo } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowDown, Code2, Zap, Trophy, FolderGit2 } from "lucide-react";
import About from "./About";
import SkillsPage from "./SkillsPage";
import WorkPage from "./WorkPage";
import ContactPage from "./ContactPage";
import ExperiencePage from "./ExperiencePage";

const metrics = [
  { icon: FolderGit2, label: "Apps Shipped", value: "10+" },
  { icon: Code2, label: "DSA Solved", value: "500+" },
  { icon: Zap, label: "Years Exp", value: "1+" },
  { icon: Trophy, label: "Tech Stack", value: "20+" },
];

const techStack = [
  "React", "Next.js", "Node.js", "React Native",
  "Flutter", "TypeScript", "MongoDB", "Tailwind",
  "GSAP", "Java", "PostgreSQL", "Firebase",
];

function Starfield() {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const stars = useMemo(() => {
    if (!mounted) return [];
    const s = [];
    for (let i = 0; i < 120; i++) {
      s.push({
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2 + 0.5,
        delay: Math.random() * 5,
        duration: Math.random() * 3 + 2,
      });
    }
    return s;
  }, [mounted]);

  if (!mounted) {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-600/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-brand-500/4 rounded-full blur-[80px]" />
      </div>
    );
  }

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {stars.map((star, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-white animate-twinkle"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            animationDelay: `${star.delay}s`,
            animationDuration: `${star.duration}s`,
          }}
        />
      ))}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-600/5 rounded-full blur-[100px]" />
      <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-brand-500/4 rounded-full blur-[80px]" />
    </div>
  );
}

function TechOrbit() {
  const radius = 42;
  return (
    <div className="relative w-52 h-52 sm:w-64 sm:h-64 lg:w-80 lg:h-80">
      {/* Orbit rings */}
      <div className="absolute inset-0 rounded-full border border-white/[0.06]" />
      <div className="absolute inset-6 rounded-full border border-white/[0.04]" />
      <div className="absolute inset-12 rounded-full border border-white/[0.03]" />

      {/* Center icon */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-16 h-16 rounded-2xl bg-brand-600/15 border border-brand-500/25 flex items-center justify-center">
          <Code2 className="w-7 h-7 text-brand-400" />
        </div>
      </div>

      {/* Orbiting tech labels - continuous rotation via CSS */}
      <div className="absolute inset-0 animate-[spin_25s_linear_infinite]">
        {techStack.map((tech, i) => {
          const angle = (i / techStack.length) * 2 * Math.PI;
          const x = 50 + radius * Math.cos(angle);
          const y = 50 + radius * Math.sin(angle);
          return (
            <div
              key={tech}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${x.toFixed(4)}%`, top: `${y.toFixed(4)}%` }}
            >
              {/* Counter-rotate so text stays upright */}
              <div className="animate-[spin_25s_linear_infinite_reverse]">
                <div className="px-2.5 py-1 bg-white/[0.04] border border-white/[0.06] rounded-lg text-[9px] sm:text-[10px] font-mono text-gray-500 hover:text-brand-400 hover:border-brand-500/30 transition-colors whitespace-nowrap cursor-default">
                  {tech}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function Home({
  home, about, skills, project, contact, experience,
}: {
  home: string; about: string; skills: string; project: string; contact: string; experience: string;
}) {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (heroRef.current) {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(".hero-name", { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 })
        .fromTo(".hero-role", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 }, "-=0.4")
        .fromTo(".hero-desc", { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.5 }, "-=0.3")
        .fromTo(".hero-cta", { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.5 }, "-=0.2")
        .fromTo(".hero-metric", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.4, stagger: 0.06 }, "-=0.3")
        .fromTo(".hero-visual", { opacity: 0, scale: 0.95 }, { opacity: 1, scale: 1, duration: 0.6 }, "-=0.5");
    }

    return () => { ScrollTrigger.getAll().forEach(t => t.kill()); };
  }, []);

  return (
    <>
      <div className="homepage relative" id={home} ref={heroRef}>
        <Starfield />

        <div className="relative min-h-screen flex items-center">
          <div className="section-container w-full pt-24 pb-12 lg:pt-0">
            <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
              <div className="order-2 lg:order-1">
                <h1 className="text-hero text-white mb-4">
                  <span className="hero-name block opacity-0">
                    Hi, I'm Honey
                  </span>
                  <span className="hero-role block text-gradient font-bebas tracking-wider whitespace-nowrap text-[clamp(1rem,4.5vw,1.8rem)] lg:text-[clamp(1.375rem,2.2vw,2.25rem)] opacity-0">
                    Founder @Fyance | Software Engineer
                  </span>
                </h1>

                <p className="hero-desc text-subtitle text-gray-400 max-w-md mb-8 opacity-0">
                  Crafting premium web and mobile experiences. Building products that scale.
                </p>

                <div className="hero-cta flex flex-wrap gap-3 mb-10 opacity-0">
                  <a href={`#${contact}`} className="px-6 py-3 bg-brand-600 hover:bg-brand-500 text-white font-semibold rounded-xl transition-all duration-300 hover:shadow-glow-sm active:scale-95 text-sm">
                    Get in Touch
                  </a>
                  <a href={`#${project}`} className="px-6 py-3 bg-white/[0.05] hover:bg-white/[0.1] text-white border border-white/[0.1] font-semibold rounded-xl transition-all text-sm">
                    View Projects
                  </a>
                  <a href="/blogs" className="px-6 py-3 bg-white/[0.05] hover:bg-white/[0.1] text-white border border-white/[0.1] font-semibold rounded-xl transition-all text-sm">
                    Blog
                  </a>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {metrics.map((m) => (
                    <div key={m.label} className="hero-metric glass-card p-3 text-center opacity-0">
                       <m.icon className="w-4 h-4 text-brand-400 mx-auto mb-1.5" />
                      <div className="text-lg font-bold text-white">{m.value}</div>
                      <div className="text-[10px] text-gray-500 font-mono mt-0.5">{m.label}</div>
                    </div>
                  ))}
                </div>

                {/* Tech Orbit on mobile */}
                <div className="hero-visual lg:hidden flex justify-center my-8 opacity-0">
                  <TechOrbit />
                </div>
              </div>

              {/* Orbit on right on desktop */}
              <div className="hero-visual hidden lg:flex lg:order-2 justify-end opacity-0">
                <TechOrbit />
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-bounce">
          <a href={`#${about}`} className="flex flex-col items-center gap-1.5 text-gray-600 hover:text-brand-400 transition-colors">
            <span className="text-[9px] font-mono uppercase tracking-widest">Scroll</span>
            <ArrowDown size={14} />
          </a>
        </div>
      </div>

      <div id={about} className="relative"><About /></div>
      <div id={skills} className="relative"><SkillsPage /></div>
      <div id={experience} className="relative"><ExperiencePage /></div>
      <div id={project} className="relative"><WorkPage /></div>
      <div id={contact} className="relative"><ContactPage /></div>
    </>
  );
}

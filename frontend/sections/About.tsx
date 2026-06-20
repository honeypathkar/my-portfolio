"use client";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { Code2, Rocket, Target, MapPin, Mail, Calendar, ArrowUpRight } from "lucide-react";

const timeline = [
  { year: "2023", title: "Student", desc: "Discovered passion for building products through DSA & web development" },
  { year: "2024", title: "Intern", desc: "Built production apps, learned real-world engineering at scale" },
  { year: "2025", title: "Software Engineer", desc: "Shipping full-stack web & mobile apps with modern tech stacks" },
  { year: "Now", title: "Building Products", desc: "Crafting premium digital experiences that solve real problems" },
];

const highlights = [
  { icon: Code2, label: "Full Stack", desc: "MERN + React Native + Flutter" },
  { icon: Rocket, label: "Product Focus", desc: "End-to-end feature development" },
  { icon: Target, label: "Performance", desc: "Optimized & scalable architecture" },
];

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const profilePicUrl = process.env.NEXT_PUBLIC_PROFILE_PIC || "/preview.jpg";

  useEffect(() => {
    if (!sectionRef.current) return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo(".about-label", { opacity: 0, y: 20 }, {
        opacity: 1, y: 0, duration: 0.6,
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%", once: true }
      });

      gsap.fromTo(".about-title", { opacity: 0, y: 30 }, {
        opacity: 1, y: 0, duration: 0.7, delay: 0.1,
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%", once: true }
      });

      gsap.fromTo(".about-image-wrapper", { opacity: 0, scale: 0.95 }, {
        opacity: 1, scale: 1, duration: 0.8, delay: 0.2,
        scrollTrigger: { trigger: ".about-image-wrapper", start: "top 85%", once: true }
      });

      gsap.fromTo(".about-content > *", { opacity: 0, y: 20 }, {
        opacity: 1, y: 0, duration: 0.6, stagger: 0.08, delay: 0.3,
        scrollTrigger: { trigger: ".about-content", start: "top 85%", once: true }
      });

      gsap.fromTo(".timeline-item", { opacity: 0, x: -20 }, {
        opacity: 1, x: 0, duration: 0.5, stagger: 0.12,
        scrollTrigger: { trigger: ".timeline-item", start: "top 90%", once: true }
      });

      gsap.fromTo(".highlight-card", { opacity: 0, y: 20 }, {
        opacity: 1, y: 0, duration: 0.5, stagger: 0.1,
        scrollTrigger: { trigger: ".highlight-card", start: "top 90%", once: true }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="section-padding">
      <div className="section-container">
        <div className="about-label flex items-center gap-3 mb-4">
          <div className="h-px w-12 bg-brand-500" />
          <span className="text-brand-400 text-xs font-mono font-medium uppercase tracking-widest">About</span>
        </div>
        <h2 className="about-title text-section text-white mb-20">
          A little bit <span className="text-gradient">about me</span>
        </h2>

        <div className="grid lg:grid-cols-5 gap-16 lg:gap-20 items-start">
          <div className="lg:col-span-2 about-image-wrapper">
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-br from-brand-600/20 to-brand-400/10 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="relative overflow-hidden rounded-3xl border border-white/[0.08]">
                <Image
                  src={profilePicUrl}
                  width={600}
                  height={750}
                  className="w-full aspect-[4/5] object-cover"
                  alt="Honey Pathkar"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-surface/60 via-transparent to-transparent" />
              </div>
              <div className="absolute -bottom-4 -right-4 glass-card p-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-brand-500/20 flex items-center justify-center">
                  <MapPin size={18} className="text-brand-400" />
                </div>
                <div>
                  <div className="text-xs text-gray-500 font-medium">Location</div>
                  <div className="text-sm text-white font-semibold">Bengaluru, India</div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3 about-content">
            <div className="space-y-6 text-gray-400 text-base sm:text-lg leading-relaxed">
              <p>
                I'm a <span className="text-white font-medium">Full Stack & Mobile Engineer</span> with 
                2+ years of professional experience building scalable web and mobile applications. 
                I specialize in the MERN stack and React Native, delivering production-ready 
                solutions with clean architecture and optimized performance.
              </p>
              <p>
                Beyond web, I develop cross-platform mobile apps using 
                <span className="text-brand-400 font-medium"> React Native and Flutter</span>, 
                focusing on smooth performance and responsive UI. I've solved 
                <span className="text-white font-medium"> 500+ DSA problems</span>, 
                strengthening my problem-solving ability and writing efficient, maintainable code.
              </p>
              <p>
                My core expertise includes JavaScript, TypeScript, REST APIs, authentication 
                systems, state management, and modern UI frameworks. I aim to build systems 
                that are <span className="text-white font-medium">scalable, secure, and engineered for real-world impact</span>.
              </p>
            </div>

            <div className="grid sm:grid-cols-3 gap-4 mt-10">
              {highlights.map((h) => (
                <div key={h.label} className="highlight-card glass-card p-5 group hover:border-brand-500/20 transition-all duration-500">
                  <h.icon className="w-5 h-5 text-brand-400 mb-3" />
                  <div className="text-white font-semibold text-sm mb-1">{h.label}</div>
                  <div className="text-gray-500 text-xs">{h.desc}</div>
                </div>
              ))}
            </div>

            <div className="mt-12">
              <h3 className="text-xs font-mono text-brand-400 uppercase tracking-widest mb-6">Journey</h3>
              <div className="space-y-0">
                {timeline.map((t, i) => (
                  <div key={t.year} className="timeline-item flex gap-6 relative pb-8 last:pb-0">
                    <div className="flex flex-col items-center">
                      <div className={`w-3 h-3 rounded-full ${i === timeline.length - 1 ? 'bg-brand-500 shadow-glow-sm' : 'bg-white/10 border border-white/20'}`} />
                      {i < timeline.length - 1 && <div className="w-px flex-1 bg-white/[0.06] mt-2" />}
                    </div>
                    <div className="pb-2">
                      <div className="flex items-center gap-3 mb-1">
                        <span className="text-xs font-mono text-brand-400">{t.year}</span>
                        <span className="text-white font-semibold text-sm">{t.title}</span>
                      </div>
                      <p className="text-gray-500 text-sm">{t.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

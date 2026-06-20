"use client";
import React, { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import axios from "axios";
import { X, Calendar, MapPin, Briefcase, Zap, ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const API_BASE = process.env.NEXT_PUBLIC_DATA_API || "https://api.honeypathkar.com";

interface Experience {
  _id: string;
  companyName: string;
  companyLogo?: string;
  role: string;
  duration: string;
  location: string;
  shortDescription: string;
  longDescription: string;
  technologiesUsed: string[];
  isVisible?: boolean;
}

const decodeHTMLEntities = (text?: string) => {
  if (!text) return "";
  return text
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&nbsp;/g, " ");
};

export default function ExperiencePage() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [selectedExp, setSelectedExp] = useState<Experience | null>(null);
  const [expandedIdx, setExpandedIdx] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (selectedExp) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [selectedExp]);

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const res = await axios.get(`${API_BASE}/experience`, {
          headers: { Authorization: `Bearer ${process.env.NEXT_PUBLIC_ACCESS_TOKEN}` }
        });
        setExperiences(res.data.filter((e: Experience) => e.isVisible !== false));
      } catch (e) {
        console.error("Failed to fetch experiences", e);
      } finally {
        setLoading(false);
      }
    };
    fetchExperiences();
  }, []);

  useEffect(() => {
    if (!sectionRef.current) return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo(".exp-label", { opacity: 0, y: 20 }, {
        opacity: 1, y: 0, duration: 0.6,
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%", once: true }
      });
      gsap.fromTo(".exp-title", { opacity: 0, y: 30 }, {
        opacity: 1, y: 0, duration: 0.7, delay: 0.1,
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%", once: true }
      });
      gsap.fromTo(".timeline-node", { opacity: 0, x: -30 }, {
        opacity: 1, x: 0, duration: 0.6, stagger: 0.15,
        scrollTrigger: { trigger: ".timeline-nodes", start: "top 85%", once: true }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [loading]);

  return (
    <section ref={sectionRef} className="section-padding">
      <div className="section-container">
        <div className="exp-label flex items-center gap-3 mb-4">
          <div className="h-px w-12 bg-brand-500" />
          <span className="text-brand-400 text-xs font-mono font-medium uppercase tracking-widest">Experience</span>
        </div>
        <h2 className="exp-title text-section text-white mb-4">
          Professional <span className="text-gradient">Journey</span>
        </h2>
        <p className="text-gray-500 text-lg max-w-xl mb-16">
          My career path and the impact I've made along the way.
        </p>

        {loading ? (
          <div className="space-y-8">
            {[1, 2, 3].map(i => (
              <div key={i} className="glass-card p-8 h-48 animate-pulse" />
            ))}
          </div>
        ) : experiences.length > 0 ? (
          <div className="timeline-nodes relative">
            <div className="absolute left-6 sm:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-brand-500/20 via-brand-500/10 to-transparent" />

            <div className="space-y-6">
              {experiences.map((exp, idx) => {
                const isExpanded = expandedIdx === idx;
                return (
                  <div key={exp._id} className="timeline-node relative pl-10 sm:pl-20">
                    <div className={`absolute left-4 sm:left-6 top-8 w-4 h-4 rounded-full border-2 transition-all duration-500 ${
                      isExpanded
                        ? "bg-brand-500 border-brand-400 shadow-glow-sm"
                        : "bg-surface border-white/20 hover:border-brand-500/50"
                    }`} />

                    <div
                      className={`glass-card overflow-hidden transition-all duration-500 ${
                        isExpanded ? "border-brand-500/20 shadow-glow-sm" : "hover:border-white/[0.1]"
                      }`}
                    >
                      <div
                        className="p-6 sm:p-8 cursor-pointer"
                        onClick={() => setExpandedIdx(isExpanded ? null : idx)}
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                          <div className="w-14 h-14 shrink-0 rounded-2xl bg-white/[0.05] border border-white/[0.08] flex items-center justify-center overflow-hidden">
                            {exp.companyLogo ? (
                              <Image src={exp.companyLogo} alt={exp.companyName} width={56} height={56} className="w-full h-full object-contain p-1" />
                            ) : (
                              <Briefcase size={24} className="text-brand-400/50" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="text-lg sm:text-xl font-bold text-white leading-tight">{exp.role}</h3>
                            <p className="text-brand-400 text-sm font-medium mt-1">{exp.companyName}</p>
                          </div>
                          <div className="flex flex-wrap items-center gap-2 sm:gap-4 mt-2 sm:mt-0">
                            <div className="flex items-center gap-1.5 text-[11px] text-gray-500 font-mono">
                              <Calendar size={12} /> {exp.duration}
                            </div>
                            <div className="flex items-center gap-1.5 text-[11px] text-gray-500 font-mono">
                              <MapPin size={12} /> {exp.location}
                            </div>
                            <div className="w-8 h-8 rounded-xl bg-white/[0.03] flex items-center justify-center">
                              {isExpanded ? <ChevronUp size={16} className="text-gray-400" /> : <ChevronDown size={16} className="text-gray-400" />}
                            </div>
                          </div>
                        </div>

                        {!isExpanded && (
                          <p className="text-gray-500 text-sm mt-4 line-clamp-2">{exp.shortDescription}</p>
                        )}
                      </div>

                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                          >
                            <div className="px-6 sm:px-8 pb-6 sm:pb-8 border-t border-white/[0.04] pt-6">
                              <p className="text-gray-300 text-sm leading-relaxed mb-6">{exp.shortDescription}</p>

                              {exp.longDescription && (
                                <div
                                  className="prose-experience mb-6"
                                  dangerouslySetInnerHTML={{ __html: decodeHTMLEntities(exp.longDescription) }}
                                />
                              )}

                              <div className="flex flex-wrap gap-2">
                                {exp.technologiesUsed?.map((tech, i) => (
                                  <span key={i} className="px-3 py-1.5 bg-brand-500/10 border border-brand-500/20 rounded-lg text-[11px] font-mono font-medium text-brand-300">
                                    {tech}
                                  </span>
                                ))}
                              </div>

                              {exp.longDescription && (
                                <button
                                  onClick={(e) => { e.stopPropagation(); setSelectedExp(exp); }}
                                  className="mt-6 flex items-center gap-2 text-brand-400 text-sm font-medium hover:text-brand-300 transition-colors"
                                >
                                  <Zap size={14} /> View Full Details
                                </button>
                              )}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="glass-card p-16 text-center">
            <p className="text-gray-500 text-lg">No experience added yet.</p>
          </div>
        )}
      </div>

      {/* Experience Detail Modal */}
      <AnimatePresence>
        {selectedExp && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedExp(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-3xl bg-surface-100 border border-white/[0.08] rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              <button
                onClick={() => setSelectedExp(null)}
                className="absolute top-6 right-6 p-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.06] text-gray-400 hover:text-white transition-all z-10"
              >
                <X size={18} />
              </button>

              <div className="p-8 sm:p-10 overflow-y-auto">
                <div className="flex items-center gap-5 mb-8">
                  <div className="w-20 h-20 shrink-0 rounded-2xl bg-white/[0.05] border border-white/[0.08] flex items-center justify-center overflow-hidden">
                    {selectedExp.companyLogo ? (
                      <Image src={selectedExp.companyLogo} alt={selectedExp.companyName} width={80} height={80} className="w-full h-full object-contain p-1" />
                    ) : (
                      <Briefcase size={32} className="text-brand-400/50" />
                    )}
                  </div>
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-white">{selectedExp.role}</h2>
                    <p className="text-brand-400 font-medium mt-1">{selectedExp.companyName}</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3 mb-8">
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-white/[0.03] border border-white/[0.06] rounded-xl text-xs text-gray-400 font-mono">
                    <Calendar size={12} className="text-brand-400" /> {selectedExp.duration}
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-white/[0.03] border border-white/[0.06] rounded-xl text-xs text-gray-400 font-mono">
                    <MapPin size={12} className="text-brand-400" /> {selectedExp.location}
                  </div>
                </div>

                <div className="space-y-8">
                  <div>
                    <h4 className="text-xs font-mono text-brand-400 uppercase tracking-widest mb-4">Overview</h4>
                    <p className="text-gray-300 leading-relaxed">{selectedExp.shortDescription}</p>
                  </div>

                  {selectedExp.longDescription && (
                    <div>
                      <h4 className="text-xs font-mono text-brand-400 uppercase tracking-widest mb-4">Key Responsibilities</h4>
                      <div
                        className="prose-experience"
                        dangerouslySetInnerHTML={{ __html: decodeHTMLEntities(selectedExp.longDescription) }}
                      />
                    </div>
                  )}

                  <div>
                    <h4 className="text-xs font-mono text-brand-400 uppercase tracking-widest mb-4">Tech Stack</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedExp.technologiesUsed?.map((tech, i) => (
                        <span key={i} className="px-4 py-2 bg-brand-500/10 border border-brand-500/20 rounded-xl text-xs font-mono font-medium text-brand-300">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

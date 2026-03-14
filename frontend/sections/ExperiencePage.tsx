
"use client";

import React, { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import axios from "axios";
import { X, Calendar, MapPin, Briefcase, Zap, ChevronLeft, ChevronRight } from "lucide-react";
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

export default function ExperiencePage() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [selectedExp, setSelectedExp] = useState<Experience | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const sectionRef = useRef<HTMLDivElement | null>(null);

  // Prevent background scroll when modal is open
  useEffect(() => {
    if (selectedExp) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedExp]);

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const res = await axios.get(`${API_BASE}/experience`, {
          headers: { Authorization: `Bearer ${process.env.NEXT_PUBLIC_ACCESS_TOKEN}` }
        });
        // Only show visible experiences on the main page
        setExperiences(res.data.filter((e: Experience) => e.isVisible !== false));
      } catch (e) {
        console.error("Failed to fetch experiences", e);
      } finally {
        setLoading(false);
      }
    };
    fetchExperiences();
  }, []);

  const getVisibleIndices = () => {
    if (experiences.length === 0) return [];
    if (experiences.length === 1) return [0];
    if (experiences.length === 2) return [0, 1];
    
    const prev = (currentIndex - 1 + experiences.length) % experiences.length;
    const next = (currentIndex + 1) % experiences.length;
    return [prev, currentIndex, next];
  };

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prevIndex) => {
      let nextIndex = prevIndex + newDirection;
      if (nextIndex < 0) nextIndex = experiences.length - 1;
      if (nextIndex >= experiences.length) nextIndex = 0;
      return nextIndex;
    });
  };

  const visibleIndices = getVisibleIndices();

  return (
    <div ref={sectionRef} className="py-24 bg-gray-950/20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-white">Experience</h2>
          <div className="w-20 h-1 bg-purple-600 mt-4 mx-auto rounded-full"></div>
          <p className="mt-6 text-lg leading-relaxed text-gray-400 max-w-2xl mx-auto font-medium">
            My professional journey and the impact I've made at various organizations.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center">
            <div className="w-full max-w-2xl h-[400px] bg-white/5 rounded-[2.5rem] animate-pulse border border-white/5"></div>
          </div>
        ) : experiences.length > 0 ? (
          <div className="relative flex flex-col items-center">
            <div className="relative w-full flex items-center justify-center min-h-[550px]">
              {/* Carousel Viewport */}
              <div className="relative w-full max-w-5xl flex items-center justify-center">
                <AnimatePresence initial={false} mode="popLayout">
                  {experiences.map((exp, idx) => {
                    let offset = (idx - currentIndex + experiences.length) % experiences.length;
                    
                    // Adjust offset for infinite loop
                    if (offset > experiences.length / 2) {
                      offset -= experiences.length;
                    } else if (offset < -experiences.length / 2) {
                      offset += experiences.length;
                    }

                    const isCenter = idx === currentIndex;
                    const isVisible = Math.abs(offset) <= 1;

                    if (!isVisible) return null;

                    return (
                      <motion.div
                        key={exp._id}
                        initial={false}
                        animate={{ 
                          opacity: isCenter ? 1 : 0.15, 
                          scale: isCenter ? 1.05 : 0.8,
                          x: offset * 320, // Adjust spacing
                          zIndex: isCenter ? 30 : 10,
                          filter: isCenter ? "blur(0px)" : "blur(8px)",
                        }}
                        transition={{
                          type: "spring",
                          stiffness: 200,
                          damping: 25
                        }}
                        className={`absolute w-full max-w-[320px] sm:max-w-[480px] shrink-0 ${!isCenter ? 'cursor-pointer' : ''}`}
                        onClick={() => {
                          if (!isCenter) {
                            setDirection(offset > 0 ? 1 : -1);
                            setCurrentIndex(idx);
                          }
                        }}
                      >
                        <div 
                          onClick={() => {
                            if (isCenter && exp.longDescription) setSelectedExp(exp);
                          }}
                          className={`group relative bg-gradient-to-br from-gray-900/90 to-gray-900/40 border ${isCenter ? 'border-purple-500/40' : 'border-white/10'} rounded-[2.5rem] p-8 sm:p-10 transition-all duration-500 shadow-2xl overflow-hidden h-full ${isCenter && exp.longDescription ? 'cursor-pointer' : isCenter ? 'cursor-default' : 'cursor-pointer'}`}
                        >
                          {/* Background Accent */}
                          {isCenter && <div className="absolute top-0 right-0 w-48 h-48 bg-purple-600/10 rounded-full blur-[60px] -mr-24 -mt-24"></div>}

                          <div className="flex flex-col gap-6 relative z-10">
                            {/* Header: Logo & Role */}
                            <div className="flex items-center gap-4">
                              <div className="w-20 h-20 shrink-0 bg-white/5 rounded-2xl border border-white/10 flex items-center justify-center overflow-hidden group-hover:bg-white/10 transition-colors">
                                {exp.companyLogo ? (
                                  <Image 
                                    src={exp.companyLogo} 
                                    alt={exp.companyName}
                                    width={80}
                                    height={80}
                                    className="w-full h-full object-contain"
                                  />
                                ) : (
                                  <Briefcase size={32} className="text-purple-500/50" />
                                )}
                              </div>
                              <div className="min-w-0">
                                <h3 className="text-xl sm:text-2xl font-black text-white group-hover:text-purple-400 transition-colors leading-tight truncate">
                                  {exp.role}
                                </h3>
                                <p className="text-purple-400 text-sm font-bold truncate">{exp.companyName}</p>
                              </div>
                            </div>

                            {/* Meta Info */}
                            <div className="flex flex-wrap gap-4 text-[10px] text-gray-500 font-black uppercase tracking-widest">
                              <div className="flex items-center gap-1.5">
                                <Calendar size={12} className="text-purple-500/50" /> {exp.duration}
                              </div>
                              <div className="flex items-center gap-1.5">
                                <MapPin size={12} className="text-purple-500/50" /> {exp.location}
                              </div>
                            </div>

                            {/* Description */}
                            <p className="text-gray-400 text-sm leading-relaxed line-clamp-3">
                              {exp.shortDescription}
                            </p>

                            {/* Tech Stack */}
                            <div className="flex flex-wrap gap-2 pt-2">
                              {exp.technologiesUsed?.slice(0, 4).map((tech, i) => (
                                <span key={i} className="px-3 py-1 bg-white/5 border border-white/5 rounded-lg text-[9px] font-bold text-gray-500">
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </div>

                          {/* Footer: Action */}
                          {isCenter && (
                            <div className="mt-8 pt-6 border-t border-white/5 flex justify-between items-center">
                              {exp.longDescription ? (
                                <div className="flex items-center gap-2 text-purple-400 font-black text-[10px] uppercase tracking-widest">
                                  View Details <Zap size={12} className="fill-current" />
                                </div>
                              ) : (
                                <div className="text-[10px] text-gray-600 font-bold uppercase tracking-tighter">End of Journey</div>
                              )}
                              <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse"></div>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>
            </div>
            
            {/* Carousel Navigation Buttons */}
            {experiences.length > 1 && (
              <div className="flex gap-10 mt-12">
                <button 
                  onClick={() => paginate(-1)}
                  className="p-5 rounded-full bg-white/5 hover:bg-purple-600 border border-white/10 text-white transition-all transform hover:scale-125 active:scale-95 shadow-2xl"
                >
                  <ChevronLeft size={32} />
                </button>
                
                {/* Pagination Dots */}
                <div className="flex items-center gap-4">
                  {experiences.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        setDirection(i > currentIndex ? 1 : -1);
                        setCurrentIndex(i);
                      }}
                      className={`h-2 rounded-full transition-all duration-700 ${currentIndex === i ? "bg-purple-500 w-16" : "bg-white/20 w-4 hover:bg-white/40"}`}
                    />
                  ))}
                </div>

                <button 
                  onClick={() => paginate(1)}
                  className="p-5 rounded-full bg-white/5 hover:bg-purple-600 border border-white/10 text-white transition-all transform hover:scale-125 active:scale-95 shadow-2xl"
                >
                  <ChevronRight size={32} />
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="p-16 rounded-[3rem] bg-white/5 border border-white/5 text-center">
            <h3 className="text-2xl font-bold text-gray-400">No experience added yet.</h3>
          </div>
        )}
      </div>

      {/* Experience Modal */}
      <AnimatePresence>
        {selectedExp && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedExp(null)}
              className="absolute inset-0 bg-black/90 backdrop-blur-md"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              className="relative w-full max-w-3xl bg-[#0a0f1c] border border-white/10 rounded-[3rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              <button 
                onClick={() => setSelectedExp(null)}
                className="absolute top-6 right-6 p-2.5 bg-white/5 hover:bg-red-500/20 hover:text-red-400 border border-white/10 rounded-full text-white transition-all z-10"
              >
                <X size={20} />
              </button>

              <div className="p-8 sm:p-12 overflow-y-auto custom-scrollbar">
                <div className="flex flex-col gap-8 mb-12">
                  <div className="flex items-center gap-6">
                    <div className="w-24 h-24 sm:w-32 sm:h-32 shrink-0 bg-white/5 rounded-3xl border border-white/10 flex items-center justify-center overflow-hidden">
                      {selectedExp.companyLogo ? (
                        <Image 
                          src={selectedExp.companyLogo} 
                          alt={selectedExp.companyName}
                          width={128}
                          height={128}
                          className="w-full h-full object-contain"
                        />
                      ) : (
                        <Briefcase className="text-purple-400" size={48} />
                      )}
                    </div>
                    <div>
                      <h2 className="text-3xl sm:text-4xl font-black text-white leading-tight">{selectedExp.role}</h2>
                      <h3 className="text-xl text-purple-400 font-bold mt-2">{selectedExp.companyName}</h3>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-4 text-xs sm:text-sm text-gray-400 font-bold uppercase tracking-widest">
                    <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-xl border border-white/5">
                      <Calendar size={16} className="text-purple-500" /> {selectedExp.duration}
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-xl border border-white/5">
                      <MapPin size={16} className="text-purple-500" /> {selectedExp.location}
                    </div>
                  </div>
                </div>

                <div className="space-y-12">
                  <section>
                    <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-500 mb-6 border-l-2 border-purple-600 pl-4">Overview</h4>
                    <p className="text-xl text-gray-300 leading-relaxed font-medium break-words">
                      {selectedExp.shortDescription}
                    </p>
                  </section>

                  <section>
                    <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-500 mb-6 border-l-2 border-purple-600 pl-4">Key Responsibilities & Impact</h4>
                    <div 
                      className="text-gray-400 text-lg leading-relaxed prose prose-invert max-w-none prose-p:mb-6 prose-li:mb-2 break-words"
                      dangerouslySetInnerHTML={{ __html: selectedExp.longDescription }}
                    />
                  </section>

                  <section className="pb-4">
                    <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-500 mb-6 border-l-2 border-purple-600 pl-4">Core Stack</h4>
                    <div className="flex flex-wrap gap-3">
                      {selectedExp.technologiesUsed?.map((tech, i) => (
                        <span key={i} className="px-5 py-2.5 bg-purple-500/10 border border-purple-500/20 rounded-2xl text-xs font-black text-purple-300 uppercase tracking-widest">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </section>
                </div>
              </div>

              <div className="p-6 bg-white/5 border-t border-white/5 flex justify-center">
                <p className="text-[10px] text-gray-600 font-black uppercase tracking-[0.5em]">Professional Record • Honey Pathkar</p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

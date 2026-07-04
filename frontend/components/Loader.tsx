"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const terminalMessages = [
  { text: "> initializing honey_core ...............", delay: 0 },
  { text: "> loading engineering protocols ......... OK", delay: 15 },
  { text: "> calibrating full-stack environment .... OK", delay: 40 },
  { text: "> compiling mobile builds ............... DONE", delay: 70 },
  { text: "> launching fyance engine ............... READY", delay: 90 },
];

export default function Loader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [visibleMessages, setVisibleMessages] = useState<string[]>([]);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    // Disable scrolling while loader is active
    document.body.style.overflow = "hidden";
    
    const duration = 800; // Total loading time in ms (reduced from 2500 for faster load)
    const interval = 16; // Update roughly 60fps
    const steps = duration / interval;
    const increment = 100 / steps;
    
    let currentProgress = 0;
    
    const timer = setInterval(() => {
      currentProgress += increment;
      if (currentProgress >= 100) {
        currentProgress = 100;
        clearInterval(timer);
        
        // Wait a very brief moment at 100% before fading out
        setTimeout(() => {
          setIsFadingOut(true);
          setTimeout(() => {
            document.body.style.overflow = "";
            onComplete();
          }, 600); // Slightly faster exit animation wait
        }, 150); // Reduced wait time at 100%
      }
      setProgress(currentProgress);
      
      // Reveal messages based on progress
      const newMessages = terminalMessages
        .filter(msg => currentProgress >= msg.delay)
        .map(msg => msg.text);
        
      if (newMessages.length !== visibleMessages.length) {
        setVisibleMessages(newMessages);
      }
      
    }, interval);

    return () => {
      clearInterval(timer);
      document.body.style.overflow = "";
    };
  }, [onComplete]);

  // Format progress to always be 3 digits (e.g., 005, 050, 100)
  const displayProgress = Math.floor(progress).toString().padStart(3, "0");

  return (
    <AnimatePresence>
      {!isFadingOut && (
        <motion.div
          initial={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: "-100%" }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }} // Smooth premium slide up
          className="fixed inset-0 z-[100] bg-[#050505] flex flex-col items-center justify-center text-white overflow-hidden"
        >
          {/* Terminal Messages (Top Left/Center) */}
          <div className="absolute top-[35%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] md:w-[320px] font-mono text-[10px] md:text-[11px] text-brand-400/80 space-y-2 flex flex-col items-start justify-end h-32">
            {visibleMessages.map((msg, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2 }}
                className="whitespace-nowrap"
              >
                {msg}
              </motion.div>
            ))}
          </div>

          {/* Center Counter */}
          <div className="relative mt-24 flex flex-col items-center">
            <div className="text-[8rem] md:text-[12rem] font-bebas tracking-widest text-white leading-none">
              {displayProgress}
            </div>
            
            {/* Progress Line */}
            <div className="w-[120%] h-[2px] bg-white/[0.05] mt-6 rounded-full overflow-hidden relative">
              <motion.div 
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-brand-500 to-brand-300 rounded-full"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
          
          {/* Subtle noise/grain overlay for premium dark feel */}
          <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

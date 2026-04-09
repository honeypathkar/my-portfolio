"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function CursorSparkle() {
  const [sparkles, setSparkles] = useState<Array<{id: number, x: number, y: number, size: number}>>([]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Create sparkles randomly as mouse moves
      if (Math.random() > 0.7) { // 30% chance to create a sparkle
        const newSparkle = {
          id: Date.now() + Math.random(),
          x: e.clientX + (Math.random() - 0.5) * 100,
          y: e.clientY + (Math.random() - 0.5) * 100,
          size: Math.random() * 4 + 2,
        };

        setSparkles(prev => [...prev.slice(-15), newSparkle]); // Keep only last 15 sparkles
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <>
      {sparkles.map((sparkle) => (
        <motion.div
          key={sparkle.id}
          className="fixed rounded-full bg-gradient-to-r from-purple-300 via-pink-300 to-blue-300 pointer-events-none shadow-lg z-[9999]"
          style={{
            left: sparkle.x,
            top: sparkle.y,
            width: sparkle.size,
            height: sparkle.size,
            boxShadow: '0 0 8px 2px rgba(192, 132, 252, 0.8)',
          }}
          initial={{ opacity: 1, scale: 1 }}
          animate={{
            opacity: 0,
            scale: 0,
            y: [0, -20, -40],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: Math.random() * 1 + 0.5,
            ease: "easeOut"
          }}
          onAnimationComplete={() => {
            setSparkles(prev => prev.filter(s => s.id !== sparkle.id));
          }}
        />
      ))}
    </>
  );
}
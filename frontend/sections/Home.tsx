"use client";
import React from "react";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { motion } from "framer-motion";
import Typewriter from "typewriter-effect";
import SkillsPage from "./SkillsPage";
import WorkPage from "./WorkPage";
import ContactPage from "./ContactPage";
import About from "./About";
import ExperiencePage from "./ExperiencePage";

export default function Home({
  home,
  about,
  skills,
  project,
  contact,
  experience,
}: {
  home: string;
  about: string;
  skills: string;
  project: string;
  contact: string;
  experience: string;
}) {
  const heroRef = useRef<HTMLDivElement | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    if (heroRef.current) {
      // hero container fade in
      gsap.fromTo(
        heroRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.6 }
      );
      // per-character animation for greeting text
      const chars = heroRef.current.querySelectorAll(".greet .char");
      if (chars.length) {
        gsap.fromTo(
          chars,
          { y: 24, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, ease: "power3.out", stagger: 0.03 }
        );
      }
      // buttons
      gsap.fromTo(
        heroRef.current.querySelectorAll(".hero-cta a"),
        { y: 16, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, delay: 0.2 }
      );
    }
  }, []);

  // Floating shapes data
  const floatingShapes = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    size: Math.random() * 100 + 50,
    posX: Math.random() * 100,
    posY: Math.random() * 100,
    delay: Math.random() * 10,
    duration: Math.random() * 20 + 20,
  }));

  return (
    <>
      <div className="homepage" id={home} ref={heroRef}>
        <div className="relative inset-0 bg-gradient-to-br from-purple-900 via-gray-900 to-gray-900 overflow-hidden">
          {/* Animated Background Elements */}
          <div className="absolute inset-0">
            {/* Floating Geometric Shapes */}
            {floatingShapes.map((shape) => (
              <motion.div
                key={shape.id}
                className="absolute rounded-full bg-purple-500/10 border border-purple-500/20"
                style={{
                  width: shape.size,
                  height: shape.size,
                  left: `${shape.posX}%`,
                  top: `${shape.posY}%`,
                  translateX: "-50%",
                  translateY: "-50%",
                }}
                animate={{
                  y: [0, -15, 0],
                  x: [0, 10, 0],
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: shape.duration,
                  repeat: Infinity,
                  delay: shape.delay,
                  ease: "easeInOut",
                }}
              />
            ))}

            {/* Gradient Orbs */}
            <motion.div
              className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600 rounded-full mix-blend-soft-light filter blur-3xl opacity-30"
              animate={{
                x: [0, 100, 0],
                y: [0, 50, 0],
              }}
              transition={{
                duration: 40,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600 rounded-full mix-blend-soft-light filter blur-3xl opacity-30"
              animate={{
                x: [0, -100, 0],
                y: [0, -50, 0],
              }}
              transition={{
                duration: 45,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 10,
              }}
            />
          </div>

          {/* Mouse Follower Effect */}
          <motion.div
            className="fixed w-96 h-96 bg-purple-600 rounded-full mix-blend-soft-light filter blur-3xl opacity-10 pointer-events-none z-0"
            animate={{
              x: mousePosition.x - 192,
              y: mousePosition.y - 192,
            }}
            transition={{ type: "spring", stiffness: 50, damping: 10 }}
          />

          <div className="relative isolate px-6 pt-5 lg:px-20 z-10">
            <div className="mx-auto max-w-4xl py-40 lg:py-52">
              <div className="sm:mb-10 sm:flex sm:justify-center">
                <motion.div
                  className="relative rounded-full px-5 py-2 text-sm leading-6 text-white ring-1 ring-gray-900/10 hover:ring-gray-900/20 backdrop-blur-sm bg-white/5"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  {"Let's Connect "}
                  <a
                    href="mailto:honeypatkar70@gmail.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-purple-400 hover:text-purple-300 transition-colors"
                  >
                    <span
                      className="absolute inset-0"
                      aria-hidden="true"
                    ></span>{" "}
                    Message Me <span aria-hidden="true">&rarr;</span>
                  </a>
                </motion.div>
              </div>
              <div className="text-center">
                <motion.h1
                  className="greet text-5xl md:text-7xl font-extrabold tracking-tight text-white mb-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  {"Hii I'm Honey".split("").map((ch, idx) => (
                    <span
                      key={idx}
                      className={`char ${
                        idx >= 7 ? "text-purple-400" : "text-white"
                      }`}
                      style={{ display: "inline-block" }}
                    >
                      {ch === " " ? "\u00A0" : ch}
                    </span>
                  ))}
                  <br />
                  <span className="text-purple-400 text-3xl md:text-5xl">
                    <Typewriter
                      onInit={(typewriter) => {
                        typewriter
                          .typeString("Software Engineer !")
                          .pauseFor(2000)
                          .deleteAll()
                          .typeString("Android Developer !")
                          .pauseFor(2000)
                          .deleteAll()
                          .typeString("Programmer !")
                          .pauseFor(2000)
                          .deleteAll()
                          .start();
                      }}
                      options={{ loop: true }}
                    />
                  </span>
                </motion.h1>

                <motion.p
                  className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-12 leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  I build exceptional digital experiences that are fast, accessible, and visually appealing.
                </motion.p>

                <div className="hero-cta mt-10 flex flex-wrap items-center justify-center gap-4">
                  <motion.a
                    href={`#${contact}`}
                    className="rounded-full bg-purple-600 px-8 py-4 text-base font-bold text-white shadow-lg hover:bg-purple-500 border-[2px] border-purple-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-all transform hover:-translate-y-1"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.4 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Contact Me
                  </motion.a>
                  <motion.a
                    href="/blogs"
                    className="text-base font-bold leading-6 text-white border-[2px] border-purple-600 px-8 py-4 rounded-full hover:bg-purple-600 transition-all transform hover:-translate-y-1"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.5 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Read My Blogs
                  </motion.a>
                  <motion.a
                    href="https://linkedin.com/in/honey-pathkar"
                    className="text-base font-bold leading-6 text-white border-[2px] border-purple-600 px-8 py-4 rounded-full hover:bg-purple-600 transition-all transform hover:-translate-y-1"
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.6 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    LinkedIn Profile
                  </motion.a>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center mt-16 transform -translate-x-1/2 animate-bounce">
            <motion.svg
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1 }}
            >
              <path d="M6 9l6 6 6-6" />
            </motion.svg>
          </div>
        </div>
      </div>
      <div id={about} className="pt-[70px] min-h-screen">
        <About />
      </div>
      <div id={skills} className="pt-[70px] min-h-screen">
        <SkillsPage />
      </div>
      <div id={experience} className="pt-[70px] inset-0">
        <ExperiencePage />
      </div>
      <div
        id={project}
        className="pt-[1px] min-h-screen justify-center items-center"
      >
        <WorkPage />
      </div>
      <div
        id={contact}
        className="py-[70px] inset-0 bg-gradient-to-br to-purple-900 via-gray-900 from-gray-900 "
      >
        <ContactPage />
      </div>
    </>
  );
}

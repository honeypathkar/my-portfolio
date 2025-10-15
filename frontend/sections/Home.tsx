"use client";
import React from "react";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
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
  useEffect(() => {
    if (heroRef.current) {
      // hero container fade in
      gsap.fromTo(heroRef.current, { opacity: 0 }, { opacity: 1, duration: 0.6 });
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
      gsap.fromTo(heroRef.current.querySelectorAll(".hero-cta a"), { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, delay: 0.2 });
    }
  }, []);

  return (
    <>
      <div className="homepage" id={home} ref={heroRef}>
        <div className="inset-0 bg-gradient-to-br from-purple-900 via-gray-900 to-gray-900 ">
          <div className="relative isolate px-6 pt-5 lg:px-20">
            <div className="mx-auto max-w-2xl py-56 lg:py-[195px]">
              <div className="hidden sm:mb-8 sm:flex sm:justify-center">
                <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-white ring-1 ring-gray-900/10 hover:ring-gray-900/20">
                  {"Let's Contact "}
                  <a href="mailto:honeypatkar70@gmail.com" target="_blank" rel="noopener noreferrer" className="font-semibold text-purple-500">
                    <span className="absolute inset-0" aria-hidden="true"></span>{" "}
                    Message Me <span aria-hidden="true">&rarr;</span>
                  </a>
                </div>
              </div>
              <div className="text-center">
                <h1 className="greet text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                  {"Hii I'm Honey".split("").map((ch, idx) => (
                    <span key={idx} className={`char ${idx >= 7 ? "text-purple-500" : "text-white"}`} style={{ display: "inline-block" }}>
                      {ch === " " ? "\u00A0" : ch}
                    </span>
                  ))}
                  <br />
                  <span className="text-purple-500">
                    <Typewriter
                      onInit={(typewriter) => {
                        typewriter
                          .typeString("Web Developer !")
                          .pauseFor(2000)
                          .deleteChars(17)
                          .typeString("Android Developer !")
                          .pauseFor(2000)
                          .deleteChars(20)
                          .typeString("Programmer !")
                          .pauseFor(2000)
                          .deleteAll()
                          .start();
                      }}
                      options={{ loop: true }}
                    />
                  </span>
                </h1>
                <div className="hero-cta mt-10 flex items-center justify-center gap-x-6">
                  <a href={`#${contact}`} className="rounded-full bg-purple-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-purple-500 border-[2px] border-purple-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                    Contact
                  </a>
                  <a href="https://linkedin.com/in/honey-pathkar" className="text-sm font-semibold leading-6 text-white border-[2px] border-purple-600 px-5 py-2.5 rounded-full" target="_blank" rel="noopener noreferrer">
                    More
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center mt-10 transform -translate-x-1/2 animate-bounce">
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6" /></svg>
          </div>
        </div>
      </div>
      <div id={about} className="pt-[70px] min-h-screen"><About /></div>
      <div id={skills} className="pt-[70px] min-h-screen"><SkillsPage /></div>
      <div id={experience} className="pt-[70px] inset-0"><ExperiencePage /></div>
      <div id={project} className="pt-[1px] min-h-screen justify-center items-center"><WorkPage /></div>
      <div id={contact} className="py-[70px] inset-0 bg-gradient-to-br to-purple-900 via-gray-900 from-gray-900 "><ContactPage /></div>
    </>
  );
}



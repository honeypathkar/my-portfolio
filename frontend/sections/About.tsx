"use client";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

export default function About() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const profilePicUrl = process.env.NEXT_PUBLIC_PROFILE_PIC || "/preview.jpg";

  useEffect(() => {
    if (!sectionRef.current) return;
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.fromTo(
        sectionRef.current!.querySelectorAll("h1, p, img, span"),
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.06,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current as Element,
            start: "top 75%",
            end: "bottom 25%",
            toggleActions: "play reverse play reverse",
          },
        },
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);
  return (
    <div ref={sectionRef} className="px-4 py-8 sm:px-6 lg:px-8 bg-gray-900">
      <div className="flex flex-col items-center text-center">
        <h1 className="text-4xl font-bold text-white sm:text-5xl">About Me</h1>
        <div className="w-20 h-1 bg-purple-600 mt-3"></div>
      </div>
      <div className="flex flex-col lg:flex-row flex-wrap justify-center items-center pt-14 gap-10 lg:gap-20">
        <div className="flex-1 max-w-full sm:max-w-[400px] lg:max-w-[500px]">
          <Image
            src={profilePicUrl}
            width={600}
            height={600}
            className="w-full aspect-square object-cover rounded-lg"
            alt="Profile"
          />
        </div>
        <div className="flex-1 max-w-full sm:max-w-[400px] lg:max-w-[600px]">
          <h1 className="text-2xl sm:text-3xl text-purple-400 font-semibold">
              Software Engineer (Full-Stack) | MERN & React Native
          </h1>

          <p className="mt-4 text-sm sm:text-base lg:text-lg text-white leading-relaxed">
  I am a Software Engineer with 1+ year of professional experience building 
  scalable full-stack web and mobile applications. I specialize in the MERN 
  stack (MongoDB, Express.js, React.js, Node.js), delivering production-ready 
  solutions with clean architecture, optimized performance, and intuitive user 
  experiences.

  Beyond web applications, I develop cross-platform mobile apps using React 
  Native and Flutter, focusing on smooth performance and responsive UI. I have 
  solved 500+ Data Structures and Algorithms problems, strengthening my problem-
  solving ability and writing efficient, maintainable code.

  My core expertise includes JavaScript, TypeScript, REST APIs, authentication 
  systems, state management, and modern UI frameworks like Tailwind CSS and 
  Bootstrap. I aim to build systems that are scalable, secure, and engineered 
  for real-world impact.
          </p>
          <div className="text-white mt-4 text-sm sm:text-[15px]">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <p>
                <span className="text-purple-400">Name:&nbsp;&nbsp;</span> Honey
                Pathkar
              </p>
              <p>
                <span className="text-purple-400">Email:&nbsp;&nbsp;</span>{" "}
                honeypatkar70@gmail.com
              </p>
              <p>
                <span className="text-purple-400">Location:&nbsp;&nbsp;</span>{" "}
                Baran, Rajasthan
              </p>
              <p>
                <span className="text-purple-400">Available:&nbsp;&nbsp;</span>{" "}
                Internship, Job
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

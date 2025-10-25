"use client";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

export default function About() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
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
        }
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
            src="https://res.cloudinary.com/dbfyjoiub/image/upload/v1761390582/IMG-20251019-WA0104_1_xgsbiz.jpg"
            width={800}
            height={800}
            className="w-full h-auto rounded-lg"
            alt="Profile"
          />
        </div>
        <div className="flex-1 max-w-full sm:max-w-[400px] lg:max-w-[600px]">
          <h1 className="text-2xl sm:text-3xl text-purple-400 font-semibold">
            MERN Stack Developer & Programmer
          </h1>
          <p className="mt-4 text-sm sm:text-base lg:text-lg text-white leading-relaxed">
            I am a MERN Stack developer with a passion for building dynamic,
            user-focused web and mobile applications. With solid experience in
            MongoDB, Express.js, React.js, and Node.js, I create full-stack
            solutions that are scalable, high-performing, and visually
            appealing. In addition to web development, I work on Android app
            development using React Native and Flutter, enabling me to craft
            cross-platform mobile experiences with smooth performance and
            responsive UI. I have solved 500+ Data Structures and Algorithms
            problems across various platforms, which has sharpened my logical
            thinking and coding skills. My skill set also includes HTML, CSS,
            JavaScript, and modern styling frameworks like Tailwind CSS and
            Bootstrap, allowing me to turn complex ideas into clean,
            user-friendly interfaces.
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

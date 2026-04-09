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
            start: "top 85%",
            once: true,
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
            MERN Stack Developer & Programmer
          </h1>
          <p className="mt-4 text-sm sm:text-base lg:text-lg text-white leading-relaxed">
            I'm a passionate Full Stack Developer specializing in the MERN stack (MongoDB, Express.js, React.js, Node.js) with expertise in building scalable web applications and cross-platform mobile solutions. With a strong foundation in computer science and hands-on experience in modern web technologies, I create efficient, user-centric digital experiences.
          </p>
          <div className="mt-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm sm:text-base">
              <div className="flex items-center">
                <span className="text-purple-400 font-semibold mr-2">Name:</span>
                <span className="text-white">Honey Pathkar</span>
              </div>
              <div className="flex items-center">
                <span className="text-purple-400 font-semibold mr-2">Email:</span>
                <span className="text-white">honeypatkar70@gmail.com</span>
              </div>
              <div className="flex items-center">
                <span className="text-purple-400 font-semibold mr-2">Location:</span>
                <span className="text-white">Baran, Rajasthan</span>
              </div>
              <div className="flex items-center">
                <span className="text-purple-400 font-semibold mr-2">Availability:</span>
                <span className="text-white">Internship, Job Opportunities</span>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <h2 className="text-xl font-semibold text-purple-400 mb-3">Technical Expertise</h2>
            <p className="text-white text-sm sm:text-base leading-relaxed">
              With over 500+ solved Data Structures and Algorithms problems, I bring strong analytical and problem-solving skills to every project. My expertise spans across modern web development frameworks and mobile application development using React Native and Flutter.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

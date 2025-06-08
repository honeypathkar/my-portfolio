import React from "react";
import ProfilePic from "../images/profile-image.jpeg";

export default function About() {
  return (
    <div className="px-4 py-8 sm:px-6 lg:px-8 bg-gray-900">
      <div className="flex flex-col items-center text-center">
        <h1 className="text-3xl font-bold text-white sm:text-4xl">About Me</h1>
        <div className="w-20 h-1 bg-purple-600 mt-3"></div>
      </div>
      <div className="flex flex-col lg:flex-row flex-wrap justify-center items-center pt-14 gap-10 lg:gap-20">
        <div className="flex-1 max-w-full sm:max-w-[400px] lg:max-w-[500px]">
          <img
            src={ProfilePic}
            className="w-full h-auto rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
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
            responsive UI. {"\n"}I have solved 500+ Data Structures and
            Algorithms problems across various platforms, which has sharpened my
            logical thinking and coding skills. My skill set also includes HTML,
            CSS, JavaScript, and modern styling frameworks like Tailwind CSS and
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
                <span className="text-purple-400">Email:&nbsp;&nbsp;</span>
                honeypatkar70@gmail.com
              </p>
              <p>
                <span className="text-purple-400">Location:&nbsp;&nbsp;</span>
                Baran, Rajasthan
              </p>
              <p>
                <span className="text-purple-400">Available:&nbsp;&nbsp;</span>
                Internship, Job
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

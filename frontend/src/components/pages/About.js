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
        {/* Image Section */}
        <div className="flex-1 max-w-full sm:max-w-[400px] lg:max-w-[500px]">
          <img
            src={ProfilePic}
            className="w-full h-auto rounded-lg"
            alt="Profile"
          />
        </div>
        {/* Text Section */}
        <div className="flex-1 max-w-full sm:max-w-[400px] lg:max-w-[600px]">
          <h1 className="text-2xl sm:text-3xl text-purple-400 font-semibold">
            Frontend Developer & Programmer
          </h1>
          <p className="mt-4 text-sm sm:text-base lg:text-lg text-white leading-relaxed">
            "Hello, I'm Honey Pathkar, a passionate Frontend Developer &
            Programmer. I have built over 20 projects and solved 300+ LeetCode
            problems, enhancing my problem-solving skills. With more than a year
            of experience in the field, I am actively learning web development
            and sharpening my expertise. Although I haven’t worked in a company
            yet, my portfolio showcases my hands-on experience with various
            projects. I am now looking for job opportunities where I can apply
            my skills and continue to grow. Hopefully, you like the projects I
            have worked on!"
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

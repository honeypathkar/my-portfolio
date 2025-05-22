import React from "react";
import "../App.css";

const experiences = [
  {
    companyName: "Growthyari",
    title: "Frontend Developer",
    type: "Internship",
    duration: "Mar 2025 - May 2025 · 3 mos",
    location: "Remote",
    description:
      "Developed a complete mobile application using React Native, which included core features like video calling, post creation, and payment integration using Razorpay. Focused on crafting an engaging UI with a beautiful dark mode experience. Successfully published the app to the Google Play Store, completing the development cycle from idea to production release.",
    skills: ["JavaScript", "React Native"],
  },
  {
    companyName: "Rapydlaunch - B2B SaaS Product Development Company",
    title: "Mobile Application Developer",
    type: "Internship",
    duration: "Jan 2025 - Feb 2025 · 2 mos",
    location: "Remote",
    description:
      "Gained hands-on experience with React Native by working on a real-time project, delivering a fully functional application within just one week. Built a responsive and user-friendly dashboard using Next.js and shadcn/ui, showcasing strong front-end design principles. Integrated Stripe payment gateway to enable secure and seamless transactions.",
    skills: ["React Native", "TypeScript", "Next.js", "shadcn/ui"],
  },
];

export default function ExperiencePage() {
  return (
    <div className="px-[70px]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Experience
          </h2>
          <p className="mt-3 text-lg leading-8 text-gray-300">
            A record of my professional journey and the roles I've held.
          </p>
        </div>
        <div className="space-y-10">
          {experiences.map((exp, index) => (
            <div
              key={index}
              className="bg-gray-800 bg-opacity-80 rounded-xl shadow-2xl p-6 md:p-8 hover:bg-gray-700 transition duration-300 ease-in-out transform hover:-translate-y-1"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <h3 className="text-xl md:text-2xl font-semibold text-purple-400">
                  {exp.title}
                </h3>
                <span className="text-sm text-gray-400 mt-1 sm:mt-0">
                  {exp.type}
                </span>
              </div>
              <h4 className="text-lg text-gray-100 mt-1">{exp.companyName}</h4>
              <div className="mt-2 text-gray-400 text-sm space-y-1 sm:space-y-0 sm:space-x-4">
                <span>{exp.duration}</span>
                <span className="hidden sm:inline">·</span>
                <span>{exp.location}</span>
              </div>
              <p className="mt-4 text-gray-300 text-base leading-relaxed">
                {exp.description}
              </p>
              {exp.skills && exp.skills.length > 0 && (
                <div className="mt-4">
                  <h5 className="text-sm font-semibold text-purple-300 mb-2">
                    Skills:
                  </h5>
                  <div className="flex flex-wrap gap-2">
                    {exp.skills.map((skill, skillIndex) => (
                      <span
                        key={skillIndex}
                        className="bg-purple-600 bg-opacity-50 text-purple-200 px-3 py-1 rounded-full text-xs font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

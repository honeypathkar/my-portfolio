import React from "react";
import "../App.css"; // Assuming this has your global styles and Tailwind setup

const experiencesData = [
  {
    companyName: "Growthyari",
    title: "Frontend Developer",
    type: "Internship",
    duration: "Mar 2025 - May 2025 · 3 mos",
    location: "Remote",
    descriptionPoints: [
      "Developed a complete mobile application using React Native, which included core features like video calling, post creation, and payment integration using Razorpay.",
      "Focused on crafting an engaging UI with a beautiful dark mode experience.",
      "Successfully published the app to the Google Play Store, completing the development cycle from idea to production release.",
    ],
    skills: ["JavaScript", "React Native"],
  },
  {
    companyName: "Rapydlaunch - B2B SaaS Product Development Company",
    title: "Mobile Application Developer",
    type: "Internship",
    duration: "Jan 2025 - Feb 2025 · 2 mos",
    location: "Remote",
    descriptionPoints: [
      "Gained hands-on experience with React Native by working on a real-time project, delivering a fully functional application within just one week.",
      "Built a responsive and user-friendly dashboard using Next.js and shadcn/ui, showcasing strong front-end design principles.",
      "Integrated Stripe payment gateway to enable secure and seamless transactions.",
    ],
    skills: ["React Native", "TypeScript", "Next.js", "shadcn/ui"],
  },
  // Add more experiences here if needed
];

export default function ExperiencePage() {
  return (
    <div className="">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-white">
            Experience
          </h2>
          <p className="mt-4 text-lg leading-8 text-gray-300 max-w-2xl mx-auto">
            A record of my professional journey and the roles I've undertaken.
          </p>
        </div>

        {/* Responsive Grid for Experience Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {experiencesData.map((exp, index) => (
            <div
              key={index}
              className="bg-gray-800 bg-opacity-80 rounded-xl shadow-2xl p-6 md:p-8 flex flex-col justify-between transition-all duration-300 ease-in-out hover:shadow-purple-500/30"
            >
              <div>
                {" "}
                {/* Top section for content */}
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-3">
                  <div>
                    <h3 className="text-xl md:text-2xl font-semibold text-purple-400">
                      {exp.title}
                    </h3>
                    <h4 className="text-lg text-gray-200 mt-1">
                      {exp.companyName}
                    </h4>
                  </div>
                  <span className="text-sm text-gray-400 mt-2 sm:mt-1 whitespace-nowrap bg-gray-700 px-2 py-1 rounded">
                    {exp.type}
                  </span>
                </div>
                <div className="mb-4 text-gray-400 text-sm space-y-1 sm:space-y-0">
                  <p>{exp.duration}</p>
                  <p>{exp.location}</p>
                </div>
                <div className="mt-4 text-gray-300 text-base leading-relaxed">
                  <ul className="list-disc list-inside space-y-2">
                    {exp.descriptionPoints.map((point, pIndex) => (
                      <li key={pIndex}>{point}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Skills section - remains at the bottom of the content area */}
              {exp.skills && exp.skills.length > 0 && (
                <div className="mt-6">
                  {" "}
                  {/* Adjusted margin if Read More button is removed */}
                  <h5 className="text-sm font-semibold text-purple-300 mb-2">
                    Skills:
                  </h5>
                  <div className="flex flex-wrap gap-2">
                    {exp.skills.map((skill, skillIndex) => (
                      <span
                        key={skillIndex}
                        className="bg-purple-600 bg-opacity-60 text-purple-200 px-3 py-1 rounded-full text-xs font-medium"
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

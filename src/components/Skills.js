import React, { useState } from "react";

const skillsData = [
  { title: "HTML", percent: "90" },
  { title: "CSS", percent: "70" },
  { title: "Tailwind CSS", percent: "50" },
  { title: "JavaScript", percent: "60" },
  { title: "Bootstrap", percent: "80" },
  { title: "React Js", percent: "65" },
  { title: "Redux Toolkit", percent: "30" },
  { title: "Git & Github", percent: "90" },
  { title: "NextJs", percent: "20" },
  { title: "Node Js", percent: "40" },
];

const Skills = () => {
  const [currentSkill, setCurrentSkill] = useState(skillsData[0]);

  const handleSkillClick = (skill) => {
    setCurrentSkill(skill);
  };

  return (
    <main className="grid w-full min-h-screen text-gray-100 place-content-center" style={{marginTop: "30px", marginBottom: "-20px"}}>
      <section className="p-6 space-y-6 border border-black rounded-xl md:grid md:grid-cols-2 md:gap-4 sm:space-y-0">
        <div className="grid grid-cols-2 gap-6">
          {skillsData.map((skill) => (
            <button
              key={skill.title}
              onClick={() => handleSkillClick(skill)}
              className={`px-4 py-2 text-xl text-gray-100 transition bg-[#6FB3B8] rounded-md h-14 w-44 hover:bg-[#388087] ${
                currentSkill.title === skill.title
                  ? "font-bold ring-2 ring-gray-100"
                  : ""
              }`}
            >
              {skill.title}
            </button>
          ))}
        </div>

        <div className="flex items-center justify-center">
          <svg className="transform -rotate-90 w-72 h-72">
            <circle
              cx="145"
              cy="145"
              r="120"
              stroke="currentColor"
              strokeWidth="30"
              fill="transparent"
              className="text-[#388087]"
            />

            <circle
              cx="145"
              cy="145"
              r="120"
              stroke="currentColor"
              strokeWidth="30"
              fill="transparent"
              strokeDasharray={2 * Math.PI * 120}
              strokeDashoffset={
                (2 * Math.PI * 120 * (100 - parseInt(currentSkill.percent))) /
                100
              }
              className="text-[#6FB3B8]"
            />
          </svg>
          <span className="absolute text-5xl text-black">{`${currentSkill.percent}%`}</span>
        </div>
      </section>
    </main>
  );
};

export default Skills;

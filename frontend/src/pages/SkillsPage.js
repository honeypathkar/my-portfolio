import React from "react";
// Import necessary icons from react-icons
import {
  DiJavascript1,
  DiReact,
  DiNodejsSmall,
  DiMongodb,
  DiHtml5,
  DiCss3,
  DiBootstrap,
  DiGithubBadge,
  DiMysql,
  DiJava,
} from "react-icons/di";
import {
  SiExpress,
  SiFlutter,
  SiTypescript,
  SiTailwindcss,
  SiRedux,
  SiCplusplus,
  SiDart,
  SiNextdotjs,
  SiShadcnui,
} from "react-icons/si";
import { VscVscode } from "react-icons/vsc";
import { RiSupabaseLine, RiFirebaseLine } from "react-icons/ri";
import { TbApi } from "react-icons/tb";

const Skills = () => {
  // A single, flat array for all skills and technologies
  const allSkills = [
    {
      name: "HTML",
      icon: <DiHtml5 className="text-purple-500 text-4xl mb-2" />,
    },
    { name: "CSS", icon: <DiCss3 className="text-purple-500 text-4xl mb-2" /> },
    {
      name: "JavaScript",
      icon: <DiJavascript1 className="text-purple-500 text-4xl mb-2" />,
    },
    {
      name: "React",
      icon: <DiReact className="text-purple-500 text-4xl mb-2" />,
    },
    {
      name: "Next.js",
      icon: <SiNextdotjs className="text-purple-500 text-4xl mb-2" />,
    },
    {
      name: "Redux",
      icon: <SiRedux className="text-purple-500 text-4xl mb-2" />,
    },
    {
      name: "Node.js",
      icon: <DiNodejsSmall className="text-purple-500 text-4xl mb-2" />,
    },
    {
      name: "Express",
      icon: <SiExpress className="text-purple-500 text-4xl mb-2" />,
    },
    {
      name: "Java",
      icon: <DiJava className="text-purple-500 text-4xl mb-2" />,
    },
    {
      name: "MongoDB",
      icon: <DiMongodb className="text-purple-500 text-4xl mb-2" />,
    },
    {
      name: "MySQL",
      icon: <DiMysql className="text-purple-500 text-4xl mb-2" />,
    },
    {
      name: "TypeScript",
      icon: <SiTypescript className="text-purple-500 text-4xl mb-2" />,
    },
    {
      name: "React Native",
      icon: <DiReact className="text-purple-500 text-4xl mb-2" />,
    },
    {
      name: "Flutter",
      icon: <SiFlutter className="text-purple-500 text-4xl mb-2" />,
    },
    {
      name: "Dart",
      icon: <SiDart className="text-purple-500 text-4xl mb-2" />,
    },
    {
      name: "C++",
      icon: <SiCplusplus className="text-purple-500 text-4xl mb-2" />,
    },
    {
      name: "Tailwind",
      icon: <SiTailwindcss className="text-purple-500 text-4xl mb-2" />,
    },
    {
      name: "Bootstrap",
      icon: <DiBootstrap className="text-purple-500 text-4xl mb-2" />,
    },
    {
      name: "ShadCN/UI",
      icon: <SiShadcnui className="text-purple-500 text-4xl mb-2" />,
    },
    {
      name: "Git & GitHub",
      icon: <DiGithubBadge className="text-purple-500 text-4xl mb-2" />,
    },
    {
      name: "VS Code",
      icon: <VscVscode className="text-purple-500 text-4xl mb-2" />,
    },
    {
      name: "Supabase",
      icon: <RiSupabaseLine className="text-purple-500 text-4xl mb-2" />,
    },
    {
      name: "Firebase",
      icon: <RiFirebaseLine className="text-purple-500 text-4xl mb-2" />,
    },
    {
      name: "APIs",
      icon: <TbApi className="text-purple-500 text-4xl mb-2" />,
    },
  ];

  return (
    <div className="bg-gray-900 text-white py-10">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col items-center text-center mb-10">
          <h2 className="text-3xl font-bold">Skills & Technologies</h2>
          <div className="w-20 h-1 bg-purple-600 mt-3"></div>
        </div>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
          {allSkills.map((skill, idx) => (
            <div
              key={idx}
              className="bg-gray-800/50 p-4 rounded-lg flex items-center justify-center flex-col border-[1px] border-purple-600/30 hover:border-purple-700 transition-all duration-300"
            >
              {skill.icon}
              <span>{skill.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Skills;

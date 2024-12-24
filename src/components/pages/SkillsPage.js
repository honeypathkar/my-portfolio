import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faBootstrap } from "@fortawesome/free-brands-svg-icons";
import { faCode, faCogs, faDatabase } from "@fortawesome/free-solid-svg-icons";

const Skills = () => {
  const skills = [
    {
      title: "Frontend Development",
      items: [
        { name: "HTML/CSS", level: "95%" },
        { name: "JavaScript", level: "90%" },
        { name: "React", level: "85%" },
      ],
    },
    {
      title: "Backend Development",
      items: [
        { name: "Node.js", level: "80%" },
        { name: "Express.js", level: "60%" },
        { name: "MongoDB", level: "50%" },
      ],
    },
    {
      title: "Mobile Dev Tools",
      items: [
        { name: "React Native", level: "70%" },
        { name: "Flutter", level: "50%" },
        { name: "TypeScript", level: "80%" },
      ],
    },
  ];

  const tools = [
    { name: "GitHub", icon: faGithub },
    { name: "MySQL", icon: faDatabase },
    { name: "C++", icon: faCode },
    { name: "Bootstrap", icon: faBootstrap },
    { name: "Tailwind CSS", icon: faCode },
    { name: "Redux", icon: faCogs },
  ];

  return (
    <div className="bg-gray-900 text-white py-10">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col items-center text-center mb-5">
          <h2 className="text-3xl font-bold text-center">My Skills</h2>
          <div className="w-20 h-1 bg-purple-600 mt-3"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {skills.map((skill, index) => (
            <div
              key={index}
              className="bg-gray-800/50 p-6 rounded-lg shadow-md border-[1px] border-purple-600/30 hover:border-purple-700"
            >
              <h3 className="text-xl font-semibold mb-4">{skill.title}</h3>
              {skill.items.map((item, idx) => (
                <div key={idx} className="mb-4">
                  <div className="flex justify-between mb-1">
                    <span>{item.name}</span>
                    <span>{item.level}</span>
                  </div>
                  <div className="w-full bg-gray-700 h-2 rounded-full">
                    <div
                      className="h-full bg-purple-500 rounded-full"
                      style={{ width: item.level }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
        <h2 className="text-2xl font-bold text-center mt-10 mb-6">
          Tools & Technologies
        </h2>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
          {tools.map((tool, idx) => (
            <div
              key={idx}
              className="bg-gray-800/50 p-4 rounded-lg flex items-center justify-center flex-col border-[1px] border-purple-600/30 hover:border-purple-700"
            >
              <FontAwesomeIcon
                icon={tool.icon}
                className="text-purple-500 text-2xl mb-2"
              />
              <span>{tool.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Skills;

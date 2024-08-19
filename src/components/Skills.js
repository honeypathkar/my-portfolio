import React from "react";

const skillsData = [
  {
    title: "HTML",
    image:
      "https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original-wordmark.svg",
  },
  {
    title: "CSS",
    image:
      "https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original-wordmark.svg",
  },
  {
    title: "Tailwind CSS",
    image:
      "https://camo.githubusercontent.com/0568e2de313626b2bd9b96f326941b012d45e9a4db1a23aa78bd8036207e57f8/68747470733a2f2f7777772e766563746f726c6f676f2e7a6f6e652f6c6f676f732f7461696c77696e646373732f7461696c77696e646373732d69636f6e2e737667",
  },
  {
    title: "JavaScript",
    image:
      "https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg",
  },
  {
    title: "Bootstrap",
    image:
      "https://raw.githubusercontent.com/devicons/devicon/master/icons/bootstrap/bootstrap-plain-wordmark.svg",
  },
  {
    title: "React Js",
    image:
      "https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original-wordmark.svg",
  },
  {
    title: "Redux Toolkit",
    image:
      "https://raw.githubusercontent.com/devicons/devicon/master/icons/redux/redux-original.svg",
  },
  {
    title: "Git",
    image:
      "https://camo.githubusercontent.com/fcafa5ebc1f5f789ae7d012a3ecd8fe7bda49516591caf7c37698f764165d880/68747470733a2f2f7777772e766563746f726c6f676f2e7a6f6e652f6c6f676f732f6769742d73636d2f6769742d73636d2d69636f6e2e737667",
  },
  {
    title: "Node Js",
    image:
      "https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original-wordmark.svg",
  },
];

const Skills = () => {
  return (
    <div className="container">
      <div
        className="mt-32 text-center text-4xl underline"
        style={{ fontFamily: "'Pangolin', cursive" }}
      >
        Skills
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4 justify-center items-center mt-8">
        {skillsData.map((item, index) => (
          <div
            className="flex flex-col items-center bg-white py-8 rounded-md shadow-md hover:scale-105"
            key={index}
          >
            <img src={item.image} alt={item.title} className="w-16 h-16" />
            <h1 className="mt-2 text-lg font-medium text-center">
              {item.title}
            </h1>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Skills;

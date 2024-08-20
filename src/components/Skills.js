import React from "react";

//Css framework skills
const cssFramwork = [
  {
    title: "Tailwind CSS",
    image:
      "https://camo.githubusercontent.com/0568e2de313626b2bd9b96f326941b012d45e9a4db1a23aa78bd8036207e57f8/68747470733a2f2f7777772e766563746f726c6f676f2e7a6f6e652f6c6f676f732f7461696c77696e646373732f7461696c77696e646373732d69636f6e2e737667",
  },
  {
    title: "Bootstrap",
    image:
      "https://raw.githubusercontent.com/devicons/devicon/master/icons/bootstrap/bootstrap-plain-wordmark.svg",
  },
];

//Frontend Development Skills
const frontEndSkills = [
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
    title: "JavaScript",
    image:
      "https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg",
  },
  {
    title: "React Js",
    image:
      "https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original-wordmark.svg",
  },
];

//Backend Developmet Skills
const backendSkills = [
  {
    title: "Node Js",
    image:
      "https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original-wordmark.svg",
  },
  {
    title: "Express Js",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXgAuAwfMMDkwZScsLkBAeZ4GjyfB7GtIzcA&s",
  },
  {
    title: "MongoDB",
    image:
      "https://cdn.icon-icons.com/icons2/2415/PNG/512/mongodb_original_wordmark_logo_icon_146425.png",
  },
];

const otherSkills = [
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
    title: "React Native",
    image: "https://reactnative.dev/img/header_logo.svg",
  },
  {
    title: "Github",
    image:
      "https://github.githubassets.com/assets/GitHub-Mark-ea2971cee799.png",
  },
  {
    title: "Vs Code",
    image:
      "https://yt3.googleusercontent.com/_q52i8bUAEvcb7JR4e-eNTv23y2A_wg5sCz0NC0GrGtcw1CRMWJSOPVHUDh_bngD0q4gMvVeoA=s900-c-k-c0x00ffffff-no-rj",
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
      <div className="mt-10">
        <div className="mb-3">
          <h1 className="bold text-xl text-black">Frontend Tools:</h1>
          <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-12 gap-4 justify-center items-center mt-3">
            {frontEndSkills.map((item, index) => (
              <div
                className="flex flex-col items-center bg-white py-6 rounded-md shadow-md hover:scale-105"
                key={index}
              >
                <img src={item.image} alt={item.title} className="w-12 h-12" />
                <h1 className="mt-2 text-sm font-medium text-center">
                  {item.title}
                </h1>
              </div>
            ))}
          </div>
        </div>
        <div className="mb-3">
          <h1 className="bold text-xl text-black">Css Framework:</h1>
          <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-12 gap-4 justify-center items-center mt-3">
            {cssFramwork.map((item, index) => (
              <div
                className="flex flex-col items-center bg-white py-6 rounded-md shadow-md hover:scale-105"
                key={index}
              >
                <img src={item.image} alt={item.title} className="w-12 h-12" />
                <h1 className="mt-2 text-sm font-medium text-center">
                  {item.title}
                </h1>
              </div>
            ))}
          </div>
        </div>
        <div className="mb-3">
          <h1 className="bold text-xl text-black">
            Backend Development Tools:
          </h1>
          <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-12 gap-4 justify-center items-center mt-3">
            {backendSkills.map((item, index) => (
              <div
                className="flex flex-col items-center bg-white py-6 rounded-md shadow-md hover:scale-105"
                key={index}
              >
                <img src={item.image} alt={item.title} className="w-12 h-12" />
                <h1 className="mt-2 text-sm font-medium text-center">
                  {item.title}
                </h1>
              </div>
            ))}
          </div>
        </div>
        <div className="mb-3">
          <h1 className="bold text-xl text-black">Other tools and skills:</h1>
          <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-12 gap-4 justify-center items-center mt-3">
            {otherSkills.map((item, index) => (
              <div
                className="flex flex-col items-center bg-white py-6 rounded-md shadow-md hover:scale-105"
                key={index}
              >
                <img src={item.image} alt={item.title} className="w-12 h-12" />
                <h1 className="mt-2 text-sm font-medium text-center">
                  {item.title}
                </h1>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Skills;

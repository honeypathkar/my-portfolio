import React from "react";
import {
  cssFramwork,
  backendSkills,
  frontEndSkills,
  otherSkills,
} from "../utils/data";

const Skills = () => {
  return (
    <div className="container">
      <div className="mt-24">
        <div className="mb-3">
          <h1 className="bold text-xl text-black">Frontend Tools:</h1>
          <div className="grid grid-cols-3 sm:grid-cols-6 lg:grid-cols-12 gap-4 justify-center items-center mt-3">
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
          <div className="grid grid-cols-3 sm:grid-cols-6 lg:grid-cols-12 gap-4 justify-center items-center mt-3">
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
          <div className="grid grid-cols-3 sm:grid-cols-6 lg:grid-cols-12 gap-4 justify-center items-center mt-3">
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
          <div className="grid grid-cols-3 sm:grid-cols-6 lg:grid-cols-12 gap-4 justify-center items-center mt-3">
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

import React from "react";
import Typewriter from "typewriter-effect";
import "../../App.css";
import SkillsPage from "./SkillsPage";
import WorkPage from "./WorkPage";
import ContactPage from "./ContactPage";
import About from "./About";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

export default function Home({ home, about, skills, project, contact }) {
  return (
    <>
      <div className="homepage" id={home}>
        <div className="inset-0 bg-gradient-to-br from-purple-900 via-gray-900 to-gray-900 ">
          <div className="relative isolate px-6 pt-5 lg:px-20">
            <div className="mx-auto max-w-2xl py-56 lg:py-[195px]">
              <div className="hidden sm:mb-8 sm:flex sm:justify-center">
                <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-white ring-1 ring-gray-900/10 hover:ring-gray-900/20">
                  Let's Contact{" "}
                  <a
                    href="mailto:honeypatkar70@gmail.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-purple-500"
                  >
                    <span
                      className="absolute inset-0"
                      aria-hidden="true"
                    ></span>{" "}
                    Message Me <span aria-hidden="true">&rarr;</span>
                  </a>
                </div>
              </div>
              <div className="text-center">
                <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                  <span className="text-white">Hii I'm</span>{" "}
                  <span className="text-purple-500">Honey</span> <br />
                  <span className="text-purple-500">
                    <Typewriter
                      onInit={(typewriter) => {
                        typewriter
                          .typeString("Front End Developer !")
                          .pauseFor(2000)
                          .deleteChars(21)
                          .typeString("Web Designer !")
                          .pauseFor(2000)
                          .deleteChars(14)
                          .typeString("Programmer !")
                          .pauseFor(2000)
                          .deleteAll()
                          .start();
                      }}
                      options={{
                        loop: true,
                      }}
                    />
                  </span>
                </h1>
                <div className="mt-10 flex items-center justify-center gap-x-6">
                  <a
                    href={"#" + contact}
                    className="rounded-full bg-purple-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-purple-500 border-[2px] border-purple-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Contact
                  </a>
                  <a
                    href="https://linkedin.com/in/honey-pathkar"
                    className="text-sm font-semibold leading-6 text-white border-[2px] border-purple-600 px-5 py-2.5 rounded-full"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Work
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center mt-10 transform -translate-x-1/2 animate-bounce">
            <ArrowDownwardIcon sx={{ color: "white", fontSize: 30 }} />
          </div>
        </div>
      </div>
      <div id={about} className="pt-[70px]">
        <About />
      </div>
      <div id={skills} className="pt-[70px]">
        <SkillsPage />
      </div>
      <div id={project} className="pt-[1px]">
        <WorkPage />
      </div>
      <div id={contact} className="py-[70px]">
        <ContactPage />
      </div>
    </>
  );
}

import React from "react";
import { Link } from "react-router-dom";
import Typewriter from "typewriter-effect";

export default function Home() {
  return (
    <div className="inset-0 bg-gradient-to-br from-purple-900 via-gray-900 to-gray-900">
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          <div className="hidden sm:mb-8 sm:flex sm:justify-center">
            <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-white ring-1 ring-gray-900/10 hover:ring-gray-900/20">
              Let's Contact{" "}
              <a
                href="mailto:honeypatkar70@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-purple-500"
              >
                <span className="absolute inset-0" aria-hidden="true"></span>{" "}
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
            <p className="mt-6 text-lg leading-8 text-white">
              I'm a intermidiate Frotend developer and learning web devlopment.
              I'm looking for job opportunity. This is my Personal Portfolio.
              Here I have included some of my project that i made during
              practice. Hopefully you like them.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                to="/contact"
                className="rounded-full bg-purple-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-purple-500 border-[2px] border-purple-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Contact
              </Link>
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
    </div>
  );
}

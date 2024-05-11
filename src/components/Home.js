import React from "react";
import Typewriter from "typewriter-effect";

export default function Home() {
  return (
    <div>
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          <div className="hidden sm:mb-8 sm:flex sm:justify-center">
            <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
              Let's Contact{" "}
              <a
                href="mailto:honeypatkar70@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-indigo-600"
              >
                <span className="absolute inset-0" aria-hidden="true"></span>{" "}
                Message Me <span aria-hidden="true">&rarr;</span>
              </a>
            </div>
          </div>
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Hii I'm Honey <br />
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
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              I'm a intermidiate Frotend developer and learning web devlopment.
              I'm looking for job opportunity. This is my Personal Portfolio.
              Here I have included some of my project that i made during
              practice. Hopefully you like them.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <a
                href="/contact"
                className="rounded-md bg-[#6FB3B8] px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#388087] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Get started
              </a>
              <a
                href="https://linkedin.com/in/honey-patkar-7725632ba"
                className="text-sm font-semibold leading-6 text-gray-900"
                target="_blank"
                rel="noopener noreferrer"
              >
                Learn more <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

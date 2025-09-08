"use client";
import React from "react";
import Navbar from "../components/Navbar";
import Home from "../sections/Home";
import BackToTop from "../components/BackToTop";

export default function Page() {
  const home = "home";
  const about = "about";
  const skills = "skills";
  const project = "projects";
  const contact = "contact";
  const experience = "experience";
  return (
    <>
      <Navbar
        home={home}
        about={about}
        skills={skills}
        project={project}
        contact={contact}
        experience={experience}
      />
      <Home
        home={home}
        about={about}
        skills={skills}
        project={project}
        contact={contact}
        experience={experience}
      />
      <BackToTop />
    </>
  );
}



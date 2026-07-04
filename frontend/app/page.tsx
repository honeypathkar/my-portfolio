"use client";
import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Home from "../sections/Home";
import BackToTop from "../components/BackToTop";
import Loader from "../components/Loader";

export default function Page() {
  const [isLoading, setIsLoading] = useState(true);

  const home = "home";
  const about = "about";
  const skills = "skills";
  const project = "projects";
  const contact = "contact";
  const experience = "experience";

  return (
    <>
      {isLoading && <Loader onComplete={() => setIsLoading(false)} />}
      
      {/* Page content fades in after loader finishes */}
      <div className={`transition-opacity duration-1000 ${isLoading ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
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
      </div>
    </>
  );
}

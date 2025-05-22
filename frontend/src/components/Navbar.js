import React, { useState } from "react";

const Navbar = ({ home, about, skills, project, contact }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const url = [
    { name: "Home", link: home },
    { name: "About", link: about },
    { name: "Skills", link: skills },
    { name: "Experience", link: "experience" },
    { name: "Project", link: project },
    { name: "Contact", link: contact },
  ];

  return (
    <nav className="bg-gray-900/80 text-white fixed top-0 left-0 w-full z-50 shadow-md">
      <div className="container mx-auto flex items-center justify-between p-3">
        {/* Logo */}
        <div className="text-2xl font-bold">
          <a href="/">Portfolio</a>
        </div>

        {/* Menu Items */}
        <div className="hidden md:flex gap-6">
          {url.map((data, index) => (
            <a
              key={index}
              href={"#" + data.link}
              className="hover:text-purple-400"
            >
              {data.name}
            </a>
          ))}
        </div>

        {/* Hamburger Icon */}
        <div className="md:hidden">
          <button onClick={toggleMenu}>
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-gray-900/80">
          {url.map((data, index) => (
            <a
              key={index}
              href={"#" + data.link}
              className="block px-4 py-2 hover:text-purple-400"
            >
              {data.name}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;

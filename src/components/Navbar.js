import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const url = [
    { name: "Home", link: "/" },
    { name: "Skills", link: "/skills" },
    { name: "Project", link: "/projects" },
    { name: "Contact", link: "/contact" },
  ];

  return (
    <nav className="bg-gray-900/80 text-white fixed top-0 left-0 w-full z-50 shadow-md">
      <div className="container mx-auto flex items-center justify-between p-3">
        {/* Logo */}
        <div className="text-2xl font-bold">
          <h1>Portfolio</h1>
        </div>

        {/* Menu Items */}
        <div className="hidden md:flex space-x-6">
          {url.map((data, index) => (
            <Link key={index} to={data.link} className="hover:text-gray-400">
              {data.name}
            </Link>
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
        <div className="md:hidden bg-gray-700">
          {url.map((data, index) => (
            <Link
              key={index}
              to={data.link}
              className="block px-4 py-2 hover:bg-gray-600"
            >
              {data.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;

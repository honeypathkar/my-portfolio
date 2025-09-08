import React from "react";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";

export default function Footer() {
  return (
    <footer className="border-t border-gray-700/60 py-6 text-white/80">
      <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm">© {new Date().getFullYear()} Honey Pathkar</p>
        <div className="flex items-center gap-3">
          <a href="https://github.com/honeypathkar" target="_blank" rel="noopener noreferrer" className="w-9 h-9 bg-purple-600/20 rounded-full flex items-center justify-center hover:bg-purple-600 hover:text-white"> <FaGithub /> </a>
          <a href="https://www.linkedin.com/in/honey-pathkar/" target="_blank" rel="noopener noreferrer" className="w-9 h-9 bg-purple-600/20 rounded-full flex items-center justify-center hover:bg-purple-600 hover:text-white"> <FaLinkedin /> </a>
          <a href="https://instagram.com/honey.jsx" target="_blank" rel="noopener noreferrer" className="w-9 h-9 bg-purple-600/20 rounded-full flex items-center justify-center hover:bg-purple-600 hover:text-white"> <FaInstagram /> </a>
          <a href="https://leetcode.com/u/honeypathkar70/" target="_blank" rel="noopener noreferrer" className="w-9 h-9 bg-purple-600/20 rounded-full flex items-center justify-center hover:bg-purple-600 hover:text-white"> <SiLeetcode /> </a>
        </div>
      </div>
    </footer>
  );
}



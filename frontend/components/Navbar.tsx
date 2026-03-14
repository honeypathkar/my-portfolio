"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = {
  home: string;
  about: string;
  skills: string;
  project: string;
  contact: string;
  experience: string;
};

export default function Navbar({ home, about, skills, project, contact }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  const url = [
    { name: "Home", link: home },
    { name: "About", link: about },
    { name: "Skills", link: skills },
    { name: "Experience", link: "experience" },
    { name: "Project", link: project },
    { name: "Blogs", link: "blogs", isExternal: true },
    { name: "Contact", link: contact },
  ];

  const getLink = (item: any) => {
    if (item.isExternal) return `/${item.link}`;
    return isHome ? `#${item.link}` : `/#${item.link}`;
  };

  return (
    <nav className="bg-gray-900/80 backdrop-blur-md text-white fixed top-0 left-0 w-full z-50 shadow-md border-b border-white/5">
      <div className="container mx-auto flex items-center justify-between p-4">
        <div className="text-2xl font-bold tracking-tight">
          <Link href="/" className="hover:text-purple-400 transition-colors">
            Portfolio
          </Link>
        </div>
        <div className="hidden md:flex gap-8">
          {url.map((data, index) => (
            <Link 
              key={index} 
              href={getLink(data)} 
              className="text-sm font-medium text-gray-300 hover:text-purple-400 transition-colors"
            >
              {data.name}
            </Link>
          ))}
        </div>
        <div className="md:hidden">
          <button 
            onClick={() => setIsOpen(!isOpen)} 
            aria-label="Toggle menu"
            className="p-2 text-gray-300 hover:text-white transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"} />
            </svg>
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden bg-gray-900/95 backdrop-blur-lg border-b border-white/5 pb-4">
          {url.map((data, index) => (
            <Link 
              key={index} 
              href={getLink(data)} 
              className="block px-6 py-3 text-base text-gray-300 hover:text-purple-400 hover:bg-white/5 transition-all"
              onClick={() => setIsOpen(false)}
            >
              {data.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}



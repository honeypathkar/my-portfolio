import React from "react";

export default function ProjectModal({ project, onClose }) {
  if (!project) {
    return null; // Don't render if no project is provided
  }

  const { name, imageUrl, url, description, tools, source } = project;

  return (
    <div className="fixed inset-0 bg-gray-800/50 flex items-center justify-center z-50 p-4">
      {" "}
      {/* Added p-4 for padding on smaller screens */}
      {/* Increased max-w-lg to max-w-2xl for a larger modal */}
      <div className="bg-gray-800 rounded-lg p-6 max-w-2xl w-full mx-auto relative max-h-[90vh] overflow-y-auto">
        {" "}
        {/* Added max-h and overflow */}
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-200 text-2xl font-bold z-10" // Added z-10 to ensure it's above content
          aria-label="Close Modal"
        >
          &times;
        </button>
        {/* Modal Content */}
        <h2 className="text-2xl font-bold text-white mb-4 pr-8">{name}</h2>{" "}
        {/* Added pr-8 to prevent title from going under close button */}
        <img
          src={imageUrl}
          alt={name}
          className="w-full h-80 object-cover rounded-md mb-4 hover:border-purple-700 border-purple-600/30" // Keep image height reasonable or adjust as needed
        />
        {/* Full Description */}
        <p className="text-neutral-300 mb-4 text-sm">{description}</p>{" "}
        {/* Ensured full description is here */}
        {/* Tools Section */}
        <div className="flex flex-wrap gap-2 mb-4">
          {tools?.map((tech, index) => (
            <span
              key={index}
              className="px-3 py-1 text-sm bg-purple-500/10 text-purple-400 rounded-full"
            >
              {tech}
            </span>
          ))}
        </div>
        {/* Action Links */}
        <div className="flex gap-4 justify-center">
          {url && (
            <a
              href={url}
              className="text-blue-400 hover:underline flex items-center text-sm"
              target="_blank"
              rel="noopener noreferrer"
            >
              Live Demo
              <svg
                className="w-3 h-3 ml-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                ></path>
              </svg>
            </a>
          )}
          {source && (
            <a
              href={source}
              className="text-blue-400 hover:underline flex items-center text-sm"
              target="_blank"
              rel="noopener noreferrer"
            >
              Code
              <svg
                className="w-3 h-3 ml-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                ></path>
              </svg>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

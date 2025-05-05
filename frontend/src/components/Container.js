import React, { useState } from "react";
import ProjectModal from "./ProjectModal"; // Import the modal component

// Helper function to truncate text (KEEP this one)
const truncateText = (text, wordLimit) => {
  if (!text) return "";
  // Split by one or more whitespace characters to handle multiple spaces correctly
  const words = text.split(/\s+/);
  if (words.length <= wordLimit) {
    return text;
  }
  // Join the truncated words and add "..."
  return words.slice(0, wordLimit).join(" ") + "...";
};

export default function Container(props) {
  const { name, imageUrl, url, description, tools, source } = props;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const projectDetails = {
    // Object containing full details for the modal
    name,
    imageUrl,
    url,
    description, // Pass the full original description to the modal
    tools,
    source,
  };

  // Call the external truncateText function for the container view
  const truncatedDescription = truncateText(description, 100);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="group bg-gray-800/50 rounded-xl border-[1px] border-purple-600/30 overflow-hidden hover:border-purple-700 transition-all duration-300">
        {/* Image Section - Added onClick handler */}
        <div className="relative w-full cursor-pointer" onClick={openModal}>
          <img
            src={imageUrl}
            alt={name}
            className="w-full h-[14rem] object-cover transform group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />{" "}
        </div>

        {/* Content Section */}
        <div className="p-4">
          <h3 className="text-lg font-semibold text-white mb-2">{name}</h3>
          {/* Display the truncated description */}
          <p className="text-neutral-300 mb-3 text-sm">
            {truncatedDescription}
          </p>

          {/* Tools Section */}
          <div className="flex flex-wrap gap-2 mb-3">
            {tools?.map((tech, index) => (
              <span
                key={index}
                className="px-3 py-1 text-sm bg-purple-500/10 text-purple-400 rounded-full"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Action Links Section */}
          <div className="flex gap-3">
            <a
              href={url}
              className="text-white hover:text-blue-400 transition-colors duration-300 text-xs"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="flex items-center">
                <span>Live Demo</span>
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
              </span>
            </a>
            <a
              href={source}
              className="text-white hover:text-blue-400 transition-colors duration-300 text-xs"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="flex items-center">
                <span>Code</span>
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
              </span>
            </a>
          </div>
        </div>
      </div>

      {/* Render the modal if isModalOpen is true */}
      {isModalOpen && (
        <ProjectModal project={projectDetails} onClose={closeModal} />
      )}
    </>
  );
}

// Removed the duplicate truncateText definition from here

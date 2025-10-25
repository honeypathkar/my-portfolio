"use client";
import React from "react";

type Work = {
  _id: string;
  name: string;
  imageUrl: string;
  url: string;
  description: string;
  tools: string[];
  source?: string;
};

export default function ProjectModal({ open, onClose, work }: { open: boolean; onClose: () => void; work: Work | null }) {
  if (!open || !work) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <div className="bg-gray-900 text-white max-w-2xl w-full rounded-xl border border-purple-600/30 overflow-hidden">
        <div className="relative">
          <img src={work.imageUrl} alt={work.name} className="w-full h-auto object-cover" />
          <button onClick={onClose} className="absolute top-3 right-3 bg-gray-800/80 hover:bg-gray-700 text-white rounded-full w-9 h-9">✕</button>
        </div>
        <div className="p-5">
          <h3 className="text-2xl font-semibold">{work.name}</h3>
          <p className="text-gray-300 mt-2">{work.description}</p>
          <div className="flex flex-wrap gap-2 mt-3">
            {work.tools?.map((t, i) => (
              <span key={i} className="text-xs bg-purple-600/30 text-purple-200 px-2 py-1 rounded-full">
                {t}
              </span>
            ))}
          </div>
          <div className="flex gap-3 mt-4 items-center">
            <a href={work.url} target="_blank" rel="noopener noreferrer" className="text-sm text-white border border-purple-600 px-3 py-1 rounded-full">Live</a>
            {work.source && (
              <a href={work.source} target="_blank" rel="noopener noreferrer" className="text-sm text-white border border-purple-600 px-3 py-1 rounded-full">Source</a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}



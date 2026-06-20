"use client";
import React from "react";
import { X } from "lucide-react";
import Image from "next/image";

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-md" onClick={onClose} />
      <div className="relative bg-surface-100 border border-white/[0.08] rounded-3xl overflow-hidden max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.06] text-gray-400 hover:text-white transition-all z-10"
        >
          <X size={18} />
        </button>
        <div className="relative aspect-video">
          <Image src={work.imageUrl} alt={work.name} fill className="object-cover" />
        </div>
        <div className="p-6 sm:p-8">
          <h3 className="text-xl font-bold text-white mb-3">{work.name}</h3>
          <p className="text-gray-400 text-sm leading-relaxed mb-4">{work.description}</p>
          <div className="flex flex-wrap gap-2 mb-6">
            {work.tools?.map((t, i) => (
              <span key={i} className="px-3 py-1 bg-brand-500/10 border border-brand-500/20 rounded-lg text-[11px] font-mono text-brand-300">
                {t}
              </span>
            ))}
          </div>
          <div className="flex gap-3">
            <a href={work.url} target="_blank" rel="noopener noreferrer" className="flex-1 text-center py-3 bg-brand-600 hover:bg-brand-500 text-white rounded-2xl text-sm font-semibold transition-all">
              Live
            </a>
            {work.source && (
              <a href={work.source} target="_blank" rel="noopener noreferrer" className="flex-1 text-center py-3 bg-white/[0.05] border border-white/[0.08] rounded-2xl text-white text-sm font-semibold hover:bg-white/[0.1] transition-all">
                Source
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

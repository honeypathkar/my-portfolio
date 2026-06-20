"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ProjectGalleryProps {
  images: string[];
  projectName: string;
}

export default function ProjectGallery({ images, projectName }: ProjectGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);

  if (!images || images.length === 0) return null;

  const nextImage = () => setCurrentIndex((prev) => (prev + 1) % images.length);
  const prevImage = () => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);

  return (
    <>
      <div className="relative group w-full rounded-xl overflow-hidden border border-white/[0.06]">
        {/* Main image - 4:3 aspect, compact */}
        <div className="relative w-full aspect-[4/3] bg-surface-100">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="absolute inset-0"
            >
              <Image
                src={images[currentIndex]}
                alt={`${projectName} - Image ${currentIndex + 1}`}
                fill
                className="object-contain"
                priority={currentIndex === 0}
                sizes="(max-width: 1024px) 100vw, 45vw"
              />
            </motion.div>
          </AnimatePresence>

          {/* Controls */}
          {images.length > 1 && (
            <>
              <button onClick={prevImage}
                className="absolute left-2 top-1/2 -translate-y-1/2 z-10 p-1.5 rounded-lg bg-black/50 border border-white/10 text-white hover:bg-brand-600/80 transition-all opacity-0 group-hover:opacity-100">
                <ChevronLeft size={16} />
              </button>
              <button onClick={nextImage}
                className="absolute right-2 top-1/2 -translate-y-1/2 z-10 p-1.5 rounded-lg bg-black/50 border border-white/10 text-white hover:bg-brand-600/80 transition-all opacity-0 group-hover:opacity-100">
                <ChevronRight size={16} />
              </button>
            </>
          )}

          <button onClick={() => setFullscreen(true)}
            className="absolute top-2 right-2 z-10 p-1.5 rounded-lg bg-black/50 border border-white/10 text-white hover:bg-brand-600/80 transition-all opacity-0 group-hover:opacity-100">
            <Expand size={14} />
          </button>
        </div>

        {/* Thumbnails */}
        {images.length > 1 && (
          <div className="flex gap-1.5 p-2 bg-surface-100 overflow-x-auto">
            {images.map((img, index) => (
              <button key={index} onClick={() => setCurrentIndex(index)}
                className={`relative shrink-0 w-14 h-10 rounded-md overflow-hidden border transition-all ${
                  currentIndex === index ? "border-brand-500" : "border-white/[0.06] opacity-50 hover:opacity-80"
                }`}>
                <Image src={img} alt="" fill className="object-cover" sizes="56px" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Fullscreen lightbox */}
      <AnimatePresence>
        {fullscreen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black/95 flex items-center justify-center p-4"
            onClick={() => setFullscreen(false)}>
            <button onClick={() => setFullscreen(false)}
              className="absolute top-5 right-5 p-2 rounded-lg bg-white/10 border border-white/10 text-white hover:bg-white/20 transition-all z-10">
              <X size={18} />
            </button>
            <div className="relative max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
              <Image src={images[currentIndex]} alt={projectName}
                width={900} height={600}
                className="w-full h-auto max-h-[80vh] object-contain rounded-lg" />
              {images.length > 1 && (
                <>
                  <button onClick={(e) => { e.stopPropagation(); prevImage(); }}
                    className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-lg bg-black/60 border border-white/10 text-white hover:bg-brand-600/80 transition-all">
                    <ChevronLeft size={20} />
                  </button>
                  <button onClick={(e) => { e.stopPropagation(); nextImage(); }}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-lg bg-black/60 border border-white/10 text-white hover:bg-brand-600/80 transition-all">
                    <ChevronRight size={20} />
                  </button>
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 px-2.5 py-1 bg-black/60 rounded-full text-white text-[10px] font-mono">
                    {currentIndex + 1} / {images.length}
                  </div>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

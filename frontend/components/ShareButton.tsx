"use client";

import React from "react";
import { Share2 } from "lucide-react";
import { toast } from "sonner";

interface ShareButtonProps {
  title: string;
  text: string;
  url: string;
}

export default function ShareButton({ title, text, url }: ShareButtonProps) {
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text,
          url,
        });
      } catch (err) {
        if ((err as Error).name !== 'AbortError') {
          console.error('Error sharing:', err);
        }
      }
    } else {
      // Fallback: Copy to clipboard
      try {
        await navigator.clipboard.writeText(url);
        toast.success("Link copied to clipboard!");
      } catch (err) {
        console.error('Failed to copy:', err);
        toast.error("Failed to copy link");
      }
    }
  };

  return (
    <button 
      onClick={handleShare}
      className="p-2 bg-white/5 border border-white/10 rounded-xl text-gray-400 hover:text-white transition-all"
      title="Share article"
    >
      <Share2 size={20} />
    </button>
  );
}

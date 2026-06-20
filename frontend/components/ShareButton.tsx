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
    const shareData = { title, text, url };

    if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        if ((err as Error).name !== "AbortError") {
          copyToClipboard();
        }
      }
    } else {
      copyToClipboard();
    }
  };

  const copyToClipboard = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(url);
        toast.success("Link copied to clipboard!");
      } else {
        const textArea = document.createElement("textarea");
        textArea.value = url;
        document.body.appendChild(textArea);
        textArea.select();
        try {
          document.execCommand("copy");
          toast.success("Link copied to clipboard!");
        } catch (err) {
          toast.error("Could not copy link");
        }
        document.body.removeChild(textArea);
      }
    } catch (err) {
      toast.error("Failed to copy link");
    }
  };

  return (
    <button
      onClick={handleShare}
      className="p-2.5 bg-white/[0.03] border border-white/[0.06] rounded-xl text-gray-400 hover:text-white hover:border-brand-500/30 transition-all"
      title="Share article"
    >
      <Share2 size={16} />
    </button>
  );
}

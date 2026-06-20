"use client";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Calendar, Clock, Tag } from "lucide-react";
import ShareButton from "../../../components/ShareButton";

type Props = {
  content: string;
  tags?: string[];
  slug: string;
  title: string;
  shortDescription: string;
  coverImage: string;
  publishDate: string;
};

const decodeHTMLEntities = (text?: string) => {
  if (!text) return "";
  return text
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&nbsp;/g, " ");
};

export default function BlogDetailClient({
  content,
  tags,
  slug,
  title,
  shortDescription,
  coverImage,
  publishDate,
}: Props) {
  const [progress, setProgress] = useState(0);
  const articleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      if (!articleRef.current) return;
      const rect = articleRef.current.getBoundingClientRect();
      const total = articleRef.current.scrollHeight - window.innerHeight;
      const current = -rect.top;
      setProgress(Math.min(Math.max(current / total, 0), 1));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Reading Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-0.5 bg-white/[0.03] z-[60]">
        <div
          className="h-full bg-gradient-to-r from-brand-500 to-brand-400 transition-[width] duration-150"
          style={{ width: `${progress * 100}%` }}
        />
      </div>

      {/* Main Title & Subtitle styled identically to project details page */}
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2">{title}</h1>
      <div className="flex items-center gap-3 text-[11px] font-mono text-brand-400 mb-8">
        <span className="flex items-center gap-1.5 px-3 py-1.5 bg-brand-500/10 border border-brand-500/20 rounded-xl">
          <Calendar size={12} /> {new Date(publishDate).toLocaleDateString()}
        </span>
        <span className="flex items-center gap-1.5 px-3 py-1.5 bg-white/[0.03] border border-white/[0.06] rounded-xl text-gray-400">
          <Clock size={12} /> 5 min read
        </span>
      </div>

      {/* Two Column Layout like Project Details Page */}
      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* Left Column: Sticky image and tags/sharing */}
        <div className="w-full lg:w-[45%] lg:sticky lg:top-24 shrink-0">
          <div className="relative aspect-[16/10] rounded-3xl overflow-hidden border border-white/[0.06] mb-6 shadow-2xl">
            <Image
              src={coverImage}
              alt={title}
              fill
              className="object-cover"
              priority
            />
          </div>

          <div className="space-y-4">
            {tags && tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {tags.map((tag: string, i: number) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 bg-brand-500/10 border border-brand-500/20 rounded-lg text-[10px] font-mono font-medium text-brand-300"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            <div className="pt-2">
              <ShareButton
                title={title}
                text={shortDescription}
                url={`https://honeypathkar.com/blogs/${slug}`}
              />
            </div>
          </div>
        </div>

        {/* Right Column: Scrollable text content */}
        <div ref={articleRef} className="flex-1 min-w-0 w-full space-y-10">
          {shortDescription && (
            <section>
              <div
                className="text-gray-400 text-base leading-relaxed border-l-2 border-brand-500/50 pl-6"
                dangerouslySetInnerHTML={{ __html: decodeHTMLEntities(shortDescription) }}
              />
            </section>
          )}

          <section className="prose-premium space-y-6">
            <div dangerouslySetInnerHTML={{ __html: decodeHTMLEntities(content) }} />
          </section>

          <div className="mt-16 pt-12 border-t border-white/[0.06]">
            <div className="glass-card p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div>
                <h4 className="text-white font-semibold mb-2">Enjoyed this post?</h4>
                <p className="text-gray-500 text-sm">Follow me for more updates on projects and insights.</p>
              </div>
              <Link
                href="/#contact"
                className="px-8 py-3.5 bg-brand-600 hover:bg-brand-500 text-white rounded-2xl text-sm font-semibold transition-all hover:shadow-glow whitespace-nowrap"
              >
                Let's Talk
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

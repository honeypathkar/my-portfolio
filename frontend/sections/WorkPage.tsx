"use client";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import ReactPaginate from "react-paginate";
import Link from "next/link";
import Image from "next/image";
import { Star, GitFork, ChevronLeft, ChevronRight, ArrowUpRight } from "lucide-react";
import { useLiquidGlass } from "../hooks/useLiquidGlass";

type Work = {
  _id: string;
  name: string;
  slug?: string;
  imageUrl: string;
  url: string;
  description: string;
  tools: string[];
  source?: string;
  isVisible?: boolean;
};

function GithubStats({ url }: { url: string }) {
  const [stats, setStats] = useState<{ stars: number; forks: number } | null>(null);

  useEffect(() => {
    if (!url || !url.includes("github.com")) return;
    const parts = url.split("github.com/")[1].split("/");
    if (parts.length < 2) return;
    const owner = parts[0];
    const repo = parts[1].replace(".git", "");

    const fetchStats = async () => {
      try {
        const res = await fetch(`https://api.github.com/repos/${owner}/${repo}`);
        if (!res.ok) return;
        const data = await res.json();
        setStats({ stars: data.stargazers_count, forks: data.forks_count });
      } catch (e) {
        console.error("Failed to fetch github stats", e);
      }
    };
    fetchStats();
  }, [url]);

  if (!stats) return null;

  return (
    <div className="flex gap-3 text-[11px] text-gray-500 font-mono">
      <span className="flex items-center gap-1">
        <Star size={11} className="text-yellow-500" /> {stats.stars}
      </span>
      <span className="flex items-center gap-1">
        <GitFork size={11} className="text-blue-400" /> {stats.forks}
      </span>
    </div>
  );
}

function SkeletonCard() {
  return (
    <div className="glass-card overflow-hidden h-full">
      <div className="aspect-[16/10] skeleton" />
      <div className="p-6 space-y-3">
        <div className="h-5 w-3/4 skeleton rounded-lg" />
        <div className="h-4 w-full skeleton rounded-lg" />
        <div className="h-4 w-5/6 skeleton rounded-lg" />
        <div className="flex gap-2 pt-2">
          {[1, 2, 3].map(i => <div key={i} className="h-6 w-16 skeleton rounded-lg" />)}
        </div>
      </div>
    </div>
  );
}

function stripHtml(html: string) {
  if (!html) return "";
  const div = typeof document !== "undefined" ? document.createElement("div") : null;
  if (div) {
    div.innerHTML = html;
    return div.textContent || div.innerText || "";
  }
  return html.replace(/<[^>]*>/g, " ").replace(/&[a-z]+;/gi, " ").replace(/\s+/g, " ").trim();
}

const GLASS_CONFIG = JSON.stringify({
  blurAmount: 0.25,
  cornerRadius: 20,
  brightness: -0.3,
});

function ProjectCard({ name, slug: customSlug, imageUrl, description, tools, url, source }: Work) {
  const slugify = (text: string) =>
    text.toString().toLowerCase().trim().replace(/\s+/g, '-').replace(/[^\w-]+/g, '').replace(/--+/g, '-');
  const finalSlug = customSlug || slugify(name);
  const cleanDesc = stripHtml(description);

  return (
    <Link
      href={`/projects/${finalSlug}`}
      className="group block liquid-glass overflow-hidden card-hover flex flex-col h-full rounded-2xl"
      data-config={GLASS_CONFIG}
    >
      <div className="relative aspect-[16/10] overflow-hidden shrink-0">
        <Image
          src={imageUrl}
          alt={name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
          <div className="w-11 h-11 rounded-2xl bg-black/40 backdrop-blur-md border border-white/[0.12] shadow-[0_8px_32px_rgba(0,0,0,0.5)] flex items-center justify-center transition-transform hover:scale-110">
            <ArrowUpRight size={18} className="text-white" />
          </div>
        </div>
      </div>

      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-3 mb-2">
          <h3 className="text-base font-bold text-white group-hover:text-brand-400 transition-colors leading-tight">
            {name}
          </h3>
          {source && <GithubStats url={source} />}
        </div>

        <p className="text-gray-500 text-xs leading-relaxed line-clamp-2 mb-4 flex-1">
          {cleanDesc}
        </p>

        <div className="flex flex-wrap gap-1.5 mt-auto">
          {tools?.slice(0, 3).map((t, i) => (
            <span key={i} className="px-2 py-0.5 bg-white/[0.03] border border-white/[0.06] rounded-md text-[9px] font-mono text-gray-400">
              {t}
            </span>
          ))}
          {tools && tools.length > 3 && (
            <span className="px-2 py-0.5 text-[9px] font-mono text-gray-600">+{tools.length - 3}</span>
          )}
        </div>
      </div>
    </Link>
  );
}

export default function WorkPage() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [works, setWorks] = useState<Work[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useLiquidGlass(rootRef);

  const itemsPerPage = 6;
  const myDataApi = process.env.NEXT_PUBLIC_DATA_API as string | undefined;
  const access_token = process.env.NEXT_PUBLIC_ACCESS_TOKEN as string | undefined;

  useEffect(() => {
    const fetchWorks = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${myDataApi}?page=${currentPage + 1}&limit=${itemsPerPage}`,
          { headers: access_token ? { Authorization: `Bearer ${access_token}` } : {} }
        );
        const { works, totalPages } = response.data;
        setWorks(works.filter((w: Work) => w.isVisible !== false));
        setTotalPages(totalPages);
      } catch (err) {
        console.error("Error fetching works:", err);
        setError("Failed to fetch data. Try again later.");
      } finally {
        setLoading(false);
      }
    };
    if (myDataApi) fetchWorks();
  }, [currentPage, myDataApi, access_token]);

  const handlePageClick = (data: { selected: number }) => setCurrentPage(data.selected);

  if (error) {
    return (
      <section className="section-padding">
        <div className="section-container text-center">
          <h2 className="text-section text-white mb-4">Featured Projects</h2>
          <p className="text-red-400 font-mono text-sm">{error}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="section-padding bg-surface-50">
      <div
        ref={rootRef}
        className="section-container relative grid gap-6"
        style={{ gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))" }}
      >
        {/* Non-glass: header spans full width */}
        <div className="col-span-full mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-12 bg-brand-500" />
            <span className="text-brand-400 text-xs font-mono font-medium uppercase tracking-widest">Projects</span>
          </div>
          <h2 className="text-section text-white mb-4">
            Featured <span className="text-gradient">Work</span>
          </h2>
          <p className="text-gray-500 text-lg max-w-xl">
            A collection of projects where I've turned complex ideas into functional realities.
          </p>
        </div>

        {/* Glass elements: project cards are direct children of rootRef */}
        {loading
          ? Array(itemsPerPage).fill(null).map((_, i) => <SkeletonCard key={i} />)
          : works.map((work) => <ProjectCard key={work._id} {...work} />)
        }

        {/* Non-glass: pagination spans full width */}
        {!loading && totalPages > 1 && (
          <div className="col-span-full flex justify-center mt-8">
            <ReactPaginate
              previousLabel={<ChevronLeft size={18} />}
              nextLabel={<ChevronRight size={18} />}
              breakLabel="..."
              pageCount={totalPages}
              marginPagesDisplayed={1}
              pageRangeDisplayed={2}
              onPageChange={handlePageClick}
              forcePage={currentPage}
              containerClassName="flex items-center gap-2"
              activeLinkClassName="bg-brand-600 text-white border-brand-500"
              pageLinkClassName="w-10 h-10 flex items-center justify-center text-gray-400 border border-white/[0.06] rounded-xl hover:bg-white/[0.05] hover:text-white transition-all text-sm font-mono"
              previousLinkClassName="w-10 h-10 flex items-center justify-center text-gray-400 border border-white/[0.06] rounded-xl hover:bg-white/[0.05] hover:text-white transition-all"
              nextLinkClassName="w-10 h-10 flex items-center justify-center text-gray-400 border border-white/[0.06] rounded-xl hover:bg-white/[0.05] hover:text-white transition-all"
              breakLinkClassName="text-gray-600 font-mono px-2"
              disabledClassName="opacity-30 cursor-not-allowed"
            />
          </div>
        )}
      </div>
    </section>
  );
}

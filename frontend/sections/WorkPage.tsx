"use client";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import ReactPaginate from "react-paginate";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Star, GitFork, ChevronLeft, ChevronRight } from "lucide-react";

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
    <div className="flex gap-3 mt-2 text-[10px] font-bold text-gray-400">
      <span className="flex items-center gap-1">
        <Star size={12} className="text-yellow-500" /> {stats.stars}
      </span>
      <span className="flex items-center gap-1">
        <GitFork size={12} className="text-blue-500" /> {stats.forks}
      </span>
    </div>
  );
}

function SkeletonCard() {
  return (
    <div className="bg-gray-800/50 rounded-xl border-[1px] border-purple-600/30 overflow-hidden max-w-sm w-full">
      <div className="w-full h-[14rem] bg-gray-700 shimmer"></div>
      <div className="p-4">
        <div className="h-6 w-3/4 bg-gray-700 shimmer rounded mb-2"></div>
        <div className="h-4 w-full bg-gray-700 shimmer rounded mb-3"></div>
        <div className="h-4 w-5/6 bg-gray-700 shimmer rounded mb-3"></div>
        <div className="flex flex-wrap gap-2 mb-3">
          {Array(3)
            .fill("")
            .map((_, index) => (
              <div key={index} className="h-6 w-16 bg-gray-700 shimmer rounded-full"></div>
            ))}
        </div>
        <div className="flex gap-3">
          <div className="h-5 w-16 bg-gray-700 shimmer rounded"></div>
          <div className="h-5 w-16 bg-gray-700 shimmer rounded"></div>
        </div>
      </div>
    </div>
  );
}

function Container({ _id, name, slug: customSlug, imageUrl, description, tools, url, source }: Work) {
  const isLongDescription = description.length > 120;
  const displayDescription = isLongDescription ? `${description.substring(0, 120)}...` : description;

  const slugify = (text: string) =>
    text
      .toString()
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-')
      .replace(/[^\w-]+/g, '')
      .replace(/--+/g, '-');

  const generatedSlug = slugify(name);
  const finalSlug = customSlug || generatedSlug;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -10 }}
      className="bg-gray-800/50 rounded-2xl border border-purple-600/20 overflow-hidden hover:border-purple-500/40 transition-all hover:shadow-2xl hover:shadow-purple-500/10 flex flex-col h-full group"
    >
      <Link href={`/projects/${finalSlug}`} className="block relative overflow-hidden h-52">
        <Image 
          src={imageUrl} 
          alt={name} 
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110" 
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-900/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity"></div>
        <div className="absolute bottom-4 left-4">
          <div className="bg-purple-600/90 backdrop-blur-md text-[10px] text-white px-2 py-1 rounded-md font-bold uppercase tracking-widest">
            Detail View
          </div>
        </div>
      </Link>

      <div className="p-6 text-white flex flex-col flex-1">
        <div className="flex justify-between items-start mb-3">
          <Link href={`/projects/${finalSlug}`}>
            <h3 className="font-bold text-xl group-hover:text-purple-400 transition-colors leading-tight">{name}</h3>
          </Link>
          {source && <GithubStats url={source} />}
        </div>
        <div className="flex-1 mb-4">
          <p className="text-sm text-gray-400 leading-relaxed font-medium">
            {displayDescription}
            {isLongDescription && (
              <Link href={`/projects/${finalSlug}`} className="text-purple-400 hover:text-purple-300 font-bold ml-1 transition-colors">
                View More
              </Link>
            )}
          </p>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {tools?.slice(0, 4).map((t, i) => (
            <span key={i} className="text-[9px] font-bold uppercase tracking-wider bg-white/5 text-gray-300 border border-white/10 px-2 py-1 rounded-md">
              {t}
            </span>
          ))}
        </div>

        <div className="flex flex-col gap-3">
          <div className="flex gap-3">
            <a 
              href={url} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex-1 flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-wider bg-white/5 hover:bg-white/10 text-white py-3 rounded-xl transition-all border border-white/5 active:scale-95"
            >
              Live
            </a>
            {source && (
              <a 
                href={source} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex-1 flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-wider bg-white/5 hover:bg-white/10 text-white py-3 rounded-xl transition-all border border-white/5 active:scale-95"
              >
                Source
              </a>
            )}
          </div>
          <Link 
            href={`/projects/${finalSlug}`}
            className="w-full flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-wider bg-purple-600 hover:bg-purple-500 text-white py-3 rounded-xl transition-all shadow-lg shadow-purple-900/20 active:scale-95"
          >
            View Details →
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

export default function WorkPage() {
  const [works, setWorks] = useState<Work[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const gridRef = useRef<HTMLDivElement | null>(null);

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
        // Only show visible projects
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
      <div className="my-40 text-white text-center">
        <h2 className="text-4xl font-black tracking-tight">Featured Projects</h2>
        <div className="w-20 h-1 bg-purple-600 mt-4 mx-auto rounded-full"></div>
        <div className="mt-20 text-red-500 font-bold uppercase tracking-widest text-sm">{error}</div>
      </div>
    );
  }

  return (
    <div id="projects" className="py-24">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col items-center text-center mb-16 text-white">
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight">Featured Projects</h2>
          <div className="w-20 h-1 bg-purple-600 mt-4 rounded-full"></div>
          <p className="mt-6 text-lg text-gray-400 max-w-2xl font-medium">
            A collection of projects where I've turned complex ideas into functional realities.
          </p>
        </div>

        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-center place-items-center mb-16">
          {loading
            ? Array(itemsPerPage)
                .fill(null)
                .map((_, index) => <SkeletonCard key={index} />)
            : works.map((element) => (
                <Container key={element._id} {...element} />
              ))}
        </div>

        {!loading && totalPages > 1 && (
          <div className="pagination-controls flex justify-center mt-12 mb-12">
            <ReactPaginate
              previousLabel={
                <div className="p-5 rounded-full bg-white/5 hover:bg-purple-600 border border-white/10 text-white transition-all transform hover:scale-110 active:scale-95 shadow-xl flex items-center justify-center">
                  <ChevronLeft size={32} />
                </div>
              }
              nextLabel={
                <div className="p-5 rounded-full bg-white/5 hover:bg-purple-600 border border-white/10 text-white transition-all transform hover:scale-110 active:scale-95 shadow-xl flex items-center justify-center">
                  <ChevronRight size={32} />
                </div>
              }
              breakLabel={"..."}
              pageCount={totalPages}
              marginPagesDisplayed={2}
              pageRangeDisplayed={3}
              onPageChange={handlePageClick}
              forcePage={currentPage}
              containerClassName={"flex items-center gap-4"}
              activeLinkClassName={"bg-purple-600 text-white scale-110"}
              pageLinkClassName={
                "w-12 h-12 flex items-center justify-center text-white border border-white/10 rounded-xl cursor-pointer hover:bg-purple-600/50 hover:text-white transition-all font-bold"
              }
              breakClassName={"text-gray-500 font-bold px-2"}
              disabledClassName={"opacity-30 grayscale cursor-not-allowed"}
            />
          </div>
        )}
      </div>
    </div>
  );
}

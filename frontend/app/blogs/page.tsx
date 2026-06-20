"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Navbar from "../../components/Navbar";
import Link from "next/link";
import { Calendar, ArrowRight, BookOpen, Search } from "lucide-react";
import axios from "axios";

function stripHtml(html: string) {
  if (!html) return "";
  const div = typeof document !== "undefined" ? document.createElement("div") : null;
  if (div) {
    div.innerHTML = html;
    return div.textContent || div.innerText || "";
  }
  return html.replace(/<[^>]*>/g, " ").replace(/&[a-z]+;/gi, " ").replace(/\s+/g, " ").trim();
}

const API_BASE = process.env.NEXT_PUBLIC_DATA_API || "https://api.honeypathkar.com";

type BlogPost = {
  _id: string;
  slug: string;
  title: string;
  shortDescription: string;
  publishDate: string;
  coverImage: string;
  isVisible?: boolean;
};

export default function BlogPage() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get(`${API_BASE}/blogs`, {
          headers: { Authorization: `Bearer ${process.env.NEXT_PUBLIC_ACCESS_TOKEN}` }
        });
        const allBlogs = Array.isArray(res.data) ? res.data : [];
        const lightweight = allBlogs
          .filter((b: any) => b.isVisible !== false)
          .map((b: any) => ({
            _id: b._id,
            slug: b.slug,
            title: b.title,
            shortDescription: b.shortDescription,
            publishDate: b.publishDate,
            coverImage: b.coverImage,
            isVisible: b.isVisible,
          }));
        setBlogs(lightweight);
      } catch (e) {
        console.error("Failed to fetch blogs", e);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  const filteredBlogs = blogs.filter((b) => {
    const q = searchQuery.toLowerCase();
    return stripHtml(b.title).toLowerCase().includes(q) || stripHtml(b.shortDescription).toLowerCase().includes(q);
  });

  const featuredBlog = filteredBlogs[0];
  const remainingBlogs = filteredBlogs.slice(1);

  return (
    <div className="min-h-screen bg-surface text-white">
      <Navbar home="home" about="about" skills="skills" project="projects" contact="contact" experience="experience" />

      <main className="py-16 sm:py-24 pt-28 sm:pt-32">
        <div className="section-container">
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-3">
              <div className="h-px w-10 bg-brand-500" />
              <span className="text-brand-400 text-[11px] font-mono font-medium uppercase tracking-widest">Blog</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-4">
              Insights & <span className="text-gradient">Stories</span>
            </h1>
            <p className="text-gray-500 text-base max-w-lg mb-8">
              Sharing my journey, insights, and technical guides as I build products and explore new technologies.
            </p>

            <div className="relative max-w-md">
              <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-white/[0.03] border border-white/[0.06] rounded-2xl text-white text-sm focus:outline-none focus:border-brand-500/50 transition-all placeholder:text-gray-600"
              />
            </div>
          </div>

          {loading ? (
            <div className="grid md:grid-cols-2 gap-8">
              {[1, 2].map(i => (
                <div key={i} className="glass-card overflow-hidden h-96 animate-pulse">
                  <div className="aspect-[16/9] skeleton" />
                  <div className="p-8 space-y-3">
                    <div className="h-4 w-1/3 skeleton rounded" />
                    <div className="h-6 w-3/4 skeleton rounded" />
                    <div className="h-4 w-full skeleton rounded" />
                  </div>
                </div>
              ))}
            </div>
          ) : filteredBlogs.length > 0 ? (
            <>
              {featuredBlog && (
                <div className="mb-12">
                  <Link href={`/blogs/${featuredBlog.slug}`} className="group block glass-card overflow-hidden card-hover">
                    <div className="grid md:grid-cols-2 gap-0">
                      <div className="relative aspect-[16/10] md:aspect-auto overflow-hidden">
                        <Image
                          src={featuredBlog.coverImage}
                          alt={stripHtml(featuredBlog.title)}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                          priority
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-surface/40 hidden md:block" />
                      </div>
                      <div className="p-8 sm:p-10 flex flex-col justify-center">
                        <div className="flex items-center gap-3 text-[11px] font-mono text-brand-400 mb-4">
                          <span className="px-2.5 py-1 bg-brand-500/10 border border-brand-500/20 rounded-lg">Featured</span>
                          <span className="flex items-center gap-1.5">
                            <Calendar size={11} /> {new Date(featuredBlog.publishDate).toLocaleDateString()}
                          </span>
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 group-hover:text-brand-400 transition-colors leading-tight">
                          {stripHtml(featuredBlog.title)}
                        </h2>
                        <p className="text-gray-500 leading-relaxed mb-6 line-clamp-3">
                          {stripHtml(featuredBlog.shortDescription)}
                        </p>
                        <div className="flex items-center gap-2 text-brand-400 text-sm font-semibold group-hover:gap-3 transition-all">
                          Read Article <ArrowRight size={14} />
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              )}

              {remainingBlogs.length > 0 && (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {remainingBlogs.map((post) => (
                    <div key={post._id} className="group">
                      <Link href={`/blogs/${post.slug}`} className="block glass-card overflow-hidden card-hover">
                        <div className="relative aspect-[16/10] overflow-hidden">
                          <Image
                            src={post.coverImage}
                            alt={stripHtml(post.title)}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent opacity-60" />
                        </div>
                        <div className="p-6">
                          <div className="flex items-center gap-3 text-[10px] font-mono text-gray-600 mb-3">
                            <span className="flex items-center gap-1.5">
                              <Calendar size={10} /> {new Date(post.publishDate).toLocaleDateString()}
                            </span>
                          </div>
                          <h3 className="text-lg font-bold text-white mb-3 group-hover:text-brand-400 transition-colors leading-tight line-clamp-2">
                            {stripHtml(post.title)}
                          </h3>
                          <p className="text-gray-500 text-sm leading-relaxed line-clamp-2">
                            {stripHtml(post.shortDescription)}
                          </p>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
              )}
            </>
          ) : (
            <div className="glass-card p-16 text-center">
              <div className="w-16 h-16 rounded-2xl bg-brand-500/10 border border-brand-500/20 flex items-center justify-center mx-auto mb-6">
                <BookOpen size={28} className="text-brand-400" />
              </div>
              <h3 className="text-xl font-bold mb-3">
                {searchQuery ? "No articles found" : "Writing in Progress..."}
              </h3>
              <p className="text-gray-500 text-sm">
                {searchQuery ? "Try a different search term." : "Stay tuned for deep technical dives."}
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

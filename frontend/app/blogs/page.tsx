"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Navbar from "../../components/Navbar";
import Link from "next/link";
import { Calendar, Clock, ArrowRight, X, Eye, BookOpen } from "lucide-react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

const API_BASE = process.env.NEXT_PUBLIC_DATA_API || "https://api.honeypathkar.com";

type BlogPost = {
  _id: string;
  slug: string;
  title: string;
  shortDescription: string;
  publishDate: string;
  coverImage: string;
  content: string;
  isVisible?: boolean;
};

export default function BlogPage() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [previewBlog, setPreviewBlog] = useState<BlogPost | null>(null);
  const router = useRouter();

  // Prevent background scroll when modal is open
  useEffect(() => {
    if (previewBlog) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [previewBlog]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get(`${API_BASE}/blogs`, {
          headers: { Authorization: `Bearer ${process.env.NEXT_PUBLIC_ACCESS_TOKEN}` }
        });
        const allBlogs = Array.isArray(res.data) ? res.data : [];
        setBlogs(allBlogs.filter((b: any) => b.isVisible !== false));
      } catch (e) {
        console.error("Failed to fetch blogs", e);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  return (
    <div className="min-h-screen bg-[#030712] text-white">
      <Navbar home="home" about="about" skills="skills" project="projects" contact="contact" experience="experience" />
      
      <main className="max-w-6xl mx-auto px-6 pt-32 pb-24">
        <div className="mb-16">
          <h1 className="text-5xl sm:text-7xl font-black tracking-tightest mb-6">Blogs</h1>
          <div className="w-20 h-1 bg-purple-600 mb-8"></div>
          <p className="text-xl text-gray-400 max-w-2xl font-medium">
            Sharing my journey, insights, and technical guides as I build products and explore new technologies.
          </p>
        </div>

        {loading ? (
          <div className="grid md:grid-cols-2 gap-8">
            {[1, 2].map(i => (
              <div key={i} className="aspect-[16/9] bg-white/5 rounded-[2rem] animate-pulse border border-white/5"></div>
            ))}
          </div>
        ) : blogs.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-8">
            {blogs.map((post) => (
              <div 
                key={post._id} 
                className="group relative cursor-pointer"
                onClick={() => router.push(`/blogs/${post.slug}`)}
              >
                <div className="absolute inset-0 bg-purple-600/10 rounded-[2rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <article className="relative bg-gray-900/40 border border-white/10 rounded-[2rem] overflow-hidden hover:border-purple-500/40 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/10 flex flex-col h-full">
                  <div className="aspect-[16/9] overflow-hidden relative">
                    <Image 
                      src={post.coverImage} 
                      alt={post.title} 
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center gap-4 z-20">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          setPreviewBlog(post);
                        }}
                        className="p-3 bg-white text-black rounded-full hover:bg-purple-500 hover:text-white transition-all transform hover:scale-110 shadow-xl"
                        title="Quick Preview"
                      >
                        <Eye size={20} />
                      </button>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          router.push(`/blogs/${post.slug}`);
                        }}
                        className="p-3 bg-purple-600 text-white rounded-full hover:bg-white hover:text-black transition-all transform hover:scale-110 shadow-xl"
                        title="Read Full Article"
                      >
                        <ArrowRight size={20} />
                      </button>
                    </div>
                  </div>
                  <div className="p-8 flex flex-col flex-1">
                    <div className="flex items-center gap-4 text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">
                      <span className="flex items-center gap-1.5"><Calendar size={14} /> {new Date(post.publishDate).toLocaleDateString()}</span>
                      <span className="w-1 h-1 bg-gray-700 rounded-full"></span>
                      <span className="flex items-center gap-1.5 font-black text-purple-400">Preview Available</span>
                    </div>
                    <h2 className="text-2xl font-bold mb-4 group-hover:text-purple-400 transition-colors leading-tight">{post.title}</h2>
                    <p className="text-gray-400 mb-8 flex-1 leading-relaxed text-sm">
                      {post.shortDescription}
                    </p>
                    <div className="flex items-center gap-2 text-purple-400 font-bold text-xs uppercase tracking-[0.2em] group-hover:gap-3 transition-all mt-auto">
                      Read Full Article <ArrowRight size={14} />
                    </div>
                  </div>
                </article>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-16 rounded-[3rem] bg-white/5 border border-white/5 text-center">
            <div className="w-20 h-20 bg-purple-600/10 rounded-3xl flex items-center justify-center mx-auto mb-6 border border-purple-500/20">
              <BookOpen size={32} className="text-purple-400" />
            </div>
            <h3 className="text-2xl font-bold mb-4">Writing in Progress...</h3>
            <p className="text-gray-400 mb-0 font-medium">I'm currently drafting some deep technical dives. Stay tuned!</p>
          </div>
        )}
      </main>

      {/* Blog Preview Modal */}
      <AnimatePresence>
        {previewBlog && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setPreviewBlog(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-4xl bg-[#0a0f1c] border border-white/10 rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh] z-10"
            >
              <button 
                onClick={() => setPreviewBlog(null)}
                className="absolute top-6 right-6 p-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-white transition-all z-10"
              >
                <X size={20} />
              </button>

              <div className="p-8 sm:p-12 overflow-y-auto custom-scrollbar">
                <div className="flex items-center gap-3 text-xs font-bold text-purple-400 uppercase tracking-widest mb-6">
                  <Calendar size={14} /> {new Date(previewBlog.publishDate).toLocaleDateString()}
                  <span className="px-2 py-0.5 bg-purple-600/20 border border-purple-500/30 rounded-md text-[8px] font-black tracking-[0.2em] text-purple-400">Preview Mode</span>
                </div>
                
                <h2 className="text-3xl sm:text-5xl font-black text-white mb-8 leading-tight">{previewBlog.title}</h2>
                
                <div className="relative aspect-video rounded-3xl overflow-hidden border border-white/10 mb-10">
                  <Image 
                    src={previewBlog.coverImage} 
                    alt={previewBlog.title} 
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="prose prose-invert max-w-none">
                  <div 
                    className="text-gray-400 leading-relaxed font-medium"
                    dangerouslySetInnerHTML={{ __html: previewBlog.content.substring(0, 1000) + '...' }}
                  />
                </div>

                <div className="mt-12 flex justify-center">
                  <button 
                    onClick={() => {
                      setPreviewBlog(null);
                      router.push(`/blogs/${previewBlog.slug}`);
                    }}
                    className="px-10 py-4 bg-white text-black rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-purple-600 hover:text-white transition-all flex items-center gap-2"
                  >
                    Read More <ArrowRight size={16} />
                  </button>
                </div>
              </div>

              <div className="p-4 bg-white/5 border-t border-white/5 flex justify-center">
                <p className="text-[9px] text-gray-500 font-black uppercase tracking-[0.4em]">Content Preview • Honey Pathkar</p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

import { Metadata } from "next";
import axios from "axios";
import Navbar from "../../../components/Navbar";
import Image from "next/image";
import Link from "next/link";
import { MoveLeft, Calendar, Clock, Tag } from "lucide-react";
import ShareButton from "../../../components/ShareButton";

const API_BASE = process.env.NEXT_PUBLIC_DATA_API || "https://api.honeypathkar.com";

async function getBlog(slug: string) {
  try {
    const res = await axios.get(`${API_BASE}/blogs/${slug}`, {
      headers: { Authorization: `Bearer ${process.env.NEXT_PUBLIC_ACCESS_TOKEN}` }
    });
    return res.data;
  } catch (e) {
    return null;
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const blog = await getBlog(slug);
  if (!blog) return { title: "Blog Not Found" };
  
  return {
    title: `${blog.title} | Blogs | Honey Pathkar`,
    description: blog.shortDescription,
    openGraph: {
      title: blog.title,
      description: blog.shortDescription,
      images: [{ url: blog.coverImage }],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: blog.title,
      description: blog.shortDescription,
      images: [blog.coverImage],
    },
  };
}

export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const blog = await getBlog(slug);

  if (!blog) {
    return (
      <div className="min-h-screen bg-[#030712] text-white flex items-center justify-center p-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Blog Post Not Found</h2>
          <Link href="/blogs" className="px-8 py-4 bg-purple-600 rounded-full font-bold">Back to Blogs</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#030712] text-white selection:bg-purple-500/30">
      <Navbar home="home" about="about" skills="skills" project="projects" contact="contact" experience="experience" />
      
      <main className="max-w-4xl mx-auto px-6 pt-32 pb-24">
        {/* Navigation */}
        <div className="flex items-center justify-between mb-12">
          <Link href="/blogs" className="group flex items-center gap-3 text-gray-400 hover:text-white transition-all">
            <div className="p-2 bg-white/5 border border-white/10 rounded-xl group-hover:border-purple-500/50 transition-all">
              <MoveLeft size={20} />
            </div>
            <span className="text-[10px] font-black uppercase tracking-[0.3em]">Back to Blogs</span>
          </Link>
          <div className="flex items-center gap-4">
            <ShareButton 
              title={blog.title}
              text={blog.shortDescription}
              url={`https://honeypathkar.com/blogs/${blog.slug}`}
            />
          </div>
        </div>

        <article>
          <div className="mb-12">
            <div className="flex items-center gap-4 text-xs font-bold text-purple-400 uppercase tracking-widest mb-6">
              <span className="flex items-center gap-1.5"><Calendar size={14} /> {new Date(blog.publishDate).toLocaleDateString()}</span>
              <span className="w-1 h-1 bg-gray-600 rounded-full"></span>
              <span className="flex items-center gap-1.5"><Clock size={14} /> 5 min read</span>
            </div>
            <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-[1.1] mb-8">
              {blog.title}
            </h1>
            <p className="text-xl text-gray-400 leading-relaxed font-medium mb-12">
              {blog.shortDescription}
            </p>
          </div>

          <div className="relative aspect-[21/9] rounded-[2.5rem] overflow-hidden border border-white/10 mb-16 shadow-2xl">
            <Image 
              src={blog.coverImage} 
              alt={blog.title} 
              fill
              className="object-cover"
              priority
            />
          </div>

          <div className="prose prose-invert prose-purple max-w-none">
            <div 
              className="text-gray-300 text-lg leading-relaxed space-y-6"
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />
          </div>

          <div className="mt-16 pt-12 border-t border-white/10">
            <div className="flex flex-wrap gap-3 mb-12">
              {blog.tags?.map((tag: string, i: number) => (
                <span key={i} className="flex items-center gap-1.5 px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-xs font-bold text-gray-400">
                  <Tag size={12} className="text-purple-500" /> {tag}
                </span>
              ))}
            </div>

            <div className="bg-white/5 border border-white/10 rounded-3xl p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div>
                <h4 className="text-xl font-bold mb-2">Enjoyed this post?</h4>
                <p className="text-gray-400 text-sm">Follow me on social media for more updates on my projects and insights.</p>
              </div>
              <Link href="/#contact" className="px-8 py-4 bg-white text-black rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-gray-200 transition-all">
                Let's Talk
              </Link>
            </div>
          </div>
        </article>
      </main>
    </div>
  );
}

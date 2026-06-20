import { Metadata } from "next";
import axios from "axios";
import Navbar from "../../../components/Navbar";
import Image from "next/image";
import Link from "next/link";
import { MoveLeft, Calendar, Clock, Tag } from "lucide-react";
import ShareButton from "../../../components/ShareButton";
import BlogDetailClient from "./BlogDetailClient";

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
      <div className="min-h-screen bg-surface text-white flex items-center justify-center p-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Blog Post Not Found</h2>
          <Link href="/blogs" className="px-8 py-3.5 bg-brand-600 rounded-2xl font-semibold text-sm hover:bg-brand-500 transition-colors">Back to Blogs</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface text-white selection:bg-brand-500/30">
      <Navbar home="home" about="about" skills="skills" project="projects" contact="contact" experience="experience" />

      <main className="py-16 sm:py-20 pt-24 sm:pt-28">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center justify-between mb-8">
            <Link href="/blogs" className="group flex items-center gap-2 text-gray-500 hover:text-white transition-all">
              <MoveLeft size={16} />
              <span className="text-xs font-mono uppercase tracking-widest">Back</span>
            </Link>
          </div>

          <BlogDetailClient
            content={blog.content}
            tags={blog.tags}
            slug={blog.slug}
            title={blog.title}
            shortDescription={blog.shortDescription}
            coverImage={blog.coverImage}
            publishDate={blog.publishDate}
          />
        </div>
      </main>
    </div>
  );
}


import { Metadata } from "next";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import Navbar from "../../../components/Navbar";
import ProjectGallery from "../../../components/ProjectGallery";
import { 
  MoveLeft, 
  ExternalLink, 
  Github, 
  Code2, 
  Globe, 
  Sparkles, 
  Zap, 
  ArrowRight, 
  AppWindow, 
  Cpu,
  Star,
  GitFork,
  Clock,
  Code,
  Bug
} from "lucide-react";

// Types
type Project = {
  _id: string;
  name: string;
  imageUrl: string;
  url: string;
  description: string;
  longDescription?: string;
  tools: string[];
  source?: string;
  features?: string[];
  screenshots?: string[];
  challenges?: string;
  tagline?: string;
};

type GithubStats = {
  stars: number;
  forks: number;
  lastUpdated: string;
  language: string;
};

const myDataApi = process.env.NEXT_PUBLIC_DATA_API;
const access_token = process.env.NEXT_PUBLIC_ACCESS_TOKEN;

const slugify = (text: string) =>
  text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-');

async function getProjectBySlug(slug: string): Promise<Project | null> {
  if (!myDataApi) return null;
  try {
    const response = await axios.get(`${myDataApi}/projects/${slug}`, {
      headers: access_token ? { Authorization: `Bearer ${access_token}` } : {},
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching project by slug:", error);
    // Fallback: fetch all and filter
    try {
      const response = await axios.get(`${myDataApi}`, {
        headers: access_token ? { Authorization: `Bearer ${access_token}` } : {},
      });
      const works = response.data.works || response.data;
      const worksArray = Array.isArray(works) ? works : (works.data || []);
      return worksArray.find((w: any) => w.slug === slug || slugify(w.name) === slug) || null;
    } catch (e) {
      return null;
    }
  }
}

async function getGithubStats(repoUrl?: string): Promise<GithubStats | null> {
  if (!repoUrl || !repoUrl.includes("github.com")) return null;
  
  const parts = repoUrl.split("github.com/")[1].split("/");
  if (parts.length < 2) return null;
  const owner = parts[0];
  const repo = parts[1].replace(".git", "");

  try {
    // Next.js fetch with cache
    const res = await fetch(`https://api.github.com/repos/${owner}/${repo}`, {
      next: { revalidate: 3600 }, // Cache for 1 hour
    });
    
    if (!res.ok) return null;
    const data = await res.json();
    
    return {
      stars: data.stargazers_count,
      forks: data.forks_count,
      lastUpdated: new Date(data.pushed_at).toLocaleDateString(),
      language: data.language,
    };
  } catch (error) {
    console.error("Error fetching GitHub stats:", error);
    return null;
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return { title: "Project Not Found" };
  
  return {
    title: `${project.name} | Honey Pathkar`,
    description: project.description,
    openGraph: {
      title: project.name,
      description: project.description,
      images: [{ url: project.imageUrl }], 
      url: `https://honeypathkar.com/projects/${slug}`,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: project.name,
      description: project.description,
      images: [project.imageUrl],
    }
  };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    return (
      <div className="min-h-screen bg-[#030712] text-white flex items-center justify-center p-6">
        <div className="text-center">
            <Link href="/#projects" className="px-8 py-4 bg-purple-600 rounded-full font-bold hover:bg-purple-500 transition-colors">Go Back to Projects</Link>
        </div>
      </div>
    );
  }

  const githubStats = await getGithubStats(project.source);
  const galleryImages = [project.imageUrl, ...(project.screenshots || [])];

  return (
    <div className="min-h-screen bg-[#030712] text-white selection:bg-purple-500/30">
      <Navbar home="home" about="about" skills="skills" project="projects" contact="contact" experience="experience" />
      
      <main className="max-w-7xl mx-auto px-6 pt-32 pb-24">
        {/* Navigation */}
        <div className="flex items-center justify-between mb-12">
          <Link href="/#projects" className="group flex items-center gap-3 text-gray-400 hover:text-white transition-all">
            <div className="p-2 bg-white/5 border border-white/10 rounded-xl group-hover:border-purple-500/50 transition-all">
              <MoveLeft size={20} />
            </div>
            <span className="text-[10px] font-black uppercase tracking-[0.3em]">Back to Gallery</span>
          </Link>
          <div className="flex items-center gap-2 px-4 py-2 bg-purple-500/10 border border-purple-500/20 rounded-full">
            <div className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-pulse"></div>
            <span className="text-[9px] font-black uppercase tracking-widest text-purple-400">Project Spotlight</span>
          </div>
        </div>

        {/* 1. Hero Section */}
        <div className="mb-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-10">
            <div>
              <h1 className="text-5xl sm:text-7xl font-black tracking-tightest leading-[1.1] mb-4 text-white">
                {project.name}
              </h1>
              <p className="text-xl text-purple-400 font-medium tracking-wide">
                {project.tagline || "A specialized solution for modern problems."}
              </p>
            </div>
            {project.source && (
               <a 
               href={project.source} 
               target="_blank" 
               rel="noopener noreferrer"
               className="flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 rounded-full text-sm font-bold hover:bg-white/10 transition-all"
             >
               <Star size={16} className="text-yellow-400" /> Star on GitHub
             </a>
            )}
          </div>

          <ProjectGallery images={galleryImages} projectName={project.name} />
        </div>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">
          {/* Left Column: Details */}
          <div className="w-full lg:w-[65%] space-y-16 min-w-0">
            
            {/* 2. Project Overview */}
            <section>
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <span className="w-8 h-8 flex items-center justify-center bg-purple-600/20 rounded-lg text-purple-400 text-sm">
                  01
                </span>
                Overview
              </h2>
              <div className="space-y-8">
                {project.description && (
                  <div className="p-6 rounded-2xl bg-purple-500/5 border border-purple-500/10">
                    <p className="text-xl text-gray-200 leading-relaxed font-medium break-words">
                      {project.description}
                    </p>
                  </div>
                )}
                {project.longDescription && project.longDescription !== project.description && (
                  <div 
                    className="text-lg text-gray-400 leading-relaxed prose prose-invert max-w-none prose-p:leading-relaxed prose-p:mb-6 prose-headings:text-white prose-a:text-purple-400 prose-strong:text-purple-300 prose-li:text-gray-400 break-words"
                    dangerouslySetInnerHTML={{ __html: project.longDescription }}
                  />
                )}
              </div>
            </section>

            {/* 3. Features */}
            {project.features && project.features.length > 0 ? (
              <section>
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                  <span className="w-8 h-8 flex items-center justify-center bg-blue-600/20 rounded-lg text-blue-400 text-sm">
                    02
                  </span>
                  Key Features
                </h2>
                <ul className="grid sm:grid-cols-2 gap-4">
                  {project.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3 p-4 bg-white/5 border border-white/5 rounded-2xl">
                      <Zap size={18} className="text-yellow-400 mt-1 shrink-0" />
                      <span className="text-gray-300 text-sm leading-relaxed">{feature}</span>
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}

            {/* 6. Challenges & Learnings */}
            {project.challenges ? (
              <section>
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                  <span className="w-8 h-8 flex items-center justify-center bg-green-600/20 rounded-lg text-green-400 text-sm">
                    {project.features && project.features.length > 0 ? "03" : "02"}
                  </span>
                  <Bug size={24} className="text-green-400" />
                  Challenges & Learnings
                </h2>
                <div className="p-8 rounded-3xl bg-gradient-to-br from-white/5 to-transparent border border-white/5">
                  <p className="text-gray-300 leading-relaxed break-words">
                    {project.challenges}
                  </p>
                </div>
              </section>
            ) : null}
          </div>

          {/* Right Column: Sidebar */}
          <div className="w-full lg:w-[35%] space-y-8 lg:sticky lg:top-32">
            
            {/* 4. Tech Stack */}
            <div className="p-8 rounded-3xl bg-white/5 border border-white/5 backdrop-blur-xl">
                <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-6 flex items-center gap-2">
                    <Cpu size={14} className="text-purple-400" /> Technologies Used
                </h3>
                <div className="flex flex-wrap gap-2">
                    {project.tools?.map((tool, i) => (
                        <span key={i} className="px-3 py-1.5 rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-300 text-[10px] font-bold uppercase tracking-wider">
                            {tool}
                        </span>
                    ))}
                </div>
            </div>

            {/* GitHub Stats */}
            {githubStats && (
              <div className="p-8 rounded-3xl bg-white/5 border border-white/5 backdrop-blur-xl">
                <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-6 flex items-center gap-2">
                    <Github size={14} className="text-blue-400" /> Repository Insights
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1 p-4 bg-white/5 rounded-2xl border border-white/5">
                    <span className="text-[10px] text-gray-500 uppercase font-bold tracking-tighter">Stars</span>
                    <div className="flex items-center gap-2 text-white font-bold">
                      <Star size={14} className="text-yellow-400" /> {githubStats.stars}
                    </div>
                  </div>
                  <div className="flex flex-col gap-1 p-4 bg-white/5 rounded-2xl border border-white/5">
                    <span className="text-[10px] text-gray-500 uppercase font-bold tracking-tighter">Forks</span>
                    <div className="flex items-center gap-2 text-white font-bold">
                      <GitFork size={14} className="text-blue-400" /> {githubStats.forks}
                    </div>
                  </div>
                  <div className="flex flex-col gap-1 p-4 bg-white/5 rounded-2xl border border-white/5">
                    <span className="text-[10px] text-gray-500 uppercase font-bold tracking-tighter">Last Updated</span>
                    <div className="flex items-center gap-2 text-white font-bold">
                      <Clock size={14} className="text-green-400" /> {githubStats.lastUpdated}
                    </div>
                  </div>
                  <div className="flex flex-col gap-1 p-4 bg-white/5 rounded-2xl border border-white/5">
                    <span className="text-[10px] text-gray-500 uppercase font-bold tracking-tighter">Language</span>
                    <div className="flex items-center gap-2 text-white font-bold">
                      <Code size={14} className="text-purple-400" /> {githubStats.language}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 7. Links */}
            <div className="flex flex-col gap-4">
                <a 
                    href={project.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-3 p-5 bg-white text-black rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-gray-200 transition-all shadow-xl shadow-white/5"
                >
                    <Globe size={18} /> Visit Live Demo
                </a>
                {project.source && (
                    <a 
                        href={project.source} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-3 p-5 bg-white/5 border border-white/10 rounded-2xl text-white font-black text-xs uppercase tracking-widest hover:bg-white/10 transition-all"
                    >
                        <Github size={18} /> View Source Code
                    </a>
                )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

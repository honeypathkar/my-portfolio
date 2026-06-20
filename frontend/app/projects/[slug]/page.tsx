import { Metadata } from "next";
import axios from "axios";
import Link from "next/link";
import Navbar from "../../../components/Navbar";
import ProjectGallery from "../../../components/ProjectGallery";
import {
  MoveLeft,
  Globe,
  Zap,
  Star,
  GitFork,
  Clock,
  Code,
  Cpu,
  Github,
} from "lucide-react";

function decodeHTMLEntities(str: string) {
  if (!str) return "";
  const div = typeof document !== "undefined" ? document.createElement("div") : null;
  if (div) {
    div.innerHTML = str;
    return div.textContent || str;
  }
  return str
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&nbsp;/g, " ")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#x27;/g, "'");
}

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
  text.toString().toLowerCase().trim().replace(/\s+/g, "-").replace(/[^\w-]+/g, "").replace(/--+/g, "-");

async function getProjectBySlug(slug: string): Promise<Project | null> {
  if (!myDataApi) return null;
  try {
    const response = await axios.get(`${myDataApi}/projects/${slug}`, {
      headers: access_token ? { Authorization: `Bearer ${access_token}` } : {},
    });
    return response.data;
  } catch (error) {
    try {
      const response = await axios.get(`${myDataApi}`, {
        headers: access_token ? { Authorization: `Bearer ${access_token}` } : {},
      });
      const works = response.data.works || response.data;
      const worksArray = Array.isArray(works) ? works : works.data || [];
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
    const res = await fetch(`https://api.github.com/repos/${owner}/${repo}`, { next: { revalidate: 3600 } });
    if (!res.ok) return null;
    const data = await res.json();
    return {
      stars: data.stargazers_count,
      forks: data.forks_count,
      lastUpdated: new Date(data.pushed_at).toLocaleDateString(),
      language: data.language,
    };
  } catch (error) {
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
    },
  };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    return (
      <div className="min-h-screen bg-surface text-white flex items-center justify-center p-6">
        <div className="text-center">
          <Link href="/#projects" className="px-6 py-3 bg-brand-600 rounded-xl font-semibold text-sm hover:bg-brand-500 transition-colors">Go Back</Link>
        </div>
      </div>
    );
  }

  const githubStats = await getGithubStats(project.source);
  const galleryImages = [project.imageUrl, ...(project.screenshots || [])];

  return (
    <div className="min-h-screen bg-surface text-white selection:bg-brand-500/30">
      <Navbar home="home" about="about" skills="skills" project="projects" contact="contact" experience="experience" />

      <main className="py-16 sm:py-20 pt-24 sm:pt-28">
        <div className="max-w-6xl mx-auto px-6">
          {/* Back nav */}
          <div className="flex items-center justify-between mb-8">
            <Link href="/#projects" className="group flex items-center gap-2 text-gray-500 hover:text-white transition-all">
              <MoveLeft size={16} />
              <span className="text-xs font-mono uppercase tracking-widest">Back</span>
            </Link>
            {project.source && (
              <a href={project.source} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-4 py-2 bg-white/[0.03] border border-white/[0.06] rounded-xl text-xs font-mono hover:bg-white/[0.06] transition-all">
                <Star size={12} className="text-yellow-400" /> Star
              </a>
            )}
          </div>

          {/* Title */}
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2">{project.name}</h1>
          <p className="text-gray-500 text-sm mb-8">{project.tagline || "A specialized solution for modern problems."}</p>

          {/* Main layout: sticky gallery left, scrollable text right */}
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            {/* Left: Sticky gallery */}
            <div className="w-full lg:w-[45%] lg:sticky lg:top-24 shrink-0">
              <ProjectGallery images={galleryImages} projectName={project.name} />

              {/* Tech stack + buttons below image */}
              <div className="mt-6 space-y-4">
                <div className="flex flex-wrap gap-1.5">
                  {project.tools?.map((tool, i) => (
                    <span key={i} className="px-2.5 py-1 bg-brand-500/10 border border-brand-500/20 rounded-lg text-[10px] font-mono font-medium text-brand-300">
                      {tool}
                    </span>
                  ))}
                </div>

                <div className="flex gap-3">
                  <a href={project.url} target="_blank" rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-white text-black rounded-xl font-semibold text-xs hover:bg-gray-200 transition-all">
                    <Globe size={14} /> Live Demo
                  </a>
                  {project.source && (
                    <a href={project.source} target="_blank" rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-white/[0.05] border border-white/[0.08] rounded-xl text-white font-semibold text-xs hover:bg-white/[0.1] transition-all">
                      <Github size={14} /> Source
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* Right: Scrollable content */}
            <div className="flex-1 min-w-0 w-full space-y-10">
              {/* Overview */}
              {project.description && (
                <section>
                  <h2 className="text-sm font-mono text-brand-400 uppercase tracking-widest mb-3">Overview</h2>
                  <div className="text-gray-300 text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: decodeHTMLEntities(project.description) }} />
                </section>
              )}

              {project.longDescription && project.longDescription !== project.description && (
                <section>
                  <div className="prose-premium text-sm" dangerouslySetInnerHTML={{ __html: decodeHTMLEntities(project.longDescription) }} />
                </section>
              )}

              {/* Features */}
              {project.features && project.features.length > 0 && (
                <section>
                  <h2 className="text-sm font-mono text-brand-400 uppercase tracking-widest mb-3">Key Features</h2>
                  <ul className="grid sm:grid-cols-2 gap-2">
                    {project.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2 p-3 glass-card">
                        <Zap size={14} className="text-yellow-400 mt-0.5 shrink-0" />
                        <span className="text-gray-300 text-xs leading-relaxed">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {/* Challenges */}
              {project.challenges && (
                <section>
                  <h2 className="text-sm font-mono text-brand-400 uppercase tracking-widest mb-3">Challenges & Learnings</h2>
                  <div className="p-4 glass-card text-gray-300 text-xs leading-relaxed" dangerouslySetInnerHTML={{ __html: decodeHTMLEntities(project.challenges) }} />
                </section>
              )}

              {/* GitHub stats */}
              {githubStats && (
                <section>
                  <h2 className="text-sm font-mono text-brand-400 uppercase tracking-widest mb-3">Repository</h2>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {[
                      { label: "Stars", value: githubStats.stars, icon: Star, color: "text-yellow-400" },
                      { label: "Forks", value: githubStats.forks, icon: GitFork, color: "text-blue-400" },
                      { label: "Updated", value: githubStats.lastUpdated, icon: Clock, color: "text-green-400" },
                      { label: "Language", value: githubStats.language, icon: Code, color: "text-brand-400" },
                    ].map((stat) => (
                      <div key={stat.label} className="p-3 glass-card">
                        <div className="text-[9px] text-gray-600 font-mono uppercase">{stat.label}</div>
                        <div className="flex items-center gap-1.5 text-white text-xs font-medium mt-1">
                          <stat.icon size={11} className={stat.color} /> {stat.value}
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

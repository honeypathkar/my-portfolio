
"use client";

import { useState, useEffect } from "react";
import { 
  LayoutDashboard, 
  Briefcase, 
  BookOpen, 
  LogOut, 
  Settings,
  Plus,
  Trash2,
  Edit,
  ExternalLink,
  Image as   ImageIcon,
  X,
  Save,
  ChevronRight,
  ChevronLeft,
  Eye,
  EyeOff,
  Bug
} from "lucide-react";
import { toast } from "sonner";
import axios from "axios";
import dynamic from "next/dynamic";
import "react-quill-new/dist/quill.snow.css";

// Dynamic import for Rich Text Editor
const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

const ALLOWED_EMAIL = "hello@honeypathkar.com";
const API_BASE = process.env.NEXT_PUBLIC_DATA_API || "https://api.honeypathkar.com";

const getAdminToken = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem("admin_token");
  }
  return null;
};

export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1); // 1: Email, 2: OTP
  const [activeTab, setActiveTab] = useState("projects");
  const [loading, setLoading] = useState(false);

  // Persistence check
  useEffect(() => {
    const adminToken = localStorage.getItem("admin_token");
    if (adminToken) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email !== ALLOWED_EMAIL) {
      toast.error("Unauthorized email address!");
      return;
    }

    setLoading(true);
    try {
      await axios.post(`${API_BASE}/api/admin/send-otp`, { email });
      setStep(2);
      toast.success("OTP sent to your email!");
    } catch (error: any) {
      toast.error(error.response?.data?.error || "Failed to send OTP. Check if backend is running.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(`${API_BASE}/api/admin/verify-otp`, { email, otp });
      localStorage.setItem("admin_token", res.data.token);
      setIsLoggedIn(true);
      toast.success("Login successful!");
    } catch (error: any) {
      toast.error(error.response?.data?.error || "Invalid OTP!");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    setIsLoggedIn(false);
    setStep(1);
    setEmail("");
    setOtp("");
    toast.success("Logged out successfully");
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-[#030712] flex items-center justify-center p-6">
        <div className="w-full max-w-md bg-gray-900/50 border border-white/10 rounded-3xl p-8 backdrop-blur-xl">
          <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 bg-purple-600/20 rounded-2xl flex items-center justify-center mb-4 border border-purple-500/30">
              <Settings className="text-purple-400" size={32} />
            </div>
            <h1 className="text-2xl font-bold text-white">Admin Portal</h1>
            <p className="text-gray-400 text-sm mt-2">
              {step === 1 ? "Enter your email to receive OTP" : "Enter the 6-digit code sent to your email"}
            </p>
          </div>

          {step === 1 ? (
            <form onSubmit={handleSendOTP} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 px-1">Email Address</label>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter administrator email"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-all"
                  required
                />
              </div>
              <button 
                type="submit"
                disabled={loading}
                className="w-full bg-purple-600 hover:bg-purple-500 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-purple-900/20 active:scale-95 disabled:opacity-50"
              >
                {loading ? "Sending OTP..." : "Get One-Time Password"}
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOTP} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 px-1">Verification Code</label>
                <input 
                  type="text" 
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="Enter 6-digit OTP"
                  maxLength={6}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-center text-2xl tracking-[0.5em] focus:outline-none focus:border-purple-500 transition-all font-mono"
                  required
                />
              </div>
              <button 
                type="submit"
                disabled={loading}
                className="w-full bg-purple-600 hover:bg-purple-500 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-purple-900/20 active:scale-95 disabled:opacity-50"
              >
                {loading ? "Verifying..." : "Verify & Login"}
              </button>
              <button 
                type="button"
                onClick={() => setStep(1)}
                className="w-full text-xs text-gray-500 hover:text-purple-400 transition-colors uppercase font-bold tracking-widest"
              >
                Change Email
              </button>
            </form>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#030712] text-white flex">
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/10 p-6 flex flex-col hidden md:flex">
        <div className="flex items-center gap-3 mb-12 px-2">
          <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
            <Settings size={18} />
          </div>
          <span className="font-bold tracking-tight">Admin Dash</span>
        </div>

        <nav className="space-y-2 flex-1">
          <button 
            onClick={() => setActiveTab("projects")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'projects' ? 'bg-purple-600 text-white' : 'text-gray-400 hover:bg-white/5'}`}
          >
            <LayoutDashboard size={20} />
            <span className="text-sm font-medium">Projects</span>
          </button>
          <button 
            onClick={() => setActiveTab("experience")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'experience' ? 'bg-purple-600 text-white' : 'text-gray-400 hover:bg-white/5'}`}
          >
            <Briefcase size={20} />
            <span className="text-sm font-medium">Experience</span>
          </button>
          <button 
            onClick={() => setActiveTab("blogs")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'blogs' ? 'bg-purple-600 text-white' : 'text-gray-400 hover:bg-white/5'}`}
          >
            <BookOpen size={20} />
            <span className="text-sm font-medium">Blogs</span>
          </button>
        </nav>

        <button 
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-red-400 transition-all mt-auto"
        >
          <LogOut size={20} />
          <span className="text-sm font-medium">Logout</span>
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold capitalize">{activeTab}</h2>
            <p className="text-gray-400 text-sm">Manage your portfolio {activeTab}</p>
          </div>
          <button 
            onClick={() => {
              // Trigger add new for active tab
              window.dispatchEvent(new CustomEvent(`add-${activeTab}`));
            }}
            className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded-xl font-bold text-sm hover:bg-gray-200 transition-all active:scale-95"
          >
            <Plus size={18} />
            Add New
          </button>
        </header>

        <div className="bg-white/5 border border-white/10 rounded-[2rem] p-8">
          {activeTab === 'projects' && <ProjectManager />}
          {activeTab === 'experience' && <ExperienceManager />}
          {activeTab === 'blogs' && <BlogManager />}
        </div>
      </main>
    </div>
  );
}

// Sub-components will be defined below or moved to separate files

function ProjectManager() {
  const [projects, setProjects] = useState<any[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentProject, setCurrentProject] = useState<any>(null);

  const fetchProjects = async () => {
    try {
      const res = await axios.get(`${API_BASE}/api/admin/projects`, {
        headers: { Authorization: `Bearer ${getAdminToken()}` }
      });
      setProjects(res.data);
    } catch (e) {
      toast.error("Failed to load projects");
    }
  };

  useEffect(() => {
    fetchProjects();
    const handleAdd = () => {
      setCurrentProject({
        name: "",
        slug: "",
        description: "",
        longDescription: "",
        tools: [],
        githubUrl: "",
        liveUrl: "",
        imageUrl: "",
        screenshots: [],
        featured: false,
        tagline: "",
        challenges: "",
        features: [],
        isVisible: true
      });
      setIsEditing(true);
    };
    window.addEventListener("add-projects", handleAdd);
    return () => window.removeEventListener("add-projects", handleAdd);
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this project?")) return;
    try {
      await axios.delete(`${API_BASE}/api/admin/projects/${id}`, {
        headers: { Authorization: `Bearer ${getAdminToken()}` }
      });
      toast.success("Project deleted");
      fetchProjects();
    } catch (e) {
      toast.error("Delete failed");
    }
  };

  const handleToggleVisibility = async (p: any) => {
    try {
      await axios.put(`${API_BASE}/api/admin/projects/${p._id}`, { ...p, isVisible: !p.isVisible }, {
        headers: { Authorization: `Bearer ${getAdminToken()}` }
      });
      toast.success(p.isVisible ? "Hidden from portfolio" : "Visible on portfolio");
      fetchProjects();
    } catch (e) {
      toast.error("Update failed");
    }
  };

  if (isEditing) {
    return <ProjectForm 
      project={currentProject} 
      onSave={() => { setIsEditing(false); fetchProjects(); }} 
      onCancel={() => setIsEditing(false)} 
    />;
  }

  return (
    <div className="grid gap-4">
      {projects.map((p) => (
        <div key={p._id} className="flex items-center justify-between p-4 bg-white/5 border border-white/5 rounded-2xl hover:bg-white/10 transition-all">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-800">
              <img src={p.imageUrl} className="w-full h-full object-cover" />
            </div>
            <div>
              <h4 className="font-bold">{p.name}</h4>
              <p className="text-xs text-gray-400">{p.slug || 'no-slug'}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={() => handleToggleVisibility(p)} 
              className={`p-2 rounded-lg transition-all ${p.isVisible ? 'text-green-400 hover:bg-green-400/10' : 'text-gray-500 hover:bg-gray-500/10'}`}
              title={p.isVisible ? "Hide from portfolio" : "Show on portfolio"}
            >
              {p.isVisible ? <Eye size={18} /> : <EyeOff size={18} />}
            </button>
            <button onClick={() => { setCurrentProject(p); setIsEditing(true); }} className="p-2 text-blue-400 hover:bg-blue-400/10 rounded-lg"><Edit size={18} /></button>
            <button onClick={() => handleDelete(p._id)} className="p-2 text-red-400 hover:bg-red-400/10 rounded-lg"><Trash2 size={18} /></button>
          </div>
        </div>
      ))}
    </div>
  );
}

function ProjectForm({ project, onSave, onCancel }: any) {
  const [formData, setFormData] = useState(project);
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (e: any, field: string, multiple = false) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    const api = multiple ? `${API_BASE}/api/upload-multiple` : `${API_BASE}/api/upload`;
    const data = new FormData();
    
    if (multiple) {
      Array.from(files).forEach((f: any) => data.append("images", f));
    } else {
      data.append("image", files[0]);
    }

    try {
      const res = await axios.post(api, data, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      if (multiple) {
        setFormData({ ...formData, screenshots: [...formData.screenshots, ...res.data.map((i: any) => i.url)] });
      } else {
        setFormData({ ...formData, [field]: res.data.url });
      }
      toast.success("Uploaded!");
    } catch (err) {
      toast.error("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      if (formData._id) {
        await axios.put(`${API_BASE}/api/admin/projects/${formData._id}`, formData, {
          headers: { Authorization: `Bearer ${getAdminToken()}` }
        });
      } else {
        await axios.post(`${API_BASE}/api/admin/projects`, formData, {
          headers: { Authorization: `Bearer ${getAdminToken()}` }
        });
      }
      toast.success("Project saved!");
      onSave();
    } catch (err) {
      toast.error("Save failed");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Project Name</label>
            <input 
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Slug</label>
            <input 
              value={formData.slug}
              onChange={(e) => setFormData({...formData, slug: e.target.value})}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500"
              placeholder="e.g. my-project"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Short Tagline</label>
            <input 
              value={formData.tagline}
              onChange={(e) => setFormData({...formData, tagline: e.target.value})}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500"
            />
          </div>
        </div>

        <div className="space-y-4">
          <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Hero Image</label>
          <div className="relative group aspect-video rounded-2xl overflow-hidden bg-white/5 border border-white/10">
            {formData.imageUrl ? (
              <img src={formData.imageUrl} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center text-gray-500">
                <ImageIcon size={48} className="mb-2" />
                <span className="text-xs">No image uploaded</span>
              </div>
            )}
            <label className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
              <input type="file" className="hidden" onChange={(e) => handleUpload(e, "imageUrl")} />
              <span className="bg-white text-black px-4 py-2 rounded-lg font-bold text-xs flex items-center gap-2">
                <Plus size={14} /> {uploading ? "Uploading..." : "Replace"}
              </span>
            </label>
          </div>
        </div>
      </div>

      <div>
        <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Short Description</label>
        <textarea 
          value={formData.description}
          onChange={(e) => setFormData({...formData, description: e.target.value})}
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 h-24"
        />
      </div>

      <div>
        <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Long Description / Details</label>
        <div className="bg-white/5 rounded-xl border border-white/10 overflow-hidden min-h-[300px]">
          <ReactQuill 
            theme="snow"
            value={formData.longDescription}
            onChange={(val) => setFormData({...formData, longDescription: val})}
            className="h-[250px]"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Live URL</label>
          <input 
            value={formData.url}
            onChange={(e) => setFormData({...formData, url: e.target.value, liveUrl: e.target.value})}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">GitHub URL</label>
          <input 
            value={formData.source}
            onChange={(e) => setFormData({...formData, source: e.target.value, githubUrl: e.target.value})}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Tools / Tech Stack (comma separated)</label>
        <input 
          value={formData.tools?.join(", ")}
          onChange={(e) => setFormData({...formData, tools: e.target.value.split(",").map(t => t.trim())})}
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500"
          placeholder="React, Tailwind, Node.js"
        />
      </div>

      <div>
        <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Key Challenges</label>
        <textarea 
          value={formData.challenges}
          onChange={(e) => setFormData({...formData, challenges: e.target.value})}
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 h-24"
        />
      </div>

      <div>
        <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Key Features (comma separated)</label>
        <input 
          value={formData.features?.join(", ")}
          onChange={(e) => setFormData({...formData, features: e.target.value.split(",").map(t => t.trim())})}
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500"
          placeholder="Auth, Payment, Analytics"
        />
      </div>

      <div>
        <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Gallery / Screenshots</label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {formData.screenshots?.map((s: string, i: number) => (
            <div key={i} className="relative aspect-video rounded-xl overflow-hidden group">
              <img src={s} className="w-full h-full object-cover" />
              <button 
                type="button"
                onClick={() => setFormData({...formData, screenshots: formData.screenshots.filter((_: any, idx: number) => idx !== i)})}
                className="absolute top-2 right-2 p-1 bg-red-500 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X size={12} />
              </button>
            </div>
          ))}
          <label className="aspect-video border-2 border-dashed border-white/10 rounded-xl flex flex-col items-center justify-center text-gray-500 hover:border-purple-500 hover:text-purple-400 transition-all cursor-pointer">
            <input type="file" multiple className="hidden" onChange={(e) => handleUpload(e, "screenshots", true)} />
            <Plus size={24} className="mb-1" />
            <span className="text-[10px] font-bold uppercase">Add Images</span>
          </label>
        </div>
      </div>

      <div className="flex items-center gap-3 p-4 bg-white/5 border border-white/10 rounded-2xl">
        <input 
          type="checkbox" 
          id="isVisible"
          checked={formData.isVisible}
          onChange={(e) => setFormData({...formData, isVisible: e.target.checked})}
          className="w-5 h-5 rounded border-white/10 text-purple-600 focus:ring-purple-500 bg-gray-900"
        />
        <label htmlFor="isVisible" className="text-sm font-bold text-gray-300 cursor-pointer flex items-center gap-2">
          {formData.isVisible ? <Eye size={16} className="text-green-400" /> : <EyeOff size={16} className="text-gray-500" />}
          Visible on Portfolio
        </label>
      </div>

      <div className="flex justify-end gap-4 pt-4">
        <button type="button" onClick={onCancel} className="px-6 py-3 border border-white/10 rounded-xl font-bold text-sm hover:bg-white/5">Cancel</button>
        <button type="submit" className="px-10 py-3 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-xl flex items-center gap-2">
          <Save size={18} /> Save Project
        </button>
      </div>
    </form>
  );
}

// Experience Manager Component
function ExperienceManager() {
  const [items, setItems] = useState<any[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentItem, setCurrentItem] = useState<any>(null);

  const fetchItems = async () => {
    try {
      const res = await axios.get(`${API_BASE}/api/admin/experience`, {
        headers: { Authorization: `Bearer ${getAdminToken()}` }
      });
      setItems(res.data);
    } catch (e) {
      toast.error("Failed to load experience");
    }
  };

  useEffect(() => {
    fetchItems();
    const handleAdd = () => {
      setCurrentItem({
        companyName: "",
        role: "",
        duration: "",
        location: "",
        shortDescription: "",
        longDescription: "",
        technologiesUsed: [],
        isVisible: true
      });
      setIsEditing(true);
    };
    window.addEventListener("add-experience", handleAdd);
    return () => window.removeEventListener("add-experience", handleAdd);
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this entry?")) return;
    try {
      await axios.delete(`${API_BASE}/api/admin/experience/${id}`, {
        headers: { Authorization: `Bearer ${getAdminToken()}` }
      });
      toast.success("Deleted");
      fetchItems();
    } catch (e) {
      toast.error("Delete failed");
    }
  };

  const handleToggleVisibility = async (it: any) => {
    try {
      await axios.put(`${API_BASE}/api/admin/experience/${it._id}`, { ...it, isVisible: !it.isVisible }, {
        headers: { Authorization: `Bearer ${getAdminToken()}` }
      });
      toast.success(it.isVisible ? "Hidden from portfolio" : "Visible on portfolio");
      fetchItems();
    } catch (e) {
      toast.error("Update failed");
    }
  };

  if (isEditing) {
    return <ExperienceForm 
      item={currentItem} 
      onSave={() => { setIsEditing(false); fetchItems(); }} 
      onCancel={() => setIsEditing(false)} 
    />;
  }

  return (
    <div className="grid gap-4">
      {items.map((it) => (
        <div key={it._id} className="flex items-center justify-between p-4 bg-white/5 border border-white/5 rounded-2xl hover:bg-white/10 transition-all">
          <div>
            <h4 className="font-bold">{it.role}</h4>
            <p className="text-xs text-gray-400">{it.companyName} • {it.duration}</p>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={() => handleToggleVisibility(it)} 
              className={`p-2 rounded-lg transition-all ${it.isVisible ? 'text-green-400 hover:bg-green-400/10' : 'text-gray-500 hover:bg-gray-500/10'}`}
              title={it.isVisible ? "Hide from portfolio" : "Show on portfolio"}
            >
              {it.isVisible ? <Eye size={18} /> : <EyeOff size={18} />}
            </button>
            <button onClick={() => { setCurrentItem(it); setIsEditing(true); }} className="p-2 text-blue-400 hover:bg-blue-400/10 rounded-lg"><Edit size={18} /></button>
            <button onClick={() => handleDelete(it._id)} className="p-2 text-red-400 hover:bg-red-400/10 rounded-lg"><Trash2 size={18} /></button>
          </div>
        </div>
      ))}
    </div>
  );
}

function ExperienceForm({ item, onSave, onCancel }: any) {
  const [formData, setFormData] = useState(item);
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (e: any) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    const data = new FormData();
    data.append("image", file);

    try {
      const res = await axios.post(`${API_BASE}/api/upload`, data, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      setFormData({ ...formData, companyLogo: res.data.url });
      toast.success("Logo uploaded!");
    } catch (err) {
      toast.error("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      if (formData._id) {
        await axios.put(`${API_BASE}/api/admin/experience/${formData._id}`, formData, {
          headers: { Authorization: `Bearer ${getAdminToken()}` }
        });
      } else {
        await axios.post(`${API_BASE}/api/admin/experience`, formData, {
          headers: { Authorization: `Bearer ${getAdminToken()}` }
        });
      }
      toast.success("Experience saved!");
      onSave();
    } catch (err) {
      toast.error("Save failed");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Company Name</label>
            <input 
              value={formData.companyName}
              onChange={(e) => setFormData({...formData, companyName: e.target.value})}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Role</label>
            <input 
              value={formData.role}
              onChange={(e) => setFormData({...formData, role: e.target.value})}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500"
            />
          </div>
        </div>

        <div className="space-y-4">
          <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Company Logo</label>
          <div className="relative group w-32 h-32 rounded-2xl overflow-hidden bg-white/5 border border-white/10">
            {formData.companyLogo ? (
              <img src={formData.companyLogo} className="w-full h-full object-contain p-2" />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center text-gray-500">
                <ImageIcon size={24} className="mb-1" />
                <span className="text-[10px]">No Logo</span>
              </div>
            )}
            <label className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
              <input type="file" className="hidden" onChange={handleUpload} />
              <span className="bg-white text-black px-2 py-1 rounded-md font-bold text-[10px]">
                {uploading ? "..." : "Upload"}
              </span>
            </label>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Duration</label>
          <input 
            value={formData.duration}
            onChange={(e) => setFormData({...formData, duration: e.target.value})}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500"
            placeholder="e.g. 2023 - Present"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Location</label>
          <input 
            value={formData.location}
            onChange={(e) => setFormData({...formData, location: e.target.value})}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Short Description</label>
        <textarea 
          value={formData.shortDescription}
          onChange={(e) => setFormData({...formData, shortDescription: e.target.value})}
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 h-24"
        />
      </div>

      <div>
        <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Long Description / Details</label>
        <div className="bg-white/5 rounded-xl border border-white/10 overflow-hidden min-h-[300px]">
          <ReactQuill 
            theme="snow"
            value={formData.longDescription}
            onChange={(val) => setFormData({...formData, longDescription: val})}
            className="h-[250px]"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Technologies (comma separated)</label>
        <input 
          value={formData.technologiesUsed?.join(", ")}
          onChange={(e) => setFormData({...formData, technologiesUsed: e.target.value.split(",").map(t => t.trim())})}
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500"
          placeholder="React, Node.js, etc."
        />
      </div>

      <div className="flex items-center gap-3 p-4 bg-white/5 border border-white/10 rounded-2xl">
        <input 
          type="checkbox" 
          id="isVisible"
          checked={formData.isVisible}
          onChange={(e) => setFormData({...formData, isVisible: e.target.checked})}
          className="w-5 h-5 rounded border-white/10 text-purple-600 focus:ring-purple-500 bg-gray-900"
        />
        <label htmlFor="isVisible" className="text-sm font-bold text-gray-300 cursor-pointer flex items-center gap-2">
          {formData.isVisible ? <Eye size={16} className="text-green-400" /> : <EyeOff size={16} className="text-gray-500" />}
          Visible on Portfolio
        </label>
      </div>

      <div className="flex justify-end gap-4 pt-4">
        <button type="button" onClick={onCancel} className="px-6 py-3 border border-white/10 rounded-xl font-bold text-sm hover:bg-white/5">Cancel</button>
        <button type="submit" className="px-10 py-3 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-xl flex items-center gap-2">
          <Save size={18} /> Save Experience
        </button>
      </div>
    </form>
  );
}

// Blog Manager Component
function BlogManager() {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentBlog, setCurrentBlog] = useState<any>(null);

  const fetchBlogs = async () => {
    try {
      const res = await axios.get(`${API_BASE}/api/admin/blogs`, {
        headers: { Authorization: `Bearer ${getAdminToken()}` }
      });
      setBlogs(res.data);
    } catch (e) {
      toast.error("Failed to load blogs");
    }
  };

  useEffect(() => {
    fetchBlogs();
    const handleAdd = () => {
      setCurrentBlog({
        title: "",
        slug: "",
        coverImage: "",
        shortDescription: "",
        content: "",
        tags: [],
        publishDate: new Date().toISOString(),
        isVisible: true
      });
      setIsEditing(true);
    };
    window.addEventListener("add-blogs", handleAdd);
    return () => window.removeEventListener("add-blogs", handleAdd);
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this blog?")) return;
    try {
      await axios.delete(`${API_BASE}/api/admin/blogs/${id}`, {
        headers: { Authorization: `Bearer ${getAdminToken()}` }
      });
      toast.success("Blog deleted");
      fetchBlogs();
    } catch (e) {
      toast.error("Delete failed");
    }
  };

  const handleToggleVisibility = async (b: any) => {
    try {
      await axios.put(`${API_BASE}/api/admin/blogs/${b._id}`, { ...b, isVisible: !b.isVisible }, {
        headers: { Authorization: `Bearer ${getAdminToken()}` }
      });
      toast.success(b.isVisible ? "Hidden from blog" : "Visible on blog");
      fetchBlogs();
    } catch (e) {
      toast.error("Update failed");
    }
  };

  if (isEditing) {
    return <BlogForm 
      blog={currentBlog} 
      onSave={() => { setIsEditing(false); fetchBlogs(); }} 
      onCancel={() => setIsEditing(false)} 
    />;
  }

  return (
    <div className="grid gap-4">
      {blogs.map((b) => (
        <div key={b._id} className="flex items-center justify-between p-4 bg-white/5 border border-white/5 rounded-2xl hover:bg-white/10 transition-all">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-800">
              <img src={b.coverImage} className="w-full h-full object-cover" />
            </div>
            <div>
              <h4 className="font-bold">{b.title}</h4>
              <p className="text-xs text-gray-400">{b.slug}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={() => handleToggleVisibility(b)} 
              className={`p-2 rounded-lg transition-all ${b.isVisible ? 'text-green-400 hover:bg-green-400/10' : 'text-gray-500 hover:bg-gray-500/10'}`}
              title={b.isVisible ? "Hide from portfolio" : "Show on portfolio"}
            >
              {b.isVisible ? <Eye size={18} /> : <EyeOff size={18} />}
            </button>
            <button onClick={() => { setCurrentBlog(b); setIsEditing(true); }} className="p-2 text-blue-400 hover:bg-blue-400/10 rounded-lg"><Edit size={18} /></button>
            <button onClick={() => handleDelete(b._id)} className="p-2 text-red-400 hover:bg-red-400/10 rounded-lg"><Trash2 size={18} /></button>
          </div>
        </div>
      ))}
    </div>
  );
}

function BlogForm({ blog, onSave, onCancel }: any) {
  const [formData, setFormData] = useState(blog);
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (e: any) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    const data = new FormData();
    data.append("image", file);

    try {
      const res = await axios.post(`${API_BASE}/api/upload`, data, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      setFormData({ ...formData, coverImage: res.data.url });
      toast.success("Uploaded!");
    } catch (err) {
      toast.error("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      if (formData._id) {
        await axios.put(`${API_BASE}/api/admin/blogs/${formData._id}`, formData, {
          headers: { Authorization: `Bearer ${getAdminToken()}` }
        });
      } else {
        await axios.post(`${API_BASE}/api/admin/blogs`, formData, {
          headers: { Authorization: `Bearer ${getAdminToken()}` }
        });
      }
      toast.success("Blog saved!");
      onSave();
    } catch (err) {
      toast.error("Save failed");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Blog Title</label>
            <input 
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Slug</label>
            <input 
              value={formData.slug}
              onChange={(e) => setFormData({...formData, slug: e.target.value})}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500"
            />
          </div>
        </div>

        <div className="space-y-4">
          <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Cover Image</label>
          <div className="relative group aspect-video rounded-2xl overflow-hidden bg-white/5 border border-white/10">
            {formData.coverImage ? (
              <img src={formData.coverImage} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center text-gray-500">
                <ImageIcon size={48} className="mb-2" />
                <span className="text-xs">No image uploaded</span>
              </div>
            )}
            <label className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
              <input type="file" className="hidden" onChange={handleUpload} />
              <span className="bg-white text-black px-4 py-2 rounded-lg font-bold text-xs flex items-center gap-2">
                <Plus size={14} /> {uploading ? "Uploading..." : "Replace"}
              </span>
            </label>
          </div>
        </div>
      </div>

      <div>
        <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Short Description</label>
        <textarea 
          value={formData.shortDescription}
          onChange={(e) => setFormData({...formData, shortDescription: e.target.value})}
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 h-24"
        />
      </div>

      <div>
        <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Content</label>
        <div className="bg-white/5 rounded-xl border border-white/10 overflow-hidden min-h-[600px]">
          <ReactQuill 
            theme="snow"
            value={formData.content}
            onChange={(val) => setFormData({...formData, content: val})}
            className="h-[550px]"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Tags (comma separated)</label>
        <input 
          value={formData.tags?.join(", ")}
          onChange={(e) => setFormData({...formData, tags: e.target.value.split(",").map(t => t.trim())})}
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500"
          placeholder="Nextjs, Tutorial, Coding"
        />
      </div>

      <div className="flex items-center gap-3 p-4 bg-white/5 border border-white/10 rounded-2xl">
        <input 
          type="checkbox" 
          id="isVisible-blog"
          checked={formData.isVisible}
          onChange={(e) => setFormData({...formData, isVisible: e.target.checked})}
          className="w-5 h-5 rounded border-white/10 text-purple-600 focus:ring-purple-500 bg-gray-900"
        />
        <label htmlFor="isVisible-blog" className="text-sm font-bold text-gray-300 cursor-pointer flex items-center gap-2">
          {formData.isVisible ? <Eye size={16} className="text-green-400" /> : <EyeOff size={16} className="text-gray-500" />}
          Visible on Portfolio
        </label>
      </div>

      <div className="flex justify-end gap-4 pt-12">
        <button type="button" onClick={onCancel} className="px-6 py-3 border border-white/10 rounded-xl font-bold text-sm hover:bg-white/5">Cancel</button>
        <button type="submit" className="px-10 py-3 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-xl flex items-center gap-2">
          <Save size={18} /> Save Blog
        </button>
      </div>
    </form>
  );
}

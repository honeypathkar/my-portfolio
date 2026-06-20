"use client";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";
import { FiDownload } from "react-icons/fi";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { toast } from "sonner";
import { Send, ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";

export default function ContactPage() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (feedback) {
      const timer = setTimeout(() => setFeedback(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [feedback]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((s) => ({ ...s, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFeedback(null);
    try {
      const backendUrl = process.env.NEXT_PUBLIC_DATA_API || "http://localhost:5000/";
      const response = await axios.post(`${backendUrl}/send-email`, formData);
      setFeedback({ type: "success", message: response.data });
      toast.success("Message sent successfully!", {
        style: { backgroundColor: "#7c3aed", color: "#fff" },
        closeButton: false,
      });
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error: any) {
      setFeedback({ type: "error", message: error?.response?.data || "Failed to send message." });
      toast.error("Failed to send message", {
        style: { backgroundColor: "#ef4444", color: "#fff" },
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (!sectionRef.current) return;
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.fromTo(".contact-label", { opacity: 0, y: 20 }, {
        opacity: 1, y: 0, duration: 0.6,
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%", once: true }
      });
      gsap.fromTo(".contact-title", { opacity: 0, y: 30 }, {
        opacity: 1, y: 0, duration: 0.7, delay: 0.1,
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%", once: true }
      });
      gsap.fromTo(".contact-card", { opacity: 0, y: 20 }, {
        opacity: 1, y: 0, duration: 0.5, stagger: 0.1, delay: 0.2,
        scrollTrigger: { trigger: ".contact-grid", start: "top 85%", once: true }
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const socials = [
    { icon: FaGithub, href: "https://github.com/honeypathkar", label: "GitHub" },
    { icon: FaLinkedin, href: "https://www.linkedin.com/in/honey-pathkar/", label: "LinkedIn" },
    { icon: FaInstagram, href: "https://instagram.com/honey.jsx", label: "Instagram" },
    { icon: SiLeetcode, href: "https://leetcode.com/u/honeypathkar70/", label: "LeetCode" },
  ];

  return (
    <section ref={sectionRef} className="section-padding relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-brand-600/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="section-container relative">
        <div className="text-center mb-16">
          <div className="contact-label flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-12 bg-brand-500" />
            <span className="text-brand-400 text-xs font-mono font-medium uppercase tracking-widest">Contact</span>
            <div className="h-px w-12 bg-brand-500" />
          </div>
          <h2 className="contact-title text-section text-white mb-4">
            Let's Build Something <span className="text-gradient">Exceptional</span>
          </h2>
          <p className="text-gray-500 text-lg max-w-lg mx-auto">
            Have a project in mind or want to collaborate? I'd love to hear from you.
          </p>
        </div>

        <div className="contact-grid grid lg:grid-cols-5 gap-8 max-w-5xl mx-auto">
          <div className="lg:col-span-2 space-y-6">
            <div className="contact-card glass-card p-6 space-y-5">
              <h3 className="text-white font-semibold text-lg">Get in Touch</h3>
              <div className="space-y-4">
                <a href="mailto:honeypatkar70@gmail.com" className="flex items-center gap-3 text-gray-400 hover:text-brand-400 transition-colors group">
                  <div className="w-10 h-10 rounded-xl bg-brand-500/10 flex items-center justify-center group-hover:bg-brand-500/20 transition-colors">
                    <Mail size={16} className="text-brand-400" />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono text-gray-600 uppercase tracking-wider">Email</div>
                    <div className="text-sm">honeypatkar70@gmail.com</div>
                  </div>
                </a>
                <div className="flex items-center gap-3 text-gray-400">
                  <div className="w-10 h-10 rounded-xl bg-brand-500/10 flex items-center justify-center">
                    <MapPin size={16} className="text-brand-400" />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono text-gray-600 uppercase tracking-wider">Location</div>
                    <div className="text-sm">Bengaluru, India</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-gray-400">
                  <div className="w-10 h-10 rounded-xl bg-brand-500/10 flex items-center justify-center">
                    <Phone size={16} className="text-brand-400" />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono text-gray-600 uppercase tracking-wider">Phone</div>
                    <div className="text-sm">+91 7976909686</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="contact-card glass-card p-6">
              <h3 className="text-white font-semibold text-sm mb-4">Follow Me</h3>
              <div className="flex gap-3">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="w-11 h-11 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center text-gray-400 hover:text-brand-400 hover:border-brand-500/30 hover:bg-brand-500/10 transition-all duration-300"
                  >
                    <s.icon size={18} />
                  </a>
                ))}
              </div>
            </div>

            <div className="contact-card">
              <a
                href="https://drive.google.com/file/d/1alPFKOfvFhDyrm7QhpNUgPWd4vYx-e0q/view?usp=drive_link"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3.5 bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.08] rounded-2xl text-white text-sm font-semibold transition-all duration-300 hover:border-brand-500/30"
              >
                <FiDownload size={16} /> Download Resume
              </a>
            </div>
          </div>

          <div className="lg:col-span-3">
            <form className="contact-card glass-card p-6 sm:p-8" onSubmit={handleSubmit}>
              <div className="grid sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-gray-500 text-xs font-mono uppercase tracking-wider mb-2" htmlFor="name">Name</label>
                  <input
                    type="text" id="name" name="name" value={formData.name} onChange={handleChange} required
                    className="w-full px-4 py-3 bg-white/[0.03] border border-white/[0.06] rounded-xl text-white text-sm focus:outline-none focus:border-brand-500/50 focus:ring-1 focus:ring-brand-500/20 transition-all placeholder:text-gray-600"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-gray-500 text-xs font-mono uppercase tracking-wider mb-2" htmlFor="email">Email</label>
                  <input
                    type="email" id="email" name="email" value={formData.email} onChange={handleChange} required
                    className="w-full px-4 py-3 bg-white/[0.03] border border-white/[0.06] rounded-xl text-white text-sm focus:outline-none focus:border-brand-500/50 focus:ring-1 focus:ring-brand-500/20 transition-all placeholder:text-gray-600"
                    placeholder="you@example.com"
                  />
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-gray-500 text-xs font-mono uppercase tracking-wider mb-2" htmlFor="subject">Subject</label>
                <input
                  type="text" id="subject" name="subject" value={formData.subject} onChange={handleChange} required
                  className="w-full px-4 py-3 bg-white/[0.03] border border-white/[0.06] rounded-xl text-white text-sm focus:outline-none focus:border-brand-500/50 focus:ring-1 focus:ring-brand-500/20 transition-all placeholder:text-gray-600"
                  placeholder="Project Inquiry"
                />
              </div>
              <div className="mb-6">
                <label className="block text-gray-500 text-xs font-mono uppercase tracking-wider mb-2" htmlFor="message">Message</label>
                <textarea
                  rows={5} id="message" name="message" value={formData.message} onChange={handleChange} required
                  className="w-full px-4 py-3 bg-white/[0.03] border border-white/[0.06] rounded-xl text-white text-sm focus:outline-none focus:border-brand-500/50 focus:ring-1 focus:ring-brand-500/20 transition-all resize-none placeholder:text-gray-600"
                  placeholder="Tell me about your project..."
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 py-3.5 bg-brand-600 hover:bg-brand-500 text-white font-semibold rounded-2xl transition-all duration-300 hover:shadow-glow disabled:opacity-50 disabled:cursor-not-allowed text-sm active:scale-[0.98]"
              >
                {isSubmitting ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <Send size={15} /> Send Message
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

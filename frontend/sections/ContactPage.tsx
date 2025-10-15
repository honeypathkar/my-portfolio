"use client";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";
import { FiDownload } from "react-icons/fi";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { toast } from "sonner";

export default function ContactPage() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
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
        style: {
          backgroundColor: "#a855f7",
          color: "#fff",
        },
        closeButton: false,
      });
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error: any) {
      setFeedback({ type: "error", message: error?.response?.data || "Failed to send message. Please try again." });
      toast.error("Failed to send message", {
        style: {
          backgroundColor: "#ef4444",
          color: "#fff",
        },
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (!sectionRef.current) return;
    gsap.registerPlugin(ScrollTrigger);
    const items = sectionRef.current.querySelectorAll("h2, h3, h4, a, label, input, textarea, button");
    const ctx = gsap.context(() => {
      gsap.fromTo(items, { y: 16, opacity: 0 }, {
        y: 0,
        opacity: 1,
        duration: 0.5,
        stagger: 0.04,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current as Element,
          start: "top 75%",
          end: "bottom 25%",
          toggleActions: "play reverse play reverse",
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef}>
      <div className="flex flex-col items-center text-center mb-5 text-white">
        <h2 className="text-3xl font-bold text-center">Get In Touch</h2>
        <div className="w-20 h-1 bg-purple-600 mt-3"></div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div className="bg-gray-800/50 rounded-xl p-8 border-[1px] border-purple-600/30 hover:border-purple-600 transition-all duration-300">
              <h3 className="text-2xl font-semibold text-white mb-6">Contact Information</h3>
              <div className="space-y-6 text-white/80 text-sm">
                <p><span className="text-purple-400">Phone:</span> +91 7976909686</p>
                <p><span className="text-purple-400">Email:</span> honeypatkar70@gmail.com</p>
                <p><span className="text-purple-400">Location:</span> Baran, Rajasthan</p>
                <div className="mt-4">
                  <h4 className="text-white font-semibold mb-2">Follow Me</h4>
                  <div className="flex space-x-4">
                    <a href="https://github.com/honeypathkar" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-purple-600/20 rounded-full flex items-center justify-center text-purple-400 hover:bg-purple-600 hover:text-white transition-colors duration-300"><FaGithub /></a>
                    <a href="https://www.linkedin.com/in/honey-pathkar/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-purple-600/20 rounded-full flex items-center justify-center text-purple-400 hover:bg-purple-600 hover:text-white transition-colors duration-300"><FaLinkedin /></a>
                    <a href="https://instagram.com/honey.jsx" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-purple-600/20 rounded-full flex items-center justify-center text-purple-400 hover:bg-purple-600 hover:text-white transition-colors duration-300"><FaInstagram /></a>
                    <a href="https://leetcode.com/u/honeypathkar70/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-purple-600/20 rounded-full flex items-center justify-center text-purple-400 hover:bg-purple-600 hover:text-white transition-colors duration-300"><SiLeetcode className="text-xl" /></a>
                  </div>
                </div>
                <div className="mt-6">
                  <h4 className="text-white font-semibold mb-2">Resume</h4>
                  <a href="https://drive.google.com/file/d/1alPFKOfvFhDyrm7QhpNUgPWd4vYx-e0q/view?usp=drive_link" target="_blank" rel="noopener noreferrer" className="w-36 h-10 bg-purple-600/20 rounded-full inline-flex items-center justify-center gap-2 text-purple-400 hover:bg-purple-600 hover:text-white transition-colors duration-300"><FiDownload /> Download</a>
                </div>
              </div>
            </div>
          </div>
          <div>
            <form className="bg-gray-800/50 rounded-xl p-8 border-[1px] border-purple-600/30 hover:border-purple-600 transition-all duration-300" onSubmit={handleSubmit}>
              <div className="mb-2">
                <label className="block text-gray-400 mb-2" htmlFor="name">Name</label>
                <input type="text" id="name" className="w-full px-4 py-3 bg-gray-700/50 border-[1px] border-gray-600 rounded-lg focus:outline-none focus:border-purple-600 text-white" placeholder="John" name="name" value={formData.name} onChange={handleChange} required />
              </div>
              <div className="mb-2">
                <label className="block text-gray-400 mb-2" htmlFor="email">Email</label>
                <input type="email" id="email" className="w-full px-4 py-3 bg-gray-700/50 border-[1px] border-gray-600 rounded-lg focus:outline-none focus:border-purple-600 text-white" placeholder="johndoe@example.com" name="email" value={formData.email} onChange={handleChange} required />
              </div>
              <div className="mb-2">
                <label className="block text-gray-400 mb-2" htmlFor="subject">Subject</label>
                <input type="text" id="subject" className="w-full px-4 py-3 bg-gray-700/50 border-[1px] border-gray-600 rounded-lg focus:outline-none focus:border-purple-600 text-white" placeholder="Project Inquiry" name="subject" value={formData.subject} onChange={handleChange} required />
              </div>
              <div className="mb-2">
                <label className="block text-gray-400 mb-2" htmlFor="message">Message</label>
                <textarea rows={4} id="message" className="w-full px-4 py-3 bg-gray-700/50 border-[1px] border-gray-600 rounded-lg focus:outline-none focus:border-purple-600 text-white resize-none" placeholder="Your message..." name="message" value={formData.message} onChange={handleChange} required />
              </div>
              <div>
                <button type="submit" className="w-full bg-purple-600 text-white py-3 px-6 rounded-lg hover:bg-purple-700 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed" disabled={isSubmitting}>
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>
              </div>
              {/* {feedback && (
                <div className={`mt-4 p-3 rounded-lg text-center ${feedback.type === "success" ? "bg-green-500 text-white" : "bg-red-500 text-white"}`}>
                  {feedback.message}
                </div>
              )} */}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}



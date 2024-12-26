import React from "react";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EmailIcon from "@mui/icons-material/Email";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import DownloadIcon from "@mui/icons-material/Download";
import Footer from "./Footer";

const Contact = () => {
  return (
    <div>
      <div className="flex flex-col items-center text-center mb-5 text-white">
        <h2 className="text-3xl font-bold text-center">Get In Touch</h2>
        <div className="w-20 h-1 bg-purple-600 mt-3"></div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-8" data-aos="fade-right">
            <div className="bg-gray-800/50 rounded-xl p-8 border-[1px] border-purple-600/30 hover:border-purple-600 transition-all duration-300">
              <h3 className="text-2xl font-semibold text-white mb-6">
                Contact Information
              </h3>
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-purple-600/20 rounded-full flex items-center justify-center">
                    <LocalPhoneIcon sx={{ color: "#c084fc" }} />
                  </div>
                  <div>
                    <p className="text-gray-400">Phone</p>
                    <p className="text-white font-medium">+91 7976909686</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-purple-600/20 rounded-full flex items-center justify-center">
                    <EmailIcon sx={{ color: "#c084fc" }} />
                  </div>
                  <div>
                    <p className="text-gray-400">Email</p>
                    <p className="text-white font-medium">
                      honeypatkar70@gmail.com
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-purple-600/20 rounded-full flex items-center justify-center">
                    <LocationOnIcon sx={{ color: "#c084fc" }} />
                  </div>
                  <div>
                    <p className="text-gray-400">Location</p>
                    <p className="text-white font-medium">Baran, Rajasthan</p>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <h4 className="text-white font-semibold mb-4">Follow Me</h4>
                <div className="flex space-x-4">
                  <a
                    href="https://github.com/honeypathkar"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-purple-600/20 rounded-full flex items-center justify-center text-purple-400 hover:bg-purple-600 hover:text-white transition-colors duration-300"
                  >
                    <GitHubIcon />
                  </a>
                  <a
                    href="https://linkedin.com/honey-pathkar"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-purple-600/20 rounded-full flex items-center justify-center text-purple-400 hover:bg-purple-600 hover:text-white transition-colors duration-300"
                  >
                    <LinkedInIcon />
                  </a>
                  <a
                    href="https://instagram.com/honey.jsx"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-purple-600/20 rounded-full flex items-center justify-center text-purple-400 hover:bg-purple-600 hover:text-white transition-colors duration-300"
                  >
                    <InstagramIcon />
                  </a>
                </div>
              </div>

              <div className="mt-8">
                <h4 className="text-white font-semibold mb-4">Resume</h4>
                <a
                  href="https://drive.google.com/file/d/1cx7roHwR7MTqcXkYmW28X00J3gizqtNw/view?usp=drive_link"
                  download="resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-36 h-10 bg-purple-600/20 rounded-full flex items-center justify-center text-purple-400 hover:bg-purple-600 hover:text-white transition-colors duration-300"
                >
                  <DownloadIcon />
                  &nbsp;
                  <span>Download</span>
                </a>
              </div>
            </div>
          </div>

          <div data-aos="fade-left">
            <form
              className="bg-gray-800/50 rounded-xl p-8 border-[1px] border-purple-600/30 hover:border-purple-600 transition-all duration-300"
              action="https://getform.io/f/pbgxwjka"
              method="POST"
            >
              <div>
                <div className="mb-2">
                  <label className="block text-gray-400 mb-2">Name</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 bg-gray-700/50 border-[1px] border-gray-600 rounded-lg focus:outline-none focus:border-purple-600 text-white"
                    placeholder="John"
                    fdprocessedid="l155t"
                    name="name"
                  />
                </div>
                <div className="sm:col-span-2 mb-2">
                  <label className="block text-gray-400 mb-2">Email</label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 bg-gray-700/50 border-[1px] border-gray-600 rounded-lg focus:outline-none focus:border-purple-600 text-white"
                    placeholder="johndoe@example.com"
                    fdprocessedid="kapzpm"
                    name="email"
                  />
                </div>
                <div className="sm:col-span-2 mb-2">
                  <label className="block text-gray-400 mb-2">Subject</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 bg-gray-700/50 border-[1px] border-gray-600 rounded-lg focus:outline-none focus:border-purple-600 text-white"
                    placeholder="Project Inquiry"
                    fdprocessedid="qs97s"
                    name="subject"
                  />
                </div>
                <div className="sm:col-span-2 mb-2">
                  <label className="block text-gray-400 mb-2">Message</label>
                  <textarea
                    rows="4"
                    className="w-full px-4 py-3 bg-gray-700/50 border-[1px] border-gray-600 rounded-lg focus:outline-none focus:border-purple-600 text-white resize-none"
                    placeholder="Your message..."
                    name="message"
                  ></textarea>
                </div>
                <div className="sm:col-span-2">
                  <button
                    type="submit"
                    className="w-full bg-purple-600 text-white py-3 px-6 rounded-lg hover:bg-purple-700 transition-colors duration-300"
                    fdprocessedid="4lr358"
                  >
                    Send Message
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="border-[1px] border-gray-700 mt-5 mx-8"></div>
      <Footer />
    </div>
  );
};

export default Contact;

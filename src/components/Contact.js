import React from "react";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EmailIcon from "@mui/icons-material/Email";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import DownloadForOfflineRoundedIcon from "@mui/icons-material/DownloadForOfflineRounded";
import Leetcode from "./images/leetcode.png";

const Contact = () => {
  return (
    <div className="lg:flex sm:block md:block container">
      <div className="w-full max-w-3xl mx-auto py-12 md:py-20 my-10">
        <div className="space-y-6 text-center">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Contact Us
          </h1>
          <p className="text-lg text-black dark:text-gray-400">
            Have a question or want to work together? Fill out the form below
            and we'll get back to you as soon as possible.
          </p>
        </div>
        <div className="mt-10">
          <form
            className="space-y-6"
            action="https://getform.io/f/pbgxwjka"
            method="POST"
          >
            <div className="grid grid-cols-1 gap-y-6 gap-x-8 sm:grid-cols-2">
              <div>
                <label
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  htmlFor="name"
                >
                  Name
                </label>
                <input
                  className="input-style"
                  id="name"
                  placeholder="Your name"
                  type="text"
                  name="name"
                />
              </div>
              <div>
                <label
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  className="input-style"
                  id="email"
                  placeholder="Your email"
                  type="email"
                  name="email"
                />
              </div>
            </div>
            <div>
              <label
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                htmlFor="message"
              >
                Message
              </label>
              <textarea
                className="textarea-style"
                id="message"
                rows="5"
                placeholder="Your message"
                name="message"
              ></textarea>
            </div>
            <button
              className="rounded-md bg-[#6FB3B8] w-[100%] py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#86bdc8] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              type="submit"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
      <div className="max-w-lg mx-auto p-8 my-24">
        <h2 className="text-3xl font-bold mb-6">Get in touch</h2>
        <p className="text-zinc-600 mb-6">Let's Contact &rarr;</p>
        <div className="space-y-4 mb-6">
          <div className="flex items-center">
            <LocationOnIcon />
            <span>&nbsp;&nbsp;&nbsp;Baran , Rajasthan 325205</span>
          </div>
          <div className="flex items-center">
            <a href="tel:+91 7976909686">
              <LocalPhoneIcon />
              <span>&nbsp;&nbsp;&nbsp;+91 7976909686</span>
            </a>
          </div>
          <div className="flex items-center">
            <a
              href="mailto:honeypatkar70@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <EmailIcon />
              <span>&nbsp;&nbsp;&nbsp;honeypatkar70@gmail.com</span>
            </a>
          </div>
        </div>
        <p className="text-zinc-600 mb-6">Social Media &rarr;</p>
        <div className="space-y-4">
          <div className="flex items-center">
            <a
              href="https://github.com/honeypathkar"
              target="_blank"
              rel="noopener noreferrer"
            >
              <GitHubIcon />
              <span>&nbsp;&nbsp;&nbsp; @honaypathkar</span>
            </a>
          </div>
          <div className="flex items-center">
            <a
              href="https://linkedin.com/in/honey-pathkar-7725632ba"
              target="_blank"
              rel="noopener noreferrer"
            >
              <LinkedInIcon />
              <span>&nbsp;&nbsp;&nbsp; @honeypathkar</span>
            </a>
          </div>
          <div className="flex items-center">
            <a
              href="https://instagram.com/honey.jsx"
              target="_blank"
              rel="noopener noreferrer"
            >
              <InstagramIcon />
              <span>&nbsp;&nbsp;&nbsp; @honey.jsx</span>
            </a>
          </div>
          <div className="flex items-center">
            <a
              href="https://leetcode.com/u/honeypatkar70"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="flex items-center">
                <img src={Leetcode} className="w-[8%]" alt="Leetcode" />
                <span>&nbsp;&nbsp; @honeypatkar70</span>
              </div>
            </a>
          </div>
        </div>
        <p className="text-zinc-600 mb-6 mt-6">Download Resume &rarr;</p>
        <a
          href="https://drive.google.com/file/d/1jZREXGRTUKRVzf6Q3C-n9AduqMsHgyoN/view?usp=sharing"
          download="resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
        >
          <DownloadForOfflineRoundedIcon />{" "}
          <span>&nbsp;&nbsp;&nbsp;Download</span>
        </a>
      </div>
      <style jsx="true">{`
        .input-style {
          width: 100%;
          height: 40px;
          padding: 0.5rem;
          font-size: 1rem;
          border-radius: 5px;
          border: none;
          outline: none;
          background-color: #86bdc8;
          color: black;
        }

        .input-style::placeholder {
          color: black;
        }

        .textarea-style {
          width: 100%;
          padding: 0.5rem;
          font-size: 1rem;
          border-radius: 5px;
          border: none;
          outline: none;
          background-color: #86bdc8;
          color: black;
        }

        .textarea-style::placeholder {
          color: black;
        }
      `}</style>
    </div>
  );
};

export default Contact;

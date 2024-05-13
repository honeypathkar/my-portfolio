import React from "react";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EmailIcon from "@mui/icons-material/Email";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import Resume from "./images/Resume.pdf";
import DownloadForOfflineRoundedIcon from "@mui/icons-material/DownloadForOfflineRounded";

const Contact = () => {
  return (
    <>
      <div className="max-w-lg mx-auto p-8 my-20">
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
              href="https://github.com/honeypatkar"
              target="_blank"
              rel="noopener noreferrer"
            >
              <GitHubIcon />
              <span>&nbsp;&nbsp;&nbsp;@honaypatkar</span>
            </a>
          </div>
          <div className="flex items-center">
            <a
              href="https://linkedin.com/in/honey-patkar-7725632ba"
              target="_blank"
              rel="noopener noreferrer"
            >
              <LinkedInIcon />
              <span>&nbsp;&nbsp;&nbsp; @honeypatkar</span>
            </a>
          </div>
          <div className="flex items-center">
            <a
              href="https://instagram.com/honey.jsx"
              target="_blank"
              rel="noopener noreferrer"
            >
              <InstagramIcon />
              <span>&nbsp;&nbsp;&nbsp; honey.jsx</span>
            </a>
          </div>
        </div>
        <p className="text-zinc-600 mb-6 mt-6">Download Resume &rarr;</p>
        <a href={Resume} download="resume.pdf">
          <DownloadForOfflineRoundedIcon />{" "}
          <span>&nbsp;&nbsp;&nbsp;Download</span>
        </a>
      </div>
    </>
  );
};
export default Contact;

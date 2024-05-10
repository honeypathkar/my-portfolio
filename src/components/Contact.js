import React from "react";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EmailIcon from "@mui/icons-material/Email";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";

const Contact = () => {
  return (
    <div className="max-w-lg mx-auto p-8 my-20">
      <h2 className="text-2xl font-bold mb-6">Get in touch</h2>
      <p className="text-zinc-600 mb-6">Let's Contact &rarr;</p>
      <div className="space-y-4 mb-6">
        <div className="flex items-center">
          <LocationOnIcon />
          <span>&nbsp;&nbsp;&nbsp;Baran , Rajasthan 325205</span>
        </div>
        <div className="flex items-center">
          <LocalPhoneIcon />
          <span>&nbsp;&nbsp;&nbsp;+91 7976909686</span>
        </div>
        <div className="flex items-center">
          <EmailIcon />
          <span>&nbsp;&nbsp;&nbsp;honeypatkar70@gmail.com</span>
        </div>
      </div>
      <p className="text-zinc-600 mb-6">Social Media &rarr;</p>
      <div className="space-y-4">
        <div className="flex items-center">
          <GitHubIcon />
          <span>&nbsp;&nbsp;&nbsp;@honaypatkar</span>
        </div>
        <div className="flex items-center">
          <LinkedInIcon />
          <span>&nbsp;&nbsp;&nbsp; @honeypatkar</span>
        </div>
        <div className="flex items-center">
          <InstagramIcon />
          <span>&nbsp;&nbsp;&nbsp; honey.jsx</span>
        </div>
      </div>
    </div>
  );
};
export default Contact;

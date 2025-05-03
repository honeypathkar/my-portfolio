import React, { useState, useEffect } from "react"; // Import useState and useEffect
import axios from "axios"; // Import axios
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EmailIcon from "@mui/icons-material/Email";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import DownloadIcon from "@mui/icons-material/Download";
import Footer from "./Footer";
import LeetcodeIcon from "../images/leetcode.png"; // Make sure this path is correct

const Contact = () => {
  // State to manage form input values
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  // State to manage form submission feedback
  const [feedback, setFeedback] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Effect to hide feedback message after a few seconds
  useEffect(() => {
    if (feedback) {
      const timer = setTimeout(() => {
        setFeedback(null); // Hide the feedback message
      }, 5000); // Hide after 5 seconds (5000 milliseconds)

      // Cleanup function to clear the timer if the component unmounts
      // or if feedback changes before the timer runs out
      return () => clearTimeout(timer);
    }
  }, [feedback]); // Re-run this effect whenever the 'feedback' state changes

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    setIsSubmitting(true); // Set submitting state to true
    setFeedback(null); // Clear previous feedback immediately on new submission attempt

    try {
      // Use environment variable for backend URL
      // If running locally, it might be 'http://localhost:5000'
      // If deployed, use your deployed backend URL
      const backendUrl =
        process.env.REACT_APP_DATA_API || "http://localhost:5000/";
      const response = await axios.post(`${backendUrl}send-email`, formData);

      // Handle successful submission
      setFeedback({ type: "success", message: response.data });
      setFormData({ name: "", email: "", subject: "", message: "" }); // Clear form
    } catch (error) {
      // Handle submission error
      console.error("Error submitting form:", error);
      setFeedback({
        type: "error",
        message:
          error.response?.data || "Failed to send message. Please try again.",
      });
    } finally {
      // isSubmitting is set to false after the feedback is set,
      // allowing the button to become active again while the feedback is visible.
      // If you want the button to remain disabled until feedback disappears,
      // move this line inside the setTimeout in the useEffect.
      setIsSubmitting(false);
    }
  };

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
                    href="https://www.linkedin.com/in/honey-pathkar/"
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
                  <a
                    href="https://leetcode.com/u/honeypathkar70/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-purple-600/20 rounded-full flex items-center justify-center text-purple-400 hover:bg-purple-600 hover:text-white transition-colors duration-300"
                  >
                    <img
                      src={LeetcodeIcon}
                      alt="Leetcode Icon"
                      className="w-6 h-6"
                    />
                  </a>
                </div>
              </div>

              <div className="mt-8">
                <h4 className="text-white font-semibold mb-4">Resume</h4>
                <a
                  href="https://drive.google.com/file/d/1alPFKOfvFhDyrm7QhpNUgPWd4vYx-e0q/view?usp=drive_link"
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
              onSubmit={handleSubmit} // Add onSubmit handler
              // Remove action and method attributes
              // action="https://getform.io/f/pbgxwjka"
              // method="POST"
            >
              <div>
                <div className="mb-2">
                  <label className="block text-gray-400 mb-2" htmlFor="name">
                    Name
                  </label>{" "}
                  {/* Added htmlFor */}
                  <input
                    type="text"
                    id="name" // Added id
                    className="w-full px-4 py-3 bg-gray-700/50 border-[1px] border-gray-600 rounded-lg focus:outline-none focus:border-purple-600 text-white"
                    placeholder="John"
                    name="name"
                    value={formData.name} // Controlled component
                    onChange={handleChange} // Handle input change
                    required
                  />
                </div>
                <div className="sm:col-span-2 mb-2">
                  <label className="block text-gray-400 mb-2" htmlFor="email">
                    Email
                  </label>{" "}
                  {/* Added htmlFor */}
                  <input
                    type="email"
                    id="email" // Added id
                    className="w-full px-4 py-3 bg-gray-700/50 border-[1px] border-gray-600 rounded-lg focus:outline-none focus:border-purple-600 text-white"
                    placeholder="johndoe@example.com"
                    name="email"
                    value={formData.email} // Controlled component
                    onChange={handleChange} // Handle input change
                    required
                  />
                </div>
                <div className="sm:col-span-2 mb-2">
                  <label className="block text-gray-400 mb-2" htmlFor="subject">
                    Subject
                  </label>{" "}
                  {/* Added htmlFor */}
                  <input
                    type="text"
                    id="subject" // Added id
                    className="w-full px-4 py-3 bg-gray-700/50 border-[1px] border-gray-600 rounded-lg focus:outline-none focus:border-purple-600 text-white"
                    placeholder="Project Inquiry"
                    name="subject"
                    value={formData.subject} // Controlled component
                    onChange={handleChange} // Handle input change
                    required
                  />
                </div>
                <div className="sm:col-span-2 mb-2">
                  <label className="block text-gray-400 mb-2" htmlFor="message">
                    Message
                  </label>{" "}
                  {/* Added htmlFor */}
                  <textarea
                    rows="4"
                    id="message" // Added id
                    className="w-full px-4 py-3 bg-gray-700/50 border-[1px] border-gray-600 rounded-lg focus:outline-none focus:border-purple-600 text-white resize-none"
                    placeholder="Your message..."
                    name="message"
                    value={formData.message} // Controlled component
                    onChange={handleChange} // Handle input change
                    required
                  ></textarea>
                </div>
                <div className="sm:col-span-2">
                  <button
                    type="submit"
                    className="w-full bg-purple-600 text-white py-3 px-6 rounded-lg hover:bg-purple-700 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed" // Added disabled styles
                    disabled={isSubmitting} // Disable button while submitting
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}{" "}
                    {/* Button text changes while submitting */}
                  </button>
                </div>

                {/* Feedback Message */}
                {feedback && (
                  <div
                    className={`mt-4 p-3 rounded-lg text-center ${
                      feedback.type === "success"
                        ? "bg-green-500 text-white"
                        : "bg-red-500 text-white"
                    }`}
                  >
                    {feedback.message}
                  </div>
                )}
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

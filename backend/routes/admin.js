
import express from "express";
import Work from "../models/work-model.js";
import Blog from "../models/blog-model.js";
import Experience from "../models/experience-model.js";
import OTP from "../models/otp-model.js";
import { verifyToken } from "../middleware/verifyToken.js";
import { transporter } from "../config/transporter.js";

const router = express.Router();

const ALLOWED_EMAIL = "hello@honeypathkar.com";

// OTP Routes
router.post("/send-otp", async (req, res) => {
  const { email } = req.body;
  if (email !== ALLOWED_EMAIL) {
    return res.status(403).json({ error: "Unauthorized email address" });
  }

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes

  try {
    await OTP.deleteMany({ email });
    await OTP.create({ email, otp, expiresAt });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Your Admin Dashboard OTP",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
          <h2 style="color: #8b5cf6; text-align: center;">Admin Dashboard Access</h2>
          <p>Your one-time password (OTP) to access the admin dashboard is:</p>
          <div style="background-color: #f3f4f6; padding: 20px; text-align: center; border-radius: 8px; margin: 20px 0;">
            <span style="font-size: 32px; font-weight: bold; letter-spacing: 5px; color: #1f2937;">${otp}</span>
          </div>
          <p style="color: #6b7280; font-size: 14px;">This OTP will expire in 5 minutes. If you did not request this, please ignore this email.</p>
        </div>
      `
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending OTP email:", error);
        return res.status(500).json({ error: "Failed to send OTP email" });
      }
      res.json({ message: "OTP sent successfully" });
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/verify-otp", async (req, res) => {
  const { email, otp } = req.body;
  try {
    const record = await OTP.findOne({ email, otp });
    if (!record) {
      return res.status(400).json({ error: "Invalid or expired OTP" });
    }

    if (new Date() > record.expiresAt) {
      return res.status(400).json({ error: "OTP has expired" });
    }

    await OTP.deleteOne({ _id: record._id });
    
    // Return the secret token used for verification
    res.json({ token: process.env.SECRET, message: "OTP verified successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Projects CRUD
router.get("/projects", verifyToken, async (req, res) => {
  try {
    const projects = await Work.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/projects", verifyToken, async (req, res) => {
  try {
    const project = new Work(req.body);
    await project.save();
    res.status(201).json(project);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.put("/projects/:id", verifyToken, async (req, res) => {
  try {
    const project = await Work.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(project);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete("/projects/:id", verifyToken, async (req, res) => {
  try {
    await Work.findByIdAndDelete(req.params.id);
    res.json({ message: "Project deleted" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Blogs CRUD
router.get("/blogs", verifyToken, async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ publishDate: -1 });
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/blogs/:slug", async (req, res) => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug });
    if (!blog) return res.status(404).json({ message: "Blog not found" });
    res.json(blog);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/blogs", verifyToken, async (req, res) => {
  try {
    const blog = new Blog(req.body);
    await blog.save();
    res.status(201).json(blog);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.put("/blogs/:id", verifyToken, async (req, res) => {
  try {
    const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(blog);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete("/blogs/:id", verifyToken, async (req, res) => {
  try {
    await Blog.findByIdAndDelete(req.params.id);
    res.json({ message: "Blog deleted" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Experience CRUD
router.get("/experience", verifyToken, async (req, res) => {
  try {
    const experiences = await Experience.find().sort({ createdAt: -1 });
    res.json(experiences);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/experience", verifyToken, async (req, res) => {
  try {
    const experience = new Experience(req.body);
    await experience.save();
    res.status(201).json(experience);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.put("/experience/:id", verifyToken, async (req, res) => {
  try {
    const experience = await Experience.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(experience);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete("/experience/:id", verifyToken, async (req, res) => {
  try {
    await Experience.findByIdAndDelete(req.params.id);
    res.json({ message: "Experience deleted" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;

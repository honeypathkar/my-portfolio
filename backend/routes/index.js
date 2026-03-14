import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import Work from "../models/work-model.js";
import Blog from "../models/blog-model.js";
import Experience from "../models/experience-model.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    let page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 6;
    let skip = (page - 1) * limit;

    const works = await Work.find({ isVisible: { $ne: false } }).sort({ _id: -1 }).skip(skip).limit(limit);

    const totalItems = await Work.countDocuments({ isVisible: { $ne: false } });
    const totalPages = Math.ceil(totalItems / limit);

    res.status(200).json({
      status: true,
      currentPage: page,
      totalItems,
      totalPages,
      works,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: false, error: "Failed to fetch works" });
  }
});

router.get("/projects/:slug", async (req, res) => {
  try {
    const project = await Work.findOne({ slug: req.params.slug, isVisible: { $ne: false } });
    if (!project) {
      // Fallback: try finding by slugified name if direct slug match fails
      const allWorks = await Work.find({ isVisible: { $ne: false } });
      const slugify = (text) =>
        text
          .toString()
          .toLowerCase()
          .trim()
          .replace(/\s+/g, '-')
          .replace(/[^\w-]+/g, '')
          .replace(/--+/g, '-');
      
      const found = allWorks.find(w => slugify(w.name) === req.params.slug);
      if (found) return res.json(found);
      
      return res.status(404).json({ message: "Project not found" });
    }
    res.json(project);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Public Blogs
router.get("/blogs", async (req, res) => {
  try {
    const blogs = await Blog.find({ isVisible: { $ne: false } }).sort({ publishDate: -1 });
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/blogs/:slug", async (req, res) => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug, isVisible: { $ne: false } });
    if (!blog) return res.status(404).json({ message: "Blog not found" });
    res.json(blog);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Public Experience
router.get("/experience", async (req, res) => {
  try {
    const experiences = await Experience.find({ isVisible: { $ne: false } }).sort({ createdAt: -1 });
    res.json(experiences);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;


import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    coverImage: String,
    shortDescription: String,
    content: String,
    tags: [String],
    publishDate: { type: Date, default: Date.now },
    isVisible: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Blog = mongoose.model("Blog", blogSchema);
export default Blog;

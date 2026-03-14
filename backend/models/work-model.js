import mongoose from "mongoose";

const workSchema = new mongoose.Schema(
  {
    imageUrl: String,
    source: String,
    url: String,
    name: String,
    slug: { type: String, unique: true },
    description: String,
    longDescription: String,
    tools: [String],
    githubUrl: String,
    liveUrl: String,
    screenshots: [String],
    featured: { type: Boolean, default: false },
    tagline: String,
    challenges: String,
    features: [String],
    isVisible: { type: Boolean, default: true },
    cloudinary_id: String,
  },
  { timestamps: true }
);

const Work = mongoose.model("Work", workSchema);

export default Work;

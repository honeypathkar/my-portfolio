import mongoose from "mongoose";

const workSchema = new mongoose.Schema(
  {
    imageUrl: String,
    source: String,
    url: String,
    name: String,
    description: String,
    tools: [String],
    cloudinary_id: String,
  },
  { timestamps: true }
);

const Work = mongoose.model("Work", workSchema);

export default Work;

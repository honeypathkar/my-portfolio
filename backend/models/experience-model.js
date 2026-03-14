
import mongoose from "mongoose";

const experienceSchema = new mongoose.Schema(
  {
    companyName: { type: String, required: true },
    companyLogo: String,
    role: { type: String, required: true },
    duration: String,
    location: String,
    shortDescription: String,
    longDescription: String,
    technologiesUsed: [String],
    isVisible: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Experience = mongoose.model("Experience", experienceSchema);
export default Experience;

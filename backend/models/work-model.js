const mongoose = require("mongoose");
require("dotenv").config();

const mongoURI = process.env.MONGO_URI;

mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err.errmsg));

const workSchema = new mongoose.Schema({
  imageUrl: String, // Store Cloudinary URL
  source: String,
  url: String,
  name: String,
  description: String,
  tools: [String],
  cloudinary_id: String, // Store Cloudinary Image ID
});

module.exports = mongoose.model("Work", workSchema);

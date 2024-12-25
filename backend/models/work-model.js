const mongoose = require("mongoose");
require("dotenv").config();

const mongoURI = process.env.MONGO_URI;

mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err.errmsg));

const workSchema = new mongoose.Schema({
  image: String, // Store image as Base64 string
  contentType: String, // Store the MIME type of the image
  source: String,
  url: String,
  name: String,
  description: String,
  tools: [String],
});

module.exports = mongoose.model("Work", workSchema);

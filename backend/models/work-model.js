const mongoose = require("mongoose");

const mongoURI =
  "mongodb+srv://Honey810:Honey83070@cluster0.vonyu59.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
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

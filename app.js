const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const Work = require("./models/work-model");
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Routes
app.get("/api/works", async (req, res) => {
  try {
    const works = await Work.find();
    const worksWithImage = works.map((work) => ({
      ...work.toObject(),
      image: `data:${work.contentType};base64,${work.image}`,
    }));
    res.status(200).json(worksWithImage);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch works" });
  }
});
// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

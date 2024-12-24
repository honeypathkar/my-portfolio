const express = require("express");
const Work = require("../models/work-model");

const router = express.Router();

// Fetch all works
router.get("/", async (req, res) => {
  try {
    const works = await Work.find();

    // Map the works to include the data URI for the image
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

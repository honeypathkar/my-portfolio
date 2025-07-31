import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import Work from "../models/work-model.js";

const router = express.Router();

router.get("/", verifyToken, async (req, res) => {
  try {
    let page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 6;
    let skip = (page - 1) * limit;

    const works = await Work.find().sort({ _id: -1 }).skip(skip).limit(limit);

    const totalItems = await Work.countDocuments();
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

export default router;

import express from "express";
import { upload } from "../middleware/upload.js";
import { verifyToken, isAdmin } from "../middleware/verifyToken.js";
import {
  getCarousel,
  getSlide,
  createSlide,
  updateSlide,
  deleteSlide
} from "../controllers/carouselController.js";

const router = express.Router();

router.post("/", upload.single("image"), verifyToken, isAdmin, createSlide);
router.put("/:id", upload.single("image"), verifyToken, isAdmin, updateSlide);
router.get("/", getCarousel);
router.get("/:id", getSlide);
router.delete("/:id", verifyToken, isAdmin, deleteSlide);

export default router;

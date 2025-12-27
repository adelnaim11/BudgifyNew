import express from "express";
import {
  getCarousel,
  getSlide,
  createSlide,
  updateSlide,
  deleteSlide
} from "../controllers/carouselController.js";

const router = express.Router();

// CRUD routes
router.get("/", getCarousel);
router.get("/:id", getSlide);
router.post("/", createSlide);
router.put("/:id", updateSlide);
router.delete("/:id", deleteSlide);

export default router;

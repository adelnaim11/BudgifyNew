import express from "express";
import {
  getFeatures,
  getFeature,
  createFeature,
  updateFeature,
  deleteFeature,
} from "../controllers/featuresController.js";

const router = express.Router();

router.get("/", getFeatures);
router.get("/:id", getFeature);
router.post("/", createFeature);
router.put("/:id", updateFeature);
router.delete("/:id", deleteFeature);

export default router; 

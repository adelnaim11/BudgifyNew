import express from "express";
import {
  getFeatures,
  getFeature,
  createFeature,
  updateFeature,
  deleteFeature,
} from "../controllers/featuresController.js";
import { isAdmin, verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/", getFeatures);
router.get("/:id", getFeature);
router.post("/", verifyToken, isAdmin, createFeature);
router.put("/:id", verifyToken, isAdmin, updateFeature);
router.delete("/:id", verifyToken, isAdmin, deleteFeature);

export default router; 

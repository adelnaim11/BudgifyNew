import express from "express";
import { getAbout, updateAbout } from "../controllers/aboutController.js";

const router = express.Router();

router.get("/", getAbout);           // GET about content
router.put("/", updateAbout);     // UPDATE about content

export default router;

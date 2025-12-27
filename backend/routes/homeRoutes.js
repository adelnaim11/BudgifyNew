import express from "express";
import { getHome, updateHome } from "../controllers/homeController.js";

const router = express.Router();

router.get("/", getHome);
router.put("/", updateHome);

export default router;

import express from "express";
import { getHome, updateHome } from "../controllers/homeController.js";
import { verifyToken ,isAdmin } from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/", getHome);
router.put("/", verifyToken, isAdmin, updateHome);

export default router;

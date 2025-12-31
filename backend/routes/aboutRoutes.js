import express from "express";
import { getAbout, updateAbout } from "../controllers/aboutController.js";
import { verifyToken, isAdmin } from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/", getAbout);      
router.put("/", verifyToken, isAdmin, updateAbout); 

export default router;

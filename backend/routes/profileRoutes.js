import express from "express";
import { getProfile, updateProfile, changePassword, changeEmail } from "../controllers/profileController.js";
import { verifyToken } from "../middleware/verifyToken.js"; 

const router = express.Router();

router.get("/", verifyToken, getProfile);
router.put("/", verifyToken, updateProfile);
router.put("/password", verifyToken, changePassword);
router.put("/email",verifyToken,changeEmail);

export default router;

import express from "express";
import {getStats,getStat,createStat,updateStat,deleteStat} from "../controllers/statsController.js";
import { isAdmin, verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/", getStats);
router.get("/:id", getStat);
router.post("/",verifyToken,isAdmin ,createStat);
router.put("/:id", verifyToken, isAdmin, updateStat);
router.delete("/:id", verifyToken, isAdmin, deleteStat);

export default router;

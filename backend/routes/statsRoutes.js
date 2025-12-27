import express from "express";
import {getStats,getStat,createStat,updateStat,deleteStat} from "../controllers/statsController.js";

const router = express.Router();

router.get("/", getStats);
router.get("/:id", getStat);
router.post("/", createStat);
router.put("/:id", updateStat);
router.delete("/:id", deleteStat);

export default router;

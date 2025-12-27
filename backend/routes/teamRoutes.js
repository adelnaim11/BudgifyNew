import express from "express";
import {getteam} from "../controllers/teamController.js";

const router = express.Router();

router.get("/", getteam);

export default router;

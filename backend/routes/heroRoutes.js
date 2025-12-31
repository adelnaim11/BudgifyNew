import express from "express";
import { gethero ,updatehero} from "../controllers/heroController.js";
import { isAdmin, verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/", gethero);
router.put("/", verifyToken, isAdmin, updatehero);

export default router;

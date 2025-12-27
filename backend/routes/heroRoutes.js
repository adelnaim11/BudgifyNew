import express from "express";
import { gethero ,updatehero} from "../controllers/heroController.js";

const router = express.Router();

router.get("/", gethero);
router.put("/", updatehero);

export default router;

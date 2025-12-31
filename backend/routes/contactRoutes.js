import express from "express";
import { sendMessage , updateContact , getContact , getSupportMessages ,deleteSupportMessages} from "../controllers/contactController.js";
import { verifyToken, isAdmin } from "../middleware/verifyToken.js";
const router = express.Router();

router.post("/send", sendMessage);
router.put("/:id", verifyToken, isAdmin, updateContact);
router.get("/", getContact);
router.get("/getmessages", verifyToken, isAdmin, getSupportMessages);
router.delete('/messages/:id', verifyToken, isAdmin, deleteSupportMessages);

export default router;

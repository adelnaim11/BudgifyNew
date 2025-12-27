import express from "express";
import { sendMessage , updateContact , getContact , getSupportMessages ,deleteSupportMessages} from "../controllers/contactController.js";

const router = express.Router();

router.post("/send", sendMessage);
router.put("/:id", updateContact);
router.get("/", getContact);
router.get("/getmessages",getSupportMessages);
router.delete('/messages/:id',deleteSupportMessages);

export default router;

import express from "express";
import { getTransactions, addTransaction, removeTransaction } from "../controllers/transactionController.js";

const router = express.Router();

router.get("/:userId", getTransactions);
router.post("/", addTransaction);
router.delete("/:id", removeTransaction);

export default router;

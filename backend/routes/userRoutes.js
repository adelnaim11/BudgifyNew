import express from "express";
import { isAdmin, verifyToken } from "../middleware/verifyToken.js";
import {
  getAllUsers,
  updateUser,
  deleteUser,
  toggleBanUser,
} from "../controllers/userController.js";

const router = express.Router();

router.get("/",verifyToken,isAdmin, getAllUsers);       
router.put("/:id", verifyToken, isAdmin, updateUser);       
router.delete("/:id", verifyToken, isAdmin, deleteUser);     
router.put("/:id/ban", verifyToken, isAdmin, toggleBanUser);

export default router;

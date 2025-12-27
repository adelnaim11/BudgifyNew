import express from "express";
import {
  getAllUsers,
  updateUser,
  deleteUser,
  toggleBanUser,
} from "../controllers/userController.js";

const router = express.Router();

router.get("/", getAllUsers);          // GET all users
router.put("/:id", updateUser);        // Edit username or password
router.delete("/:id", deleteUser);     // Ban/Delete user
router.put("/:id/ban", toggleBanUser);

export default router;

import express from "express";
import { signup, login, logout } from "../controllers/authController.js";
import { verifyToken, isAdmin } from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/me", verifyToken, (req, res) => {
  res.json({
    success: true,
    user: req.user,
  });
});


router.get("/admin/dashboard", verifyToken, isAdmin, (req, res) => {
  res.json({ success: true, message: "Welcome Admin!" });
});

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
export default router;

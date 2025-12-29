import express from "express";
import { signup, login, logout } from "../controllers/authController.js";
import { verifyToken } from "../middleware/verifyToken.js";

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

function isAdmin(req, res, next) {
  if (req.user.role !== "admin") {
    return res.status(403).json({ success: false, message: "Admins only" });
  }
  next();
}

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
export default router;

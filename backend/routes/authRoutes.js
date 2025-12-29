import express from "express";
import { signup, login ,logout} from "../controllers/authController.js";
import jwt from "jsonwebtoken";



const router = express.Router();

router.get("/admin/dashboard", verifyToken, isAdmin, (req, res) => {
  res.json({ success: true, message: "Welcome Admin!", user: req.user });
});


function isAdmin(req, res, next) {
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({ success: false, message: "Access denied. Admins only." });
  }
  next();
}



router.get("/me", verifyToken, (req, res) => {
  res.json({
    success: true,
    user: {
      id: req.user.id,     
      full_name: req.user.full_name,
      email: req.user.email,
      role: req.user.role,
    },
  });
});

function verifyToken(req, res, next) {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ success: false, message: "No token found" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    console.error("JWT verification failed:", err);
    res.status(403).json({ success: false, message: "Invalid or expired token" });
  }
}

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);




export default router;

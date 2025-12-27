import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import transactionRoutes from "./routes/transactionsRoutes.js";
import budgetRoutes from "./routes/budgetRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import homeRoutes from "./routes/homeRoutes.js";
import featuresRoutes from "./routes/featuresRoutes.js";
import statsRoutes from "./routes/statsRoutes.js";
import carouselRoutes from "./routes/carouselRoutes.js";
import aboutRoutes from "./routes/aboutRoutes.js";
import teamRoutes from "./routes/teamRoutes.js";
import hero from "./routes/heroRoutes.js";
import db from "../db.js";

dotenv.config();
const app = express();

app.use(cors({
  origin: process.env.WEBSITE_URL,
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static("uploads"));
app.use("/api/auth", authRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/budget", budgetRoutes);
app.use("/api/users", userRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/home", homeRoutes);
app.use("/api/features", featuresRoutes);
app.use("/api/getstats", statsRoutes);
app.use("/api/about", aboutRoutes);
app.use("/api/carousel", carouselRoutes);
app.use("/api/team",teamRoutes);
app.use("/api/hero", hero);
app.get("/", (req, res) => res.send("Backend running!"));

app.get('/api/test', async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM stats");
    if (!rows.length) return res.status(404).json({ message: "No home content found" });
    res.json({ success: true, rows });
  } catch (err) {
    console.error('Route error:', err);  // THIS SHOWS THE REAL REASON
    res.status(500).json({ success: false, message: err.message });
  }
});

const PORT = process.env.Server_PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

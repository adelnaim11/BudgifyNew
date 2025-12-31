
import db from "../db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


export const signup = async (req, res) => {
  const { fullname, username, email, password } = req.body;

  if (!fullname || !username || !email || !password) {
    return res.status(400).json({
      success: false,
      message: "All fields are required"
    });
  }

  try {
    const [emailExists] = await db.execute(
      "SELECT user_id FROM users WHERE email = ?",
      [email]
    );
    if (emailExists.length > 0) {
      return res.status(400).json({ success: false, message: "Email already exists" });
    }
    const [usernameExists] = await db.execute(
      "SELECT user_id FROM users WHERE username = ?",
      [username]
    );
    if (usernameExists.length > 0) {
      return res.status(400).json({ success: false, message: "Username already exists" });
    }

    const hashed = await bcrypt.hash(password, 10);

    const [result] = await db.execute(
      `INSERT INTO users (full_name, username, email, password_hash)
       VALUES (?, ?, ?, ?)`,
      [fullname, username, email, hashed]
    );

    res.status(201).json({
      success: true,
      message: "User created successfully",
      userId: result.insertId
    });

  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const logout = (req, res) => {
  res.json({ success: true, message: "Logged out successfully" });
};



export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const [rows] = await db.execute(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    if (!rows.length) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const user = rows[0];

    const valid = await bcrypt.compare(password, user.password_hash);
    if (!valid) {
      return res.status(401).json({ success: false, message: "Invalid password" });
    }

    if (user.status === "banned") {
      return res.status(403).json({
        success: false,
        message: "Account is banned",
      });
    }

    const token = jwt.sign(
      {
        id: user.user_id,
        full_name: user.full_name,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    res.json({
      success: true,
      token, 
      user: {
        id: user.user_id,
        full_name: user.full_name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

import db from "../db.js";
import bcrypt from "bcryptjs";

export const getProfile = async (req, res) => {
  try {
    const [rows] = await db.execute(
      "SELECT user_id, full_name, username, email FROM users WHERE user_id = ?",
      [req.user.id]
    );
    if (rows.length === 0) return res.status(404).json({ success: false, message: "User not found" });

    res.json({ success: true, user: rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const updateProfile = async (req, res) => {
  const { full_name, username } = req.body;
  try {
    await db.execute(
      "UPDATE users SET full_name = ?, username = ? WHERE user_id = ?",
      [full_name, username, req.user.id]
    );

    res.json({ success: true, message: "Profile updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const changePassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  try {
    const [rows] = await db.execute(
      "SELECT password_hash FROM users WHERE user_id = ?",
      [req.user.id]
    );

    const user = rows[0];

    const valid = await bcrypt.compare(currentPassword, user.password_hash);
    if (!valid) return res.status(401).json({ success: false, message: "Current password is incorrect" });

    const hashed = await bcrypt.hash(newPassword, 10);
    await db.execute("UPDATE users SET password_hash = ? WHERE user_id = ?", [hashed, req.user.id]);

    res.json({ success: true, message: "Password changed successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};


export const changeEmail = async (req, res) => {
  const { currentEmail} = req.body;
  try {
    const [rows] = await db.execute(
      "SELECT email FROM users WHERE user_id = ?",
      [req.user.id]
    );

    const user = rows[0];

    await db.execute("UPDATE users SET email = ? WHERE user_id = ?", [currentEmail, req.user.id]);

    res.json({ success: true, message: "Email changed successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
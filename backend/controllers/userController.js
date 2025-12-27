import db from "../db.js";
import bcrypt from "bcryptjs";

// 🧾 Get all users
export const getAllUsers = async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT user_id, full_name, username, email, role, created_at , status FROM users"
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch users" });
  }
};

// 🔍 Get single user by ID
export const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await db.query(
      "SELECT user_id, full_name, username, email, role, created_at FROM users WHERE user_id = ?",
      [id]
    );
    if (rows.length === 0) return res.status(404).json({ message: "User not found" });
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch user" });
  }
};

// ✏️ Update user (name, username, email, password, or role)
export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { full_name, username, email, password, role } = req.body;

  try {
    const [exists] = await db.query("SELECT * FROM users WHERE user_id = ?", [id]);
    if (exists.length === 0) return res.status(404).json({ message: "User not found" });

    let query = "UPDATE users SET full_name = ?, username = ?, email = ?, role = ? WHERE user_id = ?";
    let params = [full_name, username, email, role || "user", id];

    if (password) {
      const hash = await bcrypt.hash(password, 10);
      query = "UPDATE users SET full_name = ?, username = ?, email = ?, password_hash = ?, role = ? WHERE user_id = ?";
      params = [full_name, username, email, hash, role || "user", id];
    }

    await db.query(query, params);
    res.json({ message: "User updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to update user" });
  }
};

// 🗑️ Delete user (admin or cleanup)
export const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const [exists] = await db.query("SELECT * FROM users WHERE user_id = ?", [id]);
    if (exists.length === 0) return res.status(404).json({ message: "User not found" });

    await db.query("DELETE FROM users WHERE user_id = ?", [id]);
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to delete user" });
  }
};


// Toggle ban/unban user
export const toggleBanUser = async (req, res) => {
  const { id } = req.params;

  try {
    const [user] = await db.query("SELECT status FROM users WHERE user_id = ?", [id]);
    if (user.length === 0) return res.status(404).json({ message: "User not found" });

    const newStatus = user[0].status === "active" ? "banned" : "active";
    await db.query("UPDATE users SET status = ? WHERE user_id = ?", [newStatus, id]);

    res.json({ message: `User ${newStatus === "banned" ? "banned" : "unbanned"} successfully` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to toggle ban" });
  }
};

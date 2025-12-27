import db from "../db.js";

export const getTransactions = async (req, res) => {
    const { userId } = req.params;
    try {
        const [rows] = await db.execute("SELECT * FROM transactions WHERE user_id = ? ORDER BY date DESC", [userId]);
        res.json({ success: true, transactions: rows });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

export const addTransaction = async (req, res) => {
  const { userId, date, description, amount, category } = req.body;
  if (!date || !description || amount == null)
    return res.status(400).json({ success: false, message: "All fields required" });

  try {
    const [result] = await db.execute(
      "INSERT INTO transactions (user_id, date, description, amount, category) VALUES (?, ?, ?, ?, ?)",
      [userId, date, description, amount, category || "Other"]
    );
    const newTransaction = { id: result.insertId, user_id: userId, date, description, amount, category: category || "Other" };

    res.status(201).json({ success: true, transaction: newTransaction });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const removeTransaction = async (req, res) => {
    const { id } = req.params;
    try {
        await db.execute("DELETE FROM transactions WHERE id = ?", [id]);
        res.json({ success: true, message: "Transaction removed" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

import db from "../db.js";

export const getBudget = async (req, res) => {
    const { userId, monthYear } = req.params;
    try {
        const [rows] = await db.execute("SELECT * FROM budgets WHERE user_id = ? AND month_year = ?", [userId, monthYear]);
        res.json({ success: true, budget: rows[0] || null });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

export const setBudget = async (req, res) => {
    const { userId, monthYear, amount } = req.body;
    try {
        await db.execute(
            "INSERT INTO budgets (user_id, month_year, amount) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE amount = ?",
            [userId, monthYear, amount, amount]
        );
        res.json({ success: true, message: "Budget saved" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

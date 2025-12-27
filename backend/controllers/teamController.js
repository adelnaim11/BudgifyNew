import db from "../db.js";
export const getteam = async (req, res) => {
  try {
    const [rows] = await db.execute("SELECT * FROM team");
    res.json({rows});
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};


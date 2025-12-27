import db from "../db.js";

export const gethero = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM hero");
    if (rows.length === 0) return res.status(404).json({ message: "No hero data found" });
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch hero" });
  }
};


export const updatehero = async (req, res) => {
  const { title, subtitle, ctaPrimary,ctaSecondary } = req.body;
  try {
    const q=  `UPDATE hero SET title = ? , subtitle = ? , ctaPrimary = ? , ctaSecondary = ? WHERE id = 1`;
    const [result] = await db.query(q, [title, subtitle, ctaPrimary ,ctaSecondary ]);
    
    res.json({ success: true, message: "Hero section updated!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Failed to update hero section" });
  }
};

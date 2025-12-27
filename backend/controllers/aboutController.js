import db from "../db.js";

// GET about content
export const getAbout = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM about_page LIMIT 1");
    if (rows.length === 0) return res.status(404).json({ message: "About content not found" });
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch about content" });
  }
};


export const updateAbout = async (req, res) => {
  try {
    const { hero_title, hero_description, mission_title, mission_text, cta_title, cta_text, cta_link } = req.body;

    if (!hero_title || !hero_description || !mission_title || !mission_text || !cta_title || !cta_text || !cta_link)
      return res.status(400).json({ success: false, message: "All fields are required." });

    const [result] = await db.execute(
      `UPDATE about_page
       SET hero_title=?, hero_description=?, mission_title=?, mission_text=?, cta_title=?, cta_text=?, cta_link=?
       LIMIT 1`,
      [hero_title, hero_description, mission_title, mission_text, cta_title, cta_text, cta_link]
    );

    if (result.affectedRows === 0)
      return res.status(404).json({ success: false, message: "No about page data found to update." });

    res.json({ success: true, message: "About page updated successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};

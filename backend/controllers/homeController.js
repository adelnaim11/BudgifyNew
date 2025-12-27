import db from "../db.js";

export const getHome = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM home_content");
    if (!rows.length) return res.status(404).json({ message: "No home content found" });

    const contentMap = {};
    rows.forEach((row) => {
      contentMap[row.section] = JSON.parse(row.content);
    });

    res.json({
      hero: contentMap.hero,
      features: contentMap.features,
      stats: contentMap.stats,
      cta: contentMap.cta,
    });
  } catch (err) {
    console.error("Error fetching home content:", err);
    res.status(500).json({ message: "Failed to fetch home content" });
  }
};


export const updateHome = async (req, res) => {
  const {
    hero,
    features,
    stats,
    cta
  } = req.body;

  try {
    await db.query(
      `UPDATE home_content SET 
        hero_title = ?, 
        hero_subtitle = ?, 
        hero_cta_primary = ?, 
        hero_cta_secondary = ?, 
        features = ?, 
        stats = ?, 
        cta_title = ?, 
        cta_subtitle = ?, 
        cta_button = ? 
      WHERE id = 1`,
      [
        hero.title,
        hero.subtitle,
        hero.ctaPrimary,
        hero.ctaSecondary,
        JSON.stringify(features),
        JSON.stringify(stats),
        cta.title,
        cta.subtitle,
        cta.buttonText
      ]
    );

    res.json({ message: "Home content updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to update home content" });
  }
};

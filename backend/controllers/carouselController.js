import db from "../db.js";

// Get all slides
export const getCarousel = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM carousel ORDER BY id DESC");
    res.json({ slides: rows });
  } catch (err) {
    console.error("Error fetching carousel:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Get a single slide
export const getSlide = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await db.query("SELECT * FROM carousel WHERE id = ?", [id]);
    if (!rows.length)
      return res.status(404).json({ success: false, message: "Slide not found" });

    res.json({ success: true, slide: rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Create new slide
export const createSlide = async (req, res) => {
  const { text, image } = req.body;
  if (!text || !image)
    return res.status(400).json({ success: false, message: "Missing fields" });

  try {
    const [result] = await db.query(
      "INSERT INTO carousel (text, image) VALUES (?, ?)",
      [text, image]
    );
    res.json({
      success: true,
      message: "Slide created",
      slide: { id: result.insertId, text, image },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Update slide
export const updateSlide = async (req, res) => {
  const { id } = req.params;
  const { text, image } = req.body;
  try {
    const [result] = await db.query(
      "UPDATE carousel SET text = ?, image = ? WHERE id = ?",
      [text, image, id]
    );
    if (result.affectedRows === 0)
      return res.status(404).json({ success: false, message: "Slide not found" });

    res.json({ success: true, message: "Slide updated" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Delete slide
export const deleteSlide = async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await db.query("DELETE FROM carousel WHERE id = ?", [id]);
    if (result.affectedRows === 0)
      return res.status(404).json({ success: false, message: "Slide not found" });

    res.json({ success: true, message: "Slide deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

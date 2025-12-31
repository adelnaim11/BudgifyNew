import db from "../db.js";


export const getCarousel = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM carousel ORDER BY id DESC");
    res.json({ slides: rows });
  } catch (err) {
    console.error("Error fetching carousel:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};


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


export const createSlide = async (req, res) => {
  const { text } = req.body;
  const image = req.file ? `/uploads/${req.file.filename}` : null;

  if (!text || !image)
    return res.status(400).json({ success: false, message: "Missing fields" });

  try {
    const [result] = await db.query(
      "INSERT INTO carousel (text, image) VALUES (?, ?)",
      [text, image]
    );

    res.json({
      success: true,
      slide: { id: result.insertId, text, image },
    });
  } catch (err) {
    res.status(500).json({ success: false });
  }
};



export const updateSlide = async (req, res) => {
  const { id } = req.params;
  const { text } = req.body;
  const image = req.file
    ? `/uploads/${req.file.filename}`
    : req.body.image;

  try {
    await db.query(
      "UPDATE carousel SET text = ?, image = ? WHERE id = ?",
      [text, image, id]
    );

    res.json({ success: true });
  } catch {
    res.status(500).json({ success: false });
  }
};



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

import db from "../db.js";

export const getFeatures = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM features");
    res.json({rows});
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};


export const getFeature = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await db.query("SELECT * FROM features WHERE id = ?", [id]);

    if (rows.length === 0)
      return res.status(404).json({ success: false, message: "Feature not found" });

    res.json({ success: true, feature: rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};


export const createFeature = async (req, res) => {
  const { title, desc, icon } = req.body;

  if (!title || !desc)
    return res.json({ success: false, message: "Missing fields" });

  try {
    const q = "INSERT INTO features (title, description, icon) VALUES (?, ?, ?)";
    await db.query(q, [title, desc, icon || null]);

    res.json({ success: true, message: "Feature added successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};


export const updateFeature = async (req, res) => {
  const { id } = req.params;
  const { title, description, icon } = req.body;

  try {
    const q = "UPDATE features SET title=?, description=?, icon=? WHERE id=?";

    const [result] = await db.query(q, [title, description, icon || null, id]);

    if (result.affectedRows === 0)
      return res.status(404).json({ success: false, message: "Feature not found" });

    res.json({ success: true, message: "Feature updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};


export const deleteFeature = async (req, res) => {
  const { id } = req.params;

  try {
    const q = "DELETE FROM features WHERE id=?";
    const [result] = await db.query(q, [id]);

    if (result.affectedRows === 0)
      return res.status(404).json({ success: false, message: "Feature not found" });

    res.json({ success: true, message: "Feature deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

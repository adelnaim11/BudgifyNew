import db from "../db.js";
export const getStats = async (req, res) => {
  try {
    const [rows] = await db.execute("SELECT * FROM stats");
    res.json({ rows});
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};


export const getStat = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await db.execute("SELECT * FROM stats WHERE id=?", [id]);
    if (rows.length === 0)
      return res.status(404).json({ success: false, message: "Stat not found" });

    res.json({ success: true, stat: rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};


export const createStat = async (req, res) => {
  const { label, value } = req.body;
  if (!label || !value)
    return res.json({ success: false, message: "Missing fields" });

  try {
    await db.execute("INSERT INTO stats (label, value) VALUES (?, ?)", [label, value]);
    res.json({ success: true, message: "Stat added successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};


export const updateStat = async (req, res) => {
  const { id } = req.params;
  const { label, value } = req.body;

  try {
    const [result] = await db.execute("UPDATE stats SET label=?, value=? WHERE id=?", [label, value, id]);
    if (result.affectedRows === 0)
      return res.status(404).json({ success: false, message: "Stat not found" });

    res.json({ success: true, message: "Stat updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};


export const deleteStat = async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await db.execute("DELETE FROM stats WHERE id=?", [id]);
    if (result.affectedRows === 0)
      return res.status(404).json({ success: false, message: "Stat not found" });

    res.json({ success: true, message: "Stat deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
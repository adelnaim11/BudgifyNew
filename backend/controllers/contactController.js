import db from "../db.js";

export const sendMessage = async (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ success: false, message: "All fields are required" });
    }

    try {
        await db.execute(
            "INSERT INTO contact_messages (name, email, message) VALUES (?, ?, ?)",
            [name, email, message]
        );
        res.status(201).json({ success: true, message: "Message sent successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

export const updateContact = async (req, res) => {
  const { id } = req.params;
  const { title, email, phone, address } = req.body;

  try {
    const [existing] = await db.query("SELECT * FROM contact_info WHERE id = ?", [id]);
    if (existing.length === 0) {
      return res.status(404).json({ message: "Contact not found" });
    }
    await db.query(
      "UPDATE contact_info SET title = ?, email = ?, phone = ?, address = ? WHERE id = ?",
      [title, email, phone, address, id]
    );

    res.json({ message: "Contact updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to update contact" });
  }
};


export const getContact = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM contact_info LIMIT 1");
    if (rows.length === 0) return res.status(404).json({ message: "No contact found" });
    res.json(rows[0]); 
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch contact" });
  }
};


export const getSupportMessages = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM contact_messages ORDER BY created_at DESC");
    if (rows.length === 0) return res.status(204).json({ message: "No contact found" });
    res.json(rows);
    console.log(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch Support Messages" });
  }
};


export const deleteSupportMessages = async (req, res) => {
  const messageId = req.params.id;
  const sql = 'DELETE FROM contact_messages WHERE id = ?';

  db.query(sql, [messageId], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Failed to delete message from database.' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Message not found.' });
    }
    // Success: send a 200 OK response
    res.status(200).json({ message: 'Message deleted successfully.' }); 
  });
};

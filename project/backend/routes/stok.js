import express from "express";
import db from "../db.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// ✅ Get semua stok
router.get("/", verifyToken, async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM stok ORDER BY nama_barang ASC");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Get stok by ID
router.get("/:id", verifyToken, async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM stok WHERE id = ?", [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ error: "Stok tidak ditemukan" });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Tambah stok
router.post("/", verifyToken, async (req, res) => {
  try {
    const data = req.body;
    await db.query(
      `INSERT INTO stok 
       (id, nama_barang, asal_barang, kategori, expired, stok, barang_masuk, tanggal_masuk, barang_keluar, tanggal_keluar, harga)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        data.id,
        data.nama_barang,
        data.asal_barang,
        data.kategori,
        data.expired,
        data.stok,
        data.barang_masuk,
        data.tanggal_masuk,
        data.barang_keluar,
        data.tanggal_keluar,
        data.harga,
      ]
    );
    res.json({ message: "Stok berhasil ditambahkan" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Update stok
router.put("/:id", verifyToken, async (req, res) => {
  try {
    const data = req.body;
    await db.query(
      `UPDATE stok SET nama_barang=?, asal_barang=?, kategori=?, expired=?, stok=?, 
       barang_masuk=?, tanggal_masuk=?, barang_keluar=?, tanggal_keluar=?, harga=? 
       WHERE id=?`,
      [
        data.nama_barang,
        data.asal_barang,
        data.kategori,
        data.expired,
        data.stok,
        data.barang_masuk,
        data.tanggal_masuk,
        data.barang_keluar,
        data.tanggal_keluar,
        data.harga,
        req.params.id,
      ]
    );
    res.json({ message: "Stok berhasil diperbarui" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Hapus stok
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const [result] = await db.query("DELETE FROM stok WHERE id = ?", [req.params.id]);
    if (result.affectedRows === 0) return res.status(404).json({ error: "Stok tidak ditemukan" });
    res.json({ message: "Stok berhasil dihapus" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;

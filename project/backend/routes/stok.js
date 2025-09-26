import express from "express";
import db from "../db.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// ✅ Tambah stok baru
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

    // Catat ke history
    await db.query(
      `INSERT INTO edit_history (user_id, stok_id, activity) VALUES (?, ?, ?)`,
      [req.user?.id || null, data.id, `Menambahkan stok: ${data.nama_barang}`]
    );

    res.json({ message: "Stok berhasil ditambahkan" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Gagal menambah stok" });
  }
});

// ✅ Total nilai stok
router.get("/total-nilai", verifyToken, async (req, res) => {
  try {
    const [rows] = await db.query(
      `SELECT SUM((stok + IFNULL(barang_masuk,0) - IFNULL(barang_keluar,0)) * harga) AS total 
       FROM stok`
    );
    res.json({ total: rows[0].total || 0 }); // 🔥 konsisten pakai "total"
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Gagal hitung total nilai stok" });
  }
});

// ✅ Update stok + catat edit history
router.put("/:id", verifyToken, async (req, res) => {
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

  await db.query(
    `INSERT INTO edit_history (user_id, stok_id, activity) VALUES (?, ?, ?)`,
    [
      req.user?.id || null,
      req.params.id,
      `Mengedit stok: ${data.nama_barang}`,
    ]
  );

  res.json({ message: "Stok berhasil diperbarui" });
});

// ✅ Delete stok + catat history
router.delete("/:id", verifyToken, async (req, res) => {
  const stokId = req.params.id;

  await db.query("DELETE FROM stok WHERE id=?", [stokId]);

  await db.query(
    `INSERT INTO edit_history (user_id, stok_id, activity) VALUES (?, ?, ?)`,
    [req.user?.id || null, stokId, "Menghapus stok"]
  );

  res.json({ message: "Stok berhasil dihapus" });
});

// ✅ Barang Masuk
router.get("/barang-masuk", verifyToken, async (req, res) => {
  try {
    const [rows] = await db.query(
      `SELECT id, nama_barang, barang_masuk AS jumlah, tanggal_masuk 
       FROM stok 
       WHERE barang_masuk > 0 
       ORDER BY tanggal_masuk DESC`
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Gagal ambil barang masuk" });
  }
});

// ✅ Barang Keluar
router.get("/barang-keluar", verifyToken, async (req, res) => {
  try {
    const [rows] = await db.query(
      `SELECT id, nama_barang, barang_keluar AS jumlah, tanggal_keluar 
       FROM stok 
       WHERE barang_keluar > 0 
       ORDER BY tanggal_keluar DESC`
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Gagal ambil barang keluar" });
  }
});

// ✅ Barang Mau Expired (30 hari ke depan)
router.get("/barang-expired", verifyToken, async (req, res) => {
  try {
    const [rows] = await db.query(
      `SELECT id, nama_barang, expired, stok 
       FROM stok 
       WHERE expired IS NOT NULL 
         AND expired <= DATE_ADD(CURDATE(), INTERVAL 30 DAY)  -- 30 hari ke depan
         AND expired >= CURDATE()                             -- belum lewat
       ORDER BY expired ASC`
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Gagal ambil barang mau expired" });
  }
});


// ✅ Ambil semua edit history (gabung dengan nama user)
router.get("/edit-history/list", verifyToken, async (req, res) => {
  const [rows] = await db.query(
    `SELECT eh.id, eh.user_id, eh.stok_id, eh.activity, eh.edit_time, u.full_name 
     FROM edit_history eh 
     LEFT JOIN users u ON eh.user_id = u.id 
     ORDER BY eh.edit_time DESC`
  );
  res.json(rows);
});

// ✅ Get semua stok
router.get("/", verifyToken, async (req, res) => {
  const [rows] = await db.query( 
    `SELECT id, nama_barang, asal_barang, kategori, expired, stok, 
     barang_masuk, tanggal_masuk, barang_keluar, tanggal_keluar, harga,
     (stok + IFNULL(barang_masuk,0) - IFNULL(barang_keluar,0)) AS total_stok
     FROM stok`
  );
  res.json(rows);
});

// ✅ Get stok by ID
router.get("/:id", verifyToken, async (req, res) => {
  const [rows] = await db.query("SELECT * FROM stok WHERE id = ?", [req.params.id]);
  if (rows.length === 0) return res.status(404).json({ error: "Stok tidak ditemukan" });
  res.json(rows[0]);
});

export default router;

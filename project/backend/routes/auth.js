import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import db from "../db.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// ====================== REGISTER ======================
router.post("/register", async (req, res) => {
  try {
    const { full_name, email, password } = req.body;
    const hashed = await bcrypt.hash(password, 10);

    await db.query(
      "INSERT INTO users (full_name, email, password) VALUES (?, ?, ?)",
      [full_name, email, hashed]
    );

    res.json({ message: "Register success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ====================== LOGIN ======================
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);

    if (rows.length === 0) {
      return res.status(400).json({ error: "User not found" });
    }

    const user = rows[0];
    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      // Simpan history gagal login
      await db.query(
        "INSERT INTO login_history (user_id, ip_address, status) VALUES (?, ?, ?)",
        [user.id, req.ip, "FAILED"]
      );
      return res.status(400).json({ error: "Wrong password" });
    }

    // Generate token
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES || "1h",
    });

    // Simpan history sukses login
    await db.query(
      "INSERT INTO login_history (user_id, ip_address, status) VALUES (?, ?, ?)",
      [user.id, req.ip, "SUCCESS"]
    );

    res.json({
      token,
      user: {
        id: user.id,
        full_name: user.full_name,
        email: user.email,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ====================== HISTORY ALL USERS ======================
router.get("/history", verifyToken, async (req, res) => {
  try {
    const [rows] = await db.query(
      `SELECT 
         u.full_name AS username,
         lh.login_time,
         lh.ip_address,
         lh.status
       FROM login_history lh
       JOIN users u ON lh.user_id = u.id
       ORDER BY lh.login_time DESC`
    );

    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;

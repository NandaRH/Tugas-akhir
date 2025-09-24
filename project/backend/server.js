import express from "express";
import cors from "cors";
import dotenv from "dotenv"; 
import stokRoutes from "./routes/stok.js";

// Load .env paling awal
dotenv.config();

import authRoutes from "./routes/auth.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);

// Port dari .env atau default 5000
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
  console.log(`🔑 JWT_SECRET: ${process.env.JWT_SECRET ? "LOADED" : "MISSING"}`);
});

//Stok
app.use("/api/stok", stokRoutes);
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

function TambahStok() {
  const navigate = useNavigate();
  const { id } = useParams(); // cek apakah edit mode

  const [form, setForm] = useState({
    id: "",
    nama_barang: "",
    asal_barang: "",
    kategori: "",
    expired: "",
    stok: 0,
    barang_masuk: 0,
    tanggal_masuk: "",
    barang_keluar: 0,
    tanggal_keluar: "",
    harga: 0,
  });

  // Prefill kalau edit
  useEffect(() => {
    if (id) {
      const token = localStorage.getItem("token");
      fetch(`${API_URL}/api/stok/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((data) => {
          setForm({
            id: data.id || "",
            nama_barang: data.nama_barang || "",
            asal_barang: data.asal_barang || "",
            kategori: data.kategori || "",
            expired: data.expired ? data.expired.split("T")[0] : "",
            stok: data.stok || 0,
            barang_masuk: data.barang_masuk || 0,
            tanggal_masuk: data.tanggal_masuk
              ? data.tanggal_masuk.split("T")[0]
              : "",
            barang_keluar: data.barang_keluar || 0,
            tanggal_keluar: data.tanggal_keluar
              ? data.tanggal_keluar.split("T")[0]
              : "",
            harga: data.harga || 0,
          });
        });
    }
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const method = id ? "PUT" : "POST";
      const url = id ? `${API_URL}/api/stok/${id}` : `${API_URL}/api/stok`;

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (res.ok) {
        alert(id ? "Barang berhasil diupdate" : "Barang berhasil ditambahkan");
        navigate("/stok");
      } else {
        alert(data.error || "Gagal menyimpan barang");
      }
    } catch (err) {
      alert("Terjadi kesalahan saat simpan data stok");
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="fw-bold mb-3">{id ? "Edit Barang" : "Tambah Barang"}</h2>
      <form className="card p-4 shadow-sm" onSubmit={handleSubmit}>
        {[
          { name: "id", label: "ID Barang", type: "text" },
          { name: "nama_barang", label: "Nama Barang", type: "text" },
          { name: "asal_barang", label: "Asal Barang", type: "text" },
          { name: "kategori", label: "Kategori", type: "text" },
          { name: "expired", label: "Expired", type: "date" },
          { name: "stok", label: "Stok", type: "number" },
          { name: "barang_masuk", label: "Barang Masuk", type: "number" },
          { name: "tanggal_masuk", label: "Tanggal Masuk", type: "date" },
          { name: "barang_keluar", label: "Barang Keluar", type: "number" },
          { name: "tanggal_keluar", label: "Tanggal Keluar", type: "date" },
          { name: "harga", label: "Harga", type: "number" },
        ].map((field) => (
          <div className="mb-3" key={field.name}>
            <label className="form-label">{field.label}</label>
            <input
              type={field.type}
              name={field.name}
              className="form-control"
              value={form[field.name]}
              onChange={handleChange}
              required={
                [
                  "id",
                  "nama_barang",
                  "asal_barang",
                  "kategori",
                  "expired",
                  "stok",
                  "harga",
                ].includes(field.name)
              }
              disabled={field.name === "id" && id} // kalau edit, ID dikunci
            />
          </div>
        ))}
        <button type="submit" className="btn btn-success">
          {id ? "Update" : "Simpan"}
        </button>
        <button
          type="button"
          className="btn btn-secondary ms-2"
          onClick={() => navigate("/stok")}
        >
          Batal
        </button>
      </form>
    </div>
  );
}

export default TambahStok;

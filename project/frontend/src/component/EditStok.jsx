import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";

function EditStok() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nama_barang: "",
    asal_barang: "",
    kategori: "",
    expired: "",
    stok: "",
    barang_masuk: "",
    tanggal_masuk: "",
    barang_keluar: "",
    tanggal_keluar: "",
    harga: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch(`${import.meta.env.VITE_API_URL}/api/stok/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setFormData({
            nama_barang: data.nama_barang || "",
            asal_barang: data.asal_barang || "",
            kategori: data.kategori || "",
            expired: data.expired ? data.expired.split("T")[0] : "",
            stok: data.stok || "",
            barang_masuk: data.barang_masuk || "",
            tanggal_masuk: data.tanggal_masuk ? data.tanggal_masuk.split("T")[0] : "",
            barang_keluar: data.barang_keluar || "",
            tanggal_keluar: data.tanggal_keluar ? data.tanggal_keluar.split("T")[0] : "",
            harga: data.harga || "",
          });
        }
      })
      .catch((err) => console.error("Gagal ambil data stok:", err));
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/stok/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    });

    const data = await res.json();
    if (data.error) {
      alert(data.error);
    } else {
      alert("Data stok berhasil diperbarui!");
      navigate("/stok");
    }
  };

  return (
    <div className="d-flex">
      <Sidebar userName={localStorage.getItem("userName")} />

      <div className="container mt-4 flex-grow-1">
        <h2 className="fw-bold">Edit Stok Barang</h2>
        <form onSubmit={handleSubmit} className="card p-4 shadow-sm">
          <div className="mb-3">
            <label>Nama Barang</label>
            <input
              type="text"
              name="nama_barang"
              className="form-control"
              value={formData.nama_barang}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label>Asal Barang</label>
            <input
              type="text"
              name="asal_barang"
              className="form-control"
              value={formData.asal_barang}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label>Kategori</label>
            <input
              type="text"
              name="kategori"
              className="form-control"
              value={formData.kategori}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label>Expired</label>
            <input
              type="date"
              name="expired"
              className="form-control"
              value={formData.expired}
              onChange={handleChange}
            />
          </div>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label>Barang Masuk</label>
              <input
                type="number"
                name="barang_masuk"
                className="form-control"
                value={formData.barang_masuk}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-6 mb-3">
              <label>Tanggal Masuk</label>
              <input
                type="date"
                name="tanggal_masuk"
                className="form-control"
                value={formData.tanggal_masuk}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label>Barang Keluar</label>
              <input
                type="number"
                name="barang_keluar"
                className="form-control"
                value={formData.barang_keluar}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-6 mb-3">
              <label>Tanggal Keluar</label>
              <input
                type="date"
                name="tanggal_keluar"
                className="form-control"
                value={formData.tanggal_keluar}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="mb-3">
            <label>Stok</label>
            <input
              type="number"
              name="stok"
              className="form-control"
              value={formData.stok}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label>Harga (Rp)</label>
            <input
              type="number"
              name="harga"
              className="form-control"
              value={formData.harga}
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Simpan Perubahan
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditStok;

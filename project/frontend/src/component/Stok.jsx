import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "./Sidebar";

function Stok() {
  const [stokData, setStokData] = useState([]);
  const [search, setSearch] = useState("");

  // Ambil data stok
  useEffect(() => {
    fetchStok();
  }, []);

  const fetchStok = () => {
    const token = localStorage.getItem("token");
    fetch(`${import.meta.env.VITE_API_URL}/api/stok`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setStokData(Array.isArray(data) ? data : []))
      .catch((err) => console.error("Gagal ambil stok:", err));
  };

  // 🗑️ Hapus data stok
  const handleDelete = async (id) => {
    if (!window.confirm("Yakin mau hapus data ini?")) return;

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/stok/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) {
        const errData = await res.json();
        alert("Gagal hapus: " + (errData.error || res.statusText));
        return;
      }

      alert("Data berhasil dihapus ✅");
      setStokData(stokData.filter((item) => item.id !== id));
    } catch (err) {
      console.error("Error hapus:", err);
      alert("Terjadi kesalahan saat hapus data");
    }
  };

  // 🔍 Filter pencarian
  const filteredData = stokData.filter((item) => {
    const searchLower = search.toLowerCase();
    return (
      item.id?.toLowerCase().includes(searchLower) ||
      item.nama_barang?.toLowerCase().includes(searchLower) ||
      item.asal_barang?.toLowerCase().includes(searchLower) ||
      item.kategori?.toLowerCase().includes(searchLower) ||
      (item.tanggal_masuk &&
        new Date(item.tanggal_masuk)
          .toLocaleDateString("id-ID")
          .includes(searchLower)) ||
      (item.tanggal_keluar &&
        new Date(item.tanggal_keluar)
          .toLocaleDateString("id-ID")
          .includes(searchLower))
    );
  });

  return (
    <div className="d-flex">
      {/* Sidebar */}
      <Sidebar userName="admin" />

      {/* Konten Stok */}
      <div className="content flex-grow-1 p-4">
        {/* Header + Tombol */}
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2 className="fw-bold text-same">Stok Barang</h2>
          <Link to="/stok/tambah" className="btn btn-success">
            <i className="bi bi-plus-circle"></i> Tambah Barang
          </Link>
        </div>

        {/* Search */}
        <input
          type="text"
          className="form-control mb-3"
          placeholder="Cari berdasarkan ID, Nama, Asal, Kategori, Tgl Masuk, Tgl Keluar..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* Tabel Scrollable */}
        <div className="card shadow-sm">
          <div className="card-body p-0 table-responsive">
            <table className="table table-striped mb-0">
              <thead className="table-light">
                <tr>
                  <th>ID</th>
                  <th>Nama</th>
                  <th>Asal</th>
                  <th>Kategori</th>
                  <th>Expired</th>
                  <th>Stok</th>
                  <th>Barang Masuk</th>
                  <th>Tanggal Masuk</th>
                  <th>Barang Keluar</th>
                  <th>Tanggal Keluar</th>
                  <th>Harga (Rp)</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.length > 0 ? (
                  filteredData.map((item, i) => (
                    <tr key={i}>
                      <td><strong>{item.id}</strong></td>
                      <td>{item.nama_barang}</td>
                      <td>{item.asal_barang}</td>
                      <td>{item.kategori}</td>
                      <td>
                        {item.expired
                          ? new Date(item.expired).toLocaleDateString("id-ID")
                          : "-"}
                      </td>
                      <td>{item.stok}</td>
                      <td>{item.barang_masuk}</td>
                      <td>
                        {item.tanggal_masuk
                          ? new Date(item.tanggal_masuk).toLocaleDateString("id-ID")
                          : "-"}
                      </td>
                      <td>{item.barang_keluar}</td>
                      <td>
                        {item.tanggal_keluar
                          ? new Date(item.tanggal_keluar).toLocaleDateString("id-ID")
                          : "-"}
                      </td>
                      <td>{Number(item.harga).toLocaleString("id-ID")}</td>
                      <td>
                        <Link
                          to={`/stok/edit/${item.id}`}
                          className="btn btn-sm btn-primary me-2"
                        >
                          Edit
                        </Link>
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => handleDelete(item.id)}
                        >
                          Hapus
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="12" className="text-center text-muted">
                      Tidak ada data stok
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Stok;

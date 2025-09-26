import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import "./dashboard.css";

const API_URL = import.meta.env.VITE_API_URL;

function Dashboard() {
  const [barangMasuk, setBarangMasuk] = useState([]);
  const [barangKeluar, setBarangKeluar] = useState([]);
  const [barangExpired, setBarangExpired] = useState([]);
  const [history, setHistory] = useState([]);
  const [editHistory, setEditHistory] = useState([]);
  const [totalStok, setTotalStok] = useState(0);
  const [totalMasuk, setTotalMasuk] = useState(0);
  const [totalKeluar, setTotalKeluar] = useState(0);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    const name = localStorage.getItem("userName");
    const token = localStorage.getItem("token");

    if (!userId || !token) {
      window.location.href = "/";
      return;
    }
    setUserName(name || "User");

    // Barang Masuk
    fetch(`${API_URL}/api/stok/barang-masuk`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        const rows = Array.isArray(data) ? data.slice(0, 5) : [];
        setBarangMasuk(rows);
        setTotalMasuk(rows.reduce((sum, item) => sum + (item.jumlah || 0), 0));
      });

    // Barang Keluar
    fetch(`${API_URL}/api/stok/barang-keluar`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        const rows = Array.isArray(data) ? data.slice(0, 5) : [];
        setBarangKeluar(rows);
        setTotalKeluar(rows.reduce((sum, item) => sum + (item.jumlah || 0), 0));
      });
      
      // Barang Mau Expired
      fetch(`${API_URL}/api/stok/barang-expired`, {
      headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => res.json())
      .then((data) =>
       setBarangExpired(Array.isArray(data) ? data.slice(-5).reverse() : [])
      );

    // History Login
    fetch(`${API_URL}/api/auth/history`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setHistory(Array.isArray(data) ? data.slice(0, 5) : []));

    // Edit History
    fetch(`${API_URL}/api/stok/edit-history/list`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setEditHistory(Array.isArray(data) ? data.slice(0, 5) : []));

    // Total Nilai Stok
    fetch(`${API_URL}/api/stok/total-nilai`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setTotalStok(data.total || 0));
  }, []);

  return (
    <div className="d-flex">
      <Sidebar userName={userName} />

      <main className="content flex-grow-1 p-4">
        <h2 className="fw-bold">Dashboard</h2>
        <p>Selamat datang, {userName}!</p>

        {/* Ringkasan */}
        <div className="row g-3 mb-4">
          <div className="col-md-4">
            <div className="card dashboard-card p-3">
              <h5>Total Nilai Stok</h5>
              <p className="fs-4 fw-bold text-success">
                Rp {totalStok.toLocaleString("id-ID")}
              </p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card dashboard-card p-3">
              <h5>Total Barang Masuk</h5>
              <p className="fs-4 fw-bold text-primary">{totalMasuk}</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card dashboard-card p-3">
              <h5>Total Barang Keluar</h5>
              <p className="fs-4 fw-bold text-danger">{totalKeluar}</p>
            </div>
          </div>
        </div>

        {/* Barang Masuk & Keluar */}
        <div className="row g-3 mb-4">
          <div className="col-md-4">
            <div className="card p-3 history-box">
              <h5>Barang Masuk</h5>
              <table className="table table-sm align-middle">
                <thead>
                  <tr>
                    <th>Nama Barang</th>
                    <th>Tanggal</th>
                    <th className="text-success">Jumlah</th>
                  </tr>
                </thead>
                <tbody>
                  {barangMasuk.map((item, idx) => (
                    <tr key={idx}>
                      <td><strong>{item.nama_barang}</strong></td>
                      <td>{new Date(item.tanggal_masuk).toLocaleDateString("id-ID")}</td>
                      <td className="text-success fw-bold">{item.jumlah}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card p-3 history-box">
              <h5>Barang Keluar</h5>
              <table className="table table-sm align-middle">
                <thead>
                  <tr>
                    <th>Nama Barang</th>
                    <th>Tanggal</th>
                    <th className="text-danger">Jumlah</th>
                  </tr>
                </thead>
                <tbody>
                  {barangKeluar.map((item, idx) => (
                    <tr key={idx}>
                      <td><strong>{item.nama_barang}</strong></td>
                      <td>{new Date(item.tanggal_keluar).toLocaleDateString("id-ID")}</td>
                      <td className="text-danger fw-bold">{item.jumlah}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Barang Mau Expired */}
  <div className="col-md-4">
    <div className="card p-3 history-box">
      <h5>Barang Expired</h5>
           <table className="table table-sm align-middle">
                <thead>
                  <tr>
                    <th>Nama Barang</th>
                    <th className="text-warning">Tanggal</th>
                    <th>Jumlah</th>
                  </tr>
                </thead>
                <tbody>
        {barangExpired.map((item, idx) => (
          <tr key={idx}>
            <td><strong>{item.nama_barang}</strong> {" "}</td>
            <td><span className="text-warning">{new Date(item.expired).toLocaleDateString("id-ID")} {" "}</span></td>
            <td>{item.stok} stok</td>
          </tr>
        ))}
        </tbody>
        </table>
       </div>
     </div>
    </div>

        {/* History Login & Edit History */}
        <div className="row g-3">
          <div className="col-md-6">
            <div className="card p-3 history-box">
              <h5>History Login</h5>
              <table className="table table-sm align-middle">
                <thead>
                  <tr>
                    <th>User</th>
                    <th>Waktu</th>
                  </tr>
                </thead>
                <tbody>
                  {history.map((item, idx) => (
                    <tr key={idx}>
                      <td><strong>{item.username}</strong></td>
                      <td>{new Date(item.login_time).toLocaleString("id-ID")}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="col-md-6">
            <div className="card p-3 history-box">
              <h5>Edit History</h5>
              <table className="table table-sm align-middle">
                <thead>
                  <tr>
                    <th>User</th>
                    <th>Aktivitas</th>
                  </tr>
                </thead>
                <tbody>
                  {editHistory.map((item, idx) => (
                    <tr key={idx}>
                      <td><strong>{item.full_name || "User"}</strong></td>
                      <td>{item.activity}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;

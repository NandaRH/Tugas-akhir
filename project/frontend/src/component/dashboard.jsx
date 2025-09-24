import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import "./dashboard.css";

const API_URL = import.meta.env.VITE_API_URL; // 🔑 ambil dari .env

function Dashboard() {
  const [barangMasuk, setBarangMasuk] = useState([]);
  const [barangKeluar, setBarangKeluar] = useState([]);
  const [history, setHistory] = useState([]);
  const [editHistory, setEditHistory] = useState([]);
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

    // Dummy data barang masuk & keluar
    setBarangMasuk([
      { nama: "Indomie Goreng", jumlah: 20 },
      { nama: "Telur Ayam", jumlah: 50 },
      { nama: "Minyak Goreng", jumlah: 10 },
    ]);

    setBarangKeluar([
      { nama: "Roti Tawar", jumlah: 15 },
      { nama: "Obat Flu", jumlah: 8 },
    ]);

    // Fetch login history
    fetch(`${API_URL}/api/auth/history`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setHistory(Array.isArray(data) ? data : []))
      .catch(() => alert("Gagal ambil history login"));

    // Fetch edit history
    fetch(`${API_URL}/api/auth/edit-history`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setEditHistory(Array.isArray(data) ? data : []))
      .catch(() => console.log("Belum ada edit history"));
  }, []);

  const formatDateTime = (datetime) => {
    const d = new Date(datetime);
    const tgl = d.toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
    const jam = d.toLocaleTimeString("id-ID", {
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
    return `${tgl} ${jam}`;
  };

  const getName = (row) =>
    row?.username || row?.user_name || row?.full_name || row?.name || "User";

  return (
    <div className="dashboard-container">
      <Sidebar userName={userName} />

      <main className="content">
        <h2 className="fw-bold text-same">Dashboard</h2>
        <p className="text-same">Selamat datang, {userName}!</p>

        {/* Row Atas */}
        <div className="row mb-4">
          {/* Barang Masuk */}
          <div className="col-md-4 mb-3">
            <div className="card dashboard-card h-100">
              <div className="card-body d-flex flex-column">
                <p className="box-title text-center">Barang Masuk</p>
                <ul className="list-group list-group-flush">
                  {barangMasuk.map((item, i) => (
                    <li
                      key={i}
                      className="list-group-item d-flex justify-content-between"
                    >
                      <span>{item.nama}</span>
                      <span className="fw-bold">{item.jumlah}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Barang Keluar */}
          <div className="col-md-4 mb-3">
            <div className="card dashboard-card h-100">
              <div className="card-body d-flex flex-column">
                <p className="box-title text-center">Barang Keluar</p>
                <ul className="list-group list-group-flush">
                  {barangKeluar.map((item, i) => (
                    <li
                      key={i}
                      className="list-group-item d-flex justify-content-between"
                    >
                      <span>{item.nama}</span>
                      <span className="fw-bold">{item.jumlah}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Nilai Stok */}
          <div className="col-md-4 mb-3">
            <div className="card dashboard-card text-center h-100">
              <div className="card-body">
                <p className="box-title">Nilai Stok</p>
                <h3>Rp 8.750.000</h3>
                <small className="text-success">+5% dari bulan lalu</small>
              </div>
            </div>
          </div>
        </div>

        {/* Row Bawah */}
        <div className="row">
          {/* Barang Expired (dummy) */}
          <div className="col-lg-4 mb-3">
            <div className="card dashboard-card h-100">
              <div className="card-body d-flex flex-column">
                <p className="box-title text-center">Barang Expired</p>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item small d-flex justify-content-between">
                    Susu Ultra 1L <span className="text-danger">20 Sep 2025</span>
                  </li>
                  <li className="list-group-item small d-flex justify-content-between">
                    Roti Tawar <span className="text-danger">18 Sep 2025</span>
                  </li>
                  <li className="list-group-item small d-flex justify-content-between">
                    Obat Flu <span className="text-danger">15 Sep 2025</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* History Login */}
          <div className="col-lg-4 mb-3">
            <div className="card dashboard-card h-100">
              <div className="card-body d-flex flex-column">
                <p className="box-title text-center">History Login</p>
                {history.length === 0 ? (
                  <p className="text-muted text-center flex-grow-1 d-flex align-items-center justify-content-center">
                    Belum ada history login
                  </p>
                ) : (
                  <ul className="list-group list-group-flush history-scroll">
                    {history.map((h, i) => (
                      <li key={i} className="list-group-item small">
                        <span>
                          <strong>{getName(h)}</strong> —{" "}
                          {formatDateTime(h.login_time || h.created_at)}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>

          {/* Edit History */}
          <div className="col-lg-4 mb-3">
            <div className="card dashboard-card h-100">
              <div className="card-body d-flex flex-column">
                <p className="box-title text-center">Edit History</p>
                {editHistory.length === 0 ? (
                  <p className="text-muted text-center flex-grow-1 d-flex align-items-center justify-content-center">
                    Belum ada edit history
                  </p>
                ) : (
                  <ul className="list-group list-group-flush history-scroll">
                    {editHistory.map((e, i) => (
                      <li key={i} className="list-group-item small">
                        <span>
                          <strong>{getName(e)}</strong> —{" "}
                          {formatDateTime(e.edit_time || e.created_at)} —{" "}
                          {e.activity || ""}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;

import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import Header from "./component/Header";
import FooterHackCipta from "./component/FooterHackCipta";
import LoginRegister from "./component/LoginRegister";
import Dashboard from "./component/dashboard";
import Stok from "./component/Stok";
import TambahStok from "./component/TambahStok";
import EditStok from "./component/EditStok";
import ProtectedRoute from "./component/ProtectedRoute";

import "./App.css";
import "./index.css";

function LayoutWrapper({ children }) {
  const location = useLocation();
  const path = location.pathname;

  let className = "app-main login-page";
  if (path === "/dashboard" || path.startsWith("/stok")) {
    className = "dashboard-main";
  }

  return <main className={className}>{children}</main>;
}

function App() {
  return (
    <div className="App">
      <Header />
      <LayoutWrapper>
        <Routes>
          <Route path="/" element={<LoginRegister />} />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/stok"
            element={
              <ProtectedRoute>
                <Stok />
              </ProtectedRoute>
            }
          />

          <Route
            path="/stok/tambah"
            element={
              <ProtectedRoute>
                <TambahStok />
              </ProtectedRoute>
            }
          />

          <Route
            path="/stok/edit/:id"
            element={
              <ProtectedRoute>
                <EditStok />
              </ProtectedRoute>
            }
          />
        </Routes>
      </LayoutWrapper>
      <FooterHackCipta companyName="ApotekSehat" />
    </div>
  );
}

export default App;

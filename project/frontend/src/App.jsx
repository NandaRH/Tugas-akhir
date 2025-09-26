import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import Header from "./component/Header";
import FooterHackCipta from "./component/FooterHackCipta";
import LoginRegister from "./component/LoginRegister";
import Dashboard from "./component/dashboard";
import ProtectedRoute from "./component/ProtectedRoute";
import Stok from "./component/Stok";
import TambahStok from "./component/TambahStok";
import EditStok from "./component/EditStok";

import "./index.css";

function AppWrapper() {
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/") {
      document.body.classList.add("login-body");
    } else {
      document.body.classList.remove("login-body");
    }
  }, [location]);

  return (
    <>
      {/* Header hanya muncul di halaman login */}
      {location.pathname === "/" && <Header />}

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

      {/* Footer juga hanya muncul di login */}
      {location.pathname === "/" && <FooterHackCipta />}
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppWrapper />
    </BrowserRouter>
  );
}

import React from "react";

export default function Header() {
  return (
    <header className="bg-success bg-opacity-75 shadow-lg border border-white border-opacity-25 d-flex p-3 rounded-bottom-5">
      <div className="container d-flex justify-content-center align-items-center">
        {/* Logo */}
        <img
          src="/images/Logo.png" // taruh gambar di public/Foto/Logo.png
          alt="Logo"
          className="rounded-circle me-3"
          style={{ width: "50px", height: "50px" }}
        />
        {/* Judul */}
        <h1 className="m-0 fs-3 text-light">ApotekSehat</h1>
      </div>
    </header>
  );
}

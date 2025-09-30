import React, { useEffect } from "react";
import "./LandingPage.css";
import { Link, useNavigate } from "react-router-dom";
import { Instagram, WhatsApp, Telegram } from "@mui/icons-material";


// Heroicons
import {
  UserCircleIcon,
  ArrowRightIcon,
  RocketLaunchIcon,
  CurrencyDollarIcon,
  CubeIcon,
  BeakerIcon,
} from "@heroicons/react/24/solid";
import {
  ChartBarIcon,
  ClipboardDocumentListIcon,
  ClockIcon,
  ShieldCheckIcon,
  PhoneIcon,
} from "@heroicons/react/24/outline";

export default function LandingPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const elements = document.querySelectorAll(
      ".fade-in-up, .fade-in-left, .fade-in-right, .zoom-in"
    );
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1 }
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="landing">
      {/* NAVBAR */}
      <nav className="navbar fade-in-down">
        <div className="logo fade-in-left">
          <Link to="/">
            <img src="/Logotab.png" alt="ApotekSehat Logo" className="logo-img" />
          </Link>
          ApotekSehat
        </div>
        <ul className="menu fade-in-up">
          <li><a href="#Home">Home</a></li>
          <li><a href="#Features">Features</a></li>
          <li><a href="#About">About</a></li>
          <li><a href="#Contact">Contact</a></li>
          <li><a href="#Pricing">Pricing</a></li>
        </ul>
        <button className="btn-login fade-in-right" onClick={() => navigate("/login")}>
          <UserCircleIcon className="icon-sm icon-white me-1" />
          Get Started
        </button>
      </nav>

      {/* HERO */}
      <section id="Home" className="hero fade-in-up">
        <div className="hero-text fade-in-left">
          <h1>
            <span className="highlight">Kurangi Waktu</span> Urus Stok,
            <br />
            <span className="gradient-text">Fokus Kembangkan Apotek Anda</span>
          </h1>
          <p>
            Otomatiskan manajemen inventaris dari pemesanan hingga penjualan.
            <br />
            Dapatkan <strong>data akurat</strong> untuk keputusan bisnis yang lebih cerdas
            <RocketLaunchIcon className="icon-sm icon-emerald ms-1" />
          </p>
          <div className="hero-buttons fade-in-up">
            <button className="btn-primary d-flex align-items-center gap-2" onClick={() => navigate("/login")}>
              <ArrowRightIcon className="icon-sm" />
              Coba Gratis 30 Hari
            </button>
            <button className="btn-outline d-flex align-items-center gap-2" href="#Pricing">
              <ChartBarIcon className="icon-sm" />
              Lihat Paket Harga
            </button>
          </div>
        </div>
        <div className="hero-video fade-in-right">    
          <video autoPlay loop muted playsInline>
            <source src="/videos/Apotek.mp4" type="video/mp4" />
            Browser Anda tidak mendukung video.
          </video>
        </div>
      </section>

      {/* FEATURES */}
      <section id="Features" className="features fade-in-up">
        <h2 className="section-title">✨ Fitur Unggulan</h2>
        <div className="feature-card zoom-in">
          <ChartBarIcon className="icon-lg icon-emerald mb-2" />
          <h3>Dashboard Intuitif</h3>
          <p>Lihat kesehatan inventaris Anda dalam sekejap dengan visual modern.</p>
        </div>
        <div className="feature-card zoom-in">
          <ClipboardDocumentListIcon className="icon-lg icon-emerald mb-2" />
          <h3>Laporan Lengkap</h3>
          <p>Siap digunakan untuk kebutuhan audit & pelaporan internal.</p>
        </div>
      </section>

      {/* ABOUT */}
      <section id="About" className="about">
        <div className="about-img fade-in-left"></div>
        <div className="about-text fade-in-right">
          <h2>
            <RocketLaunchIcon className="icon-md icon-emerald me-2 inline" />
            Otomatisasi untuk Profitabilitas
          </h2>
          <ul>
            <li className="d-flex align-items-center gap-2">
              <ClockIcon className="icon-sm icon-emerald" />
              Stok opname lebih cepat <strong>80%</strong>
            </li>
            <li className="d-flex align-items-center gap-2">
              <CurrencyDollarIcon className="icon-sm icon-emerald" />
              Kerugian obat kadaluarsa turun <strong>95%</strong>
            </li>
            <li className="d-flex align-items-center gap-2">
              <CubeIcon className="icon-sm icon-emerald" />
              Ketersediaan produk naik <strong>99%</strong>
            </li>
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section id="Pricing" className="cta fade-in-up">
        <h2>
          <BeakerIcon className="icon-md icon-emerald me-1 inline" />
          Siap Modernisasi Apotek Anda?
        </h2>
        <p>
          Jangan biarkan manajemen stok menghambat pertumbuhan bisnis.
          Modernisasi operasional Anda sekarang!
        </p>
        <div className="cta-buttons">
          <button className="btn-primary d-flex align-items-center gap-2" onClick={() => navigate("/login")}>
            <RocketLaunchIcon className="icon-sm" />
            Mulai Sekarang
          </button>
          <button className="btn-outline d-flex align-items-center gap-2">
            <ShieldCheckIcon className="icon-sm" />
            Lihat Paket Harga
          </button>
        </div>
      </section>

      {/* CONTACT */}
<section id="Contact" className="contact fade-in-up">
  <h2 className="contact-title">
    <PhoneIcon className="contact-icon" />
    Hubungi Kami
  </h2>
  <p>Terhubung dengan kami lewat platform favorit Anda:</p>
  <div className="contact-links">
    <a href="https://instagram.com/yourusername" target="_blank" rel="noreferrer" className="btn-social instagram">
      <Instagram fontSize="large" />
    </a>
    <a href="https://wa.me/6281234567890" target="_blank" rel="noreferrer" className="btn-social whatsapp">
      <WhatsApp fontSize="large" />
    </a>
    <a href="https://t.me/yourusername" target="_blank" rel="noreferrer" className="btn-social telegram">
      <Telegram fontSize="large" />
    </a>
  </div>
</section>


      {/* FOOTER */}
      <footer className="footer fade-in-up">
        <p>© 2025 ApotekSehat. All rights reserved.</p>
      </footer>
    </div>
  );
}

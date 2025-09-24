import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./logindanregister.css";

const API_URL = import.meta.env.VITE_API_URL;

function LoginRegister() {
  const [full_name, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  // Register
  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Password dan Confirm Password tidak sama!");
      return;
    }

    try {
      const res = await fetch(`${API_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ full_name, email, password }),
      });
      const data = await res.json();
      alert(data.message || data.error);
    } catch (err) {
      alert("Terjadi kesalahan saat register");
    }
  };

  // Login
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
const API_URL = import.meta.env.VITE_API_URL;

const res = await fetch(`${API_URL}/api/auth/login`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ email, password }),
});
      const data = await res.json();

      if (data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("userId", data.user.id);
        localStorage.setItem("userName", data.user.full_name);
        navigate("/dashboard");
      } else {
        alert(data.error || "Login gagal");
      }
    } catch (err) {
      alert("Gagal login: " + err.message);
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center vh-100 login-page">
      <div className="card shadow-lg p-4 login-card">
        {/* Tabs */}
        <ul className="nav nav-tabs mb-3 border-0" id="myTab" role="tablist">
          <li className="nav-item" role="presentation">
            <button
              className="nav-link active"
              id="signin-tab"
              data-bs-toggle="tab"
              data-bs-target="#signin"
              type="button"
              role="tab"
            >
              Login
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button
              className="nav-link text-secondary"
              id="signup-tab"
              data-bs-toggle="tab"
              data-bs-target="#signup"
              type="button"
              role="tab"
            >
              Register
            </button>
          </li>
        </ul>

        <div className="tab-content">
          {/* Login */}
          <div className="tab-pane fade show active" id="signin" role="tabpanel">
            <h4 className="fw-bold mb-3">Welcome Back!</h4>
            <form onSubmit={handleLogin}>
              <input
                type="email"
                className="form-control mb-2"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                className="form-control mb-3"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button type="submit" className="btn btn-green w-100">
                Login
              </button>
            </form>
          </div>

          {/* Register */}
          <div className="tab-pane fade" id="signup" role="tabpanel">
            <h4 className="fw-bold mb-3">Create Account</h4>
            <form onSubmit={handleRegister}>
              <input
                type="text"
                className="form-control mb-2"
                placeholder="Full Name"
                value={full_name}
                onChange={(e) => setFullName(e.target.value)}
              />
              <input
                type="email"
                className="form-control mb-2"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                className="form-control mb-2"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <input
                type="password"
                className="form-control mb-3"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
<button type="submit" className="btn btn-green w-100">
  Register
</button>

            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginRegister;

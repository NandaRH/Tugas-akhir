import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Sidebar.css";

function Sidebar({ userName, onLogout }) {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();



    // ✅ Fungsi Logout
  const handleLogout = () => {
    localStorage.removeItem("token");   // hapus token
    localStorage.removeItem("userId");  // hapus userId
    localStorage.removeItem("userName");// hapus nama user
    navigate("/"); // redirect ke login
  };


  return (
    <aside className={`sidebar ${collapsed ? "collapsed" : ""}`}>
      {/* Header */}
      <div className="sidebar-header">
        <button
          className="toggle-btn"
          onClick={() => setCollapsed(!collapsed)}
        >
          ☰
        </button>
        {!collapsed && <span className="logo-text">ApotekSehat</span>}
      </div>

      {/* Menu */}
      <ul className="nav-list">
        <li>
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              "nav-link fw-bold" + (isActive ? " active" : "")
            }
          >
            {!collapsed && "Dashboard"}
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/stok"
            className={({ isActive }) =>
              "nav-link fw-bold" + (isActive ? " active" : "")
            }
          >
            {!collapsed && "Stok"}
          </NavLink>
        </li>
      </ul>

      {/* Footer */}
      <div className="sidebar-footer">
        {!collapsed && <span className="fw-bold">{userName}</span>}
        {!collapsed && (
          <button className="btn-logout" onClick={handleLogout}>
            Logout
          </button>
        )}
      </div>
    </aside>
  );
}

export default Sidebar;

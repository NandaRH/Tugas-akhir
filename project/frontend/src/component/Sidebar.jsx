import React from "react";
import { NavLink } from "react-router-dom";

function Sidebar({ userName }) {
  return (
    <aside className="sidebar">
      <ul className="nav flex-column mt-4">
        <li className="nav-item">
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              "nav-link fw-bold text-same" + (isActive ? " active" : "")
            }
          >
            Dashboard
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            to="/stok"
            className={({ isActive }) =>
              "nav-link fw-bold text-same" + (isActive ? " active" : "")
            }
          >
            Stok
          </NavLink>
        </li>
      </ul>

      <div className="user-profile mt-auto">
        <span className="fw-bold text-same">{userName}</span>
        <button
          className="btn btn-sm btn-outline-danger mt-2"
          onClick={() => {
            localStorage.clear();
            window.location.href = "/";
          }}
        >
          Logout
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;

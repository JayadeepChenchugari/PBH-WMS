// src/components/Header.js
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Header.css";

const Header = () => {
  const navigate = useNavigate();

  // Decode JWT manually to get the user role
  const getUserRole = () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return null;

      const payloadBase64 = token.split(".")[1];
      const decodedPayload = JSON.parse(atob(payloadBase64));
      return decodedPayload.role || null;
    } catch (err) {
      return null;
    }
  };

  const role = getUserRole();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <header className="header">
      <div className="logo">PBH WMS</div>
      <nav className="nav-links">
        <Link to="/dashboard">Dashboard</Link>
        {role === "admin" && <Link to="/suppliers">Suppliers</Link>}
        {["admin", "manager"].includes(role) && <Link to="/locations">Locations</Link>}
        {["admin", "manager", "operator"].includes(role) && (
          <>
            <Link to="/inventory">Inventory</Link>
            <Link to="/shipments/incoming">Incoming Shipments</Link>
            <Link to="/shipments/outgoing">Outgoing Shipments</Link>
          </>
        )}
      </nav>
      <button className="logout-btn" onClick={handleLogout}>
        Logout
      </button>
    </header>
  );
};

export default Header;

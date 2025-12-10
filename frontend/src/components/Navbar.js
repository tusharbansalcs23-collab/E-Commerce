import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../contexts/CartContext";

export default function Navbar() {
  const { cart } = useCart();

  const user = localStorage.getItem("user");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    alert("Logged out successfully!");
    window.location.href = "/login"; // redirect
  };

  return (
    <div
      style={{
        width: "100%",
        padding: "15px 30px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        background: "#fff",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        position: "sticky",
        top: 0,
        zIndex: 100,
      }}
    >
      {/* Logo */}
      <h2 style={{ margin: 0 }}>E-Commerce App</h2>

      {/* Right Section */}
      <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>

        <Link to="/" style={navLink}>Products</Link>
        <Link to="/cart" style={navLink}>Cart ({cart.length})</Link>

        {/* If NOT logged in */}
        {!user && (
          <>
            <Link to="/login" style={navLink}>Login</Link>
            <Link to="/register" style={navLink}>Register</Link>
          </>
        )}

        {/* If LOGGED IN */}
        {user && (
          <>
            <span style={{ fontWeight: "500", color: "#333" }}>
              Hi, {user}
            </span>

            <button
              onClick={handleLogout}
              style={{
                padding: "6px 12px",
                backgroundColor: "#ff4d4d",
                color: "#fff",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
              }}
            >
              Logout
            </button>
          </>
        )}
      </div>
    </div>
  );
}

const navLink = {
  textDecoration: "none",
  color: "#007bff",
  fontWeight: "500",
  fontSize: "16px",
};

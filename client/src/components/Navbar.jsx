import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Navbar({ setSearchQuery }) {
  const { cart } = useCart();

  return (
    <header className="navbar" style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "10px 20px",
      background: "#f8fafc"
    }}>
      <Link to="/" className="brand" style={{ fontSize: "1.5rem", fontWeight: 700, color: "#2563eb", textDecoration: "none" }}>
        ShopHub
      </Link>

      <div className="search" style={{marginLeft: "-50px"}}>
        <input
          type="search"
          placeholder="Search products..."
          aria-label="Search products"
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            padding: "6px 12px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            outline: "none",
            width: "700px"
          }}
        />
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <Link to="/cart" title="Cart" style={{ textDecoration: "none", color: "#111827", position: "relative", fontSize: "1.5rem" }}>
          🛒
          {cart.length > 0 && (
            <span style={{
              position: "absolute", top: -6, right: -10,
              background: "#2563eb", color: "white", borderRadius: "999px",
              padding: "2px 7px", fontSize: 12, fontWeight: 700
            }}>
              {cart.length}
            </span>
          )}
        </Link>
      </div>
    </header>
  );
}

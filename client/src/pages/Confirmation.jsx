import React from "react";
import { useLocation, Link } from "react-router-dom";

export default function Confirmation() {
  const location = useLocation();
  const { formData, total } = location.state || {};

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f9fafb",
        padding: "40px 20px",
        textAlign: "center",
      }}
    >
      <h1 style={{ fontSize: "28px", fontWeight: "700", marginBottom: "20px" }}>
        🎉 Your order has been placed!
      </h1>
      {formData && (
        <p style={{ fontSize: "18px", marginBottom: "12px" }}>
          Thank you, {formData.name}. Your order value is ₹{total.toFixed(2)}.
        </p>
      )}
      <Link
        to="/"
        style={{
          padding: "12px 24px",
          backgroundColor: "#2563eb",
          color: "#fff",
          borderRadius: "8px",
          textDecoration: "none",
          fontWeight: "600",
        }}
      >
        Continue Shopping
      </Link>
    </div>
  );
}

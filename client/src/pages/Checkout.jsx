import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

// Checkout form component

const handleSubmit = (formData) => {
  clearCart();
  navigate("/confirmation", { state: { items: cart, formData, total, tax, shipping } });
};

function CheckoutForm({ onSubmit, orderTotal }) {
  const [formData, setFormData] = useState({ name: "", email: "", address: "" });
  const [focusedField, setFocusedField] = useState("");

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.address) {
      alert("Please fill in all fields.");
      return;
    }
    onSubmit(formData);
  };

  // Base input style
  const baseInputStyle = {
    padding: "12px",
    border: "1px solid #d1d5db",
    borderRadius: "8px",
    outline: "none",
    fontSize: "14px",
    width: "100%",
    transition: "border 0.2s, box-shadow 0.2s",
  };

  // Focused input style
  const getInputStyle = (name) => {
    return focusedField === name
      ? { ...baseInputStyle, borderColor: "#2563eb", boxShadow: "0 0 0 2px rgba(37, 99, 235, 0.2)" }
      : baseInputStyle;
  };

  const buttonStyle = {
    padding: "12px 20px",
    backgroundColor: "#2563eb",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "background-color 0.2s",
  };

  const [hover, setHover] = useState(false);
  const hoverButtonStyle = hover ? { backgroundColor: "#1e40af" } : {};

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        backgroundColor: "#fff",
        padding: "24px",
        borderRadius: "12px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
        display: "flex",
        flexDirection: "column",
        gap: "16px",
      }}
    >
      <h2 style={{ fontSize: "20px", fontWeight: "600" }}>Your Details</h2>

      <input
        name="name"
        placeholder="Name"
        value={formData.name}
        onChange={handleChange}
        onFocus={() => setFocusedField("name")}
        onBlur={() => setFocusedField("")}
        style={getInputStyle("name")}
      />

      <input
        name="email"
        type="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        onFocus={() => setFocusedField("email")}
        onBlur={() => setFocusedField("")}
        style={getInputStyle("email")}
      />

      <textarea
        name="address"
        placeholder="Address"
        value={formData.address}
        onChange={handleChange}
        rows={4}
        onFocus={() => setFocusedField("address")}
        onBlur={() => setFocusedField("")}
        style={getInputStyle("address")}
      />

      <p style={{ fontWeight: "600" }}>Order Total: ₹{orderTotal.toFixed(2)}</p>

      <button
        type="submit"
        style={{ ...buttonStyle, ...hoverButtonStyle }}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        Place Order
      </button>
    </form>
  );
}

// Order summary component
function OrderSummary({ items, tax, shipping, total }) {
  return (
    <div
      style={{
        backgroundColor: "#fff",
        padding: "24px",
        borderRadius: "12px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
        display: "flex",
        flexDirection: "column",
        gap: "12px",
      }}
    >
      <h2 style={{ fontSize: "20px", fontWeight: "600" }}>Order Summary</h2>
      {items.map((item) => (
        <div
          key={item.id}
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <span>{item.name} x {item.qty}</span>
          <span>₹{(item.price * item.qty).toFixed(2)}</span>
        </div>
      ))}
      <hr />
      <div style={{ display: "flex", justifyContent: "space-between" }}>Tax: ₹{tax.toFixed(2)}</div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>Shipping: ₹{shipping.toFixed(2)}</div>
      <div style={{ display: "flex", justifyContent: "space-between", fontWeight: "bold" }}>
        Total: ₹{total.toFixed(2)}
      </div>
    </div>
  );
}

// Main Checkout page
export default function Checkout() {
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();

  const orderTotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const tax = orderTotal * 0.1;
  const shipping = orderTotal > 50 ? 0 : 10;
  const total = orderTotal + tax + shipping;

  const handleSubmit = (formData) => {
    clearCart();
    navigate("/confirmation", { state: { items: cart, formData, total, tax, shipping } });
  };

  if (cart.length === 0)
    return (
      <p style={{ textAlign: "center", marginTop: "40px", fontSize: "18px" }}>
        Your cart is empty.
      </p>
    );

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f9fafb",
        padding: "40px 20px",
        maxWidth: "1120px",
        margin: "0 auto",
      }}
    >
      <h1 style={{ fontSize: "28px", fontWeight: "700", marginBottom: "32px" }}>Checkout</h1>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "20px",
        }}
      >
        <CheckoutForm onSubmit={handleSubmit} orderTotal={total} />
        <OrderSummary items={cart} tax={tax} shipping={shipping} total={total} />
      </div>
    </div>
  );
}

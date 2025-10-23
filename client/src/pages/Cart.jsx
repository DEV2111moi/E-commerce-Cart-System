import React from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const { cart, changeQty, removeFromCart, clearCart, total } = useCart();
  const navigate = useNavigate();

  return (
    <div className="container" style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 24 }}>
      <div>
        <h2 style={{ marginTop: 0 }}>Shopping Cart</h2>

        {cart.length === 0 ? (
          <div className="empty">Your cart is empty</div>
        ) : (
          <div className="cart-list">
            {cart.map(item => (
              <div className="cart-item" key={item.id}>
                <img src={item.image} alt={item.name} />
                <div style={{flex: 1}}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                      <div style={{ fontWeight: 700 }}>{item.name}</div>
                      <div className="small">{item.category}</div>
                    </div>
                    <div style={{ fontWeight: 700 }}>₹{(item.price * item.qty).toFixed(2)}</div>
                  </div>

                  <div style={{ marginTop: 10, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div className="qty-controls">
                      <button className="btn" onClick={() => changeQty(item.id, item.qty - 1)}>-</button>
                      <div style={{ minWidth: 24, textAlign: "center" }}>{item.qty}</div>
                      <button className="btn" onClick={() => changeQty(item.id, item.qty + 1)}>+</button>
                    </div>
                    <button className="btn" onClick={() => removeFromCart(item.id)} style={{ background: "transparent", color: "#ef4444" }}>
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <aside>
        <div className="summary">
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
            <div className="small">Subtotal</div>
            <div style={{ fontWeight: 700 }}>₹{total.toFixed(2)}</div>
          </div>

          <div style={{ marginBottom: 12 }} className="small">Shipping & taxes calculated at checkout</div>

          <button className="btn btn-primary" style={{ width: "100%", marginBottom: 10 }} onClick={() => navigate("/checkout")}>
            Checkout
          </button>

          <button className="btn btn-danger" style={{ width: "100%" }} onClick={clearCart}>Clear Cart</button>
        </div>
      </aside>
    </div>
  );
}

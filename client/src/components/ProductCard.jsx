import React from "react";
import { useCart } from "../context/CartContext";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <div className="card">
      <img src={product.image} alt={product.name} />
      <div className="card-body">
        <div>
          <h3 className="title">{product.name}</h3>
          <p className="category">{product.category}</p>
        </div>

        <div style={{ marginTop: "auto" }}>
          <div className="price-row">
            <div className="price">₹{product.price.toFixed(2)}</div>
            {product.oldPrice && <div className="old-price">₹{product.oldPrice.toFixed(2)}</div>}
          </div>

          <button className="btn btn-primary" onClick={() => addToCart(product)} style={{ marginTop: 12 }}>
            🛒 Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

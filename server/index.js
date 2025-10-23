// server/index.js
import express from "express";
import cors from "cors";
import {products} from "./data.js";

const app = express();
app.use(cors());
app.use(express.json());

// In-memory cart
let cart = [];

// ✅ Get all products
app.get("/products", (req, res) => {
  res.json(products);
});

// ✅ Get cart
app.get("/cart", (req, res) => {
  res.json(cart);
});

// ✅ Add item to cart
app.post("/cart", (req, res) => {
  const product = req.body;
  if (!product || !product.id)
    return res.status(400).json({ error: "Invalid product" });

  const found = cart.find((p) => p.id === product.id);
  if (found) {
    found.qty = (found.qty || 1) + 1;
  } else {
    cart.push({ ...product, qty: 1 });
  }
  res.json(cart);
});

// ✅ Update quantity
app.put("/cart/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { qty } = req.body;
  cart = cart.map((p) =>
    p.id === id ? { ...p, qty: Math.max(1, qty | 0) } : p
  );
  res.json(cart);
});

// ✅ Remove item
app.delete("/cart/:id", (req, res) => {
  const id = parseInt(req.params.id);
  cart = cart.filter((p) => p.id !== id);
  res.json(cart);
});

// ✅ Clear cart
app.delete("/cart", (req, res) => {
  cart = [];
  res.json(cart);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`✅ Server running on http://localhost:${PORT}`)
);

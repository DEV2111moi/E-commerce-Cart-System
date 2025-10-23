import React, { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";

export default function Home({ searchQuery }) {
  const [category, setCategory] = useState("All");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔹 Fetch products from Node server
  useEffect(() => {
    async function loadProducts() {
      try {
        const res = await fetch("http://localhost:5000/products");
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error("Failed to fetch products:", err);
      } finally {
        setLoading(false);
      }
    }
    loadProducts();
  }, []);

  // 🔹 Handle category list dynamically
  const categories = ["All", ...Array.from(new Set(products.map(p => p.category)))];

  // 🔹 Filter products by category AND search query
  const filtered = products.filter(p => {
    const matchCategory = category === "All" || p.category === category;
    const matchSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  if (loading) return <p style={{ textAlign: "center" }}>Loading products...</p>;

  return (
    <div className="container">
      {/* Category Filter Pills */}
      <div className="categories" style={{ marginBottom: "20px", display: "flex", gap: "10px", flexWrap: "wrap" }}>
        {categories.map(cat => (
          <div
            key={cat}
            className="pill"
            onClick={() => setCategory(cat)}
            style={{
              padding: "6px 14px",
              borderRadius: "20px",
              border: "1px solid #ccc",
              cursor: "pointer",
              background: category === cat ? "#eef2ff" : "white",
              fontWeight: category === cat ? "600" : "normal",
            }}
          >
            {cat}
          </div>
        ))}
      </div>

      {/* Products Grid */}
      <div
        className="grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
          gap: "20px",
        }}
      >
        {filtered.length > 0 ? (
          filtered.map(p => <ProductCard key={p.id} product={p} />)
        ) : (
          <p style={{ textAlign: "center" }}>No products found.</p>
        )}
      </div>
    </div>
  );
}

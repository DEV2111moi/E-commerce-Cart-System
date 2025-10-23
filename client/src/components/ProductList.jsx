import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";

export default function ProductList({ searchQuery }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }, []);

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) return <p>Loading products...</p>;

  return (
    <div
      className="product-list"
      style={{
        padding: "20px",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
        gap: "20px",
      }}
    >
      {filteredProducts.length > 0 ? (
        filteredProducts.map((p) => <ProductCard key={p.id} product={p} />)
      ) : (
        <p>No products found.</p>
      )}
    </div>
  );
}

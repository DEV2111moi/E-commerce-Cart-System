import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import ProductList from "./components/ProductList"; 
import Confirmation from "./pages/Confirmation";// ✅ make sure this exists

export default function App() {
  // Search state for filtering products
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div>
      {/* Navbar with search handler */}
      <Navbar setSearchQuery={setSearchQuery} />

      {/* Page Routes */}
      <Routes>
        {/* Home page that can include ProductList */}
        <Route path="/" element={<Home searchQuery={searchQuery} />} />

        {/* Cart and Checkout pages */}
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/confirmation" element={<Confirmation />} />
      </Routes>
    </div>
  );
}

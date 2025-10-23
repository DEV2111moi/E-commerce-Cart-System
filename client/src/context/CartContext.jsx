import React, { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

const STORAGE_KEY = "shophub_cart_v1";

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(cart)); } catch {}
  }, [cart]);

  const addToCart = (product) => {
    setCart(prev => {
      const found = prev.find(p => p.id === product.id);
      if (found) return prev.map(p => p.id === product.id ? { ...p, qty: p.qty + 1 } : p);
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const changeQty = (id, qty) => {
    setCart(prev => prev.map(p => p.id === id ? { ...p, qty: Math.max(1, qty) } : p));
  };

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(p => p.id !== id));
  };

  const clearCart = () => setCart([]);

  const total = cart.reduce((s, i) => s + (i.price * (i.qty || 1)), 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, changeQty, removeFromCart, clearCart, total }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);

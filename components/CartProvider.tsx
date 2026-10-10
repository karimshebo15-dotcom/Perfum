"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

export type CartLine = { slug: string; quantity: number };
type CartContextValue = {
  items: CartLine[];
  count: number;
  addItem: (slug: string, quantity?: number) => void;
  updateQuantity: (slug: string, quantity: number) => void;
  removeItem: (slug: string) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartLine[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem("athar-cart");
      if (saved) setItems(JSON.parse(saved));
    } catch { /* Keep an empty cart if storage is unavailable. */ }
    setReady(true);
  }, []);

  useEffect(() => {
    if (ready) window.localStorage.setItem("athar-cart", JSON.stringify(items));
  }, [items, ready]);

  const value = useMemo<CartContextValue>(() => ({
    items,
    count: items.reduce((total, item) => total + item.quantity, 0),
    addItem: (slug, quantity = 1) => setItems(current => {
      const existing = current.find(item => item.slug === slug);
      return existing ? current.map(item => item.slug === slug ? { ...item, quantity: item.quantity + quantity } : item) : [...current, { slug, quantity }];
    }),
    updateQuantity: (slug, quantity) => setItems(current => quantity < 1 ? current.filter(item => item.slug !== slug) : current.map(item => item.slug === slug ? { ...item, quantity } : item)),
    removeItem: slug => setItems(current => current.filter(item => item.slug !== slug)),
    clearCart: () => setItems([]),
  }), [items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
}

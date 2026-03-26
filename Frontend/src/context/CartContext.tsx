"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface CartItem {
  id: number;
  name: string;
  brand: string;
  price: string;
  image: string;
  size: string;
  color: string;
  quantity: number;
  selected: boolean;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, delta: number) => void;
  toggleSelection: (id: number) => void;
  selectAll: (selected: boolean) => void;
  totalItems: number;
  selectedCount: number;
  subtotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initial mock data
  const [cart, setCart] = useState<CartItem[]>([
    { id: 1, name: "Adidas Terrex Agravic Speed Ultra", brand: "adidas", price: "$220.00", image: "/images/products/Ultra Trail Terrex Agravic Speed.jpg", size: "10.5", color: "Core Black", quantity: 3, selected: true },
    { id: 2, name: "Adidas Adizero Prime X 2.0 STRUNG", brand: "adidas", price: "$250.00", image: "/images/products/Adizero Prime X 2.0 STRUNG.jpg", size: "9", color: "Solar Red", quantity: 2, selected: true },
  ]);

  const addToCart = (item: CartItem) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (i) => i.id === item.id && i.size === item.size && i.color === item.color
      );
      
      if (existingIndex > -1) {
        const newCart = [...prev];
        newCart[existingIndex] = {
          ...newCart[existingIndex],
          quantity: newCart[existingIndex].quantity + 1
        };
        return newCart;
      }
      
      return [...prev, item];
    });
  };

  const removeFromCart = (id: number) => {
    setCart((prev) => prev.filter((i) => i.id !== id));
  };

  const updateQuantity = (id: number, delta: number) => {
    setCart((prev) =>
      prev.map((i) => {
        if (i.id === id) {
          const newQty = Math.max(0, i.quantity + delta);
          return { ...i, quantity: newQty };
        }
        return i;
      }).filter((i) => i.quantity > 0)
    );
  };

  const toggleSelection = (id: number) => {
    setCart((prev) =>
      prev.map((i) => (i.id === id ? { ...i, selected: !i.selected } : i))
    );
  };

  const selectAll = (selected: boolean) => {
    setCart((prev) => prev.map((i) => ({ ...i, selected })));
  };

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const selectedItems = cart.filter((i) => i.selected);
  const selectedCount = selectedItems.length;
  const subtotal = selectedItems.reduce((acc, item) => {
    const priceNum = parseFloat(item.price.replace("$", ""));
    return acc + priceNum * item.quantity;
  }, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, toggleSelection, selectAll, totalItems, selectedCount, subtotal }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

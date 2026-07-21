"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Product, products } from "../data/products";

export interface CartItem {
  product: Product;
  quantity: number;
}

interface AppContextType {
  cart: CartItem[];
  wishlist: string[];
  isDarkMode: boolean;
  couponApplied: boolean;
  couponCode: string;
  couponDiscount: number; // 0.15 for 15%
  cartOpen: boolean;
  quickViewProduct: Product | null;
  user: { name: string; email: string; phone: string } | null;
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  toggleWishlist: (productId: string) => void;
  toggleDarkMode: () => void;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;
  setCartOpen: (open: boolean) => void;
  setQuickViewProduct: (product: Product | null) => void;
  clearCart: () => void;
  loginCustomer: (email: string, phone: string, name: string) => void;
  logoutCustomer: () => void;
  orderTotal: number;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [user, setUser] = useState<{ name: string; email: string; phone: string } | null>(null);

  // Load state from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("raj_cart");
    const savedWish = localStorage.getItem("raj_wishlist");
    const savedUser = localStorage.getItem("raj_current_user");

    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error(e);
      }
    }
    if (savedWish) {
      try {
        setWishlist(JSON.parse(savedWish));
      } catch (e) {
        console.error(e);
      }
    }
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        console.error(e);
      }
    }
    // Always force light mode and clear dark mode class list
    setIsDarkMode(false);
    document.documentElement.classList.remove("dark");
    localStorage.removeItem("raj_dark_mode");
  }, []);

  // Sync state to localStorage
  useEffect(() => {
    localStorage.setItem("raj_cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("raj_wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  const addToCart = (product: Product, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    // Open drawer on add
    setCartOpen(true);
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
  };

  const toggleDarkMode = () => {
    setIsDarkMode(false);
    document.documentElement.classList.remove("dark");
    localStorage.removeItem("raj_dark_mode");
  };

  const applyCoupon = (code: string) => {
    const cleanCode = code.trim().toUpperCase();
    if (cleanCode === "PURELUXURY" || cleanCode === "DIPAK2466") {
      setCouponCode(cleanCode);
      setCouponApplied(true);
      return true;
    }
    return false;
  };

  const removeCoupon = () => {
    setCouponCode("");
    setCouponApplied(false);
  };

  const clearCart = () => {
    setCart([]);
    setCouponApplied(false);
    setCouponCode("");
  };

  const loginCustomer = (email: string, phone: string, name: string) => {
    const userSession = { name, email, phone };
    setUser(userSession);
    localStorage.setItem("raj_current_user", JSON.stringify(userSession));
  };

  const logoutCustomer = () => {
    setUser(null);
    localStorage.removeItem("raj_current_user");
  };

  // Calculations
  const couponDiscount = couponApplied ? 0.15 : 0;
  
  const subtotal = cart.reduce((total, item) => total + item.product.offerPrice * item.quantity, 0);
  const discountAmount = subtotal * couponDiscount;
  
  // Free Shipping & GST Tax Removed
  const tax = 0;
  const shipping = 0;
  const orderTotal = Math.round(subtotal - discountAmount);

  return (
    <AppContext.Provider
      value={{
        cart,
        wishlist,
        isDarkMode,
        couponApplied,
        couponCode,
        couponDiscount,
        cartOpen,
        quickViewProduct,
        user,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        toggleWishlist,
        toggleDarkMode,
        applyCoupon,
        removeCoupon,
        setCartOpen,
        setQuickViewProduct,
        clearCart,
        loginCustomer,
        logoutCustomer,
        orderTotal,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};

"use client";

import { useApp } from "../context/AppContext";
import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Minus, Trash2, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function CartDrawer() {
  const {
    cart,
    cartOpen,
    setCartOpen,
    updateCartQuantity,
    removeFromCart,
    couponApplied,
    couponCode,
    applyCoupon,
    removeCoupon,
    orderTotal,
  } = useApp();

  const [promoText, setPromoText] = useState("");
  const [promoError, setPromoError] = useState("");

  const subtotal = cart.reduce(
    (total, item) => total + item.product.offerPrice * item.quantity,
    0
  );
  
  const discountAmount = couponApplied ? subtotal * 0.15 : 0;
  const tax = 0;
  const shipping = 0;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError("");
    const success = applyCoupon(promoText);
    if (!success) {
      setPromoError("Invalid coupon code.");
    } else {
      setPromoText("");
    }
  };

  return (
    <AnimatePresence>
      {cartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={() => setCartOpen(false)}
            className="fixed inset-0 bg-black z-[1000] cursor-pointer"
          />

          {/* Drawer Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-backgroundCustom dark:bg-primary z-[1001] shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b border-black/5 dark:border-white/5 flex items-center justify-between">
              <h3 className="font-playfair text-xl font-bold text-primary dark:text-lightMint tracking-wide">
                Your Beauty Bag
              </h3>
              <button
                onClick={() => setCartOpen(false)}
                className="p-2 text-textCustom/75 dark:text-lightMint/75 hover:bg-black/5 dark:hover:bg-white/5 rounded-full transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                  <span className="text-4xl">🍃</span>
                  <div>
                    <h4 className="font-playfair text-lg font-semibold text-textCustom dark:text-white">
                      Your bag is empty
                    </h4>
                    <p className="text-sm text-textCustom/50 dark:text-lightMint/50 mt-1">
                      Choose organic luxury formulations to begin.
                    </p>
                  </div>
                  <button
                    onClick={() => setCartOpen(false)}
                    className="px-6 py-2.5 bg-primary dark:bg-accent text-white dark:text-primary font-poppins text-xs font-semibold uppercase tracking-wider rounded-full cursor-pointer hover:opacity-90"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                cart.map((item) => (
                  <div
                    key={item.product.id}
                    className="flex space-x-4 border-b border-black/5 dark:border-white/5 pb-6"
                  >
                    <img
                      src={item.product.imgUrl}
                      alt={item.product.name}
                      className="w-20 h-20 object-cover rounded-md bg-white border border-black/5"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-playfair text-base font-bold text-textCustom dark:text-white truncate">
                        {item.product.name}
                      </h4>
                      <p className="text-xs text-textCustom/50 dark:text-lightMint/50 font-inter mt-0.5 truncate">
                        {item.product.tagline}
                      </p>
                      
                      {/* Price */}
                      <div className="flex items-center space-x-2 mt-2">
                        <span className="font-poppins text-sm font-semibold text-primary dark:text-accent">
                          ₹{item.product.offerPrice}
                        </span>
                        <span className="font-poppins text-xs text-textCustom/40 line-through dark:text-lightMint/30">
                          ₹{item.product.originalPrice}
                        </span>
                      </div>

                      {/* Controls */}
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center border border-black/10 dark:border-white/10 rounded-full bg-white dark:bg-black/5">
                          <button
                            onClick={() =>
                              updateCartQuantity(item.product.id, item.quantity - 1)
                            }
                            className="p-1 px-2.5 text-textCustom/60 dark:text-lightMint/70 hover:text-primary dark:hover:text-white transition-colors cursor-pointer"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="font-poppins text-xs font-semibold px-1 text-textCustom dark:text-white w-6 text-center select-none">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateCartQuantity(item.product.id, item.quantity + 1)
                            }
                            className="p-1 px-2.5 text-textCustom/60 dark:text-lightMint/70 hover:text-primary dark:hover:text-white transition-colors cursor-pointer"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="text-textCustom/40 dark:text-lightMint/40 hover:text-red-500 hover:dark:text-red-400 transition-colors p-1.5 cursor-pointer"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer calculations */}
            {cart.length > 0 && (
              <div className="p-6 bg-white dark:bg-primary border-t border-black/5 dark:border-white/5 space-y-4">
                {/* Coupon Code Section */}
                {couponApplied ? (
                  <div className="bg-lightMint/50 dark:bg-accent/10 border border-accent/20 rounded-lg p-2.5 flex items-center justify-between">
                    <span className="text-xs font-poppins font-semibold text-primary dark:text-accent">
                      ✓ Promo Applied: {couponCode} (15% OFF)
                    </span>
                    <button
                      onClick={removeCoupon}
                      className="text-xs font-poppins text-red-500 font-semibold cursor-pointer hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} className="flex space-x-2">
                    <input
                      type="text"
                      placeholder="Enter Promo Code"
                      value={promoText}
                      onChange={(e) => setPromoText(e.target.value)}
                      className="flex-1 px-4 py-2 border border-black/10 dark:border-white/10 bg-transparent text-sm text-textCustom dark:text-white font-poppins rounded-full focus:outline-none focus:border-primary dark:focus:border-accent"
                    />
                    <button
                      type="submit"
                      className="px-5 py-2 bg-primary dark:bg-accent text-white dark:text-primary text-xs font-poppins font-semibold uppercase tracking-wider rounded-full hover:opacity-90 cursor-pointer"
                    >
                      Apply
                    </button>
                  </form>
                )}
                {promoError && (
                  <p className="text-[11px] font-poppins text-red-500 mt-1 pl-1">
                    {promoError}
                  </p>
                )}

                {/* Bill Details */}
                <div className="space-y-2 text-sm font-inter text-textCustom/70 dark:text-lightMint/70 border-t border-black/5 dark:border-white/5 pt-4">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-poppins text-textCustom dark:text-white">₹{subtotal}</span>
                  </div>
                  {couponApplied && (
                    <div className="flex justify-between text-green-600 dark:text-accent">
                      <span>Discount (15%)</span>
                      <span className="font-poppins">-₹{Math.round(discountAmount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span className="font-poppins text-green-600 dark:text-accent font-semibold">
                      FREE
                    </span>
                  </div>
                  <div className="flex justify-between border-t border-black/5 dark:border-white/5 pt-3 text-base font-bold text-primary dark:text-white">
                    <span>Total Amount</span>
                    <span className="font-poppins text-primary dark:text-accent text-lg">
                      ₹{orderTotal}
                    </span>
                  </div>
                </div>

                {/* Checkout CTA */}
                <Link
                  href="/checkout"
                  onClick={() => setCartOpen(false)}
                  className="w-full py-3.5 bg-primary dark:bg-accent text-white dark:text-primary font-poppins font-semibold text-center uppercase tracking-widest text-xs rounded-full flex items-center justify-center space-x-2 transition-all duration-300 hover:opacity-90 hover:space-x-3 cursor-pointer shadow-lg shadow-primary/20 dark:shadow-accent/10"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                
                <p className="text-[10px] text-center text-textCustom/40 dark:text-lightMint/30 font-inter">
                  Secure checkout powered by Razorpay API and SSL encryption.
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

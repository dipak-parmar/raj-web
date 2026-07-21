"use client";

import { useApp } from "../context/AppContext";
import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingBag, Star, Zap } from "lucide-react";
import { useRouter } from "next/navigation";

export default function QuickViewModal() {
  const { quickViewProduct, setQuickViewProduct, addToCart } = useApp();
  const router = useRouter();

  const handleClose = () => {
    setQuickViewProduct(null);
  };

  const handleAddToBag = () => {
    if (quickViewProduct) {
      addToCart(quickViewProduct, 1);
      setQuickViewProduct(null);
    }
  };

  const handleExploreMore = () => {
    if (quickViewProduct) {
      router.push(`/products/${quickViewProduct.id}`);
      setQuickViewProduct(null);
    }
  };

  return (
    <AnimatePresence>
      {quickViewProduct && (
        <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4">
          
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm cursor-pointer"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 15 }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="relative w-full max-w-4xl bg-white dark:bg-primary rounded-3xl overflow-hidden shadow-2xl z-10 border border-black/5 dark:border-white/10"
          >
            {/* Close button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 p-2 z-20 bg-black/5 dark:bg-white/10 text-primary dark:text-white rounded-full hover:bg-black/10 dark:hover:bg-white/20 transition-all cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2">
              
              {/* Product Image Column */}
              <div className="relative aspect-square w-full bg-neutral-100 overflow-hidden">
                <img
                  src={quickViewProduct.imgUrl}
                  alt={quickViewProduct.name}
                  className="w-full h-full object-cover"
                />
                
                {/* Organic Label */}
                {quickViewProduct.organic && (
                  <span className="absolute top-5 left-5 bg-[#E6F7ED] dark:bg-accent/20 border border-accent/30 text-[#21824F] dark:text-accent text-[9px] font-poppins font-bold uppercase tracking-widest px-3 py-1.5 rounded-full select-none">
                    100% Organic
                  </span>
                )}
              </div>

              {/* Info Column */}
              <div className="p-6 md:p-10 flex flex-col justify-between overflow-y-auto max-h-[85vh] md:max-h-[500px]">
                <div>
                  {/* Rating */}
                  <div className="flex items-center space-x-1 text-xs text-textCustom/60 dark:text-lightMint/60 mb-2">
                    <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                    <span className="font-poppins font-semibold text-textCustom dark:text-white">
                      {quickViewProduct.rating}
                    </span>
                    <span className="font-inter">({quickViewProduct.reviewsCount} reviews)</span>
                  </div>

                  <h3 className="font-playfair text-2xl md:text-3xl font-bold text-textCustom dark:text-white leading-tight">
                    {quickViewProduct.name}
                  </h3>
                  <p className="font-inter text-sm text-primary dark:text-accent font-semibold italic mt-1.5">
                    {quickViewProduct.tagline}
                  </p>

                  {/* Pricing */}
                  <div className="flex items-baseline space-x-3 my-4">
                    <span className="font-poppins text-2xl font-bold text-primary dark:text-accent">
                      ₹{quickViewProduct.offerPrice}
                    </span>
                    <span className="font-poppins text-sm text-textCustom/40 line-through dark:text-lightMint/30">
                      ₹{quickViewProduct.originalPrice}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="font-inter text-xs text-textCustom/70 dark:text-lightMint/70 leading-relaxed border-t border-black/5 dark:border-white/5 pt-4">
                    {quickViewProduct.description}
                  </p>

                  {/* Key Benefits */}
                  <div className="mt-5 space-y-2">
                    <h5 className="font-poppins text-[10px] font-bold text-textCustom dark:text-white uppercase tracking-wider">
                      Key Benefits
                    </h5>
                    <ul className="text-xs text-textCustom/60 dark:text-lightMint/60 space-y-1.5 font-inter">
                      {quickViewProduct.benefits.slice(0, 3).map((benefit, i) => (
                        <li key={i} className="flex items-start space-x-2">
                          <span className="text-accent shrink-0 mt-0.5">✦</span>
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Footer Action buttons */}
                <div className="pt-6 border-t border-black/5 dark:border-white/5 mt-6 grid grid-cols-2 gap-3">
                  <button
                    onClick={handleAddToBag}
                    className="py-3 px-4 bg-primary dark:bg-accent text-white dark:text-primary font-poppins text-xs font-semibold uppercase tracking-wider rounded-xl transition-all duration-300 hover:opacity-90 flex items-center justify-center space-x-2 cursor-pointer shadow-md"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Bag</span>
                  </button>
                  <button
                    onClick={handleExploreMore}
                    className="py-3 px-4 bg-white dark:bg-black/20 border border-primary/20 dark:border-white/10 text-primary dark:text-lightMint font-poppins text-xs font-semibold uppercase tracking-wider rounded-xl transition-all duration-300 hover:bg-neutral-50 dark:hover:bg-white/5 flex items-center justify-center space-x-2 cursor-pointer"
                  >
                    <Zap className="w-4 h-4" />
                    <span>Full Details</span>
                  </button>
                </div>

              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

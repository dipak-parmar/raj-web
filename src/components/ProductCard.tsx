"use client";

import { Product } from "../data/products";
import { useApp } from "../context/AppContext";
import { Heart, Star, ShoppingBag, Eye, CreditCard } from "lucide-react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart, wishlist, toggleWishlist, setQuickViewProduct } = useApp();
  const router = useRouter();

  const isWished = wishlist.includes(product.id);

  const handleBuyNow = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, 1);
    router.push("/checkout");
  };

  const handleCardClick = () => {
    router.push(`/products/${product.id}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
      className="group relative flex flex-col bg-white/40 dark:bg-white/5 backdrop-blur-md border border-black/5 dark:border-white/5 rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-1.5"
    >
      {/* Image Gallery wrapper */}
      <div
        onClick={handleCardClick}
        className="relative aspect-square w-full overflow-hidden cursor-pointer bg-neutral-100"
      >
        <img
          src={product.imgUrl}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          loading="lazy"
        />

        {/* Overlays / Badges */}
        <div className="absolute top-4 left-4 z-10 flex flex-col space-y-2">
          {product.organic && (
            <span className="bg-[#E6F7ED] dark:bg-accent/20 border border-accent/30 text-[#21824F] dark:text-accent text-[9px] font-poppins font-bold uppercase tracking-widest px-2.5 py-1.5 rounded-full select-none shadow-sm">
              100% Organic
            </span>
          )}
        </div>

        {/* Wishlist Link */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className={`absolute top-4 right-4 z-10 p-2.5 rounded-full border shadow-sm transition-all duration-300 cursor-pointer ${
            isWished
              ? "bg-[#FFEBEB] border-red-199 text-red-500"
              : "bg-white/70 dark:bg-black/50 border-black/5 dark:border-white/10 text-textCustom dark:text-white hover:bg-white dark:hover:bg-black"
          }`}
          aria-label="Toggle wishlist"
        >
          <Heart className={`w-4 h-4 ${isWished ? "fill-red-500" : ""}`} />
        </button>

        {/* Quick hover utilities overlay */}
        <div className="absolute inset-0 bg-primary/20 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-3">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setQuickViewProduct(product);
            }}
            className="p-3 bg-white hover:bg-accent hover:text-primary text-primary rounded-full transition-all duration-300 transform translate-y-3 group-hover:translate-y-0 shadow-lg cursor-pointer"
            title="Quick View"
          >
            <Eye className="w-5 h-5" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              addToCart(product, 1);
            }}
            className="p-3 bg-white hover:bg-accent hover:text-primary text-primary rounded-full transition-all duration-300 transform translate-y-3 group-hover:translate-y-0 delay-75 shadow-lg cursor-pointer"
            title="Add to Bag"
          >
            <ShoppingBag className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Info Block */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div className="space-y-2 cursor-pointer" onClick={handleCardClick}>
          {/* Rating */}
          <div className="flex items-center space-x-1.5 text-xs text-textCustom/60 dark:text-lightMint/60">
            <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
            <span className="font-poppins font-semibold text-textCustom dark:text-white">
              {product.rating}
            </span>
            <span className="font-inter">({product.reviewsCount} reviews)</span>
          </div>

          <h3 className="font-playfair text-lg font-bold text-textCustom dark:text-white line-clamp-1 group-hover:text-primary dark:group-hover:text-accent transition-colors">
            {product.name}
          </h3>
          <p className="font-inter text-xs text-textCustom/55 dark:text-lightMint/55 line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        </div>

        <div className="pt-4 mt-auto">
          {/* Pricing */}
          <div className="flex items-baseline space-x-2.5 mb-4">
            <span className="font-poppins text-lg font-bold text-primary dark:text-accent">
              ₹{product.offerPrice}
            </span>
            <span className="font-poppins text-xs text-textCustom/40 line-through dark:text-lightMint/30">
              ₹{product.originalPrice}
            </span>
          </div>

          {/* Action CTAs */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                addToCart(product, 1);
              }}
              className="py-2.5 px-3 bg-white dark:bg-black/20 border border-primary/20 dark:border-white/10 text-primary dark:text-lightMint font-poppins text-[10px] font-semibold uppercase tracking-wider rounded-lg transition-all duration-300 hover:bg-primary hover:text-white dark:hover:bg-accent dark:hover:text-primary cursor-pointer hover:border-transparent flex items-center justify-center space-x-1"
            >
              <ShoppingBag className="w-3 h-3" />
              <span>Add to Bag</span>
            </button>
            <button
              onClick={handleBuyNow}
              className="py-2.5 px-3 bg-primary dark:bg-accent text-white dark:text-primary border border-transparent font-poppins text-[10px] font-semibold uppercase tracking-wider rounded-lg transition-all duration-300 hover:opacity-90 cursor-pointer flex items-center justify-center space-x-1"
            >
              <CreditCard className="w-3 h-3" />
              <span>Buy Now</span>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

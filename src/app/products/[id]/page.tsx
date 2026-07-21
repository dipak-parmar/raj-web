"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { products, Product } from "../../../data/products";
import { useApp } from "../../../context/AppContext";
import ProductCard from "../../../components/ProductCard";
import { Star, ShieldCheck, ShoppingBag, CreditCard, ChevronRight, Plus, Minus } from "lucide-react";
import { motion } from "framer-motion";

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { addToCart } = useApp();

  const id = params.id as string;
  const product = products.find((p) => p.id === id);

  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [zoomStyle, setZoomStyle] = useState<React.CSSProperties>({ transform: "scale(1)" });

  // Reset states when ID changes
  useEffect(() => {
    setActiveImageIdx(0);
    setQuantity(1);
  }, [id]);

  if (!product) {
    return (
      <div className="pt-32 text-center py-20 min-h-screen flex flex-col justify-center items-center">
        <span className="text-4xl">🍂</span>
        <h3 className="font-playfair text-2xl font-bold mt-2">Formulation Not Found</h3>
        <button
          onClick={() => router.push("/products")}
          className="mt-4 px-6 py-2.5 bg-primary text-white rounded-full font-poppins text-xs font-semibold uppercase tracking-wider"
        >
          Back to collection
        </button>
      </div>
    );
  }

  // Related products (excluding active one)
  const relatedProducts = products
    .filter((p) => p.id !== product.id)
    .slice(0, 3);

  // Zoom logic
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomStyle({
      transformOrigin: `${x}% ${y}%`,
      transform: "scale(1.5)",
    });
  };

  const handleMouseLeave = () => {
    setZoomStyle({ transform: "scale(1)" });
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    router.push("/checkout");
  };

  return (
    <div className="pt-28 pb-16 min-h-screen">
      {/* Route trace navigation */}
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center space-x-2 text-xs font-poppins text-textCustom/50 dark:text-lightMint/50">
        <span className="cursor-pointer hover:text-primary dark:hover:text-accent" onClick={() => router.push("/")}>Home</span>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="cursor-pointer hover:text-primary dark:hover:text-accent" onClick={() => router.push("/products")}>Products</span>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-textCustom dark:text-white truncate max-w-[150px]">{product.name}</span>
      </div>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 mt-4">
        {/* Left Column: Premium Gallery */}
        <div className="space-y-4">
          <div
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="relative aspect-square w-full rounded-2xl overflow-hidden bg-neutral-100 border border-black/5 dark:border-white/5 cursor-zoom-in"
          >
            <img
              src={product.gallery[activeImageIdx] || product.imgUrl}
              alt={product.name}
              style={zoomStyle}
              className="w-full h-full object-cover transition-transform duration-100 ease-out"
            />
            {product.organic && (
              <span className="absolute top-5 left-5 bg-white/95 dark:bg-black/90 text-primary dark:text-accent text-[9px] font-poppins font-bold uppercase tracking-widest px-3 py-1.5 rounded-full select-none shadow">
                100% Organic
              </span>
            )}
          </div>

          {/* Thumbnails row */}
          {product.gallery.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2 select-none">
              {product.gallery.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIdx(idx)}
                  className={`w-20 h-20 rounded-xl overflow-hidden border-2 shrink-0 bg-neutral-100 transition-all ${
                    activeImageIdx === idx ? "border-primary dark:border-accent" : "border-transparent opacity-75 hover:opacity-100"
                  }`}
                >
                  <img src={img} alt="Thumbnail review" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Information Curation */}
        <div className="flex flex-col justify-start space-y-6">
          <div className="space-y-2.5">
            <span className="text-xs uppercase tracking-[0.25em] font-poppins text-accent font-semibold bg-primary/5 dark:bg-accent/15 px-3 py-1 rounded-md inline-block">
              {product.skinType}
            </span>
            <h1 className="text-3xl md:text-5xl font-playfair font-bold text-textCustom dark:text-white leading-tight">
              {product.name}
            </h1>
            <p className="text-sm md:text-base font-inter italic text-primary dark:text-accent font-medium">
              {product.tagline}
            </p>
          </div>

          {/* Rating */}
          <div className="flex items-center space-x-2 text-xs md:text-sm font-inter text-textCustom/60 dark:text-lightMint/60 select-none pb-4 border-b border-black/5 dark:border-white/5">
            <div className="flex items-center space-x-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(product.rating)
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-neutral-300 dark:text-neutral-600"
                  }`}
                />
              ))}
            </div>
            <span className="font-poppins font-bold text-textCustom dark:text-white">{product.rating}</span>
            <span>({product.reviewsCount} verified reviews)</span>
          </div>

          {/* Pricing */}
          <div className="flex items-baseline space-x-4 my-2">
            <span className="font-poppins text-3xl font-bold text-primary dark:text-accent">
              ₹{product.offerPrice}
            </span>
            <span className="font-poppins text-base text-textCustom/40 line-through dark:text-lightMint/30">
              ₹{product.originalPrice}
            </span>
          </div>

          {/* Description */}
          <p className="font-inter text-sm text-textCustom/70 dark:text-lightMint/70 leading-relaxed">
            {product.description}
          </p>

          {/* Select quantity & Action CTAs */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 py-4 border-y border-black/5 dark:border-white/5">
            {/* Quantity Selector */}
            <div className="flex items-center border border-black/10 dark:border-white/10 rounded-xl bg-white dark:bg-black/20 self-start sm:self-auto h-12">
              <button
                onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                className="px-4 text-textCustom/60 dark:text-lightMint/70 hover:text-primary dark:hover:text-white transition-colors h-full flex items-center cursor-pointer"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="font-poppins text-sm font-semibold text-textCustom dark:text-white w-10 text-center select-none">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity((prev) => prev + 1)}
                className="px-4 text-textCustom/60 dark:text-lightMint/70 hover:text-primary dark:hover:text-white transition-colors h-full flex items-center cursor-pointer"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            {/* CTAs */}
            <div className="flex-1 grid grid-cols-2 gap-3 h-12">
              <button
                onClick={() => addToCart(product, quantity)}
                className="h-full bg-white dark:bg-black/20 border border-primary/20 dark:border-white/10 text-primary dark:text-lightMint font-poppins text-xs font-semibold uppercase tracking-widest rounded-xl transition-all duration-300 hover:bg-neutral-50 dark:hover:bg-white/5 flex items-center justify-center space-x-2 cursor-pointer"
              >
                <ShoppingBag className="w-4.5 h-4.5" />
                <span>Add to Bag</span>
              </button>
              <button
                onClick={handleBuyNow}
                className="h-full bg-primary dark:bg-accent text-white dark:text-primary font-poppins text-xs font-semibold uppercase tracking-widest rounded-xl transition-all duration-300 hover:opacity-90 flex items-center justify-center space-x-2 cursor-pointer shadow-md"
              >
                <CreditCard className="w-4.5 h-4.5" />
                <span>Buy Now</span>
              </button>
            </div>
          </div>

          {/* Ingredients & Benefits details accordion */}
          <div className="space-y-6 pt-4">
            <div className="space-y-2">
              <h4 className="font-poppins text-xs font-bold text-textCustom dark:text-white uppercase tracking-wider">
                Benefits
              </h4>
              <ul className="text-xs text-textCustom/65 dark:text-lightMint/65 space-y-1.5 font-inter">
                {product.benefits.map((benefit, i) => (
                  <li key={i} className="flex items-start space-x-2">
                    <span className="text-accent shrink-0 font-bold">✓</span>
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-black/5 dark:border-white/5">
              <div className="space-y-2">
                <h4 className="font-poppins text-xs font-bold text-textCustom dark:text-white uppercase tracking-wider">
                  Pure Active Ingredients
                </h4>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {product.ingredients.map((ing, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 bg-black/5 dark:bg-white/5 text-[10px] font-inter text-textCustom/75 dark:text-lightMint/75 rounded-md border border-black/[0.03] dark:border-white/[0.03]"
                    >
                      {ing}
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-poppins text-xs font-bold text-textCustom dark:text-white uppercase tracking-wider">
                  Application Routine
                </h4>
                <ol className="text-xs text-textCustom/65 dark:text-lightMint/65 space-y-1.5 font-inter list-decimal pl-4">
                  {product.usage.map((step, i) => (
                    <li key={i}>{step}</li>
                  ))}
                </ol>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Reviews Section */}
      <section className="max-w-7xl mx-auto px-6 mt-20 pt-16 border-t border-black/5 dark:border-white/5">
        <h3 className="font-playfair text-2xl md:text-3xl font-bold text-textCustom dark:text-white mb-8">
          Client Feedback ({product.reviews.length})
        </h3>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {product.reviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-white/40 dark:bg-white/5 border border-black/5 dark:border-white/5 p-6 rounded-2xl space-y-3.5 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <h5 className="font-poppins text-xs font-bold text-textCustom dark:text-white">
                  {rev.author}
                </h5>
                <span className="text-[10px] font-inter text-textCustom/40 dark:text-lightMint/30">
                  {rev.date}
                </span>
              </div>
              <div className="flex items-center space-x-0.5">
                {Array.from({ length: rev.rating }).map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="font-inter text-xs text-textCustom/70 dark:text-lightMint/70 leading-relaxed italic">
                "{rev.comment}"
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Related Products Grid */}
      <section className="max-w-7xl mx-auto px-6 mt-20 pt-16 border-t border-black/5 dark:border-white/5">
        <h3 className="font-playfair text-2xl md:text-3xl font-bold text-textCustom dark:text-white mb-10 text-center">
          Complementary Formulations
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {relatedProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

    </div>
  );
}

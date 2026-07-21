"use client";

import { useState, useMemo } from "react";
import { products, Product } from "../../data/products";
import ProductCard from "../../components/ProductCard";

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedSort, setSelectedSort] = useState("default");

  // Filters mapping
  const filterCategory = (product: Product) => {
    if (selectedCategory === "all") return true;
    if (selectedCategory === "hair-oral") {
      return product.id.includes("shampoo") || product.id.includes("toothpaste");
    }
    if (selectedCategory === "skincare") {
      return product.id.includes("cream") || product.id.includes("goti");
    }
    if (selectedCategory === "wellness") {
      return product.id.includes("drops");
    }
    return true;
  };

  // Sort values
  const sortedProducts = useMemo(() => {
    const list = [...products].filter(filterCategory);
    if (selectedSort === "price-asc") {
      return list.sort((a, b) => a.offerPrice - b.offerPrice);
    }
    if (selectedSort === "price-desc") {
      return list.sort((a, b) => b.offerPrice - a.offerPrice);
    }
    if (selectedSort === "rating-desc") {
      return list.sort((a, b) => b.rating - a.rating);
    }
    return list; // default config
  }, [selectedCategory, selectedSort]);

  return (
    <div className="pt-24 min-h-screen flex flex-col">
      {/* Banner */}
      <section className="relative h-[25vh] min-h-[200px] flex items-center justify-center bg-lightMint/80 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/hero/pexels-enginakyurt-4531546.jpg"
            alt="Products catalog background"
            className="w-full h-full object-cover opacity-15 mix-blend-luminosity"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-backgroundCustom via-backgroundCustom/50 to-transparent z-0" />
        
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center text-primary space-y-2">
          <h1 className="text-3xl md:text-5xl font-playfair font-bold">
            The Botanical Cellars
          </h1>
          <p className="text-xs font-inter text-secondary/70 select-none">
            Home / Products
          </p>
        </div>
      </section>

      {/* Grid Content */}
      <section className="max-w-7xl mx-auto px-6 py-12 md:py-16 w-full space-y-10">
        
        {/* Sorting & Filter controls */}
        <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-black/5 dark:border-white/5 pb-6 space-y-4 md:space-y-0">
          {/* Categories */}
          <div className="flex flex-wrap gap-2.5">
            {[
              { id: "all", label: "All Formulations" },
              { id: "hair-oral", label: "Hair & Oral Care" },
              { id: "skincare", label: "Skincare & Goti" },
              { id: "wellness", label: "Wellness & Drops" }
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-5 py-2 rounded-full font-poppins text-xs font-semibold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                  selectedCategory === cat.id
                    ? "bg-primary dark:bg-accent text-white dark:text-primary"
                    : "bg-black/5 dark:bg-white/5 text-textCustom/75 dark:text-lightMint/75 hover:bg-black/10 dark:hover:bg-white/10"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Sorter */}
          <div className="flex items-center space-x-3">
            <label htmlFor="sort-select" className="text-xs font-poppins font-bold uppercase tracking-wider text-textCustom/55 dark:text-lightMint/55 shrink-0">
              Sort By:
            </label>
            <select
              id="sort-select"
              value={selectedSort}
              onChange={(e) => setSelectedSort(e.target.value)}
              className="bg-transparent border border-black/10 dark:border-white/10 text-xs px-4 py-2 font-poppins font-bold uppercase rounded-lg text-textCustom dark:text-white focus:outline-none focus:border-primary dark:focus:border-accent cursor-pointer"
            >
              <option value="default" className="text-black bg-white dark:text-white dark:bg-primary">Default Curation</option>
              <option value="price-asc" className="text-black bg-white dark:text-white dark:bg-primary">Price: Low to High</option>
              <option value="price-desc" className="text-black bg-white dark:text-white dark:bg-primary">Price: High to Low</option>
              <option value="rating-desc" className="text-black bg-white dark:text-white dark:bg-primary">Rank: Top Rated</option>
            </select>
          </div>
        </div>

        {/* Dynamic products list grid */}
        {sortedProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sortedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <span className="text-4xl block mb-4">🍂</span>
            <h3 className="font-playfair text-xl font-bold">No formulations found</h3>
            <p className="text-sm text-textCustom/60 dark:text-lightMint/60 mt-1">
              Try selection of different category tabs.
            </p>
          </div>
        )}

      </section>
    </div>
  );
}

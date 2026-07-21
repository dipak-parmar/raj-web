"use client";

import { motion } from "framer-motion";
import { ArrowRight, Compass } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-primary flex flex-col items-center justify-center text-center p-6 relative overflow-hidden select-none">
      
      {/* Decorative ambient blurred backing */}
      <div className="absolute top-[40%] left-[50%] -translate-x-[50%] -translate-y-[50%] w-[450px] h-[450px] bg-accent/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Main 404 message box */}
      <div className="relative z-10 space-y-6 max-w-md">
        
        {/* Animated Icon */}
        <motion.div
          initial={{ rotate: -15, scale: 0.9, opacity: 0 }}
          animate={{ rotate: 0, scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-20 h-20 bg-accent/10 border border-accent/20 rounded-full flex items-center justify-center mx-auto text-accent shadow-lg"
        >
          <Compass className="w-10 h-10 animate-[spin_12s_linear_infinite]" />
        </motion.div>

        {/* Brand Translation */}
        <span className="text-[10px] uppercase tracking-[0.3em] font-poppins text-accent font-semibold block">
          Raj Marketing / Error 404
        </span>

        {/* Translation Alert heading */}
        <h1 className="text-4xl md:text-5xl font-playfair font-bold text-white leading-tight">
          Formulation Not Found
        </h1>

        {/* Explanation text */}
        <p className="font-inter text-xs text-lightMint/60 leading-relaxed max-w-sm mx-auto">
          The signature collection, brochure, or page pointer you have requested does not exist or has been archived. Check your connection syntax or return to our catalog directories.
        </p>

        {/* Navigation Action CTA */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Link
            href="/products"
            className="inline-flex items-center space-x-2 px-8 py-3.5 bg-accent text-primary dark:text-primary font-poppins text-xs font-semibold uppercase tracking-wider rounded-xl hover:opacity-90 transition-opacity cursor-pointer shadow-lg"
          >
            <span>Browse Products Collection</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>

      {/* Decorative brand footer signature */}
      <p className="absolute bottom-8 left-0 right-0 text-[9px] uppercase tracking-widest text-lightMint/30 font-inter">
        ESTABLISHED SINCE 2004
      </p>
    </div>
  );
}

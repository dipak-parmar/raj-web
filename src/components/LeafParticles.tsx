"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
}

interface Leaf {
  id: number;
  x: number;
  y: number;
  size: number;
  rotation: number;
  duration: number;
  delay: number;
  curve: number;
}

export default function LeafParticles() {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [leaves, setLeaves] = useState<Leaf[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Generate 12 ambient particles
    const generatedParticles: Particle[] = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      x: Math.random() * 100, // percentage x-axis
      y: Math.random() * 100, // percentage y-axis
      size: Math.random() * 4 + 2, // 2px to 6px
      duration: Math.random() * 20 + 20, // 20s to 40s
      delay: Math.random() * -10, // negative delay to start immediately
    }));

    // Generate 8 floating leaf illustrations
    const generatedLeaves: Leaf[] = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 20 + 15, // 15px to 35px
      rotation: Math.random() * 360,
      duration: Math.random() * 25 + 25, // 25s to 50s
      delay: Math.random() * -15,
      curve: Math.random() * 40 - 20, // drift amount
    }));

    setParticles(generatedParticles);
    setLeaves(generatedLeaves);
  }, []);

  if (!mounted) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* Organic Glowing Soft Particles */}
      {particles.map((p) => (
        <motion.div
          key={`part-${p.id}`}
          className="absolute rounded-full bg-accent/20 dark:bg-lightMint/5 blur-[1px]"
          style={{
            left: `${p.x}%`,
            width: p.size,
            height: p.size,
          }}
          animate={{
            y: ["105vh", "-5vh"],
            x: [`${p.x}%`, `${p.x + (Math.random() * 10 - 5)}%`],
            opacity: [0, 0.7, 0.7, 0],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "linear",
          }}
        />
      ))}

      {/* Floating 3D/Organic Leaves */}
      {leaves.map((l) => (
        <motion.div
          key={`leaf-${l.id}`}
          className="absolute text-accent/15 dark:text-lightMint/5 flex items-center justify-center"
          style={{
            left: `${l.x}%`,
            width: l.size,
            height: l.size,
          }}
          animate={{
            y: ["105vh", "-10vh"],
            x: [
              `${l.x}%`,
              `${l.x + l.curve}%`,
              `${l.x - l.curve}%`,
              `${l.x}%`,
            ],
            rotate: [l.rotation, l.rotation + 360],
            opacity: [0, 0.4, 0.4, 0],
          }}
          transition={{
            duration: l.duration,
            repeat: Infinity,
            delay: l.delay,
            ease: "easeInOut",
          }}
        >
          {/* Custom Minimalist Clean SVG Leaf Path */}
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-full h-full transform skew-x-3"
          >
            <path d="M17,8C8,10 5.9,16.17 3.82,21.34L2.18,20.66C4.26,15.49 6.84,8.5 17,6.5V2C17,2 22,7 22,8C22,9 17,14 17,14V8Z" />
          </svg>
        </motion.div>
      ))}

      {/* Background Soft Moving Gradients */}
      <div className="absolute top-1/4 left-1/10 w-[50vw] h-[50vh] bg-accent/5 dark:bg-accent/2 rounded-full blur-[160px] animate-pulse-slow" />
      <div className="absolute bottom-1/4 right-1/10 w-[45vw] h-[45vh] bg-lightMint/10 dark:bg-lightMint/1 rounded-full blur-[140px] animate-pulse-slow" />
    </div>
  );
}

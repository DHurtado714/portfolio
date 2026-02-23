"use client";

import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

export function GridParallax() {
  const { scrollY } = useScroll();
  const shouldReduceMotion = useReducedMotion();
  const y = useTransform(scrollY, [0, 3000], [0, -120]);

  return (
    <motion.div
      className="fixed inset-0 -z-10 opacity-[0.025]"
      style={{
        y: shouldReduceMotion ? 0 : y,
        backgroundImage:
          "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
        backgroundSize: "80px 80px",
      }}
    />
  );
}

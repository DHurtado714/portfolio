"use client";

import { type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

export function SectionHeaderEntrance({
  children,
  number,
  label,
}: {
  children?: ReactNode;
  number: string;
  label: string;
}) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return (
      <div className="mb-4 flex items-baseline gap-4">
        <span className="font-mono text-xs tracking-[2px] text-green">
          {number}
        </span>
        <span className="h-px w-8 bg-green/40" />
        <span className="font-mono text-xs uppercase tracking-[3px] text-text-muted">
          {label}
        </span>
      </div>
    );
  }

  return (
    <motion.div
      className="mb-4 flex items-baseline gap-4"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
    >
      <motion.span
        className="font-mono text-xs tracking-[2px] text-green"
        variants={{
          hidden: { opacity: 0, x: -20 },
          visible: {
            opacity: 1,
            x: 0,
            transition: { type: "spring", stiffness: 80, damping: 16 },
          },
        }}
      >
        {number}
      </motion.span>
      <motion.span
        className="h-px w-8 bg-green/40"
        variants={{
          hidden: { scaleX: 0 },
          visible: {
            scaleX: 1,
            transition: { duration: 0.5, delay: 0.15, ease: "easeOut" },
          },
        }}
        style={{ originX: 0 }}
      />
      <motion.span
        className="font-mono text-xs uppercase tracking-[3px] text-text-muted"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { duration: 0.4, delay: 0.35 },
          },
        }}
      >
        {label}
      </motion.span>
      {children}
    </motion.div>
  );
}

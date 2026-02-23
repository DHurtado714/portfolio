"use client";

import { type ReactNode } from "react";
import { motion } from "framer-motion";

export function NavEntrance({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 80, damping: 20, delay: 0.1 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

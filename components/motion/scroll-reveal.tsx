"use client";

import { type ReactNode } from "react";
import { motion, type Variants } from "framer-motion";

const directionOffset = {
  up: { y: 40 },
  down: { y: -40 },
  left: { x: 60 },
  right: { x: -60 },
} as const;

type Direction = keyof typeof directionOffset;

const variants = (direction: Direction): Variants => ({
  hidden: { opacity: 0, ...directionOffset[direction] },
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: { type: "spring", stiffness: 60, damping: 18, mass: 1 },
  },
});

export function ScrollReveal({
  children,
  direction = "up",
  className,
  delay = 0,
}: {
  children: ReactNode;
  direction?: Direction;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      variants={variants(direction)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

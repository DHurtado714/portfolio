"use client";

import { type ReactNode } from "react";
import { motion, type Variants } from "framer-motion";

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const directionOffset = {
  up: { y: 30 },
  down: { y: -30 },
  left: { x: 40 },
  right: { x: -40 },
} as const;

type Direction = keyof typeof directionOffset;

const itemVariants = (direction: Direction): Variants => ({
  hidden: { opacity: 0, ...directionOffset[direction] },
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: { type: "spring", stiffness: 70, damping: 16, mass: 0.8 },
  },
});

export function StaggerContainer({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
  direction = "up",
}: {
  children: ReactNode;
  className?: string;
  direction?: Direction;
}) {
  return (
    <motion.div variants={itemVariants(direction)} className={className}>
      {children}
    </motion.div>
  );
}

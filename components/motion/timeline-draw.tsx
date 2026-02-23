"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export function TimelineDrawLine({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 80%", "end 20%"],
  });

  const height = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div ref={ref} className={className} style={{ position: "absolute", top: 8, bottom: 8, left: 0, width: 1 }}>
      {/* Background track */}
      <div className="absolute inset-0 bg-border-subtle" />
      {/* Animated fill */}
      <motion.div
        className="absolute top-0 left-0 w-full bg-gradient-to-b from-green to-green/30"
        style={{ height, opacity }}
      />
    </div>
  );
}

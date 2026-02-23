"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion, useInView } from "framer-motion";
import { useRef } from "react";

export function Typewriter({
  text,
  speed = 40,
  className,
  startDelay = 0,
}: {
  text: string;
  speed?: number;
  className?: string;
  startDelay?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const shouldReduceMotion = useReducedMotion();
  const [displayedCount, setDisplayedCount] = useState(0);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    if (!isInView || shouldReduceMotion) {
      setDisplayedCount(text.length);
      return;
    }

    const startTimeout = setTimeout(() => {
      let i = 0;
      const interval = setInterval(() => {
        i++;
        setDisplayedCount(i);
        if (i >= text.length) {
          clearInterval(interval);
          // Hide cursor after typing completes
          setTimeout(() => setShowCursor(false), 2000);
        }
      }, speed);
      return () => clearInterval(interval);
    }, startDelay);

    return () => clearTimeout(startTimeout);
  }, [isInView, shouldReduceMotion, text, speed, startDelay]);

  return (
    <span ref={ref} className={className}>
      {text.slice(0, displayedCount)}
      {showCursor && displayedCount < text.length && (
        <motion.span
          className="inline-block w-[2px] h-[1em] bg-green align-middle ml-0.5"
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.6, repeat: Infinity, repeatType: "reverse" }}
        />
      )}
    </span>
  );
}

"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

export function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    let t: ReturnType<typeof setTimeout>;

    const dismiss = () => {
      t = setTimeout(() => setIsLoading(false), shouldReduceMotion ? 0 : 300);
    };

    if (document.readyState === "complete") {
      dismiss();
    } else {
      window.addEventListener("load", dismiss, { once: true });
      // Fallback: never hold longer than 800ms after mount
      t = setTimeout(() => setIsLoading(false), shouldReduceMotion ? 300 : 800);
    }

    return () => clearTimeout(t);
  }, [shouldReduceMotion]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#050505]"
          exit={{
            opacity: 0,
            transition: { duration: shouldReduceMotion ? 0.1 : 0.5, ease: "easeInOut" },
          }}
        >
          <motion.div
            layoutId="site-logo"
            className="flex items-center gap-2 font-mono text-2xl font-medium"
            animate={
              shouldReduceMotion
                ? {}
                : {
                    scale: [1, 1.05, 1],
                    transition: {
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    },
                  }
            }
          >
            <span className="text-green opacity-70">{"{"}</span>
            <span>D</span>
            <span className="text-green opacity-70">{"}"}</span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

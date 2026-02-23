"use client";

import { useReducedMotion } from "framer-motion";

export function ShimmerText({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <span className={className}>{children}</span>;
  }

  return (
    <span className={`shimmer-text ${className}`}>
      {children}
    </span>
  );
}

"use client";

import { useRef, useEffect, useState } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";

export function CountUp({
  target,
  prefix = "",
  suffix = "",
  decimals = 0,
  className,
}: {
  target: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, { stiffness: 50, damping: 20, mass: 1 });
  const [display, setDisplay] = useState(`${prefix}0${suffix}`);

  const rounded = useTransform(spring, (v: number) => {
    return `${prefix}${v.toFixed(decimals)}${suffix}`;
  });

  useEffect(() => {
    const unsubscribe = rounded.on("change", (v) => setDisplay(v));
    return unsubscribe;
  }, [rounded]);

  useEffect(() => {
    if (isInView) {
      motionValue.set(target);
    }
  }, [isInView, motionValue, target]);

  return (
    <motion.span ref={ref} className={className}>
      {display}
    </motion.span>
  );
}

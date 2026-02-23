"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export function NavLogo() {
  return (
    <Link
      href="#"
      className="flex items-center gap-2 font-mono text-sm font-medium"
    >
      <motion.span layoutId="site-logo" className="flex items-center gap-2">
        <span className="text-green opacity-70">{"{"}</span>D
        <span className="text-green opacity-70">{"}"}</span>
      </motion.span>
    </Link>
  );
}

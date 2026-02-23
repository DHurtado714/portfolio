"use client";

import { type ReactNode } from "react";
import { LayoutGroup as FramerLayoutGroup } from "framer-motion";

export function LayoutGroup({ children }: { children: ReactNode }) {
  return <FramerLayoutGroup>{children}</FramerLayoutGroup>;
}

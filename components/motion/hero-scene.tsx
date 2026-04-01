"use client";

import dynamic from "next/dynamic";

const TorusKnotScene = dynamic(
  () => import("@/components/motion/torus-knot-scene").then((m) => m.TorusKnotScene),
  { ssr: false }
);

export function HeroScene() {
  return <TorusKnotScene />;
}

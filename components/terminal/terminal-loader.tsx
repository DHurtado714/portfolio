"use client";

import dynamic from "next/dynamic";

const TerminalWidget = dynamic(
  () =>
    import("@/components/terminal/terminal-widget").then(
      (mod) => mod.TerminalWidget
    ),
  { ssr: false }
);

export function TerminalLoader() {
  return <TerminalWidget />;
}

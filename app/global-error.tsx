"use client";

import { useEffect } from "react";
import { Syne, JetBrains_Mono, DM_Sans } from "next/font/google";
import { ErrorScene } from "@/components/error-pages/error-scene";
import "./globals.css";

const syne = Syne({ variable: "--font-syne", subsets: ["latin"], display: "swap" });
const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});
const dmSans = DM_Sans({ variable: "--font-dm-sans", subsets: ["latin"], display: "swap" });

/**
 * Fallback for errors thrown in the root layout itself. It replaces the whole
 * document, so it must render its own <html>/<body> and reload the fonts.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en" className="dark">
      <body
        className={`${syne.variable} ${jetbrainsMono.variable} ${dmSans.variable} antialiased`}
      >
        <ErrorScene variant="500" onRetry={reset} />
      </body>
    </html>
  );
}

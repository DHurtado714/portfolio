import type { Metadata } from "next";
import { ErrorScene } from "@/components/error-pages/error-scene";

export const metadata: Metadata = {
  title: "404 — Route not found",
  robots: { index: false, follow: false },
};

export default function LocaleNotFound() {
  return <ErrorScene variant="404" />;
}

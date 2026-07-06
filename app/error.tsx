"use client";

import { useEffect } from "react";
import { ErrorScene } from "@/components/error-pages/error-scene";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Surface the error for observability (PostHog/console).
    console.error(error);
  }, [error]);

  return <ErrorScene variant="500" onRetry={reset} />;
}

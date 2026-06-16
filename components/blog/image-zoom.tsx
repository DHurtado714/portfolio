"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { X } from "lucide-react";

// ImageZoom is rendered deep in MDX without locale context, so aria-labels
// default to English constants. The matching i18n keys (blog.zoomImage /
// blog.closeZoom) live in lib/i18n.ts for future use if locale is threaded.
const ZOOM_LABEL = "Zoom image";
const CLOSE_LABEL = "Close";

type ImageZoomProps = {
  children: React.ReactNode;
  enabled?: boolean;
};

export function ImageZoom({ children, enabled = true }: ImageZoomProps) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const titleId = useId();

  const close = useCallback(() => {
    setOpen(false);
  }, []);

  // Esc to close + body scroll lock while open.
  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        close();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, close]);

  // Move focus to the close button on open, return to trigger on close.
  useEffect(() => {
    if (open) {
      closeRef.current?.focus();
    } else {
      triggerRef.current?.focus();
    }
  }, [open]);

  if (!enabled) {
    return <>{children}</>;
  }

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        aria-label={ZOOM_LABEL}
        onClick={() => setOpen(true)}
        className="block w-full cursor-zoom-in border-none bg-transparent p-0 text-left"
      >
        {children}
      </button>

      {open ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={ZOOM_LABEL}
          aria-labelledby={titleId}
          onClick={close}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4"
        >
          <span id={titleId} className="sr-only">
            {ZOOM_LABEL}
          </span>
          <button
            ref={closeRef}
            type="button"
            aria-label={CLOSE_LABEL}
            onClick={close}
            className="absolute right-4 top-4 z-[101] flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
          <div
            onClick={(event) => event.stopPropagation()}
            className="max-h-[90vh] max-w-[90vw] overflow-auto [&_img]:h-auto [&_img]:max-h-[90vh] [&_img]:w-auto [&_img]:max-w-[90vw]"
          >
            {children}
          </div>
        </div>
      ) : null}
    </>
  );
}

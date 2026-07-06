"use client";

import {
  CircleCheckIcon,
  InfoIcon,
  Loader2Icon,
  OctagonXIcon,
  TriangleAlertIcon,
} from "lucide-react";
import { Toaster as Sonner, type ToasterProps } from "sonner";

// Dark-only site (see <html className="dark">), so the theme is hardcoded
// rather than pulled from next-themes.
const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      theme="dark"
      className="toaster group"
      icons={{
        success: <CircleCheckIcon className="size-4 text-green" />,
        info: <InfoIcon className="size-4" />,
        warning: <TriangleAlertIcon className="size-4" />,
        error: <OctagonXIcon className="size-4" />,
        loading: <Loader2Icon className="size-4 animate-spin" />,
      }}
      style={
        {
          "--normal-bg": "var(--color-surface-elevated)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--color-border-hover)",
          "--border-radius": "var(--radius)",
          fontFamily: "var(--font-jetbrains-mono)",
        } as React.CSSProperties
      }
      {...props}
    />
  );
};

export { Toaster };

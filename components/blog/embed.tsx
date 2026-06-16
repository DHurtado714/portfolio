"use client";

import { useState } from "react";

type EmbedType = "youtube" | "tweet" | "pdf" | "iframe";

interface EmbedProps {
  type: EmbedType;
  src: string;
  title?: string;
  ratio?: string;
}

const labels = {
  youtubeFallback: "YouTube video",
  play: "Play video",
  openTweet: "View on X",
  openPdf: "Open PDF",
  embeddedContent: "Embedded content",
};

function parseYouTubeId(src: string): string {
  const trimmed = src.trim();
  // Bare id (no slashes, no dots) — treat as id directly.
  if (!/[/.]/.test(trimmed)) return trimmed;
  try {
    const url = new URL(trimmed);
    const host = url.hostname.replace(/^www\./, "");
    if (host === "youtu.be") {
      return url.pathname.slice(1).split("/")[0] || trimmed;
    }
    if (host.endsWith("youtube.com") || host.endsWith("youtube-nocookie.com")) {
      if (url.pathname.startsWith("/embed/")) {
        return url.pathname.split("/")[2] || trimmed;
      }
      const v = url.searchParams.get("v");
      if (v) return v;
    }
  } catch {
    // Not a parseable URL — fall through and return as-is.
  }
  return trimmed;
}

function AspectBox({
  ratio,
  children,
}: {
  ratio: string;
  children: React.ReactNode;
}) {
  return (
    <div
      style={{ aspectRatio: ratio }}
      className="relative my-8 w-full overflow-hidden rounded-xl border border-border-subtle"
    >
      {children}
    </div>
  );
}

function YouTubeEmbed({
  src,
  title,
  ratio,
}: {
  src: string;
  title?: string;
  ratio: string;
}) {
  const [loaded, setLoaded] = useState(false);
  const id = parseYouTubeId(src);
  const label = title ?? labels.youtubeFallback;

  return (
    <AspectBox ratio={ratio}>
      {loaded ? (
        <iframe
          className="absolute inset-0 h-full w-full"
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1`}
          title={label}
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <button
          type="button"
          onClick={() => setLoaded(true)}
          aria-label={label}
          className="group absolute inset-0 h-full w-full cursor-pointer"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`}
            alt={label}
            className="absolute inset-0 h-full w-full object-cover"
          />
          <span className="absolute inset-0 bg-black/30 transition-colors group-hover:bg-black/20" />
          <span className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-black/70 transition-colors group-hover:bg-green/90">
            <svg
              viewBox="0 0 24 24"
              className="h-7 w-7 translate-x-0.5 fill-white"
              aria-hidden="true"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
        </button>
      )}
    </AspectBox>
  );
}

function TweetEmbed({ src, title }: { src: string; title?: string }) {
  return (
    <blockquote className="my-8 rounded-xl border border-border-subtle bg-surface p-5">
      <div className="mb-3 font-mono text-[13px] uppercase tracking-[2px] text-text-muted">
        {title ?? "X / Tweet"}
      </div>
      <a
        href={src}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 break-all text-green underline decoration-green/30 underline-offset-4 transition-colors hover:decoration-green"
      >
        <span>{src}</span>
        <svg
          viewBox="0 0 24 24"
          className="h-4 w-4 shrink-0 fill-none stroke-current"
          strokeWidth="2"
          aria-hidden="true"
        >
          <path d="M7 17 17 7M9 7h8v8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span className="sr-only">{labels.openTweet}</span>
      </a>
    </blockquote>
  );
}

function PdfEmbed({
  src,
  title,
  ratio,
}: {
  src: string;
  title?: string;
  ratio: string;
}) {
  return (
    <div className="my-8">
      <div
        style={{ aspectRatio: ratio }}
        className="relative w-full overflow-hidden rounded-xl border border-border-subtle"
      >
        <iframe
          className="absolute inset-0 h-full w-full"
          src={src}
          title={title ?? labels.embeddedContent}
          loading="lazy"
        />
      </div>
      <a
        href={src}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-2 inline-flex items-center gap-2 font-mono text-[13px] uppercase tracking-[2px] text-text-muted transition-colors hover:text-green"
      >
        {labels.openPdf}
        <svg
          viewBox="0 0 24 24"
          className="h-4 w-4 fill-none stroke-current"
          strokeWidth="2"
          aria-hidden="true"
        >
          <path d="M7 17 17 7M9 7h8v8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </a>
    </div>
  );
}

function IframeEmbed({
  src,
  title,
  ratio,
}: {
  src: string;
  title?: string;
  ratio: string;
}) {
  return (
    <AspectBox ratio={ratio}>
      <iframe
        className="absolute inset-0 h-full w-full"
        src={src}
        title={title ?? labels.embeddedContent}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      />
    </AspectBox>
  );
}

export function Embed({ type, src, title, ratio = "16/9" }: EmbedProps) {
  switch (type) {
    case "youtube":
      return <YouTubeEmbed src={src} title={title} ratio={ratio} />;
    case "tweet":
      return <TweetEmbed src={src} title={title} />;
    case "pdf":
      return <PdfEmbed src={src} title={title} ratio={ratio} />;
    case "iframe":
      return <IframeEmbed src={src} title={title} ratio={ratio} />;
    default:
      return null;
  }
}

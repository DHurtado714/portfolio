"use client";

import { useRef, useState } from "react";

type CodeBlockProps = React.HTMLAttributes<HTMLPreElement> & {
  "data-language"?: string;
};

export function CodeBlock({ children, className, ...props }: CodeBlockProps) {
  const preRef = useRef<HTMLPreElement>(null);
  const [copied, setCopied] = useState(false);

  const language = props["data-language"];
  const label = language && language !== "plaintext" ? language : null;

  const copy = async () => {
    const text = preRef.current?.textContent ?? "";
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard unavailable — no-op */
    }
  };

  return (
    <div className="group relative my-6 overflow-hidden rounded-xl border border-border-subtle">
      <div className="flex items-center justify-between border-b border-border-subtle bg-white/[0.03] px-4 py-2">
        <span className="font-mono text-[12px] uppercase tracking-[2px] text-text-muted">
          {label ?? ""}
        </span>
        <button
          type="button"
          onClick={copy}
          aria-label="Copy code"
          className="flex items-center gap-1.5 rounded-md px-2 py-1 font-mono text-[12px] text-text-muted transition-colors hover:bg-white/[0.06] hover:text-text-secondary"
        >
          {copied ? (
            <>
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-green"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span className="text-green">Copied</span>
            </>
          ) : (
            <>
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
              </svg>
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
      <pre
        ref={preRef}
        className="overflow-x-auto p-5 font-mono text-[16px] leading-[1.7]"
        {...props}
      >
        {children}
      </pre>
    </div>
  );
}

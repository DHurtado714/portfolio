"use client";

import { useEffect, useRef } from "react";

export interface HistoryEntry {
  command: string;
  result: {
    type: "text" | "html";
    content: string;
  };
}

export function TerminalOutput({ history }: { history: HistoryEntry[] }) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  return (
    <div className="flex-1 overflow-y-auto p-4 font-mono text-[14px] leading-[1.7]">
      {history.map((entry, i) => (
        <div key={i} className="mb-3">
          {entry.command && (
            <div className="flex gap-2">
              <span className="text-green">$</span>
              <span className="text-foreground">{entry.command}</span>
            </div>
          )}
          {entry.result.type === "html" ? (
            <div
              className="mt-1 whitespace-pre-wrap text-text-secondary"
              dangerouslySetInnerHTML={{ __html: entry.result.content }}
            />
          ) : (
            entry.result.content && (
              <div className="mt-1 whitespace-pre-wrap text-text-secondary">
                {entry.result.content}
              </div>
            )
          )}
        </div>
      ))}
      <div ref={bottomRef} />
    </div>
  );
}

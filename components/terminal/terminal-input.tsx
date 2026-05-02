"use client";

import { useState, useRef, useEffect, type KeyboardEvent } from "react";
import { getCompletions } from "@/lib/terminal-commands";

export function TerminalInput({
  onSubmit,
  commandHistory,
}: {
  onSubmit: (command: string) => void;
  commandHistory: string[];
}) {
  const [value, setValue] = useState("");
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSubmit(value);
      setValue("");
      setHistoryIndex(-1);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (commandHistory.length === 0) return;
      const newIndex = Math.min(historyIndex + 1, commandHistory.length - 1);
      setHistoryIndex(newIndex);
      setValue(commandHistory[commandHistory.length - 1 - newIndex]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex <= 0) {
        setHistoryIndex(-1);
        setValue("");
        return;
      }
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      setValue(commandHistory[commandHistory.length - 1 - newIndex]);
    } else if (e.key === "Tab") {
      e.preventDefault();
      const completions = getCompletions(value);
      if (completions.length === 1) {
        setValue(completions[0]);
      }
    }
  };

  return (
    <div className="flex items-center gap-2 border-t border-white/[0.06] px-4 py-3">
      <span className="font-mono text-[14px] text-green">$</span>
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        className="flex-1 bg-transparent font-mono text-[14px] text-foreground outline-none placeholder:text-text-muted"
        placeholder="Type a command..."
        autoComplete="off"
        spellCheck={false}
      />
    </div>
  );
}

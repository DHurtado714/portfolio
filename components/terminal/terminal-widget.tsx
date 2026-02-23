"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Terminal } from "lucide-react";
import { TerminalHeader } from "./terminal-header";
import { TerminalOutput, type HistoryEntry } from "./terminal-output";
import { TerminalInput } from "./terminal-input";
import { processCommand, getWelcomeBanner } from "@/lib/terminal-commands";

export function TerminalWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [history, setHistory] = useState<HistoryEntry[]>([
    { command: "", result: getWelcomeBanner() },
  ]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const shouldReduceMotion = useReducedMotion();

  const handleCommand = useCallback((input: string) => {
    const result = processCommand(input);

    if (result.content === "__CLEAR__") {
      setHistory([{ command: "", result: getWelcomeBanner() }]);
      return;
    }

    if (input.trim()) {
      setCommandHistory((prev) => [...prev, input.trim()]);
    }

    setHistory((prev) => [...prev, { command: input, result }]);
  }, []);

  const toggleOpen = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  return (
    <>
      {/* Toggle button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={shouldReduceMotion ? { opacity: 1 } : { scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            onClick={toggleOpen}
            className="fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full border border-border-subtle bg-surface shadow-lg transition-colors hover:border-green hover:bg-surface-elevated"
            aria-label="Open terminal"
          >
            <Terminal size={18} className="text-green" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Terminal panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={
              shouldReduceMotion
                ? { opacity: 0 }
                : { scale: 0.9, opacity: 0, transformOrigin: "bottom right" }
            }
            animate={{ scale: 1, opacity: 1 }}
            exit={
              shouldReduceMotion
                ? { opacity: 0 }
                : { scale: 0.9, opacity: 0, transformOrigin: "bottom right" }
            }
            transition={
              shouldReduceMotion
                ? { duration: 0.1 }
                : { type: "spring", stiffness: 300, damping: 25 }
            }
            className="fixed bottom-6 right-6 z-50 flex w-[420px] flex-col overflow-hidden rounded-xl border border-border-subtle bg-[#111111] shadow-2xl max-md:bottom-0 max-md:right-0 max-md:left-0 max-md:w-full max-md:rounded-b-none max-md:rounded-t-xl"
            style={{ height: "360px" }}
          >
            <TerminalHeader onClose={toggleOpen} />
            <TerminalOutput history={history} />
            <TerminalInput
              onSubmit={handleCommand}
              commandHistory={commandHistory}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

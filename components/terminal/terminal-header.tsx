import { X } from "lucide-react";

export function TerminalHeader({ onClose }: { onClose: () => void }) {
  return (
    <div className="flex items-center justify-between border-b border-white/[0.06] bg-[#1A1A1A] px-4 py-2.5">
      <div className="flex items-center gap-2">
        <div className="flex gap-1.5">
          <button
            onClick={onClose}
            className="h-3 w-3 rounded-full bg-[#FF5F57] transition-opacity hover:opacity-80"
            aria-label="Close terminal"
          />
          <div className="h-3 w-3 rounded-full bg-[#FEBC2E]" />
          <div className="h-3 w-3 rounded-full bg-[#28C840]" />
        </div>
      </div>
      <span className="font-mono text-[11px] text-text-muted">
        daniel@portfolio ~ $
      </span>
      <button
        onClick={onClose}
        className="text-text-muted transition-colors hover:text-foreground"
        aria-label="Close terminal"
      >
        <X size={14} />
      </button>
    </div>
  );
}

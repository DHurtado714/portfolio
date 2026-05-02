"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import type { DiagramNode } from "@/lib/architecture-data";

export function DiagramTooltip({
  node,
  position,
}: {
  node: DiagramNode | null;
  position: { x: number; y: number };
}) {
  return (
    <AnimatePresence>
      {node && (
        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 4 }}
          transition={{ duration: 0.15 }}
          className="pointer-events-none absolute z-10 w-[280px] rounded-xl border border-border-subtle bg-surface-elevated p-4 shadow-xl"
          style={{
            left: position.x,
            top: position.y,
          }}
        >
          <h4 className="mb-1 font-heading text-sm font-bold">{node.label}</h4>
          <p className="mb-3 text-[14px] leading-[1.6] text-text-secondary">
            {node.role}
          </p>
          {node.challenge && (
            <p className="mb-3 text-[13px] leading-[1.6] text-green/80">
              Challenge: {node.challenge}
            </p>
          )}
          <div className="flex flex-wrap gap-1">
            {node.tech.map((t) => (
              <Badge
                key={t}
                variant="outline"
                className="rounded-md border-border-subtle bg-white/[0.04] px-2 py-0.5 font-mono font-normal text-[11px] tracking-[0.5px] text-text-muted"
              >
                {t}
              </Badge>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

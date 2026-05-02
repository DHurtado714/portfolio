"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ChevronDown } from "lucide-react";
import { diagramNodes } from "@/lib/architecture-data";
import { StaggerContainer, StaggerItem } from "@/components/motion/stagger";

export function DiagramMobile() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <StaggerContainer className="flex flex-col gap-3">
      {diagramNodes.map((node, i) => (
        <StaggerItem key={node.id}>
          <Card
            className="cursor-pointer overflow-hidden rounded-[16px] border-border-subtle bg-surface p-0 gap-0 shadow-none transition-colors hover:border-green/20"
            onClick={() =>
              setExpandedId(expandedId === node.id ? null : node.id)
            }
          >
            <div className="flex items-center justify-between p-5">
              <div className="flex items-center gap-3">
                <span className="flex h-7 w-7 items-center justify-center rounded-md bg-green/10 font-mono text-[13px] text-green">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-heading text-[17px] font-bold">
                  {node.label}
                </span>
              </div>
              <motion.div
                animate={{ rotate: expandedId === node.id ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronDown size={16} className="text-text-muted" />
              </motion.div>
            </div>

            <AnimatePresence>
              {expandedId === node.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="border-t border-border-subtle px-5 pt-4 pb-5">
                    <p className="mb-3 text-[15px] leading-[1.6] text-text-secondary">
                      {node.role}
                    </p>
                    {node.challenge && (
                      <p className="mb-3 text-[13px] leading-[1.6] text-green/80">
                        Challenge: {node.challenge}
                      </p>
                    )}
                    <div className="flex flex-wrap gap-1.5">
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
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </Card>

          {/* Arrow between cards */}
          {i < diagramNodes.length - 1 && (
            <div className="flex justify-center py-1">
              <div className="h-4 w-px bg-border-subtle" />
            </div>
          )}
        </StaggerItem>
      ))}
    </StaggerContainer>
  );
}

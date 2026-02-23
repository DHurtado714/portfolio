"use client";

import { useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { contributionDays } from "@/lib/github-data";

const LEVEL_COLORS = [
  "bg-surface-elevated",
  "bg-green/20",
  "bg-green/40",
  "bg-green/65",
  "bg-green",
];

const DAY_LABELS = ["", "Mon", "", "Wed", "", "Fri", ""];

export function ContributionGraph() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const shouldReduceMotion = useReducedMotion();
  const [hoveredDay, setHoveredDay] = useState<{
    date: string;
    count: number;
    x: number;
    y: number;
  } | null>(null);

  // Organize days into weeks (columns) of 7 days each
  const weeks: (typeof contributionDays)[] = [];
  for (let i = 0; i < contributionDays.length; i += 7) {
    weeks.push(contributionDays.slice(i, i + 7));
  }

  // Generate month labels
  const monthLabels: { label: string; col: number }[] = [];
  let lastMonth = "";
  weeks.forEach((week, colIndex) => {
    if (week[0]) {
      const date = new Date(week[0].date);
      const month = date.toLocaleString("en", { month: "short" });
      if (month !== lastMonth) {
        monthLabels.push({ label: month, col: colIndex });
        lastMonth = month;
      }
    }
  });

  return (
    <div ref={ref} className="relative overflow-x-auto">
      {/* Month labels */}
      <div className="mb-2 flex pl-8">
        {monthLabels.map((m, i) => (
          <span
            key={`${m.label}-${i}`}
            className="font-mono text-[10px] text-text-muted"
            style={{
              position: "absolute",
              left: `${m.col * 16 + 32}px`,
            }}
          >
            {m.label}
          </span>
        ))}
      </div>

      <div className="mt-6 flex gap-0.5">
        {/* Day labels */}
        <div className="flex flex-col gap-0.5 pr-2 pt-0">
          {DAY_LABELS.map((label, i) => (
            <div
              key={i}
              className="flex h-[13px] items-center font-mono text-[9px] text-text-muted"
            >
              {label}
            </div>
          ))}
        </div>

        {/* Grid */}
        {weeks.map((week, colIndex) => (
          <div key={colIndex} className="flex flex-col gap-0.5">
            {week.map((day, rowIndex) => {
              const flatIndex = colIndex * 7 + rowIndex;
              return (
                <motion.div
                  key={day.date}
                  className={`h-[13px] w-[13px] rounded-sm ${LEVEL_COLORS[day.level]} cursor-pointer transition-colors hover:ring-1 hover:ring-green/50`}
                  initial={
                    shouldReduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0 }
                  }
                  animate={
                    isInView
                      ? { opacity: 1, scale: 1 }
                      : shouldReduceMotion
                        ? { opacity: 1 }
                        : { opacity: 0, scale: 0 }
                  }
                  transition={
                    shouldReduceMotion
                      ? { duration: 0 }
                      : {
                          delay: colIndex * 0.02,
                          duration: 0.2,
                        }
                  }
                  onMouseEnter={(e) => {
                    const rect = (
                      e.target as HTMLElement
                    ).getBoundingClientRect();
                    const parentRect =
                      ref.current?.getBoundingClientRect();
                    if (parentRect) {
                      setHoveredDay({
                        date: day.date,
                        count: day.count,
                        x: rect.left - parentRect.left + 6,
                        y: rect.top - parentRect.top - 32,
                      });
                    }
                  }}
                  onMouseLeave={() => setHoveredDay(null)}
                />
              );
            })}
          </div>
        ))}
      </div>

      {/* Tooltip */}
      {hoveredDay && (
        <div
          className="pointer-events-none absolute z-10 rounded-md bg-surface-elevated px-2.5 py-1.5 font-mono text-[10px] text-text-secondary shadow-lg border border-border-subtle"
          style={{ left: hoveredDay.x, top: hoveredDay.y }}
        >
          <span className="text-foreground font-medium">
            {hoveredDay.count} contributions
          </span>{" "}
          on {hoveredDay.date}
        </div>
      )}

      {/* Legend */}
      <div className="mt-4 flex items-center justify-end gap-2">
        <span className="font-mono text-[10px] text-text-muted">Less</span>
        {LEVEL_COLORS.map((color, i) => (
          <div key={i} className={`h-[11px] w-[11px] rounded-sm ${color}`} />
        ))}
        <span className="font-mono text-[10px] text-text-muted">More</span>
      </div>
    </div>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import type { TocItem } from "@/lib/toc";

export function TableOfContents({
  items,
  label,
}: {
  items: TocItem[];
  label: string;
}) {
  const [activeId, setActiveId] = useState<string>("");
  const [progress, setProgress] = useState(0);
  const activeIdRef = useRef<string>("");

  // Reading-progress bar driven by a passive scroll listener.
  useEffect(() => {
    const update = () => {
      const el = document.documentElement;
      const scrollable = el.scrollHeight - el.clientHeight;
      const ratio = scrollable > 0 ? el.scrollTop / scrollable : 0;
      setProgress(Math.min(1, Math.max(0, ratio)));
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update, { passive: true });
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  // Scroll-spy: track which heading is currently in view.
  useEffect(() => {
    if (items.length === 0) return;

    const headings = items
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null);

    if (headings.length === 0) return;

    const visible = new Set<string>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            visible.add(entry.target.id);
          } else {
            visible.delete(entry.target.id);
          }
        }

        // Pick the first heading (in document order) that is visible.
        let next = "";
        for (const item of items) {
          if (visible.has(item.id)) {
            next = item.id;
            break;
          }
        }

        // Fall back to the last heading above the viewport so something stays
        // active when no heading is currently intersecting.
        if (!next) {
          let candidate = activeIdRef.current;
          for (const heading of headings) {
            if (heading.getBoundingClientRect().top < 120) {
              candidate = heading.id;
            }
          }
          next = candidate;
        }

        if (next && next !== activeIdRef.current) {
          activeIdRef.current = next;
          setActiveId(next);
        }
      },
      { rootMargin: "-100px 0px -66% 0px", threshold: 0 },
    );

    for (const heading of headings) observer.observe(heading);
    return () => observer.disconnect();
  }, [items]);

  const handleClick = (
    event: React.MouseEvent<HTMLAnchorElement>,
    id: string,
  ) => {
    event.preventDefault();
    const target = document.getElementById(id);
    if (!target) return;
    target.scrollIntoView({ behavior: "smooth", block: "start" });
    activeIdRef.current = id;
    setActiveId(id);
    if (history.replaceState) {
      history.replaceState(null, "", `#${id}`);
    }
  };

  return (
    <>
      <div
        aria-hidden="true"
        className="fixed left-0 top-0 z-50 h-0.5 bg-green"
        style={{ width: `${progress * 100}%` }}
      />

      {items.length > 0 && (
        <nav
          aria-label={label}
          className="fixed right-8 top-32 hidden w-56 xl:block"
        >
          <p className="mb-4 font-mono text-[11px] uppercase tracking-[2px] text-text-muted">
            {label}
          </p>
          <ul className="space-y-2 border-l border-border-subtle">
            {items.map((item) => {
              const isActive = item.id === activeId;
              return (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    onClick={(event) => handleClick(event, item.id)}
                    className={[
                      "block border-l-2 -ml-px py-0.5 font-mono text-[12px] leading-snug transition-colors",
                      item.level === 3 ? "pl-6" : "pl-3",
                      isActive
                        ? "border-green text-green"
                        : "border-transparent text-text-muted hover:text-text-secondary",
                    ].join(" ")}
                  >
                    {item.text}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      )}
    </>
  );
}

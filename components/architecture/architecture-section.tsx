"use client";

import { useEffect, useState } from "react";
import { SectionHeader } from "@/components/sections/section-header";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { ArchitectureDiagram } from "./architecture-diagram";
import { DiagramMobile } from "./diagram-mobile";

export function ArchitectureSection() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return (
    <section
      className="mx-auto max-w-[1400px] px-5 py-20 md:px-12 md:py-[120px]"
      id="architecture"
    >
      <SectionHeader number="04" label="Architecture" />
      <ScrollReveal direction="up">
        <h2 className="mb-5 font-heading text-[clamp(32px,4vw,52px)] leading-[1.1] font-extrabold tracking-[-2px]">
          Architecture is the
          <br />
          real deliverable.
        </h2>
        <p className="mb-16 max-w-[560px] text-[17px] leading-[1.7] text-text-secondary">
          A simplified view of the cross-border payment system I architected.
          Hover over nodes to explore each service&apos;s role, tech stack, and
          the real engineering challenges behind it.
        </p>
      </ScrollReveal>

      {isMobile ? <DiagramMobile /> : <ArchitectureDiagram />}
    </section>
  );
}

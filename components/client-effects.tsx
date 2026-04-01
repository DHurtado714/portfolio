"use client";

import { useEffect } from "react";

export function CursorGlow() {
  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const glow = document.getElementById("cursorGlow");
    if (!glow) return;

    let rafId: number;
    const onMouseMove = (e: MouseEvent) => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        glow.style.transform = `translate(${e.clientX - 150}px, ${e.clientY - 150}px)`;
      });
    };

    document.addEventListener("mousemove", onMouseMove);
    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return (
    <div
      id="cursorGlow"
      className="pointer-events-none fixed z-0 h-[300px] w-[300px] rounded-full transition-transform duration-500 ease-out"
      style={{
        left: 0,
        top: 0,
        background:
          "radial-gradient(circle, rgba(0,200,120,0.03) 0%, transparent 70%)",
      }}
    />
  );
}

export function ActiveNavHighlight() {
  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll("[data-nav-link]");

    let rafId: number;
    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        let current = "";
        sections.forEach((section) => {
          const sectionTop = (section as HTMLElement).offsetTop - 100;
          if (scrollY >= sectionTop) current = section.getAttribute("id") || "";
        });
        navLinks.forEach((link) => {
          const el = link as HTMLElement;
          el.style.color =
            el.getAttribute("href") === "#" + current ? "#F0F0F0" : "";
        });
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return null;
}

export function SectionScrollFade() {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const sections = document.querySelectorAll("section[id]");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const el = entry.target as HTMLElement;
          if (entry.isIntersecting) {
            el.style.opacity = "1";
            el.style.transition = "opacity 0.5s ease-out";
          } else {
            const rect = entry.boundingClientRect;
            // Only fade sections that have scrolled above viewport
            if (rect.bottom < 0) {
              el.style.opacity = "0.3";
              el.style.transition = "opacity 0.5s ease-out";
            }
          }
        });
      },
      { threshold: [0, 0.1] }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return null;
}

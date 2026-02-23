"use client";

import { useEffect } from "react";

export function CursorGlow() {
  useEffect(() => {
    const glow = document.getElementById("cursorGlow");
    if (!glow) return;

    const onMouseMove = (e: MouseEvent) => {
      glow.style.left = e.clientX + "px";
      glow.style.top = e.clientY + "px";
    };

    document.addEventListener("mousemove", onMouseMove);
    return () => document.removeEventListener("mousemove", onMouseMove);
  }, []);

  return (
    <div
      id="cursorGlow"
      className="pointer-events-none fixed z-0 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full transition-[left,top] duration-500 ease-out"
      style={{
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

    const onScroll = () => {
      let current = "";
      sections.forEach((section) => {
        const sectionTop = (section as HTMLElement).offsetTop - 100;
        if (scrollY >= sectionTop) {
          current = section.getAttribute("id") || "";
        }
      });

      navLinks.forEach((link) => {
        const el = link as HTMLElement;
        el.style.color =
          el.getAttribute("href") === "#" + current ? "#F0F0F0" : "";
      });
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return null;
}

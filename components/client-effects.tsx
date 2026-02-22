"use client";

import { useEffect } from "react";

export function ScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { rootMargin: "0px 0px -60px 0px", threshold: 0.1 }
    );

    document
      .querySelectorAll(".reveal, .stagger")
      .forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return null;
}

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

export function HeroParallax() {
  useEffect(() => {
    const hero = document.getElementById("hero-section");
    if (!hero) return;

    const onScroll = () => {
      const scrolled = window.scrollY;
      if (scrolled < window.innerHeight) {
        hero.style.transform = `translateY(${scrolled * 0.15}px)`;
        hero.style.opacity = String(
          1 - scrolled / (window.innerHeight * 0.8)
        );
      }
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return null;
}

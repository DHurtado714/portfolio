"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { getNavItems } from "@/lib/nav-items";
import { translations, type Locale } from "@/lib/i18n";

export function MobileMenu({ locale }: { locale: Locale }) {
  const [open, setOpen] = useState(false);
  const navItems = getNavItems(locale);
  const t = translations[locale].nav;

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <button
        className="flex h-10 w-10 flex-col items-center justify-center gap-[5px] md:hidden"
        onClick={() => setOpen(!open)}
        aria-label={open ? t.closeMenu : t.openMenu}
        aria-expanded={open}
      >
        <span
          className={`block h-px w-5 bg-foreground transition-transform duration-300 ${open ? "translate-y-[7px] rotate-45" : ""}`}
        />
        <span
          className={`block h-px w-5 bg-foreground transition-opacity duration-300 ${open ? "opacity-0" : ""}`}
        />
        <span
          className={`block h-px w-5 bg-foreground transition-transform duration-300 ${open ? "-translate-y-[7px] -rotate-45" : ""}`}
        />
      </button>

      <div
        className={`fixed inset-x-0 top-16 z-40 flex flex-col bg-[#050505]/98 backdrop-blur-xl transition-[opacity,visibility] duration-300 md:hidden ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
        style={{ height: "calc(100dvh - 64px)" }}
      >
        <nav className="flex flex-col px-6 pt-6">
          {navItems.map((item, i) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="flex items-center justify-between border-b border-border-subtle py-5 font-heading text-[22px] font-bold transition-colors hover:text-green"
            >
              {item.label}
              <span className="font-mono text-[11px] tracking-[2px] text-text-muted">
                {String(i + 1).padStart(2, "0")}
              </span>
            </Link>
          ))}
        </nav>

        <div className="mt-auto px-6 pb-10 flex items-center gap-2 font-mono text-[11px] text-text-muted">
          <div className="h-1.5 w-1.5 rounded-full bg-green animate-pulse-dot" />
          <span>{t.shippingStatus}</span>
        </div>
      </div>
    </>
  );
}

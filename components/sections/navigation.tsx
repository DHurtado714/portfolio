import Link from "next/link";
import { NavEntrance } from "@/components/motion/nav-entrance";
import { NavLogo } from "@/components/motion/nav-logo";
import { MobileMenu } from "./mobile-menu";
import { getNavItems } from "@/lib/nav-items";
import { translations, type Locale } from "@/lib/i18n";

export function Navigation({ locale }: { locale: Locale }) {
  const navItems = getNavItems(locale);
  const t = translations[locale].nav;

  return (
    <NavEntrance>
      <nav className="fixed top-0 right-0 left-0 z-50 flex h-16 items-center justify-between border-b border-white/[0.04] bg-[#050505]/80 px-6 backdrop-blur-xl backdrop-saturate-[1.2] md:px-12">
        <NavLogo />

        <ul className="hidden gap-9 md:flex">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                data-nav-link
                className="group relative font-mono text-[13px] uppercase tracking-[1.5px] text-text-muted transition-colors hover:text-foreground"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-green transition-all duration-300 group-hover:w-full" />
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-2 font-mono text-[13px] text-text-muted md:flex">
          <div className="h-1.5 w-1.5 rounded-full bg-green animate-pulse-dot" />
          <span>{t.shippingStatus}</span>
        </div>

        <MobileMenu locale={locale} />
      </nav>
    </NavEntrance>
  );
}

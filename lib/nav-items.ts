import type { Locale } from "@/lib/i18n";
import { translations } from "@/lib/i18n";

export interface NavItem {
  href: string;
  label: string;
}

export function getNavItems(locale: Locale): NavItem[] {
  const t = translations[locale].nav;
  return [
    { href: `/${locale}#about`,      label: t.about },
    { href: `/${locale}#expertise`,  label: t.expertise },
    { href: `/${locale}#work`,       label: t.work },
    { href: `/${locale}#experience`, label: t.experience },
    { href: `/${locale}/blog`,       label: t.blog },
    { href: `/${locale}#contact`,    label: t.contact },
  ];
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LOCALES, type Locale } from "@/lib/i18n";

export function LanguageSwitcher({ locale }: { locale: Locale }) {
  const pathname = usePathname();

  function getPathForLocale(target: Locale) {
    return pathname.replace(`/${locale}/`, `/${target}/`);
  }

  return (
    <div className="flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[1.5px]">
      {LOCALES.map((lang, i) => (
        <span key={lang} className="flex items-center gap-1.5">
          {i > 0 && <span className="text-border-subtle">/</span>}
          {lang === locale ? (
            <span className="text-green">{lang}</span>
          ) : (
            <Link
              href={getPathForLocale(lang)}
              className="text-text-muted transition-colors hover:text-foreground"
            >
              {lang}
            </Link>
          )}
        </span>
      ))}
    </div>
  );
}

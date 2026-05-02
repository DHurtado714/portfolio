"use client";

import { usePathname, useRouter } from "next/navigation";
import { LOCALES, type Locale } from "@/lib/i18n";

export function LanguageSwitcher({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const router = useRouter();

  function getPathForLocale(target: Locale) {
    // Replace the leading locale segment: /en/... → /target/...
    // Handles both /en and /en/blog/slug (with and without trailing path)
    const withoutLocale = pathname.replace(
      new RegExp(`^/${locale}(?=/|$)`),
      "",
    );
    return `/${target}${withoutLocale}`;
  }

  function handleSwitch(target: Locale) {
    document.cookie = `NEXT_LOCALE=${target}; max-age=${60 * 60 * 24 * 365}; path=/`;
    router.push(getPathForLocale(target));
  }

  return (
    <div className="flex items-center gap-1.5 font-mono text-[13px] uppercase tracking-[1.5px]">
      {LOCALES.map((lang, i) => (
        <span key={lang} className="flex items-center gap-1.5">
          {i > 0 && <span className="text-border-subtle">/</span>}
          {lang === locale ? (
            <span className="text-green">{lang}</span>
          ) : (
            <button
              onClick={() => handleSwitch(lang)}
              className="text-text-muted transition-colors hover:text-foreground cursor-pointer"
            >
              {lang}
            </button>
          )}
        </span>
      ))}
    </div>
  );
}

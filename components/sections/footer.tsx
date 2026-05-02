import { translations, type Locale } from "@/lib/i18n";
import { LanguageSwitcher } from "@/components/language-switcher";

export function Footer({ locale }: { locale: Locale }) {
  const t = translations[locale].footer;

  return (
    <footer className="flex flex-col items-center justify-between gap-3 border-t border-border-subtle px-6 py-8 text-center md:flex-row md:px-12">
      <div className="font-mono text-[13px] tracking-[1px] text-text-muted">
        <span className="text-green">{"{D}"}</span> &copy;{" "}
        {new Date().getFullYear()} Daniel
      </div>
      <div className="font-mono text-[13px] text-text-muted">{t.tagline}</div>
      <LanguageSwitcher locale={locale} />
    </footer>
  );
}

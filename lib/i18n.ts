export const LOCALES = ["en", "es"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "en";

export function isValidLocale(locale: string): locale is Locale {
  return LOCALES.includes(locale as Locale);
}

export const translations = {
  en: {
    backToBlog: "Back to blog",
    home: "Home",
    blogTitle: "Blog",
    blogDescription:
      "Writing about backend architecture, fintech systems, and lessons learned building software at scale.",
    noPosts: "No posts yet. Stay tuned.",
  },
  es: {
    backToBlog: "Volver al blog",
    home: "Inicio",
    blogTitle: "Blog",
    blogDescription:
      "Escribiendo sobre arquitectura backend, sistemas fintech y lecciones aprendidas construyendo software a escala.",
    noPosts: "Aún no hay posts. Pronto...",
  },
} satisfies Record<Locale, Record<string, string>>;

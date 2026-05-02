import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isValidLocale, translations } from "@/lib/i18n";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};

  const t = translations[locale].meta;

  return {
    title: {
      default: t.title,
      template: "%s | Daniel Hurtado",
    },
    description: t.description,
    keywords: [
      "Software Engineer",
      "Backend Developer",
      "Fintech",
      "Machine Learning",
      "TypeScript",
      "NestJS",
      "Node.js",
      "Java",
      "Spring Boot",
      "AWS",
      "Python",
      "Latin America",
      "Cross-border Payments",
      "Colombia",
      "software engineer portfolio",
      "fintech systems engineer",
    ],
    alternates: {
      canonical: `https://danih.dev/${locale}`,
      languages: {
        en: "https://danih.dev/en",
        es: "https://danih.dev/es",
      },
    },
    openGraph: {
      type: "website",
      locale: locale === "es" ? "es_ES" : "en_US",
      url: `https://danih.dev/${locale}`,
      title: t.title,
      description: t.ogDescription,
      siteName: "Daniel Hurtado Portfolio",
    },
    twitter: {
      card: "summary_large_image",
      title: t.title,
      description: t.twitterDescription,
    },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();

  return <>{children}</>;
}

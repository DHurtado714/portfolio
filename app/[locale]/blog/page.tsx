import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllPosts } from "@/lib/content";
import { isValidLocale, translations } from "@/lib/i18n";
import { BlogCard } from "@/components/blog/blog-card";
import { LanguageSwitcher } from "@/components/blog/language-switcher";
import { Navigation } from "@/components/sections/navigation";
import { Footer } from "@/components/sections/footer";
import type { Locale } from "@/lib/i18n";
import { ArrowLeft } from "lucide-react";

type Params = { locale: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};

  const t = translations[locale].blog;
  return {
    title: t.blogTitle,
    description: t.blogDescription,
    keywords: [
      "software engineering blog",
      "backend architecture",
      "fintech engineering",
      "technical blog",
    ],
    alternates: {
      canonical: `https://danih.dev/${locale}/blog`,
      languages: {
        en: "https://danih.dev/en/blog",
        es: "https://danih.dev/es/blog",
      },
    },
    openGraph: {
      title: `${t.blogTitle} | Daniel Hurtado`,
      description: t.blogDescription,
      type: "website",
      url: `https://danih.dev/${locale}/blog`,
      locale: locale === "es" ? "es_ES" : "en_US",
    },
  };
}

export default async function BlogPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();

  const t = translations[locale].blog;
  const posts = getAllPosts(locale);

  return (
    <>
      <Navigation locale={locale as Locale} />
      <main className="mx-auto max-w-[1400px] px-5 pt-32 pb-20 md:px-12">
        <div className="mb-12 flex items-center justify-between">
          <Link
            href={`/${locale as Locale}`}
            className="group inline-flex items-center gap-2 font-mono text-[13px] uppercase tracking-[2px] text-text-muted transition-colors hover:text-green"
          >
            <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" />
            {t.home}
          </Link>
          <LanguageSwitcher locale={locale} />
        </div>

        <h1 className="mb-5 font-heading text-[clamp(32px,4vw,52px)] font-extrabold leading-[1.1] tracking-[-2px]">
          {t.blogTitle}
        </h1>
        <p className="mb-16 max-w-[560px] text-[19px] leading-[1.7] text-text-secondary">
          {t.blogDescription}
        </p>

        {posts.length === 0 ? (
          <p className="text-text-muted">{t.noPosts}</p>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <BlogCard key={post.slug} post={post} locale={locale} />
            ))}
          </div>
        )}
      </main>
      <Footer locale={locale as Locale} />
    </>
  );
}

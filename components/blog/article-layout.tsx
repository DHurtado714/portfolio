import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Clock, Calendar } from "lucide-react";
import type { BlogPost } from "@/lib/content";
import { type Locale, translations } from "@/lib/i18n";
import { LanguageSwitcher } from "@/components/language-switcher";

export function ArticleLayout({
  post,
  locale,
  children,
}: {
  post: BlogPost;
  locale: Locale;
  children: React.ReactNode;
}) {
  const t = translations[locale].blog;
  const dateLocale = locale === "es" ? "es-ES" : "en-US";

  const formattedDate = new Date(post.date).toLocaleDateString(dateLocale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        headline: post.title,
        description: post.description,
        datePublished: post.date,
        dateModified: post.dateModified ?? post.date,
        ...(post.image && { image: `https://danih.dev${post.image}` }),
        inLanguage: locale,
        keywords: post.tags,
        wordCount: post.wordCount,
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": `https://danih.dev/${locale}/blog/${post.slug}`,
        },
        author: { "@id": "https://danih.dev/#person" },
        publisher: {
          "@type": "Person",
          "@id": "https://danih.dev/#person",
          name: "Daniel Hurtado",
          url: "https://danih.dev",
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://danih.dev",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Blog",
            item: `https://danih.dev/${locale}/blog`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: post.title,
          },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <article className="mx-auto max-w-[720px] px-5 pt-32 pb-20 md:px-0">
        <div className="mb-12 flex items-center justify-between">
          <Link
            href={`/${locale}/blog`}
            className="group inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[2px] text-text-muted transition-colors hover:text-green"
          >
            <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" />
            {t.backToBlog}
          </Link>
          <LanguageSwitcher locale={locale} />
        </div>

        <header className="mb-12">
          <h1 className="mb-5 font-heading text-[clamp(32px,4vw,48px)] font-extrabold leading-[1.1] tracking-[-2px]">
            {post.title}
          </h1>
          <p className="mb-6 text-[17px] leading-[1.7] text-text-secondary">
            {post.description}
          </p>
          <div className="mb-6 flex flex-wrap items-center gap-4 font-mono text-[11px] text-text-muted">
            <span className="flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5" />
              {formattedDate}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" />
              {post.readingTime}
            </span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {post.tags.map((tag) => (
              <Badge
                key={tag}
                variant="outline"
                className="rounded-md border-border-subtle bg-white/[0.04] px-2.5 py-1 font-mono text-[10px] font-normal tracking-[0.5px] text-text-muted"
              >
                {tag}
              </Badge>
            ))}
          </div>
        </header>

        <div>{children}</div>
      </article>
    </>
  );
}

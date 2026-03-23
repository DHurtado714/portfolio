import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Clock, Calendar } from "lucide-react";
import type { BlogPost } from "@/lib/content";

export function ArticleLayout({
  post,
  children,
}: {
  post: BlogPost;
  children: React.ReactNode;
}) {
  const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: {
      "@type": "Person",
      name: "Daniel Hurtado",
      url: "https://danielhurtado.dev",
    },
    publisher: {
      "@type": "Person",
      name: "Daniel Hurtado",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <article className="mx-auto max-w-[720px] px-5 pt-32 pb-20 md:px-0">
        <Link
          href="/blog"
          className="group mb-12 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[2px] text-text-muted transition-colors hover:text-green"
        >
          <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" />
          Back to blog
        </Link>

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

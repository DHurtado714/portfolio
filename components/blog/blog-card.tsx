import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Calendar } from "lucide-react";
import type { BlogPost } from "@/lib/content";
import { DEFAULT_LOCALE } from "@/lib/i18n";

export function BlogCard({
  post,
  locale = DEFAULT_LOCALE,
}: {
  post: BlogPost;
  locale?: string;
}) {
  const dateLocale = locale === "es" ? "es-ES" : "en-US";
  const formattedDate = new Date(post.date).toLocaleDateString(dateLocale, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <Link href={`/${locale}/blog/${post.slug}`}>
      <Card className="group relative cursor-pointer overflow-hidden rounded-[20px] border-border-subtle bg-surface p-8 shadow-none transition-all duration-400 hover:translate-x-1 hover:border-border-hover">
        <span className="absolute top-0 left-0 h-full w-[3px] origin-top scale-y-0 bg-green transition-transform duration-400 group-hover:scale-y-100" />

        <div className="mb-3 flex flex-wrap items-center gap-3 font-mono text-[11px] text-text-muted">
          <span className="flex items-center gap-1.5">
            <Calendar className="h-3 w-3" />
            {formattedDate}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="h-3 w-3" />
            {post.readingTime}
          </span>
        </div>

        <h3 className="mb-2 font-heading text-[20px] font-bold tracking-[-0.5px] transition-colors group-hover:text-green">
          {post.title}
        </h3>

        <p className="mb-4 text-[15px] leading-[1.7] text-text-secondary line-clamp-2">
          {post.description}
        </p>

        <div className="flex flex-wrap gap-1.5">
          {post.tags.map((tag) => (
            <Badge
              key={tag}
              variant="outline"
              className="rounded-md border-border-subtle bg-white/[0.04] px-2.5 py-1 font-mono text-[10px] font-normal tracking-[0.5px] text-text-muted transition-all hover:border-green hover:text-green"
            >
              {tag}
            </Badge>
          ))}
        </div>

        <div className="absolute top-8 right-8 flex h-8 w-8 items-center justify-center rounded-full border border-border-subtle text-sm text-text-muted transition-all group-hover:translate-x-1 group-hover:border-green group-hover:text-green">
          &rarr;
        </div>
      </Card>
    </Link>
  );
}

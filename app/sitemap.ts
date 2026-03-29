import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/content";
import { LOCALES } from "@/lib/i18n";

export default function sitemap(): MetadataRoute.Sitemap {
  const postEntries = LOCALES.flatMap((locale) =>
    getAllPosts(locale).map((post) => ({
      url: `https://danih.dev/${locale}/blog/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: "monthly" as const,
      priority: 0.6,
      alternates: {
        languages: Object.fromEntries(
          LOCALES.map((l) => [l, `https://danih.dev/${l}/blog/${post.slug}`]),
        ),
      },
    })),
  );

  return [
    {
      url: "https://danih.dev",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: "https://danih.dev/llms.txt",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.3,
    },
    ...LOCALES.map((locale) => ({
      url: `https://danih.dev/${locale}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
      alternates: {
        languages: Object.fromEntries(
          LOCALES.map((l) => [l, `https://danih.dev/${l}/blog`]),
        ),
      },
    })),
    ...postEntries,
  ];
}

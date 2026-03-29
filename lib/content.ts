import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";
import { DEFAULT_LOCALE } from "./i18n";

const BLOG_BASE_DIR = path.join(process.cwd(), "content/blog");

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  published: boolean;
  readingTime: string;
  content: string;
}

export function getAllPosts(locale: string = DEFAULT_LOCALE): BlogPost[] {
  const dir = path.join(BLOG_BASE_DIR, locale);
  if (!fs.existsSync(dir)) return [];

  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => {
      const slug = file.replace(/\.mdx$/, "");
      return getPostBySlug(slug, locale);
    })
    .filter((post): post is BlogPost => post !== null && post.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostBySlug(
  slug: string,
  locale: string = DEFAULT_LOCALE
): BlogPost | null {
  const filePath = path.join(BLOG_BASE_DIR, locale, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  const stats = readingTime(content);

  return {
    slug,
    title: data.title ?? "",
    description: data.description ?? "",
    date: data.date ?? "",
    tags: data.tags ?? [],
    published: data.published ?? false,
    readingTime: stats.text,
    content,
  };
}

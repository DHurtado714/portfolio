import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import { getAllPosts, getPostBySlug } from "@/lib/content";
import { isValidLocale, LOCALES } from "@/lib/i18n";
import { mdxComponents } from "@/components/blog/mdx-components";
import { ArticleLayout } from "@/components/blog/article-layout";
import { Navigation } from "@/components/sections/navigation";
import { Footer } from "@/components/sections/footer";

type Params = { locale: string; slug: string };

export function generateStaticParams() {
  return LOCALES.flatMap((locale) =>
    getAllPosts(locale).map((post) => ({ locale, slug: post.slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isValidLocale(locale)) return {};

  const post = getPostBySlug(slug, locale);
  if (!post) return {};

  return {
    title: post.title,
    description: post.description,
    keywords: post.tags,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      authors: ["Daniel Hurtado"],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { locale, slug } = await params;
  if (!isValidLocale(locale)) notFound();

  const post = getPostBySlug(slug, locale);
  if (!post || !post.published) notFound();

  return (
    <>
      <Navigation />
      <main>
        <ArticleLayout post={post} locale={locale}>
          <MDXRemote
            source={post.content}
            components={mdxComponents}
            options={{
              mdxOptions: {
                remarkPlugins: [remarkGfm],
                rehypePlugins: [
                  rehypeSlug,
                  [
                    rehypePrettyCode,
                    { theme: "github-dark-default", keepBackground: false },
                  ],
                ],
              },
            }}
          />
        </ArticleLayout>
      </main>
      <Footer />
    </>
  );
}

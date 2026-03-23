import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "@/lib/content";
import { BlogCard } from "@/components/blog/blog-card";
import { Navigation } from "@/components/sections/navigation";
import { Footer } from "@/components/sections/footer";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Technical writing on backend architecture, fintech systems, cross-border payments, and software engineering. By Daniel Hurtado.",
  keywords: [
    "software engineering blog",
    "backend architecture",
    "fintech engineering",
    "engineer for side projects",
    "freelance backend engineer",
    "technical blog",
  ],
  openGraph: {
    title: "Blog | Daniel Hurtado",
    description:
      "Technical writing on backend architecture, fintech systems, and software engineering.",
    type: "website",
  },
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <>
      <Navigation />
      <main className="mx-auto max-w-[1400px] px-5 pt-32 pb-20 md:px-12">
        <Link
          href="/"
          className="group mb-12 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[2px] text-text-muted transition-colors hover:text-green"
        >
          <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" />
          Home
        </Link>

        <h1 className="mb-5 font-heading text-[clamp(32px,4vw,52px)] font-extrabold leading-[1.1] tracking-[-2px]">
          Blog
        </h1>
        <p className="mb-16 max-w-[560px] text-[17px] leading-[1.7] text-text-secondary">
          Writing about backend architecture, fintech systems, and lessons
          learned building software at scale.
        </p>

        {posts.length === 0 ? (
          <p className="text-text-muted">No posts yet. Stay tuned.</p>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}

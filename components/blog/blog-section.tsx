import Link from "next/link";
import { getAllPosts } from "@/lib/content";
import { BlogCard } from "./blog-card";
import { SectionHeader } from "@/components/sections/section-header";

export function BlogSection() {
  const posts = getAllPosts("en").slice(0, 3);

  if (posts.length === 0) return null;

  return (
    <section
      className="mx-auto max-w-[1400px] px-6 py-20 md:px-12 md:py-[120px]"
      id="blog"
    >
      <SectionHeader number="07" label="Blog" />
      <h2 className="mb-5 font-heading text-[clamp(32px,4vw,52px)] leading-[1.1] font-extrabold tracking-[-2px]">
        Thoughts &<br />
        technical writing.
      </h2>
      <p className="mb-16 max-w-[560px] text-[17px] leading-[1.7] text-text-secondary">
        Writing about backend architecture, fintech systems, and lessons learned
        building software at scale.
      </p>

      <div className="mb-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <BlogCard key={post.slug} post={post} locale="en" />
        ))}
      </div>

      <Link
        href="/blog"
        className="group inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[2px] text-text-muted transition-colors hover:text-green"
      >
        View all posts
        <span className="transition-transform group-hover:translate-x-1">
          &rarr;
        </span>
      </Link>
    </section>
  );
}

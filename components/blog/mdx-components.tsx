import type { MDXComponents } from "mdx/types";
import { Callout } from "@/components/ui/callout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FullBleed, Wide } from "@/components/blog/full-bleed";

export const mdxComponents: MDXComponents = {
  Callout,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  FullBleed,
  Wide,
  h1: (props) => (
    <h1
      className="mb-6 mt-12 font-heading text-[38px] font-extrabold leading-[1.1] tracking-[-2px]"
      {...props}
    />
  ),
  h2: (props) => (
    <h2
      className="mb-4 mt-10 font-heading text-[30px] font-bold leading-[1.2] tracking-[-1px]"
      {...props}
    />
  ),
  h3: (props) => (
    <h3
      className="mb-3 mt-8 font-heading text-[24px] font-bold leading-[1.3] tracking-[-0.5px]"
      {...props}
    />
  ),
  p: (props) => (
    <p
      className="mb-6 text-[19px] leading-[1.8] text-text-secondary"
      {...props}
    />
  ),
  a: (props) => (
    <a
      className="text-green underline decoration-green/30 underline-offset-4 transition-colors hover:decoration-green"
      target={props.href?.startsWith("http") ? "_blank" : undefined}
      rel={props.href?.startsWith("http") ? "noopener noreferrer" : undefined}
      {...props}
    />
  ),
  ul: (props) => (
    <ul
      className="mb-6 ml-6 list-disc space-y-2 text-[19px] leading-[1.8] text-text-secondary"
      {...props}
    />
  ),
  ol: (props) => (
    <ol
      className="mb-6 ml-6 list-decimal space-y-2 text-[19px] leading-[1.8] text-text-secondary"
      {...props}
    />
  ),
  li: (props) => <li className="pl-1" {...props} />,
  blockquote: (props) => (
    <blockquote
      className="mb-6 border-l-2 border-green pl-6 italic text-text-secondary"
      {...props}
    />
  ),
  code: (props) => (
    <code
      className="rounded-md bg-white/[0.06] px-1.5 py-0.5 font-mono text-[16px] text-green-light"
      {...props}
    />
  ),
  pre: (props) => (
    <pre
      className="mb-6 overflow-x-auto rounded-xl border border-border-subtle bg-surface p-5 font-mono text-[16px] leading-[1.7]"
      {...props}
    />
  ),
  hr: () => <hr className="my-10 border-none h-px bg-border-subtle" />,
  img: (props) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img className="my-8 rounded-xl" alt={props.alt ?? ""} {...props} />
  ),
  table: (props) => (
    <div className="mb-6 overflow-x-auto">
      <table
        className="w-full border-collapse text-[17px] text-text-secondary"
        {...props}
      />
    </div>
  ),
  th: (props) => (
    <th
      className="border-b border-border-subtle px-4 py-2 text-left font-mono text-[13px] uppercase tracking-[2px] text-text-muted"
      {...props}
    />
  ),
  td: (props) => (
    <td className="border-b border-border-subtle px-4 py-3" {...props} />
  ),
};

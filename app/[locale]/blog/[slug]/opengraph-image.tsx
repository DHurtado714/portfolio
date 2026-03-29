import { ImageResponse } from "next/og";
import { getPostBySlug } from "@/lib/content";

export const alt = "Blog post by Daniel Hurtado";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const post = getPostBySlug(slug, locale);

  const title = post?.title ?? "Blog Post";
  const date = post?.date
    ? new Date(post.date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";
  const readingTime = post?.readingTime ?? "";
  const tags = post?.tags?.slice(0, 3) ?? [];

  return new ImageResponse(
    <div
      style={{
        background: "#050505",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "80px",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginBottom: "32px",
          }}
        >
          <div
            style={{
              width: "12px",
              height: "12px",
              borderRadius: "50%",
              background: "#00C878",
            }}
          />
          <span
            style={{
              color: "#00C878",
              fontSize: "18px",
              letterSpacing: "3px",
              textTransform: "uppercase" as const,
              fontWeight: 600,
            }}
          >
            danih.dev/blog
          </span>
        </div>

        <h1
          style={{
            color: "#FAFAFA",
            fontSize: title.length > 60 ? "40px" : "48px",
            fontWeight: 800,
            lineHeight: 1.15,
            letterSpacing: "-1.5px",
            margin: 0,
            maxWidth: "900px",
          }}
        >
          {title}
        </h1>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
        }}
      >
        <div style={{ display: "flex", gap: "8px" }}>
          {tags.map((tag) => (
            <span
              key={tag}
              style={{
                color: "#A0A0A0",
                fontSize: "14px",
                padding: "6px 14px",
                border: "1px solid #1a1a1a",
                borderRadius: "6px",
                background: "#0a0a0a",
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        <div
          style={{
            display: "flex",
            gap: "20px",
            color: "#666",
            fontSize: "16px",
          }}
        >
          <span>{date}</span>
          <span>{readingTime}</span>
        </div>
      </div>
    </div>,
    { ...size },
  );
}

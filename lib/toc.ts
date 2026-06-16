export interface TocItem {
  id: string;
  text: string;
  level: 2 | 3;
}

/**
 * Slugify a heading the same way `rehype-slug` (via `github-slugger`) does:
 * lowercase, drop characters that are not Unicode letters/numbers/spaces/hyphens,
 * then convert spaces to hyphens. This is deterministic and accent-preserving,
 * matching the `id`s emitted on the rendered headings.
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\p{L}\p{N} -]/gu, "")
    .replace(/ /g, "-");
}

/**
 * Extract a table of contents from raw markdown/MDX.
 * Only `##` (level 2) and `###` (level 3) headings are collected.
 * Headings inside fenced code blocks (``` ... ```) are ignored.
 */
export function extractToc(markdown: string): TocItem[] {
  const items: TocItem[] = [];
  let inFence = false;

  for (const rawLine of markdown.split("\n")) {
    const line = rawLine.trimEnd();
    const trimmed = line.trim();

    // Toggle fenced code blocks on ``` or ~~~ markers.
    if (/^(```|~~~)/.test(trimmed)) {
      inFence = !inFence;
      continue;
    }
    if (inFence) continue;

    const match = /^(#{2,3})\s+(.+?)\s*#*\s*$/.exec(line);
    if (!match) continue;

    const level = match[1].length as 2 | 3;
    const rawText = match[2].trim();
    if (!rawText) continue;

    // The id must match rehype-slug, which slugifies the heading's rendered
    // text. Inline-code backticks and emphasis markers contribute no slug
    // characters, so stripping them before slugifying keeps parity while also
    // producing clean display text.
    const text = rawText.replace(/`([^`]*)`/g, "$1").replace(/[*_]/g, "");

    items.push({ id: slugify(text), text, level });
  }

  return items;
}

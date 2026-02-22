# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- **Dev server:** `bun dev` (Next.js dev server)
- **Build:** `bun run build`
- **Lint:** `bun run lint` (ESLint with next/core-web-vitals and next/typescript configs)
- **Start production:** `bun start`

Package manager is **bun** (see `bun.lock`).

## Architecture

This is a personal portfolio site — a single-page Next.js 16 app (App Router) with React 19. Dark theme only (`<html className="dark">`).

### Page Structure

`app/page.tsx` composes the entire site from section components. Sections render in order: Navigation → Hero → About → Expertise → Work → Experience → Beyond → Contact → Footer, separated by `<SectionDivider />`. Structured data (JSON-LD) is embedded for SEO.

### Component Organization

- `components/sections/` — Each page section is a standalone server component (navigation, hero, about, expertise, work, experience, beyond, contact, footer). Shared `section-header.tsx` for consistent section titles.
- `components/client-effects.tsx` — All client-side effects (`"use client"`) live here: `ScrollReveal` (IntersectionObserver for `.reveal`/`.stagger` classes), `CursorGlow`, `ActiveNavHighlight`, `HeroParallax`. These are renderless or minimal-DOM components mounted in the page root.
- No `components/ui/` directory yet — shadcn/ui is configured (new-york style, `components.json`) but no UI primitives have been added.

### Styling

- **Tailwind CSS v4** with `tw-animate-css` and shadcn's Tailwind CSS layer.
- Custom color tokens defined in `app/globals.css` under `@theme inline`: `--color-green` (#00C878) is the primary accent, with surface/text/border variants.
- Three Google Fonts loaded in layout: **Syne** (`--font-heading`), **DM Sans** (`--font-sans`), **JetBrains Mono** (`--font-mono`).
- CSS animation classes (`.reveal`, `.stagger`, `.animate-slide-up`, `.animate-pulse-dot`) are defined in globals.css and triggered by the `ScrollReveal` client effect.

### Path Aliases

`@/*` maps to the project root (e.g., `@/components/sections/hero`).

### Key Libraries

- `radix-ui` — UI primitives (via shadcn)
- `lucide-react` — Icons
- `class-variance-authority` + `clsx` + `tailwind-merge` — Utility for className composition (`lib/utils.ts` exports `cn()`)

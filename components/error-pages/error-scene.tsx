"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  translations,
  isValidLocale,
  DEFAULT_LOCALE,
  type Locale,
} from "@/lib/i18n";

type Variant = "404" | "500";

/**
 * Error pages render outside the [locale] segment, so there's no route param
 * to read. Recover the locale from the URL prefix, falling back to the
 * browser language and finally the default.
 */
function useLocale(): Locale {
  const [locale, setLocale] = useState<Locale>(DEFAULT_LOCALE);

  useEffect(() => {
    const seg = window.location.pathname.split("/")[1];
    if (isValidLocale(seg)) {
      setLocale(seg);
    } else if (navigator.language?.toLowerCase().startsWith("es")) {
      setLocale("es");
    }
  }, []);

  return locale;
}

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 24, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { type: "spring", stiffness: 60, damping: 18, mass: 1 },
  },
};

export function ErrorScene({
  variant,
  onRetry,
}: {
  variant: Variant;
  onRetry?: () => void;
}) {
  const locale = useLocale();
  const t = translations[locale].errors;
  const content = variant === "404" ? t.notFound : t.serverError;
  const isServerError = variant === "500";

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 py-24 md:px-12">
      {/* Ambient glows — green base, warmer red tint for the 500 crash */}
      <div
        className="pointer-events-none absolute -top-[10%] left-1/2 h-[600px] w-[600px] -translate-x-1/2"
        style={{
          background:
            "radial-gradient(circle, rgba(0,200,120,0.10) 0%, transparent 65%)",
        }}
      />
      {isServerError && (
        <div
          className="pointer-events-none absolute bottom-[5%] left-1/2 h-[420px] w-[420px] -translate-x-1/2"
          style={{
            background:
              "radial-gradient(circle, rgba(255,68,102,0.08) 0%, transparent 65%)",
          }}
        />
      )}

      {/* Home logo, matching the site nav */}
      <Link
        href={`/${locale}`}
        className="absolute top-6 left-6 flex items-center gap-1 font-mono text-sm font-medium md:top-8 md:left-12"
        aria-label="Home"
      >
        <span className="text-green opacity-70">{"{"}</span>D
        <span className="text-green opacity-70">{"}"}</span>
      </Link>

      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="relative z-10 flex w-full max-w-[680px] flex-col items-center text-center"
      >
        {/* Eyebrow */}
        <motion.div
          variants={item}
          className="flex items-center gap-2.5 font-mono text-[11px] tracking-[3px] text-text-secondary md:text-xs"
        >
          <span
            className={`h-1.5 w-1.5 rounded-full ${
              isServerError ? "bg-[#ff4466]" : "bg-green"
            } animate-pulse-dot`}
          />
          {content.eyebrow}
        </motion.div>

        {/* Giant glitching status code */}
        <motion.div variants={item} className="mt-6">
          <span
            data-text={content.code}
            className="glitch shimmer-text font-heading text-[clamp(110px,26vw,240px)] leading-[0.9] font-extrabold tracking-[-4px] select-none"
          >
            {content.code}
          </span>
        </motion.div>

        {/* Animated circuit diagram */}
        <motion.div variants={item} className="mt-2 w-full max-w-[440px]">
          <CircuitScene variant={variant} />
        </motion.div>

        {/* Headline + description */}
        <motion.h1
          variants={item}
          className="mt-8 font-heading text-[clamp(24px,4vw,38px)] leading-[1.1] font-bold tracking-[-1px]"
        >
          {content.title}
        </motion.h1>

        {/* CTAs */}
        <motion.div
          variants={item}
          className="mt-10 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:gap-4"
        >
          {isServerError ? (
            <Button
              onClick={onRetry}
              className="h-auto w-full rounded-[10px] bg-green px-7 py-3.5 font-semibold text-[#050505] transition-all hover:-translate-y-0.5 hover:bg-green-light hover:shadow-[0_8px_24px_rgba(0,200,120,0.2)] sm:w-auto"
            >
              {content.primaryCta}
            </Button>
          ) : (
            <Button
              asChild
              className="h-auto w-full rounded-[10px] bg-green px-7 py-3.5 font-semibold text-[#050505] transition-all hover:-translate-y-0.5 hover:bg-green-light hover:shadow-[0_8px_24px_rgba(0,200,120,0.2)] sm:w-auto"
            >
              <Link href={`/${locale}`}>{content.primaryCta}</Link>
            </Button>
          )}

          <Button
            asChild
            variant="ghost"
            className="h-auto w-full rounded-[10px] border border-border-hover bg-transparent px-7 py-3.5 text-text-secondary transition-all hover:-translate-y-0.5 hover:border-text-muted hover:bg-transparent hover:text-foreground dark:hover:bg-transparent sm:w-auto"
          >
            <Link href={isServerError ? `/${locale}` : `/${locale}/blog`}>
              {content.secondaryCta}
            </Link>
          </Button>
        </motion.div>
      </motion.div>
    </main>
  );
}

/* ── Animated circuit diagram ────────────────────────────── */

/**
 * A small network diagram: a packet leaves the source node and travels along
 * the wire. For a 404 the destination node is missing, so the packet dissolves
 * into the gap; for a 500 it reaches a node that overloads and bursts.
 */
function CircuitScene({ variant }: { variant: Variant }) {
  const reduce = useReducedMotion();
  const is404 = variant === "404";

  // Wire runs along y = 40 across a 400×80 viewBox.
  const SRC = 40;
  const MID = 175;
  const END = 360;
  const GAP = 265; // where the 404 packet gives up

  const packetTravel = reduce
    ? {}
    : {
        cx: is404 ? [SRC, MID, GAP] : [SRC, MID, END],
        opacity: [1, 1, 0],
      };

  return (
    <svg
      viewBox="0 0 400 80"
      className="h-auto w-full"
      role="img"
      aria-hidden="true"
    >
      {/* Solid wire: source → mid */}
      <line
        x1={SRC}
        y1={40}
        x2={MID}
        y2={40}
        stroke="#00C878"
        strokeOpacity={0.35}
        strokeWidth={1.5}
      />

      {/* Second segment: dashed & searching (404) or solid → failing node (500) */}
      {is404 ? (
        <motion.line
          x1={MID}
          y1={40}
          x2={END}
          y2={40}
          stroke="#555555"
          strokeWidth={1.5}
          strokeDasharray="5 6"
          animate={reduce ? undefined : { strokeDashoffset: [0, -22] }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
      ) : (
        <line
          x1={MID}
          y1={40}
          x2={END}
          y2={40}
          stroke="#ff4466"
          strokeOpacity={0.4}
          strokeWidth={1.5}
        />
      )}

      {/* Source node */}
      <circle
        cx={SRC}
        cy={40}
        r={7}
        fill="#050505"
        stroke="#00C878"
        strokeWidth={1.5}
      />
      <circle cx={SRC} cy={40} r={3} fill="#00C878" />

      {/* Mid (gateway) node */}
      <circle
        cx={MID}
        cy={40}
        r={6}
        fill="#050505"
        stroke="#00C878"
        strokeWidth={1.5}
        strokeOpacity={0.7}
      />
      <circle cx={MID} cy={40} r={2.5} fill="#00C878" fillOpacity={0.8} />

      {/* Destination node */}
      {is404 ? (
        <g>
          {/* Missing node: dashed red ring + X */}
          <motion.circle
            cx={END}
            cy={40}
            r={9}
            fill="none"
            stroke="#ff4466"
            strokeWidth={1.5}
            strokeDasharray="3 4"
            animate={reduce ? undefined : { rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            style={{ transformOrigin: `${END}px 40px` }}
          />
          <line
            x1={END - 4}
            y1={36}
            x2={END + 4}
            y2={44}
            stroke="#ff4466"
            strokeWidth={1.5}
          />
          <line
            x1={END - 4}
            y1={44}
            x2={END + 4}
            y2={36}
            stroke="#ff4466"
            strokeWidth={1.5}
          />
        </g>
      ) : (
        <g>
          {/* Overloaded node: pulsing red core with radiating sparks */}
          <motion.circle
            cx={END}
            cy={40}
            r={8}
            fill="#ff4466"
            fillOpacity={0.9}
            animate={
              reduce
                ? undefined
                : { scale: [1, 1.35, 1], opacity: [0.9, 0.5, 0.9] }
            }
            transition={{ duration: 1.1, repeat: Infinity, ease: "easeInOut" }}
            style={{ transformOrigin: `${END}px 40px` }}
          />
          {[0, 60, 120, 180, 240, 300].map((deg) => {
            const rad = (deg * Math.PI) / 180;
            return (
              <motion.line
                key={deg}
                x1={END + Math.cos(rad) * 11}
                y1={40 + Math.sin(rad) * 11}
                x2={END + Math.cos(rad) * 17}
                y2={40 + Math.sin(rad) * 17}
                stroke="#ff6688"
                strokeWidth={1.5}
                strokeLinecap="round"
                animate={reduce ? undefined : { opacity: [0, 1, 0] }}
                transition={{
                  duration: 1.1,
                  repeat: Infinity,
                  delay: deg / 600,
                  ease: "easeInOut",
                }}
              />
            );
          })}
        </g>
      )}

      {/* Traveling packet */}
      {!reduce && (
        <motion.circle
          cy={40}
          r={4}
          fill={is404 ? "#00E88F" : "#00E88F"}
          initial={{ cx: SRC, opacity: 0 }}
          animate={packetTravel}
          transition={{
            duration: is404 ? 2.4 : 2,
            repeat: Infinity,
            ease: is404 ? "easeIn" : "easeInOut",
            repeatDelay: 0.4,
            times: is404 ? [0, 0.45, 1] : [0, 0.5, 1],
          }}
          style={{ filter: "drop-shadow(0 0 4px rgba(0,232,143,0.8))" }}
        />
      )}
    </svg>
  );
}

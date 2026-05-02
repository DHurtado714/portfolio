import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ParallaxLayer } from "@/components/motion/parallax-layer";
import { HeroEntrance, HeroItem } from "@/components/motion/hero-entrance";
import { Typewriter } from "@/components/motion/typewriter";
import { ShimmerText } from "@/components/motion/shimmer";
import { HeroScene } from "@/components/motion/hero-scene";
import { translations, type Locale } from "@/lib/i18n";

export function Hero({ locale }: { locale: Locale }) {
  const t = translations[locale].hero;

  return (
    <ParallaxLayer>
      <section
        id="hero-section"
        className="relative mx-auto flex min-h-screen max-w-[1400px] flex-col justify-center px-6 pt-[120px] pb-20 md:px-12"
      >
        {/* Background glow */}
        <div
          className="pointer-events-none absolute top-[20%] -right-[10%] h-[700px] w-[700px]"
          style={{
            background:
              "radial-gradient(circle, rgba(0,200,120,0.08) 0%, transparent 65%)",
          }}
        />

        <div className="grid items-center gap-8 md:grid-cols-2">
          <HeroEntrance>
            <HeroItem>
              <div className="font-mono text-xs uppercase tracking-[4px] text-green">
                <Typewriter text={t.typewriter} speed={35} startDelay={600} />
              </div>
            </HeroItem>

            <HeroItem>
              <h1 className="mt-8 font-heading text-[clamp(44px,7vw,88px)] leading-[1.05] font-extrabold tracking-[-1.5px] md:tracking-[-3px]">
                <span className="block">Daniel</span>
                <span className="block">
                  <ShimmerText className="bg-gradient-to-br from-[#00C878] via-[#00E88F] to-[#00FFB2] bg-clip-text text-transparent">
                    Hurtado
                  </ShimmerText>
                </span>
              </h1>
            </HeroItem>

            <HeroItem>
              <p className="mt-8 max-w-[540px] text-lg leading-[1.7] text-text-secondary">
                {t.description}
              </p>
            </HeroItem>

            <HeroItem>
              <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:gap-4">
                <Button
                  asChild
                  className="h-auto w-full rounded-[10px] bg-green px-7 py-4 font-semibold text-[#050505] hover:-translate-y-0.5 hover:bg-green-light hover:shadow-[0_8px_24px_rgba(0,200,120,0.2)] sm:w-auto sm:py-3.5"
                >
                  <Link href="#work">{t.viewWork}</Link>
                </Button>
                <Button
                  asChild
                  variant="ghost"
                  className="h-auto w-full rounded-[10px] border border-border-hover bg-transparent px-7 py-4 text-text-secondary hover:-translate-y-0.5 hover:border-text-muted hover:bg-transparent hover:text-foreground dark:hover:bg-transparent sm:w-auto sm:py-3.5"
                >
                  <Link href="#contact">{t.getInTouch}</Link>
                </Button>
              </div>
            </HeroItem>
          </HeroEntrance>

          {/* 3D Torus Knot */}
          <div className="hidden md:flex h-[520px] w-full items-center justify-center">
            <HeroScene />
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-6 hidden items-center gap-3 font-mono text-[12px] tracking-[2px] text-text-muted md:flex md:left-12">
          <span>{t.scroll}</span>
          <div className="h-px w-10 animate-scroll-pulse bg-linear-to-r from-green to-transparent" />
        </div>
      </section>
    </ParallaxLayer>
  );
}

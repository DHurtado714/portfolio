import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ParallaxLayer } from "@/components/motion/parallax-layer";
import { HeroEntrance, HeroItem } from "@/components/motion/hero-entrance";

export function Hero() {
  return (
    <ParallaxLayer>
      <section
        id="hero-section"
        className="relative mx-auto flex min-h-screen max-w-[1400px] flex-col justify-center px-5 pt-[120px] pb-20 md:px-12"
      >
        {/* Background glow */}
        <div
          className="pointer-events-none absolute top-[20%] -right-[10%] h-[700px] w-[700px]"
          style={{
            background:
              "radial-gradient(circle, rgba(0,200,120,0.08) 0%, transparent 65%)",
          }}
        />

        <HeroEntrance>
          <HeroItem>
            <div className="font-mono text-xs uppercase tracking-[4px] text-green">
              Software Engineer &mdash; Backend &middot; Fintech &middot; ML
            </div>
          </HeroItem>

          <HeroItem>
            <h1 className="mt-8 font-heading text-[clamp(44px,7vw,88px)] leading-[1.05] font-extrabold tracking-[-3px]">
              <span className="block">I think in</span>
              <span className="block">
                <span className="bg-gradient-to-br from-[#00C878] via-[#00E88F] to-[#00FFB2] bg-clip-text text-transparent">
                  systems
                </span>{" "}
                and
              </span>
              <span className="block">build with code.</span>
            </h1>
          </HeroItem>

          <HeroItem>
            <p className="mt-8 max-w-[540px] text-lg leading-[1.7] text-text-secondary">
              Engineer obsessed with how things connect &mdash; from distributed
              architectures to financial flows across borders. Currently building
              fintech infrastructure in Latin America.
            </p>
          </HeroItem>

          <HeroItem>
            <div className="mt-10 flex gap-4">
              <Button
                asChild
                className="h-auto rounded-[10px] bg-green px-7 py-3.5 font-semibold text-[#050505] hover:-translate-y-0.5 hover:bg-green-light hover:shadow-[0_8px_24px_rgba(0,200,120,0.2)]"
              >
                <Link href="#work">View my work &darr;</Link>
              </Button>
              <Button
                asChild
                variant="ghost"
                className="h-auto rounded-[10px] border border-border-hover bg-transparent px-7 py-3.5 text-text-secondary hover:-translate-y-0.5 hover:border-text-muted hover:bg-transparent hover:text-foreground dark:hover:bg-transparent"
              >
                <Link href="#contact">Get in touch</Link>
              </Button>
            </div>
          </HeroItem>

          <HeroItem>
            <div className="absolute bottom-10 left-5 hidden items-center gap-3 font-mono text-[10px] tracking-[2px] text-text-muted md:flex md:left-12">
              <span>SCROLL</span>
              <div className="h-px w-10 animate-scroll-pulse bg-gradient-to-r from-green to-transparent" />
            </div>
          </HeroItem>
        </HeroEntrance>
      </section>
    </ParallaxLayer>
  );
}

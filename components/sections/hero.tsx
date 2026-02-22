import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
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

      <div className="animate-slide-up font-mono text-xs uppercase tracking-[4px] text-green [animation-delay:0.3s]">
        Software Engineer &mdash; Backend &middot; Fintech &middot; ML
      </div>

      <h1 className="mt-8 animate-slide-up font-heading text-[clamp(44px,7vw,88px)] leading-[1.05] font-extrabold tracking-[-3px] [animation-delay:0.5s]">
        <span className="block">I think in</span>
        <span className="block">
          <span className="bg-gradient-to-br from-[#00C878] via-[#00E88F] to-[#00FFB2] bg-clip-text text-transparent">
            systems
          </span>{" "}
          and
        </span>
        <span className="block">build with code.</span>
      </h1>

      <p className="mt-8 max-w-[540px] animate-slide-up text-lg leading-[1.7] text-text-secondary [animation-delay:0.7s]">
        Engineer obsessed with how things connect &mdash; from distributed
        architectures to financial flows across borders. Currently building
        fintech infrastructure in Latin America.
      </p>

      <div className="mt-10 flex animate-slide-up gap-4 [animation-delay:0.9s]">
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

      <div className="absolute bottom-10 left-5 hidden animate-slide-up items-center gap-3 font-mono text-[10px] tracking-[2px] text-text-muted [animation-delay:1.2s] md:flex md:left-12">
        <span>SCROLL</span>
        <div className="h-px w-10 animate-scroll-pulse bg-gradient-to-r from-green to-transparent" />
      </div>
    </section>
  );
}

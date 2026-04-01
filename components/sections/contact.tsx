import { contactLinks } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { MagneticButton } from "@/components/motion/magnetic-button";

export function Contact() {
  return (
    <section
      className="relative px-6 py-16 text-center md:px-12 md:py-[160px]"
      id="contact"
    >
      <div
        className="pointer-events-none absolute bottom-0 left-1/2 h-[400px] w-[800px] -translate-x-1/2"
        style={{
          background:
            "radial-gradient(ellipse, rgba(0,200,120,0.08) 0%, transparent 70%)",
        }}
      />

      <ScrollReveal direction="up">
        <span className="mb-6 block font-mono text-xs tracking-[2px] text-green">
          06
        </span>
        <h2 className="mb-4 font-heading text-[clamp(36px,5vw,60px)] font-extrabold tracking-[-2px]">
          Let&apos;s build
          <br />
          <span className="bg-gradient-to-br from-[#00C878] to-[#00E88F] bg-clip-text text-transparent">
            something
          </span>{" "}
          together.
        </h2>
        <p className="mx-auto mb-10 max-w-[480px] text-[17px] leading-[1.7] text-text-secondary">
          Open to fintech opportunities, interesting backend challenges, and
          conversations about systems that matter.
        </p>

        <div className="flex flex-wrap justify-center gap-3 sm:gap-6">
          {contactLinks.map((link) => (
            <MagneticButton key={link.label}>
              <Button
                asChild
                variant="ghost"
                className="group h-auto flex gap-2.5 rounded-[10px] border border-border-subtle bg-surface px-6 py-3.5 font-mono font-normal text-[13px] text-text-secondary hover:border-green hover:bg-transparent hover:text-green dark:hover:bg-transparent"
              >
                <a
                  href={link.href}
                  {...(link.external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                >
                  <span>{link.label}</span>
                  <span className="transition-transform group-hover:translate-x-0.5">
                    &rarr;
                  </span>
                </a>
              </Button>
            </MagneticButton>
          ))}
        </div>
      </ScrollReveal>
    </section>
  );
}

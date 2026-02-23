import { identityCards } from "@/lib/data";
import { Card } from "@/components/ui/card";
import { SectionHeader } from "./section-header";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { StaggerContainer, StaggerItem } from "@/components/motion/stagger";

export function About() {
  return (
    <section className="mx-auto max-w-[1400px] px-5 py-20 md:px-12 md:py-[120px]" id="about">
      <SectionHeader number="01" label="About" />
      <h2 className="mb-5 font-heading text-[clamp(32px,4vw,52px)] leading-[1.1] font-extrabold tracking-[-2px]">
        Not just what I build,
        <br />
        but how I think.
      </h2>

      <div className="grid items-start gap-12 md:grid-cols-2 md:gap-16">
        <ScrollReveal direction="up">
          <div>
            <p className="mb-4 text-base leading-[1.8] text-text-secondary">
              I&apos;m a{" "}
              <strong className="font-semibold text-foreground">
                Colombian engineer
              </strong>{" "}
              studying Computer Science at{" "}
              <strong className="font-semibold text-foreground">
                Tec de Monterrey
              </strong>{" "}
              who sees the world as interconnected systems. Whether it&apos;s a
              payment pipeline processing $300M+ or the way financial
              infrastructure flows across borders &mdash; I&apos;m drawn to
              understanding the architecture underneath.
            </p>
            <p className="mb-4 text-base leading-[1.8] text-text-secondary">
              My work at{" "}
              <strong className="font-semibold text-foreground">
                Capa.fi
              </strong>{" "}
              sits at the intersection of{" "}
              <strong className="font-semibold text-foreground">
                backend engineering, financial systems, and machine learning
              </strong>
              . I build the invisible infrastructure that makes money move
              across Mexico, USA, Europe, and Dominican Republic.
            </p>
            <p className="text-base leading-[1.8] text-text-secondary">
              But I&apos;m more than my IDE. I think best after a paddle tennis
              match, trade options for the intellectual challenge, and believe
              the best code comes from engineers who actually live in the world
              they&apos;re building for.
            </p>
          </div>
        </ScrollReveal>

        <StaggerContainer className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {identityCards.map((card) => (
            <StaggerItem key={card.title}>
              <Card className="group relative overflow-hidden border-border-subtle bg-surface p-6 gap-0 shadow-none transition-all hover:-translate-y-0.5 hover:border-border-hover">
                <span className="absolute top-0 left-0 right-0 h-0.5 origin-left scale-x-0 bg-green transition-transform group-hover:scale-x-100" />
                <span className="mb-3 block text-2xl">{card.icon}</span>
                <h4 className="mb-1.5 font-heading text-[15px] font-bold">
                  {card.title}
                </h4>
                <p className="text-[13px] leading-normal text-text-muted">
                  {card.desc}
                </p>
              </Card>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}

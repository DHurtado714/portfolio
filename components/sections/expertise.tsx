import { expertiseData } from "@/lib/data";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SectionHeader } from "./section-header";
import { StaggerContainer, StaggerItem } from "@/components/motion/stagger";

export function Expertise() {
  return (
    <section className="mx-auto max-w-[1400px] px-5 py-20 md:px-12 md:py-[120px]" id="expertise">
      <SectionHeader number="02" label="Expertise" />
      <h2 className="mb-5 font-heading text-[clamp(32px,4vw,52px)] leading-[1.1] font-extrabold tracking-[-2px]">
        What I bring
        <br />
        to the table.
      </h2>
      <p className="mb-16 max-w-[560px] text-[17px] leading-[1.7] text-text-secondary">
        Deep backend expertise with a full-stack perspective. I don&apos;t just
        write endpoints &mdash; I design the systems that make products
        possible.
      </p>

      <StaggerContainer className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {expertiseData.map((item) => (
          <StaggerItem key={item.title}>
            <Card className="group relative overflow-hidden rounded-[20px] border-border-subtle bg-surface p-8 gap-0 shadow-none transition-all duration-400 hover:-translate-y-1 hover:border-green/20">
              <div
                className="pointer-events-none absolute bottom-0 left-0 right-0 h-[120px] opacity-0 transition-opacity duration-400 group-hover:opacity-100"
                style={{
                  background: "linear-gradient(to top, rgba(0,200,120,0.08), transparent)",
                }}
              />
              <span className="mb-6 block font-mono text-[28px] text-green">
                {item.icon}
              </span>
              <h3 className="mb-3 font-heading text-xl font-bold tracking-[-0.5px]">
                {item.title}
              </h3>
              <p className="relative z-[1] mb-5 text-sm leading-[1.7] text-text-secondary">
                {item.desc}
              </p>
              <div className="relative z-[1] flex flex-wrap gap-1.5">
                {item.tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="outline"
                    className="rounded-md border-border-subtle bg-white/[0.04] px-2.5 py-1 font-mono font-normal text-[10px] tracking-[0.5px] text-text-muted transition-all hover:border-green hover:text-green"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </Card>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </section>
  );
}

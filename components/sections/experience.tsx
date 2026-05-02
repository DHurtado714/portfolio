import { getData } from "@/lib/data";
import { SectionHeader } from "./section-header";
import { StaggerContainer, StaggerItem } from "@/components/motion/stagger";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { TimelineDrawLine } from "@/components/motion/timeline-draw";
import { translations, type Locale } from "@/lib/i18n";

export function Experience({ locale }: { locale: Locale }) {
  const t = translations[locale].experience;
  const { timeline } = getData(locale);

  return (
    <section className="mx-auto max-w-[1400px] px-6 py-20 md:px-12 md:py-[120px]" id="experience">
      <SectionHeader number="04" label={t.sectionLabel} />
      <h2 className="mb-5 font-heading text-[clamp(32px,4vw,52px)] leading-[1.1] font-extrabold tracking-[-2px]">
        {t.headline1}
        <br />
        {t.headline2}
      </h2>
      <p className="mb-16 max-w-[560px] text-[19px] leading-[1.7] text-text-secondary">
        {t.description}
      </p>

      <div className="relative pl-10">
        {/* Scroll-linked timeline line */}
        <TimelineDrawLine />

        <StaggerContainer>
          {timeline.map((item) => (
            <StaggerItem key={item.role}>
              <div className="relative pb-12">
                {/* Dot */}
                <ScrollReveal direction="up" className="absolute -left-11 top-2">
                  <div
                    className={`h-2 w-2 rounded-full ${
                      item.current
                        ? "bg-green shadow-[0_0_12px_rgba(0,200,120,0.3)]"
                        : "bg-border-hover"
                    }`}
                  />
                </ScrollReveal>
                <div
                  className={`mb-2 font-mono text-[13px] tracking-[2px] ${
                    item.current ? "text-green" : "text-text-muted"
                  }`}
                >
                  {item.date}
                </div>
                <div className="mb-1 font-heading text-xl font-bold">
                  {item.role}
                </div>
                <div className="mb-3 text-[17px] text-text-secondary">
                  {item.company}
                </div>
                <p className="max-w-[500px] text-sm leading-[1.7] text-text-muted">
                  {item.desc}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}

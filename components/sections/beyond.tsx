import { getData } from "@/lib/data";
import { Card } from "@/components/ui/card";
import { SectionHeader } from "./section-header";
import { StaggerContainer, StaggerItem } from "@/components/motion/stagger";
import { TiltCard } from "@/components/motion/tilt-card";
import { translations, type Locale } from "@/lib/i18n";

export function Beyond({ locale }: { locale: Locale }) {
  const t = translations[locale].beyond;
  const { beyondCards } = getData(locale);

  return (
    <section className="mx-auto max-w-[1400px] px-6 py-20 md:px-12 md:py-[120px]" id="beyond">
      <SectionHeader number="05" label={t.sectionLabel} />
      <h2 className="mb-5 font-heading text-[clamp(32px,4vw,52px)] leading-[1.1] font-extrabold tracking-[-2px]">
        {t.headline1}
        <br />
        {t.headline2}
      </h2>
      <p className="mb-16 max-w-[560px] text-[19px] leading-[1.7] text-text-secondary">
        {t.description}
      </p>

      <StaggerContainer className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {beyondCards.map((card) => (
          <StaggerItem key={card.title}>
            <TiltCard>
              <Card className="overflow-hidden rounded-[20px] border-border-subtle bg-surface p-5 gap-0 shadow-none transition-colors hover:border-border-hover md:p-8">
                <span className="mb-4 block text-[34px]">{card.emoji}</span>
                <h4 className="mb-2 font-heading text-[19px] font-bold">
                  {card.title}
                </h4>
                <p className="text-[15px] leading-relaxed text-text-muted">
                  {card.desc}
                </p>
              </Card>
            </TiltCard>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </section>
  );
}

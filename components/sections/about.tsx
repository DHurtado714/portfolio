import { getData } from "@/lib/data";
import { Card } from "@/components/ui/card";
import { SectionHeader } from "./section-header";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { StaggerContainer, StaggerItem } from "@/components/motion/stagger";
import { translations, type Locale } from "@/lib/i18n";

export function About({ locale }: { locale: Locale }) {
  const t = translations[locale].about;
  const { identityCards } = getData(locale);

  return (
    <section className="mx-auto max-w-[1400px] px-6 py-20 md:px-12 md:py-[120px]" id="about">
      <SectionHeader number="01" label={t.sectionLabel} />
      <h2 className="mb-5 font-heading text-[clamp(32px,4vw,52px)] leading-[1.1] font-extrabold tracking-[-2px]">
        {t.headline1}
        <br />
        {t.headline2}
      </h2>

      <div className="grid items-start gap-12 md:grid-cols-2 md:gap-16">
        <ScrollReveal direction="up">
          <div>
            {locale === "es" ? (
              <>
                <p className="mb-4 text-base leading-[1.8] text-text-secondary">
                  Soy un{" "}
                  <strong className="font-semibold text-foreground">
                    ingeniero colombiano
                  </strong>{" "}
                  y egresado de Ciencias Computacionales del{" "}
                  <a href="https://tec.mx" target="_blank" rel="noopener noreferrer" className="font-semibold text-foreground underline-offset-2 hover:text-green transition-colors">
                    Tec de Monterrey
                  </a>{" "}
                  que ve el mundo como sistemas interconectados. Ya sea un
                  pipeline de pagos o la forma en que la infraestructura
                  financiera fluye por 15+ países &mdash; me atrae entender la
                  arquitectura detrás.
                </p>
                <p className="mb-4 text-base leading-[1.8] text-text-secondary">
                  Mi trabajo en{" "}
                  <a href="https://capa.fi" target="_blank" rel="noopener noreferrer" className="font-semibold text-foreground underline-offset-2 hover:text-green transition-colors">
                    Capa.fi
                  </a>{" "}
                  está en la intersección de{" "}
                  <strong className="font-semibold text-foreground">
                    ingeniería backend, sistemas financieros y machine learning
                  </strong>
                  . Construyo la infraestructura invisible que hace mover el
                  dinero entre México, USA, Europa y República Dominicana.
                </p>
                <p className="text-base leading-[1.8] text-text-secondary">
                  Pero soy más que mi IDE. Pienso mejor después de un partido de
                  paddle, hago trading de opciones como reto intelectual, y creo
                  que el mejor código viene de ingenieros que realmente viven en
                  el mundo para el que construyen.
                </p>
              </>
            ) : (
              <>
                <p className="mb-4 text-base leading-[1.8] text-text-secondary">
                  I&apos;m a{" "}
                  <strong className="font-semibold text-foreground">
                    Colombian engineer
                  </strong>{" "}
                  and Computer Science graduate from{" "}
                  <a href="https://tec.mx" target="_blank" rel="noopener noreferrer" className="font-semibold text-foreground underline-offset-2 hover:text-green transition-colors">
                    Tec de Monterrey
                  </a>{" "}
                  who sees the world as interconnected systems. Whether it&apos;s a
                  payment pipeline or the way financial infrastructure flows across
                  15+ countries &mdash; I&apos;m drawn to understanding the
                  architecture underneath.
                </p>
                <p className="mb-4 text-base leading-[1.8] text-text-secondary">
                  My work at{" "}
                  <a href="https://capa.fi" target="_blank" rel="noopener noreferrer" className="font-semibold text-foreground underline-offset-2 hover:text-green transition-colors">
                    Capa.fi
                  </a>{" "}
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
              </>
            )}
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

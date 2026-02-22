import { identityCards } from "@/lib/data";
import { SectionHeader } from "./section-header";

export function About() {
  return (
    <section className="mx-auto max-w-[1400px] px-5 py-20 md:px-12 md:py-[120px]" id="about">
      <SectionHeader number="01" label="About" />
      <h2 className="mb-5 font-heading text-[clamp(32px,4vw,52px)] leading-[1.1] font-extrabold tracking-[-2px]">
        Not just what I build,
        <br />
        but how I think.
      </h2>

      <div className="reveal grid items-start gap-12 md:grid-cols-2 md:gap-16">
        <div>
          <p className="mb-4 text-base leading-[1.8] text-text-secondary">
            I&apos;m a{" "}
            <strong className="font-semibold text-foreground">
              Colombian engineer
            </strong>{" "}
            who sees the world as interconnected systems. Whether it&apos;s a
            payment pipeline processing millions or the way a city&apos;s
            infrastructure flows &mdash; I&apos;m drawn to understanding the
            architecture underneath.
          </p>
          <p className="mb-4 text-base leading-[1.8] text-text-secondary">
            My work sits at the intersection of{" "}
            <strong className="font-semibold text-foreground">
              backend engineering, financial systems, and machine learning
            </strong>
            . I build the invisible infrastructure that makes money move,
            identities verify, and data transform into decisions.
          </p>
          <p className="text-base leading-[1.8] text-text-secondary">
            But I&apos;m more than my IDE. I&apos;m a{" "}
            <strong className="font-semibold text-foreground">
              digital nomad
            </strong>{" "}
            who thinks best after a paddle tennis match, trades options for the
            intellectual challenge, and believes the best code comes from
            engineers who actually live in the world they&apos;re building for.
          </p>
        </div>

        <div className="stagger grid grid-cols-1 gap-4 sm:grid-cols-2">
          {identityCards.map((card) => (
            <div
              key={card.title}
              className="group relative overflow-hidden rounded-xl border border-border-subtle bg-surface p-6 transition-all hover:-translate-y-0.5 hover:border-border-hover"
            >
              <span className="absolute top-0 left-0 right-0 h-0.5 origin-left scale-x-0 bg-green transition-transform group-hover:scale-x-100" />
              <span className="mb-3 block text-2xl">{card.icon}</span>
              <h4 className="mb-1.5 font-heading text-[15px] font-bold">
                {card.title}
              </h4>
              <p className="text-[13px] leading-[1.5] text-text-muted">
                {card.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

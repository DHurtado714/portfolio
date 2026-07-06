import { contactLinks } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { MagneticButton } from "@/components/motion/magnetic-button";
import { ContactForm } from "@/components/sections/contact-form";
import { translations, type Locale } from "@/lib/i18n";

export function Contact({ locale }: { locale: Locale }) {
  const t = translations[locale].contact;

  return (
    <section
      className="relative px-6 py-16 md:px-12 md:py-[160px]"
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
        <div className="mx-auto grid max-w-[1100px] items-center gap-12 text-center md:grid-cols-2 md:gap-16 md:text-left">
          {/* Left column — pitch + direct links */}
          <div className="min-w-0">
            <span className="mb-6 block font-mono text-xs tracking-[2px] text-green">
              06
            </span>
            <h2 className="mb-4 font-heading text-[clamp(36px,5vw,60px)] font-extrabold tracking-[-2px] hyphens-auto break-words">
              {t.headline1}
              <br />
              <span className="bg-gradient-to-br from-[#00C878] to-[#00E88F] bg-clip-text text-transparent">
                {t.headline2}
              </span>{" "}
              {t.headline3}
            </h2>
            <p className="mx-auto mb-10 max-w-[480px] text-[19px] leading-[1.7] text-text-secondary md:mx-0">
              {t.description}
            </p>

            <p className="mb-4 font-mono text-xs tracking-[1px] text-text-muted">
              {t.form.orReachMe}
            </p>

            <div className="flex flex-wrap justify-center gap-3 sm:gap-6 md:justify-start">
              {contactLinks.map((link) => (
                <MagneticButton key={link.label}>
                  <Button
                    asChild
                    variant="ghost"
                    className="group h-auto flex gap-2.5 rounded-[10px] border border-border-subtle bg-surface px-6 py-3.5 font-mono font-normal text-[15px] text-text-secondary hover:border-green hover:bg-transparent hover:text-green dark:hover:bg-transparent"
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
          </div>

          {/* Right column — the form panel */}
          <div className="rounded-2xl border border-border-subtle bg-surface/40 p-6 backdrop-blur-sm sm:p-8">
            <ContactForm locale={locale} />
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}

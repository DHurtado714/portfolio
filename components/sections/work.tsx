import { metrics, projects } from "@/lib/data";
import { SectionHeader } from "./section-header";

export function Work() {
  return (
    <section className="mx-auto max-w-[1400px] px-5 py-20 md:px-12 md:py-[120px]" id="work">
      <SectionHeader number="03" label="Work" />
      <h2 className="mb-5 font-heading text-[clamp(32px,4vw,52px)] leading-[1.1] font-extrabold tracking-[-2px]">
        Impact measured
        <br />
        in real numbers.
      </h2>
      <p className="mb-16 max-w-[560px] text-[17px] leading-[1.7] text-text-secondary">
        Systems I&apos;ve built handle real money, real users, and real
        regulatory complexity across multiple Latin American markets.
      </p>

      {/* Metrics */}
      <div className="stagger reveal mb-16 grid grid-cols-2 gap-6 lg:grid-cols-4">
        {metrics.map((m) => (
          <div
            key={m.label}
            className="rounded-[20px] border border-border-subtle bg-surface p-10 text-center transition-all hover:border-green/15"
          >
            <div
              className={`mb-2 font-heading text-[40px] font-extrabold tracking-[-2px] ${m.green ? "text-green" : ""}`}
            >
              {m.value}
            </div>
            <div className="font-mono text-[10px] uppercase tracking-[2px] text-text-muted">
              {m.label}
            </div>
          </div>
        ))}
      </div>

      {/* Projects */}
      <h3 className="mb-8 font-mono text-[11px] uppercase tracking-[3px] text-text-muted">
        Selected Projects
      </h3>
      <div className="stagger reveal flex flex-col gap-6">
        {projects.map((p) => (
          <div
            key={p.title}
            className="group relative grid cursor-pointer grid-cols-1 items-start gap-8 overflow-hidden rounded-[20px] border border-border-subtle bg-surface p-10 transition-all duration-400 hover:translate-x-1 hover:border-border-hover md:grid-cols-[1fr_auto]"
          >
            <span className="absolute top-0 left-0 h-full w-[3px] origin-top scale-y-0 bg-green transition-transform duration-400 group-hover:scale-y-100" />
            <div>
              <div className="mb-3 flex items-baseline gap-4">
                <span className="font-heading text-[22px] font-bold tracking-[-0.5px]">
                  {p.title}
                </span>
                <span className="font-mono text-xs text-green">{p.year}</span>
              </div>
              <p className="mb-4 max-w-[600px] text-[15px] leading-[1.7] text-text-secondary">
                {p.desc}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {p.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-md border border-border-subtle bg-white/[0.04] px-2.5 py-1 font-mono text-[10px] tracking-[0.5px] text-text-muted transition-all hover:border-green hover:text-green"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex items-start gap-3 md:flex-col md:items-end">
              <span className="rounded-full border border-border-subtle px-3.5 py-1.5 font-mono text-[10px] uppercase tracking-[2px] text-text-muted">
                {p.type}
              </span>
              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-border-subtle text-lg text-text-muted transition-all group-hover:translate-x-1 group-hover:border-green group-hover:text-green">
                &rarr;
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

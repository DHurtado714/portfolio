import { SectionHeader } from "./section-header";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { ContributionGraph } from "@/components/github/contribution-graph";
import { GitHubStatCards } from "@/components/github/stat-cards";
import { ActivityFeed } from "@/components/github/activity-feed";
import {
  fetchContributionsAndStats,
  fetchRecentEvents,
} from "@/lib/github-data";

export async function GitHubActivity() {
  const [{ stats, contributions }, events] = await Promise.all([
    fetchContributionsAndStats(),
    fetchRecentEvents(),
  ]);

  return (
    <section
      className="mx-auto max-w-[1400px] px-5 py-20 md:px-12 md:py-[120px]"
      id="github"
    >
      <SectionHeader number="05" label="Proof of Work" />
      <ScrollReveal direction="up">
        <h2 className="mb-5 font-heading text-[clamp(32px,4vw,52px)] leading-[1.1] font-extrabold tracking-[-2px]">
          Code speaks louder
          <br />
          than claims.
        </h2>
        <p className="mb-16 max-w-[560px] text-[17px] leading-[1.7] text-text-secondary">
          Consistent contributions across backend systems, fintech
          infrastructure, and open-source experiments.
        </p>
      </ScrollReveal>

      <GitHubStatCards stats={stats} />

      <div className="mb-12">
        <h3 className="mb-6 font-mono text-[11px] uppercase tracking-[3px] text-text-muted">
          Contribution Activity
        </h3>
        <ContributionGraph contributions={contributions} />
      </div>

      <div>
        <h3 className="mb-4 font-mono text-[11px] uppercase tracking-[3px] text-text-muted">
          Recent Activity
        </h3>
        <ActivityFeed events={events} />
      </div>
    </section>
  );
}

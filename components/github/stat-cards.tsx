"use client";

import { Card } from "@/components/ui/card";
import { CountUp } from "@/components/motion/count-up";
import { StaggerContainer, StaggerItem } from "@/components/motion/stagger";
import type { GitHubStats } from "@/lib/github-data";

export function GitHubStatCards({ stats }: { stats: GitHubStats }) {
  return (
    <StaggerContainer className="mb-12 grid grid-cols-2 gap-4 lg:grid-cols-4">
      <StaggerItem>
        <Card className="rounded-[16px] border-border-subtle bg-surface p-6 text-center gap-0 shadow-none transition-all hover:border-green/15">
          <div className="mb-1 font-heading text-[34px] font-extrabold tracking-[-2px] text-green">
            <CountUp target={stats.totalContributions} />
          </div>
          <div className="font-mono text-[12px] uppercase tracking-[2px] text-text-muted">
            Contributions
          </div>
        </Card>
      </StaggerItem>
      <StaggerItem>
        <Card className="rounded-[16px] border-border-subtle bg-surface p-6 text-center gap-0 shadow-none transition-all hover:border-green/15">
          <div className="mb-1 font-heading text-[34px] font-extrabold tracking-[-2px]">
            <CountUp target={stats.publicRepos} />
          </div>
          <div className="font-mono text-[12px] uppercase tracking-[2px] text-text-muted">
            Public Repos
          </div>
        </Card>
      </StaggerItem>
      <StaggerItem>
        <Card className="rounded-[16px] border-border-subtle bg-surface p-6 text-center gap-0 shadow-none transition-all hover:border-green/15">
          <div className="mb-1 font-heading text-[34px] font-extrabold tracking-[-2px] text-green">
            {stats.primaryLanguage}
          </div>
          <div className="font-mono text-[12px] uppercase tracking-[2px] text-text-muted">
            Primary Language
          </div>
        </Card>
      </StaggerItem>
      <StaggerItem>
        <Card className="rounded-[16px] border-border-subtle bg-surface p-6 text-center gap-0 shadow-none transition-all hover:border-green/15">
          <div className="mb-1 font-heading text-[34px] font-extrabold tracking-[-2px]">
            <CountUp target={stats.currentStreak} suffix=" days" />
          </div>
          <div className="font-mono text-[12px] uppercase tracking-[2px] text-text-muted">
            Current Streak
          </div>
        </Card>
      </StaggerItem>
    </StaggerContainer>
  );
}

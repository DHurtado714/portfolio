"use client";

import { GitCommit, GitPullRequest, CircleDot, Eye, Star } from "lucide-react";
import { StaggerContainer, StaggerItem } from "@/components/motion/stagger";
import { recentEvents, type GitHubEvent } from "@/lib/github-data";

const typeIcons: Record<GitHubEvent["type"], React.ReactNode> = {
  push: <GitCommit size={14} className="text-green" />,
  pr: <GitPullRequest size={14} className="text-blue-400" />,
  issue: <CircleDot size={14} className="text-yellow-400" />,
  review: <Eye size={14} className="text-purple-400" />,
  star: <Star size={14} className="text-yellow-400" />,
};

export function ActivityFeed() {
  return (
    <StaggerContainer className="flex flex-col gap-1">
      {recentEvents.map((event, i) => (
        <StaggerItem key={i}>
          <div className="group flex items-center gap-4 rounded-xl px-4 py-3 transition-colors hover:bg-surface-elevated">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-surface-elevated group-hover:bg-surface">
              {typeIcons[event.type]}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-baseline gap-2">
                <span className="font-mono text-[11px] text-green">
                  {event.repo}
                </span>
                <span className="font-mono text-[10px] text-text-muted">
                  {event.time}
                </span>
              </div>
              <p className="truncate text-[13px] text-text-secondary">
                {event.message}
              </p>
            </div>
          </div>
        </StaggerItem>
      ))}
    </StaggerContainer>
  );
}

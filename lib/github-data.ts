// ─── GitHub Data (Server-side fetch) ─────────────────────────────────────────
// Fetches real data from GitHub API at runtime with ISR caching.
// Requires GITHUB_TOKEN env var for contribution graph (GraphQL API).
// Falls back to placeholder data if the API is unavailable.

const GITHUB_USERNAME = "DHurtado714";

// ─── Types ───────────────────────────────────────────────────────────────────

export interface ContributionDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

export interface GitHubStats {
  totalContributions: number;
  publicRepos: number;
  primaryLanguage: string;
  currentStreak: number;
}

export interface GitHubEvent {
  type: "push" | "pr" | "issue" | "review" | "star";
  repo: string;
  message: string;
  time: string;
}

// ─── GraphQL ─────────────────────────────────────────────────────────────────

const CONTRIBUTIONS_QUERY = `
query($username: String!) {
  user(login: $username) {
    contributionsCollection {
      contributionCalendar {
        totalContributions
        weeks {
          contributionDays {
            date
            contributionCount
            contributionLevel
          }
        }
      }
    }
    repositories(first: 100, ownerAffiliations: OWNER, privacy: PUBLIC, orderBy: { field: STARGAZERS, direction: DESC }) {
      totalCount
      nodes {
        primaryLanguage { name }
      }
    }
  }
}
`;

const LEVEL_MAP: Record<string, 0 | 1 | 2 | 3 | 4> = {
  NONE: 0,
  FIRST_QUARTILE: 1,
  SECOND_QUARTILE: 2,
  THIRD_QUARTILE: 3,
  FOURTH_QUARTILE: 4,
};

// ─── Helpers ─────────────────────────────────────────────────────────────────

function computeStreak(days: ContributionDay[]): number {
  let streak = 0;
  let started = false;
  for (let i = days.length - 1; i >= 0; i--) {
    if (days[i].count > 0) {
      streak++;
      started = true;
    } else if (started) {
      break;
    }
  }
  return streak;
}

function computePrimaryLanguage(
  repos: Array<{ primaryLanguage: { name: string } | null }>
): string {
  const counts: Record<string, number> = {};
  for (const repo of repos) {
    const lang = repo.primaryLanguage?.name;
    if (lang) counts[lang] = (counts[lang] || 0) + 1;
  }
  const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);
  return sorted[0]?.[0] ?? "TypeScript";
}

function timeAgo(dateString: string): string {
  const seconds = Math.floor(
    (Date.now() - new Date(dateString).getTime()) / 1000
  );
  if (seconds < 60) return "just now";
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  return `${Math.floor(seconds / 86400)}d ago`;
}

const EVENT_TYPE_MAP: Record<string, GitHubEvent["type"]> = {
  PushEvent: "push",
  PullRequestEvent: "pr",
  IssuesEvent: "issue",
  PullRequestReviewEvent: "review",
  WatchEvent: "star",
};

function getEventMessage(event: { type: string; payload: Record<string, unknown> }): string {
  switch (event.type) {
    case "PushEvent": {
      const commits = event.payload.commits as Array<{ message: string }> | undefined;
      return commits?.[0]?.message?.split("\n")[0] ?? "pushed commits";
    }
    case "PullRequestEvent": {
      const pr = event.payload.pull_request as { title: string } | undefined;
      const action = event.payload.action as string;
      return `${action}: ${pr?.title ?? "pull request"}`;
    }
    case "IssuesEvent": {
      const issue = event.payload.issue as { title: string } | undefined;
      return issue?.title ?? "issue update";
    }
    case "PullRequestReviewEvent": {
      const pr = event.payload.pull_request as { title: string } | undefined;
      return `review: ${pr?.title ?? "pull request"}`;
    }
    case "WatchEvent":
      return "starred repository";
    default:
      return "activity";
  }
}

// ─── Fetch functions ─────────────────────────────────────────────────────────

export async function fetchContributionsAndStats(): Promise<{
  stats: GitHubStats;
  contributions: ContributionDay[];
}> {
  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    console.warn("[github] GITHUB_TOKEN not set — using placeholder data");
    return { stats: PLACEHOLDER_STATS, contributions: generatePlaceholderContributions() };
  }

  try {
    const res = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: CONTRIBUTIONS_QUERY,
        variables: { username: GITHUB_USERNAME },
      }),
      next: { revalidate: 3600 },
    });

    if (!res.ok) throw new Error(`GraphQL ${res.status}`);

    const json = await res.json();
    const user = json.data.user;
    const calendar = user.contributionsCollection.contributionCalendar;

    const contributions: ContributionDay[] = calendar.weeks
      .flatMap(
        (w: { contributionDays: Array<{ date: string; contributionCount: number; contributionLevel: string }> }) =>
          w.contributionDays
      )
      .slice(-180)
      .map(
        (d: { date: string; contributionCount: number; contributionLevel: string }) => ({
          date: d.date,
          count: d.contributionCount,
          level: LEVEL_MAP[d.contributionLevel] ?? 0,
        })
      );

    const stats: GitHubStats = {
      totalContributions: calendar.totalContributions,
      publicRepos: user.repositories.totalCount,
      primaryLanguage: computePrimaryLanguage(user.repositories.nodes),
      currentStreak: computeStreak(contributions),
    };

    return { stats, contributions };
  } catch (e) {
    console.error("[github] Failed to fetch contributions:", e);
    return { stats: PLACEHOLDER_STATS, contributions: generatePlaceholderContributions() };
  }
}

export async function fetchRecentEvents(): Promise<GitHubEvent[]> {
  const headers: Record<string, string> = {
    Accept: "application/vnd.github.v3+json",
  };
  const token = process.env.GITHUB_TOKEN;
  if (token) headers.Authorization = `bearer ${token}`;

  try {
    const res = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/events/public?per_page=5`,
      { headers, next: { revalidate: 3600 } }
    );

    if (!res.ok) throw new Error(`Events API ${res.status}`);

    const events = (await res.json()) as Array<{
      type: string;
      repo: { name: string };
      payload: Record<string, unknown>;
      created_at: string;
    }>;

    return events
      .filter((e) => EVENT_TYPE_MAP[e.type])
      .slice(0, 5)
      .map((e) => ({
        type: EVENT_TYPE_MAP[e.type],
        repo: e.repo.name.split("/").pop() ?? e.repo.name,
        message: getEventMessage(e),
        time: timeAgo(e.created_at),
      }));
  } catch (e) {
    console.error("[github] Failed to fetch events:", e);
    return PLACEHOLDER_EVENTS;
  }
}

// ─── Placeholder fallbacks ───────────────────────────────────────────────────

const PLACEHOLDER_STATS: GitHubStats = {
  totalContributions: 847,
  publicRepos: 23,
  primaryLanguage: "TypeScript",
  currentStreak: 14,
};

function generatePlaceholderContributions(): ContributionDay[] {
  const days: ContributionDay[] = [];
  const now = new Date();

  for (let i = 179; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);

    const isWeekend = date.getDay() === 0 || date.getDay() === 6;
    const rand = Math.random();
    let count: number;
    let level: 0 | 1 | 2 | 3 | 4;

    if (isWeekend) {
      if (rand < 0.4) { count = 0; level = 0; }
      else if (rand < 0.7) { count = Math.floor(Math.random() * 3) + 1; level = 1; }
      else { count = Math.floor(Math.random() * 5) + 3; level = 2; }
    } else {
      if (rand < 0.1) { count = 0; level = 0; }
      else if (rand < 0.3) { count = Math.floor(Math.random() * 3) + 1; level = 1; }
      else if (rand < 0.6) { count = Math.floor(Math.random() * 6) + 3; level = 2; }
      else if (rand < 0.85) { count = Math.floor(Math.random() * 8) + 6; level = 3; }
      else { count = Math.floor(Math.random() * 10) + 10; level = 4; }
    }

    days.push({ date: date.toISOString().split("T")[0], count, level });
  }
  return days;
}

const PLACEHOLDER_EVENTS: GitHubEvent[] = [
  { type: "push", repo: "payment-engine", message: "feat: add multi-currency settlement reconciliation", time: "2h ago" },
  { type: "pr", repo: "fx-service", message: "refactor: extract rate aggregation into standalone module", time: "5h ago" },
  { type: "review", repo: "kyc-pipeline", message: "review: approve DDD event handler refactor", time: "1d ago" },
  { type: "push", repo: "portfolio", message: "feat: add architecture diagram and terminal widget", time: "2d ago" },
  { type: "issue", repo: "ml-risk-model", message: "investigate: false positive rate on high-value txns", time: "3d ago" },
];

// ─── Metrics (Work section) ───────────────────────────────────────────────────

export interface Metric {
  value: string;
  label: string;
  green: boolean;
}

export const metrics: Metric[] = [
  { value: "$200M+", label: "Transaction Volume", green: true },
  { value: "3", label: "Countries", green: false },
  { value: "5+", label: "Exchange Integrations", green: false },
  { value: "99.9%", label: "System Uptime", green: true },
];

// ─── Projects (Work section) ─────────────────────────────────────────────────

export interface Project {
  title: string;
  year: string;
  desc: string;
  tags: string[];
  type: string;
}

export const projects: Project[] = [
  {
    title: "Cross-Border Payment Engine",
    year: "2024",
    desc: "Real-time currency conversion and settlement system processing transactions across Mexico, Colombia, and Dominican Republic. Handles multiple exchange providers, fee calculations, and regulatory compliance per jurisdiction.",
    tags: ["NestJS", "TypeScript", "AWS", "PostgreSQL", "Event-Driven"],
    type: "Backend",
  },
  {
    title: "KYC/KYB Verification Pipeline",
    year: "2024",
    desc: "Identity verification system for crypto ramp operations. Domain-driven design with clean event architecture, supporting both individual and business verification flows across multiple regulatory frameworks.",
    tags: ["DDD", "TypeORM", "Events", "Compliance"],
    type: "Backend",
  },
  {
    title: "Crypto Ramp Integration Layer",
    year: "2023–2024",
    desc: "Unified integration layer connecting multiple exchanges (Bitso, Rio, Walapay) with standardized interfaces, idempotent transactions, and real-time exchange rate management.",
    tags: ["API Design", "Idempotency", "Crypto", "FX Rates"],
    type: "Full-Stack",
  },
  {
    title: "ML Risk Assessment Model",
    year: "2024",
    desc: "Machine learning model for transaction risk scoring and anomaly detection. Combining financial domain knowledge with classification algorithms to flag suspicious patterns in real-time payment flows.",
    tags: ["Python", "ML", "Classification", "Risk"],
    type: "ML",
  },
  {
    title: "Observability & Monitoring Platform",
    year: "2023",
    desc: "End-to-end monitoring infrastructure with custom dashboards, alerting, and distributed tracing. Providing real-time visibility into payment processing health across all services.",
    tags: ["Prometheus", "Grafana", "Docker", "AWS"],
    type: "DevOps",
  },
];

// ─── Timeline (Experience section) ───────────────────────────────────────────

export interface TimelineEntry {
  date: string;
  role: string;
  company: string;
  desc: string;
  current: boolean;
}

export const timeline: TimelineEntry[] = [
  {
    date: "2023 — PRESENT",
    role: "Software Engineer",
    company: "Fintech — Cross-border Payments",
    desc: "Building the core payment infrastructure processing $200M+ across Mexico, Colombia, and Dominican Republic. Leading backend architecture decisions, designing event-driven systems, and integrating multiple exchange providers and regulatory frameworks.",
    current: true,
  },
  {
    date: "PREVIOUS",
    role: "Full-Stack Engineer",
    company: "Various — Tech & Finance",
    desc: "Built web applications, APIs, and data systems across multiple domains. Developed expertise in TypeScript ecosystems, cloud infrastructure, and the fundamentals of clean, testable architecture.",
    current: false,
  },
  {
    date: "CONTINUOUS",
    role: "Independent Learner",
    company: "ML, Trading Systems, Blockchain",
    desc: "Self-directed exploration of machine learning applications, options trading strategies, blockchain development, and emerging technologies. Currently expanding into Spring Boot and enterprise Java for finance industry opportunities.",
    current: false,
  },
];

// ─── Expertise (Expertise section) ───────────────────────────────────────────

export interface ExpertiseItem {
  icon: string;
  title: string;
  desc: string;
  tags: string[];
}

export const expertiseData: ExpertiseItem[] = [
  {
    icon: "❯_",
    title: "Backend Architecture",
    desc: "Designing and building scalable APIs, microservices, and modular monoliths. Event-driven systems with clean domain boundaries and bulletproof reliability.",
    tags: ["TypeScript", "NestJS", "Node.js", "DDD", "REST", "PostgreSQL", "TypeORM"],
  },
  {
    icon: "${}",
    title: "Fintech & Payments",
    desc: "Cross-border payment engines, crypto ramp integrations, KYC/KYB pipelines, fee calculation systems, and exchange rate management at scale.",
    tags: ["Payments", "Crypto", "KYC/KYB", "Compliance", "FX Rates", "Idempotency"],
  },
  {
    icon: "≡·",
    title: "ML & Data Systems",
    desc: "Applying machine learning to real problems — risk assessment, pattern recognition, and building the data pipelines that feed intelligent systems.",
    tags: ["Python", "ML Models", "Risk Scoring", "Data Pipelines", "Classification"],
  },
  {
    icon: "☁",
    title: "Cloud & DevOps",
    desc: "Infrastructure as code, containerized deployments, monitoring, and observability — because great backend code needs great infrastructure.",
    tags: ["AWS", "Docker", "IaC", "Prometheus", "Grafana", "CI/CD"],
  },
  {
    icon: "△▽",
    title: "Full-Stack Capability",
    desc: "Backend-first, but fully capable across the stack. I build complete products when needed, from database to UI.",
    tags: ["React", "Next.js", "HTML/CSS", "REST APIs", "Webhooks"],
  },
  {
    icon: "⚐",
    title: "System Design",
    desc: "Architectural thinking at every level — domain modeling, event sourcing patterns, distributed transactions, and clean boundaries.",
    tags: ["Event-Driven", "CQRS", "Clean Arch", "Saga Pattern", "Testing"],
  },
];

// ─── Identity Cards (About section) ──────────────────────────────────────────

export interface IdentityCard {
  icon: string;
  title: string;
  desc: string;
}

export const identityCards: IdentityCard[] = [
  {
    icon: "◆",
    title: "Systems Thinker",
    desc: "I see architecture everywhere — in code, in finance, in how cities work.",
  },
  {
    icon: "△",
    title: "LATAM Native",
    desc: "Building for the region I live in. Context is a competitive advantage.",
  },
  {
    icon: "◯",
    title: "Perpetual Learner",
    desc: "From ML models to Spring Boot — always expanding the stack.",
  },
  {
    icon: "▢",
    title: "Builder Mentality",
    desc: "Work hard, play hard. Ship fast, learn faster.",
  },
];

// ─── Beyond Cards (Beyond section) ───────────────────────────────────────────

export interface BeyondCard {
  emoji: string;
  title: string;
  desc: string;
}

export const beyondCards: BeyondCard[] = [
  {
    emoji: "🌎",
    title: "Digital Nomad",
    desc: "Working remotely across LATAM — Medellín, Buenos Aires, and beyond. Building for a region while actually living in it gives me an edge most remote engineers don\u2019t have.",
  },
  {
    emoji: "🏓",
    title: "Fitness & Paddle Tennis",
    desc: "Daily gym sessions and paddle matches keep me sharp. The discipline of physical training translates directly to how I approach engineering challenges.",
  },
  {
    emoji: "📈",
    title: "Markets & Trading",
    desc: "Options trading and crypto markets as intellectual pursuit. Understanding financial instruments from both the engineering and trading side gives me unique perspective.",
  },
  {
    emoji: "🧠",
    title: "ML Exploration",
    desc: "Constantly experimenting with machine learning applications — from CAPTCHA systems to risk models. Where engineering meets intelligence.",
  },
  {
    emoji: "⚡",
    title: "Work Hard, Play Hard",
    desc: "I believe in intensity — deep focus during work, full presence during life. New cities, new experiences, new problems to solve.",
  },
  {
    emoji: "📚",
    title: "Continuous Growth",
    desc: "Currently exploring Spring Boot, enterprise patterns, and expanding into new language ecosystems. The stack is a tool, not an identity.",
  },
];

// ─── Contact Links (Contact section) ─────────────────────────────────────────

export interface ContactLink {
  label: string;
  href: string;
  external: boolean;
}

export const contactLinks: ContactLink[] = [
  { label: "Email", href: "mailto:daniel@email.com", external: false },
  { label: "GitHub", href: "https://github.com/daniel", external: true },
  { label: "LinkedIn", href: "https://linkedin.com/in/daniel", external: true },
  { label: "Twitter / X", href: "https://twitter.com/daniel", external: true },
];

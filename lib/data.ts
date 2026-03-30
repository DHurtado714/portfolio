// ─── Metrics (Work section) ───────────────────────────────────────────────────

export interface Metric {
  value: string;
  numericTarget: number;
  prefix: string;
  suffix: string;
  decimals: number;
  label: string;
  green: boolean;
}

export const metrics: Metric[] = [
  {
    value: "15+",
    numericTarget: 15,
    prefix: "",
    suffix: "+",
    decimals: 0,
    label: "Countries Visited",
    green: true,
  },
  {
    value: "4",
    numericTarget: 4,
    prefix: "",
    suffix: "",
    decimals: 0,
    label: "Regions",
    green: false,
  },
  {
    value: "3+",
    numericTarget: 3,
    prefix: "",
    suffix: "+",
    decimals: 0,
    label: "Years of Experience",
    green: false,
  },
  {
    value: "5+",
    numericTarget: 5,
    prefix: "",
    suffix: "+",
    decimals: 0,
    label: "Projects Shipped",
    green: true,
  },
];

// ─── Projects (Work section) ─────────────────────────────────────────────────

export interface Project {
  title: string;
  year: string;
  desc: string;
  tags: string[];
  type: string;
  href: string;
}

export const projects: Project[] = [
  {
    title: "Cross-Border Payment Infrastructure",
    year: "2022–Present",
    desc: "Built and maintained cross-border payment systems processing $300M+ USD in transaction volume across Mexico, USA, Europe, and Dominican Republic. Designed dynamic fee calculation and routing systems across multiple providers, optimizing transaction costs by 15%.",
    tags: [
      "NestJS",
      "TypeScript",
      "AWS",
      "PostgreSQL",
      "Event-Driven",
      "RabbitMQ",
    ],
    type: "Backend",
    href: "https://docs.capa.fi",
  },
  {
    title: "AI Risk Assessment Platform",
    year: "2024",
    desc: "Developed ensemble ML models (XGBoost, Random Forest, Isolation Forest) achieving 60% reduction in false positives and 0.95+ AUC-ROC for fraud detection. Built FastAPI application with sub-200ms response times and SHAP-based explainable credit scoring.",
    tags: ["Python", "FastAPI", "XGBoost", "Redis", "Docker", "Prometheus"],
    type: "ML",
    href: "https://github.com/DHurtado714/ai-risk-assesment",
  },
  {
    title: "herbID",
    year: "2025",
    desc: "Full-stack herb classifier that distinguishes cilantro from parsley using a CNN trained on 50k+ herb images — 97.2% accuracy with sub-second inference. Covers the full ML product lifecycle: data collection → model training → FastAPI REST backend → Next.js frontend. Four upload methods: drag & drop, file browse, paste, and camera.",
    tags: ["TensorFlow", "FastAPI", "Next.js", "Python", "AWS S3", "TanStack Query"],
    type: "ML · Full-Stack",
    href: "https://github.com/DHurtado714/Cilantro-Perejil",
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
    date: "2022 — PRESENT",
    role: "Software Engineer",
    company: "Capa.fi — Cross-border Payments",
    desc: "Building core payment infrastructure processing $300M+ across Mexico, USA, Europe, and Dominican Republic. Owning AWS production infrastructure, designing event-driven systems, and optimizing payment routing across multiple providers.",
    current: true,
  },
  {
    date: "2023",
    role: "Full-Stack Developer",
    company: "Zeitgeist Consulting — LinkBridge",
    desc: "Architected enterprise workflow platform with real-time collaboration, PTO tracking, and multi-cloud infrastructure across Firebase and AWS. Achieved 40% faster development cycles using modern React frameworks.",
    current: false,
  },
  {
    date: "2021 — 2025",
    role: "BS Computer Science",
    company: "Tec de Monterrey (ITESM)",
    desc: "Computer Science and Technology at Monterrey Institute of Technology. GPA 96.2/100. Combining academic foundations with real-world engineering experience throughout the program.",
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
    desc: "Designing and building scalable APIs, microservices, and event-driven systems. Clean domain boundaries with bulletproof reliability for financial transactions.",
    tags: [
      "TypeScript",
      "NestJS",
      "Node.js",
      "Java",
      "Spring Boot",
      "PostgreSQL",
      "RabbitMQ",
    ],
  },
  {
    icon: "${}",
    title: "Fintech & Payments",
    desc: "Cross-border payment engines, dynamic fee routing, KYC pipelines, and exchange rate management processing $300M+ across 4 regions.",
    tags: [
      "Payments",
      "KYC",
      "Compliance",
      "FX Rates",
      "Idempotency",
      "Settlement",
    ],
  },
  {
    icon: "≡·",
    title: "ML & Data Systems",
    desc: "Ensemble ML models for fraud detection and risk scoring. Explainable AI with SHAP, achieving 0.95+ AUC-ROC in production systems.",
    tags: [
      "Python",
      "FastAPI",
      "XGBoost",
      "TensorFlow",
      "SHAP",
      "Risk Scoring",
    ],
  },
  {
    icon: "☁",
    title: "Cloud & DevOps",
    desc: "AWS production infrastructure for fintech — ECS, RDS, ElastiCache, Lambda. Infrastructure as code, monitoring, and 99.9% uptime.",
    tags: ["AWS", "Docker", "Terraform", "Prometheus", "Grafana", "CI/CD"],
  },
  {
    icon: "△▽",
    title: "Full-Stack Capability",
    desc: "Backend-first, but fully capable across the stack. Building complete products from database to UI when needed.",
    tags: ["React", "Next.js", "Firebase", "REST APIs", "WebSocket", "Zustand"],
  },
  {
    icon: "⚐",
    title: "System Design",
    desc: "Architectural thinking at every level — domain modeling, event-driven patterns, distributed transactions, and clean boundaries.",
    tags: ["Event-Driven", "DDD", "Clean Architecture", "Testing"],
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
    title: "Colombian Engineer",
    desc: "Building fintech for LATAM from the inside. Context is a competitive advantage.",
  },
  {
    icon: "◯",
    title: "Perpetual Learner",
    desc: "From ML models to Spring Boot to Solidity — always expanding the stack.",
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
    title: "Remote Engineer",
    desc: "Working remotely from Colombia building fintech infrastructure that spans continents. Living in the region I build for gives me an edge most remote engineers don\u2019t have.",
  },
  {
    emoji: "🏓",
    title: "Paddle Tennis & Golf",
    desc: "Paddle matches and golf rounds keep me sharp. The discipline of physical training translates directly to how I approach engineering challenges.",
  },
  {
    emoji: "📈",
    title: "Markets & Trading",
    desc: "Options trading and crypto markets as intellectual pursuit. Understanding financial instruments from both the engineering and trading side gives me unique perspective.",
  },
  {
    emoji: "🧠",
    title: "ML Exploration",
    desc: "Constantly experimenting with machine learning — from fraud detection models to risk scoring systems. Where engineering meets intelligence.",
  },
  {
    emoji: "⚡",
    title: "Work Hard, Play Hard",
    desc: "I believe in intensity — deep focus during work, full presence during life. New cities, new experiences, new problems to solve.",
  },
  {
    emoji: "📚",
    title: "Continuous Growth",
    desc: "AWS certified, Ethereum bootcamp graduate, and always exploring new ecosystems. The stack is a tool, not an identity.",
  },
];

// ─── Contact Links (Contact section) ─────────────────────────────────────────

export interface ContactLink {
  label: string;
  href: string;
  external: boolean;
}

export const contactLinks: ContactLink[] = [
  {
    label: "Email",
    href: "mailto:danielhurtado714@gmail.com",
    external: false,
  },
  { label: "GitHub", href: "https://github.com/DHurtado714", external: true },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/daniel-hurtado",
    external: true,
  },
];

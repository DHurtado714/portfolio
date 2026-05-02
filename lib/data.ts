import type { Locale } from "@/lib/i18n";

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

const metricsBase = [
  { value: "15+", numericTarget: 15, prefix: "", suffix: "+", decimals: 0, green: true },
  { value: "4",   numericTarget: 4,  prefix: "", suffix: "",  decimals: 0, green: false },
  { value: "3+",  numericTarget: 3,  prefix: "", suffix: "+", decimals: 0, green: false },
  { value: "5+",  numericTarget: 5,  prefix: "", suffix: "+", decimals: 0, green: true },
];

const metricsLabels: Record<Locale, string[]> = {
  en: ["Countries Visited", "Regions", "Years of Experience", "Projects Shipped"],
  es: ["Países Visitados",  "Regiones", "Años de Experiencia", "Proyectos Lanzados"],
};

function buildMetrics(locale: Locale): Metric[] {
  return metricsBase.map((m, i) => ({ ...m, label: metricsLabels[locale][i] }));
}

// ─── Projects (Work section) ─────────────────────────────────────────────────

export interface Project {
  title: string;
  year: string;
  desc: string;
  tags: string[];
  type: string;
  href: string;
}

const projectsShared = [
  {
    year: "2022–Present",
    tags: ["NestJS", "TypeScript", "AWS", "PostgreSQL", "Event-Driven", "RabbitMQ"],
    type: "Backend",
    href: "https://capa.fi",
  },
  {
    year: "2024",
    tags: ["Python", "FastAPI", "XGBoost", "Redis", "Docker", "Prometheus"],
    type: "ML",
    href: "https://github.com/DHurtado714/ai-risk-assesment",
  },
  {
    year: "2025",
    tags: ["TensorFlow", "FastAPI", "Next.js", "Python", "AWS S3", "TanStack Query"],
    type: "ML · Full-Stack",
    href: "https://github.com/DHurtado714/Cilantro-Perejil",
  },
];

const projectsLocalized: Record<Locale, Pick<Project, "title" | "desc">[]> = {
  en: [
    {
      title: "Cross-Border Payment Infrastructure",
      desc: "Built and maintained cross-border payment systems processing $300M+ USD in transaction volume across Mexico, USA, Europe, and Dominican Republic. Designed dynamic fee calculation and routing systems across multiple providers, optimizing transaction costs by 15%.",
    },
    {
      title: "AI Risk Assessment Platform",
      desc: "Developed ensemble ML models (XGBoost, Random Forest, Isolation Forest) achieving 60% reduction in false positives and 0.95+ AUC-ROC for fraud detection. Built FastAPI application with sub-200ms response times and SHAP-based explainable credit scoring.",
    },
    {
      title: "herbID",
      desc: "Full-stack herb classifier that distinguishes cilantro from parsley using a CNN trained on 50k+ herb images — 97.2% accuracy with sub-second inference. Covers the full ML product lifecycle: data collection → model training → FastAPI REST backend → Next.js frontend. Four upload methods: drag & drop, file browse, paste, and camera.",
    },
  ],
  es: [
    {
      title: "Infraestructura de Pagos Transfronterizos",
      desc: "Construí y mantuve sistemas de pagos transfronterizos procesando $300M+ USD en volumen de transacciones entre México, USA, Europa y República Dominicana. Diseñé sistemas de cálculo dinámico de tarifas y enrutamiento entre múltiples proveedores, optimizando costos de transacción en un 15%.",
    },
    {
      title: "Plataforma de Evaluación de Riesgo con IA",
      desc: "Desarrollé modelos de ML en ensemble (XGBoost, Random Forest, Isolation Forest) logrando una reducción del 60% en falsos positivos y AUC-ROC de 0.95+ para detección de fraude. Construí una aplicación FastAPI con tiempos de respuesta menores a 200ms y scoring de crédito explicable con SHAP.",
    },
    {
      title: "herbID",
      desc: "Clasificador de hierbas full-stack que distingue cilantro de perejil usando una CNN entrenada con 50k+ imágenes — 97.2% de precisión con inferencia en menos de un segundo. Cubre el ciclo completo del producto ML: recolección de datos → entrenamiento → backend FastAPI → frontend Next.js. Cuatro métodos de carga: drag & drop, explorador, pegar y cámara.",
    },
  ],
};

function buildProjects(locale: Locale): Project[] {
  return projectsShared.map((shared, i) => ({
    ...shared,
    ...projectsLocalized[locale][i],
  }));
}

// ─── Timeline (Experience section) ───────────────────────────────────────────

export interface TimelineEntry {
  date: string;
  role: string;
  company: string;
  desc: string;
  current: boolean;
}

const timelineLocalized: Record<Locale, TimelineEntry[]> = {
  en: [
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
      desc: "Computer Science and Technology at Monterrey Institute of Technology. GPA 96.2/100. Graduated combining academic foundations with real-world engineering experience.",
      current: false,
    },
  ],
  es: [
    {
      date: "2022 — PRESENTE",
      role: "Ingeniero de Software",
      company: "Capa.fi — Pagos Transfronterizos",
      desc: "Construyendo infraestructura de pagos central que procesa $300M+ entre México, USA, Europa y República Dominicana. Gestionando la infraestructura AWS en producción, diseñando sistemas event-driven y optimizando el enrutamiento de pagos entre múltiples proveedores.",
      current: true,
    },
    {
      date: "2023",
      role: "Desarrollador Full-Stack",
      company: "Zeitgeist Consulting — LinkBridge",
      desc: "Diseñé plataforma de flujos de trabajo empresarial con colaboración en tiempo real, seguimiento de PTO e infraestructura multi-cloud entre Firebase y AWS. Logré ciclos de desarrollo 40% más rápidos usando frameworks modernos de React.",
      current: false,
    },
    {
      date: "2021 — 2025",
      role: "Lic. en Ciencias Computacionales",
      company: "Tec de Monterrey (ITESM)",
      desc: "Ciencias Computacionales y Tecnología en el Instituto Tecnológico y de Estudios Superiores de Monterrey. Promedio 96.2/100. Egresé combinando fundamentos académicos con experiencia de ingeniería en el mundo real.",
      current: false,
    },
  ],
};

// ─── Expertise (Expertise section) ───────────────────────────────────────────

export interface ExpertiseItem {
  icon: string;
  title: string;
  desc: string;
  tags: string[];
}

const expertiseShared = [
  { icon: "❯_", tags: ["TypeScript", "NestJS", "Node.js", "Java", "Spring Boot", "PostgreSQL", "RabbitMQ"] },
  { icon: "${}", tags: ["Payments", "KYC", "Compliance", "FX Rates", "Idempotency", "Settlement"] },
  { icon: "≡·",  tags: ["Python", "FastAPI", "XGBoost", "TensorFlow", "SHAP", "Risk Scoring"] },
  { icon: "☁",   tags: ["AWS", "Docker", "Terraform", "Prometheus", "Grafana", "CI/CD"] },
  { icon: "△▽",  tags: ["React", "Next.js", "Firebase", "REST APIs", "WebSocket", "Zustand"] },
  { icon: "⚐",   tags: ["Event-Driven", "DDD", "Clean Architecture", "Testing"] },
];

const expertiseLocalized: Record<Locale, Pick<ExpertiseItem, "title" | "desc">[]> = {
  en: [
    { title: "Backend Architecture",   desc: "Designing and building scalable APIs, microservices, and event-driven systems. Clean domain boundaries with bulletproof reliability for financial transactions." },
    { title: "Fintech & Payments",     desc: "Cross-border payment engines, dynamic fee routing, KYC pipelines, and exchange rate management processing $300M+ across 4 regions." },
    { title: "ML & Data Systems",      desc: "Ensemble ML models for fraud detection and risk scoring. Explainable AI with SHAP, achieving 0.95+ AUC-ROC in production systems." },
    { title: "Cloud & DevOps",         desc: "AWS production infrastructure for fintech — ECS, RDS, ElastiCache, Lambda. Infrastructure as code, monitoring, and 99.9% uptime." },
    { title: "Full-Stack Capability",  desc: "Backend-first, but fully capable across the stack. Building complete products from database to UI when needed." },
    { title: "System Design",          desc: "Architectural thinking at every level — domain modeling, event-driven patterns, distributed transactions, and clean boundaries." },
  ],
  es: [
    { title: "Arquitectura Backend",   desc: "Diseño y construcción de APIs escalables, microservicios y sistemas event-driven. Fronteras de dominio limpias con fiabilidad a prueba de fallos para transacciones financieras." },
    { title: "Fintech & Pagos",        desc: "Motores de pagos transfronterizos, enrutamiento dinámico de tarifas, pipelines KYC y gestión de tipos de cambio procesando $300M+ en 4 regiones." },
    { title: "ML & Sistemas de Datos", desc: "Modelos de ML en ensemble para detección de fraude y scoring de riesgo. IA explicable con SHAP, logrando AUC-ROC de 0.95+ en producción." },
    { title: "Cloud & DevOps",         desc: "Infraestructura AWS en producción para fintech — ECS, RDS, ElastiCache, Lambda. Infraestructura como código, monitoreo y 99.9% de uptime." },
    { title: "Capacidad Full-Stack",   desc: "Backend primero, pero totalmente capaz en todo el stack. Construyendo productos completos de la base de datos a la UI cuando es necesario." },
    { title: "Diseño de Sistemas",     desc: "Pensamiento arquitectónico en todos los niveles — modelado de dominio, patrones event-driven, transacciones distribuidas y fronteras limpias." },
  ],
};

function buildExpertiseData(locale: Locale): ExpertiseItem[] {
  return expertiseShared.map((shared, i) => ({
    ...shared,
    ...expertiseLocalized[locale][i],
  }));
}

// ─── Identity Cards (About section) ──────────────────────────────────────────

export interface IdentityCard {
  icon: string;
  title: string;
  desc: string;
}

const identityCardsLocalized: Record<Locale, IdentityCard[]> = {
  en: [
    { icon: "◆", title: "Systems Thinker",      desc: "I see architecture everywhere — in code, in finance, in how cities work." },
    { icon: "△", title: "Colombian Engineer",    desc: "Building fintech for LATAM from the inside. Context is a competitive advantage." },
    { icon: "◯", title: "Perpetual Learner",     desc: "From ML models to Spring Boot to Solidity — always expanding the stack." },
    { icon: "▢", title: "Builder Mentality",     desc: "Work hard, play hard. Ship fast, learn faster." },
  ],
  es: [
    { icon: "◆", title: "Pensamiento Sistémico", desc: "Veo arquitectura en todas partes — en código, en finanzas, en cómo funcionan las ciudades." },
    { icon: "△", title: "Ingeniero Colombiano",  desc: "Construyendo fintech para LATAM desde adentro. El contexto es una ventaja competitiva." },
    { icon: "◯", title: "Aprendiz Perpetuo",     desc: "Desde modelos de ML hasta Spring Boot y Solidity — siempre expandiendo el stack." },
    { icon: "▢", title: "Mentalidad de Builder", desc: "Trabaja duro, disfruta duro. Entrega rápido, aprende más rápido." },
  ],
};

// ─── Beyond Cards (Beyond section) ───────────────────────────────────────────

export interface BeyondCard {
  emoji: string;
  title: string;
  desc: string;
}

const beyondCardsLocalized: Record<Locale, BeyondCard[]> = {
  en: [
    { emoji: "🌎", title: "Remote Engineer",     desc: "Working remotely from Colombia building fintech infrastructure that spans continents. Living in the region I build for gives me an edge most remote engineers don't have." },
    { emoji: "🏓", title: "Paddle Tennis & Golf", desc: "Paddle matches and golf rounds keep me sharp. The discipline of physical training translates directly to how I approach engineering challenges." },
    { emoji: "📈", title: "Markets & Trading",    desc: "Options trading and crypto markets as intellectual pursuit. Understanding financial instruments from both the engineering and trading side gives me unique perspective." },
    { emoji: "🧠", title: "ML Exploration",       desc: "Constantly experimenting with machine learning — from fraud detection models to risk scoring systems. Where engineering meets intelligence." },
    { emoji: "⚡", title: "Work Hard, Play Hard", desc: "I believe in intensity — deep focus during work, full presence during life. New cities, new experiences, new problems to solve." },
    { emoji: "📚", title: "Continuous Growth",    desc: "AWS certified, Ethereum bootcamp graduate, and always exploring new ecosystems. The stack is a tool, not an identity." },
  ],
  es: [
    { emoji: "🌎", title: "Ingeniero Remoto",         desc: "Trabajando de forma remota desde Colombia construyendo infraestructura fintech que abarca continentes. Vivir en la región para la que construyo me da una ventaja que la mayoría de ingenieros remotos no tienen." },
    { emoji: "🏓", title: "Paddle y Golf",             desc: "Los partidos de paddle y las rondas de golf me mantienen en forma. La disciplina del entrenamiento físico se traduce directamente en cómo abordo los retos de ingeniería." },
    { emoji: "📈", title: "Mercados y Trading",        desc: "Trading de opciones y mercados cripto como ejercicio intelectual. Entender los instrumentos financieros desde el lado de la ingeniería y el trading me da una perspectiva única." },
    { emoji: "🧠", title: "Exploración de ML",         desc: "Experimentando constantemente con machine learning — desde modelos de detección de fraude hasta sistemas de scoring de riesgo. Donde la ingeniería se encuentra con la inteligencia." },
    { emoji: "⚡", title: "Trabaja Duro, Vive Duro",   desc: "Creo en la intensidad — foco profundo durante el trabajo, presencia total durante la vida. Nuevas ciudades, nuevas experiencias, nuevos problemas por resolver." },
    { emoji: "📚", title: "Crecimiento Continuo",      desc: "Certificado en AWS, graduado de bootcamp de Ethereum, y siempre explorando nuevos ecosistemas. El stack es una herramienta, no una identidad." },
  ],
};

// ─── Contact Links (Contact section) — universal ─────────────────────────────

export interface ContactLink {
  label: string;
  href: string;
  external: boolean;
}

export const contactLinks: ContactLink[] = [
  { label: "Email",    href: "mailto:danielhurtado714@gmail.com", external: false },
  { label: "GitHub",   href: "https://github.com/DHurtado714",    external: true },
  { label: "LinkedIn", href: "https://linkedin.com/in/daniel-hurtado", external: true },
];

// ─── getData — single entry point ─────────────────────────────────────────────

export function getData(locale: Locale) {
  return {
    metrics:       buildMetrics(locale),
    projects:      buildProjects(locale),
    timeline:      timelineLocalized[locale],
    expertiseData: buildExpertiseData(locale),
    identityCards: identityCardsLocalized[locale],
    beyondCards:   beyondCardsLocalized[locale],
    contactLinks,
  };
}

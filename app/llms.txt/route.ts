import { getAllPosts } from "@/lib/content";

export const dynamic = "force-static";

const CURATED = `# Daniel Hurtado

> Software Engineer specializing in Backend, Fintech & ML. Building cross-border payment infrastructure processing $300M+ at Capa.fi. Based in Colombia.

## About

Daniel Hurtado is a Colombian software engineer specializing in backend architecture, fintech systems, and machine learning. He currently works at Capa.fi building cross-border payment infrastructure that processes $300M+ in transaction volume across Mexico, USA, Europe, and Dominican Republic. He holds a BS in Computer Science from Monterrey Institute of Technology (ITESM) with a GPA of 96.2/100.

## Core Expertise

- [Backend Architecture](https://danih.dev/#expertise): NestJS, TypeScript, Node.js, Java, Spring Boot, PostgreSQL, RabbitMQ, event-driven systems, microservices
- [Fintech & Payments](https://danih.dev/#expertise): Cross-border payments, KYC pipelines, FX engines, dynamic fee routing, settlement systems, compliance, idempotency
- [ML & Data](https://danih.dev/#expertise): Python, FastAPI, XGBoost, Random Forest, Isolation Forest, TensorFlow, SHAP explainability, fraud detection, risk scoring
- [Cloud & DevOps](https://danih.dev/#expertise): AWS (ECS, RDS, ElastiCache, Lambda), Docker, Terraform, Prometheus, Grafana, CI/CD
- [Full-Stack](https://danih.dev/#expertise): React, Next.js, Firebase, WebSocket, REST APIs
- [System Design](https://danih.dev/#expertise): Event-driven architecture, DDD, clean architecture, distributed transactions

## Key Projects

- [Cross-Border Payment Infrastructure](https://danih.dev/#work): $300M+ transaction volume across 4 regions, 15% transaction cost optimization through dynamic payment routing, 99.9% system uptime
- [AI Risk Assessment Platform](https://danih.dev/#work): Ensemble ML models achieving 60% reduction in false positives and 0.95+ AUC-ROC for fraud detection, sub-200ms response times, SHAP-based explainable credit scoring

## Experience

- 2022–Present: Software Engineer at Capa.fi (cross-border payments)
- 2023: Full-Stack Developer at Zeitgeist Consulting (LinkBridge)
- 2021–2025: BS Computer Science, Tec de Monterrey (ITESM), GPA 96.2/100

## Links

- Website: https://danih.dev
- Blog: https://danih.dev/en/blog
- GitHub: https://github.com/DHurtado714
- LinkedIn: https://linkedin.com/in/daniel-hurtado
- Email: danielhurtado714@gmail.com`;

export function GET() {
  const posts = getAllPosts("en");

  const postLines = posts
    .map(
      (post) =>
        `- [${post.title}](https://danih.dev/en/blog/${post.slug}) — ${post.description} (${post.date})\n  - Español: https://danih.dev/es/blog/${post.slug}`,
    )
    .join("\n");

  const body = `${CURATED}\n\n## Blog Posts\n\n${postLines}\n`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}

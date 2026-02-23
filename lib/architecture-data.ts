export interface DiagramNode {
  id: string;
  label: string;
  tech: string[];
  role: string;
  challenge?: string;
  x: number;
  y: number;
}

export interface DiagramConnection {
  from: string;
  to: string;
}

export const diagramNodes: DiagramNode[] = [
  {
    id: "client",
    label: "Client App",
    tech: ["React", "Next.js", "TypeScript"],
    role: "User-facing application handling payment initiation and status tracking",
    x: 100,
    y: 50,
  },
  {
    id: "gateway",
    label: "API Gateway",
    tech: ["NestJS", "JWT", "Rate Limiting"],
    role: "Central entry point — authentication, validation, and request routing",
    challenge: "Handling 1000+ req/s with sub-100ms latency",
    x: 100,
    y: 180,
  },
  {
    id: "payment",
    label: "Payment Service",
    tech: ["NestJS", "TypeORM", "PostgreSQL"],
    role: "Orchestrates payment lifecycle from initiation to settlement across Mexico, USA, Europe, and DR",
    challenge: "Ensuring idempotency across distributed retries with 15% cost optimization",
    x: 400,
    y: 180,
  },
  {
    id: "fx",
    label: "FX Engine",
    tech: ["TypeScript", "Redis", "WebSocket"],
    role: "Real-time currency conversion with multi-provider rate aggregation",
    challenge: "Rate staleness — quotes expire in seconds across volatile markets",
    x: 700,
    y: 180,
  },
  {
    id: "exchange",
    label: "Exchange Layer",
    tech: ["Bitso", "Rio", "Walapay", "REST"],
    role: "Unified interface to multiple exchange providers with failover",
    challenge: "Each provider has different APIs, limits, and settlement times",
    x: 1000,
    y: 180,
  },
  {
    id: "kyc",
    label: "KYC/Compliance",
    tech: ["DDD", "Event-Driven", "TypeORM"],
    role: "Identity verification and regulatory compliance per jurisdiction",
    challenge: "4 regions × different regulations — reduced onboarding time by 40%",
    x: 100,
    y: 380,
  },
  {
    id: "settlement",
    label: "Settlement Engine",
    tech: ["Saga Pattern", "PostgreSQL", "Events"],
    role: "Manages multi-step settlement with compensation on failure",
    challenge: "Partial failures in distributed transactions across providers",
    x: 400,
    y: 380,
  },
  {
    id: "ledger",
    label: "Ledger",
    tech: ["PostgreSQL", "Double-Entry", "Audit"],
    role: "Immutable financial record — every cent tracked with double-entry bookkeeping",
    challenge: "Reconciliation across multiple currencies and time zones",
    x: 700,
    y: 380,
  },
  {
    id: "notifications",
    label: "Notification Service",
    tech: ["Events", "Email", "WebSocket"],
    role: "Real-time status updates to users and internal monitoring alerts",
    x: 1000,
    y: 380,
  },
];

export const diagramConnections: DiagramConnection[] = [
  { from: "client", to: "gateway" },
  { from: "gateway", to: "payment" },
  { from: "gateway", to: "kyc" },
  { from: "payment", to: "fx" },
  { from: "payment", to: "settlement" },
  { from: "fx", to: "exchange" },
  { from: "settlement", to: "ledger" },
  { from: "settlement", to: "notifications" },
  { from: "kyc", to: "payment" },
  { from: "ledger", to: "notifications" },
];

// Main transaction path for the animated pulse dot
export const mainTransactionPath = [
  "client",
  "gateway",
  "payment",
  "fx",
  "exchange",
];

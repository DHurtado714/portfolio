import { getData } from "@/lib/data";

const { contactLinks, expertiseData, projects, timeline } = getData("en");

export interface CommandResult {
  type: "text" | "html";
  content: string;
}

const WELCOME_BANNER = `Welcome to daniel@portfolio v1.0.0
Type 'help' to see available commands.
`;

const HELP_TEXT = `Available commands:

  about        — Who I am
  stack        — Tech stack & tools
  experience   — Work history
  projects     — Selected projects
  contact      — Get in touch
  philosophy   — How I think about engineering
  fun-facts    — Random things about me
  location     — Where I'm based
  clear        — Clear the terminal
  help         — Show this help message
`;

const ABOUT_TEXT = `Daniel Hurtado
Software Engineer — Backend · Fintech · ML

Engineer obsessed with how things connect — from distributed
architectures to financial flows across borders. Currently
building cross-border payment infrastructure at Capa.fi.

BS Computer Science @ Tec de Monterrey (96.2 GPA)
AWS Certified Solutions Architect & Cloud Practitioner
`;

const PHILOSOPHY_TEXT = `Engineering Philosophy
─────────────────────

1. Systems over code — I think in architectures, not functions
2. Domain first — Understand the business before writing a line
3. Boring technology — Proven tools over shiny frameworks
4. Clean boundaries — DDD, event-driven, clean architecture
5. Ship & iterate — Perfection is the enemy of progress
6. Observability — If you can't measure it, you can't fix it
`;

const FUN_FACTS = `Fun Facts
─────────

→ Processed $300M+ in cross-border transactions
→ Paddle tennis and golf enthusiast
→ AWS Solutions Architect certified
→ Alchemy Ethereum Bootcamp graduate
→ Speak Spanish (native) and English (B2)
→ Currently exploring Spring Boot & enterprise Java
`;

const LOCATION_TEXT = `Location
────────

🌎 Based in Colombia
   Working remotely for Capa.fi
   Building fintech for LATAM from the inside

   Context is a competitive advantage.
`;

function getStackText(): string {
  const lines = expertiseData.map(
    (e) => `  ${e.title}\n    ${e.tags.join(", ")}`
  );
  return `Tech Stack\n──────────\n\n${lines.join("\n\n")}`;
}

function getExperienceText(): string {
  const lines = timeline.map(
    (t) =>
      `  ${t.date}\n  ${t.role} @ ${t.company}\n  ${t.desc.slice(0, 120)}...`
  );
  return `Experience\n──────────\n\n${lines.join("\n\n")}`;
}

function getProjectsText(): string {
  const lines = projects.map(
    (p) =>
      `  ${p.title} (${p.year}) [${p.type}]\n  ${p.desc.slice(0, 100)}...\n  Tags: ${p.tags.join(", ")}`
  );
  return `Selected Projects\n─────────────────\n\n${lines.join("\n\n")}`;
}

function getContactHtml(): string {
  const lines = contactLinks.map((link) => {
    if (link.external) {
      return `  <a href="${link.href}" target="_blank" rel="noopener noreferrer" class="text-green hover:underline">${link.label}</a> → ${link.href}`;
    }
    return `  <a href="${link.href}" class="text-green hover:underline">${link.label}</a> → ${link.href}`;
  });
  return `Contact\n───────\n\n${lines.join("\n")}`;
}

const commands: Record<string, () => CommandResult> = {
  help: () => ({ type: "text", content: HELP_TEXT }),
  about: () => ({ type: "text", content: ABOUT_TEXT }),
  stack: () => ({ type: "text", content: getStackText() }),
  experience: () => ({ type: "text", content: getExperienceText() }),
  projects: () => ({ type: "text", content: getProjectsText() }),
  contact: () => ({ type: "html", content: getContactHtml() }),
  philosophy: () => ({ type: "text", content: PHILOSOPHY_TEXT }),
  "fun-facts": () => ({ type: "text", content: FUN_FACTS }),
  location: () => ({ type: "text", content: LOCATION_TEXT }),
};

const COMMAND_NAMES = Object.keys(commands);

export function processCommand(input: string): CommandResult {
  const trimmed = input.trim().toLowerCase();

  if (trimmed === "clear") {
    return { type: "text", content: "__CLEAR__" };
  }

  if (trimmed === "") {
    return { type: "text", content: "" };
  }

  const handler = commands[trimmed];
  if (handler) {
    return handler();
  }

  return {
    type: "text",
    content: `Command not found: ${trimmed}\nType 'help' to see available commands.`,
  };
}

export function getCompletions(partial: string): string[] {
  if (!partial) return [];
  return COMMAND_NAMES.filter((cmd) =>
    cmd.startsWith(partial.toLowerCase())
  );
}

export function getWelcomeBanner(): CommandResult {
  return { type: "text", content: WELCOME_BANNER };
}

"use server";

import { headers } from "next/headers";
import {
  contactSchema,
  type ContactFormValues,
  type Intent,
} from "@/lib/contact-schema";
import {
  CONTACT_FROM,
  getContactRecipient,
  getResend,
  isEmailConfigured,
} from "@/lib/email";

export type ContactResult =
  | { ok: true }
  | {
      ok: false;
      code:
        | "invalid"
        | "rate_limited"
        | "email_unconfigured"
        | "send_failed"
        | "unknown";
    };

// Human-readable subject label per intent. Keyed by the INTENTS values so the
// subject is never attacker-controlled free text.
const INTENT_LABEL: Record<Intent, string> = {
  freelance: "Freelance",
  idea: "Crazy idea",
  hi: "Just say hi",
};

// Best-effort rate limit: in-memory, per serverless instance. Resets on cold
// start and is NOT shared across instances — a first line of defense only.
// Production should move this to a shared store (e.g. Upstash Ratelimit).
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 3;
const hits = new Map<string, number[]>();

function isRateLimited(key: string): boolean {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= MAX_PER_WINDOW) {
    hits.set(key, recent);
    return true;
  }
  recent.push(now);
  hits.set(key, recent);
  return false;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function sendContactMessage(
  input: ContactFormValues,
): Promise<ContactResult> {
  try {
    // Honeypot: bots fill the hidden `company` field. Pretend success so they
    // get no signal, but send nothing.
    if (typeof input?.company === "string" && input.company.trim() !== "") {
      return { ok: true };
    }

    const headerList = await headers();
    const ip =
      headerList.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    if (isRateLimited(ip)) {
      return { ok: false, code: "rate_limited" };
    }

    const parsed = contactSchema.safeParse(input);
    if (!parsed.success) {
      return { ok: false, code: "invalid" };
    }
    const { name, email, message, intent } = parsed.data;

    if (!isEmailConfigured()) {
      console.warn("[contact] RESEND_API_KEY is not set — email not sent.");
      if (process.env.NODE_ENV !== "production") {
        console.info("[contact] Would send:", { name, email, intent, message });
      }
      return { ok: false, code: "email_unconfigured" };
    }

    const resend = getResend();
    if (!resend) return { ok: false, code: "email_unconfigured" };

    const label = INTENT_LABEL[intent as Intent] ?? "Message";
    const { error } = await resend.emails.send({
      from: CONTACT_FROM,
      to: getContactRecipient(),
      replyTo: email,
      subject: `[Portfolio · ${label}] New message from ${name}`,
      text: `Intent: ${label}\nName: ${name}\nEmail: ${email}\n\n${message}`,
      html: `
        <div style="font-family: sans-serif; line-height: 1.6;">
          <p><strong>Intent:</strong> ${escapeHtml(label)}</p>
          <p><strong>Name:</strong> ${escapeHtml(name)}</p>
          <p><strong>Email:</strong> ${escapeHtml(email)}</p>
          <hr />
          <p style="white-space: pre-wrap;">${escapeHtml(message)}</p>
        </div>
      `,
    });

    if (error) {
      console.error("[contact] Resend error:", error);
      return { ok: false, code: "send_failed" };
    }

    return { ok: true };
  } catch (err) {
    console.error("[contact] Unexpected error:", err);
    return { ok: false, code: "unknown" };
  }
}

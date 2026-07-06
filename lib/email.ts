import { Resend } from "resend";

// Server-only email config. RESEND_API_KEY never has a NEXT_PUBLIC_ prefix, so
// it stays out of the client bundle.
const FROM = "Daniel Hurtado <contact@danih.dev>";
const FALLBACK_TO = "danielhurtado714@gmail.com";

export function isEmailConfigured(): boolean {
  return Boolean(process.env.RESEND_API_KEY);
}

export function getContactRecipient(): string {
  return process.env.CONTACT_TO_EMAIL || FALLBACK_TO;
}

export const CONTACT_FROM = FROM;

// Lazy: only construct the client when a key exists, so a missing key never
// throws at import time (keeps builds and unconfigured deploys healthy).
let client: Resend | null = null;

export function getResend(): Resend | null {
  if (!isEmailConfigured()) return null;
  if (!client) client = new Resend(process.env.RESEND_API_KEY);
  return client;
}

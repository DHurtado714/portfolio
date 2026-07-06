import { z } from "zod";

// The intent chips: what brings a visitor to the contact form. Shared between
// the client chip UI and the server action (constrains the email subject).
export const INTENTS = ["freelance", "idea", "hi"] as const;
export type Intent = (typeof INTENTS)[number];

export interface ContactErrorMessages {
  name: string;
  email: string;
  message: string;
}

// Factory so the client can inject localized validation messages while the
// server action validates with zod's defaults. Both share one shape, so
// client and server validation can never drift.
export function buildContactSchema(messages?: ContactErrorMessages) {
  return z.object({
    name: z.string().trim().min(2, { message: messages?.name }),
    email: z.email({ message: messages?.email }),
    message: z.string().trim().min(10, { message: messages?.message }),
    intent: z.enum(INTENTS),
    // Honeypot — real users never see or fill this. The action treats a
    // non-empty value as a bot and silently drops it, so it stays optional
    // here (a filled honeypot must not surface as a validation error).
    company: z.string().optional(),
  });
}

export const contactSchema = buildContactSchema();
export type ContactFormValues = z.infer<typeof contactSchema>;

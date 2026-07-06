"use client";

import { useMemo } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import posthog from "posthog-js";
import { toast } from "sonner";
import { ArrowRight, Loader2 } from "lucide-react";

import { sendContactMessage } from "@/app/actions/contact";
import {
  buildContactSchema,
  INTENTS,
  type ContactFormValues,
} from "@/lib/contact-schema";
import { translations, type Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const fieldClass =
  "border-border-subtle bg-surface text-[15px] transition-colors placeholder:text-text-muted focus-visible:border-green focus-visible:ring-green/20";

export function ContactForm({ locale }: { locale: Locale }) {
  const t = translations[locale].contact.form;

  const schema = useMemo(() => buildContactSchema(t.errors), [t.errors]);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
      intent: "freelance",
      company: "",
    },
  });

  const intent = useWatch({ control: form.control, name: "intent" });

  async function onSubmit(values: ContactFormValues) {
    try {
      const result = await sendContactMessage(values);
      if (result.ok) {
        toast.success(t.toast.success);
        posthog.capture("contact_submitted", { intent: values.intent });
        form.reset();
        return;
      }
      if (result.code === "rate_limited") {
        toast.error(t.toast.rateLimited);
        return;
      }
      toast.error(t.toast.error);
    } catch {
      toast.error(t.toast.error);
    }
  }

  const isSubmitting = form.formState.isSubmitting;

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full text-left"
        noValidate
      >
        {/* Intent chips — tailor the prompt and the email subject */}
        <FormField
          control={form.control}
          name="intent"
          render={({ field }) => (
            <FormItem className="mb-6">
              <FormLabel
                id="intent-label"
                className="mb-1 block font-mono text-xs tracking-[1px] text-text-secondary"
              >
                {t.intentQuestion}
              </FormLabel>
              <div
                role="radiogroup"
                aria-labelledby="intent-label"
                className="flex flex-wrap gap-2.5"
              >
                {INTENTS.map((value) => {
                  const selected = field.value === value;
                  return (
                    <button
                      key={value}
                      type="button"
                      role="radio"
                      aria-checked={selected}
                      disabled={isSubmitting}
                      onClick={() =>
                        field.onChange(value)
                      }
                      className={cn(
                        "rounded-[10px] border px-4 py-2 font-mono text-[13px] transition-colors outline-none focus-visible:ring-[3px] focus-visible:ring-green/40 disabled:opacity-50",
                        selected
                          ? "border-green bg-green-glow text-green"
                          : "border-border-subtle bg-surface text-text-secondary hover:border-border-hover hover:text-white",
                      )}
                    >
                      {t.intents[value]}
                    </button>
                  );
                })}
              </div>
            </FormItem>
          )}
        />

        <div className="grid gap-4 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-mono text-xs tracking-[1px] text-text-secondary">
                  {t.nameLabel}
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder={t.namePlaceholder}
                    autoComplete="name"
                    disabled={isSubmitting}
                    className={fieldClass}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-mono text-xs tracking-[1px] text-text-secondary">
                  {t.emailLabel}
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="email"
                    placeholder={t.emailPlaceholder}
                    autoComplete="email"
                    disabled={isSubmitting}
                    className={fieldClass}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem className="mt-4">
              <FormLabel className="font-mono text-xs tracking-[1px] text-text-secondary">
                {t.messageLabel}
              </FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  rows={5}
                  placeholder={t.placeholders[intent]}
                  disabled={isSubmitting}
                  className={cn(fieldClass, "min-h-[120px] resize-none")}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Honeypot — hidden from users, filled only by bots */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-[9999px] h-0 w-0 overflow-hidden"
        >
          <label htmlFor="company">Company</label>
          <input
            id="company"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            {...form.register("company")}
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          aria-busy={isSubmitting}
          className="group mt-6 flex w-full items-center justify-center gap-2.5 rounded-[10px] bg-green px-6 py-3.5 font-mono text-[15px] font-medium text-black transition-all hover:bg-green-light disabled:opacity-60"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              {t.sending}
            </>
          ) : (
            <>
              {t.submit}
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </>
          )}
        </button>
      </form>
    </Form>
  );
}

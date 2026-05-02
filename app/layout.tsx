import type { Metadata } from "next";
import { Syne, JetBrains_Mono, DM_Sans } from "next/font/google";
import { cookies } from "next/headers";
import PostHogProvider from "@/components/posthog-provider";
import { LOCALES, DEFAULT_LOCALE, type Locale } from "@/lib/i18n";
import "./globals.css";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://danih.dev"),
  title: {
    default: "Daniel — Software Engineer | Backend, Fintech & ML",
    template: "%s | Daniel Hurtado",
  },
  description:
    "Software Engineer specializing in Backend, Fintech & ML. Building cross-border payment infrastructure spanning 15+ countries.",
  authors: [{ name: "Daniel Hurtado" }],
  creator: "Daniel Hurtado",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const raw = cookieStore.get("NEXT_LOCALE")?.value;
  const locale: Locale = LOCALES.includes(raw as Locale)
    ? (raw as Locale)
    : DEFAULT_LOCALE;

  return (
    <html lang={locale} className="dark">
      <body
        className={`${syne.variable} ${jetbrainsMono.variable} ${dmSans.variable} antialiased`}
      >
        <PostHogProvider>{children}</PostHogProvider>
      </body>
    </html>
  );
}

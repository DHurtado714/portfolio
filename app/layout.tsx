import type { Metadata } from "next";
import { Syne, JetBrains_Mono, DM_Sans } from "next/font/google";
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
  metadataBase: new URL("https://danielhurtado.dev"),
  title: {
    default: "Daniel \u2014 Software Engineer | Backend, Fintech & ML",
    template: "%s | Daniel Hurtado",
  },
  description:
    "Software Engineer specializing in Backend, Fintech & ML. Building systems that move capital across Latin America. $200M+ in transactions processed.",
  keywords: [
    "Software Engineer",
    "Backend Developer",
    "Fintech",
    "Machine Learning",
    "TypeScript",
    "NestJS",
    "Node.js",
    "Latin America",
    "Cross-border Payments",
    "Colombia",
  ],
  authors: [{ name: "Daniel Hurtado" }],
  creator: "Daniel Hurtado",
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Daniel \u2014 Software Engineer | Backend, Fintech & ML",
    description:
      "Building systems that move capital across Latin America. Backend architecture, fintech infrastructure, and ML systems.",
    siteName: "Daniel Hurtado Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Daniel \u2014 Software Engineer",
    description:
      "Backend, Fintech & ML. Building fintech infrastructure in Latin America.",
  },
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${syne.variable} ${jetbrainsMono.variable} ${dmSans.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

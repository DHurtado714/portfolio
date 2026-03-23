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
  metadataBase: new URL("https://danih.dev"),
  title: {
    default: "Daniel \u2014 Software Engineer | Backend, Fintech & ML",
    template: "%s | Daniel Hurtado",
  },
  description:
    "Software Engineer specializing in Backend, Fintech & ML. Building cross-border payment infrastructure processing $300M+ across Mexico, USA, Europe, and Dominican Republic.",
  keywords: [
    "Software Engineer",
    "Backend Developer",
    "Fintech",
    "Machine Learning",
    "TypeScript",
    "NestJS",
    "Node.js",
    "Java",
    "Spring Boot",
    "AWS",
    "Python",
    "Latin America",
    "Cross-border Payments",
    "Colombia",
    "engineer for side projects",
    "freelance backend engineer",
    "hire fintech engineer",
    "software engineer portfolio",
    "backend engineer for hire",
  ],
  authors: [{ name: "Daniel Hurtado" }],
  creator: "Daniel Hurtado",
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Daniel \u2014 Software Engineer | Backend, Fintech & ML",
    description:
      "Building cross-border payment infrastructure processing $300M+. Backend architecture, fintech systems, and ML.",
    siteName: "Daniel Hurtado Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Daniel \u2014 Software Engineer",
    description:
      "Backend, Fintech & ML. $300M+ in cross-border payments. AWS certified.",
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

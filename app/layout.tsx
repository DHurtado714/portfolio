import type { Metadata } from "next";
import { Syne, JetBrains_Mono, DM_Sans } from "next/font/google";
import PostHogProvider from "@/components/posthog-provider";
import "./globals.css";

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://danih.dev/#person",
      name: "Daniel Hurtado",
      url: "https://danih.dev",
      jobTitle: "Software Engineer",
      description:
        "Software Engineer specializing in Backend, Fintech & ML. Building cross-border payment infrastructure processing $300M+ across Mexico, USA, Europe, and Dominican Republic.",
      knowsAbout: [
        "Backend Architecture",
        "Fintech",
        "Machine Learning",
        "Cross-border Payments",
        "System Design",
        "Event-Driven Architecture",
        "Fraud Detection",
        "Risk Scoring",
      ],
      knowsLanguage: ["en", "es"],
      nationality: {
        "@type": "Country",
        name: "Colombia",
      },
      worksFor: {
        "@type": "Organization",
        name: "Capa.fi",
        url: "https://capa.fi",
        description:
          "Cross-border payment infrastructure for Mexico, USA, Europe, and Dominican Republic.",
      },
      hasOccupation: {
        "@type": "Occupation",
        name: "Software Engineer",
        occupationalCategory: "15-1252.00",
        skills: [
          "TypeScript",
          "NestJS",
          "Node.js",
          "Java",
          "Spring Boot",
          "PostgreSQL",
          "RabbitMQ",
          "Python",
          "FastAPI",
          "XGBoost",
          "TensorFlow",
          "AWS",
          "Docker",
          "Terraform",
          "React",
          "Next.js",
        ],
      },
      alumniOf: {
        "@type": "CollegeOrUniversity",
        name: "Monterrey Institute of Technology and Higher Education (ITESM)",
        description: "BS Computer Science and Technology, GPA 96.2/100",
      },
      sameAs: [
        "https://github.com/DHurtado714",
        "https://linkedin.com/in/daniel-hurtado",
      ],
    },
    {
      "@type": "WebSite",
      "@id": "https://danih.dev/#website",
      url: "https://danih.dev",
      name: "Daniel Hurtado — Software Engineer",
      description:
        "Portfolio and technical blog on backend architecture, fintech systems, cross-border payments, and machine learning.",
      author: { "@id": "https://danih.dev/#person" },
      inLanguage: ["en", "es"],
    },
    {
      "@type": "ProfilePage",
      "@id": "https://danih.dev/#profilepage",
      url: "https://danih.dev",
      name: "Daniel Hurtado — Software Engineer | Backend, Fintech & ML",
      mainEntity: { "@id": "https://danih.dev/#person" },
      isPartOf: { "@id": "https://danih.dev/#website" },
      speakable: {
        "@type": "SpeakableSpecification",
        cssSelector: ["#hero", "#about"],
      },
    },
  ],
};

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
    "Software Engineer specializing in Backend, Fintech & ML. Building cross-border payment infrastructure spanning 15+ countries across Mexico, USA, Europe, and Dominican Republic.",
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
    "software engineer portfolio",
    "fintech systems engineer",
    "open source contributor",
    "backend systems",
  ],
  authors: [{ name: "Daniel Hurtado" }],
  creator: "Daniel Hurtado",
  alternates: {
    canonical: "https://danih.dev",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://danih.dev",
    title: "Daniel \u2014 Software Engineer | Backend, Fintech & ML",
    description:
      "Building cross-border payment infrastructure spanning 15+ countries. Backend architecture, fintech systems, and ML.",
    siteName: "Daniel Hurtado Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Daniel \u2014 Software Engineer",
    description:
      "Backend, Fintech & ML. Cross-border payments across 15+ countries. AWS certified.",
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
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body
        className={`${syne.variable} ${jetbrainsMono.variable} ${dmSans.variable} antialiased`}
      >
        <PostHogProvider>{children}</PostHogProvider>
      </body>
    </html>
  );
}

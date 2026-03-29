import { Navigation } from "@/components/sections/navigation";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Expertise } from "@/components/sections/expertise";
import { Work } from "@/components/sections/work";
import { Experience } from "@/components/sections/experience";
import { Beyond } from "@/components/sections/beyond";
import { BlogSection } from "@/components/blog/blog-section";
import { Contact } from "@/components/sections/contact";
import { Footer } from "@/components/sections/footer";
import {
  CursorGlow,
  ActiveNavHighlight,
  SectionScrollFade,
} from "@/components/client-effects";
import { GridParallax } from "@/components/motion/grid-parallax";
import { LoadingScreen } from "@/components/loading-screen";
import { LayoutGroup } from "@/components/motion/layout-group-wrapper";
import { TerminalLoader } from "@/components/terminal/terminal-loader";
function SectionDivider() {
  return (
    <div className="mx-auto max-w-[1400px] px-5 md:px-12">
      <hr className="border-none h-px bg-border-subtle" />
    </div>
  );
}

function JsonLd() {
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

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

export default function Home() {
  return (
    <LayoutGroup>
      <JsonLd />
      <LoadingScreen />
      <GridParallax />
      <CursorGlow />
      <ActiveNavHighlight />
      <SectionScrollFade />

      <Navigation />

      <main>
        <Hero />
        <SectionDivider />
        <About />
        <SectionDivider />
        <Expertise />
        <SectionDivider />
        <Work />
        <SectionDivider />
        <Experience />
        <SectionDivider />
        {/* <GitHubActivity /> */}
        <SectionDivider />
        <Beyond />
        <SectionDivider />
        <BlogSection />
        <SectionDivider />
        <Contact />
      </main>

      <Footer />
      <TerminalLoader />
    </LayoutGroup>
  );
}

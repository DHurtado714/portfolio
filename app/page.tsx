import { Navigation } from "@/components/sections/navigation";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Expertise } from "@/components/sections/expertise";
import { Work } from "@/components/sections/work";
import { Experience } from "@/components/sections/experience";
import { Beyond } from "@/components/sections/beyond";
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
    "@type": "Person",
    name: "Daniel Hurtado",
    jobTitle: "Software Engineer",
    description:
      "Software Engineer specializing in Backend, Fintech & ML. Building cross-border payment infrastructure processing $300M+ across Mexico, USA, Europe, and Dominican Republic.",
    knowsAbout: [
      "Backend Architecture",
      "Fintech",
      "Machine Learning",
      "TypeScript",
      "NestJS",
      "Cross-border Payments",
    ],
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "Monterrey Institute of Technology and Higher Education (ITESM)",
    },
    sameAs: [
      "https://github.com/DHurtado714",
      "https://linkedin.com/in/daniel-hurtado",
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
        <Contact />
      </main>

      <Footer />
      <TerminalLoader />
    </LayoutGroup>
  );
}

import { notFound } from "next/navigation";
import { isValidLocale, LOCALES, type Locale } from "@/lib/i18n";
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

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

function SectionDivider() {
  return (
    <div className="mx-auto max-w-[1400px] px-6 md:px-12">
      <hr className="border-none h-px bg-border-subtle" />
    </div>
  );
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();

  const l = locale as Locale;

  return (
    <LayoutGroup>
      <LoadingScreen />
      <GridParallax />
      <CursorGlow />
      <ActiveNavHighlight />
      <SectionScrollFade />

      <Navigation locale={l} />

      <main>
        <Hero locale={l} />
        <SectionDivider />
        <About locale={l} />
        <SectionDivider />
        <Expertise locale={l} />
        <SectionDivider />
        <Work locale={l} />
        <SectionDivider />
        <Experience locale={l} />
        <SectionDivider />
        <SectionDivider />
        <Beyond locale={l} />
        <SectionDivider />
        <BlogSection />
        <SectionDivider />
        <Contact locale={l} />
      </main>

      <Footer locale={l} />
      <TerminalLoader />
    </LayoutGroup>
  );
}

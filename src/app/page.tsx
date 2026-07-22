import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { buildMetadata } from "@/lib/seo";
import { LocalBusinessJsonLd, WebSiteJsonLd } from "@/components/seo/json-ld";
import { Hero } from "@/components/marketing/hero";
import { TrustBar } from "@/components/marketing/trust-bar";
import { ProblemSection } from "@/components/marketing/problem-section";
import { BrandOrigin } from "@/components/marketing/brand-origin";
import { MethodSteps } from "@/components/marketing/method-steps";
import { TwoPaths } from "@/components/marketing/two-paths";
import { ServiceExplorer } from "@/components/services/service-explorer";
import { PartsComparison } from "@/components/marketing/parts-comparison";
import { ProcessTimeline } from "@/components/marketing/process-timeline";
import { CaseStudiesSection } from "@/components/marketing/case-studies-section";
import { TrainingAudiencesSection } from "@/components/marketing/training-audiences-section";
import { ProfessionalNetworkCTA } from "@/components/marketing/professional-network-cta";
import { FounderSection } from "@/components/marketing/founder-section";
import { FaqSection } from "@/components/marketing/faq-section";
import { FinalCTA } from "@/components/marketing/final-cta";

export const metadata: Metadata = buildMetadata({
  description: `Réparation et formation en électronique à ${siteConfig.city}. Smartphones, Mac, PC, consoles : un diagnostic clair, des pièces identifiées, aucune intervention sans votre accord. Réparer plutôt que remplacer — prolongez la vie de vos appareils. ${siteConfig.tagline}`,
  path: "/",
  keywords: [
    `réparation informatique ${siteConfig.city}`,
    `réparation iPhone ${siteConfig.city}`,
    `réparation Mac ${siteConfig.city}`,
    `microsoudure ${siteConfig.city}`,
    "formation réparation smartphone",
    "formation microsoudure",
    "réparer plutôt que remplacer",
    "économie circulaire électronique",
  ],
});

export default function HomePage() {
  return (
    <>
      <LocalBusinessJsonLd />
      <WebSiteJsonLd />

      <Hero />
      <TrustBar />
      <ProblemSection />
      <BrandOrigin />
      <MethodSteps />
      <TwoPaths />
      <ServiceExplorer />
      <PartsComparison />
      <ProcessTimeline />
      <CaseStudiesSection />
      <TrainingAudiencesSection />
      <ProfessionalNetworkCTA />
      <FounderSection />
      <FaqSection limit={6} />
      <FinalCTA />
    </>
  );
}

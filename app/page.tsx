import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { LogoTicker } from "@/components/sections/LogoTicker";
import { FeaturesSection } from "@/components/sections/FeaturesSection";
import { PricingSection } from "@/components/sections/PricingSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { CTASection } from "@/components/sections/CTASection";
import { SectionDivider } from "@/components/ui/SectionDivider";

/**
 * Home page. A Server Component by default — only the leaf components
 * that genuinely need interactivity (Navbar, FeaturesSection,
 * PricingSection, PageLoader) opt into "use client". Composition only:
 * no business logic lives here (Single Responsibility).
 */
export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <SectionDivider label="Trusted by" />
        <LogoTicker />
        <SectionDivider label="Platform" />
        <FeaturesSection />
        <SectionDivider label="Pricing" />
        <PricingSection />
        <SectionDivider label="Customers" />
        <TestimonialsSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}

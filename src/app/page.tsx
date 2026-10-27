import { ChallengesSection } from "@/components/features/challenges/ChallengesSection";
import { CtaSection } from "@/components/features/cta/CtaSection";
import { FaqSection } from "@/components/features/faq/FaqSection";
import { SiteFooter } from "@/components/features/footer/SiteFooter";
import { SiteHeader } from "@/components/features/header/SiteHeader";
import { HeroSection } from "@/components/features/hero/HeroSection";
import { ProcessSection } from "@/components/features/process/ProcessSection";
import { SolutionsSection } from "@/components/features/solutions/SolutionsSection";
import { TestimonialsSection } from "@/components/features/testimonials/TestimonialsSection";

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      {/* Sections carry no outer vertical padding: the 150px rhythm lives here only. */}
      <main className="flex flex-col gap-[150px] pb-[150px] pt-12 lg:pt-[110px]">
        <HeroSection />
        <SolutionsSection />
        <ProcessSection />
        <ChallengesSection />
        <FaqSection />
        <CtaSection />
        <TestimonialsSection />
      </main>
      <SiteFooter />
    </>
  );
}

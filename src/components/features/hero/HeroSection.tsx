import { Button } from "@/components/ui/Button";
import { ContainerScroll } from "@/components/ui/ContainerScroll";
import { heroContent } from "@/config/content";
import { SECTION_IDS } from "@/config/site";
import { HeroShowcase } from "./HeroShowcase";

export function HeroSection() {
  const { title, subtitle, primaryCta, secondaryCta, annotations } = heroContent;

  return (
    <section id={SECTION_IDS.home} aria-labelledby="hero-title" className="px-4 sm:px-6">
      <ContainerScroll
        className="mx-auto flex max-w-content flex-col items-center gap-8 md:gap-12 lg:gap-16"
        titleClassName="flex w-full max-w-[995px] flex-col items-center gap-8 text-center lg:gap-[38px]"
        titleComponent={
          <>
            <div className="flex flex-col items-center gap-4 lg:gap-5">
              <h1 id="hero-title" className="font-kufi text-display font-medium text-ink-primary text-balance">
                {title}
              </h1>
              <p className="font-tajawal text-headline leading-[1.6] text-ink-secondary">{subtitle}</p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 lg:h-[72px]">
              <Button href={primaryCta.href} className="min-w-[242px]">
                {primaryCta.label}
              </Button>
              <Button href={secondaryCta.href} variant="outline" className="min-w-[200px]">
                {secondaryCta.label}
              </Button>
            </div>
          </>
        }
      >
        <HeroShowcase annotations={annotations} />
      </ContainerScroll>
    </section>
  );
}

import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { challengesContent } from "@/config/content";
import { BeforeAfterSlider } from "./BeforeAfterSlider";

export function ChallengesSection() {
  const { title, subtitle, cta, comparison } = challengesContent;

  return (
    <section aria-labelledby="challenges-title" className="px-4 sm:px-6">
      <div className="mx-auto flex max-w-[1264px] flex-col items-center gap-10 lg:gap-[61px]">
        <Reveal className="w-full">
          <SectionHeading
            id="challenges-title"
            title={title}
            subtitle={subtitle}
            className="mx-auto max-w-[1102px]"
            subtitleClassName="text-balance"
          >
            <Button href={cta.href} className="min-w-[242px]">
              {cta.label}
            </Button>
          </SectionHeading>
        </Reveal>

        <Reveal className="w-full max-w-[942px]" amount={0.3}>
          <BeforeAfterSlider {...comparison} />
        </Reveal>
      </div>
    </section>
  );
}

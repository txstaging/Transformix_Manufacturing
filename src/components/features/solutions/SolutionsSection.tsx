import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { solutionsContent } from "@/config/content";
import { SECTION_IDS } from "@/config/site";
import { SolutionCard, SolutionCopy } from "./SolutionCard";
import { ActivityChartWidget } from "./widgets/ActivityChartWidget";
import { DealsPanel } from "./widgets/DealsPanel";
import { TaskBoardWidget } from "./widgets/TaskBoardWidget";

// Small cards: copy sits at the inline-start edge; the widget floats at the physical left from sm up.
const compactCard = "flex flex-col gap-8 p-6 sm:flex-row sm:items-center sm:gap-0 sm:p-0";
const compactWidget = "mx-auto sm:absolute sm:mx-0";

export function SolutionsSection() {
  const { title, subtitle, cta, mrp, analytics, digital } = solutionsContent;

  return (
    <section id={SECTION_IDS.services} aria-labelledby="solutions-title" className="px-4 sm:px-6">
      <div className="mx-auto flex max-w-[1050px] flex-col gap-5">
        <Reveal>
          <SectionHeading id="solutions-title" title={title} subtitle={subtitle} titleClassName="max-w-[762px]">
            <Button href={cta.href} className="min-w-[242px]">
              {cta.label}
            </Button>
          </SectionHeading>
        </Reveal>

        <div className="grid gap-[18px] pt-6 lg:h-[437px] lg:grid-cols-2 lg:pt-[42px]">
          {/* Cards stay static; their copy, widgets and charts animate in on first view. */}
          <SolutionCard tone="dune" className="flex flex-col gap-[15px] px-[25px] py-[26px] lg:h-full">
            <SolutionCopy {...mrp} className="w-full" />
            <DealsPanel className="mt-4 lg:absolute lg:left-[25px] lg:top-[167px] lg:mt-0" />
          </SolutionCard>

          <div className="flex flex-col gap-[18px] lg:h-full">
            <SolutionCard tone="peach" className={`${compactCard} sm:h-[198px] sm:pe-[23px]`}>
              <SolutionCopy {...analytics} className="sm:min-w-[253px] sm:px-[15px]" descriptionClassName="sm:w-[238px]" />
              <ActivityChartWidget className={`${compactWidget} sm:left-[24px] sm:top-[19px]`} />
            </SolutionCard>

            <SolutionCard tone="sand" className={`${compactCard} sm:h-[179px] sm:pe-[23px] sm:ps-[22px] lg:flex-1`}>
              <SolutionCopy
                {...digital}
                titleClassName="leading-[26px] tracking-[-0.5px] text-ink-mock"
                descriptionClassName="leading-[23px] sm:w-[243px]"
              />
              <TaskBoardWidget className={`${compactWidget} sm:left-[21px] sm:top-[12px]`} />
            </SolutionCard>
          </div>
        </div>
      </div>
    </section>
  );
}

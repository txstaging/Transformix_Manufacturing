import { Reveal } from "@/components/ui/Reveal";
import { faqContent } from "@/config/content";
import { SECTION_IDS } from "@/config/site";
import { FaqAccordion } from "./FaqAccordion";

/** FAQ: single-open accordion, first question expanded by default. */
export function FaqSection() {
  const { title, subtitle, items } = faqContent;

  return (
    <section id={SECTION_IDS.faq} aria-labelledby="faq-title" className="px-4 sm:px-6 lg:px-10 xl:px-[100px]">
      <Reveal className="mx-auto flex max-w-content flex-col gap-10 xl:flex-row xl:items-start xl:gap-[57px]">
        <div className="flex flex-col gap-4 xl:w-[343px] xl:shrink-0">
          <h2 id="faq-title" className="font-tajawal text-headline font-bold text-brand-accent">
            {title}
          </h2>
          <p className="font-tajawal text-title text-ink-secondary">{subtitle}</p>
        </div>

        <div className="min-w-0 xl:max-w-[840px] xl:flex-1">
          <FaqAccordion items={items} defaultOpenIndex={0} />
        </div>
      </Reveal>
    </section>
  );
}

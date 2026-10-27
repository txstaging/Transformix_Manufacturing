import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { testimonialsContent } from "@/config/content";
import { TestimonialCarousel } from "./TestimonialCarousel";

export function TestimonialsSection() {
  const { title, items } = testimonialsContent;

  return (
    <section aria-labelledby="testimonials-title" className="px-4 sm:px-6">
      <div className="mx-auto flex max-w-[1083px] flex-col gap-8 lg:gap-[47px]">
        <Reveal>
          <SectionHeading id="testimonials-title" title={title} weight="bold" />
        </Reveal>
        <Reveal amount={0.3}>
          <TestimonialCarousel items={items} label={title} />
        </Reveal>
      </div>
    </section>
  );
}

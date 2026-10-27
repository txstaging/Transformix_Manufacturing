import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { processContent } from "@/config/content";
import { SECTION_IDS } from "@/config/site";
import { ProcessDiagram } from "./ProcessDiagram";

interface Orb {
  src: string;
  size: 336 | 382;
  className: string;
}

/* Decorative circles from Figma 4018:4993–4999, anchored to the nearest edge of the 1440 frame. */
const ORBS: readonly Orb[] = [
  { src: "/icons/process-ellipse-solid.svg", size: 336, className: "-right-[144px] top-[193px]" },
  { src: "/icons/process-ellipse-solid.svg", size: 336, className: "left-[19.72%] top-[740px]" },
  { src: "/icons/process-ellipse-solid.svg", size: 336, className: "left-[63.33%] top-[529px]" },
  { src: "/icons/process-ellipse-solid.svg", size: 336, className: "-left-[37px] -top-[97px]" },
  { src: "/icons/process-ellipse-ring.svg", size: 382, className: "-right-[167px] top-[164px]" },
  { src: "/icons/process-ellipse-ring.svg", size: 382, className: "left-[18.13%] top-[711px]" },
  { src: "/icons/process-ellipse-ring.svg", size: 382, className: "-left-[60px] -top-[126px]" },
];

export function ProcessSection() {
  const { title, steps } = processContent;

  return (
    <section
      id={SECTION_IDS.process}
      aria-labelledby="process-title"
      className="relative overflow-hidden bg-brand px-4 py-16 sm:px-6 lg:py-[104px]"
    >
      <div aria-hidden="true">
        {ORBS.map((orb, index) => (
          <Image
            key={index}
            src={orb.src}
            alt=""
            width={orb.size}
            height={orb.size}
            className={`pointer-events-none absolute max-w-none ${orb.className}`}
          />
        ))}
      </div>

      <div className="relative mx-auto flex max-w-[1191px] flex-col items-center rounded-panel bg-surface-neutral p-5 sm:p-[26.586px] xl:h-[685px]">
        <Reveal className="w-full">
          <h2 id="process-title" className="text-center font-kufi text-display font-medium text-ink-primary text-balance">
            {title}
          </h2>
        </Reveal>

        {/* Figma places the 880px diagram 34.5px right of the card's centre line. */}
        <ProcessDiagram steps={steps} className="mt-4 lg:mt-[25px] xl:translate-x-[34.5px]" />

        <ol className="mt-2 grid w-full max-w-md gap-3 md:hidden">
          {steps.map((step, index) => (
            <li key={step} className="flex items-center gap-3 font-kufi text-lead text-ink-heading">
              <span
                aria-hidden="true"
                className="flex size-7 shrink-0 items-center justify-center rounded-full bg-brand font-inter text-caption font-semibold text-ink-inverse"
              >
                {index + 1}
              </span>
              {step}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

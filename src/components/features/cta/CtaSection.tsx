import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { ctaContent } from "@/config/content";

interface Orb {
  src: string;
  size: 336 | 382;
  className: string;
}

/* Figma 4018:5295–5298, offsets relative to the 1028 × 376 card. */
const ORBS: readonly Orb[] = [
  { src: "/icons/cta-ellipse-solid-right.svg", size: 336, className: "-right-[151.5px] top-[145.5px]" },
  { src: "/icons/cta-ellipse-solid-left.svg", size: 336, className: "-left-[88.5px] -top-[27.5px]" },
  { src: "/icons/cta-ellipse-ring-right.svg", size: 382, className: "-right-[174.5px] top-[116.5px]" },
  { src: "/icons/cta-ellipse-ring-left.svg", size: 382, className: "-left-[111.5px] -top-[56.5px]" },
];

export function CtaSection() {
  const { title, subtitle, action } = ctaContent;

  return (
    <section aria-labelledby="cta-title" className="px-4 sm:px-6">
      <Reveal className="mx-auto max-w-[1028px]">
        <div className="relative isolate flex flex-col items-center gap-6 overflow-hidden rounded-feature bg-cta-sweep px-6 pb-10 pt-12 text-center sm:px-10 lg:min-h-[376px] lg:pt-[49px]">
          <div aria-hidden="true" className="absolute inset-0 -z-10">
            {ORBS.map((orb) => (
              <Image
                key={orb.src}
                src={orb.src}
                alt=""
                width={orb.size}
                height={orb.size}
                className={`pointer-events-none absolute max-w-none ${orb.className}`}
              />
            ))}
          </div>

          <div className="flex flex-col items-center gap-6 lg:gap-[41px]">
            <h2 id="cta-title" className="font-kufi text-display font-bold text-ink-inverse text-balance">
              {title}
            </h2>
            <p className="max-w-[674px] font-tajawal text-title text-ink-inverse lg:min-h-[75px]">{subtitle}</p>
          </div>

          <Button href={action.href} variant="inverse" size="cta">
            {action.label}
          </Button>
        </div>
      </Reveal>
    </section>
  );
}

import Image from "next/image";
import { ContainerScrollCard } from "@/components/ui/ContainerScroll";
import { ScaledCanvas } from "@/components/ui/ScaledCanvas";
import { type CanvasRect, type CanvasSize, rectStyle, u } from "@/lib/canvas";
import type { HeroContent } from "@/types/content";
import { HeroAnnotations } from "./HeroAnnotations";

/* Geometry copied from Figma node 4018:4833 (1240 × 893 design px). */

const CANVAS: CanvasSize = { w: 1240, h: 893 };
const DASHBOARD: CanvasRect = { x: 136, y: 95, w: 968, h: 689 };
/** Matches the 1000px perspective of the reference effect, scaled with the canvas. */
const PERSPECTIVE = 1000;
/** Keep the whole mockup on one screen once it lands (centred), with breathing room. */
const FIT_HEIGHT = "100svh - 112px";

interface HeroShowcaseProps {
  annotations: HeroContent["annotations"];
}

export function HeroShowcase({ annotations }: HeroShowcaseProps) {
  return (
    <ScaledCanvas width={CANVAS.w} height={CANVAS.h} maxHeight={FIT_HEIGHT}>
      <div aria-hidden="true" className="absolute inset-0">
        <Image
          src="/images/hero-backdrop.png"
          alt=""
          fill
          sizes="(min-width: 1280px) 1240px, 100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-hero-veil" />
      </div>

      <div className="absolute" style={{ ...rectStyle(DASHBOARD), perspective: u(PERSPECTIVE) }}>
        <ContainerScrollCard className="relative size-full overflow-hidden" style={{ borderRadius: u(19) }}>
          <Image
            src="/images/hero-dashboard.png"
            alt="لوحة تحكم نظام MRP تعرض توفر المواد وأوامر الإنتاج ومخرجات الإنتاج"
            fill
            preload
            sizes="(min-width: 1280px) 968px, 78vw"
            className="object-cover"
          />
        </ContainerScrollCard>
      </div>

      <HeroAnnotations labels={annotations} />
    </ScaledCanvas>
  );
}

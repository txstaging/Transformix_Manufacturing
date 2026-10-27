"use client";

import { motion, type Variants } from "framer-motion";
import Image from "next/image";
import type { ReactNode } from "react";
import { useContainerScroll } from "@/components/ui/ContainerScroll";
import { type CanvasRect, type CanvasSize, rectStyle, sizeStyle, u } from "@/lib/canvas";
import { EASE_OUT } from "@/lib/motion";
import type { HeroContent } from "@/types/content";

/* Callout geometry from Figma node 4018:4833 (design px inside the 1240 × 893 canvas). */

interface RotatedGraphic {
  src: string;
  /** Axis-aligned bounding box of the rotated element. */
  box: CanvasRect;
  /** Un-rotated size of the SVG. */
  size: CanvasSize;
  rotate: number;
  flipY?: boolean;
}

interface Annotation {
  key: keyof HeroContent["annotations"];
  box: CanvasRect;
  pill: CanvasSize;
  rotate: number;
  arrow: RotatedGraphic;
  sparks: readonly [RotatedGraphic, RotatedGraphic, RotatedGraphic];
}

const ANNOTATIONS: readonly Annotation[] = [
  {
    key: "operations",
    box: { x: 583, y: 38.42, w: 233.053, h: 88.205 },
    pill: { w: 228.859, h: 44.048 },
    rotate: -11.34,
    arrow: {
      src: "/icons/hero-arrow-top.svg",
      box: { x: 510, y: 16, w: 124.845, h: 129.284 },
      size: { w: 68.4968, h: 111.676 },
      rotate: 40.83,
      flipY: true,
    },
    sparks: [
      { src: "/icons/hero-spark-top-1.svg", box: { x: 777.84, y: 23.42, w: 7.799, h: 12.937 }, size: { w: 4.06019, h: 12.2838 }, rotate: -18.78, flipY: true },
      { src: "/icons/hero-spark-top-2.svg", box: { x: 787.87, y: 24.54, w: 14.053, h: 14.967 }, size: { w: 10.7057, h: 12.168 }, rotate: -18.78, flipY: true },
      { src: "/icons/hero-spark-top-3.svg", box: { x: 802.12, y: 30.85, w: 16.223, h: 12.808 }, size: { w: 14.1744, h: 8.70842 }, rotate: -18.78, flipY: true },
    ],
  },
  {
    key: "mrp",
    box: { x: -11.66, y: 426.56, w: 159.702, h: 50.538 },
    pill: { w: 159.398, h: 49.552 },
    rotate: -0.35,
    arrow: {
      src: "/icons/hero-arrow-left.svg",
      box: { x: 99, y: 357, w: 94.34, h: 75.047 },
      size: { w: 60.0737, h: 84.4514 },
      rotate: 79.03,
    },
    sparks: [
      { src: "/icons/hero-spark-left-1.svg", box: { x: -23.51, y: 424.76, w: 16.425, h: 10.816 }, size: { w: 5.1704, h: 15.6427 }, rotate: -67.25, flipY: true },
      { src: "/icons/hero-spark-left-2.svg", box: { x: -11.94, y: 410.15, w: 19.561, h: 18.564 }, size: { w: 13.6331, h: 15.4952 }, rotate: -67.25, flipY: true },
      { src: "/icons/hero-spark-left-3.svg", box: { x: 7.17, y: 398.75, w: 17.206, h: 20.934 }, size: { w: 18.0502, h: 11.0896 }, rotate: -67.25, flipY: true },
    ],
  },
  {
    key: "analytics",
    box: { x: 667.47, y: 749.19, w: 148.915, h: 55.076 },
    pill: { w: 148.271, h: 53.255 },
    rotate: -0.71,
    arrow: {
      src: "/icons/hero-arrow-bottom.svg",
      box: { x: 650, y: 666, w: 101.193, h: 88.623 },
      size: { w: 59.9365, h: 84.2586 },
      rotate: 66.44,
    },
    sparks: [
      { src: "/icons/hero-spark-bottom-1.svg", box: { x: 797.68, y: 729.7, w: 9.242, h: 16.994 }, size: { w: 5.3444, h: 16.1691 }, rotate: 14.58, flipY: true },
      { src: "/icons/hero-spark-bottom-2.svg", box: { x: 806.39, y: 740.54, w: 17.669, h: 19.048 }, size: { w: 14.0919, h: 16.0167 }, rotate: 14.58, flipY: true },
      { src: "/icons/hero-spark-bottom-3.svg", box: { x: 817.83, y: 759.02, w: 20.942, h: 15.789 }, size: { w: 18.6576, h: 11.4628 }, rotate: 14.58, flipY: true },
    ],
  },
];

/* Choreography once the dashboard has landed: arrow → label → sparks, one callout after another. */
const CALLOUT_STAGGER = 0.22;
const LABEL_DELAY = 0.18;
const SPARKS_DELAY = 0.42;
const SPARK_STAGGER = 0.07;

const arrowVariants: Variants = {
  hidden: { opacity: 0, scale: 0.4 },
  visible: (delay: number) => ({ opacity: 1, scale: 1, transition: { duration: 0.45, ease: EASE_OUT, delay } }),
};

const labelVariants: Variants = {
  hidden: { opacity: 0, scale: 0.7, y: 12 },
  visible: (delay: number) => ({
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring", stiffness: 260, damping: 17, delay },
  }),
};

const sparkVariants: Variants = {
  hidden: { opacity: 0, scale: 0 },
  visible: (delay: number) => ({
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 420, damping: 14, delay },
  }),
};

interface RotatedProps {
  box: CanvasRect;
  rotate: number;
  flipY?: boolean;
  children: ReactNode;
}

function Rotated({ box, rotate, flipY = false, children }: RotatedProps) {
  return (
    <div className="absolute flex items-center justify-center" style={rectStyle(box)}>
      <div className="flex-none" style={{ transform: `rotate(${rotate}deg)${flipY ? " scaleY(-1)" : ""}` }}>
        {children}
      </div>
    </div>
  );
}

interface AnimatedGraphicProps {
  graphic: RotatedGraphic;
  variants: Variants;
  delay: number;
}

function AnimatedGraphic({ graphic, variants, delay }: AnimatedGraphicProps) {
  const { src, box, size, rotate, flipY } = graphic;
  return (
    <Rotated box={box} rotate={rotate} flipY={flipY}>
      <motion.div variants={variants} custom={delay} style={sizeStyle(size)}>
        <Image src={src} alt="" width={Math.round(size.w)} height={Math.round(size.h)} className="block size-full max-w-none" />
      </motion.div>
    </Rotated>
  );
}

interface HeroAnnotationsProps {
  labels: HeroContent["annotations"];
}

/** Callouts are legible from md up; below that the dashboard speaks for itself. */
export function HeroAnnotations({ labels }: HeroAnnotationsProps) {
  const { settled } = useContainerScroll();

  return (
    <motion.div
      aria-hidden={!settled}
      className="absolute inset-0 hidden md:block"
      initial="hidden"
      animate={settled ? "visible" : "hidden"}
    >
      {ANNOTATIONS.map(({ key, box, pill, rotate, arrow, sparks }, index) => {
        const start = index * CALLOUT_STAGGER;
        return (
          <div key={key}>
            <AnimatedGraphic graphic={arrow} variants={arrowVariants} delay={start} />
            <Rotated box={box} rotate={rotate}>
              <motion.p
                variants={labelVariants}
                custom={start + LABEL_DELAY}
                dir="rtl"
                className="flex items-center justify-center whitespace-nowrap rounded-tag border border-line-mist bg-brand-blush font-kufi leading-normal text-black"
                style={{ ...sizeStyle(pill), fontSize: u(18) }}
              >
                {labels[key]}
              </motion.p>
            </Rotated>
            {sparks.map((spark, sparkIndex) => (
              <AnimatedGraphic
                key={spark.src}
                graphic={spark}
                variants={sparkVariants}
                delay={start + SPARKS_DELAY + sparkIndex * SPARK_STAGGER}
              />
            ))}
          </div>
        );
      })}
    </motion.div>
  );
}

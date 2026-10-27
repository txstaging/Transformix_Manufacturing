"use client";

import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { createContext, useContext, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * Scroll-linked "container scroll" effect (Aceternity UI pattern): the card starts
 * tilted back 20° and slightly enlarged, then lands flat as it reaches the centre of
 * the viewport while the title drifts upward. Unlike the original, the card is not
 * forced to wrap all children — any descendant can opt in via <ContainerScrollCard>,
 * and descendants can react to the moment the card has landed via `useContainerScroll`.
 */

interface ContainerScrollState {
  progress: MotionValue<number>;
  rotate: MotionValue<number>;
  scale: MotionValue<number>;
  /** Flips to true once the card has (almost) finished landing. Never resets. */
  settled: boolean;
}

const ContainerScrollContext = createContext<ContainerScrollState | null>(null);

export function useContainerScroll(): ContainerScrollState {
  const context = useContext(ContainerScrollContext);
  if (!context) throw new Error("useContainerScroll must be used inside <ContainerScroll>.");
  return context;
}

const SETTLE_AT = 0.97;
const TILT_DEG = 20;
const START_SCALE = 1.05;
const TITLE_LIFT = -100;

interface ContainerScrollProps {
  titleComponent: ReactNode;
  children: ReactNode;
  className?: string;
  titleClassName?: string;
  stageClassName?: string;
}

export function ContainerScroll({
  titleComponent,
  children,
  className,
  titleClassName,
  stageClassName,
}: ContainerScrollProps) {
  const stageRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = Boolean(useReducedMotion());
  // 0 when the stage peeks in at the bottom of the viewport, 1 when it is centred.
  const { scrollYProgress } = useScroll({ target: stageRef, offset: ["start end", "center center"] });
  const rotate = useTransform(scrollYProgress, [0, 1], [TILT_DEG, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [START_SCALE, 1]);
  const translate = useTransform(scrollYProgress, [0, 1], [0, TITLE_LIFT]);
  const [landed, setLanded] = useState(false);

  // Also fires on the first measurement, so a page restored mid-scroll lands immediately.
  useMotionValueEvent(scrollYProgress, "change", (value) => {
    if (value >= SETTLE_AT) setLanded(true);
  });

  const state: ContainerScrollState = {
    progress: scrollYProgress,
    rotate,
    scale,
    settled: landed || prefersReducedMotion,
  };

  return (
    <ContainerScrollContext.Provider value={state}>
      <div className={className}>
        <motion.div className={titleClassName} style={prefersReducedMotion ? undefined : { y: translate }}>
          {titleComponent}
        </motion.div>
        <div ref={stageRef} className={cn("w-full", stageClassName)}>
          {children}
        </div>
      </div>
    </ContainerScrollContext.Provider>
  );
}

interface ContainerScrollCardProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}

/** Applies the tilt + scale. Give its parent a `perspective` so the tilt reads in 3D. */
export function ContainerScrollCard({ children, className, style }: ContainerScrollCardProps) {
  const { rotate, scale } = useContainerScroll();
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      className={cn("will-change-transform", className)}
      style={prefersReducedMotion ? style : { ...style, rotateX: rotate, scale }}
    >
      {children}
    </motion.div>
  );
}

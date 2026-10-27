"use client";

import { animate, motion, useInView, useMotionValue, useReducedMotion, useTransform, type Variants } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { ScaledCanvas } from "@/components/ui/ScaledCanvas";
import { rectStyle, u } from "@/lib/canvas";
import { cn } from "@/lib/cn";
import { EASE_OUT, fadeItem, fadeUpItem, popItem, wipeItem } from "@/lib/motion";

const DEALS_VALUE = 40;

/* Entrance timing (s), relative to the parent card entering view. */
const PANEL_DELAY = 0.2;
const CHART_DELAY = 0.5;
const COUNT_DELAY = 0.45;

/** The area under the curve is a 25% tint in Figma, so it fades to 0.25, not 1. */
const areaVariants: Variants = {
  hidden: { opacity: 0 },
  visible: (delay: number = 0) => ({ opacity: 0.25, transition: { duration: 0.9, ease: EASE_OUT, delay } }),
};

interface DealsPanelProps {
  className?: string;
}

/** "Active Deals" line-chart panel inside the MRP card (Figma 4018:4950, 464 × 208). */
export function DealsPanel({ className }: DealsPanelProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const prefersReducedMotion = useReducedMotion();
  const count = useMotionValue(0);
  const amount = useTransform(count, (value) => `$${value.toFixed(2)}`);

  useEffect(() => {
    if (prefersReducedMotion) {
      count.set(DEALS_VALUE);
      return;
    }
    if (!inView) return;
    const controls = animate(count, DEALS_VALUE, { duration: 1.3, ease: EASE_OUT, delay: COUNT_DELAY });
    return () => controls.stop();
  }, [count, inView, prefersReducedMotion]);

  return (
    <motion.div
      ref={ref}
      variants={fadeUpItem}
      custom={PANEL_DELAY}
      aria-hidden="true"
      className={cn("w-full max-w-[464px]", className)}
    >
      <ScaledCanvas
        width={464}
        height={208}
        canvasClassName="rounded-tl-[16px] bg-white font-inter leading-normal text-mock-ink shadow-panel-ring"
      >
        <motion.div
          variants={fadeItem}
          custom={PANEL_DELAY + 0.15}
          className="absolute flex items-center"
          style={{ left: u(13), top: u(15), gap: u(10) }}
        >
          <span
            className="rounded-[3px] border border-mock-subtle text-mock-faint"
            style={{ fontSize: u(9), paddingInline: u(2), paddingBottom: u(1) }}
          >
            ∿
          </span>
          <span style={{ fontSize: u(11) }}>Active Deals</span>
        </motion.div>

        <motion.p className="absolute font-medium tabular-nums" style={{ left: u(13), top: u(56), fontSize: u(20) }}>
          {amount}
        </motion.p>

        <motion.p
          variants={popItem}
          custom={CHART_DELAY + 0.2}
          className="absolute origin-right bg-mock-lilac"
          style={{ right: u(17.69), top: u(58), padding: u(6), fontSize: u(11) }}
        >
          <span className="text-mock-green">⌁</span> Active Deals
        </motion.p>

        <motion.div
          variants={areaVariants}
          custom={CHART_DELAY + 0.5}
          className="absolute bg-deals-fade"
          style={{
            ...rectStyle({ x: 12, y: 111, w: 425, h: 103 }),
            maskImage: "url(/icons/deals-chart-mask.svg)",
            maskSize: `${u(490)} ${u(115)}`,
            maskRepeat: "no-repeat",
            maskPosition: "0 0",
          }}
        />

        <motion.div
          variants={wipeItem}
          custom={CHART_DELAY}
          className="absolute flex items-center justify-center overflow-hidden"
          style={rectStyle({ x: 12, y: 100, w: 430, h: 115 })}
        >
          <Image
            src="/icons/deals-line-chart.svg"
            alt=""
            width={402}
            height={101}
            className="block max-w-none"
            style={{ width: u(402), height: u(101) }}
          />
        </motion.div>
      </ScaledCanvas>
    </motion.div>
  );
}

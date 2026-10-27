"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/cn";
import { fadeItem, fadeUpItem, growUpItem } from "@/lib/motion";

type BarTone = "orange" | "blue" | "idle";

const BARS: readonly { height: number; tone: BarTone }[] = [
  { height: 55, tone: "orange" },
  { height: 38, tone: "blue" },
  { height: 62, tone: "blue" },
  { height: 55, tone: "orange" },
  { height: 85, tone: "blue" },
  { height: 69, tone: "blue" },
  { height: 60, tone: "idle" },
];

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] as const;

const toneClass: Record<BarTone, string> = {
  orange: "bg-bar-orange",
  blue: "bg-bar-blue",
  idle: "bg-bar-idle",
};

/* Entrance timing (s), relative to the parent card entering view. */
const WIDGET_DELAY = 0.15;
const BARS_DELAY = 0.45;
const BAR_STAGGER = 0.07;

interface WidgetProps {
  className?: string;
}

/** Miniature "Activity Time" stacked-bar card (Figma 4018:4869). */
export function ActivityChartWidget({ className }: WidgetProps) {
  return (
    <motion.div
      variants={fadeUpItem}
      custom={WIDGET_DELAY}
      dir="ltr"
      aria-hidden="true"
      className={cn(
        "flex w-[197px] flex-col rounded-[7px] bg-white px-[10px] pb-[10px] pt-[11px] font-inter leading-normal text-mock-ink shadow-widget-ring",
        className,
      )}
    >
      <motion.div variants={fadeItem} custom={WIDGET_DELAY + 0.15} className="flex items-center justify-between">
        <p className="text-[8px] font-semibold">◉ Activity Time</p>
        <p className="rounded-[3px] border border-mock-border px-[5px] pb-[7px] pt-[5px] text-[6px] font-semibold">
          Last 7 Days　⌄
        </p>
      </motion.div>
      <motion.p variants={fadeItem} custom={WIDGET_DELAY + 0.2} className="pt-[13px] text-center text-[5px]">
        <span className="font-bold text-mock-periwinkle">▪</span> Meeting　▪ Break
      </motion.p>
      <div className="flex h-[91px] items-end justify-between px-[4px] pt-[5px]">
        {BARS.map((bar, index) => (
          <motion.span
            key={index}
            variants={growUpItem}
            custom={BARS_DELAY + index * BAR_STAGGER}
            className={cn("w-4 origin-bottom rounded-t-[3px]", toneClass[bar.tone])}
            style={{ height: bar.height }}
          />
        ))}
      </div>
      <motion.div
        variants={fadeItem}
        custom={BARS_DELAY}
        className="flex justify-between py-[4px] pl-[4px] pr-[3.99px] text-[5px] text-mock-faint"
      >
        {DAYS.map((day) => (
          <span key={day}>{day}</span>
        ))}
      </motion.div>
    </motion.div>
  );
}

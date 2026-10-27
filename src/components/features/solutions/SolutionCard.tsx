"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { fadeUpItem } from "@/lib/motion";
import type { SolutionItem } from "@/types/content";

export type SolutionCardTone = "peach" | "sand" | "dune";

const toneClass: Record<SolutionCardTone, string> = {
  peach: "bg-card-peach",
  sand: "bg-card-sand",
  dune: "bg-card-dune",
};

interface SolutionCardProps {
  tone: SolutionCardTone;
  className?: string;
  children: ReactNode;
}

/**
 * Shared surface for the solution bento cards. The card itself stays put; it only
 * broadcasts `hidden` → `visible` to the animated elements inside it on first view.
 */
export function SolutionCard({ tone, className, children }: SolutionCardProps) {
  return (
    <motion.article
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.35 }}
      className={cn(
        "relative overflow-hidden rounded-card border border-line-soft",
        "transition-[transform,box-shadow] duration-300 ease-out hover:-translate-y-1 hover:shadow-lift motion-reduce:hover:translate-y-0",
        toneClass[tone],
        className,
      )}
    >
      {children}
    </motion.article>
  );
}

interface SolutionCopyProps extends SolutionItem {
  className?: string;
  titleClassName?: string;
  descriptionClassName?: string;
}

export function SolutionCopy({
  title,
  description,
  className,
  titleClassName,
  descriptionClassName,
}: SolutionCopyProps) {
  return (
    <div className={cn("flex flex-col items-start gap-[13.5px] text-start", className)}>
      <motion.h3
        variants={fadeUpItem}
        custom={0}
        className={cn("font-kufi text-lead font-medium text-ink-primary", titleClassName)}
      >
        {title}
      </motion.h3>
      <motion.p
        variants={fadeUpItem}
        custom={0.1}
        className={cn("font-kufi text-caption text-ink-secondary", descriptionClassName)}
      >
        {description}
      </motion.p>
    </div>
  );
}

"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { REVEAL_OFFSET, revealTransition } from "@/lib/motion";

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** Fraction of the element that must be visible before it animates. */
  amount?: number;
}

/** Scroll-triggered fade-up matching the FAQ entrance defined in Figma. Runs once. */
export function Reveal({ children, className, delay = 0, amount = 0.2 }: RevealProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={prefersReducedMotion ? false : { opacity: 0, y: REVEAL_OFFSET }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ ...revealTransition, delay }}
    >
      {children}
    </motion.div>
  );
}

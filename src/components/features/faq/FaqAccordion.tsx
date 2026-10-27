"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useId, useRef, useState, type KeyboardEvent } from "react";
import { ChevronDownIcon } from "@/components/ui/icons";
import { cn } from "@/lib/cn";
import { EASE_OUT } from "@/lib/motion";
import type { FaqItem } from "@/types/content";

interface FaqAccordionProps {
  items: readonly FaqItem[];
  /** Index open on first render; `null` starts fully collapsed. */
  defaultOpenIndex?: number | null;
}

/**
 * Single-open accordion: opening a question closes the others, and the open one
 * can be collapsed again. Answers stay in the DOM (inert while closed) so the
 * content remains indexable and `aria-controls` always resolves.
 */
export function FaqAccordion({ items, defaultOpenIndex = 0 }: FaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(defaultOpenIndex);
  const triggers = useRef<(HTMLButtonElement | null)[]>([]);
  const baseId = useId();
  const prefersReducedMotion = useReducedMotion();
  const transition = prefersReducedMotion ? { duration: 0 } : { duration: 0.35, ease: EASE_OUT };

  const toggle = (index: number) => setOpenIndex((current) => (current === index ? null : index));

  // WAI-ARIA accordion keys: move focus between question headers.
  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const last = items.length - 1;
    const target: Partial<Record<string, number>> = {
      ArrowDown: index === last ? 0 : index + 1,
      ArrowUp: index === 0 ? last : index - 1,
      Home: 0,
      End: last,
    };
    const next = target[event.key];
    if (next === undefined) return;
    event.preventDefault();
    triggers.current[next]?.focus();
  };

  return (
    <div className="flex max-w-[765px] flex-col gap-6">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        const triggerId = `${baseId}-question-${index}`;
        const panelId = `${baseId}-answer-${index}`;

        return (
          <div key={item.question} className="border-t border-line pt-3">
            <h3>
              <button
                ref={(node) => {
                  triggers.current[index] = node;
                }}
                id={triggerId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(index)}
                onKeyDown={(event) => onKeyDown(event, index)}
                className={cn(
                  "group flex w-full cursor-pointer items-center justify-between gap-4 rounded-sm text-start font-kufi text-title font-bold transition-colors duration-300 ease-out",
                  "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand",
                  isOpen ? "text-brand-accent" : "text-ink-heading hover:text-brand",
                )}
              >
                <span>{item.question}</span>
                <span
                  aria-hidden="true"
                  className={cn(
                    "flex size-8 shrink-0 items-center justify-center rounded-full border transition-[transform,background-color,border-color,color] duration-300 ease-out",
                    isOpen
                      ? "rotate-180 border-brand bg-brand text-ink-inverse"
                      : "border-line text-ink-secondary group-hover:border-brand group-hover:text-brand",
                  )}
                >
                  <ChevronDownIcon className="size-4" />
                </span>
              </button>
            </h3>

            <motion.div
              id={panelId}
              role="region"
              aria-labelledby={triggerId}
              aria-hidden={!isOpen}
              inert={!isOpen}
              className="overflow-hidden"
              initial={false}
              animate={isOpen ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
              transition={transition}
            >
              <p className="pt-3 font-kufi text-lead text-ink-secondary">{item.answer}</p>
            </motion.div>
          </div>
        );
      })}
    </div>
  );
}

"use client";

import { useRef, useState, type CSSProperties, type KeyboardEvent, type PointerEvent } from "react";
import { cn } from "@/lib/cn";
import { clamp } from "@/lib/math";
import type { Testimonial } from "@/types/content";
import { TestimonialCard } from "./TestimonialCard";

const SWIPE_THRESHOLD = 50;

interface TestimonialCarouselProps {
  items: readonly Testimonial[];
  /** The design opens on the middle review with both neighbours peeking. */
  initialIndex?: number;
  label: string;
}

export function TestimonialCarousel({ items, initialIndex = 1, label }: TestimonialCarouselProps) {
  const lastIndex = items.length - 1;
  const [active, setActive] = useState(() => clamp(initialIndex, 0, lastIndex));
  const swipeStart = useRef<number | null>(null);
  const swiped = useRef(false);

  const goTo = (index: number) => setActive(clamp(index, 0, lastIndex));

  // RTL: the next review sits to the left, so swiping/arrowing toward the left advances.
  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowLeft") goTo(active + 1);
    else if (event.key === "ArrowRight") goTo(active - 1);
    else if (event.key === "Home") goTo(0);
    else if (event.key === "End") goTo(lastIndex);
    else return;
    event.preventDefault();
  };

  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    swipeStart.current = event.clientX;
    swiped.current = false;
  };

  const onPointerUp = (event: PointerEvent<HTMLDivElement>) => {
    if (swipeStart.current === null) return;
    const delta = event.clientX - swipeStart.current;
    swipeStart.current = null;
    if (Math.abs(delta) < SWIPE_THRESHOLD) return;
    swiped.current = true;
    goTo(delta > 0 ? active + 1 : active - 1);
  };

  // Card i's right edge sits i × (card + gap) left of the track's right edge; shift it to centre.
  const trackStyle: CSSProperties = {
    transform: `translateX(calc(${active} * (var(--card-w) + var(--gap)) - (100% - var(--card-w)) / 2))`,
  };

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label={label}
      tabIndex={0}
      onKeyDown={onKeyDown}
      className="flex flex-col items-center gap-6 rounded-review [--card-w:88%] [--gap:16px] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand sm:[--card-w:84%] sm:[--gap:32px] lg:[--card-w:80.15%] lg:[--gap:56px]"
    >
      <div
        className="w-full touch-pan-y overflow-hidden py-[9px]"
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerCancel={() => (swipeStart.current = null)}
      >
        <ul
          className="flex gap-[var(--gap)] transition-transform duration-500 ease-out-soft motion-reduce:transition-none"
          style={trackStyle}
        >
          {items.map((item, index) => {
            const isActive = index === active;
            return (
              <li
                key={item.id}
                aria-roledescription="slide"
                aria-label={`${index + 1} من ${items.length}`}
                aria-hidden={!isActive}
                className={cn(
                  "shrink-0 basis-[var(--card-w)] transition-opacity duration-500",
                  !isActive && "cursor-pointer opacity-90 hover:opacity-100",
                )}
                onClick={() => {
                  if (!isActive && !swiped.current) goTo(index);
                }}
              >
                <TestimonialCard testimonial={item} />
              </li>
            );
          })}
        </ul>
      </div>

      <div className="flex items-center gap-3">
        {items.map((item, index) => {
          const isActive = index === active;
          return (
            <button
              key={item.id}
              type="button"
              aria-label={`عرض الرأي ${index + 1}`}
              aria-current={isActive ? "true" : undefined}
              onClick={() => goTo(index)}
              className={cn(
                "size-[18px] rounded-[34px] transition-[background-color,transform] duration-300 ease-out",
                "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand",
                isActive ? "bg-brand" : "bg-line-dot hover:scale-110 hover:bg-brand/50",
              )}
            />
          );
        })}
      </div>
    </div>
  );
}

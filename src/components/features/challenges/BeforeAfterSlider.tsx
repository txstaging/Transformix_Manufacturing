"use client";

import { animate, useInView, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState, type KeyboardEvent, type PointerEvent } from "react";
import { clamp } from "@/lib/math";

/* Figma component "BeforeAfter" (variant Middle), 942 × 633 design px. */
const FRAME = { w: 942, h: 633 };
const pct = (value: number, total: number) => `${(value / total) * 100}%`;

const BEFORE = { x: -21, y: 1, w: 962, h: 632 };
const AFTER = { x: 0, y: 0, w: 906, h: 630 };
/** Initial divider position: the Figma "Middle" variant clips at 474px. */
const INITIAL_POSITION = (474 / FRAME.w) * 100;
const KEY_STEP = 2;
const KEY_STEP_LARGE = 10;

interface BeforeAfterSliderProps {
  beforeAlt: string;
  afterAlt: string;
  handleLabel: string;
}

export function BeforeAfterSlider({ beforeAlt, afterAlt, handleLabel }: BeforeAfterSliderProps) {
  const frameRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState(INITIAL_POSITION);
  const [dragging, setDragging] = useState(false);
  const interacted = useRef(false);
  const inView = useInView(frameRef, { once: true, amount: 0.6 });
  const prefersReducedMotion = useReducedMotion();

  // One-time nudge so visitors discover the divider can be dragged.
  useEffect(() => {
    if (!inView || prefersReducedMotion || interacted.current) return;
    const controls = animate(INITIAL_POSITION, [INITIAL_POSITION, 38, 62, INITIAL_POSITION], {
      duration: 1.6,
      ease: "easeInOut",
      delay: 0.3,
      onUpdate: (value) => {
        if (!interacted.current) setPosition(value);
      },
    });
    return () => controls.stop();
  }, [inView, prefersReducedMotion]);

  const updateFromClientX = useCallback((clientX: number) => {
    const rect = frameRef.current?.getBoundingClientRect();
    if (!rect || rect.width === 0) return;
    setPosition(clamp(((clientX - rect.left) / rect.width) * 100, 0, 100));
  }, []);

  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (event.button !== 0) return;
    interacted.current = true;
    event.currentTarget.setPointerCapture(event.pointerId);
    setDragging(true);
    updateFromClientX(event.clientX);
  };

  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (dragging) updateFromClientX(event.clientX);
  };

  const endDrag = (event: PointerEvent<HTMLDivElement>) => {
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    setDragging(false);
  };

  // Physical control: arrows move the divider in the direction they point.
  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const step = event.shiftKey ? KEY_STEP_LARGE : KEY_STEP;
    const next: Partial<Record<string, number>> = {
      ArrowLeft: position - step,
      ArrowDown: position - step,
      ArrowRight: position + step,
      ArrowUp: position + step,
      PageDown: position - KEY_STEP_LARGE,
      PageUp: position + KEY_STEP_LARGE,
      Home: 0,
      End: 100,
    };
    const value = next[event.key];
    if (value === undefined) return;
    event.preventDefault();
    interacted.current = true;
    setPosition(clamp(value, 0, 100));
  };

  return (
    <div
      ref={frameRef}
      dir="ltr"
      className="@container relative w-full touch-pan-y select-none overflow-hidden"
      style={{ aspectRatio: `${FRAME.w} / ${FRAME.h}`, cursor: dragging ? "grabbing" : "ew-resize" }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
    >
      <div
        className="absolute"
        style={{ left: pct(BEFORE.x, FRAME.w), top: pct(BEFORE.y, FRAME.h), width: pct(BEFORE.w, FRAME.w), height: pct(BEFORE.h, FRAME.h) }}
      >
        <Image src="/images/challenges-before.png" alt={beforeAlt} fill sizes="(min-width: 1024px) 962px, 100vw" className="pointer-events-none object-cover" draggable={false} />
      </div>

      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}>
        <div
          className="absolute"
          style={{ left: pct(AFTER.x, FRAME.w), top: pct(AFTER.y, FRAME.h), width: pct(AFTER.w, FRAME.w), height: pct(AFTER.h, FRAME.h) }}
        >
          <Image src="/images/challenges-after.png" alt={afterAlt} fill sizes="(min-width: 1024px) 906px, 100vw" className="pointer-events-none object-cover" draggable={false} />
        </div>
      </div>

      <div className="pointer-events-none absolute inset-y-0" style={{ left: `${position}%` }}>
        <span aria-hidden="true" className="absolute inset-y-0 w-[6px] -translate-x-1/2 bg-white" />
        <div
          role="slider"
          tabIndex={0}
          aria-label={handleLabel}
          aria-orientation="horizontal"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(position)}
          aria-valuetext={`${Math.round(position)}%`}
          onKeyDown={onKeyDown}
          className="pointer-events-auto absolute top-1/2 aspect-square w-[max(44px,10.085cqw)] -translate-x-1/2 -translate-y-1/2 rounded-full transition-transform duration-200 ease-out hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white active:scale-95"
        >
          <Image src="/icons/compare-handle.svg" alt="" width={95} height={95} className="block size-full" draggable={false} />
        </div>
      </div>
    </div>
  );
}

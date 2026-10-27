"use client";

import { motion, useInView, useReducedMotion, type Transition } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { ScaledCanvas } from "@/components/ui/ScaledCanvas";
import { rectStyle, u } from "@/lib/canvas";
import { cn } from "@/lib/cn";
import { EASE_IN_OUT, EASE_OUT } from "@/lib/motion";
import {
  CALLOUTS,
  COLLAPSE,
  DIAGRAM,
  LABEL_EXIT,
  LAYERS,
  LINE_EXIT,
  LOOP_SECONDS,
  SLAB,
  STACK_FRAME,
  type CalloutSide,
  type LayerSpec,
} from "./processTimeline";

type Point = readonly [number, number];

const toPoints = (points: readonly Point[]): string => points.map(([x, y]) => `${x},${y}`).join(" ");

function slabFaces(top: number) {
  const { left, center, right, topHeight: h, thickness: t } = SLAB;
  const mid = top + h / 2;
  const bottom = top + h;
  return {
    top: toPoints([[center, top], [right, mid], [center, bottom], [left, mid]]),
    left: toPoints([[left, mid], [center, bottom], [center, bottom + t], [left, mid + t]]),
    right: toPoints([[center, bottom], [right, mid], [right, mid + t], [center, bottom + t]]),
  };
}

/** Builds a keyframe track: hidden → hidden → shown → shown → hidden → hidden over one loop. */
function loopTrack(enter: { start: number; end: number }, exit: { start: number; end: number }) {
  return {
    times: [0, enter.start, enter.end, exit.start, exit.end, 1],
    ease: ["linear", EASE_OUT, "linear", EASE_IN_OUT, "linear"],
  } as const;
}

const loop = (track: ReturnType<typeof loopTrack>): Transition => ({
  duration: LOOP_SECONDS,
  repeat: Infinity,
  times: [...track.times],
  ease: [...track.ease],
});

function layerMotion(layer: LayerSpec, playing: boolean) {
  const collapsed = { opacity: 0.3, y: layer.collapsedOffset };
  if (!playing) return { initial: collapsed, animate: collapsed };

  const opacityTrack = loopTrack({ start: layer.start, end: layer.opacitySettled }, COLLAPSE);
  const yTrack = loopTrack({ start: layer.start, end: layer.positionSettled }, COLLAPSE);
  const off = layer.collapsedOffset;
  return {
    initial: collapsed,
    animate: { opacity: [0.3, 0.3, 1, 1, 0.3, 0.3], y: [off, off, 0, 0, off, off] },
    transition: { opacity: loop(opacityTrack), y: loop(yTrack) },
  };
}

// Connectors grow from the stack outwards to their label.
const hiddenClip: Record<CalloutSide, string> = {
  right: "inset(0% 100% 0% 0%)",
  left: "inset(0% 0% 0% 100%)",
};
const shownClip = "inset(0% 0% 0% 0%)";

interface ProcessDiagramProps {
  steps: readonly string[];
  className?: string;
}

export function ProcessDiagram({ steps, className }: ProcessDiagramProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.35 });
  const prefersReducedMotion = useReducedMotion();
  const isStatic = Boolean(prefersReducedMotion);
  const playing = inView && !isStatic;

  return (
    <div ref={ref} className={cn("w-full max-w-[880px]", className)}>
      <ScaledCanvas width={DIAGRAM.w} height={DIAGRAM.h}>
        <div className="absolute" style={rectStyle(STACK_FRAME)}>
          <svg
            viewBox={`0 0 ${STACK_FRAME.w} ${STACK_FRAME.h}`}
            className="absolute inset-0 size-full overflow-visible"
            aria-hidden="true"
          >
            {LAYERS.map((layer) => {
              const faces = slabFaces(layer.top);
              const faceOpacity = layer.translucent ? 0.5 : 1;
              const motionProps = isStatic ? { initial: false as const } : layerMotion(layer, playing);
              return (
                <motion.g key={layer.top} {...motionProps}>
                  <g stroke="var(--tx-brand-edge)" strokeWidth={SLAB.stroke} strokeLinejoin="round">
                    <polygon points={faces.top} fill="var(--tx-brand-peach)" opacity={faceOpacity} />
                    <polygon points={faces.left} fill="var(--tx-brand-accent)" opacity={faceOpacity} />
                    <polygon points={faces.right} fill="var(--tx-brand-accent)" opacity={faceOpacity} />
                  </g>
                </motion.g>
              );
            })}
          </svg>

          {/* Callouts: hidden below md, where the ordered list takes over. */}
          <div className="hidden md:block">
            {CALLOUTS.map((callout, index) => {
              const label = steps[index];
              if (!label) return null;

              const drawTrack = loopTrack(callout.draw, LINE_EXIT);
              const fadeTrack = loopTrack(callout.fade, LABEL_EXIT);
              const hidden = hiddenClip[callout.side];

              return (
                <div key={callout.line.src} aria-hidden="true">
                  <motion.div
                    className="absolute"
                    style={rectStyle(callout.line.rect)}
                    initial={isStatic ? false : { clipPath: hidden }}
                    animate={
                      playing
                        ? { clipPath: [hidden, hidden, shownClip, shownClip, hidden, hidden] }
                        : isStatic
                          ? { clipPath: shownClip }
                          : { clipPath: hidden }
                    }
                    transition={playing ? loop(drawTrack) : { duration: 0 }}
                  >
                    <Image
                      src={callout.line.src}
                      alt=""
                      width={Math.round(callout.line.rect.w)}
                      height={7}
                      className="block size-full max-w-none"
                    />
                  </motion.div>
                  <motion.p
                    dir="rtl"
                    className={cn(
                      "absolute flex items-center whitespace-nowrap font-kufi leading-normal text-ink-heading",
                      callout.side === "right" ? "justify-end" : "justify-start",
                    )}
                    style={{ ...rectStyle(callout.label), fontSize: u(18) }}
                    initial={isStatic ? false : { opacity: 0 }}
                    animate={playing ? { opacity: [0, 0, 1, 1, 0, 0] } : { opacity: isStatic ? 1 : 0 }}
                    transition={playing ? loop(fadeTrack) : { duration: 0 }}
                  >
                    {label}
                  </motion.p>
                </div>
              );
            })}
          </div>
        </div>
      </ScaledCanvas>
    </div>
  );
}

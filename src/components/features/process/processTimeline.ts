import type { CanvasRect } from "@/lib/canvas";

/*
 * Geometry and timing for the "process stack" diagram, extracted from Figma
 * nodes 4018:5003–4018:5250 and their prototype timeline (8.51s loop).
 * Coordinates are design px inside the 740.425 × 386.811 stack frame.
 */

export const DIAGRAM = { w: 880, h: 513.112 } as const;
export const STACK_FRAME: CanvasRect = { x: 69.124, y: 63.807, w: 740.425, h: 386.811 };

export const LOOP_SECONDS = 8.51;
/** All layers collapse back together between these progress marks. */
export const COLLAPSE = { start: 0.8794, end: 0.9548 } as const;
/** Labels and connector lines fade out between these marks. */
export const LABEL_EXIT = { start: 0.8794, end: 0.9096 } as const;
export const LINE_EXIT = { start: 0.879, end: 0.917 } as const;

/** Isometric slab: diamond top + two side faces. */
export const SLAB = {
  left: 196.741,
  center: 356.255,
  right: 515.772,
  topHeight: 184.188,
  thickness: 12.279,
  stroke: 0.614,
} as const;

export interface LayerSpec {
  /** Resting top of the slab once the stack has spread out. */
  top: number;
  /** Offset from `top` while collapsed (start of loop). */
  collapsedOffset: number;
  /** Progress at which the slab starts moving into place. */
  start: number;
  opacitySettled: number;
  positionSettled: number;
  translucent: boolean;
}

/** Bottom → top. */
export const LAYERS: readonly LayerSpec[] = [
  { top: 190.344, collapsedOffset: -68.725, start: 0.0377, opacitySettled: 0.0754, positionSettled: 0.1005, translucent: true },
  { top: 142.758, collapsedOffset: -34.429, start: 0.201, opacitySettled: 0.2387, positionSettled: 0.2638, translucent: true },
  { top: 95.172, collapsedOffset: -0.133, start: 0.3643, opacitySettled: 0.402, positionSettled: 0.4272, translucent: true },
  { top: 47.586, collapsedOffset: 34.163, start: 0.5277, opacitySettled: 0.5653, positionSettled: 0.5905, translucent: true },
  { top: 0, collapsedOffset: 68.459, start: 0.691, opacitySettled: 0.7287, positionSettled: 0.7538, translucent: false },
];

export type CalloutSide = "left" | "right";

export interface CalloutSpec {
  side: CalloutSide;
  /** Connector SVG including its end dot (dot sits on the label side). */
  line: { src: string; rect: CanvasRect };
  /** Label text box. */
  label: CanvasRect;
  draw: { start: number; end: number };
  fade: { start: number; end: number };
}

const LINE_H = 7.0896;
const LABEL_H = 34;

/** Index-aligned with `processContent.steps` (first step first). */
export const CALLOUTS: readonly CalloutSpec[] = [
  {
    side: "right",
    line: { src: "/icons/process-line-1.svg", rect: { x: 502.481, y: 284.634, w: 73.5267, h: LINE_H } },
    label: { x: 583.097, y: 271.179, w: 156, h: LABEL_H },
    draw: { start: 0.119, end: 0.151 },
    fade: { start: 0.1508, end: 0.1696 },
  },
  {
    side: "left",
    line: { src: "/icons/process-line-2.svg", rect: { x: 127.097, y: 238.108, w: 88.9225, h: LINE_H } },
    label: { x: 0.003, y: 224.653, w: 120, h: LABEL_H },
    draw: { start: 0.283, end: 0.314 },
    fade: { start: 0.3141, end: 0.3329 },
  },
  {
    side: "right",
    line: { src: "/icons/process-line-3.svg", rect: { x: 502.481, y: 190.253, w: 67.856, h: LINE_H } },
    label: { x: 577.427, y: 176.798, w: 163, h: LABEL_H },
    draw: { start: 0.446, end: 0.477 },
    fade: { start: 0.4774, end: 0.4962 },
  },
  {
    side: "left",
    line: { src: "/icons/process-line-4.svg", rect: { x: 145.969, y: 140.648, w: 83.3031, h: LINE_H } },
    label: { x: -44.124, y: 127.193, w: 183, h: LABEL_H },
    draw: { start: 0.609, end: 0.641 },
    fade: { start: 0.6407, end: 0.6596 },
  },
  {
    side: "right",
    line: { src: "/icons/process-line-5.svg", rect: { x: 436.016, y: 94.915, w: 136.475, h: LINE_H } },
    label: { x: 579.581, y: 81.46, w: 138, h: LABEL_H },
    draw: { start: 0.773, end: 0.804 },
    fade: { start: 0.804, end: 0.8229 },
  },
];

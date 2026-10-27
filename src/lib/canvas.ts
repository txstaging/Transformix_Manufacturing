import type { CSSProperties } from "react";

/**
 * Helpers for fixed-composition artwork (mockups, diagrams) that must keep
 * Figma's exact geometry while scaling fluidly. Values are expressed in design
 * pixels and resolved against the `--u` unit defined by <ScaledCanvas>.
 */

export interface CanvasSize {
  w: number;
  h: number;
}

export interface CanvasRect extends CanvasSize {
  x: number;
  y: number;
}

/** Design px → length that scales with the nearest ScaledCanvas. */
export const u = (px: number): string => `calc(var(--u) * ${px})`;

export const sizeStyle = ({ w, h }: CanvasSize): CSSProperties => ({
  width: u(w),
  height: u(h),
});

export const rectStyle = ({ x, y, w, h }: CanvasRect): CSSProperties => ({
  left: u(x),
  top: u(y),
  width: u(w),
  height: u(h),
});

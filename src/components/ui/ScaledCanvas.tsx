import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/cn";

interface ScaledCanvasProps {
  /** Design width in px — the canvas renders 1:1 at this width. */
  width: number;
  /** Design height in px — preserved through aspect-ratio. */
  height: number;
  className?: string;
  canvasClassName?: string;
  /**
   * CSS length expression (e.g. "100svh - 112px"). When set, the canvas never grows
   * taller than this, shrinking its width to keep the aspect ratio.
   */
  maxHeight?: string;
  children: ReactNode;
}

/**
 * Hosts fixed-composition artwork. Children position themselves in design px
 * via `u()` / `rectStyle()` from `@/lib/canvas`; `--u` resolves to one design
 * pixel at the current rendered width, so the composition scales without JS
 * and without layout shift.
 */
export function ScaledCanvas({ width, height, className, canvasClassName, maxHeight, children }: ScaledCanvasProps) {
  const canvasStyle = {
    aspectRatio: `${width} / ${height}`,
    "--u": `calc(100cqw / ${width})`,
  } as CSSProperties;
  const containerStyle: CSSProperties | undefined = maxHeight
    ? { maxWidth: `calc((${maxHeight}) * ${width / height})` }
    : undefined;

  return (
    <div className={cn("@container mx-auto w-full", className)} style={containerStyle}>
      <div dir="ltr" className={cn("relative w-full", canvasClassName)} style={canvasStyle}>
        {children}
      </div>
    </div>
  );
}

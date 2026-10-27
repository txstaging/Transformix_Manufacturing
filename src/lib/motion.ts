import type { Transition, Variants } from "framer-motion";

/** Easing curves taken from the Figma prototype timeline. */
export const EASE_OUT: [number, number, number, number] = [0, 0, 0.2, 1];
export const EASE_IN_OUT: [number, number, number, number] = [0.5, 0, 0.5, 1];

/** FAQ entrance in Figma: opacity 0 → 1, y 22 → 0 over ~0.65s, ease-out. */
export const REVEAL_OFFSET = 22;
export const revealTransition: Transition = { duration: 0.65, ease: "easeOut" };

const pop = (delay: number): Transition => ({ type: "spring", stiffness: 320, damping: 20, delay });

/*
 * Variant sets driven by a parent's `hidden` / `visible` labels. Pass the
 * per-element delay (seconds) through the motion `custom` prop.
 */

export const fadeUpItem: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: (delay: number = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE_OUT, delay } }),
};

export const fadeItem: Variants = {
  hidden: { opacity: 0 },
  visible: (delay: number = 0) => ({ opacity: 1, transition: { duration: 0.5, ease: EASE_OUT, delay } }),
};

export const popItem: Variants = {
  hidden: { opacity: 0, scale: 0.6 },
  visible: (delay: number = 0) => ({ opacity: 1, scale: 1, transition: pop(delay) }),
};

/** Bars grow from their baseline; pair with a bottom transform-origin. */
export const growUpItem: Variants = {
  hidden: { scaleY: 0 },
  visible: (delay: number = 0) => ({ scaleY: 1, transition: { duration: 0.6, ease: EASE_OUT, delay } }),
};

/** Rows slide in from the physical left (mockups are LTR). */
export const slideInItem: Variants = {
  hidden: { opacity: 0, x: -18 },
  visible: (delay: number = 0) => ({ opacity: 1, x: 0, transition: { duration: 0.5, ease: EASE_OUT, delay } }),
};

/** Left-to-right wipe, e.g. a line chart drawing itself. */
export const wipeItem: Variants = {
  hidden: { clipPath: "inset(0% 100% 0% 0%)" },
  visible: (delay: number = 0) => ({
    clipPath: "inset(0% 0% 0% 0%)",
    transition: { duration: 1.4, ease: [0.65, 0, 0.35, 1], delay },
  }),
};

import type { CSSProperties } from "react";

/** Which backdrop the stage is showing behind the inverting text. */
export type Mode = "swirl" | "manual" | "blue" | "magenta";

/** Baseline swirl loop length, in seconds, at 100% speed. */
const SWIRL_BASE_SECONDS = 18;

/** Convert a speed percentage (20–200) into an animation-duration string. */
export function swirlDuration(speed: number): string {
  return `${Math.round((SWIRL_BASE_SECONDS * 100) / speed)}s`;
}

interface Background {
  /** Class applied to the backdrop layer (used for the animated swirl). */
  className?: string;
  /** Inline style for flat-color backdrops and the swirl duration variable. */
  style?: CSSProperties;
}

/**
 * Resolve the stage backdrop for the current mode. `lightness` (0–100) only
 * matters in `manual` mode; `speed` (percent) only matters in `swirl` mode.
 */
export function resolveBackground(mode: Mode, lightness: number, speed: number): Background {
  switch (mode) {
    case "swirl":
      return {
        className: "stage-bg--swirl",
        style: { "--swirl-duration": swirlDuration(speed) } as CSSProperties,
      };
    case "manual":
      return { style: { backgroundColor: `hsl(0 0% ${lightness}%)` } };
    case "blue":
      return { style: { backgroundColor: "hsl(226 100% 50%)" } };
    case "magenta":
      return { style: { backgroundColor: "hsl(312 100% 50%)" } };
  }
}

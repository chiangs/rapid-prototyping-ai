import type { IndicatorProps } from "./nav-items";

// Slight overshoot on arrival — reads as a spring without a physics lib.
const SPRING = "cubic-bezier(0.34, 1.4, 0.64, 1)";

/**
 * variant="pill" — a rounded puck that springs between tabs behind the icons.
 */
export function PillIndicator({ activeIndex, count, reducedMotion }: IndicatorProps) {
  const widthPct = 100 / count;
  const style: React.CSSProperties = {
    width: `${widthPct}%`,
    transform: `translateX(${activeIndex * 100}%)`,
    transitionProperty: "transform",
    transitionDuration: reducedMotion ? "0ms" : "440ms",
    transitionTimingFunction: SPRING,
  };

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-y-1 left-0" style={style}>
      <div className="absolute inset-x-1.5 inset-y-1 rounded-control bg-brand-500" />
    </div>
  );
}

import type { IndicatorProps } from "./nav-items";

const SPRING = "cubic-bezier(0.34, 1.4, 0.64, 1)";

/**
 * variant="notch" — a raised cradle that slides under the active tab so its
 * icon rides up out of the bar. The shape is static; only its X position
 * animates (transitioning an SVG `d` is unreliable across browsers).
 */
export function NotchIndicator({ activeIndex, count, reducedMotion }: IndicatorProps) {
  const centerPct = (activeIndex + 0.5) * (100 / count);
  const style: React.CSSProperties = {
    left: `${centerPct}%`,
    transform: "translateX(-50%)",
    transitionProperty: "left",
    transitionDuration: reducedMotion ? "0ms" : "440ms",
    transitionTimingFunction: SPRING,
  };

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-3">
      <div className="absolute -top-6 h-14 w-14" style={style}>
        <div className="h-full w-full rounded-full border border-border bg-brand-500 shadow-md" />
      </div>
    </div>
  );
}

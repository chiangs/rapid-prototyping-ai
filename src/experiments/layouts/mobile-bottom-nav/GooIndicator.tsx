import type { IndicatorProps } from "./nav-items";

const FILTER_ID = "mbn-goo";
// The trailing blob lags the leading one; the goo threshold fuses them into a
// stretching metaball while they are apart.
const LEAD_MS = 420;
const TRAIL_MS = 620;

/**
 * variant="goo" — an SVG goo filter fuses two brand-colored blobs into a
 * metaball that stretches as it travels. Constrained to the icon band so it
 * never sits behind a label.
 */
export function GooIndicator({ activeIndex, count, reducedMotion }: IndicatorProps) {
  const centerPct = (activeIndex + 0.5) * (100 / count);
  const blobBase: React.CSSProperties = {
    left: `${centerPct}%`,
    transform: "translate(-50%, -50%)",
    transitionProperty: "left",
    transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
  };

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-3 h-8">
      <div className="absolute inset-0" style={{ filter: `url(#${FILTER_ID})` }}>
        <span
          className="absolute top-1/2 h-7 w-10 rounded-full bg-brand-500"
          style={{ ...blobBase, transitionDuration: `${reducedMotion ? 0 : LEAD_MS}ms` }}
        />
        <span
          className="absolute top-1/2 h-6 w-6 rounded-full bg-brand-500"
          style={{ ...blobBase, transitionDuration: `${reducedMotion ? 0 : TRAIL_MS}ms` }}
        />
      </div>
      <svg width="0" height="0" className="absolute">
        <defs>
          <filter id={FILTER_ID}>
            <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -9"
              result="goo"
            />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
        </defs>
      </svg>
    </div>
  );
}

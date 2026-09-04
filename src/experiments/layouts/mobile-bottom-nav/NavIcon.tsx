interface NavIconProps {
  /** SVG path `d` for a 24×24 viewBox. */
  path: string;
  className?: string;
}

/**
 * Renders a single stroked icon from a path string so the tab data can keep
 * icons inline (see nav-items.ts) instead of one component file per glyph.
 */
export function NavIcon({ path, className }: NavIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d={path} />
    </svg>
  );
}

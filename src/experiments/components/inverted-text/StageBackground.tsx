import { cn } from "@/lib/cn";
import { resolveBackground, type Mode } from "./modes";

interface StageBackgroundProps {
  mode: Mode;
  lightness: number;
  speed: number;
}

/**
 * The full-bleed backdrop layer inside the stage. Flat-color modes snap quickly
 * via a short background-color transition; `swirl` mode animates from CSS, its
 * loop length driven by the `--swirl-duration` custom property.
 */
export function StageBackground({ mode, lightness, speed }: StageBackgroundProps) {
  const { className, style } = resolveBackground(mode, lightness, speed);

  return (
    <div
      aria-hidden="true"
      className={cn(
        "absolute inset-0 transition-[background-color] duration-200 ease-out",
        className,
      )}
      style={style}
    />
  );
}

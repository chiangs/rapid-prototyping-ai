import { cn } from "@/lib/cn";
import type { HeroImageLayout, PlaceholderImage } from "./hero-data";

const copy = {
  placeholderNote: (label: string) => `${label} — placeholder, swap in the final photo when ready.`,
} as const;

interface HeroImageProps {
  image: PlaceholderImage;
  layout: HeroImageLayout;
  /** Horizontal gap (px) revealing the black backdrop on left/right, only applied when `layout` is "inset". */
  insetSpacingX: number;
  /** Vertical gap (px) revealing the black backdrop on top/bottom, only applied when `layout` is "inset". */
  insetSpacingY: number;
}

/** Fills the remaining space in the frame — swap this for a real <img> once the asset lands. */
export function HeroImage({ image, layout, insetSpacingX, insetSpacingY }: HeroImageProps) {
  const style =
    layout === "inset"
      ? { marginLeft: insetSpacingX, marginRight: insetSpacingX, marginTop: insetSpacingY, marginBottom: insetSpacingY }
      : undefined;

  return (
    <div
      role="img"
      aria-label={copy.placeholderNote(image.label)}
      style={style}
      className={cn(
        "flex flex-1 items-center justify-center text-sm font-medium text-white/70",
        image.className,
      )}
    >
      {image.label}
    </div>
  );
}

import { cn } from "@/lib/cn";
import type { PlaceholderImage } from "./hero-data";

const copy = {
  placeholderNote: (label: string) => `${label} — placeholder, swap in the final photo when ready.`,
} as const;

interface HeroImageProps {
  image: PlaceholderImage;
}

/** Fills the remaining space in the frame — swap this for a real <img> once the asset lands. */
export function HeroImage({ image }: HeroImageProps) {
  return (
    <div
      role="img"
      aria-label={copy.placeholderNote(image.label)}
      className={cn(
        "flex flex-1 items-center justify-center text-sm font-medium text-white/70",
        image.className,
      )}
    >
      {image.label}
    </div>
  );
}

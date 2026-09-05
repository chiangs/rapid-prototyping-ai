import { cn } from "@/lib/cn";
import { PLACEHOLDER_IMAGES, type PlaceholderImageId } from "../hero-data";

const copy = {
  groupLabel: "Hero image",
} as const;

interface HeroImageControlProps {
  value: PlaceholderImageId;
  onChange: (id: PlaceholderImageId) => void;
}

export function HeroImageControl({ value, onChange }: HeroImageControlProps) {
  const buttons = PLACEHOLDER_IMAGES.map((image) => {
    const selected = image.id === value;
    return (
      <button
        key={image.id}
        type="button"
        aria-pressed={selected}
        onClick={() => onChange(image.id)}
        className={cn(
          "rounded-control px-3 py-1.5 text-sm font-medium transition-colors",
          "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600",
          selected ? "bg-brand-500 text-white" : "text-muted hover:bg-brand-50 hover:text-brand-700",
        )}
      >
        {image.label}
      </button>
    );
  });

  return (
    <div className="flex flex-col gap-1">
      <span className="text-xs font-medium uppercase tracking-wide text-muted">{copy.groupLabel}</span>
      <div
        role="group"
        aria-label={copy.groupLabel}
        className="flex flex-wrap gap-1 rounded-control border border-border bg-surface p-1"
      >
        {buttons}
      </div>
    </div>
  );
}

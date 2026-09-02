import { cn } from "@/lib/cn";
import type { Filter } from "./categories";

interface CategoryButtonProps {
  category: Filter;
  isActive: boolean;
  onSelect: () => void;
}

export function CategoryButton({ category, isActive, onSelect }: CategoryButtonProps) {
  return (
    <button
      type="button"
      aria-pressed={isActive}
      onClick={onSelect}
      className={cn(
        "h-8 rounded-full px-3 text-sm font-medium transition-colors",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600",
        isActive
          ? "bg-brand-500 text-white"
          : "border border-border bg-surface text-muted hover:bg-canvas",
      )}
    >
      {category}
    </button>
  );
}

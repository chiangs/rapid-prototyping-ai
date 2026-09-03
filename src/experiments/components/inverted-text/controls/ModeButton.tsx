import { cn } from "@/lib/cn";
import type { Mode } from "../modes";

interface ModeButtonProps {
  mode: Mode;
  label: string;
  isActive: boolean;
  onSelect: (mode: Mode) => void;
}

const base =
  "h-9 rounded-control px-3 text-sm font-medium transition-colors " +
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600";

export function ModeButton({ mode, label, isActive, onSelect }: ModeButtonProps) {
  const stateClasses = isActive
    ? "bg-brand-500 text-white hover:bg-brand-600"
    : "border border-border bg-surface text-ink hover:bg-canvas";

  return (
    <button
      type="button"
      aria-pressed={isActive}
      onClick={() => onSelect(mode)}
      className={cn(base, stateClasses)}
    >
      {label}
    </button>
  );
}

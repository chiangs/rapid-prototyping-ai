import { cn } from "@/lib/cn";

interface KindToggleButtonProps {
  label: string;
  isActive: boolean;
  onSelect: () => void;
}

export function KindToggleButton({ label, isActive, onSelect }: KindToggleButtonProps) {
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
      {label}
    </button>
  );
}

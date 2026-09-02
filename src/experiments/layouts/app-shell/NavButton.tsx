import { cn } from "@/lib/cn";

interface NavButtonProps {
  label: string;
  isActive: boolean;
  onSelect: () => void;
}

export function NavButton({ label, isActive, onSelect }: NavButtonProps) {
  return (
    <button
      type="button"
      aria-current={isActive ? "page" : undefined}
      onClick={onSelect}
      className={cn(
        "shrink-0 rounded-control px-3 py-2 text-left text-sm font-medium transition-colors",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600",
        isActive ? "bg-brand-500 text-white" : "text-muted hover:bg-brand-50 hover:text-brand-700",
      )}
    >
      {label}
    </button>
  );
}

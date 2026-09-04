import { cn } from "@/lib/cn";

const copy = {
  label: "promoted",
} as const;

export function PromotedBadge() {
  return (
    <span
      className={cn(
        "shrink-0 rounded-full bg-canvas px-2 py-0.5 text-xs font-medium text-muted ring-1 ring-border",
      )}
    >
      {copy.label}
    </span>
  );
}

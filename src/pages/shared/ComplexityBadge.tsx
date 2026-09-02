import { cn } from "@/lib/cn";

const copy = {
  simple: "simple",
  complex: "complex",
} as const;

export function ComplexityBadge({ complexity }: { complexity: "simple" | "complex" }) {
  return (
    <span
      className={cn(
        "shrink-0 rounded-full px-2 py-0.5 text-xs font-medium",
        complexity === "complex"
          ? "bg-brand-500 text-white"
          : "bg-brand-50 text-brand-700 ring-1 ring-brand-100",
      )}
    >
      {copy[complexity]}
    </span>
  );
}

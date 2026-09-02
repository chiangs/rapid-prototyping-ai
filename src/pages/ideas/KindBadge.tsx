import { cn } from "@/lib/cn";
import type { IdeaKind } from "@/ideas/catalog";

const copy = {
  component: "Component",
  layout: "Layout",
} as const;

export function KindBadge({ kind }: { kind: IdeaKind }) {
  return (
    <span
      className={cn(
        "shrink-0 rounded-full px-2 py-0.5 text-xs font-medium ring-1",
        kind === "component"
          ? "bg-canvas text-ink ring-border"
          : "bg-canvas text-brand-700 ring-brand-100",
      )}
    >
      {copy[kind]}
    </span>
  );
}

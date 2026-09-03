import { cn } from "@/lib/cn";
import type { CodeLang } from "./codeSamples";

interface CodeTabProps {
  lang: CodeLang;
  label: string;
  isActive: boolean;
  onSelect: (lang: CodeLang) => void;
}

const base =
  "h-8 rounded-control px-3 text-xs font-semibold uppercase tracking-wide transition-colors " +
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600";

export function CodeTab({ lang, label, isActive, onSelect }: CodeTabProps) {
  const stateClasses = isActive
    ? "bg-brand-500 text-white hover:bg-brand-600"
    : "border border-border bg-surface text-ink hover:bg-canvas";

  return (
    <button
      type="button"
      aria-pressed={isActive}
      onClick={() => onSelect(lang)}
      className={cn(base, stateClasses)}
    >
      {label}
    </button>
  );
}

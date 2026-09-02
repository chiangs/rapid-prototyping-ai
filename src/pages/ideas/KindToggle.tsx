import { KindToggleButton } from "./KindToggleButton";

export type KindFilter = "all" | "component" | "layout";

const copy = {
  groupLabel: "Filter by kind",
} as const;

const OPTIONS: { value: KindFilter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "component", label: "Components" },
  { value: "layout", label: "Layouts" },
];

interface KindToggleProps {
  value: KindFilter;
  onChange: (value: KindFilter) => void;
}

export function KindToggle({ value, onChange }: KindToggleProps) {
  const buttons = OPTIONS.map((option) => (
    <KindToggleButton
      key={option.value}
      label={option.label}
      isActive={option.value === value}
      onSelect={() => onChange(option.value)}
    />
  ));

  return (
    <div className="flex flex-wrap gap-2" role="group" aria-label={copy.groupLabel}>
      {buttons}
    </div>
  );
}

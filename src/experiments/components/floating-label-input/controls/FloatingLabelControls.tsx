import { cn } from "@/lib/cn";
import type { InputType } from "../FloatingLabelInput";
import { RangeControl } from "./RangeControl";
import { SegmentedControl } from "./SegmentedControl";

// Dev-time controls for iterating on the floating-label input. NOT part of
// the piece — lives in `controls/` so it's left behind when the input is promoted.

const copy = {
  groupLabel: "Floating label input controls",
  typeLegend: "Input type",
  radiusLabel: "Border radius",
  radiusValue: (px: number) => `${px}px`,
  themeToLight: "Switch to light",
  themeToDark: "Switch to dark",
} as const;

const TYPE_OPTIONS = [
  { value: "text", label: "Text" },
  { value: "email", label: "Email" },
  { value: "password", label: "Password" },
] as const satisfies readonly { value: InputType; label: string }[];

const RADIUS_MIN = 0;
const RADIUS_MAX = 56;
const RADIUS_STEP = 4;

interface FloatingLabelControlsProps {
  inputType: InputType;
  radius: number;
  isDark: boolean;
  onInputTypeChange: (value: InputType) => void;
  onRadiusChange: (value: number) => void;
  onToggleTheme: () => void;
}

export function FloatingLabelControls({
  inputType,
  radius,
  isDark,
  onInputTypeChange,
  onRadiusChange,
  onToggleTheme,
}: FloatingLabelControlsProps) {
  const themeLabel = isDark ? copy.themeToLight : copy.themeToDark;

  return (
    <div
      role="group"
      aria-label={copy.groupLabel}
      className="flex flex-wrap items-end gap-x-8 gap-y-4 rounded-card border border-border bg-surface p-4"
    >
      <SegmentedControl
        legend={copy.typeLegend}
        options={TYPE_OPTIONS}
        value={inputType}
        onChange={onInputTypeChange}
      />
      <RangeControl
        label={copy.radiusLabel}
        valueText={copy.radiusValue(radius)}
        value={radius}
        min={RADIUS_MIN}
        max={RADIUS_MAX}
        step={RADIUS_STEP}
        onChange={onRadiusChange}
      />
      <button
        type="button"
        aria-pressed={isDark}
        onClick={onToggleTheme}
        className={cn(
          "h-9 rounded-control border px-3 text-sm font-medium transition-colors",
          "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600",
          isDark
            ? "border-brand-500 bg-brand-50 text-brand-700 hover:bg-brand-100"
            : "border-border bg-surface text-muted hover:bg-canvas",
        )}
      >
        {themeLabel}
      </button>
    </div>
  );
}

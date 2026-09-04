import type { FrameMode } from "../PhoneFrame";
import type { IndicatorVariant, NavBehavior } from "../nav-items";
import { BEHAVIOR_OPTIONS, FRAME_OPTIONS, INDICATOR_OPTIONS } from "./control-options";
import { SegmentedControl } from "./SegmentedControl";

const copy = {
  indicatorLegend: "Indicator",
  behaviorLegend: "Scroll behavior",
  frameLegend: "Frame",
  hint: "Prototype controls — not part of the navigation pattern itself. “Viewport (dvh)” sizes the screen to the live viewport; open it on a phone to watch the bar hold position as the browser chrome collapses.",
} as const;

interface DemoControlsProps {
  variant: IndicatorVariant;
  behavior: NavBehavior;
  frameMode: FrameMode;
  onVariantChange: (value: IndicatorVariant) => void;
  onBehaviorChange: (value: NavBehavior) => void;
  onFrameModeChange: (value: FrameMode) => void;
}

export function DemoControls({
  variant,
  behavior,
  frameMode,
  onVariantChange,
  onBehaviorChange,
  onFrameModeChange,
}: DemoControlsProps) {
  return (
    <div className="mb-6 flex flex-col gap-4 rounded-card border border-border bg-surface p-4 sm:flex-row sm:flex-wrap sm:items-start sm:gap-8">
      <SegmentedControl
        legend={copy.indicatorLegend}
        options={INDICATOR_OPTIONS}
        value={variant}
        onChange={onVariantChange}
      />
      <SegmentedControl
        legend={copy.behaviorLegend}
        options={BEHAVIOR_OPTIONS}
        value={behavior}
        onChange={onBehaviorChange}
      />
      <SegmentedControl
        legend={copy.frameLegend}
        options={FRAME_OPTIONS}
        value={frameMode}
        onChange={onFrameModeChange}
      />
      <p className="text-xs text-muted sm:max-w-xs">{copy.hint}</p>
    </div>
  );
}

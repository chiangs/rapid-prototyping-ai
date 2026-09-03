import type { Mode } from "../modes";
import { ModeButton } from "./ModeButton";
import { RangeControl } from "./RangeControl";

// All user-facing text for the control cluster.
const copy = {
  groupLabel: "Backdrop mode",
  modeLabels: {
    swirl: "Swirl",
    manual: "Dark → Light",
    blue: "Blue",
    magenta: "Magenta",
  } satisfies Record<Mode, string>,
  lightnessHint: "Dark → Light",
  lightnessLabel: "Backdrop lightness, dark to light",
  speedHint: "Slow → Fast",
  speedLabel: "Swirl speed, slow to fast",
} as const;

// Segmented-control order. `swirl` is the default "controls off" state.
const MODES: Mode[] = ["swirl", "manual", "blue", "magenta"];

// Swirl speed is a percentage of the baseline loop length.
const SPEED_MIN = 20;
const SPEED_MAX = 200;

interface ModeControlsProps {
  mode: Mode;
  lightness: number;
  speed: number;
  onModeChange: (mode: Mode) => void;
  onLightnessChange: (lightness: number) => void;
  onSpeedChange: (speed: number) => void;
}

export function ModeControls({
  mode,
  lightness,
  speed,
  onModeChange,
  onLightnessChange,
  onSpeedChange,
}: ModeControlsProps) {
  const modeButtons = MODES.map((value) => (
    <ModeButton
      key={value}
      mode={value}
      label={copy.modeLabels[value]}
      isActive={value === mode}
      onSelect={onModeChange}
    />
  ));

  // The trailing slider is contextual: swirl speed, manual lightness, or nothing.
  let slider = null;
  if (mode === "swirl") {
    slider = (
      <RangeControl
        label={copy.speedHint}
        ariaLabel={copy.speedLabel}
        value={speed}
        min={SPEED_MIN}
        max={SPEED_MAX}
        step={5}
        onChange={onSpeedChange}
      />
    );
  } else if (mode === "manual") {
    slider = (
      <RangeControl
        label={copy.lightnessHint}
        ariaLabel={copy.lightnessLabel}
        value={lightness}
        min={0}
        max={100}
        onChange={onLightnessChange}
      />
    );
  }

  return (
    <div className="flex min-h-9 flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-wrap gap-2" role="group" aria-label={copy.groupLabel}>
        {modeButtons}
      </div>
      {slider}
    </div>
  );
}

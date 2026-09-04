import type { FrameMode } from "../PhoneFrame";
import type { IndicatorVariant, NavBehavior } from "../nav-items";

interface Option<T extends string> {
  value: T;
  label: string;
}

export const INDICATOR_OPTIONS: readonly Option<IndicatorVariant>[] = [
  { value: "pill", label: "Pill" },
  { value: "goo", label: "Goo" },
  { value: "notch", label: "Notch" },
];

export const BEHAVIOR_OPTIONS: readonly Option<NavBehavior>[] = [
  { value: "static", label: "Static" },
  { value: "condense", label: "Condense" },
  { value: "condense-progress", label: "Condense + progress" },
];

export const FRAME_OPTIONS: readonly Option<FrameMode>[] = [
  { value: "simulated", label: "Simulated" },
  { value: "viewport", label: "Viewport (dvh)" },
];

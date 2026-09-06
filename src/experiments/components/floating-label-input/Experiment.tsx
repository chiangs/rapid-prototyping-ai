import { useState } from "react";
import type { ExperimentMeta } from "@/experiments/registry";
import { cn } from "@/lib/cn";
import { FloatingLabelControls } from "./controls/FloatingLabelControls";
import { FloatingLabelInput, type InputType } from "./FloatingLabelInput";

const copy = {
  label: "Label",
} as const;

const INPUT_TYPE_DEFAULT: InputType = "text";
const RADIUS_DEFAULT = 24;

export const meta = {
  title: "Floating label input",
  description:
    "A single text input whose label floats up and shrinks on focus, with a snappy spring animation.",
  complexity: "simple",
  tags: ["forms", "input", "animation"],
} satisfies ExperimentMeta;

export default function Experiment() {
  const [inputType, setInputType] = useState<InputType>(INPUT_TYPE_DEFAULT);
  const [radius, setRadius] = useState(RADIUS_DEFAULT);
  const [isDark, setIsDark] = useState(false);
  const toggleTheme = () => setIsDark((value) => !value);

  const backdropClasses = cn(
    "flex min-h-64 items-center justify-center rounded-card p-12 transition-colors",
    isDark ? "bg-ink" : "bg-canvas",
  );

  return (
    <div className="space-y-6">
      <FloatingLabelControls
        inputType={inputType}
        radius={radius}
        isDark={isDark}
        onInputTypeChange={setInputType}
        onRadiusChange={setRadius}
        onToggleTheme={toggleTheme}
      />
      <div className={backdropClasses}>
        <FloatingLabelInput
          type={inputType}
          radius={radius}
          isDark={isDark}
          label={copy.label}
          id="floating-demo-input"
        />
      </div>
    </div>
  );
}

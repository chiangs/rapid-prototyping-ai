import { useState } from "react";
import type { ExperimentMeta } from "@/experiments/registry";
import { CodeSample } from "./controls/CodeSample";
import { ModeControls } from "./controls/ModeControls";
import { DEFAULT_COLOUR } from "./controls/palette";
import { InvertedStage } from "./InvertedStage";
import type { ImageSource, Mode } from "./modes";

// All user-facing text for this experiment, in one place.
const copy = {
  caption:
    "The text is white with mix-blend-mode: difference — it subtracts whatever colour is behind it. Leave the controls on Swirl to watch it react to a moving field, or drive the backdrop yourself.",
} as const;

export const meta = {
  title: "Inverted text",
  description:
    "A big display word that subtracts the colours behind it via mix-blend-mode: difference.",
  complexity: "complex",
  tags: ["motion", "typography", "css"],
} satisfies ExperimentMeta;

export default function Experiment() {
  const [mode, setMode] = useState<Mode>("manual");
  const [lightness, setLightness] = useState(50);
  const [speed, setSpeed] = useState(100);
  const [imageSource, setImageSource] = useState<ImageSource>("illustration");
  const [colour, setColour] = useState(DEFAULT_COLOUR);

  return (
    <div className="space-y-6">
      <ModeControls
        mode={mode}
        lightness={lightness}
        speed={speed}
        imageSource={imageSource}
        colour={colour}
        onModeChange={setMode}
        onLightnessChange={setLightness}
        onSpeedChange={setSpeed}
        onImageSourceChange={setImageSource}
        onColourChange={setColour}
      />
      <InvertedStage
        mode={mode}
        lightness={lightness}
        speed={speed}
        imageSource={imageSource}
        colour={colour}
      />
      <p className="max-w-2xl text-sm text-muted">{copy.caption}</p>
      <CodeSample />
    </div>
  );
}

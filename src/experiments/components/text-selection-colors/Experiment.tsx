import { useState } from "react";
import type { ExperimentMeta } from "@/experiments/registry";
import { PALETTE, readableTextOn } from "./palette";
import { SelectionText } from "./SelectionText";
import { SwatchPicker } from "./SwatchPicker";
import { TypographyControls } from "./controls/TypographyControls";

// All user-facing text for this experiment, in one place.
const copy = {
  hint: "Select the text above to see the highlight colour.",
} as const;

export const meta = {
  title: "Text selection colours",
  description: "Recolour the ::selection highlight with preset pastel swatches or a custom colour.",
  complexity: "simple",
  tags: ["css", "typography"],
} satisfies ExperimentMeta;

export default function Experiment() {
  const [color, setColor] = useState(PALETTE[0].value);
  const [fontSize, setFontSize] = useState(20);
  const [lineHeight, setLineHeight] = useState(1.6);

  const foreground = readableTextOn(color);

  return (
    <div className="space-y-8">
      <SelectionText
        fontSize={fontSize}
        lineHeight={lineHeight}
        background={color}
        foreground={foreground}
      />

      <p className="text-sm text-muted">{copy.hint}</p>

      <SwatchPicker colors={PALETTE} value={color} onChange={setColor} />

      <TypographyControls
        fontSize={fontSize}
        lineHeight={lineHeight}
        onFontSizeChange={setFontSize}
        onLineHeightChange={setLineHeight}
      />
    </div>
  );
}

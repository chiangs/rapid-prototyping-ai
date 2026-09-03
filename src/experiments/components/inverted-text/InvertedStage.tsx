import { StageBackground } from "./StageBackground";
import type { Mode } from "./modes";
import "./invert.css";

// All user-facing text this component renders.
const copy = {
  word: "INVERT",
  stageLabel: (mode: string) =>
    `The word “INVERTED” in large type, subtracting the colors of the ${mode} backdrop behind it.`,
} as const;

const MODE_LABEL: Record<Mode, string> = {
  swirl: "circling green, purple and blue",
  manual: "adjustable dark-to-light",
  blue: "saturated blue",
  magenta: "saturated magenta",
};

interface InvertedStageProps {
  mode: Mode;
  lightness: number;
  speed: number;
}

export function InvertedStage({ mode, lightness, speed }: InvertedStageProps) {
  return (
    <div
      role="img"
      aria-label={copy.stageLabel(MODE_LABEL[mode])}
      className="relative isolate flex h-[32rem] min-h-96 items-center justify-center overflow-hidden rounded-card border border-border bg-ink"
    >
      <StageBackground mode={mode} lightness={lightness} speed={speed} />
      <h1 className="invert-text relative px-6 text-center text-[clamp(2.5rem,15vw,11rem)] leading-none font-black tracking-tighter uppercase">
        {copy.word}
      </h1>
    </div>
  );
}

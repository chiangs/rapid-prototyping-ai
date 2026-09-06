import type { CSSProperties, ReactNode } from "react";
import type { HeroDef, HeroImageLayout } from "./hero-data";
import { CatHero } from "./heroes/cat/CatHero";
import { HeroGradient } from "./HeroGradient";

const copy = {
  catLabel: "Animated black cat that turns to follow your cursor",
} as const;

interface HeroVisualProps {
  hero: HeroDef;
  layout: HeroImageLayout;
  /** Gap (px) revealing the black backdrop on left/right, only when `layout` is "inset". */
  insetSpacingX: number;
  /** Gap (px) revealing the black backdrop on top/bottom, only when `layout` is "inset". */
  insetSpacingY: number;
  /** False under reduced motion or for a hero with no sprite sheet. */
  interactive: boolean;
}

/** Fills the frame between the nav and the hero text with the active hero's visual. */
export function HeroVisual({
  hero,
  layout,
  insetSpacingX,
  insetSpacingY,
  interactive,
}: HeroVisualProps) {
  const style: CSSProperties | undefined =
    layout === "inset"
      ? {
          marginLeft: insetSpacingX,
          marginRight: insetSpacingX,
          marginTop: insetSpacingY,
          marginBottom: insetSpacingY,
        }
      : undefined;

  let visual: ReactNode;
  if (hero.kind === "sprite" && hero.id === "cat") {
    visual = <CatHero interactive={interactive} label={copy.catLabel} />;
  } else {
    visual = <HeroGradient name={hero.label} gradientClass={hero.gradientClass ?? ""} />;
  }

  return (
    <div style={style} className="flex flex-1 overflow-hidden">
      {visual}
    </div>
  );
}

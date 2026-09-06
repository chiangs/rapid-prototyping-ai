import { SpriteScrubCanvas } from "../../SpriteScrubCanvas";
import { CAT_SPRITE } from "./cat-sprite";

interface CatHeroProps {
  interactive: boolean;
  label: string;
}

/** The cat hero: its own sprite sheet + frame metadata handed to the shared engine. */
export function CatHero({ interactive, label }: CatHeroProps) {
  return (
    <SpriteScrubCanvas
      sheetUrl={CAT_SPRITE.sheetUrl}
      frameCount={CAT_SPRITE.frameCount}
      columns={CAT_SPRITE.columns}
      frameWidth={CAT_SPRITE.frameWidth}
      frameHeight={CAT_SPRITE.frameHeight}
      idleFrame={CAT_SPRITE.idleFrame}
      objectFit={CAT_SPRITE.objectFit}
      interactive={interactive}
      label={label}
    />
  );
}

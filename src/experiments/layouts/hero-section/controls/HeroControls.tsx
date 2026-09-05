import type { HeroImageLayout, NavLinkData, PlaceholderImageId } from "../hero-data";
import { HeroImageControl } from "./HeroImageControl";
import { HeroLayoutControl } from "./HeroLayoutControl";
import { HeroTextControl } from "./HeroTextControl";
import { NavLinksControl } from "./NavLinksControl";

const copy = {
  groupLabel: "Hero controls",
} as const;

interface HeroControlsProps {
  navLinks: NavLinkData[];
  onNavLabelChange: (id: string, label: string) => void;
  onNavMoveUp: (id: string) => void;
  onNavMoveDown: (id: string) => void;
  imageId: PlaceholderImageId;
  onImageChange: (id: PlaceholderImageId) => void;
  imageLayout: HeroImageLayout;
  onImageLayoutChange: (layout: HeroImageLayout) => void;
  insetSpacingX: number;
  onInsetSpacingXChange: (spacing: number) => void;
  insetSpacingY: number;
  onInsetSpacingYChange: (spacing: number) => void;
  headline: string;
  subheading: string;
  onHeadlineChange: (value: string) => void;
  onSubheadingChange: (value: string) => void;
}

export function HeroControls({
  navLinks,
  onNavLabelChange,
  onNavMoveUp,
  onNavMoveDown,
  imageId,
  onImageChange,
  imageLayout,
  onImageLayoutChange,
  insetSpacingX,
  onInsetSpacingXChange,
  insetSpacingY,
  onInsetSpacingYChange,
  headline,
  subheading,
  onHeadlineChange,
  onSubheadingChange,
}: HeroControlsProps) {
  return (
    <div
      role="group"
      aria-label={copy.groupLabel}
      className="grid grid-cols-1 gap-6 rounded-card border border-border bg-surface p-4 sm:grid-cols-2 sm:gap-8 lg:grid-cols-4"
    >
      <HeroImageControl value={imageId} onChange={onImageChange} />
      <HeroLayoutControl
        layout={imageLayout}
        onLayoutChange={onImageLayoutChange}
        spacingX={insetSpacingX}
        onSpacingXChange={onInsetSpacingXChange}
        spacingY={insetSpacingY}
        onSpacingYChange={onInsetSpacingYChange}
      />
      <HeroTextControl
        headline={headline}
        subheading={subheading}
        onHeadlineChange={onHeadlineChange}
        onSubheadingChange={onSubheadingChange}
      />
      <NavLinksControl
        links={navLinks}
        onLabelChange={onNavLabelChange}
        onMoveUp={onNavMoveUp}
        onMoveDown={onNavMoveDown}
      />
    </div>
  );
}

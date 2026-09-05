import type { NavLinkData, PlaceholderImageId } from "../hero-data";
import { HeroImageControl } from "./HeroImageControl";
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
  headline,
  subheading,
  onHeadlineChange,
  onSubheadingChange,
}: HeroControlsProps) {
  return (
    <div
      role="group"
      aria-label={copy.groupLabel}
      className="flex flex-col gap-6 rounded-card border border-border bg-surface p-4 sm:flex-row sm:flex-wrap sm:gap-8"
    >
      <HeroImageControl value={imageId} onChange={onImageChange} />
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

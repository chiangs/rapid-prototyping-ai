import { useState } from "react";
import type { ExperimentMeta } from "@/experiments/registry";
import { HeroControls } from "./controls/HeroControls";
import { HeroSection } from "./HeroSection";
import {
  DEFAULT_HEADLINE,
  DEFAULT_IMAGE_LAYOUT,
  DEFAULT_INSET_SPACING_X,
  DEFAULT_INSET_SPACING_Y,
  DEFAULT_NAV_LINKS,
  DEFAULT_SUBHEADING,
  PLACEHOLDER_IMAGES,
  moveItem,
  type HeroImageLayout,
  type NavLinkData,
  type PlaceholderImageId,
} from "./hero-data";

export const meta = {
  title: "Hero section",
  description:
    "A full-bleed hero image below a mocked top nav, with editable nav links and hero text.",
  complexity: "simple",
  tags: ["navigation", "layout", "hero"],
} satisfies ExperimentMeta;

export default function Experiment() {
  const [navLinks, setNavLinks] = useState<NavLinkData[]>(DEFAULT_NAV_LINKS);
  const [imageId, setImageId] = useState<PlaceholderImageId>(PLACEHOLDER_IMAGES[0].id);
  const [imageLayout, setImageLayout] = useState<HeroImageLayout>(DEFAULT_IMAGE_LAYOUT);
  const [insetSpacingX, setInsetSpacingX] = useState(DEFAULT_INSET_SPACING_X);
  const [insetSpacingY, setInsetSpacingY] = useState(DEFAULT_INSET_SPACING_Y);
  const [headline, setHeadline] = useState(DEFAULT_HEADLINE);
  const [subheading, setSubheading] = useState(DEFAULT_SUBHEADING);

  const activeImage = PLACEHOLDER_IMAGES.find((image) => image.id === imageId)!;

  const handleNavLabelChange = (id: string, label: string) => {
    setNavLinks((links) => links.map((link) => (link.id === id ? { ...link, label } : link)));
  };

  const handleNavMoveUp = (id: string) => {
    setNavLinks((links) => moveItem(links, links.findIndex((link) => link.id === id), "up"));
  };

  const handleNavMoveDown = (id: string) => {
    setNavLinks((links) => moveItem(links, links.findIndex((link) => link.id === id), "down"));
  };

  return (
    <div className="space-y-6">
      <HeroControls
        navLinks={navLinks}
        onNavLabelChange={handleNavLabelChange}
        onNavMoveUp={handleNavMoveUp}
        onNavMoveDown={handleNavMoveDown}
        imageId={imageId}
        onImageChange={setImageId}
        imageLayout={imageLayout}
        onImageLayoutChange={setImageLayout}
        insetSpacingX={insetSpacingX}
        onInsetSpacingXChange={setInsetSpacingX}
        insetSpacingY={insetSpacingY}
        onInsetSpacingYChange={setInsetSpacingY}
        headline={headline}
        subheading={subheading}
        onHeadlineChange={setHeadline}
        onSubheadingChange={setSubheading}
      />
      <HeroSection
        navLinks={navLinks}
        image={activeImage}
        imageLayout={imageLayout}
        insetSpacingX={insetSpacingX}
        insetSpacingY={insetSpacingY}
        headline={headline}
        subheading={subheading}
      />
    </div>
  );
}

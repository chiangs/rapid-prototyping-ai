import { useState } from "react";
import type { ExperimentMeta } from "@/experiments/registry";
import { HeroControls } from "./controls/HeroControls";
import { HeroSection } from "./HeroSection";
import {
  DEFAULT_HEADLINE,
  DEFAULT_NAV_LINKS,
  DEFAULT_SUBHEADING,
  PLACEHOLDER_IMAGES,
  moveItem,
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
        headline={headline}
        subheading={subheading}
        onHeadlineChange={setHeadline}
        onSubheadingChange={setSubheading}
      />
      <HeroSection navLinks={navLinks} image={activeImage} headline={headline} subheading={subheading} />
    </div>
  );
}

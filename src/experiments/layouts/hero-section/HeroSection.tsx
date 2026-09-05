import type { HeroImageLayout, NavLinkData, PlaceholderImage } from "./hero-data";
import { NavBar } from "./NavBar";
import { HeroImage } from "./HeroImage";
import { HeroText } from "./HeroText";

interface HeroSectionProps {
  navLinks: NavLinkData[];
  image: PlaceholderImage;
  imageLayout: HeroImageLayout;
  insetSpacingX: number;
  insetSpacingY: number;
  headline: string;
  subheading: string;
}

/** The piece: a black page frame holding the nav, the hero image, and the hero text. */
export function HeroSection({
  navLinks,
  image,
  imageLayout,
  insetSpacingX,
  insetSpacingY,
  headline,
  subheading,
}: HeroSectionProps) {
  return (
    <div className="flex min-h-[520px] flex-col overflow-hidden rounded-card border border-border bg-black sm:min-h-[620px]">
      <NavBar links={navLinks} />
      <HeroImage
        image={image}
        layout={imageLayout}
        insetSpacingX={insetSpacingX}
        insetSpacingY={insetSpacingY}
      />
      <HeroText headline={headline} subheading={subheading} />
    </div>
  );
}

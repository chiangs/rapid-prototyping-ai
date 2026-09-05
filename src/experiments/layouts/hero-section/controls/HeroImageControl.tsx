import { PLACEHOLDER_IMAGES, type PlaceholderImageId } from "../hero-data";
import { SegmentedControl } from "./SegmentedControl";

const copy = {
  groupLabel: "Hero image",
} as const;

const IMAGE_OPTIONS = PLACEHOLDER_IMAGES.map((image) => ({ value: image.id, label: image.label }));

interface HeroImageControlProps {
  value: PlaceholderImageId;
  onChange: (id: PlaceholderImageId) => void;
}

export function HeroImageControl({ value, onChange }: HeroImageControlProps) {
  return (
    <SegmentedControl legend={copy.groupLabel} options={IMAGE_OPTIONS} value={value} onChange={onChange} />
  );
}

// Shared types + default content for the hero-section experiment.
// Non-component values live here so Fast Refresh keeps working (see docs/DESIGN.md).

export interface NavLinkData {
  id: string;
  label: string;
}

export interface PlaceholderImage {
  id: string;
  label: string;
  /** Gradient classes standing in for the real photo, uploaded later. */
  className: string;
}

export const DEFAULT_NAV_LINKS: NavLinkData[] = [
  { id: "home", label: "Home" },
  { id: "work", label: "Work" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
];

export const PLACEHOLDER_IMAGES = [
  { id: "a", label: "Image A", className: "bg-gradient-to-br from-slate-500 to-slate-800" },
  { id: "b", label: "Image B", className: "bg-gradient-to-br from-amber-500 to-rose-700" },
  { id: "c", label: "Image C", className: "bg-gradient-to-br from-emerald-500 to-teal-800" },
] as const satisfies readonly PlaceholderImage[];

export type PlaceholderImageId = (typeof PLACEHOLDER_IMAGES)[number]["id"];

export const DEFAULT_HEADLINE = "Make it unforgettable.";
export const DEFAULT_SUBHEADING = "A short line of supporting copy goes here.";

/** Swap an item with its neighbor in `direction`; no-ops past either end of the list. */
export function moveItem<T>(items: T[], index: number, direction: "up" | "down"): T[] {
  const targetIndex = direction === "up" ? index - 1 : index + 1;
  if (targetIndex < 0 || targetIndex >= items.length) return items;

  const next = [...items];
  [next[index], next[targetIndex]] = [next[targetIndex], next[index]];
  return next;
}

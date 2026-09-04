// Shared types + tab data for the mobile bottom-nav experiment.
// Non-component values live here so Fast Refresh keeps working (see docs/DESIGN.md).

/** Which active-state treatment the bar draws. */
export type IndicatorVariant = "pill" | "goo" | "notch";

/** How the bar reacts to scrolling a long page. */
export type NavBehavior = "static" | "condense" | "condense-progress";

export interface NavSection {
  /** Slug — the feed renders a matching `#section-<id>` block. */
  id: string;
  label: string;
}

/** Props shared by the three indicator layers (PillIndicator / GooIndicator / NotchIndicator). */
export interface IndicatorProps {
  /** Index of the active tab. */
  activeIndex: number;
  /** Total number of tabs — tabs are equal width, so position is `index / count`. */
  count: number;
  /** Skip the travel animation when the OS asks for reduced motion. */
  reducedMotion: boolean;
}

export interface NavItemData {
  id: string;
  label: string;
  /** SVG path `d` for a 24×24 stroked icon, drawn by NavIcon. */
  iconPath: string;
  /** Present on exactly one item → that tab gets the contextual-bloom menu. */
  sections?: readonly NavSection[];
}

export const NAV_ITEMS = [
  {
    id: "home",
    label: "Home",
    iconPath: "M3 9.6 12 3l9 6.6V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z",
  },
  {
    id: "explore",
    label: "Explore",
    iconPath:
      "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM15.6 8.4l-1.8 5.4-5.4 1.8 1.8-5.4z",
    sections: [
      { id: "trending", label: "Trending" },
      { id: "nearby", label: "Nearby" },
      { id: "following", label: "Following" },
      { id: "saved", label: "Saved" },
    ],
  },
  {
    id: "create",
    label: "Create",
    iconPath: "M12 5v14M5 12h14",
  },
  {
    id: "alerts",
    label: "Alerts",
    iconPath: "M6 9a6 6 0 0 1 12 0c0 5 2 6 2 6H4s2-1 2-6M10 19a2 2 0 0 0 4 0",
  },
  {
    id: "profile",
    label: "Profile",
    iconPath: "M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM5 20c1.4-3.4 4-5 7-5s5.6 1.6 7 5",
  },
] as const satisfies readonly NavItemData[];

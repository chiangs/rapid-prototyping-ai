import { useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { BloomMenu } from "./BloomMenu";
import { GooIndicator } from "./GooIndicator";
import { NavItem } from "./NavItem";
import { NotchIndicator } from "./NotchIndicator";
import { PillIndicator } from "./PillIndicator";
import type { IndicatorVariant, NavBehavior, NavItemData } from "./nav-items";
import { useNavScroll } from "./use-nav-scroll";
import { useReducedMotion } from "./use-reduced-motion";

const copy = {
  navLabel: "Primary",
} as const;

const INDICATORS = {
  pill: PillIndicator,
  goo: GooIndicator,
  notch: NotchIndicator,
} as const;

interface BottomNavProps {
  items: readonly NavItemData[];
  activeId: string;
  onSelect: (id: string) => void;
  /** Scroll the feed to a sub-section chosen from the contextual bloom. */
  onJumpToSection: (sectionId: string) => void;
  variant: IndicatorVariant;
  behavior: NavBehavior;
  scrollRef: React.RefObject<HTMLDivElement | null>;
}

export function BottomNav({
  items,
  activeId,
  onSelect,
  onJumpToSection,
  variant,
  behavior,
  scrollRef,
}: BottomNavProps) {
  const [bloomOpen, setBloomOpen] = useState(false);
  const bloomButtonRef = useRef<HTMLButtonElement>(null);
  const reducedMotion = useReducedMotion();
  const { direction, progress } = useNavScroll(scrollRef);

  const foundIndex = items.findIndex((item) => item.id === activeId);
  const activeIndex = foundIndex >= 0 ? foundIndex : 0;
  const bloomIndex = items.findIndex((item) => Boolean(item.sections?.length));
  const bloomItem = bloomIndex >= 0 ? items[bloomIndex] : undefined;

  const condensed = behavior !== "static" && direction === "down";
  const showProgress = behavior === "condense-progress";

  const handleActivate = (item: NavItemData) => {
    if (item.sections?.length && item.id === activeId) {
      setBloomOpen((open) => !open);
      return;
    }
    onSelect(item.id);
    setBloomOpen(false);
  };

  const handlePick = (sectionId: string) => {
    onJumpToSection(sectionId);
    setBloomOpen(false);
    bloomButtonRef.current?.focus();
  };

  const Indicator = INDICATORS[variant];

  const navItems = items.map((item) => {
    const isActive = item.id === activeId;
    const isBloomItem = item.id === bloomItem?.id;
    const showLabel = !condensed && (variant === "pill" ? isActive : true);

    return (
      <NavItem
        key={item.id}
        item={item}
        isActive={isActive}
        showLabel={showLabel}
        variant={variant}
        bloomOpen={bloomOpen && isBloomItem}
        onActivate={handleActivate}
        innerRef={isBloomItem ? bloomButtonRef : undefined}
      />
    );
  });

  return (
    <div
      className="sticky bottom-0 z-20 px-4 pt-2"
      // Clear the home-indicator gutter on devices that report a safe area.
      style={{ paddingBottom: "calc(1rem + env(safe-area-inset-bottom))" }}
    >
      <nav
        aria-label={copy.navLabel}
        className={cn(
          "relative flex items-stretch rounded-card border border-border bg-surface/80 py-1 backdrop-blur-md",
          "transition-shadow duration-300 motion-reduce:transition-none",
          condensed ? "shadow-sm" : "shadow-lg",
        )}
      >
        {showProgress && (
          <span
            aria-hidden="true"
            className="absolute inset-x-0 top-0 h-0.5 origin-left rounded-full bg-brand-500"
            style={{ transform: `scaleX(${progress})` }}
          />
        )}

        <Indicator activeIndex={activeIndex} count={items.length} reducedMotion={reducedMotion} />
        {navItems}

        {bloomItem?.sections && (
          <BloomMenu
            open={bloomOpen}
            sections={bloomItem.sections}
            anchorIndex={bloomIndex}
            count={items.length}
            reducedMotion={reducedMotion}
            onPick={handlePick}
            onClose={() => setBloomOpen(false)}
            returnFocusRef={bloomButtonRef}
          />
        )}
      </nav>
    </div>
  );
}

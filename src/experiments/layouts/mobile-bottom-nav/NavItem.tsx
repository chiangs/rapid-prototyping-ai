import { cn } from "@/lib/cn";
import { NavIcon } from "./NavIcon";
import type { IndicatorVariant, NavItemData } from "./nav-items";

const CHEVRON_PATH = "M6 15l6-6 6 6";

interface NavItemProps {
  item: NavItemData;
  isActive: boolean;
  showLabel: boolean;
  variant: IndicatorVariant;
  /** Only meaningful for the item that owns `sections`. */
  bloomOpen: boolean;
  onActivate: (item: NavItemData) => void;
  innerRef?: React.Ref<HTMLButtonElement>;
}

export function NavItem({
  item,
  isActive,
  showLabel,
  variant,
  bloomOpen,
  onActivate,
  innerRef,
}: NavItemProps) {
  const hasSections = Boolean(item.sections?.length);

  const iconLift =
    isActive && variant === "notch"
      ? "-translate-y-3"
      : isActive && variant === "pill"
        ? "-translate-y-0.5"
        : "translate-y-0";

  // Every variant's indicator (puck / blob / cradle) sits behind the icon band
  // only, so the icon always inverts to white. The label sits below that band —
  // on the puck in pill mode (white), on the bar surface otherwise (ink).
  const iconColor = isActive ? "text-white" : "text-muted group-hover:text-ink";
  const labelColor = !isActive
    ? "text-muted group-hover:text-ink"
    : variant === "pill"
      ? "text-white"
      : "text-ink";

  return (
    <button
      ref={innerRef}
      type="button"
      onClick={() => onActivate(item)}
      aria-label={item.label}
      aria-current={isActive ? "page" : undefined}
      aria-haspopup={hasSections ? "menu" : undefined}
      aria-expanded={hasSections ? bloomOpen : undefined}
      className={cn(
        "group relative z-10 flex flex-1 flex-col items-center rounded-control px-1 py-2.5 outline-none",
        "focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-brand-600",
      )}
    >
      <span className="flex h-8 items-center justify-center">
        <NavIcon
          path={item.iconPath}
          className={cn(
            "h-6 w-6 transition-[transform,color] duration-300 motion-reduce:transition-none",
            iconLift,
            iconColor,
          )}
        />
      </span>

      <span
        className={cn(
          "grid overflow-hidden text-xs font-medium leading-none transition-all duration-300 motion-reduce:transition-none",
          labelColor,
          showLabel ? "mt-1.5 grid-rows-[1fr] opacity-100" : "mt-0 grid-rows-[0fr] opacity-0",
        )}
      >
        <span className="min-h-0 overflow-hidden">{item.label}</span>
      </span>

      {hasSections && isActive && (
        <NavIcon
          path={CHEVRON_PATH}
          className={cn(
            "pointer-events-none absolute bottom-0.5 left-1/2 h-3 w-3 -translate-x-1/2 transition-transform duration-300 motion-reduce:transition-none",
            labelColor,
            bloomOpen ? "rotate-180" : "rotate-0",
          )}
        />
      )}
    </button>
  );
}

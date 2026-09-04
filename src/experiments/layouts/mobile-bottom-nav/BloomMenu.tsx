import { useEffect, useRef } from "react";
import { cn } from "@/lib/cn";
import type { NavSection } from "./nav-items";

const RADIUS = 84;
// Fan the items across an arc centered on straight-up (90°).
const ARC_START = 148;
const ARC_END = 32;

interface BloomMenuProps {
  open: boolean;
  sections: readonly NavSection[];
  /** Index + count of the owning tab, so the menu centers over its icon. */
  anchorIndex: number;
  count: number;
  reducedMotion: boolean;
  onPick: (sectionId: string) => void;
  onClose: () => void;
  returnFocusRef: React.RefObject<HTMLButtonElement | null>;
}

export function BloomMenu({
  open,
  sections,
  anchorIndex,
  count,
  reducedMotion,
  onPick,
  onClose,
  returnFocusRef,
}: BloomMenuProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const firstItemRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    firstItemRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.stopPropagation();
        returnFocusRef.current?.focus();
        onClose();
      }
    };
    const onPointerDown = (event: PointerEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) onClose();
    };

    document.addEventListener("keydown", onKeyDown, true);
    document.addEventListener("pointerdown", onPointerDown, true);
    return () => {
      document.removeEventListener("keydown", onKeyDown, true);
      document.removeEventListener("pointerdown", onPointerDown, true);
    };
  }, [open, onClose, returnFocusRef]);

  const centerPct = (anchorIndex + 0.5) * (100 / count);
  const step = sections.length > 1 ? (ARC_END - ARC_START) / (sections.length - 1) : 0;

  const items = sections.map((section, index) => {
    const angle = ((ARC_START + step * index) * Math.PI) / 180;
    const x = Math.round(Math.cos(angle) * RADIUS);
    const y = Math.round(Math.sin(angle) * RADIUS);
    const openTransform = `translate(calc(-50% + ${x}px), ${-y}px) scale(1)`;
    const closedTransform = "translate(-50%, 8px) scale(0.4)";
    const delayMs = reducedMotion ? 0 : open ? index * 40 : (sections.length - 1 - index) * 20;

    return (
      <button
        key={section.id}
        ref={index === 0 ? firstItemRef : undefined}
        type="button"
        role="menuitem"
        tabIndex={open ? 0 : -1}
        onClick={() => onPick(section.id)}
        style={{
          transform: open ? openTransform : closedTransform,
          opacity: open ? 1 : 0,
          transitionProperty: "transform, opacity",
          transitionDuration: reducedMotion ? "0ms" : "260ms",
          transitionTimingFunction: "cubic-bezier(0.34, 1.4, 0.64, 1)",
          transitionDelay: `${delayMs}ms`,
        }}
        className={cn(
          "absolute bottom-0 left-1/2 whitespace-nowrap rounded-control border border-border bg-surface px-3 py-1.5",
          "text-xs font-medium text-ink shadow-md outline-none",
          "hover:border-brand-500 hover:text-brand-700",
          "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600",
        )}
      >
        {section.label}
      </button>
    );
  });

  return (
    <div
      ref={containerRef}
      role="menu"
      aria-label="Jump to section"
      aria-hidden={!open}
      className={cn("absolute bottom-full h-0 w-0", open ? "pointer-events-auto" : "pointer-events-none")}
      style={{ left: `${centerPct}%` }}
    >
      {items}
    </div>
  );
}

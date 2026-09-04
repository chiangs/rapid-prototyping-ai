import { useRef, useState } from "react";
import type { ExperimentMeta } from "@/experiments/registry";
import { BottomNav } from "./BottomNav";
import { Feed } from "./Feed";
import { PhoneFrame } from "./PhoneFrame";
import type { FrameMode } from "./PhoneFrame";
import { DemoControls } from "./controls/DemoControls";
import { NAV_ITEMS } from "./nav-items";
import type { IndicatorVariant, NavBehavior } from "./nav-items";
import { useReducedMotion } from "./use-reduced-motion";

export const meta = {
  title: "Mobile bottom nav",
  description:
    "A sticky phone bottom-nav with three animated active-state treatments and a contextual-bloom tab.",
  complexity: "complex",
  tags: ["navigation", "layout", "mobile", "animation"],
} satisfies ExperimentMeta;

export default function Experiment() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeId, setActiveId] = useState<string>(NAV_ITEMS[0].id);
  const [variant, setVariant] = useState<IndicatorVariant>("pill");
  const [behavior, setBehavior] = useState<NavBehavior>("condense-progress");
  const [frameMode, setFrameMode] = useState<FrameMode>("simulated");
  const reducedMotion = useReducedMotion();

  const activeItem = NAV_ITEMS.find((item) => item.id === activeId) ?? NAV_ITEMS[0];

  const handleJumpToSection = (sectionId: string) => {
    const target = scrollRef.current?.querySelector(`#section-${sectionId}`);
    target?.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "start" });
  };

  return (
    <div>
      <DemoControls
        variant={variant}
        behavior={behavior}
        frameMode={frameMode}
        onVariantChange={setVariant}
        onBehaviorChange={setBehavior}
        onFrameModeChange={setFrameMode}
      />
      <PhoneFrame mode={frameMode} scrollRef={scrollRef}>
        <Feed activeItem={activeItem} />
        <BottomNav
          items={NAV_ITEMS}
          activeId={activeId}
          onSelect={setActiveId}
          onJumpToSection={handleJumpToSection}
          variant={variant}
          behavior={behavior}
          scrollRef={scrollRef}
        />
      </PhoneFrame>
    </div>
  );
}

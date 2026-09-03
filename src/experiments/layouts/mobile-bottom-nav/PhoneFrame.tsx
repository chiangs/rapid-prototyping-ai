import { cn } from "@/lib/cn";

// Device mock. Geometry (frame width / height / corner radius) is intentionally
// off the 4px scale, so it lives in inline styles rather than arbitrary classes.
const FRAME_WIDTH = 390;
const SCREEN_HEIGHT = 720;
const FRAME_RADIUS = 44;
const SCREEN_RADIUS = 34;

/**
 * "simulated" — fixed-size phone mock, good for reviewing the pattern on desktop.
 * "viewport"  — the screen height tracks the live (dynamic) viewport via `h-dvh`,
 *               so on a real phone you can watch the sticky bar hold position as
 *               the browser chrome collapses on scroll.
 */
export type FrameMode = "simulated" | "viewport";

interface PhoneFrameProps {
  mode: FrameMode;
  /** The scroll container — `BottomNav` sticks to the bottom of this. */
  scrollRef: React.RefObject<HTMLDivElement | null>;
  children: React.ReactNode;
}

export function PhoneFrame({ mode, scrollRef, children }: PhoneFrameProps) {
  const isSimulated = mode === "simulated";

  return (
    <div
      className={cn(
        "relative mx-auto shadow-xl",
        isSimulated ? "border-8 border-ink bg-ink" : "border border-border bg-surface",
      )}
      style={{ width: FRAME_WIDTH, borderRadius: isSimulated ? FRAME_RADIUS : 0 }}
    >
      {isSimulated && (
        <div
          aria-hidden="true"
          className="absolute left-1/2 top-1 z-10 h-5 w-24 -translate-x-1/2 rounded-full bg-ink"
        />
      )}
      <div
        ref={scrollRef}
        className={cn("relative overflow-y-auto bg-canvas", !isSimulated && "h-dvh")}
        style={isSimulated ? { height: SCREEN_HEIGHT, borderRadius: SCREEN_RADIUS } : undefined}
      >
        {children}
      </div>
    </div>
  );
}

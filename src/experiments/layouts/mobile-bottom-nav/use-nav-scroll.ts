import { useEffect, useRef, useState } from "react";

export type ScrollDirection = "up" | "down" | "idle";

interface NavScrollState {
  direction: ScrollDirection;
  /** 0 at the top, 1 when scrolled to the bottom. */
  progress: number;
}

const DELTA_THRESHOLD = 2;
const IDLE_DELAY_MS = 150;

/**
 * Tracks scroll direction + progress of a scroll container, rAF-throttled.
 * `direction` falls back to `"idle"` ~150ms after scrolling stops so the bar
 * can re-expand when the user pauses.
 */
export function useNavScroll(ref: React.RefObject<HTMLElement | null>): NavScrollState {
  const [state, setState] = useState<NavScrollState>({ direction: "idle", progress: 0 });
  const directionRef = useRef<ScrollDirection>("idle");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let lastTop = el.scrollTop;
    let raf = 0;
    let idleTimer: ReturnType<typeof setTimeout>;

    const measure = () => {
      const top = el.scrollTop;
      const max = el.scrollHeight - el.clientHeight;
      const progress = max > 0 ? Math.min(1, Math.max(0, top / max)) : 0;
      const delta = top - lastTop;

      if (Math.abs(delta) > DELTA_THRESHOLD) {
        directionRef.current = delta > 0 ? "down" : "up";
      }
      lastTop = top;
      setState({ direction: directionRef.current, progress });

      clearTimeout(idleTimer);
      idleTimer = setTimeout(() => {
        directionRef.current = "idle";
        setState((prev) => ({ ...prev, direction: "idle" }));
      }, IDLE_DELAY_MS);
    };

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(measure);
    };

    el.addEventListener("scroll", onScroll, { passive: true });
    measure();

    return () => {
      el.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
      clearTimeout(idleTimer);
    };
  }, [ref]);

  return state;
}

import { useEffect, useRef, type RefObject } from "react";
import { drawSpriteFrame, sizeCanvasToFrame } from "./sprite-frame";

// Fixed feel for the "put the glasses on to read" cue — tuned once, not controls.
/** Brief non-text moments (word gaps, nav-link gaps) that don't count as leaving the text. */
const GAP_MS = 240;
/** Human beat between the cursor settling on text and the glasses starting to go on. */
const REACTION_MS = 260;
/** Time the cursor must stay away from text before the glasses come back off. */
const RESET_MS = 1300;
/** Playback duration of the put-on gesture (frame 0 → last). */
const ON_MS = 720;
/** Playback duration of the take-off gesture (last → frame 0); a touch quicker. */
const OFF_MS = 600;

/** Tags whose rendered content reads as "text a person would put glasses on for". */
const TEXT_TAGS = new Set([
  "A",
  "BUTTON",
  "P",
  "H1",
  "H2",
  "H3",
  "H4",
  "H5",
  "H6",
  "LI",
  "SPAN",
  "LABEL",
  "STRONG",
  "EM",
  "SMALL",
  "B",
  "I",
  "BLOCKQUOTE",
  "FIGCAPTION",
  "SUMMARY",
  "CODE",
]);

function isOverText(x: number, y: number): boolean {
  let el = document.elementFromPoint(x, y);
  for (let depth = 0; el && depth < 4; depth += 1, el = el.parentElement) {
    if (el.closest("[data-hero-cue-ignore]")) return false;
    if (TEXT_TAGS.has(el.tagName) && (el.textContent ?? "").trim().length > 0) return true;
  }
  return false;
}

interface SpriteCueOptions {
  canvasRef: RefObject<HTMLCanvasElement | null>;
  /** The loaded sprite sheet, or null while it is still decoding. */
  image: HTMLImageElement | null;
  /** Frames 0 → `frameCount - 1` run from "off" to the fully-on pose. */
  frameCount: number;
  columns: number;
  frameWidth: number;
  frameHeight: number;
  /** False when another behaviour drives this hero — the hook does nothing. */
  active: boolean;
  /** When false, frame 0 is drawn once with no listeners or loop. */
  interactive: boolean;
}

/**
 * Plays a sprite sheet forward (frame 0 → last) after the cursor settles on real
 * text, and back to frame 0 once it has been away from text for a beat. Word gaps
 * and nav-link gaps under `GAP_MS` don't count as leaving; a `REACTION_MS` delay
 * before starting and a longer `RESET_MS` before reversing make it read like a
 * person actually reaching for their reading glasses. The rAF loop stops when the
 * pose is settled and the cursor has been off text past `RESET_MS`; a `pointermove`
 * over text restarts it.
 */
export function useSpriteCue(options: SpriteCueOptions): void {
  const { canvasRef, image, active, interactive } = options;

  const optionsRef = useRef(options);
  useEffect(() => {
    optionsRef.current = options;
  });

  useEffect(() => {
    if (!active) return;
    const canvas = canvasRef.current;
    if (!canvas || !image) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.imageSmoothingQuality = "high";

    const { frameWidth, frameHeight } = optionsRef.current;
    let progress = 0; // 0 = glasses off, 1 = fully on
    let target = 0;

    const draw = () => {
      const { frameCount, columns } = optionsRef.current;
      drawSpriteFrame({
        ctx,
        image,
        frameIndex: progress * (frameCount - 1),
        frameCount,
        columns,
        frameWidth,
        frameHeight,
      });
    };

    sizeCanvasToFrame(canvas, frameWidth, frameHeight);
    const observer = new ResizeObserver(() => {
      sizeCanvasToFrame(canvas, frameWidth, frameHeight);
      draw();
    });
    observer.observe(canvas);

    if (!optionsRef.current.interactive) {
      draw();
      return () => observer.disconnect();
    }

    let lastTextTime = -Infinity; // performance.now() of the last moment over text
    let engagedSince: number | null = null;
    let raf = 0;
    let last = 0;
    let running = false;

    const tick = (now: number) => {
      const dt = last ? Math.min(now - last, 100) : 16.667;
      last = now;

      const overText = now - lastTextTime < GAP_MS;
      if (overText) {
        if (engagedSince === null) engagedSince = now;
        if (now - engagedSince >= REACTION_MS) target = 1;
      } else {
        engagedSince = null;
        if (now - lastTextTime >= RESET_MS) target = 0;
      }

      const step = dt / (target > progress ? ON_MS : OFF_MS);
      if (progress < target) progress = Math.min(target, progress + step);
      else if (progress > target) progress = Math.max(target, progress - step);

      draw();

      const settled = progress === target && now - lastTextTime >= RESET_MS;
      if (settled) {
        running = false;
        last = 0;
      } else {
        raf = requestAnimationFrame(tick);
      }
    };

    const ensureLoop = () => {
      if (running) return;
      running = true;
      last = 0;
      raf = requestAnimationFrame(tick);
    };

    const onPointerMove = (event: PointerEvent) => {
      if (isOverText(event.clientX, event.clientY)) {
        lastTextTime = performance.now();
        ensureLoop();
      }
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      cancelAnimationFrame(raf);
    };
  }, [canvasRef, image, active, interactive]);
}

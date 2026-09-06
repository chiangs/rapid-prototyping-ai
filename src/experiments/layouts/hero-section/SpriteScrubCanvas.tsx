import { useEffect, useRef, useState } from "react";
import { useSpriteScrub } from "./use-sprite-scrub";

interface SpriteScrubCanvasProps {
  /** Grid sprite sheet: `frameCount` frames of `frameWidth`×`frameHeight`, `columns` per row. */
  sheetUrl: string;
  frameCount: number;
  columns: number;
  frameWidth: number;
  frameHeight: number;
  idleFrame: number;
  /** When false, renders the idle frame with no cursor tracking (reduced motion). */
  interactive: boolean;
  /** Describes the pictured subject for assistive tech. */
  label: string;
}

/**
 * Reusable engine: loads a grid sprite sheet and hands it to `useSpriteScrub`,
 * which scrubs frames to follow the cursor. Per-hero folders only supply the sheet
 * and its frame metadata — no per-hero animation code.
 */
export function SpriteScrubCanvas({
  sheetUrl,
  frameCount,
  columns,
  frameWidth,
  frameHeight,
  idleFrame,
  interactive,
  label,
}: SpriteScrubCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [image, setImage] = useState<HTMLImageElement | null>(null);

  useEffect(() => {
    let active = true;
    const img = new Image();
    img.decoding = "async";
    img.src = sheetUrl;
    img.onload = () => {
      if (active) setImage(img);
    };
    return () => {
      active = false;
      setImage(null);
    };
  }, [sheetUrl]);

  useSpriteScrub({
    canvasRef,
    image,
    frameCount,
    columns,
    frameWidth,
    frameHeight,
    idleFrame,
    interactive,
  });

  return (
    <canvas
      ref={canvasRef}
      role="img"
      aria-label={label}
      className="h-full w-full object-cover object-center"
    />
  );
}

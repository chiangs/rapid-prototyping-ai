# Hero section

**Intent:** A page-hero pattern where the hero image is *interactive* — the pictured character
scrubs through a sprite-sheet animation to follow the cursor, easing toward the frame under the
pointer and easing back to a resting pose when the pointer leaves. A mocked top nav sits above,
hero text below.

The frames run monotonically from "looking screen-left" through forward to "looking
screen-right", so cursor X maps straight onto the frame index. The pointer is tracked on
`window`, so the character keeps following the cursor even when it's outside the image (over the
nav, the controls, anywhere on the page); it eases back to the forward idle pose only when the
cursor leaves the window. Only the nearest whole frame is ever drawn — no blending between
frames — so there's no motion ghosting; 45 frames across the turn is enough that the stepping
isn't noticeable. The scrub feel (easing rate, sweep sensitivity) is fixed in
`use-sprite-scrub.ts`, not exposed as controls.

The hero image is pluggable: `HeroSelectControl` switches between heroes defined in `hero-data.ts`.
Only **Cat** is sprite-animated so far (`heroes/cat/` — its sprite sheet + frame metadata);
**Dusk** and **Bloom** are gradient stand-ins that will each get their own `heroes/<name>/`
folder and sheet later. The scrub engine is shared and hero-agnostic: `SpriteScrubCanvas.tsx`
(loads a sheet) + `use-sprite-scrub.ts` (cursor → frame easing on a `<canvas>` 2D context).

Live controls (`controls/`, dev-only): hero selector, nav links, headline/subheading, and image
layout.

The cat sprite sheet (`heroes/cat/cat-sprite.webp`) was cut from a 24fps source clip with FFmpeg:
the ~1.9s sub-range where the cat turns its head left→right *while keeping its gaze up* was
isolated (the fuller turn dips the gaze down-right, which read wrong for a cursor over the top
nav) — 45 native frames, no interpolation (optical-flow interpolation visibly softened the image,
and cross-fading adjacent frames ghosted the ears while turning). Frames are 880×378 in a
9-column × 5-row grid (7920×1890), encoded WebP q90 (~585 KB). A grid rather than a single row
keeps each frame near source resolution while staying under the 16383px WebP dimension limit.
Source: AI-generated clip supplied by the designer.

## Browser note

- Canvas 2D + `requestAnimationFrame` + window `pointermove` + `devicePixelRatio` backing-store
  scaling render consistently in current Chrome, Firefox, and Safari.
- **Touch / iOS Safari:** there is no hover, and `pointermove` only fires mid-drag, so on touch
  devices the hero simply rests on the idle frame — no scrub. Acceptable for this prototype; a
  production version aimed at mobile would need a different input (scroll-linked, device tilt, or
  an autoplay loop).
- The sprite sheet is a 7920×1890 grid — well under the **16383px WebP dimension limit** and
  Firefox's 32767px image cap. Its decoded size (~15 megapixels) is within the ~16 MP ceiling
  older iOS Safari applied to a single image; a substantially larger/longer animation would need
  to check that limit or split into multiple sheets.
- The canvas uses `object-cover`, so on very tall or very wide hero areas the frame is cropped
  rather than letterboxed. The clip's uniform background makes the crop invisible; a hero image
  with content near the edges would want `object-contain` instead.
- Automated in-browser verification of the scrub was blocked in this environment (the local
  security setup resets WebSocket connections to Chrome's debug port); the interaction was
  checked by code review and a static render. Confirm the feel with `npm run dev`.

## Accessibility note

The cursor-scrub interaction has no keyboard or pointer-free equivalent — it's a decorative
enhancement with no established accessible pattern, so it ships under the novel-interaction
carve-out in `docs/DESIGN.md` → Accessibility → Scope carve-outs. The accessible baseline is
intact: the canvas is `role="img"` with an `aria-label` describing the subject, it renders a
single static frame under `prefers-reduced-motion: reduce` (no tracking, no rAF, no window
listeners), the nav links keep hover + `focus-visible` states, and heading order (page `h1` →
hero `h2`) is unbroken.

## Best-practice note

- `use-sprite-scrub.ts` reads `idleFrame` through a ref (kept current by an effect) so switching
  heroes doesn't tear down and restart the rAF loop mid-frame. This is a deliberate step around
  the usual "put everything in the dependency array" guidance. Production could instead split the
  loop into a stable driver + a store subscription.
- The scrub's easing rates and sensitivity are module-level constants in `use-sprite-scrub.ts`
  rather than props/tokens — there's no motion-token infrastructure in `src/styles/index.css`,
  and they were tuned to a reference clip once. Production would lift them to props.
- `HeroVisual.tsx` maps `hero.id` to a component with an `if` rather than a lookup table, since
  there is currently one sprite hero. When a second is added, switch to a map.

## When promoting

Move the shared engine (`SpriteScrubCanvas.tsx`, `use-sprite-scrub.ts`, `use-reduced-motion.ts`)
plus `HeroSection.tsx` / `NavBar.tsx` / `NavLink.tsx` / `HeroVisual.tsx` / `HeroText.tsx` and the
per-hero `heroes/<name>/` folders into `src/dev-ready/layouts/`. Turn the scrub constants, nav
links, hero list, and text into props (the `controls/` UI stays behind). Carry the notes above
forward as comments on the affected code. Decide final hero-text placement (overlay on the image
is the more common pattern) before baking in a layout.

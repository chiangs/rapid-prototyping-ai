# Hero section

**Intent:** A page-hero pattern where the hero image is *interactive* — the pictured character
scrubs through a sprite-sheet animation to follow the cursor, easing toward the frame under the
pointer and easing back to a resting pose when the pointer leaves. A mocked top nav sits above,
hero text below.

Each hero's frames run monotonically from a "left" pose through a centre pose to a "right" pose,
so cursor X maps straight onto the frame index. The pointer is tracked on `window`, so the
character keeps following the cursor even when it's outside the image (over the nav, the
controls, anywhere on the page); it eases back to its centre idle pose only when the cursor
leaves the window. Only the nearest whole frame is ever drawn — no blending between frames — so
there's no motion ghosting; a few dozen frames across the sweep is enough that the stepping
isn't noticeable. The scrub feel (easing rate, sweep sensitivity) is fixed in
`use-sprite-scrub.ts`, not exposed as controls.

The hero image is pluggable: `HeroSelectControl` switches between heroes defined in `hero-data.ts`,
and `HeroVisual.tsx` maps each sprite hero's id to its component. **Cat** and **Frog** are
sprite-animated (`heroes/cat/`, `heroes/frog/` — each with its own sheet + frame metadata);
**Bloom** is a gradient stand-in that will get its own `heroes/<name>/` folder and sheet later.
The scrub engine is shared and hero-agnostic: `SpriteScrubCanvas.tsx` (loads a sheet) +
`use-sprite-scrub.ts` (cursor → frame easing on a `<canvas>` 2D context).

Live controls (`controls/`, dev-only): hero selector, nav links, headline/subheading, and image
layout.

**Cat sheet** (`heroes/cat/cat-sprite.webp`) — cut from a 24fps clip with FFmpeg: the ~1.9s
sub-range where the cat turns its head left→right *while keeping its gaze up* (the fuller turn
dips the gaze down-right, which read wrong for a cursor over the top nav); 45 native frames, no
interpolation (optical-flow interpolation softened the image, and cross-fading adjacent frames
ghosted the ears while turning); 880×378 in a 9×5 grid (7920×1890), WebP q90 (~585 KB). The frame
is already wide, so the canvas uses `object-cover`.

**Frog sheet** (`heroes/frog/frog-sprite.webp`) — a dance where the frog points screen-left,
raises its arms (centre), then points screen-right; 25 frames resampled from that sub-range;
1024×534 in a 5×5 grid (5120×2670), WebP q90 (~660 KB). The frog is a tall standing figure, so
the canvas uses `object-contain` with a CSS background gradient matching the clip's own
background — the letterbox is then invisible. `objectFit` and `background` are per-hero fields
on the sprite metadata.

Both clips are AI-generated, supplied by the designer.

## Browser note

- Canvas 2D + `requestAnimationFrame` + window `pointermove` + `devicePixelRatio` backing-store
  scaling render consistently in current Chrome, Firefox, and Safari.
- **Touch / iOS Safari:** there is no hover, and `pointermove` only fires mid-drag, so on touch
  devices the hero simply rests on the idle frame — no scrub. Acceptable for this prototype; a
  production version aimed at mobile would need a different input (scroll-linked, device tilt, or
  an autoplay loop).
- Each sprite sheet (cat 7920×1890, frog 5120×2670) is well under the **16383px WebP dimension
  limit** and Firefox's 32767px image cap. Decoded sizes (~15 MP / ~14 MP) are within the ~16 MP
  ceiling older iOS Safari applied to a single image; a substantially larger/longer animation
  would need to check that limit or split into multiple sheets.
- `object-cover` (cat) crops the frame on very tall/wide hero areas; `object-contain` (frog)
  letterboxes it. The frog's letterbox is filled by a CSS `background` gradient that matches the
  clip's own background, so it reads as full-bleed at any hero aspect.
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
- Adding a sprite hero: create `heroes/<name>/` with a `<name>-sprite.ts` (metadata + `?url`
  import of the sheet) and a thin `<Name>Hero.tsx`, then add one line to `SPRITE_HEROES` in
  `HeroVisual.tsx` and flip the hero's `kind` to `"sprite"` in `hero-data.ts`. No engine changes.

## When promoting

Move the shared engine (`SpriteScrubCanvas.tsx`, `use-sprite-scrub.ts`, `use-reduced-motion.ts`)
plus `HeroSection.tsx` / `NavBar.tsx` / `NavLink.tsx` / `HeroVisual.tsx` / `HeroText.tsx` and the
per-hero `heroes/<name>/` folders into `src/dev-ready/layouts/`. Turn the scrub constants, nav
links, hero list, and text into props (the `controls/` UI stays behind). Carry the notes above
forward as comments on the affected code. Decide final hero-text placement (overlay on the image
is the more common pattern) before baking in a layout.

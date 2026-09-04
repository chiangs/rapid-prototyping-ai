# Mobile bottom nav

**Intent:** Explore an expressive — not boring — bottom navigation bar for a phone layout that
stays pinned when the page scrolls and clearly signals the active tab.

## What's here

- **Sticky bar.** `BottomNav` renders inside the phone's scroll container as `sticky bottom-0`,
  so it rests at the bottom on short pages and pins while scrolling long ones — no JS for the pin.
- **Three active-state treatments** (`variant` prop), switchable live:
  - `pill` — a puck springs between tabs; the active label expands open.
  - `goo` — an SVG goo filter fuses two blobs into a stretching metaball as it travels.
  - `notch` — a raised cradle slides under the active tab so its icon lifts out of the bar.
- **Three scroll behaviors** (`behavior` prop): `static`, `condense` (labels collapse on
  scroll-down), `condense-progress` (adds a scroll-progress hairline on the bar's top edge).
- **Contextual bloom.** The **Explore** tab carries `sections`. Tapping it while it is already
  active fans its sub-sections out in an arc (`BloomMenu`); picking one smooth-scrolls the feed
  to that section. Dismiss with `Escape`, an outside tap, or selecting an item.
- Respects `prefers-reduced-motion` (via `use-reduced-motion.ts`): travel/stagger animations
  are skipped and section jumps are instant.
- **Frame mode** (`PhoneFrame` `mode` prop / "Frame" control): `simulated` is a fixed-size mock;
  `viewport` sizes the screen with `h-dvh` so you can feel the dynamic-viewport behavior on a
  real phone (URL bar collapsing on scroll) without the sticky bar drifting.

## Viewport / dynamic viewport height

`PhoneFrame` is a mock, so it uses a fixed pixel height in `simulated` mode — `dvh` there would
wrongly track the reviewer's browser. `viewport` mode switches the scroll container to `h-dvh`
to preview real-device behavior. The bar itself already pads for the home indicator with
`padding-bottom: calc(1rem + env(safe-area-inset-bottom))` (`BottomNav.tsx`).

## Layout of the folder

`Experiment.tsx` owns state + the phone mock. `PhoneFrame` is the device/scroll container.
`Feed` / `FeedCard` / `feed-content.ts` are throwaway scroll filler. `nav-items.ts` holds the
shared types + tab data. `controls/` is demo chrome only.

## Promoting

Move `BottomNav` (+ `NavItem`, `NavIcon`, `BloomMenu`, the three indicators, the two hooks) into
`src/dev-ready/layouts/` as a props-driven component: caller supplies `items` (with optional
`sections`), owns `activeId`, and handles `onJumpToSection`. Delete `controls/`, `PhoneFrame`,
`Feed*`, and `feed-content.ts`.

For a real phone layout, the responsibility for viewport sizing sits with the **app shell**, not
this bar:

- Size the shell / scroll root with `100dvh` (or `100svh` if the bar must stay visible even when
  the browser chrome is expanded) — never `100vh`, which is too tall on mobile and hides the bar
  behind the toolbar.
- Keep `BottomNav`'s `env(safe-area-inset-bottom)` padding, and add
  `<meta name="viewport" content="... viewport-fit=cover">` so the inset resolves to a non-zero
  value.
- When the bar animates its own height on condense, transition `height` / `transform` on the bar
  only — don't let the change resize the scroll viewport, or content will jump.

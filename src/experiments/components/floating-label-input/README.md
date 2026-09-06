# floating-label-input

A single text input with a Material-style floating label: at rest the label sits inside the field
at full size; on focus (or once there's a value) it floats up, shrinks, and the field widens
slightly, with a snappy spring-like overshoot.

## Controls

- **Input type** — switch between `text`, `email`, and `password` to check the pattern holds up
  across native input affordances.
- **Border radius** — 0–56px, so the field can go from square corners to fully pill-shaped at its
  56px height.
- **Theme** — light/dark toggle, scoped to this experiment only (no app-wide dark mode exists yet,
  so this doesn't touch `src/styles/index.css`).

## Notes

- The spring feel is a hand-rolled `cubic-bezier` overshoot (no animation library, per CLAUDE.md's
  minimal-dependency rule) and respects `prefers-reduced-motion`.
- The label doubles as the input's accessible name (`htmlFor`/`id`), so there's no placeholder.

### Best-practice note

`FloatingLabelInput` and `ClearButton` take an `isDark: boolean` prop and branch every themed
class through `cn(isDark ? "..." : "...")`. That's **not** Tailwind's recommended dark-mode
pattern — it was a deliberate shortcut for this experiment, made when there was no dark-mode
infrastructure in the repo yet (see `docs/DESIGN.md` / `src/styles/index.css`, which only defines
light-mode tokens) and the goal was to keep the toggle fully local, with zero changes to shared
global files.

The trade-offs of the boolean-prop approach: it has to be threaded through every component in the
tree (prop drilling) instead of living in the CSS cascade; each themed class needs a manual
light/dark branch instead of one class list carrying both states; and it won't pick up the OS
`prefers-color-scheme` setting the way Tailwind's built-in strategy does.

**The production-correct pattern** is Tailwind's `dark:` variant, driven by a class on a shared
ancestor rather than a prop on every component:

1. In `src/styles/index.css`, declare the variant once and add dark-mode token values:
   ```css
   @custom-variant dark (&:where(.dark, .dark *));

   @theme {
     /* light tokens as today, e.g. --color-canvas, --color-ink, --color-border ... */
   }

   .dark {
     --color-canvas: #0f172a;
     --color-ink: #f8fafc;
     --color-border: rgb(255 255 255 / 0.3);
     /* ...one dark override per light token that needs to change */
   }
   ```
2. Toggle a single `.dark` class on `<html>` (e.g. via a small theme hook that reads/writes
   `localStorage` and defaults to `prefers-color-scheme`), instead of passing `isDark` down through
   props.
3. Components then use both states in one class list and drop the `isDark` prop entirely:
   ```tsx
   className="border-border text-ink dark:border-white/30 dark:text-white"
   ```

That change is out of scope here since it touches shared, global files rather than this one
experiment — flagging it so it isn't missed if this piece gets promoted to `src/dev-ready/`.

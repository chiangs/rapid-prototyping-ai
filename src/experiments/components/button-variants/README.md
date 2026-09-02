# Button variants

**Intent:** A reference for the simplest kind of experiment — one reusable component with a
typed set of options.

`Button.tsx` is a token-first button with `variant` (primary / secondary / ghost),
`size` (sm / md / lg), and a disabled state, all typed with TS unions and composed with `cn()`.
`Experiment.tsx` renders every variant × size plus the disabled state so you can eyeball them together.

If approved, `Button.tsx` is the piece to promote into `src/components/`.

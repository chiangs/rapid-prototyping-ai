# _template

The copy-me starter for a new experiment. Works for a component **or** a layout.

## Workflow

1. Decide: is your idea a **component** or a **layout**?
2. Copy this folder into `src/experiments/components/<slug>/` or
   `src/experiments/layouts/<slug>/` and rename it to your kebab-case slug.
3. Edit `Experiment.tsx`: update `meta`, then build your idea. Follow `docs/DESIGN.md`.
4. Save and open the gallery — your experiment shows up under its category at `/x/<slug>`.

See the root `README.md` for the full picture, including the promotion workflow for
experiments that get approved for further development.

`_template/` is never registered or routed — it lives outside `components/` and `layouts/`,
so the auto-discovery globs skip it. Leave it here.

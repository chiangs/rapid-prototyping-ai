# CLAUDE.md

Project memory for AI agents. Follow these conventions.

## Purpose

A **client-side-only** design prototyping sandbox. Designers clone it to rapidly prototype ideas
(simple components, complex components, full layouts / navigation flows) while directing you.

## Stack

Vite + React + TypeScript + Tailwind CSS **v4** (via `@tailwindcss/vite`) + `react-router-dom`.

- Design tokens live in `src/styles/index.css` inside an `@theme` block. There is **no**
  `tailwind.config.js` and there should not be one.
- `@/` is an alias for `src/`.
- `cn()` in `src/lib/cn.ts` merges classes (clsx + tailwind-merge).

## Experiments

- Live in `src/experiments/components/<slug>/` or `src/experiments/layouts/<slug>/`.
- Each has an `Experiment.tsx` that exports a named `meta` (`ExperimentMeta`) **and** a default
  component, plus a short `README.md` describing intent.
- They are **auto-discovered** by `src/experiments/registry.ts` via `import.meta.glob`.
  **Never hand-edit the registry** to add an experiment — just create the folder.
- `src/experiments/_template/` is the copy-me starter. Do not register or route it.
- `src/ideas/catalog.ts` backs the `/ideas` page (idea prompts for designers). In-app only — no
  matching doc. Extend the catalog there; keep each prompt ending with the "follow DESIGN.md or
  override?" question.

### Live controls

- **Before building an experiment with tunable settings** (durations, sizes, blur radii, counts,
  colors, easings, toggles…), **ask the designer which to expose as on-screen controls** and their
  range / default / step. Controls let them iterate on the feel without re-prompting you. If the
  answer is "none", skip them.
- Control components live in a **`controls/` subfolder** inside the experiment
  (`<slug>/controls/GlassControls.tsx`, …). They are scaffolding, **not** part of the piece — keeping
  them separate keeps promotion a clean folder move.
- `Experiment.tsx` owns the control state (`useState`) and passes values down to both the piece and
  the controls; the controls stay presentational (value + `onChange` props).

## Design rules

**ALWAYS follow `docs/DESIGN.md`** when generating or editing experiments: 4px spacing scale,
required hover + `focus-visible` states, non-interactive disabled states, WCAG AA contrast,
token-first styling, cross-browser rendering (current Chrome / Firefox / Safari — flag anything
uncertain for further research), simple readable code a developer can re-implement in production (no
needless abstraction, indirection, or dependencies), declarative JSX (compute all values **and conditional
renders** above the `return` — no `&&` or ternary branches in the JSX tree), one component per file
(sub-components get their own file), and `variant` / `size` / `state` prop naming.

## Styling

Prefer token utilities (`bg-brand-500`, `text-ink`, `rounded-card`, `border-border`) over hardcoded
hex/rem. Use `cn()` for conditional classes.

## Promotion

Pieces approved for further development move to `src/dev-ready/components/` or
`src/dev-ready/layouts/`, made generic and props-driven (no mock data). Keep `main` runnable at all
times. Leave `Experiment.tsx`, `controls/`, and any showcase-only backdrop/mock behind — only the
piece itself is promoted.

## Constraints

- Do **not** add servers, backends, databases, API routes, or heavy dependencies. Keep it minimal.
- Everything runs in the browser.

## Branching

- `main` is always known-good.
- One short-lived branch per exploration: `exp/<slug>`, created off `main`.
- Commit convention: `exp(<slug>): <what changed>`.
- No `develop` / `release` / `hotfix` branches.

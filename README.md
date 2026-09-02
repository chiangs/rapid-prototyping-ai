# Rapid prototyping sandbox

A client-side-only React + TypeScript playground for rapidly prototyping design ideas while directing an AI agent.

## Getting started

```bash
npm install
npm run dev
```

Then open the `localhost` URL printed in the terminal (usually http://localhost:5173).

No accounts, servers, or databases — everything runs in your browser.

## How the repo is organized

```
docs/                     Design principles + how to use them
src/
├── pages/Gallery.tsx      The index at "/" — every experiment, auto-listed
├── experiments/           EXPLORATORY / throwaway work
│   ├── _template/           Copy-me starter (component or layout)
│   ├── components/<slug>/    Component experiments (simple + complex)
│   └── layouts/<slug>/       Layout / navigation experiments
├── dev-ready/             PROMOTED, production-candidate pieces (starts empty)
│   ├── components/          Promoted shared components
│   └── layouts/             Promoted layout shells
├── lib/cn.ts             Classname helper (clsx + tailwind-merge)
└── styles/index.css      Tailwind import + design tokens (@theme)
```

**The key distinction:** `src/experiments/**` is where you explore freely and throw things away.
`src/dev-ready/**` is the promoted home for pieces approved for further development. Keep them
separate.

Each experiment lives in its own folder with an `Experiment.tsx` and a short `README.md`, and gets its
own URL: `/x/<slug>`. The gallery discovers experiments automatically — you never hand-register
anything.

## How to start an experiment

Not sure what to build? Open **`/ideas`** in the running app (the "Browse ideas" link on the
gallery) for a catalog of prompts — copy one straight to your agent, or copy a request that has the
agent draft a prompt for you to review.

1. **Decide** whether your idea is a **component** or a **layout**.
2. **Copy** `src/experiments/_template/` into `src/experiments/components/` or
   `src/experiments/layouts/`, and rename the folder to your kebab-case slug (e.g. `pricing-table`).
3. **Edit `Experiment.tsx`:** update `meta` (title, description, complexity, tags) and build your
   idea. Optionally prompt the agent, e.g.:
   > "In experiments/components/pricing-table, build a 3-tier pricing table with a monthly/annual
   > toggle — follow docs/DESIGN.md."
4. **Save and check the gallery** — it appears automatically under its category at `/x/<slug>`.

## When an experiment is approved for further development

The promotion workflow:

1. **Tidy up.** Remove dead code. Confirm it follows `docs/DESIGN.md` — tokens not hardcoded,
   hover + focus-visible states present, AA contrast.
2. **Promote the reusable piece.** Move the component into `src/dev-ready/components/` (or the layout
   into `src/dev-ready/layouts/`), making it generic and props-driven — no mock data, no demo-only
   scaffolding.
3. **Leave a thin demo behind (optional).** The experiment can import the promoted component so the
   gallery still shows it — or delete the experiment if it was throwaway.
4. **Branch + commit** on `exp/<slug>`, then open a PR against your own repo.
5. **Hand off to the developer.** Share the branch/PR. The piece now lives in `src/dev-ready/` and the
   experiment's `README.md` captures the intent, so the developer has a clean, bounded starting point.
   Point them to `docs/DESIGN.md` for the rules.

## Design tokens

The colors and radii used throughout are defined once, in `src/styles/index.css`, inside an `@theme`
block. In Tailwind v4 those tokens automatically become utility classes (`bg-brand-500`,
`text-ink`, `rounded-card`). **To match your Figma styles, edit the token values in that file** —
every component that uses the matching utility updates at once. Don't add a `tailwind.config.js`.

## Working with the AI agent

`CLAUDE.md` in the repo root teaches the agent this repo's conventions (where experiments live,
auto-discovery, token-first styling, the promotion rules). You still get better results by being
specific. Example prompts:

- "In experiments/layouts/marketing-nav, build a sticky top nav with a mobile menu — follow docs/DESIGN.md."
- "Make the filterable-card-grid experiment also filter by owner. Keep it self-contained."
- "Promote button-variants: move Button.tsx into src/dev-ready/components/, keep the experiment as a thin demo."

## Branching strategy

- **`main`** is always runnable and known-good — never commit broken code to it.
- Each exploration gets a short-lived branch off `main`, named **`exp/<slug>`**. Commit freely there.
- When an experiment is shareable: merge into `main` to keep it in your baseline gallery, or just
  push the `exp/<slug>` branch and share that.
- Commit convention: **`exp(<slug>): <what changed>`**.
- Promotion / handoff goes through a PR from `exp/<slug>` (see the promotion workflow above).
- Keep it low-ceremony: no `develop` / `release` / `hotfix` branches.

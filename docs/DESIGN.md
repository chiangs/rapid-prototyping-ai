# Design principles

The shared rules of the road for how prototypes should look and behave — the things Tailwind and
TypeScript won't enforce on their own. The AI agent and developers both follow these.

Design tokens (colors, radius) live in `src/styles/index.css`. This file references them by name and
never duplicates their values.

> All defaults below are **editable** — change them here (and in `src/styles/index.css` for tokens) to
> match your team's system.

## Spacing

- Use Tailwind's default **4px scale** (`p-2` = 8px, `gap-4` = 16px, `mt-6` = 24px…).
- Avoid arbitrary pixel values (`p-[13px]`). If you need a value that isn't on the scale, that's a
  signal to add a token.

## States

- Every interactive element (button, link, input, toggle) must have a visible **hover** state **and** a
  visible **`focus-visible`** state.
- Disabled elements must look non-interactive (reduced opacity, no hover response, `cursor-not-allowed`
  or `pointer-events-none`).

## Accessibility

- Meet **WCAG AA** contrast (4.5:1 for body text, 3:1 for large text and UI borders).
- Every interactive element is reachable and operable by keyboard.
- Images and icons have accessible labels (`alt`, `aria-label`); decorative icons are hidden from
  assistive tech (`aria-hidden`).

## Cross-browser compatibility

Prototypes must render and behave correctly in the current versions of **Chrome, Firefox, and
Safari** (including iOS Safari where the idea is mobile-facing). A developer re-implements this for
production — it can't lean on an effect that only works in one engine.

- Prefer widely-supported CSS and web APIs. Verify support before using anything recent or
  engine-specific (`backdrop-filter`, `:has()`, container queries, subgrid, View Transitions,
  scroll-driven animations, SVG filters, `mask`, anything `-webkit-` prefixed…).
- **Flag what you're unsure about.** If an implementation may not hold up across all three engines,
  or you worked around an engine bug, say so explicitly to the designer ("Safari doesn't support X —
  this uses a fallback / needs testing / needs further research") and record it under a **Browser
  note** heading in the experiment's `README.md`.
- When a technique is known to be uneven, add the fallback rather than assume someone will test
  every browser.

## Styling

- **Token-first:** prefer token utilities (`bg-brand-500`, `text-ink`, `rounded-card`,
  `border-border`) over hardcoded hex or rem values.
- Use `cn()` (`src/lib/cn.ts`) for conditional and merged classes — never string-concatenate
  Tailwind classes by hand.

## Keep it simple

Every prototype here gets read by a developer who will re-implement it in a production codebase.
Optimize for that reader, not for cleverness.

- Prefer the obvious approach over the clever one. Don't reach for an abstraction until the same
  thing shows up a second time.
- Keep indirection shallow — a component should read top to bottom without chasing through layers of
  wrappers, custom hooks, or helper modules to understand what it does.
- Don't add a dependency for something a few lines of plain code would do (see also `CLAUDE.md`).
- Small, single-purpose functions and components with descriptive names.

## Keep JSX declarative

Do the thinking _above_ the `return`, not inside the markup. JSX should read as structure — what
renders — not as a place where values get computed or branches get resolved.

- Compute derived strings, numbers, and flags as named `const`s in the component body, then
  interpolate them: `{emptyMessage}`, not `{active !== "All" && ` in ${active}`}` mid-tag.
- When a branch swaps whole subtrees, assign the chosen element to a `const` (e.g.
  `const body = isEmpty ? <EmptyState … /> : <ResultGrid … />`) and render `{body}` — avoid large
  `? ( … ) : ( … )` blocks sitting inline in the tree.
- **Build lists above the `return` too.** Map data to elements in a named `const`
  (`const categoryButtons = CATEGORIES.map((c) => <CategoryButton key={c} … />)`) and render
  `{categoryButtons}` — no `.map()` calls inside the JSX tree.
- Extract a repeated item into its own small component (its own file — see below) and map data onto
  it, rather than an inline arrow with a multi-line body.
- **Hoist every conditional render.** No `{flag && <X />}` and no `{cond ? … : …}` in the JSX tree —
  compute the element (or `null`) as a named `const` above the `return`
  (`const clearButton = query ? <ClearButton … /> : null`) and render `{clearButton}`.
- Still fine inline: plain interpolation like `{project.name}`.

## Component files

- **One component per file.** Every sub-component gets its own file named after it
  (`ProjectCard.tsx`), not a nested `function ProjectCard()` further down the parent file.
- The entry file (`Experiment.tsx`, or a promoted component) keeps only its own top-level component
  plus that component's data, state, and layout — then imports the pieces.
- Non-component shared values (types, constant lists, helpers) go in a plain `.ts` file
  (`categories.ts`), not exported alongside a component — that keeps Fast Refresh working.
- Co-locate: sub-component files live in the same folder as the experiment (or beside the promoted
  component), so the whole unit moves together during promotion.
- **Dev-only controls** (sliders / toggles for tuning settings live) are the exception: put them in a
  `controls/` subfolder of the experiment so they are *not* promoted with the piece. Ask the designer
  which settings deserve a control — and its range / default — before building them.

## Copy

- No user-facing text as bare string literals in JSX. Labels, placeholders, headings, button text,
  empty/error messages, and `aria-label`s all become named constants.
- Put them in a `const copy = { … }` object at the top of the file, right below the imports —
  **not** a separate `copy.ts` module. Reference as `{copy.filterLabel}`. A sub-component file keeps
  its own `copy` block for the text it renders.
- For text with runtime values, use a function entry: `noMatches: (q: string) => \`No matches for “${q}”.\``.
- This keeps a file's wording in one glance-able place, makes a copy review a top-of-file edit, and
  keeps the JSX about structure.
- Not copy — leave these where they are: `className` strings, route paths, `key`s, and enum-like
  values (category names, variant names). `meta` title/description is registry data, not in-component
  copy.

## Naming

- Variant props use clear, consistent names: **`variant`**, **`size`**, **`state`**.
- Prop values are lowercase unions (`"primary" | "secondary" | "ghost"`), not booleans-per-variant.

## Source of truth

- Figma file: **[ADD FIGMA LINK]**
- When Figma and code disagree, update the tokens in `src/styles/index.css` first, then the components.

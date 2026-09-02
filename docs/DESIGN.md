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

## Styling

- **Token-first:** prefer token utilities (`bg-brand-500`, `text-ink`, `rounded-card`,
  `border-border`) over hardcoded hex or rem values.
- Use `cn()` (`src/lib/cn.ts`) for conditional and merged classes — never string-concatenate
  Tailwind classes by hand.

## Naming

- Variant props use clear, consistent names: **`variant`**, **`size`**, **`state`**.
- Prop values are lowercase unions (`"primary" | "secondary" | "ghost"`), not booleans-per-variant.

## Source of truth

- Figma file: **[ADD FIGMA LINK]**
- When Figma and code disagree, update the tokens in `src/styles/index.css` first, then the components.

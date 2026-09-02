# Filterable card grid

**Intent:** A reference for a more complex, stateful component that stays fully self-contained.

Demonstrates local state (`useState`), derived state (`useMemo`), composition of a control bar +
results grid, and an empty state — all from local mock data with no network calls. Presentational
pieces live in their own files (`ProjectCard.tsx`, `CategoryButton.tsx`); `Experiment.tsx` owns the
data, state, and layout.

When promoting: split the generic grid/filter logic from the mock `PROJECTS` data and move the
reusable parts into `src/dev-ready/components/`.

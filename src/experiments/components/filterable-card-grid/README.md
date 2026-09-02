# Filterable card grid

**Intent:** A reference for a more complex, stateful component that stays fully self-contained.

Demonstrates local state (`useState`), derived state (`useMemo`), composition of a control bar +
results grid, and an empty state — all from local mock data with no network calls.

When promoting: split the generic grid/filter logic from the mock `PROJECTS` data and move the
reusable parts into `src/components/`.

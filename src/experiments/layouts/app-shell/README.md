# App shell

**Intent:** A reference for a layout / navigation experiment.

A responsive application shell: sidebar nav (row on mobile, column on `md+`), a top header with a
primary action, and a content region. Nav clicks swap the content shown — the pattern to evaluate
before committing to it across real screens.

When promoting: move the shell into `src/layouts/` as a props/children-driven component (pass in the
nav items and render `children` for the content region).

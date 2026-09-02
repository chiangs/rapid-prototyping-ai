// ─────────────────────────────────────────────────────────────────────────────
// COPY-ME STARTER
//
// 1. Copy this whole `_template/` folder into either
//      src/experiments/components/<your-slug>/   (a component idea)
//    or
//      src/experiments/layouts/<your-slug>/      (a layout / navigation idea)
//    Use a kebab-case folder name — it becomes the URL: /x/<your-slug>.
//
// 2. Update `meta` below (title, description, complexity, tags).
//
// 3. Build your idea inside the default component. Follow docs/DESIGN.md:
//    token utilities (bg-brand-500, rounded-card…), visible hover + focus-visible
//    states, AA contrast, and `cn()` for conditional classes.
//
// 4. Save. It appears in the gallery automatically — no registry edits.
//
// This `_template/` folder itself is NOT registered or routed (it lives outside
// components/ and layouts/), so leave it here for the next person.
// ─────────────────────────────────────────────────────────────────────────────

import type { ExperimentMeta } from "@/experiments/registry";

export const meta = {
  title: "Untitled experiment",
  description: "Describe in one sentence what this experiment explores.",
  complexity: "simple", // "simple" | "complex"
  tags: [],
} satisfies ExperimentMeta;

export default function Experiment() {
  return (
    <div className="flex min-h-64 items-center justify-center rounded-card border border-dashed border-border text-sm text-muted">
      Start building here.
    </div>
  );
}

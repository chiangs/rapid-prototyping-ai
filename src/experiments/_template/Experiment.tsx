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
//    states, AA contrast, `cn()` for conditional classes, values computed above
//    the return, one component per file, and user-facing text in the `copy` block.
//    Keep it working in current Chrome, Firefox, and Safari — flag anything you're
//    unsure will hold up across all three (see docs/DESIGN.md "Browser note").
//
// 4. If the idea has settings worth tuning live (durations, sizes, blur, counts,
//    colors, easings, toggles…), ASK THE DESIGNER which to expose as on-screen
//    controls and their range / default. Put control components in a `controls/`
//    subfolder — they're scaffolding, not part of what gets promoted — and drive
//    them from `useState` here in Experiment.tsx.
//
// 5. Save. It appears in the gallery automatically — no registry edits.
//
// This `_template/` folder itself is NOT registered or routed (it lives outside
// components/ and layouts/), so leave it here for the next person.
//
// OR have agent reference this in context when making new experiments.
// ─────────────────────────────────────────────────────────────────────────────

import type { ExperimentMeta } from "@/experiments/registry";

// All user-facing text for this experiment, in one place.
const copy = {
  placeholder: "Start building here.",
} as const;

export const meta = {
  title: "Untitled experiment",
  description: "Describe in one sentence what this experiment explores.",
  complexity: "simple", // "simple" | "complex"
  tags: [],
  // promoted: true, // set this if this file is a thin demo left behind after promotion
} satisfies ExperimentMeta;

export default function Experiment() {
  return (
    <div className="flex min-h-64 items-center justify-center rounded-card border border-dashed border-border text-sm text-muted">
      {copy.placeholder}
    </div>
  );
}

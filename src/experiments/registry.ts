import type { ComponentType } from "react";

/**
 * Metadata every experiment must export (as a named `meta`) from its
 * `Experiment.tsx`. Keep it small — it powers the gallery cards.
 */
export interface ExperimentMeta {
  /** Human title shown on the gallery card. */
  title: string;
  /** One sentence: what this experiment explores. */
  description: string;
  /** Rough scale of the idea. */
  complexity: "simple" | "complex";
  /** Free-form labels, e.g. ["design-system", "navigation"]. */
  tags: string[];
  /**
   * Set true only when this experiment is a thin demo left behind after
   * promoting its piece to `src/dev-ready/`. Shows a "promoted" badge on the
   * gallery card. Omit (or leave false) while still in progress.
   */
  promoted?: boolean;
}

/** A fully-resolved experiment record, assembled by the registry. */
export interface Experiment extends ExperimentMeta {
  /** Derived from the folder name; used in the URL as /x/<slug>. */
  slug: string;
  /** Which section of the gallery it belongs to. */
  category: "component" | "layout";
  /** The default export of the experiment's `Experiment.tsx`. */
  Component: ComponentType;
}

interface ExperimentModule {
  default?: ComponentType;
  meta?: ExperimentMeta;
}

/*
  AUTO-DISCOVERY
  --------------
  Every `Experiment.tsx` directly inside `components/<slug>/` or
  `layouts/<slug>/` is picked up automatically — designers never edit this file.
  `_template/` lives one level up (experiments/_template/) so it is not matched.
*/
const componentModules = import.meta.glob<ExperimentModule>("./components/*/Experiment.tsx", {
  eager: true,
});
const layoutModules = import.meta.glob<ExperimentModule>("./layouts/*/Experiment.tsx", {
  eager: true,
});

function collect(
  modules: Record<string, ExperimentModule>,
  category: Experiment["category"],
): Experiment[] {
  return Object.entries(modules).flatMap(([path, mod]) => {
    const slug = path.match(/\/([^/]+)\/Experiment\.tsx$/)?.[1];

    if (!slug || !mod.default || !mod.meta) {
      console.warn(
        `[registry] Skipping "${path}": an experiment must export a default component and a named \`meta\`.`,
      );
      return [];
    }

    return [{ ...mod.meta, slug, category, Component: mod.default }];
  });
}

/** Sort order for the complexity pill: simple ideas surface first within a category. */
const complexityOrder: Record<Experiment["complexity"], number> = {
  simple: 0,
  complex: 1,
};

export const experiments: Experiment[] = [
  ...collect(componentModules, "component"),
  ...collect(layoutModules, "layout"),
].sort(
  (a, b) =>
    a.category.localeCompare(b.category) ||
    complexityOrder[a.complexity] - complexityOrder[b.complexity] ||
    a.title.localeCompare(b.title),
);

/** Look up a single experiment by its slug (used by the /x/:slug route). */
export function getExperiment(slug: string | undefined): Experiment | undefined {
  return experiments.find((e) => e.slug === slug);
}

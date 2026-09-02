import { useMemo, useState } from "react";
import type { ExperimentMeta } from "@/experiments/registry";
import { CATEGORIES, type Filter } from "./categories";
import { CategoryButton } from "./CategoryButton";
import { ProjectCard, type Project } from "./ProjectCard";

// All user-facing text for this experiment, in one place.
const copy = {
  filterLabel: "Filter projects",
  searchPlaceholder: "Search by name or description",
  categoryGroupLabel: "Filter by category",
  noMatches: (query: string, scope: string) => `No projects match “${query}”${scope}.`,
  inScope: (category: string) => ` in ${category}`,
} as const;

export const meta = {
  title: "Filterable card grid",
  description: "A card grid with a text filter and a category toggle, driven by local mock data.",
  complexity: "complex",
  tags: ["patterns", "state"],
} satisfies ExperimentMeta;

// Self-contained mock data — no network, no backend.
const PROJECTS: Project[] = [
  { name: "Onboarding audit", category: "Research", blurb: "Diary study of first-run friction." },
  { name: "Design tokens v2", category: "Design", blurb: "Refresh the color and spacing scales." },
  { name: "Nav redesign", category: "Design", blurb: "Explore a collapsible sidebar pattern." },
  { name: "Search latency", category: "Engineering", blurb: "Profile and cache slow queries." },
  { name: "Pricing test", category: "Research", blurb: "A/B two plan-comparison layouts." },
  { name: "Component library", category: "Engineering", blurb: "Ship the promoted button + card." },
];

export default function Experiment() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<Filter>("All");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return PROJECTS.filter((project) => {
      const matchesCategory = activeCategory === "All" || project.category === activeCategory;
      const matchesQuery =
        q === "" ||
        project.name.toLowerCase().includes(q) ||
        project.blurb.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [query, activeCategory]);

  // Derive everything the JSX needs here, so the return stays declarative.
  const scopeNote = activeCategory === "All" ? "" : copy.inScope(activeCategory);
  const emptyMessage = copy.noMatches(query, scopeNote);

  const categoryButtons = CATEGORIES.map((category) => (
    <CategoryButton
      key={category}
      category={category}
      isActive={category === activeCategory}
      onSelect={() => setActiveCategory(category)}
    />
  ));

  const projectCards = results.map((project) => (
    <ProjectCard key={project.name} project={project} />
  ));

  const resultsView =
    results.length === 0 ? (
      <p className="rounded-card border border-dashed border-border p-8 text-center text-sm text-muted">
        {emptyMessage}
      </p>
    ) : (
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{projectCards}</ul>
    );

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <label className="flex flex-col gap-1 text-sm">
          <span className="font-medium text-ink">{copy.filterLabel}</span>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={copy.searchPlaceholder}
            className="h-10 w-full rounded-control border border-border bg-surface px-3 text-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600 sm:w-72"
          />
        </label>

        <div className="flex flex-wrap gap-2" role="group" aria-label={copy.categoryGroupLabel}>
          {categoryButtons}
        </div>
      </div>

      {resultsView}
    </div>
  );
}

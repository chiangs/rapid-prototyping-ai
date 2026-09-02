import { useMemo, useState } from "react";
import { cn } from "@/lib/cn";
import type { ExperimentMeta } from "@/experiments/registry";

export const meta = {
  title: "Filterable card grid",
  description: "A card grid with a text filter and a category toggle, driven by local mock data.",
  complexity: "complex",
  tags: ["patterns", "state"],
} satisfies ExperimentMeta;

interface Project {
  name: string;
  category: "Research" | "Design" | "Engineering";
  blurb: string;
}

// Self-contained mock data — no network, no backend.
const PROJECTS: Project[] = [
  { name: "Onboarding audit", category: "Research", blurb: "Diary study of first-run friction." },
  { name: "Design tokens v2", category: "Design", blurb: "Refresh the color and spacing scales." },
  { name: "Nav redesign", category: "Design", blurb: "Explore a collapsible sidebar pattern." },
  { name: "Search latency", category: "Engineering", blurb: "Profile and cache slow queries." },
  { name: "Pricing test", category: "Research", blurb: "A/B two plan-comparison layouts." },
  { name: "Component library", category: "Engineering", blurb: "Ship the promoted button + card." },
];

const CATEGORIES = ["All", "Research", "Design", "Engineering"] as const;
type Filter = (typeof CATEGORIES)[number];

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

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <label className="flex flex-col gap-1 text-sm">
          <span className="font-medium text-ink">Filter projects</span>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search by name or description"
            className="h-10 w-full rounded-control border border-border bg-surface px-3 text-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600 sm:w-72"
          />
        </label>

        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by category">
          {CATEGORIES.map((category) => {
            const isActive = category === activeCategory;
            return (
              <button
                key={category}
                type="button"
                aria-pressed={isActive}
                onClick={() => setActiveCategory(category)}
                className={cn(
                  "h-8 rounded-full px-3 text-sm font-medium transition-colors",
                  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600",
                  isActive
                    ? "bg-brand-500 text-white"
                    : "border border-border bg-surface text-muted hover:bg-canvas",
                )}
              >
                {category}
              </button>
            );
          })}
        </div>
      </div>

      {results.length === 0 ? (
        <p className="rounded-card border border-dashed border-border p-8 text-center text-sm text-muted">
          No projects match “{query}”{activeCategory !== "All" && ` in ${activeCategory}`}.
        </p>
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((project) => (
            <li
              key={project.name}
              className="flex flex-col gap-2 rounded-card border border-border bg-surface p-5"
            >
              <span className="text-xs font-medium text-brand-700">{project.category}</span>
              <h3 className="font-medium text-ink">{project.name}</h3>
              <p className="text-sm text-muted">{project.blurb}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

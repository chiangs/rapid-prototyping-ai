import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ideaCategories } from "@/ideas/catalog";
import { IdeaCategorySection } from "./ideas/IdeaCategorySection";
import { KindToggle, type KindFilter } from "./ideas/KindToggle";

const copy = {
  backToGallery: "← Gallery",
  title: "Experiment ideas",
  intro:
    "Starting points for prototypes. Each category leads with one ready-to-paste prompt; for the rest, copy a request that asks your agent to draft a prompt you can review and edit. Every prompt asks the agent to confirm whether it should follow docs/DESIGN.md.",
  filterLabel: "Filter ideas",
  filterPlaceholder: "Filter by title",
  noMatches: (query: string) => `No ideas match “${query}”.`,
} as const;

export default function Ideas() {
  const [query, setQuery] = useState("");
  const [kind, setKind] = useState<KindFilter>("all");

  const sections = useMemo(() => {
    const q = query.trim().toLowerCase();
    return ideaCategories
      .map((category) => ({
        category,
        ideas: category.ideas.filter((idea) => {
          const matchesKind = kind === "all" || idea.kind === kind;
          const matchesQuery = q === "" || idea.title.toLowerCase().includes(q);
          return matchesKind && matchesQuery;
        }),
      }))
      .filter((section) => section.ideas.length > 0);
  }, [query, kind]);

  const sectionViews = sections.map(({ category, ideas }) => (
    <IdeaCategorySection key={category.name} category={category} ideas={ideas} />
  ));

  const results =
    sectionViews.length > 0 ? (
      sectionViews
    ) : (
      <p className="rounded-card border border-dashed border-border p-8 text-center text-sm text-muted">
        {copy.noMatches(query)}
      </p>
    );

  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <div className="mb-6">
        <Link
          to="/"
          className="rounded-control px-2 py-1 text-sm font-medium text-brand-600 hover:bg-brand-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
        >
          {copy.backToGallery}
        </Link>
      </div>

      <header className="mb-8">
        <h1 className="text-2xl font-semibold text-ink">{copy.title}</h1>
        <p className="mt-1 max-w-2xl text-muted">{copy.intro}</p>
      </header>

      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <label className="flex flex-col gap-1 text-sm">
          <span className="font-medium text-ink">{copy.filterLabel}</span>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={copy.filterPlaceholder}
            className="h-10 w-full rounded-control border border-border bg-surface px-3 text-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600 sm:w-72"
          />
        </label>
        <KindToggle value={kind} onChange={setKind} />
      </div>

      {results}
    </div>
  );
}

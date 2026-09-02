import { Link } from "react-router-dom";
import type { Experiment } from "@/experiments/registry";
import { ComplexityBadge } from "./ComplexityBadge";

export function ExperimentCard({ experiment }: { experiment: Experiment }) {
  const tags = experiment.tags.map((tag) => (
    <li
      key={tag}
      className="rounded-full bg-canvas px-2 py-0.5 text-xs text-muted ring-1 ring-border"
    >
      {tag}
    </li>
  ));

  const tagList =
    tags.length === 0 ? null : <ul className="mt-auto flex flex-wrap gap-1.5 pt-2">{tags}</ul>;

  return (
    <li>
      <Link
        to={`/x/${experiment.slug}`}
        className="flex h-full flex-col gap-3 rounded-card border border-border bg-surface p-5 transition-colors hover:border-brand-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
      >
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-medium text-ink">{experiment.title}</h3>
          <ComplexityBadge complexity={experiment.complexity} />
        </div>
        <p className="text-sm text-muted">{experiment.description}</p>
        {tagList}
      </Link>
    </li>
  );
}

import type { Experiment } from "@/experiments/registry";
import { ExperimentCard } from "./ExperimentCard";

interface GallerySectionProps {
  title: string;
  empty: string;
  items: Experiment[];
}

export function GallerySection({ title, empty, items }: GallerySectionProps) {
  const cards = items.map((experiment) => (
    <ExperimentCard key={experiment.slug} experiment={experiment} />
  ));

  const body =
    items.length === 0 ? (
      <p className="rounded-card border border-dashed border-border p-6 text-sm text-muted">
        {empty}
      </p>
    ) : (
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{cards}</ul>
    );

  return (
    <section className="mb-12">
      <h2 className="mb-4 text-sm font-semibold tracking-wide text-muted uppercase">{title}</h2>
      {body}
    </section>
  );
}

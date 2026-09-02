import { Link } from "react-router-dom";
import { cn } from "@/lib/cn";
import { experiments, type Experiment } from "@/experiments/registry";

export default function Gallery() {
  const components = experiments.filter((e) => e.category === "component");
  const layouts = experiments.filter((e) => e.category === "layout");

  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <header className="mb-10">
        <h1 className="text-2xl font-semibold text-ink">Prototyping sandbox</h1>
        <p className="mt-1 text-muted">
          A gallery of design experiments. Each card is a self-contained idea living in{" "}
          <code className="rounded bg-brand-50 px-1 text-brand-700">src/experiments/</code>.
        </p>
      </header>

      <Section
        title="Components"
        empty="No component experiments yet — copy src/experiments/_template/ into components/."
        items={components}
      />
      <Section
        title="Layouts"
        empty="No layout experiments yet — copy src/experiments/_template/ into layouts/."
        items={layouts}
      />
    </div>
  );
}

function Section({ title, empty, items }: { title: string; empty: string; items: Experiment[] }) {
  return (
    <section className="mb-12">
      <h2 className="mb-4 text-sm font-semibold tracking-wide text-muted uppercase">{title}</h2>
      {items.length === 0 ? (
        <p className="rounded-card border border-dashed border-border p-6 text-sm text-muted">
          {empty}
        </p>
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((experiment) => (
            <li key={experiment.slug}>
              <ExperimentCard experiment={experiment} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

function ExperimentCard({ experiment }: { experiment: Experiment }) {
  return (
    <Link
      to={`/x/${experiment.slug}`}
      className="flex h-full flex-col gap-3 rounded-card border border-border bg-surface p-5 transition-colors hover:border-brand-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
    >
      <div className="flex items-start justify-between gap-2">
        <h3 className="font-medium text-ink">{experiment.title}</h3>
        <ComplexityBadge complexity={experiment.complexity} />
      </div>
      <p className="text-sm text-muted">{experiment.description}</p>
      {experiment.tags.length > 0 && (
        <ul className="mt-auto flex flex-wrap gap-1.5 pt-2">
          {experiment.tags.map((tag) => (
            <li
              key={tag}
              className="rounded-full bg-canvas px-2 py-0.5 text-xs text-muted ring-1 ring-border"
            >
              {tag}
            </li>
          ))}
        </ul>
      )}
    </Link>
  );
}

function ComplexityBadge({ complexity }: { complexity: Experiment["complexity"] }) {
  return (
    <span
      className={cn(
        "shrink-0 rounded-full px-2 py-0.5 text-xs font-medium",
        complexity === "complex"
          ? "bg-brand-500 text-white"
          : "bg-brand-50 text-brand-700 ring-1 ring-brand-100",
      )}
    >
      {complexity}
    </span>
  );
}

import { Link, Route, Routes, useParams } from "react-router-dom";
import { getExperiment } from "@/experiments/registry";
import Gallery from "@/pages/Gallery";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Gallery />} />
      <Route path="/x/:slug" element={<ExperimentRoute />} />
      <Route path="*" element={<NotFound title="Page not found" />} />
    </Routes>
  );
}

function ExperimentRoute() {
  const { slug } = useParams();
  const experiment = getExperiment(slug);

  if (!experiment) {
    return (
      <NotFound
        title="Experiment not found"
        detail={`No experiment is registered for "/x/${slug ?? ""}".`}
      />
    );
  }

  const { Component, title, description } = experiment;

  return (
    <div className="min-h-full">
      <header className="border-b border-border bg-surface">
        <div className="mx-auto flex max-w-6xl items-baseline gap-4 px-6 py-4">
          <Link
            to="/"
            className="rounded-control px-2 py-1 text-sm font-medium text-brand-600 hover:bg-brand-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
          >
            ← Gallery
          </Link>
          <div>
            <h1 className="text-lg font-semibold text-ink">{title}</h1>
            <p className="text-sm text-muted">{description}</p>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-6 py-8">
        <Component />
      </main>
    </div>
  );
}

function NotFound({ title, detail }: { title: string; detail?: string }) {
  return (
    <main className="mx-auto flex min-h-full max-w-6xl flex-col items-start justify-center gap-4 px-6 py-16">
      <div className="rounded-card border border-border bg-surface p-8">
        <h1 className="text-xl font-semibold text-ink">{title}</h1>
        {detail && <p className="mt-2 text-sm text-muted">{detail}</p>}
        <Link
          to="/"
          className="mt-6 inline-flex rounded-control bg-brand-500 px-4 py-2 text-sm font-medium text-white hover:bg-brand-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
        >
          Back to the gallery
        </Link>
      </div>
    </main>
  );
}

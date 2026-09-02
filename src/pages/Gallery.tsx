import { Link } from "react-router-dom";
import { experiments } from "@/experiments/registry";
import { GallerySection } from "./gallery/GallerySection";

// All user-facing text for this page, in one place.
const copy = {
  title: "Prototyping sandbox",
  introLead: "A gallery of design experiments. Each card is a self-contained idea living in ",
  ideasLink: "Browse ideas →",
  componentsTitle: "Components",
  componentsEmpty:
    "No component experiments yet — copy src/experiments/_template/ into components/.",
  layoutsTitle: "Layouts",
  layoutsEmpty: "No layout experiments yet — copy src/experiments/_template/ into layouts/.",
} as const;

export default function Gallery() {
  const components = experiments.filter((e) => e.category === "component");
  const layouts = experiments.filter((e) => e.category === "layout");

  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <header className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-ink">{copy.title}</h1>
          <p className="mt-1 text-muted">
            {copy.introLead}
            <code className="rounded bg-brand-50 px-1 text-brand-700">src/experiments/</code>.
          </p>
        </div>
        <Link
          to="/ideas"
          className="shrink-0 rounded-control border border-border bg-surface px-3 py-2 text-sm font-medium text-brand-700 hover:bg-brand-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
        >
          {copy.ideasLink}
        </Link>
      </header>

      <GallerySection
        title={copy.componentsTitle}
        empty={copy.componentsEmpty}
        items={components}
      />
      <GallerySection title={copy.layoutsTitle} empty={copy.layoutsEmpty} items={layouts} />
    </div>
  );
}

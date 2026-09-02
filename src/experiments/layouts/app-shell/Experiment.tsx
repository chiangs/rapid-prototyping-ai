import { useState } from "react";
import { cn } from "@/lib/cn";
import type { ExperimentMeta } from "@/experiments/registry";

export const meta = {
  title: "App shell",
  description: "A responsive shell with a sidebar nav, top header, and content region.",
  complexity: "complex",
  tags: ["navigation", "layout"],
} satisfies ExperimentMeta;

const SECTIONS = [
  { id: "overview", label: "Overview", body: "A dashboard summary would live here." },
  { id: "projects", label: "Projects", body: "A list or board of projects would live here." },
  { id: "reports", label: "Reports", body: "Charts and exports would live here." },
  { id: "settings", label: "Settings", body: "Account and workspace settings would live here." },
] as const;

type SectionId = (typeof SECTIONS)[number]["id"];

export default function Experiment() {
  const [activeId, setActiveId] = useState<SectionId>("overview");
  const active = SECTIONS.find((section) => section.id === activeId)!;

  return (
    <div className="overflow-hidden rounded-card border border-border bg-surface">
      <div className="flex min-h-[28rem] flex-col md:flex-row">
        <aside className="border-b border-border bg-canvas p-4 md:w-56 md:border-r md:border-b-0">
          <p className="px-2 pb-3 text-sm font-semibold text-ink">Acme workspace</p>
          <nav className="flex gap-1 overflow-x-auto md:flex-col">
            {SECTIONS.map((section) => {
              const isActive = section.id === activeId;
              return (
                <button
                  key={section.id}
                  type="button"
                  aria-current={isActive ? "page" : undefined}
                  onClick={() => setActiveId(section.id)}
                  className={cn(
                    "shrink-0 rounded-control px-3 py-2 text-left text-sm font-medium transition-colors",
                    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600",
                    isActive
                      ? "bg-brand-500 text-white"
                      : "text-muted hover:bg-brand-50 hover:text-brand-700",
                  )}
                >
                  {section.label}
                </button>
              );
            })}
          </nav>
        </aside>

        <div className="flex flex-1 flex-col">
          <header className="flex items-center justify-between border-b border-border px-6 py-4">
            <h2 className="font-semibold text-ink">{active.label}</h2>
            <button
              type="button"
              className="h-9 rounded-control bg-brand-500 px-4 text-sm font-medium text-white hover:bg-brand-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
            >
              New
            </button>
          </header>
          <main className="flex-1 p-6">
            <p className="text-sm text-muted">{active.body}</p>
          </main>
        </div>
      </div>
    </div>
  );
}

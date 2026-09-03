// The experiment-idea catalog shown at /ideas. In-app only — no matching doc.
// Each category leads with one worked example (has `prompt`); the rest are seeds
// the designer turns into a prompt with their agent's help via `draftRequest`.

export type IdeaKind = "component" | "layout";
export type IdeaComplexity = "simple" | "complex";

export interface Idea {
  title: string;
  kind: IdeaKind;
  complexity: IdeaComplexity;
  /** Suggested kebab-case folder name / slug. */
  slug: string;
  /** A ready-to-paste build prompt. Set on the one worked example per category. */
  prompt?: string;
}

export interface IdeaCategory {
  name: string;
  blurb: string;
  /** First entry is the worked example; the rest are seeds. */
  ideas: Idea[];
}

const folder = (kind: IdeaKind) => (kind === "component" ? "components" : "layouts");

const alignmentAsk =
  "Before you build, tell me whether this should follow docs/DESIGN.md or if it's a " +
  "special case that should override it — and why.";

const controlsAsk =
  "Also ask me which tunable settings (if any) I want as on-screen controls — sliders / " +
  "toggles for things like timing, size, spacing, counts, colors — with their range and " +
  "default, so I can iterate on the feel without re-prompting you. Put those in a `controls/` " +
  "subfolder; they are not part of the piece.";

const preBuildAsks = `${alignmentAsk}\n\n${controlsAsk}`;

/** A request the designer hands to their agent to draft a prompt they'll review and edit. */
export function draftRequest(idea: Idea): string {
  return `I want to prototype "${idea.title}" in this sandbox (see README.md and docs/DESIGN.md).

Draft an experiment prompt for me to review and edit before any code is written. Include:
- the folder: src/experiments/${folder(idea.kind)}/${idea.slug}
- what to build, and the key states and interactions
- the local mock data it needs (no network)
- the meta block: title, description, complexity "${idea.complexity}", tags

Then ask me (a) whether it should follow docs/DESIGN.md or if this is a special case that should
override it, and (b) which tunable settings, if any, I want as on-screen controls (with range and
default) so I can iterate on the feel — those go in a \`controls/\` subfolder, separate from the piece.`;
}

export const ideaCategories: IdeaCategory[] = [
  {
    name: "Design-system primitives",
    blurb: "Small, highly reusable building blocks — the prime promotion candidates.",
    ideas: [
      {
        title: "Segmented control",
        kind: "component",
        complexity: "simple",
        slug: "segmented-control",
        prompt: `In src/experiments/components/segmented-control, build a segmented control: 2–4 options with one selected, arrow-key navigation between options, and clear hover and focus-visible states. Local state only, no network. Set meta: title "Segmented control", description "A single-select segmented control with keyboard support.", complexity "simple", tags ["design-system"].

${preBuildAsks}`,
      },
      {
        title: "Input field with label, hint, error, and disabled states",
        kind: "component",
        complexity: "simple",
        slug: "input-field",
      },
      { title: "Status pill set", kind: "component", complexity: "simple", slug: "status-pills" },
      {
        title: "Avatar with initials fallback and a size scale",
        kind: "component",
        complexity: "simple",
        slug: "avatar",
      },
      {
        title: "Tooltip on hover and focus",
        kind: "component",
        complexity: "complex",
        slug: "tooltip",
      },
    ],
  },
  {
    name: "Forms & data entry",
    blurb: "Multi-field composition, validation feel, and layout under constraints.",
    ideas: [
      {
        title: "Settings form with a sticky save bar",
        kind: "component",
        complexity: "complex",
        slug: "settings-form",
        prompt: `In src/experiments/components/settings-form, build a settings form with 2–3 grouped sections (inputs, toggles, a select) and a save bar that sticks to the bottom and only enables when something changed. Track dirty state locally; no network. Set meta: title "Settings form", description "Grouped settings with a dirty-aware sticky save bar.", complexity "complex", tags ["forms", "state"].

${preBuildAsks}`,
      },
      {
        title: "Multi-step form wizard with progress",
        kind: "component",
        complexity: "complex",
        slug: "form-wizard",
      },
      {
        title: "Inline-editable field",
        kind: "component",
        complexity: "complex",
        slug: "inline-edit",
      },
      {
        title: "Combobox / autocomplete over mock data",
        kind: "component",
        complexity: "complex",
        slug: "combobox",
      },
      {
        title: "Filter panel driving a result count",
        kind: "component",
        complexity: "complex",
        slug: "filter-panel",
      },
    ],
  },
  {
    name: "Collections & data display",
    blurb: "How lists, tables, and grids behave with real-ish volume.",
    ideas: [
      {
        title: "Sortable data table",
        kind: "component",
        complexity: "complex",
        slug: "sortable-table",
        prompt: `In src/experiments/components/sortable-table, build a data table over ~12 rows of local mock data with sortable columns (click a header to toggle asc/desc), a sticky header, and row selection via checkboxes with a "select all". No network. Set meta: title "Sortable data table", description "Client-sorted table with sticky header and row selection.", complexity "complex", tags ["data", "state"].

${preBuildAsks}`,
      },
      {
        title: "Card grid with a density toggle",
        kind: "component",
        complexity: "simple",
        slug: "card-grid-density",
      },
      {
        title: "Grouped list with collapsible sections",
        kind: "component",
        complexity: "complex",
        slug: "grouped-list",
      },
      {
        title: "Kanban board with column counts",
        kind: "component",
        complexity: "complex",
        slug: "kanban-board",
      },
      {
        title: "Pagination vs. load-more vs. infinite scroll",
        kind: "component",
        complexity: "complex",
        slug: "pagination-patterns",
      },
    ],
  },
  {
    name: "Navigation & app shells",
    blurb: "Layout and routing patterns — lean on nested routes and query params.",
    ideas: [
      {
        title: "Collapsible sidebar with an icon-rail state",
        kind: "layout",
        complexity: "complex",
        slug: "collapsible-sidebar",
        prompt: `In src/experiments/layouts/collapsible-sidebar, build an app shell whose sidebar toggles between full (icon + label) and a collapsed icon-only rail, with the content region reflowing. Keep the collapsed state in local state; make it responsive (sidebar becomes a top bar under md). No network. Set meta: title "Collapsible sidebar", description "App shell with a full / icon-rail sidebar toggle.", complexity "complex", tags ["navigation", "layout"].

${preBuildAsks}`,
      },
      {
        title: "Top nav with a URL-synced tab bar",
        kind: "layout",
        complexity: "complex",
        slug: "tabbed-nav",
      },
      {
        title: "Command palette (⌘K)",
        kind: "layout",
        complexity: "complex",
        slug: "command-palette",
      },
      {
        title: "Master list + detail split view",
        kind: "layout",
        complexity: "complex",
        slug: "split-view",
      },
      {
        title: "Breadcrumb and page-header system",
        kind: "layout",
        complexity: "simple",
        slug: "page-header",
      },
    ],
  },
  {
    name: "Content & marketing pages",
    blurb: "Full-page composition, vertical rhythm, and responsive typography.",
    ideas: [
      {
        title: "Landing page (hero → features → testimonial → CTA)",
        kind: "layout",
        complexity: "complex",
        slug: "landing-page",
        prompt: `In src/experiments/layouts/landing-page, build a marketing landing page: hero (headline, subhead, CTA), a 3-up feature grid, a testimonial, and a closing CTA band. Responsive, static content, no network. Set meta: title "Landing page", description "Hero, feature grid, testimonial, and CTA sections.", complexity "complex", tags ["marketing", "layout"].

${preBuildAsks}`,
      },
      {
        title: "Pricing page with a monthly / annual toggle",
        kind: "layout",
        complexity: "complex",
        slug: "pricing-page",
      },
      {
        title: "Docs page with an in-page table of contents",
        kind: "layout",
        complexity: "complex",
        slug: "docs-page",
      },
      {
        title: "Changelog timeline",
        kind: "layout",
        complexity: "simple",
        slug: "changelog-timeline",
      },
    ],
  },
  {
    name: "Onboarding & flows",
    blurb: "Sequences that span several screens or routes.",
    ideas: [
      {
        title: "Onboarding checklist that tracks progress",
        kind: "layout",
        complexity: "complex",
        slug: "onboarding-checklist",
        prompt: `In src/experiments/layouts/onboarding-checklist, build a first-run checklist of 4–5 steps that shows progress (e.g. "2 of 5"), lets you check items off, and celebrates completion. Hold progress in local state (resets on reload). No network. Set meta: title "Onboarding checklist", description "A progress-tracking first-run checklist.", complexity "complex", tags ["onboarding", "state"].

${preBuildAsks}`,
      },
      {
        title: "Product tour with spotlight and step tooltips",
        kind: "layout",
        complexity: "complex",
        slug: "product-tour",
      },
      {
        title: "Checkout flow: cart → address → payment → confirm",
        kind: "layout",
        complexity: "complex",
        slug: "checkout-flow",
      },
      {
        title: "Auth screens: sign in, sign up, forgot password, 2FA",
        kind: "layout",
        complexity: "complex",
        slug: "auth-screens",
      },
    ],
  },
  {
    name: "Dashboards & data viz",
    blurb: "KPI layout and chart composition (follows the dataviz guidance).",
    ideas: [
      {
        title: "Analytics overview (stat tiles + sparklines + one chart)",
        kind: "layout",
        complexity: "complex",
        slug: "analytics-overview",
        prompt: `In src/experiments/layouts/analytics-overview, build an analytics dashboard: a row of 4 KPI tiles with deltas, small trend sparklines, and one larger chart, all from local mock data. No network. If you add charts, follow the dataviz guidance. Set meta: title "Analytics overview", description "KPI tiles, sparklines, and a main chart over mock data.", complexity "complex", tags ["dashboard", "data-viz"].

${preBuildAsks}`,
      },
      {
        title: "Filterable date-range dashboard header",
        kind: "component",
        complexity: "complex",
        slug: "date-range-header",
      },
      {
        title: "Activity feed beside summary cards",
        kind: "layout",
        complexity: "simple",
        slug: "activity-feed",
      },
      {
        title: "KPI tile row with deltas",
        kind: "component",
        complexity: "simple",
        slug: "kpi-tiles",
      },
    ],
  },
  {
    name: "Interaction & motion micro-studies",
    blurb: "Small, focused explorations of how something should feel.",
    ideas: [
      {
        title: "Card hover / press / focus timing study",
        kind: "component",
        complexity: "simple",
        slug: "card-interaction",
        prompt: `In src/experiments/components/card-interaction, build one card shown three ways so its hover, press, and focus-visible treatments can be compared side by side — vary elevation, border, and transition timing. No network. Set meta: title "Card interaction study", description "Compare hover / press / focus treatments on a card.", complexity "simple", tags ["motion", "states"].

${preBuildAsks}`,
      },
      {
        title: "List reorder animation (add / remove / move)",
        kind: "component",
        complexity: "complex",
        slug: "list-reorder",
      },
      {
        title: "Route transition treatment",
        kind: "layout",
        complexity: "complex",
        slug: "route-transition",
      },
      {
        title: "Scroll-driven header shrink and reveal",
        kind: "layout",
        complexity: "simple",
        slug: "scroll-header",
      },
    ],
  },
];

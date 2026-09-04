// Placeholder feed content for the phone mock. Not user-facing product copy —
// it only exists to give the scroll container something long to scroll.
export const FEED_CARDS = [
  { title: "Weekly design digest", meta: "Curated · 6 min read" },
  { title: "New in your network", meta: "3 updates" },
  { title: "Prototype: onboarding v4", meta: "Shared by Ada" },
  { title: "Comment thread resolved", meta: "12 replies" },
  { title: "Component library sync", meta: "Tokens updated" },
  { title: "Field study recap", meta: "Research · 9 min read" },
  { title: "Accessibility audit", meta: "4 issues to triage" },
  { title: "Release notes 2.14", meta: "Changelog" },
] as const;

export type FeedCardData = (typeof FEED_CARDS)[number];

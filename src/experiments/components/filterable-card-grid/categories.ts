export const CATEGORIES = ["All", "Research", "Design", "Engineering"] as const;

export type Filter = (typeof CATEGORIES)[number];

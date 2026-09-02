export interface Project {
  name: string;
  category: "Research" | "Design" | "Engineering";
  blurb: string;
}

export function ProjectCard({ project }: { project: Project }) {
  return (
    <li className="flex flex-col gap-2 rounded-card border border-border bg-surface p-5">
      <span className="text-xs font-medium text-brand-700">{project.category}</span>
      <h3 className="font-medium text-ink">{project.name}</h3>
      <p className="text-sm text-muted">{project.blurb}</p>
    </li>
  );
}

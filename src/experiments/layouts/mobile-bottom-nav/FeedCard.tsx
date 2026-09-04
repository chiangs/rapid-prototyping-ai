interface FeedCardProps {
  title: string;
  meta: string;
}

export function FeedCard({ title, meta }: FeedCardProps) {
  return (
    <article className="rounded-card border border-border bg-surface p-4">
      <div aria-hidden="true" className="mb-3 h-24 rounded-control bg-canvas" />
      <h3 className="text-sm font-semibold text-ink">{title}</h3>
      <p className="mt-1 text-xs text-muted">{meta}</p>
    </article>
  );
}

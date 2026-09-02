import type { Idea, IdeaCategory } from "@/ideas/catalog";
import { IdeaCard } from "./IdeaCard";

interface IdeaCategorySectionProps {
  category: IdeaCategory;
  ideas: Idea[];
}

export function IdeaCategorySection({ category, ideas }: IdeaCategorySectionProps) {
  const cards = ideas.map((idea) => <IdeaCard key={idea.slug} idea={idea} />);

  return (
    <section className="mb-12">
      <h2 className="text-sm font-semibold tracking-wide text-muted uppercase">{category.name}</h2>
      <p className="mt-1 mb-4 text-sm text-muted">{category.blurb}</p>
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{cards}</ul>
    </section>
  );
}

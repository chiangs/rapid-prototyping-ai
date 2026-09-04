import { FeedCard } from "./FeedCard";
import { FEED_CARDS } from "./feed-content";
import type { NavItemData } from "./nav-items";

const CARDS_PER_SECTION = 3;

interface FeedProps {
  activeItem: NavItemData;
}

export function Feed({ activeItem }: FeedProps) {
  const sections = activeItem.sections;

  const genericCards = FEED_CARDS.map((card) => (
    <FeedCard key={card.title} title={card.title} meta={card.meta} />
  ));

  const sectionBlocks = sections?.map((section, index) => {
    const start = (index * CARDS_PER_SECTION) % (FEED_CARDS.length - CARDS_PER_SECTION + 1);
    const cards = FEED_CARDS.slice(start, start + CARDS_PER_SECTION).map((card) => (
      <FeedCard key={card.title} title={card.title} meta={card.meta} />
    ));

    return (
      <section key={section.id} id={`section-${section.id}`} className="scroll-mt-4 space-y-3">
        <h2 className="text-base font-semibold text-ink">{section.label}</h2>
        {cards}
      </section>
    );
  });

  const body = sectionBlocks ?? <div className="space-y-3">{genericCards}</div>;

  return (
    <div className="space-y-6 px-4 pb-28 pt-6">
      <h1 className="text-lg font-semibold text-ink">{activeItem.label}</h1>
      <div className="space-y-8">{body}</div>
    </div>
  );
}

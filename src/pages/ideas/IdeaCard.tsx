import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";
import { draftRequest, type Idea } from "@/ideas/catalog";
import { ComplexityBadge } from "../shared/ComplexityBadge";
import { KindBadge } from "./KindBadge";

const copy = {
  readyHint: "A ready-to-paste prompt for your agent.",
  draftHint: "Copies a request asking your agent to draft a prompt for you to review and edit.",
  readyLabel: "Copy prompt",
  draftLabel: "Draft a prompt",
  copiedLabel: "Copied ✓",
  copiedAnnounce: "Prompt copied to clipboard",
} as const;

const RESET_MS = 2000;

export function IdeaCard({ idea }: { idea: Idea }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => setCopied(false), RESET_MS);
    return () => clearTimeout(timer);
  }, [copied]);

  const isReady = idea.prompt !== undefined;
  const promptText = idea.prompt ?? draftRequest(idea);
  const hint = isReady ? copy.readyHint : copy.draftHint;
  const idleLabel = isReady ? copy.readyLabel : copy.draftLabel;

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(promptText);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }

  return (
    <li className="flex h-full flex-col gap-3 rounded-card border border-border bg-surface p-5">
      <div className="flex items-start justify-between gap-2">
        <h3 className="font-medium text-ink">{idea.title}</h3>
        <div className="flex shrink-0 flex-wrap justify-end gap-1.5">
          <KindBadge kind={idea.kind} />
          <ComplexityBadge complexity={idea.complexity} />
        </div>
      </div>

      <p className="text-sm text-muted">{hint}</p>

      <button
        type="button"
        onClick={handleCopy}
        className={cn(
          "mt-auto h-9 rounded-control px-3 text-sm font-medium transition-colors",
          "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600",
          isReady
            ? "bg-brand-500 text-white hover:bg-brand-600"
            : "border border-border bg-surface text-ink hover:bg-canvas",
        )}
      >
        {copied ? copy.copiedLabel : idleLabel}
      </button>

      <span className="sr-only" role="status" aria-live="polite">
        {copied ? copy.copiedAnnounce : ""}
      </span>
    </li>
  );
}

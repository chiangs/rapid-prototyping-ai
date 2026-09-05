---
name: commit
description: Use whenever the user asks to commit changes in this repo. Always writes commit messages as Conventional Commits and always shows the suggested message for approval before committing — never commits silently.
---

# Commit

## When to use

Any time the user asks to commit — "commit this", "commit these changes", "make a
commit", `/commit`, etc.

## Steps

1. **Look at what's actually changing.** Run `git status` and `git diff` (and
   `git diff --staged` if anything's already staged) to see the real change, not just
   the file names.

2. **Check the branch.** Per `CLAUDE.md`, experiment work belongs on `exp/<slug>` and
   promotion work on `promote/<slug>` — never commit new experiment or promotion files
   while sitting on `main`. If `git branch --show-current` is `main` and the diff looks
   like new/changed experiment or promotion work, stop and flag it before committing —
   don't silently commit to `main`.

3. **Pick the commit type:**
   - Changes confined to `src/experiments/**/<slug>/` on branch `exp/<slug>` →
     `exp(<slug>): <what changed>`.
   - Changes confined to `src/dev-ready/**` on branch `promote/<slug>` →
     `promote(<slug>): <what changed>`.
   - Everything else (tooling, docs, config, root-level fixes, cross-cutting changes)
     → standard **Conventional Commits** type: `feat`, `fix`, `docs`, `refactor`,
     `style`, `perf`, `test`, `build`, `chore`, or `ci`, with an optional `(scope)`.

4. **Write the message:**
   - Summary line: `type(scope): imperative, present-tense description` (e.g. "add nav
     reorder control", not "added" or "adds"), no trailing period, ideally ≤72 chars.
   - Add a body only when the summary alone doesn't explain the *why* — wrap at ~72
     chars, one blank line after the summary.
   - Keep the required `Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>`
     trailer.

5. **Always show the suggested message before running `git commit`.** Never commit
   silently on the user's behalf — present the message (summary + body) so they can
   approve, edit, or reject it, then commit with the approved version.

## Example

```
exp(hero-section): add nav link reorder control

Up/down buttons per link row, disabled at each end of the list — no
existing reorder pattern in the repo, so this establishes one.

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
```

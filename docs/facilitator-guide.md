# Facilitator guide

This workshop is repo-centered. The deck frames the "why"; the repo is the product. Participants should be able to run every lab from the files alone.

## Before the session

- Confirm each participant can open the repo in an AI assistant that reads `AGENTS.md`.
- Have everyone read `docs/data-handling.md`. Keep the repo public-safe.
- Decide the entry mode (Guided / Context dump / Best guess) from `labs/00-kickoff.md`.

## Default flow (90 minutes)

| Time | Segment |
| --- | --- |
| 0–5 | Why this matters: what AI can do beyond chat |
| 5–15 | Workspace setup + context management (Lab 01) |
| 15–33 | Lab 1 — Find it: Tableau lineage (Lab 02) |
| 33–53 | Lab 2 — Tune it: SQL Server triage (Lab 03) |
| 53–80 | Lab 3 — Govern it: Alation remediation (Lab 04) |
| 80–90 | Verification, safeguards, next steps, Q&A (Lab 06) |

Lab 3 intentionally gets the most time (~27 min): it introduces the full agentic stack (AGENTS.md + skill + MCP + hooks/rules) and the local-diff-before-write safety pattern, which take longer to explain and run than a single prompt.

## Compressed flow (60 minutes)

| Time | Segment |
| --- | --- |
| 0–5 | Intro |
| 5–17 | Tableau lineage |
| 17–30 | SQL tuning |
| 30–50 | Alation cleanup |
| 50–60 | Verification / next steps |

## Per-lab rhythm

1. **Watch** — show the move once.
2. **Try** — participants run it in their workspace.
3. **Verify** — compare against evidence / `expected-output.md` / the checklist.
4. **Document** — produce a small artifact in `outputs/`.

## Interaction design

- One step at a time; keep visible progress.
- Offer quick-select options at decision points (the Facilitator Console mirrors this).
- Give an adaptive recommendation when the room is split (the labs include fallbacks).
- Keep the flow interruption-safe: anyone can drop to observer/pairing mode.

## What to avoid

Generic prompting, "what is an agent?" theory, too many tools at once, over-polishing the app, MCP rabbit holes, unvalidated AI docs, AI rewriting business-critical SQL without review, and any proprietary or sensitive examples.

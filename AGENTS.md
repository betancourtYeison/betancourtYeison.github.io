# AGENTS.md

Guidance for coding agents (Codex, etc.) working in this repository.

**Read [CLAUDE.md](CLAUDE.md) first** — it is the single source of truth
for this repo's architecture, content model, build/deploy flow, tech
debt, and conventions. This file only repeats the non-negotiable rules;
everything else lives there to avoid the two files drifting apart.

## Non-negotiable rules

- Stack: **Vite + React 19** + SCSS. Components are `.jsx`; plain
  modules stay `.js`. SCSS uses `@use "..." as *` (never `@import`).
- All personal/visible content lives in
  [src/portfolio.js](src/portfolio.js) — edit data there, never hardcode
  text into components/containers.
- Work happens on `develop` (feature branches → PR → `develop`).
  `master` is build output overwritten by `npm run deploy` — never edit
  it by hand.
- **Never run `npm run deploy` without explicit user confirmation** — it
  force-pushes the `dist/` build to `master`, which is public.
- Never commit `.env` (see `env.example` for the expected variables).
- Before starting improvement work, consult
  [docs/PLAN-MEJORAS.md](docs/PLAN-MEJORAS.md) and follow the agreed
  phases.
- Verify changes with `npm run build` + `npm test` (Vitest) before
  committing; format with `npm run format`.

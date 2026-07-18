# CLAUDE.md

Guidance for Claude Code when working in this repository.

## What this is

Personal portfolio site of Yeison Betancourt Solís, deployed at
`https://betancourtyeison.github.io/`. Built with **Vite + React 19** +
SCSS (migrated from Create React App in 2026-07). It is a data-driven
template (originally based on the popular "software-developer-portfolio"
template): almost all visible content lives in one config file, and
components just render that config.

## Where content lives

- [src/portfolio.js](src/portfolio.js) — **single source of truth** for
  all personal content: greeting/bio, social links, skills, education,
  work experience, projects, achievements/certifications, blogs, talks,
  podcast, contact info. Update this file (not components) when the user's
  CV/profile changes. Assets are resolved with the local `asset()` helper
  (an `import.meta.glob` over `src/assets/{images,resources,cv}`), not
  `require()`.
- [src/assets/cv/](src/assets/cv/) — the downloadable CV PDF, referenced
  from `greeting.resumeLink` in `portfolio.js`.
- [src/assets/resources/](src/assets/resources/) — certificate PDFs/images
  referenced from `achievementSection` in `portfolio.js`.
- [src/assets/images/](src/assets/images/) — company/school/certificate
  logos referenced throughout `portfolio.js`.
- [src/_globalColor.scss](src/_globalColor.scss) — global color tokens for
  light/dark themes.

When the user updates their CV, cross-check `workExperiences`,
`skillsSection`, and `greeting.subTitle` (years of experience) in
`portfolio.js` against the new CV — these tend to drift out of sync since
the CV and the site are edited independently.

## Architecture

- Components live in `.jsx` files; plain modules (`portfolio.js`,
  `utils.js`, hooks, contexts, lottie data) stay `.js`.
- [index.html](index.html) at the repo root is the Vite entry; it loads
  `src/index.jsx` (`createRoot`). `public/` holds static files copied
  as-is (favicons, manifest, robots).
- `src/App.jsx` → `src/containers/Main.jsx` composes the page: each
  section (Greeting, Skills, WorkExperience, Education, Projects,
  Achievement, Blogs, Talks, Podcast, Profile, Footer) is its own
  container under `src/containers/*`, reading its data from
  `portfolio.js`.
- Reusable presentational pieces live under `src/components/*`.
  [src/components/reveal/Reveal.jsx](src/components/reveal/Reveal.jsx)
  provides `Fade`/`Slide` scroll-reveal wrappers built on `motion`
  (framer-motion) — an in-house replacement for the abandoned
  `react-reveal`; it honors `prefers-reduced-motion`.
- Dark/light theme is handled via `src/contexts/StyleContext.js`
  (React Context) + `useLocalStorage` hook, toggled from the header.
- Font Awesome icons are loaded from a CDN `<link>` in `index.html`
  (v5.15.4) — `fontAwesomeClassname` values in `portfolio.js` must exist
  in that version. (Planned replacement: react-icons, Fase 3.)
- SCSS uses `@use "..." as *` for `_globalColor.scss` (Dart Sass modern
  module system — do not reintroduce `@import`).

## Optional data fetching — `fetch.js`

Runs automatically before `start`/`build` (see `package.json` scripts).
Controlled entirely by environment variables (see `env.example`, copy to
`.env`, never commit `.env`):

- `USE_GITHUB_DATA=true` + `GITHUB_USERNAME` + `VITE_GITHUB_TOKEN` →
  fetches profile/pinned-repos via the GitHub GraphQL API into
  `public/profile.json`.
- `MEDIUM_USERNAME` → fetches blog posts via `rss2json.com` into
  `public/blogs.json`.

Both generated JSON files are gitignored; the site falls back to
hardcoded data in `portfolio.js` if they're absent. Fetch failures warn
but never break the build.

## Build & deploy (no CI — manual, on demand)

There is **no GitHub Actions workflow** (planned: Fase 6). Deployment is
manual via the `gh-pages` npm package:

1. `npm run deploy` → runs `predeploy` (`npm run build`, which runs
   `fetch.js` then `vite build` into `dist/`).
2. `gh-pages -b master -d dist` force-pushes the `dist/` output to the
   `master` branch of this same repo.
3. GitHub Pages serves the `master` branch directly.
4. `homepage`/`base` must keep resolving to
   `https://betancourtyeison.github.io/` (Vite `base: "/"`).

Work happens on `develop`; `master` is overwritten by `npm run deploy` and
should not be edited by hand. **Never run `npm run deploy` without explicit
user confirmation** — it force-pushes to `master`, a shared/public branch.

Local dev: `npm start` (Vite dev server), `npm run preview` (serve the
production build), `npm test` (Vitest smoke test).

## Known state / tech debt (as of 2026-07)

The full modernization roadmap (redesign, CI/CD, etc.) lives in
[docs/PLAN-MEJORAS.md](docs/PLAN-MEJORAS.md) — consult it before starting
improvement work so changes follow the agreed phases. Fases 1-2 are done
(cleanup + Vite/React 19 migration); next up is Fase 3 (recruiter-focused
redesign).

- [.npmrc](.npmrc) sets `legacy-peer-deps=true` because `react-headroom`'s
  peer range stops at React 18 (it works fine on 19). Remove both the
  flag and `react-headroom` in Fase 3 (replace with CSS sticky).
- `prettier` is a major behind (2→3); `dotenv` (8→17) and `colorthief`
  (2→3) too. Low risk, bump when convenient.
- The Projects/Profile/Blogs sections fetch `profile.json`/`blogs.json`
  at runtime and log console errors when absent (expected fallback
  behavior, inherited from the template).

## Conventions

- Tests: a single Vitest smoke test ([src/App.test.jsx](src/App.test.jsx))
  that mocks `matchMedia` and `lottie-react` — don't assume meaningful
  coverage exists.
- Formatting via Prettier (`npm run format` / `npm run check-format`),
  config in `.prettierrc` (semicolons on, no trailing commas, double
  quotes). A pre-commit hook (`.pre-commit-config.yaml`) runs the local
  prettier on `js|css|json|scss`.
- Keep content edits in `portfolio.js` data-only; avoid hardcoding text
  into container/component files.

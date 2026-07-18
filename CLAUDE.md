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
- Icons come from **react-icons** (tree-shaken SVGs, no CDN): tech logos
  use Simple Icons via an `icon` key in `portfolio.js` mapped in
  [SoftwareSkill.jsx](src/components/softwareSkills/SoftwareSkill.jsx) —
  add new map entries there when adding skills. Social icons live in
  [SocialMedia.jsx](src/components/socialMedia/SocialMedia.jsx).
- Typography: **Inter Variable** self-hosted via Fontsource (imported in
  `src/index.jsx`); the header logo keeps the local Agustina font.
- The header is `position: sticky` (no library). Work experience cards
  render per-role tech chips from each experience's `stack` array —
  note `WorkExperience.jsx` whitelists the fields it passes to
  `ExperienceCard`, so new `portfolio.js` fields must be added there too.
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

1. `pnpm run deploy` → runs `predeploy` (`pnpm run build`, which runs
   `fetch.js` then `vite build` into `dist/`).
2. `gh-pages -b master -d dist` force-pushes the `dist/` output to the
   `master` branch of this same repo.
3. GitHub Pages serves the `master` branch directly.
4. `homepage`/`base` must keep resolving to
   `https://betancourtyeison.github.io/` (Vite `base: "/"`).

Work happens on `develop`; `master` is overwritten by `pnpm run deploy` and
should not be edited by hand. **Never run `pnpm run deploy` without explicit
user confirmation** — it force-pushes to `master`, a shared/public branch.

Local dev: `pnpm start` (Vite dev server), `pnpm run preview` (serve the
production build), `pnpm test` (Vitest smoke test).

Package manager is **pnpm** (pinned via `packageManager` in
`package.json`; lockfile `pnpm-lock.yaml`). Do not use npm/yarn — no
`package-lock.json` should ever be committed. pnpm-specific settings
(allowed build scripts) live in
[pnpm-workspace.yaml](pnpm-workspace.yaml).

## Known state / tech debt (as of 2026-07)

The full modernization roadmap (redesign, CI/CD, etc.) lives in
[docs/PLAN-MEJORAS.md](docs/PLAN-MEJORAS.md) — consult it before starting
improvement work so changes follow the agreed phases. Fases 1-2 are done
(cleanup + Vite/React 19 migration + pnpm). Fase 3 (recruiter-focused
redesign) is largely done: section reorder, sticky header, react-icons,
Inter, availability badge, stack chips, grouped skills. Fase 4 is done:
the theme toggle animates via the View Transitions API (circular reveal
from the toggle) — `changeTheme(origin)` in `Main.jsx` wraps the state
flip in `document.startViewTransition` + `flushSync`, with the reveal
keyframes in `src/index.css`; it falls back to an instant swap when the
API is unavailable or `prefers-reduced-motion` is set. Fase 5
(SEO/a11y/perf) is done: single `<h1>` (section headings are now `<h2>`),
JSON-LD Person + canonical + `public/sitemap.xml`/`robots.txt`, `og:image`
(`public/og-image.svg` — export to PNG for full LinkedIn/FB support),
global `:focus-visible` outline, splash skipped under reduced-motion,
`loading="lazy"` on below-the-fold images, and Lottie loaded via
`React.lazy` (lottie-web is now a separate ~80 kB gzip chunk; main bundle
294→222 kB gzip). Still pending: own favicon branding, WCAG AA contrast
audit, project screenshots. Next: Fase 6 (CI/CD via GitHub Actions).

Known heavy asset: `src/assets/resources/icesi/securityCertified.png` is
~7.7 MB and inflates the build — resize/recompress it.

- `prettier` is a major behind (2→3); `dotenv` (8→17) too. Low risk,
  bump when convenient.
- The Projects/Profile/Blogs sections fetch `profile.json`/`blogs.json`
  at runtime and log console errors when absent (expected fallback
  behavior, inherited from the template).

## Conventions

- Tests: a single Vitest smoke test ([src/App.test.jsx](src/App.test.jsx))
  that mocks `matchMedia` and `lottie-react` — don't assume meaningful
  coverage exists.
- Formatting via Prettier (`pnpm run format` / `pnpm run check-format`),
  config in `.prettierrc` (semicolons on, no trailing commas, double
  quotes). A pre-commit hook (`.pre-commit-config.yaml`) runs the local
  prettier on `js|css|json|scss`.
- Keep content edits in `portfolio.js` data-only; avoid hardcoding text
  into container/component files.

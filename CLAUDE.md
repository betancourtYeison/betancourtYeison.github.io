# CLAUDE.md

Guidance for Claude Code when working in this repository.

## What this is

Personal portfolio site of Yeison Betancourt Solís, deployed at
`https://betancourtyeison.github.io/`. Built with **Create React App
(react-scripts 5)** + React 16 + SCSS. It is a data-driven template
(originally based on the popular "software-developer-portfolio" template):
almost all visible content lives in one config file, and components just
render that config.

## Where content lives

- [src/portfolio.js](src/portfolio.js) — **single source of truth** for
  all personal content: greeting/bio, social links, skills, education,
  work experience, projects, achievements/certifications, blogs, talks,
  podcast, contact info. Update this file (not components) when the user's
  CV/profile changes.
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

- `src/App.js` → `src/containers/Main.js` composes the page: each section
  (Greeting, Skills, WorkExperience, Education, Projects, Achievement,
  Blogs, Talks, Twitter, Podcast, Profile, Footer) is its own container
  under `src/containers/*`, reading its data from `portfolio.js`.
- Reusable presentational pieces live under `src/components/*` (cards,
  buttons, header, footer, social media icons, etc.).
- Dark/light theme is handled via `src/contexts/StyleContext.js`
  (React Context) + `useLocalStorage` hook, toggled from the header.
- Font Awesome icons are loaded from a CDN `<link>` in
  `public/index.html` (v5.15.4) — `fontAwesomeClassname` values in
  `portfolio.js` must exist in that version.
- `src/serviceWorker.js` registers a CRA service worker (PWA support).

## Optional data fetching — `fetch.js`

Runs automatically before `start`/`build` (see `package.json` scripts).
Controlled entirely by environment variables (see `env.example`, copy to
`.env`, never commit `.env`):

- `USE_GITHUB_DATA=true` + `GITHUB_USERNAME` + `REACT_APP_GITHUB_TOKEN` →
  fetches profile/pinned-repos via the GitHub GraphQL API into
  `public/profile.json`.
- `MEDIUM_USERNAME` → fetches blog posts via `rss2json.com` into
  `public/blogs.json`.

Both generated JSON files are gitignored; the site falls back to
hardcoded data in `portfolio.js` if they're absent.

## Build & deploy (no CI — manual, on demand)

There is **no GitHub Actions workflow**. Deployment is manual via the
`gh-pages` npm package:

1. `npm run deploy` → runs `predeploy` (`npm run build`, which itself runs
   `fetch.js` then `react-scripts build` into `build/`).
2. `gh-pages -b master -d build` force-pushes the `build/` output to the
   `master` branch of this same repo.
3. GitHub Pages serves the `master` branch directly.
4. `homepage` in `package.json` must stay `https://betancourtyeison.github.io/`
   for asset paths to resolve correctly.

Work happens on `develop`; `master` is overwritten by `npm run deploy` and
should not be edited by hand. **Never run `npm run deploy` without explicit
user confirmation** — it force-pushes to `master`, a shared/public branch.

## Known state / tech debt (as of 2026-07)

- **CRA (react-scripts 5) is deprecated upstream.** React, react-dom, and
  react-test-renderer are pinned to 16.10.2 (current stable is 19.x). A
  migration to Vite (or Next.js) + React 19 is the main modernization
  project but is a significant breaking change — do not attempt casually;
  scope it as its own task with the user first.
- `npm audit` reports vulnerabilities almost entirely inside CRA's
  build/dev toolchain (webpack, webpack-dev-server, ws, yaml, etc.) — they
  affect the local dev server, not the static production output actually
  served on GitHub Pages. `npm audit fix` (without `--force`) is safe to
  run periodically; `--force` pulls in major/breaking upgrades and needs a
  full rebuild+smoke-test after.
- `Dockerfile` pins `node:10.16.0-alpine`, which is EOL — not used for the
  actual GitHub Pages deploy (that's just static files), but should be
  bumped or removed if still used for local containerized dev.
- Several runtime deps are several majors behind: `gh-pages` (2→6),
  `dotenv` (8→17), `colorthief` (2→3), `sass` (1.32→1.101),
  `react-twitter-embed` (3→4, and the Twitter section is currently
  disabled via `twitterDetails.display: false` anyway). Bump one at a time
  and rebuild/smoke-test — don't batch major bumps.
- `.eslintConfig` and `prettier` config are CRA defaults; `prettier` itself
  is a major behind (2→3).

## Conventions

- No test suite beyond CRA's default `App.test.js` — don't assume
  meaningful coverage exists.
- Formatting via Prettier (`npm run format` / `npm run check-format`),
  config in `.prettierrc` (no semicolons... actually semicolons on, no
  trailing commas, double quotes). A pre-commit hook
  (`.pre-commit-config.yaml`) also runs prettier on `js|css|json`.
- Keep content edits in `portfolio.js` data-only; avoid hardcoding text
  into container/component files.

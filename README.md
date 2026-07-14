# Edward Magongo — Portfolio

Personal portfolio site built with React, TypeScript, and Vite. Showcases selected works, explorations, and a journal, with scroll-driven motion and HLS video playback.

## Tech Stack

- **Vite 8** (Rolldown) — build tooling, with manual chunk splitting for `react`, `framer-motion`, and `gsap`
- **React 18** + **TypeScript** — UI and routing (`react-router-dom`)
- **Tailwind CSS** — styling
- **Framer Motion** + **GSAP** — animation
- **Lenis** — smooth scrolling
- **hls.js** (`/light` build, lazy-loaded) — HLS video streaming, with a native/MediaSource capability check to avoid the download entirely on unsupported or non-MSE browsers
- **Oxlint** — linting

## Structure

```
src/
  pages/HomePage.tsx           # top-level page composition
  projects-page/
    sections/                  # Hero, SelectedWorks, Explorations, Journal, Stats, ContactFooter
    components/                # HlsVideo, LoadingScreen, CountUp
    data/                      # profile, works, explorations, journal content
  components/Navbar.tsx
  hooks/                       # useActiveSection, useScrollToHash
  lib/                         # lenis, motion helpers
```

## Setup

**Prerequisites**: Node.js 20+ (developed on v24), npm.

```bash
git clone https://github.com/edwardmagongo/Personal-Portfolio.git
cd Personal-Portfolio
npm install
```

No environment variables or `.env` file are required — the app has no external API calls or secrets.

**Local workflow**:

```bash
npm run dev       # start dev server with HMR
npm run build     # type-check (tsc -b), then production build to dist/
npm run preview   # serve the dist/ build locally to sanity-check before deploying
npm run lint       # oxlint
```

## Deployment

Hosted on [Vercel](https://vercel.com), auto-deploying from the `main` branch of this repo.

**Project settings**:
- **Framework Preset**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install` (default)

**Behavior**:
- Every push to `main` triggers a production deployment.
- Pushes to other branches / pull requests get their own preview deployment URLs.
- `npm run build` runs `tsc -b` first, so a type error fails the Vercel build before `vite build` even starts.

**Note**: The `legacy-site` branch holds the previous static HTML/CSS/JS version of this portfolio, kept for reference — it is not deployed.

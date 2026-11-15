# Almanac
## A take-home assignment | Motu Novu | Submitted by: Alaa Twam

## Overview

Almanac, a discovery app based on date, it builds a short briefing page for that day from 4 public APIs (NASA's APOD, Wikipedia's "On This Day", Open-Meteo for the weather and Wikipedia's Page Summary.).
The selected date lives in the URL, and the user can bookmark anything he finds interesting.

## Tech stack

- **React 19** + **TypeScript** (strict)
- **Vite 7**
- **MUI v9** (`@mui/material`, `@mui/icons-material`)
- **CSS Modules**
- **React Router v7**
- **TanStack Query v5**
- **Vitest**
- **ESLint** + **Prettier**
- **Docker** (multi-stage) + **nginx**, Podman-compatible

## Run with Docker/Podman

The app is built and served as static files by nginx inside a container.

1. Build and run:


   docker compose up --build
   or, with Podman:
   podman compose up --build

2. Open http://localhost:8080


## Run locally


npm ci
npm run dev


## Scripts


npm run lint          # eslint .
npm run format        # prettier --write .
npm run format:check  # prettier --check .
npm test              # vitest run
npm run build         # tsc -b && vite build


## Project structure


src/
  api/          fetch function per source
  components/   UI components (cards, date navigator, bookmarks panel, shared bits)
  context/      bookmarks context, provider and pure reducer
  data/         static data
  hooks/        TanStack Query hooks
  pages/        route-level pages (BriefingPage, NotFoundPage)
  types/        shared TypeScript types for each API response + the Bookmark model
  utils/        helpers (date math/formatting, bookmark factories, storage, WMO codes)
  theme.ts      MUI theme: colour tokens, typography, component overrides, CSS variables
  App.tsx       
  main.tsx      
Dockerfile      
compose.yaml    
nginx.conf      static serving + SPA fallback


## Decisions

I chose the 3 required source in addition to an extra one:
**NASA APOD** provides the day's picture and text.
**Wikipedia "On This Day** provides events, births % deaths for month and day.
**Open-Meteo** provides the date's weather for a chosen city.
**Wikipedia Page Summary** shown when the user clicks "learn more" dialog so the user can see a brief without leaving the page.


For **data fetching** I used TanStack Query. Each source has a typed fetch function and a hook, so every card has its states (loading and error) independently.
Query keys encode exactly what the data depends on, which gives per-date caching so revisiting a day is instant.


For **states**, loading shows skeletons so the layout doesn't jump. Real failures show an alert with a "try again" button.

For **styling**, most of the app uses MUI with a theme so components never hard-code colors.
To meet the requirement to have a part in standard CSS, the bookmarks side panel is styled with a CSS Module.


**Tradeoffs:** I used date helpers on the built-in 'Date' and 'Intl' instead of pulling in date library: with this amount of code (lines) I can control it, also it's timezone-safe by construction since it never goes through 'toISOString'.
For bookmarks: I used Context and 'useReducer' rather than a state management library since it's a small add/remove list.
I used MUI's native date input instead of installing MUI X date picker to avoid a dependency for just one field.
I keep the selected date in the URL as the single source of the truth rather than in component state, so a date can be shared and does not get affected with refresh.
A cost I accepted: NASA key is inlined at build time and visible in the bundle (no backend allowed).
Also I pinned an older 'create-vite' template because the latest ships oxlint and a TypeScript preview while the requirements for this task asked for ESLint & stable TS.


**With more time** I might add React Testing Library component tests and let users search for a city instead from choosing from a fixed list. Also, I might add more features to the bookmarks side panel (such as filtering, search, ...)

## Enhancements

Small things I added because they make the product better to use or more robust:

- **A fourth data source** — "Learn more" on a historical entry opens a
  Wikipedia summary dialog, so you can explore it without leaving the page.
- **Fast, correct navigation** — per-date caching makes revisiting a date instant, and
  every request is cancellable (`AbortSignal`) so clicking through dates quickly never
  leaves a stale day's data on screen.
- **Clear state handling** — skeletons while loading, and a calm "no data for this date"
  message that's visibly different from a real error (which gets a "Try again" button).
- **Responsive by design** — on phones the date navigator switches to compact arrows and
  a short date, and the bookmarks panel adapts its width.

## Known limitations

- **NASA key in the bundle** — build-time inlined; I think a backend proxy (runtime config) is
  the proper fix.
- **APOD can return a placeholder** — for some dates, or on `DEMO_KEY`, the NASA API responds with its generic NASA logo instead of a
  photo. The card simply renders whatever the API returns.
- **City selection is a fixed list of six** — no geocoding / city search yet.

## Note
- I chose the word "Hodie" to be displayed on the briefing page because it's "Today" in Latin and sounds like "Howdy!" So,
- Howdy! Thank you once again for considering my application and really looking forward to discuss this task!
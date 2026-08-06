# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

MasterOnTime is a React/TypeScript frontend (Vite) for a specialist-search-and-booking platform. This repo is frontend-only; it talks to a separate Spring-style backend (local at `http://localhost:8080`, production at the Railway URL in `.env.production`).

## Commands

```
npm run dev      # start Vite dev server (http://localhost:5173)
npm run build    # tsc -b (project references) then vite build
npm run lint     # eslint .
npm run preview  # serve the production build (http://localhost:4173)
```

There is no test suite/framework configured in this project (no Jest/Vitest, no test files).

## Backend connectivity

- In dev, `vite.config.ts` proxies `/auth` and `/api` to `http://localhost:8080`, and API modules use an empty base path (`import.meta.env.DEV ? '' : ...`) so requests hit the proxy. A local backend must be running on port 8080 for API calls to work in dev.
- In production, `VITE_API_BASE` (from `.env.production`) is prefixed onto requests instead.
- Auth token is stored in `localStorage` under the key `token`. `getToken()` in `src/services/auth/authApi.ts` is the single accessor; `useUserProfile` (src/hooks) redirects to `/login` when no token is found or profile fetch fails.

## Architecture

- **Routing**: all routes are declared in `src/routes/AppRoutes.tsx` (a `BrowserRouter` + `Routes` tree), which is the sole entry mounted by `App.tsx`. `src/routes/index.tsx` and `src/index.tsx` exist but are empty/unused — don't add logic there.
- **Mixed page organization**: some pages live under `src/features/<domain>/pages/` (e.g. `specialists/pages/SpecialistsPage.tsx`, `services/pages/ServicesPage.tsx`) alongside colocated `components/` and a `services/*Api.ts` for that domain; other pages live flat under `src/pages/` (LoginPage, RegisterPage, ProfilePage, ProfilePageSetup, BookingPage, EndBookingPage). Check `AppRoutes.tsx` to see which file is actually wired to a route before editing — e.g. `src/features/booking/pages/BookingPage.tsx` is a dead stub (fully commented out); the real, routed booking page is `src/pages/BookingPage.tsx`.
- **Types**: all shared interfaces (`Specialist`, `UserProfile`, `SearchFilters`, etc.) live in one place, `src/types/index.ts`. Add new shared types there rather than inlining them per-component.
- **API layer**: each domain has a thin `*Api.ts` module using raw `fetch` (not axios, despite it being a dependency), returning typed data and swallowing/logging errors at the call site (e.g. `getSpecialists` catches and returns `[]` on failure). Follow this pattern — construct the URL from `API_BASE`, attach `Authorization: Bearer <token>` via `getToken()` when needed, and throw on `!res.ok`.
- **Backend/frontend model mismatch**: the backend's `UserProfile` doesn't carry specialist-specific fields (profession, tags, rating, etc.), so `src/utils/mapUserToSpecialist.ts` fabricates placeholder/random values (random rating/experience, hardcoded tags/category) to adapt `UserProfile` into the `Specialist` shape used by the UI. Treat these fields as temporary mock data, not real backend state.
- **Images**: static assets in `src/assets/*.png` are not imported individually; `src/utils/imageLoader.ts` uses `import.meta.glob` to build a `imageMap[filename] -> url` lookup, used everywhere as `imageMap['some-file-name']` (no extension).
- **Styling**: SCSS Modules per component/page (`X.module.scss` next to `X.tsx`), plus shared `src/styles/variables.scss` / `global.scss` and top-level `src/index.scss`. Class names are accessed via the imported `styles` object, never global class strings.
- **Shared UI**: generic components (`Button`, `Input`, `Loader`, `EditModal`, `Header`/`Footer`) live in `src/components/`; domain-specific components live under the relevant `src/features/<domain>/components/`.

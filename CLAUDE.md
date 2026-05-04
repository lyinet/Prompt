# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

`prompt-manager` — a Next.js 15 (App Router) + React 19 application for managing AI prompts (text / image / video categories) with a small admin UI and an article system. Persistence is Prisma against a local SQLite file (`prisma/dev.db`).

## Common commands

```bash
npm run dev          # start Next.js dev server (http://localhost:3000)
npm run build        # production build
npm start            # serve production build
npm run lint         # eslint via eslint-config-next

npm run db:push      # apply prisma/schema.prisma to the SQLite db (no migrations folder)
npm run db:seed      # tsx prisma/seed.ts — creates 3 default categories + 1 example prompt
npm run db:init      # db:push followed by db:seed (the canonical first-run setup)
```

There is no test runner configured. The README mentions `./start.sh`, but that script is **not** in the repo — ignore that section.

`DATABASE_URL` is loaded from `.env` and points to `file:./dev.db` (resolved relative to `prisma/`).

## Architecture

### Routing layout (Next.js App Router under `src/app`)
- `/` (`page.tsx`) — landing page
- `/prompts`, `/prompts/[id]` — public prompt browsing
- `/admin`, `/admin/prompts/new` — authoring UI (no auth gate exists)
- `/api/prompts` (GET list with `category` / `type` / `search` query params, POST create)
- `/api/prompts/[id]` (GET / PUT / DELETE)
- `/api/categories` (GET only — categories are seeded, no create endpoint)
- `/api/upload` (POST multipart file → writes into `public/uploads/`)

The `src/components` and `src/types` directories exist but are currently empty; page components keep their JSX inline.

### Data layer
- `src/lib/prisma.ts` exposes a singleton `PrismaClient` cached on `globalThis` to avoid exhausting connections during HMR. **Always import `prisma` from `@/lib/prisma`** rather than instantiating new clients (the seed script is the one intentional exception because it runs as a standalone process).
- Models in `prisma/schema.prisma`:
  - `Category` (unique `slug`, `type` is one of `text` / `image` / `video`) → has many `Prompt`
  - `Prompt` belongs to `Category` (cascade delete), has `images: String[]` and `tags: String[]`
  - `Article` is independent (slug-addressable, `published` flag)
- Search in `GET /api/prompts` uses `contains` without `mode: 'insensitive'` (SQLite collation is case-insensitive for ASCII by default but byte-comparison for non-ASCII — keep this in mind when tweaking search).

### Schema / datasource mismatch (important)
`schema.prisma` declares `provider = "sqlite"` but uses `String[]` scalar list fields on `Prompt.images` and `Prompt.tags`. Prisma scalar lists are only supported on PostgreSQL / MySQL / CockroachDB — `prisma db push` against SQLite will reject this schema. If you hit that error, the fix is one of:
- switch the datasource to `postgresql` (and update `DATABASE_URL`), or
- change `images` / `tags` to `String` and serialize JSON at the application layer.
Do not silently change the schema without confirming the intended target database.

### File uploads
`POST /api/upload` writes uploaded files directly to `public/uploads/` via `fs/promises.writeFile` and returns `/uploads/<timestamp>-<filename>`. This works locally but **breaks on serverless deploys (Vercel, Netlify Functions) where the filesystem is read-only** — any deploy work needs to swap this for object storage.

### Conventions
- Path alias `@/*` → `src/*` (configured in `tsconfig.json`).
- Strict TypeScript is on; `target` is `ES2017`, `module` is `esnext`.
- Tailwind CSS v3 + PostCSS; global styles in `src/app/globals.css`.
- UI text and error messages throughout the codebase are in Simplified Chinese — match that tone when adding user-facing strings.
- Server actions are not used; mutations go through `/api/*` route handlers and `fetch` from client components.

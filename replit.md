# Leo Software

A point-of-sale (POS) marketing site and design system for Leo Software — a platform serving restaurants, shops, warehouses, and many other businesses.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 5000)
- `pnpm --filter @workspace/leo-software run dev` — design system preview (port 22898)
- `pnpm --filter @workspace/mockup-sandbox run dev` — mockup canvas sandbox
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)
- Design system: `@workspace/leo-software` (DTCG tokens, shadcn components, Tailwind v4)
- Mockup canvas: `@workspace/mockup-sandbox` (Vite, React, Tailwind)

## Where things live

- `artifacts/leo-software/` — Leo Software Design System (Warm Operator theme)
- `artifacts/leo-software/tokens.json` — single source of truth for all design tokens
- `artifacts/mockup-sandbox/src/ds/leo-software/mockups/` — landing page design variants
- `lib/api-spec/openapi.yaml` — API contract source of truth

## Architecture decisions

- Design-system-first: all UI tokens live in `tokens.json`; consuming apps never copy values, they import from `@workspace/leo-software`.
- Warm Operator palette: dark charcoal (#1C1917) backgrounds, amber (#F59E0B / #D97706) primary actions, stone neutrals.
- Mockup sandbox uses a per-DS entry at `src/ds/leo-software/` so designs render with the Leo Software theme.

## Product

Leo Software is a universal POS platform for restaurants, retail shops, warehouses, and other businesses. The landing site covers: product overview, features, industry verticals, pricing, and how it works.

## User preferences

- Keep the Leo Software website frontend-only for now; do not add backend, API, database, authentication, or form-submission functionality until requested.

## Gotchas

- Never hand-edit `artifacts/leo-software/src/index.css` or `src/generated/tokens.tsx` — these are generated from `tokens.json`.
- Run `pnpm --filter @workspace/leo-software tokens` (or let the dev server) to regenerate after token changes.
- Mockup sandbox DS entry URLs use hash routing: `/__mockup/src/ds/leo-software/#/ComponentName`

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
- See `artifacts/leo-software/docs/AGENTS.md` for design system consumption rules

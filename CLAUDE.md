# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Development
bun run dev              # Start all apps (web + server + infra)
bun run dev:web          # Start web only (port 3001)
bun run dev:server       # Start server only (port 3000)

# Build & Type Check
bun run build            # Build all apps
bun run check-types      # Type check all apps

# Database
bun run db:push          # Push schema changes to D1
bun run db:generate      # Generate migrations

# Lint & Format
bun run check            # Biome lint and format (auto-fix)

# Deployment (Cloudflare via Alchemy)
bun run deploy           # Deploy to Cloudflare
bun run destroy          # Destroy Cloudflare resources
```

## Architecture

Turborepo monorepo with Bun, deploying to Cloudflare Workers.

```
apps/
  web/           # React + TanStack Router + Vite + PWA
  server/        # Hono + oRPC API server

packages/
  api/           # oRPC router definitions and procedures
  db/            # Drizzle ORM schema (D1/SQLite)
  env/           # Zod-validated environment variables
  infra/         # Alchemy IaC for Cloudflare
```

### Data Flow

1. **Web → Server**: `apps/web/src/utils/orpc.ts` creates type-safe client from `packages/api`
2. **Server Routing**: `apps/server/src/index.ts` mounts oRPC handlers on `/rpc` and OpenAPI on `/api-reference`
3. **API Layer**: `packages/api/src/routers/` defines procedures using `publicProcedure` from `packages/api/src/index.ts`
4. **Database**: Procedures use `packages/db` which wraps Drizzle with D1 binding

### Key Patterns

- **oRPC procedures**: Define in `packages/api/src/routers/`, export from router object
- **DB schema**: Define tables in `packages/db/src/schema/index.ts`
- **Routes**: File-based routing in `apps/web/src/routes/` (TanStack Router)
- **Components**: `apps/web/src/components/ui/` for shadcn/ui components

### Environment Variables

- `apps/web/.env`: `VITE_SERVER_URL`
- `apps/server/.env`: `CORS_ORIGIN`, `DB` (D1 binding)
- Validated via `packages/env/src/web.ts` and `packages/env/src/server.ts`

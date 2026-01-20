.PHONY: dev dev-web dev-server build check deploy destroy clean help

# Development
dev:
	bun run dev

dev-web:
	bun run dev:web

dev-server:
	bun run dev:server

# Build & Check
build:
	bun run build

check:
	bun run check

check-types:
	bun run check-types

# Database
db-push:
	bun run db:push

db-generate:
	bun run db:generate

# Deployment
deploy: check build
	bun run deploy

deploy-quick:
	bun run deploy

destroy:
	bun run destroy

# Utilities
clean:
	rm -rf node_modules apps/*/node_modules packages/*/node_modules
	rm -rf apps/*/dist packages/*/dist
	rm -rf .turbo apps/*/.turbo packages/*/.turbo

install:
	bun install

# Help
help:
	@echo "Available commands:"
	@echo "  make dev          - Start all apps (web + server)"
	@echo "  make dev-web      - Start web only (port 3001)"
	@echo "  make dev-server   - Start server only (port 3000)"
	@echo "  make build        - Build all apps"
	@echo "  make check        - Run Biome lint and format"
	@echo "  make check-types  - Run TypeScript type check"
	@echo "  make deploy       - Check, build, and deploy to Cloudflare"
	@echo "  make deploy-quick - Deploy without checks"
	@echo "  make destroy      - Destroy Cloudflare resources"
	@echo "  make db-push      - Push schema changes to D1"
	@echo "  make db-generate  - Generate migrations"
	@echo "  make clean        - Remove node_modules and build artifacts"
	@echo "  make install      - Install dependencies"

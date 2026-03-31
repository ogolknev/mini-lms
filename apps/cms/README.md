# cms

## Overview

`apps/cms` is the Strapi application that powers the online school backend. It stores courses, lessons, uploads, user enrollment data, and the lesson access rules consumed by the web app.

## Requirements

- Node.js `>=18 <=22`
- pnpm `10.x`

## Environment

Create a local env file before starting the CMS:

```bash
cp .env.example .env
```

The example file includes these required variables:

- `HOST`
- `PORT`
- `APP_KEYS`
- `API_TOKEN_SALT`
- `ADMIN_JWT_SECRET`
- `TRANSFER_TOKEN_SALT`
- `JWT_SECRET`
- `ENCRYPTION_KEY`

## Run and Build

From `apps/cms`:

```bash
pnpm dev
pnpm build
pnpm start
```

From the repository root:

```bash
pnpm --filter cms dev
pnpm --filter cms build
pnpm --filter cms start
```

## Useful Commands

```bash
pnpm console
pnpm deploy
pnpm upgrade:dry
pnpm upgrade
```

## Notes

The CMS layer contains the Strapi content types and custom lesson access logic used by the frontend. Course and lesson behavior lives under `src/api`, while plugin customizations such as documentation and `users-permissions` extensions live under `src/extensions`.

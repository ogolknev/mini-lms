# mini-lms

## Overview

This repository contains the `mini-lms` pnpm monorepo with two apps:

- `apps/web` - the client-facing Vue 3 and Vite application
- `apps/cms` - the Strapi CMS that manages courses, lessons, users, and access rules

## Requirements

- Node.js `>=18 <=22`
- pnpm `10.x`

## Environment

Copy the example files before running the apps:

```bash
cp apps/web/.env.example apps/web/.env
cp apps/cms/.env.example apps/cms/.env
```

The web app currently expects:

- `VITE_API_BASE`

The CMS example includes the local server settings and Strapi secrets required to boot the app.

## Run and Build

Install dependencies from the repository root:

```bash
pnpm install
```

Start both apps together:

```bash
pnpm dev
```

Build both apps:

```bash
pnpm build
```

Use the root commands when you want to work with the whole stack. Use app-specific commands when you only need one app.

## Useful Commands

Run only the frontend:

```bash
pnpm dev:web
pnpm build:web
pnpm test:web
pnpm lint:web
```

Run only the CMS:

```bash
pnpm dev:cms
pnpm build:cms
```

You can also run commands directly with pnpm filters:

```bash
pnpm --filter web dev
pnpm --filter cms dev
```

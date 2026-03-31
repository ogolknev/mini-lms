# web

## Overview

`apps/web` is the client-facing Vue 3 application for `mini-lms`. It uses Vite, Vue Router, Pinia, and Nuxt UI to render the authenticated learning flow around courses and lessons.

## Requirements

- Node.js `>=18 <=22`
- pnpm `10.x`

## Environment

Create a local env file before starting the app:

```bash
cp .env.example .env
```

Required variables:

- `VITE_API_BASE` - base URL for the CMS API, for example `http://localhost:1337`

## Run and Build

From `apps/web`:

```bash
pnpm dev
pnpm build
pnpm build-only
pnpm preview
```

From the repository root:

```bash
pnpm --filter web dev
pnpm --filter web build
```

## Useful Commands

```bash
pnpm type-check
pnpm test:unit
pnpm lint
pnpm lint:eslint
pnpm lint:oxlint
pnpm format
```

## Structure

The frontend follows a feature-oriented layout:

- `src/app` - application entrypoints, router, shared styles, and top-level UI setup
- `src/entities` - domain models and API access for courses, lessons, media, and users
- `src/features` - focused user actions such as login and logout
- `src/pages` - route-level views like auth, overview, course, and lesson
- `src/widgets` - reusable composed UI blocks such as the app header

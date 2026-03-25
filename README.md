# online-school monorepo

## Apps

- `apps/web` - клиентское Vue/Vite приложение
- `apps/cms` - Strapi CMS

## Requirements

- Node.js `>=18 <=22`
- pnpm `10.x`

## Run

```bash
pnpm install
pnpm dev
```

Команды по приложениям:

```bash
pnpm dev:web
pnpm dev:cms
pnpm build:web
pnpm build:cms
```

Или напрямую через filter:

```bash
pnpm --filter web dev
pnpm --filter cms dev
```

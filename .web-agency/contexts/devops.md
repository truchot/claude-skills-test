# Contexte DevOps

Connaissances essentielles pour CI/CD, déploiement et infrastructure.

## Stack par défaut

```
GitHub Actions (CI/CD)
Docker (conteneurisation)
Vercel (frontend Next.js)
Railway / Fly.io (backend)
PostgreSQL (base de données)
```

## GitHub Actions

### Workflow CI basique

```yaml
# .github/workflows/ci.yml
name: CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Lint
        run: npm run lint

      - name: Type check
        run: npm run type-check

      - name: Test
        run: npm test

      - name: Build
        run: npm run build
```

### Workflow avec déploiement

```yaml
# .github/workflows/deploy.yml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install and build
        run: |
          npm ci
          npm run build

      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: '--prod'
```

### Workflow avec matrice

```yaml
jobs:
  test:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        node-version: [18, 20, 22]

    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: ${{ matrix.node-version }}
      - run: npm ci && npm test
```

## Docker

### Dockerfile Node.js

```dockerfile
# Dockerfile
FROM node:20-alpine AS base

# Dependencies
FROM base AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

# Build
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Production
FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]
```

### Docker Compose

```yaml
# docker-compose.yml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=postgresql://postgres:postgres@db:5432/myapp
    depends_on:
      db:
        condition: service_healthy

  db:
    image: postgres:16-alpine
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
      POSTGRES_DB: myapp
    volumes:
      - postgres_data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres"]
      interval: 5s
      timeout: 5s
      retries: 5

volumes:
  postgres_data:
```

### Commandes Docker essentielles

```bash
# Build
docker build -t myapp .

# Run
docker run -p 3000:3000 myapp

# Compose
docker compose up -d
docker compose down
docker compose logs -f

# Debug
docker exec -it <container> sh
docker logs <container>
```

## Vercel

### Configuration

```json
// vercel.json
{
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "framework": "nextjs",
  "regions": ["cdg1"],
  "env": {
    "DATABASE_URL": "@database-url"
  }
}
```

### Variables d'environnement

```bash
# CLI
vercel env add DATABASE_URL production
vercel env pull .env.local

# Types d'environnement
# - Production: déploiement main
# - Preview: déploiements PR
# - Development: local
```

## Railway / Fly.io

### Railway (backend simple)

```bash
# Installation
npm install -g @railway/cli
railway login

# Déploiement
railway init
railway up

# Variables
railway variables set DATABASE_URL=xxx
```

### Fly.io

```toml
# fly.toml
app = "myapp"
primary_region = "cdg"

[build]
  dockerfile = "Dockerfile"

[http_service]
  internal_port = 3000
  force_https = true

[env]
  NODE_ENV = "production"
```

```bash
# Déploiement
fly launch
fly deploy
fly secrets set DATABASE_URL=xxx
```

## Base de données

### PostgreSQL - Commandes utiles

```bash
# Connexion
psql $DATABASE_URL

# Backup
pg_dump $DATABASE_URL > backup.sql

# Restore
psql $DATABASE_URL < backup.sql

# Dans psql
\dt          # Liste tables
\d users     # Describe table
\q           # Quitter
```

### Migrations en production

```bash
# Avec Prisma
npx prisma migrate deploy

# Vérifier l'état
npx prisma migrate status
```

## Monitoring

### Health check endpoint

```typescript
// app/api/health/route.ts
export async function GET() {
  try {
    // Vérifier la DB
    await prisma.$queryRaw`SELECT 1`

    return Response.json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      version: process.env.npm_package_version,
    })
  } catch (error) {
    return Response.json(
      { status: 'unhealthy', error: 'Database connection failed' },
      { status: 503 }
    )
  }
}
```

### Logs structurés

```typescript
const log = {
  info: (message: string, meta?: object) =>
    console.log(JSON.stringify({ level: 'info', message, ...meta, timestamp: new Date().toISOString() })),
  error: (message: string, error?: Error, meta?: object) =>
    console.error(JSON.stringify({ level: 'error', message, error: error?.message, stack: error?.stack, ...meta, timestamp: new Date().toISOString() })),
}

// Usage
log.info('User created', { userId: '123' })
log.error('Failed to process', error, { orderId: '456' })
```

## Secrets Management

### Ne jamais commiter

```gitignore
# .gitignore
.env
.env.local
.env.*.local
*.pem
*.key
```

### Variables par environnement

```
Development: .env.local (local, jamais commité)
CI/CD: GitHub Secrets ou Vercel Environment Variables
Production: Variables serveur (Railway, Fly.io, Vercel)
```

## Checklist déploiement

```markdown
## Avant mise en prod

- [ ] Tests passent
- [ ] Build réussit
- [ ] Variables d'environnement configurées
- [ ] Migrations prêtes
- [ ] Backup DB effectué
- [ ] Health check endpoint
- [ ] Rollback plan

## Après mise en prod

- [ ] Health check OK
- [ ] Logs normaux
- [ ] Smoke tests manuels
- [ ] Monitoring actif
```

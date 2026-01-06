---
name: docker
description: Docker - conteneurs, images, Dockerfile, Docker Compose
tags: [docker, containers, dockerfile, compose]
sub-skills: [dockerfile, compose, optimization]
---

# Docker

## Quand Utiliser

- Conteneuriser une application
- Créer des environnements reproductibles
- Orchestrer plusieurs services
- Déployer de manière cohérente

## Dockerfile

### Node.js Production

```dockerfile
# Build stage
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Production stage
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

# Non-root user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 appuser

COPY --from=builder --chown=appuser:nodejs /app/dist ./dist
COPY --from=builder --chown=appuser:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=appuser:nodejs /app/package.json ./

USER appuser
EXPOSE 3000
CMD ["node", "dist/index.js"]
```

### Next.js

```dockerfile
FROM node:20-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000
ENV PORT 3000
CMD ["node", "server.js"]
```

## Docker Compose

```yaml
# docker-compose.yml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=postgresql://user:pass@db:5432/mydb
      - REDIS_URL=redis://cache:6379
    depends_on:
      db:
        condition: service_healthy
      cache:
        condition: service_started
    volumes:
      - ./src:/app/src:ro  # Dev only
    networks:
      - backend

  db:
    image: postgres:16-alpine
    environment:
      POSTGRES_USER: user
      POSTGRES_PASSWORD: pass
      POSTGRES_DB: mydb
    volumes:
      - postgres_data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U user -d mydb"]
      interval: 5s
      timeout: 5s
      retries: 5
    networks:
      - backend

  cache:
    image: redis:7-alpine
    volumes:
      - redis_data:/data
    networks:
      - backend

volumes:
  postgres_data:
  redis_data:

networks:
  backend:
```

## Commandes

```bash
# Build
docker build -t myapp:latest .
docker build -t myapp:latest --target builder .

# Run
docker run -d -p 3000:3000 --name app myapp
docker run -it --rm myapp sh  # Interactive

# Compose
docker compose up -d
docker compose down
docker compose logs -f app
docker compose exec app sh

# Images
docker images
docker rmi myapp:latest
docker system prune -a  # Cleanup

# Containers
docker ps -a
docker stop app
docker rm app
docker logs app -f
```

## .dockerignore

```
node_modules
npm-debug.log
.git
.gitignore
.env
.env.*
Dockerfile
docker-compose*.yml
.dockerignore
README.md
.next
dist
coverage
```

## Optimisations

### Layer Caching

```dockerfile
# ❌ Mauvais - invalide le cache à chaque changement
COPY . .
RUN npm ci

# ✅ Bon - cache npm ci si package.json n'a pas changé
COPY package*.json ./
RUN npm ci
COPY . .
```

### Multi-stage builds

```dockerfile
# Réduire la taille de l'image finale
FROM node:20 AS builder
# ... build steps

FROM node:20-alpine AS runner
# ... only production files
```

### Image size

```bash
# Alpine est plus petit
FROM node:20-alpine  # ~50MB vs node:20 ~350MB

# Distroless pour production
FROM gcr.io/distroless/nodejs20-debian12
```

## Healthchecks

```dockerfile
HEALTHCHECK --interval=30s --timeout=10s --retries=3 \
  CMD curl -f http://localhost:3000/health || exit 1
```

```yaml
# docker-compose.yml
healthcheck:
  test: ["CMD", "curl", "-f", "http://localhost:3000/health"]
  interval: 30s
  timeout: 10s
  retries: 3
  start_period: 40s
```

## Environment Variables

```yaml
# docker-compose.yml
services:
  app:
    environment:
      - NODE_ENV=production
      - API_KEY=${API_KEY}  # From .env or shell
    env_file:
      - .env.production
```

## Volumes

```yaml
volumes:
  # Named volume (persistent)
  - postgres_data:/var/lib/postgresql/data

  # Bind mount (dev)
  - ./src:/app/src

  # Read-only
  - ./config:/app/config:ro
```

## Networking

```yaml
networks:
  frontend:
  backend:
    internal: true  # No external access

services:
  app:
    networks:
      - frontend
      - backend
  db:
    networks:
      - backend
```

## Anti-patterns

- ❌ Root user dans le container
- ❌ Secrets dans l'image
- ❌ `latest` tag en production
- ❌ Un process par container ignoré
- ❌ Pas de healthcheck

## Checklist

- [ ] Multi-stage build
- [ ] Non-root user
- [ ] .dockerignore
- [ ] Healthcheck
- [ ] Volumes pour données
- [ ] Networks isolés

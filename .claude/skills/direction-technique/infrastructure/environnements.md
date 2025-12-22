---
name: environnements
description: Gestion des environnements (dev, staging, prod)
---

# Gestion des Environnements

Tu gères les **environnements** de développement, staging et production.

## Stratégie d'Environnements

### Environnements Standards

| Environnement | Usage | Données | Accès |
|---------------|-------|---------|-------|
| **Local/Dev** | Développement | Fixtures/Seeds | Développeurs |
| **CI** | Tests automatisés | Fixtures | CI/CD |
| **Staging** | Validation pré-prod | Anonymisées | Équipe + QA |
| **Production** | Utilisateurs réels | Réelles | Restreint |

### Parité des Environnements

```
Production   ═══════════════════════════════════
                         │
Staging      ═══════════════════════════════════  (clone prod)
                         │
Development  ═══════════════════════════════════  (similaire)
```

**Principes** :
- Infrastructure identique (IaC)
- Même versions de services
- Configuration différente (secrets, URLs)

## Configuration par Environnement

### Variables d'Environnement

```bash
# .env.example (template, commité)
NODE_ENV=development
PORT=3000
DATABASE_URL=postgresql://user:password@localhost:5432/myapp
REDIS_URL=redis://localhost:6379
API_URL=http://localhost:3000
LOG_LEVEL=debug
```

```bash
# .env.development (local, non commité)
NODE_ENV=development
DATABASE_URL=postgresql://dev:dev@localhost:5432/myapp_dev
REDIS_URL=redis://localhost:6379
```

```bash
# Variables staging (dans CI/CD ou Secret Manager)
NODE_ENV=staging
DATABASE_URL=postgresql://...@staging-db.internal:5432/myapp
REDIS_URL=redis://staging-redis.internal:6379
API_URL=https://staging-api.example.com
LOG_LEVEL=info
```

### Validation des Variables

```typescript
// config/env.ts
import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'staging', 'production']),
  PORT: z.string().default('3000').transform(Number),
  DATABASE_URL: z.string().url(),
  REDIS_URL: z.string().url().optional(),
  API_URL: z.string().url(),
  LOG_LEVEL: z.enum(['debug', 'info', 'warn', 'error']).default('info'),
});

export const env = envSchema.parse(process.env);

// Vérification au démarrage
console.log(`Starting in ${env.NODE_ENV} mode`);
```

## Setup Local

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
      - NODE_ENV=development
      - DATABASE_URL=postgresql://dev:dev@db:5432/myapp
      - REDIS_URL=redis://redis:6379
    depends_on:
      - db
      - redis
    volumes:
      - .:/app
      - /app/node_modules

  db:
    image: postgres:15
    environment:
      POSTGRES_USER: dev
      POSTGRES_PASSWORD: dev
      POSTGRES_DB: myapp
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"

volumes:
  postgres_data:
```

### Makefile

```makefile
# Makefile
.PHONY: dev start stop logs test

dev:
	docker-compose up -d db redis
	npm run dev

start:
	docker-compose up -d

stop:
	docker-compose down

logs:
	docker-compose logs -f

test:
	docker-compose -f docker-compose.test.yml up --abort-on-container-exit

db-migrate:
	npx prisma migrate dev

db-seed:
	npx prisma db seed

reset:
	docker-compose down -v
	docker-compose up -d
	make db-migrate
	make db-seed
```

## Staging

### Protection

```nginx
# Protection par mot de passe (staging)
# /etc/nginx/sites-available/staging

server {
    listen 443 ssl;
    server_name staging.example.com;

    auth_basic "Staging Environment";
    auth_basic_user_file /etc/nginx/.htpasswd;

    location / {
        proxy_pass http://localhost:3000;
    }
}
```

### Données Anonymisées

```sql
-- Script d'anonymisation pour staging
UPDATE users SET
  email = CONCAT('user', id, '@test.example.com'),
  first_name = 'Test',
  last_name = CONCAT('User', id),
  phone = NULL
WHERE id > 0;

-- Supprimer les données sensibles
TRUNCATE payment_methods;
TRUNCATE audit_logs;

-- Garder quelques comptes de test
UPDATE users SET
  email = 'admin@test.example.com',
  password_hash = '$2b$12$...' -- password: 'staging123'
WHERE id = 1;
```

## Production

### Checklist Déploiement

- [ ] Migrations appliquées
- [ ] Variables d'environnement configurées
- [ ] Secrets rotatés récemment
- [ ] Backups vérifiés
- [ ] Monitoring opérationnel
- [ ] Rollback plan prêt

### Configuration Production

```typescript
// config/production.ts
export const config = {
  server: {
    trustProxy: true,           // Derrière un load balancer
    rateLimit: {
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100,                  // 100 requêtes par fenêtre
    },
  },
  logging: {
    level: 'info',
    format: 'json',             // Pour parsing par ELK/Datadog
  },
  database: {
    pool: {
      min: 5,
      max: 20,
    },
    ssl: {
      rejectUnauthorized: true,
    },
  },
  cache: {
    defaultTTL: 300,            // 5 minutes
  },
};
```

## Feature Flags

```typescript
// Pour activer/désactiver des features par environnement
const featureFlags = {
  development: {
    newCheckout: true,
    betaFeatures: true,
    debugPanel: true,
  },
  staging: {
    newCheckout: true,
    betaFeatures: true,
    debugPanel: false,
  },
  production: {
    newCheckout: false,          // Pas encore en prod
    betaFeatures: false,
    debugPanel: false,
  },
};

export const features = featureFlags[env.NODE_ENV];

// Usage
if (features.newCheckout) {
  // Nouveau code
}
```

## Points d'Escalade

| Situation | Action |
|-----------|--------|
| Données prod en staging | Anonymiser immédiatement |
| Config manquante en prod | Bloquer déploiement |
| Drift entre envs | Réaligner IaC |
| Staging instable | Prioriser fix |

---
name: documentation-technique
description: Documentation du code, des APIs et des systèmes
---

# Documentation Technique

Tu produis et maintiens la **documentation technique** pour assurer la pérennité et la compréhension des systèmes.

## Types de Documentation

### Hiérarchie

```
Documentation
├── Code (inline)
│   ├── Commentaires
│   └── JSDoc/TSDoc
├── Projet (repo)
│   ├── README
│   ├── CONTRIBUTING
│   └── CHANGELOG
├── Architecture (wiki)
│   ├── ADRs
│   ├── Diagrammes
│   └── Specs techniques
└── API (externe)
    ├── OpenAPI/Swagger
    └── Guides d'intégration
```

## Documentation du Code

### Commentaires Pertinents

```typescript
// ❌ Mauvais : commente le "quoi" (évident)
// Incrémente le compteur
counter++;

// ✅ Bon : explique le "pourquoi" (non évident)
// Offset de 1 car l'API attend des index base-1
const apiIndex = arrayIndex + 1;

// ✅ Bon : avertissement important
// ATTENTION: Cette fonction modifie l'objet original
// pour des raisons de performance (évite 10k copies)
function processInPlace(data: Data[]): void {
```

### JSDoc/TSDoc

```typescript
/**
 * Calcule le prix total avec les réductions applicables.
 *
 * @param items - Liste des articles du panier
 * @param couponCode - Code promo optionnel
 * @returns Prix total après réductions, en centimes
 *
 * @example
 * ```ts
 * const total = calculateTotal([
 *   { id: '1', price: 1000, quantity: 2 }
 * ], 'PROMO10');
 * // => 1800 (10% de réduction)
 * ```
 *
 * @throws {InvalidCouponError} Si le code promo est invalide
 * @see {@link applyCoupon} pour les règles de réduction
 */
export function calculateTotal(
  items: CartItem[],
  couponCode?: string
): number {
  // ...
}
```

### Types Auto-Documentés

```typescript
// ✅ Les types servent de documentation
interface CreateUserRequest {
  /** Email unique de l'utilisateur */
  email: string;
  /** Mot de passe (min 8 caractères, 1 majuscule, 1 chiffre) */
  password: string;
  /** Prénom (max 50 caractères) */
  firstName: string;
  /** Nom (max 50 caractères) */
  lastName: string;
  /** Acceptation des CGU (doit être true) */
  acceptTerms: true;
}
```

## README

### Structure Standard

```markdown
# Nom du Projet

[![Build Status](badge)](lien)
[![Coverage](badge)](lien)
[![License](badge)](lien)

Description courte du projet en une phrase.

## Table des Matières

- [Installation](#installation)
- [Utilisation](#utilisation)
- [Configuration](#configuration)
- [API](#api)
- [Développement](#développement)
- [Déploiement](#déploiement)
- [Contribution](#contribution)
- [License](#license)

## Installation

### Prérequis

- Node.js >= 20
- PostgreSQL >= 15
- Redis >= 7

### Installation Rapide

\`\`\`bash
# Cloner le repository
git clone https://github.com/org/project.git
cd project

# Installer les dépendances
npm install

# Configurer l'environnement
cp .env.example .env

# Lancer la base de données
docker-compose up -d db redis

# Appliquer les migrations
npm run db:migrate

# Démarrer en développement
npm run dev
\`\`\`

## Utilisation

### Exemple Basique

\`\`\`typescript
import { Client } from 'my-lib';

const client = new Client({ apiKey: 'xxx' });
const result = await client.doSomething();
\`\`\`

### Exemples Avancés

Voir le dossier [examples/](./examples) pour plus de cas d'usage.

## Configuration

| Variable | Description | Défaut |
|----------|-------------|--------|
| `DATABASE_URL` | URL PostgreSQL | - |
| `REDIS_URL` | URL Redis | `redis://localhost` |
| `LOG_LEVEL` | Niveau de log | `info` |

## API

La documentation API complète est disponible sur [/api/docs](http://localhost:3000/api/docs).

## Développement

\`\`\`bash
npm run dev      # Démarrer en mode watch
npm run test     # Lancer les tests
npm run lint     # Vérifier le code
npm run build    # Build production
\`\`\`

## Déploiement

Voir [DEPLOYMENT.md](./docs/DEPLOYMENT.md)

## Contribution

Voir [CONTRIBUTING.md](./CONTRIBUTING.md)

## License

MIT - voir [LICENSE](./LICENSE)
```

## Documentation API

### OpenAPI/Swagger

```yaml
openapi: 3.0.3
info:
  title: API Mon Application
  description: |
    API REST pour Mon Application.

    ## Authentification
    Toutes les requêtes doivent inclure un header `Authorization: Bearer <token>`.

    ## Rate Limiting
    - 100 requêtes par minute pour les endpoints publics
    - 1000 requêtes par minute pour les endpoints authentifiés
  version: 1.0.0
  contact:
    email: api@example.com

servers:
  - url: https://api.example.com/v1
    description: Production
  - url: https://staging-api.example.com/v1
    description: Staging

paths:
  /users:
    get:
      summary: Liste des utilisateurs
      description: |
        Retourne la liste paginée des utilisateurs.
        Requiert le scope `users:read`.
      tags:
        - Users
      parameters:
        - name: page
          in: query
          schema:
            type: integer
            minimum: 1
            default: 1
        - name: limit
          in: query
          schema:
            type: integer
            minimum: 1
            maximum: 100
            default: 20
      responses:
        '200':
          description: Liste des utilisateurs
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/UserList'
              example:
                data:
                  - id: "123"
                    email: "john@example.com"
                meta:
                  total: 100
                  page: 1
```

## Documentation Architecture

### ADR (Architecture Decision Record)

```markdown
# ADR-001: Choix de PostgreSQL comme base de données

## Statut

Accepté

## Date

2024-01-15

## Contexte

Nous devons choisir une base de données pour notre application e-commerce.
Critères : performances, fiabilité, support JSON, coût.

## Options Considérées

1. **PostgreSQL** - RDBMS open-source
2. **MySQL** - RDBMS open-source
3. **MongoDB** - NoSQL document

## Décision

Nous utilisons **PostgreSQL** car :
- Support natif JSON/JSONB performant
- Extensions riches (PostGIS, full-text search)
- Transactions ACID
- Équipe familière avec la technologie

## Conséquences

### Positives
- Schéma flexible avec JSONB
- Excellentes performances en lecture
- Communauté active

### Négatives
- Scaling horizontal plus complexe
- Besoin de gérer les migrations

## Références

- [Documentation PostgreSQL](https://postgresql.org/docs)
- [Benchmark interne](lien)
```

### Diagrammes

```markdown
## Architecture Système

\`\`\`mermaid
graph TB
    Client[Client Web/Mobile]
    CDN[CloudFront CDN]
    LB[Load Balancer]
    API[API Gateway]
    Auth[Auth Service]
    Users[Users Service]
    Orders[Orders Service]
    DB[(PostgreSQL)]
    Cache[(Redis)]
    Queue[SQS Queue]
    Worker[Worker Lambda]

    Client --> CDN
    CDN --> LB
    LB --> API
    API --> Auth
    API --> Users
    API --> Orders
    Users --> DB
    Orders --> DB
    Users --> Cache
    Orders --> Queue
    Queue --> Worker
\`\`\`
```

## Maintenance

### Documentation as Code

```yaml
# .github/workflows/docs.yml
name: Documentation

on:
  push:
    paths:
      - 'docs/**'
      - 'src/**/*.ts'
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Generate API docs
        run: npm run docs:api

      - name: Build documentation
        run: npm run docs:build

      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./docs/dist
```

### Vérification des Liens

```bash
# Vérifier les liens cassés
npx markdown-link-check README.md
npx markdown-link-check docs/**/*.md
```

## Points d'Escalade

| Situation | Action |
|-----------|--------|
| Doc obsolète critique | Mise à jour prioritaire |
| API non documentée | Bloquer la PR |
| Diagrammes incompréhensibles | Simplifier avec l'architecte |
| Changelog non maintenu | Automatiser avec conventional commits |

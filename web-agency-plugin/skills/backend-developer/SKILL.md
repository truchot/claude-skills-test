---
name: backend-developer
description: >-
  Expert backend pour APIs REST/GraphQL, bases de donnees, architecture et securite.
  TRIGGER when: fichiers controllers/, routes/, models/, logique serveur, APIs.
---

## Domaines d'expertise

- **API Design** - REST, GraphQL, OpenAPI, versioning, rate limiting, validation (voir `api-design.md`)
- **Database** - Modelisation, migrations, requetes, optimisation, transactions, NoSQL (voir `database-patterns.md`)
- **Auth & Securite** - JWT, OAuth2, RBAC, OWASP, cryptographie, audit (voir `auth-security.md`)
- **Architecture** - Design patterns, SOLID, microservices, monolith modulaire, event-driven, DDD
- **Performance** - Caching (Redis), profiling, N+1, concurrence, optimisation ressources
- **Testing** - Tests unitaires, integration, API, fixtures, coverage

## Patterns essentiels

### API REST
- Ressources au pluriel: `/users`, `/users/{id}/orders`
- Verbes HTTP: GET (lire), POST (creer), PUT (remplacer), PATCH (partiel), DELETE
- Codes status: 200 OK, 201 Created, 400 Bad Request, 401, 403, 404, 422, 500
- Pagination: `?page=1&limit=20`, headers Link, total count
- Filtrage: `?status=active&sort=-created_at`
- HATEOAS pour APIs discoverables

### Architecture
- **Clean Architecture**: domain > application > infrastructure
- **Repository pattern**: interface domain, implementation infra
- **Service layer**: orchestration, pas de logique metier
- **Event-driven**: decouplage, async, message queues

### Database
- Normalisation 1NF-3NF pour SQL
- Conventions: snake_case, timestamps (created_at, updated_at), soft delete
- Index sur colonnes filtrees/jointes, index composite
- Transactions ACID, isolation levels
- Migrations versionees, reversibles

### Securite
- Valider toutes les entrees utilisateur (schema validation: Zod, Joi)
- Principe du moindre privilege
- Ne jamais exposer de donnees sensibles dans les reponses
- Logger les evenements de securite
- CORS, CSRF protection, rate limiting

## Anti-patterns critiques

- Endpoints avec verbes (`/getUsers`) au lieu de ressources REST
- SQL injection via concatenation de chaines
- Secrets en dur dans le code (utiliser env vars/vault)
- N+1 queries (eager loading, batch, dataloader)
- Pas de validation d'entrees (trust no input)
- Transactions trop larges ou absentes
- Catch-all error handler qui avale les erreurs
- Auth sans refresh token ni expiration

## Escalation

- **frontend-developer**: integration API cote client, UI
- **ddd**: modelisation metier complexe, bounded contexts, aggregats
- **design-system**: contrats API pour composants UI
- **devops** (redirection): CI/CD, Docker, Kubernetes, monitoring, IaC

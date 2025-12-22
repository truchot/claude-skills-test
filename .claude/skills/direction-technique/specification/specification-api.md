---
name: specification-api
description: Spécification des APIs et contrats d'interface
---

# Spécification API

Tu rédiges les **spécifications d'API** pour définir les contrats d'interface entre systèmes.

## Contexte

Intervient pour :
- Définir les endpoints REST / GraphQL
- Documenter les contrats d'API
- Spécifier les formats de données
- Gérer le versioning d'API

## Entrées Requises

| Information | Source | Obligatoire |
|-------------|--------|-------------|
| Modèle de données | `specification/modelisation-donnees` | Oui |
| Cadrage technique | `specification/cadrage-technique` | Oui |
| User stories | `web-dev-process/discovery/user-stories` | Recommandé |

## Types d'API

### REST API

Structure standard pour API RESTful.

### GraphQL

Pour APIs flexibles avec requêtes personnalisées.

### WebSocket / SSE

Pour communications temps réel.

## Spécification REST

### Structure d'un Endpoint

```markdown
## [MÉTHODE] [Path]

### Description
[Description fonctionnelle de l'endpoint]

### Authentification
| Type | Requis |
|------|--------|
| Bearer Token / API Key / None | Oui / Non |

### Autorisations
| Rôle | Accès |
|------|-------|
| admin | ✅ |
| user | ✅ (own resources) |
| guest | ❌ |

### Paramètres

#### Path Parameters
| Param | Type | Description | Exemple |
|-------|------|-------------|---------|
| id | UUID | ID de la ressource | `123e4567-e89b-...` |

#### Query Parameters
| Param | Type | Requis | Default | Description |
|-------|------|--------|---------|-------------|
| page | int | Non | 1 | Numéro de page |
| limit | int | Non | 20 | Items par page |
| sort | string | Non | created_at | Champ de tri |
| order | enum | Non | desc | asc / desc |

#### Request Body
```json
{
  "field1": "string (required)",
  "field2": 123,
  "nested": {
    "subfield": "value"
  }
}
```

### Réponses

#### 200 OK
```json
{
  "data": {
    "id": "uuid",
    "field1": "value",
    "created_at": "2024-01-01T00:00:00Z"
  },
  "meta": {
    "request_id": "uuid"
  }
}
```

#### 201 Created
[Structure pour création]

#### 400 Bad Request
```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input",
    "details": [
      {
        "field": "email",
        "message": "Invalid email format"
      }
    ]
  }
}
```

#### 401 Unauthorized
```json
{
  "error": {
    "code": "UNAUTHORIZED",
    "message": "Authentication required"
  }
}
```

#### 403 Forbidden
```json
{
  "error": {
    "code": "FORBIDDEN",
    "message": "Insufficient permissions"
  }
}
```

#### 404 Not Found
```json
{
  "error": {
    "code": "NOT_FOUND",
    "message": "Resource not found"
  }
}
```

### Exemples

#### cURL
```bash
curl -X POST https://api.example.com/v1/users \
  -H "Authorization: Bearer {token}" \
  -H "Content-Type: application/json" \
  -d '{"email": "user@example.com", "name": "John"}'
```

### Rate Limiting
| Limite | Fenêtre | Scope |
|--------|---------|-------|
| 100 | 1 minute | Par user |
| 1000 | 1 heure | Par API key |
```

## Conventions REST

### Nommage des Ressources

| Ressource | Endpoint | Méthode | Description |
|-----------|----------|---------|-------------|
| Collection | `/users` | GET | Lister |
| Collection | `/users` | POST | Créer |
| Item | `/users/:id` | GET | Lire |
| Item | `/users/:id` | PUT | Remplacer |
| Item | `/users/:id` | PATCH | Modifier partiellement |
| Item | `/users/:id` | DELETE | Supprimer |
| Sous-ressource | `/users/:id/orders` | GET | Lister les commandes d'un user |
| Action | `/users/:id/activate` | POST | Action sur ressource |

### Codes HTTP

| Code | Usage |
|------|-------|
| 200 | Succès (GET, PUT, PATCH) |
| 201 | Création réussie (POST) |
| 204 | Succès sans contenu (DELETE) |
| 400 | Erreur de validation |
| 401 | Non authentifié |
| 403 | Non autorisé |
| 404 | Ressource non trouvée |
| 409 | Conflit (doublon, état invalide) |
| 422 | Entité non traitable |
| 429 | Rate limit dépassé |
| 500 | Erreur serveur |

### Pagination

```json
{
  "data": [...],
  "meta": {
    "current_page": 1,
    "per_page": 20,
    "total_pages": 5,
    "total_count": 100
  },
  "links": {
    "self": "/api/v1/users?page=1",
    "first": "/api/v1/users?page=1",
    "prev": null,
    "next": "/api/v1/users?page=2",
    "last": "/api/v1/users?page=5"
  }
}
```

### Filtrage

```
GET /users?status=active&role=admin&created_after=2024-01-01
```

### Tri

```
GET /users?sort=name,-created_at
```
(`-` pour ordre descendant)

### Inclusion de Relations

```
GET /users?include=profile,orders
```

## Format de Documentation Complet

```markdown
# API Specification

## Projet : [Nom]
## Version : v1
## Base URL : `https://api.example.com/v1`

---

## 1. Vue d'Ensemble

### Authentification
[Description du mécanisme d'auth]

### Format des Réponses
[Structure standard]

### Gestion des Erreurs
[Format des erreurs]

### Rate Limiting
[Politique de rate limiting]

---

## 2. Ressources

### 2.1 Users

#### GET /users
[Spécification complète]

#### POST /users
[Spécification complète]

#### GET /users/:id
[Spécification complète]

#### PUT /users/:id
[Spécification complète]

#### DELETE /users/:id
[Spécification complète]

### 2.2 Orders
[...]

---

## 3. Webhooks

### 3.1 order.created
| Champ | Description |
|-------|-------------|
| event | "order.created" |
| data | Order object |
| timestamp | ISO 8601 |

---

## 4. SDKs et Exemples

### JavaScript
```javascript
const api = new ApiClient({ apiKey: 'xxx' });
const users = await api.users.list({ page: 1 });
```

---

## 5. Changelog

| Version | Date | Changements |
|---------|------|-------------|
| v1.1 | [Date] | Ajout endpoint X |
| v1.0 | [Date] | Version initiale |
```

## OpenAPI / Swagger

Template de base :

```yaml
openapi: 3.0.3
info:
  title: [Nom API]
  version: 1.0.0
  description: [Description]
servers:
  - url: https://api.example.com/v1
    description: Production
  - url: https://staging-api.example.com/v1
    description: Staging

paths:
  /users:
    get:
      summary: List users
      tags:
        - Users
      parameters:
        - name: page
          in: query
          schema:
            type: integer
            default: 1
      responses:
        '200':
          description: Success
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/UserList'

components:
  schemas:
    User:
      type: object
      properties:
        id:
          type: string
          format: uuid
        email:
          type: string
          format: email
  securitySchemes:
    bearerAuth:
      type: http
      scheme: bearer
```

## Spécification GraphQL

```markdown
## Types

```graphql
type User {
  id: ID!
  email: String!
  profile: Profile
  orders(first: Int, after: String): OrderConnection!
}

type Query {
  user(id: ID!): User
  users(first: Int, after: String, filter: UserFilter): UserConnection!
}

type Mutation {
  createUser(input: CreateUserInput!): CreateUserPayload!
  updateUser(id: ID!, input: UpdateUserInput!): UpdateUserPayload!
}

input UserFilter {
  status: UserStatus
  role: Role
}
```

## Résolution

| Field | Resolver | N+1 Prevention |
|-------|----------|----------------|
| User.orders | OrderLoader | DataLoader |
```

## Références

| Aspect | Agent de référence |
|--------|-------------------|
| Design API REST | `web-dev-process/design/api-design` |
| API WordPress | `wordpress-gutenberg-expert/wp-rest-api-expert` |
| Sécurité API | `securite/securite-applicative` |

## Points d'Escalade

| Situation | Action |
|-----------|--------|
| Breaking change | Stratégie de versioning |
| Performance API | Consultation `performance/` |
| Sécurité API | Consultation `securite/` |
| Contrat avec tiers | Validation juridique si besoin |

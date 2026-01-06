---
name: api-rest
description: Conception et développement d'APIs REST
tags: [api, rest, http, endpoints, openapi]
sub-skills: [design, validation, versioning]
---

# API REST

## Quand Utiliser

- Créer des endpoints HTTP
- Définir des ressources et opérations CRUD
- Documenter avec OpenAPI/Swagger
- Valider les requêtes/réponses

## Principes REST

| Principe | Description |
|----------|-------------|
| Stateless | Pas d'état serveur entre requêtes |
| Resource-based | URLs représentent des ressources |
| HTTP verbs | GET, POST, PUT, DELETE, PATCH |
| Uniform interface | Conventions cohérentes |

## Conventions d'URL

```
GET    /users              # Liste
GET    /users/:id          # Détail
POST   /users              # Créer
PUT    /users/:id          # Remplacer
PATCH  /users/:id          # Modifier partiellement
DELETE /users/:id          # Supprimer

# Relations
GET    /users/:id/posts    # Posts d'un user
POST   /users/:id/posts    # Créer un post pour un user

# Filtrage, tri, pagination
GET    /users?role=admin&sort=name&page=2&limit=20
```

## Codes HTTP

| Code | Usage |
|------|-------|
| 200 | OK - Succès |
| 201 | Created - Ressource créée |
| 204 | No Content - Succès sans body |
| 400 | Bad Request - Requête invalide |
| 401 | Unauthorized - Non authentifié |
| 403 | Forbidden - Non autorisé |
| 404 | Not Found - Ressource inexistante |
| 409 | Conflict - Conflit (duplicate) |
| 422 | Unprocessable - Validation échouée |
| 500 | Internal Error - Erreur serveur |

## Structure de Réponse

### Succès

```json
{
  "data": {
    "id": "123",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

### Liste paginée

```json
{
  "data": [...],
  "meta": {
    "page": 1,
    "limit": 20,
    "total": 100,
    "totalPages": 5
  }
}
```

### Erreur

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input",
    "details": [
      { "field": "email", "message": "Invalid email format" }
    ]
  }
}
```

## Express.js

```typescript
import express from 'express';

const app = express();
app.use(express.json());

// GET /users
app.get('/users', async (req, res) => {
  const { page = 1, limit = 20 } = req.query;
  const users = await userService.list({ page, limit });
  res.json({ data: users });
});

// GET /users/:id
app.get('/users/:id', async (req, res) => {
  const user = await userService.findById(req.params.id);
  if (!user) {
    return res.status(404).json({
      error: { code: 'NOT_FOUND', message: 'User not found' }
    });
  }
  res.json({ data: user });
});

// POST /users
app.post('/users', async (req, res) => {
  const user = await userService.create(req.body);
  res.status(201).json({ data: user });
});

// PUT /users/:id
app.put('/users/:id', async (req, res) => {
  const user = await userService.update(req.params.id, req.body);
  res.json({ data: user });
});

// DELETE /users/:id
app.delete('/users/:id', async (req, res) => {
  await userService.delete(req.params.id);
  res.status(204).send();
});
```

## Validation (Zod)

```typescript
import { z } from 'zod';

const createUserSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  age: z.number().int().positive().optional()
});

type CreateUserInput = z.infer<typeof createUserSchema>;

// Middleware
function validate(schema: z.ZodSchema) {
  return (req, res, next) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      return res.status(422).json({
        error: {
          code: 'VALIDATION_ERROR',
          details: result.error.issues
        }
      });
    }
    req.body = result.data;
    next();
  };
}

app.post('/users', validate(createUserSchema), createUser);
```

## OpenAPI/Swagger

```yaml
openapi: 3.0.0
info:
  title: User API
  version: 1.0.0

paths:
  /users:
    get:
      summary: List users
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
                type: object
                properties:
                  data:
                    type: array
                    items:
                      $ref: '#/components/schemas/User'

components:
  schemas:
    User:
      type: object
      properties:
        id:
          type: string
        name:
          type: string
        email:
          type: string
```

## Versioning

```
# URL path
/api/v1/users
/api/v2/users

# Header
Accept: application/vnd.api+json; version=1

# Query param
/users?version=1
```

## Rate Limiting

```typescript
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // 100 requests per window
  message: { error: { code: 'RATE_LIMIT_EXCEEDED' } }
});

app.use('/api', limiter);
```

## Anti-patterns

- ❌ Verbes dans les URLs (`/getUsers`)
- ❌ Mauvais codes HTTP
- ❌ Pas de validation
- ❌ Réponses incohérentes
- ❌ Pas de pagination

## Checklist

- [ ] URLs basées sur les ressources
- [ ] Codes HTTP appropriés
- [ ] Validation des entrées
- [ ] Structure de réponse cohérente
- [ ] Documentation OpenAPI

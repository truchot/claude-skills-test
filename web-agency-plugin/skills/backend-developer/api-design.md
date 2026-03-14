# API Design - Backend Developer

## REST Conventions

### Nommage des ressources
```
/users                 # Collection (pluriel, nom)
/users/{id}            # Element
/users/{id}/orders     # Relation hierarchique
/users/{id}/orders/{orderId}  # Sous-ressource
```

### Verbes HTTP
| Action | Verbe | Endpoint | Body | Response |
|--------|-------|----------|------|----------|
| Liste | GET | /users | - | 200 + array |
| Detail | GET | /users/{id} | - | 200 + object |
| Creation | POST | /users | Oui | 201 + object |
| Remplacement | PUT | /users/{id} | Oui | 200 + object |
| Partiel | PATCH | /users/{id} | Oui | 200 + object |
| Suppression | DELETE | /users/{id} | - | 204 |

### Codes de statut
- **2xx**: 200 OK, 201 Created, 204 No Content
- **4xx**: 400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found, 409 Conflict, 422 Unprocessable
- **5xx**: 500 Internal Server Error, 503 Service Unavailable

### Pagination
```json
GET /users?page=2&limit=20&sort=-created_at
{
  "data": [...],
  "meta": { "page": 2, "limit": 20, "total": 150, "totalPages": 8 }
}
```

### Format d'erreur standard
```json
{
  "error": { "code": "VALIDATION_ERROR", "message": "Invalid input",
    "details": [{ "field": "email", "message": "Invalid email format" }] }
}
```

## GraphQL
- Schema-first ou code-first
- Queries pour lecture, Mutations pour ecriture
- Subscriptions pour temps reel
- DataLoader pour eviter N+1
- Pagination: Relay cursor-based (edges, nodes, pageInfo)

## OpenAPI / Swagger
- Documenter chaque endpoint avec schemas
- Generer types client automatiquement
- Versionner l'API: URL path (`/v1/`) ou header

## Validation
```typescript
// Zod schema validation
const createUserSchema = z.object({
  email: z.string().email(),
  name: z.string().min(2).max(100),
  role: z.enum(['admin', 'user']).default('user'),
});
// Middleware
app.post('/users', validate(createUserSchema), createUser);
```

## Rate Limiting
- Par IP, par user, par endpoint
- Headers: X-RateLimit-Limit, X-RateLimit-Remaining, X-RateLimit-Reset
- Sliding window ou token bucket algorithm

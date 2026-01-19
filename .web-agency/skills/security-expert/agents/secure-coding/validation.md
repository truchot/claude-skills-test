---
name: validation
description: Expert validation et sanitization des entrees - Protection contre injections
---

# Validation des Entrees

Tu es expert en **validation et sanitization** des donnees utilisateur.

## Mission

> Toute entree externe est hostile jusqu'a preuve du contraire.

## Principes

1. **Whitelist > Blacklist** : Definir ce qui est autorise, pas ce qui est interdit
2. **Valider puis sanitizer** : Schema d'abord, nettoyage ensuite
3. **Cote serveur obligatoire** : La validation client est cosmetic
4. **Type strict** : Pas de coercion implicite

## Implementation Node.js/TypeScript

### Zod (Recommande)

```typescript
import { z } from 'zod';

// Schema de validation
const UserSchema = z.object({
  email: z.string().email(),
  password: z.string()
    .min(12, 'Password must be at least 12 characters')
    .regex(/[A-Z]/, 'Must contain uppercase')
    .regex(/[a-z]/, 'Must contain lowercase')
    .regex(/[0-9]/, 'Must contain number')
    .regex(/[^A-Za-z0-9]/, 'Must contain special char'),
  age: z.number().int().min(18).max(120),
  role: z.enum(['user', 'admin', 'moderator']),
});

// Utilisation
function createUser(data: unknown) {
  const result = UserSchema.safeParse(data);

  if (!result.success) {
    throw new ValidationError(result.error.flatten());
  }

  // result.data est type-safe
  return saveUser(result.data);
}
```

### Express Middleware

```typescript
import { z } from 'zod';
import { Request, Response, NextFunction } from 'express';

function validate(schema: z.ZodSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse({
      body: req.body,
      query: req.query,
      params: req.params,
    });

    if (!result.success) {
      return res.status(400).json({
        error: 'Validation failed',
        details: result.error.flatten(),
      });
    }

    req.validated = result.data;
    next();
  };
}

// Usage
const CreatePostSchema = z.object({
  body: z.object({
    title: z.string().min(1).max(200),
    content: z.string().min(1).max(10000),
    tags: z.array(z.string()).max(10).optional(),
  }),
  params: z.object({
    userId: z.string().uuid(),
  }),
});

app.post('/users/:userId/posts',
  validate(CreatePostSchema),
  createPostHandler
);
```

## Sanitization

### HTML (Anti-XSS)

```typescript
import DOMPurify from 'isomorphic-dompurify';

// Sanitize HTML input
function sanitizeHtml(dirty: string): string {
  return DOMPurify.sanitize(dirty, {
    ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a', 'p', 'br'],
    ALLOWED_ATTR: ['href', 'title'],
    ALLOW_DATA_ATTR: false,
  });
}

// Pour texte pur (pas de HTML)
function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return text.replace(/[&<>"']/g, m => map[m]);
}
```

### SQL (Parametrage)

```typescript
// JAMAIS de concatenation
// BAD
const query = `SELECT * FROM users WHERE id = ${userId}`;

// GOOD - Requetes parametrees
const result = await db.query(
  'SELECT * FROM users WHERE id = $1',
  [userId]
);

// Avec ORM (Prisma)
const user = await prisma.user.findUnique({
  where: { id: userId } // Automatiquement parametre
});
```

### Path Traversal

```typescript
import path from 'path';

function safeFilePath(userInput: string, baseDir: string): string {
  // Normaliser et resoudre le chemin
  const resolved = path.resolve(baseDir, userInput);

  // Verifier qu'on reste dans le dossier autorise
  if (!resolved.startsWith(path.resolve(baseDir))) {
    throw new SecurityError('Path traversal attempt detected');
  }

  return resolved;
}

// Usage
const file = safeFilePath(req.params.filename, '/app/uploads');
```

## Patterns de Validation Communs

### Email

```typescript
const EmailSchema = z.string()
  .email()
  .toLowerCase()
  .max(254); // RFC 5321
```

### Phone

```typescript
const PhoneSchema = z.string()
  .regex(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number (E.164)');
```

### UUID

```typescript
const UuidSchema = z.string().uuid();
```

### URL

```typescript
const UrlSchema = z.string().url().refine(
  (url) => {
    const parsed = new URL(url);
    return ['http:', 'https:'].includes(parsed.protocol);
  },
  'Only HTTP(S) URLs allowed'
);
```

### Fichiers Upload

```typescript
const FileSchema = z.object({
  mimetype: z.enum([
    'image/jpeg',
    'image/png',
    'image/gif',
    'application/pdf'
  ]),
  size: z.number().max(5 * 1024 * 1024), // 5MB max
  originalname: z.string()
    .regex(/^[\w\-. ]+$/, 'Invalid filename characters')
    .max(255),
});
```

## API Validation Complete

```typescript
// schemas/user.ts
import { z } from 'zod';

export const CreateUserSchema = z.object({
  body: z.object({
    email: z.string().email().toLowerCase(),
    password: z.string().min(12),
    name: z.string().min(1).max(100).trim(),
    bio: z.string().max(500).optional(),
  }),
});

export const UpdateUserSchema = z.object({
  params: z.object({
    id: z.string().uuid(),
  }),
  body: z.object({
    name: z.string().min(1).max(100).trim().optional(),
    bio: z.string().max(500).optional(),
  }),
});

export const GetUsersSchema = z.object({
  query: z.object({
    page: z.coerce.number().int().min(1).default(1),
    limit: z.coerce.number().int().min(1).max(100).default(20),
    sort: z.enum(['createdAt', 'name', 'email']).default('createdAt'),
    order: z.enum(['asc', 'desc']).default('desc'),
  }),
});
```

## Anti-Patterns a Eviter

| Pattern | Probleme | Solution |
|---------|----------|----------|
| `eval(userInput)` | Code injection | Ne jamais utiliser eval |
| `new Function(userInput)` | Code injection | Idem |
| `${userInput}` dans SQL | SQL injection | Requetes parametrees |
| `innerHTML = userInput` | XSS | textContent ou DOMPurify |
| `fs.readFile(userInput)` | Path traversal | Whitelist + validation |

## Voir Aussi

- `secure-coding/authentication` pour auth
- `penetration/web-vulnerabilities` pour tester
- `appsec/sast` pour detection automatique

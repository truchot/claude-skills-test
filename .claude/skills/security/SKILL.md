---
name: security
description: Sécurité applicative - Auth, OWASP, encryption
tags: [security, auth, jwt, owasp, encryption]
sub-skills: [authentication, authorization, vulnerabilities]
---

# Security

## Quand Utiliser

- Implémenter l'authentification
- Gérer les autorisations
- Prévenir les vulnérabilités OWASP
- Chiffrer des données sensibles

## Principes Clés

- Defense in depth
- Least privilege
- Fail securely
- Never trust user input

## Authentication

### JWT

```typescript
import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET!;

// Générer un token
function generateToken(user: User): string {
  return jwt.sign(
    { sub: user.id, email: user.email },
    SECRET,
    { expiresIn: '1h' }
  );
}

// Vérifier un token
function verifyToken(token: string): JwtPayload {
  return jwt.verify(token, SECRET) as JwtPayload;
}

// Middleware
function authMiddleware(req, res, next) {
  const header = req.headers.authorization;
  if (!header?.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'No token' });
  }

  try {
    const token = header.slice(7);
    req.user = verifyToken(token);
    next();
  } catch {
    res.status(401).json({ error: 'Invalid token' });
  }
}
```

### Password Hashing

```typescript
import bcrypt from 'bcrypt';

const SALT_ROUNDS = 12;

// Hash
async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, SALT_ROUNDS);
}

// Verify
async function verifyPassword(
  password: string,
  hash: string
): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

// Usage
const hash = await hashPassword('password123');
const isValid = await verifyPassword('password123', hash);
```

## Authorization (RBAC)

```typescript
type Role = 'admin' | 'editor' | 'viewer';

interface Permission {
  resource: string;
  actions: ('create' | 'read' | 'update' | 'delete')[];
}

const permissions: Record<Role, Permission[]> = {
  admin: [
    { resource: '*', actions: ['create', 'read', 'update', 'delete'] }
  ],
  editor: [
    { resource: 'posts', actions: ['create', 'read', 'update'] },
    { resource: 'comments', actions: ['create', 'read', 'update', 'delete'] }
  ],
  viewer: [
    { resource: 'posts', actions: ['read'] },
    { resource: 'comments', actions: ['read'] }
  ]
};

function can(user: User, resource: string, action: string): boolean {
  const userPermissions = permissions[user.role] || [];
  return userPermissions.some(p =>
    (p.resource === '*' || p.resource === resource) &&
    p.actions.includes(action as any)
  );
}
```

## OWASP Top 10

### Injection (SQL, NoSQL)

```typescript
// ❌ Vulnérable
const query = `SELECT * FROM users WHERE email = '${email}'`;

// ✅ Parameterized
const users = await db.query(
  'SELECT * FROM users WHERE email = $1',
  [email]
);

// ✅ ORM (Prisma)
const user = await prisma.user.findUnique({
  where: { email }
});
```

### XSS (Cross-Site Scripting)

```typescript
// ❌ Vulnérable (React)
<div dangerouslySetInnerHTML={{ __html: userInput }} />

// ✅ Safe (auto-escaped)
<div>{userInput}</div>

// ✅ Sanitize si HTML nécessaire
import DOMPurify from 'dompurify';
<div dangerouslySetInnerHTML={{
  __html: DOMPurify.sanitize(userInput)
}} />
```

### CSRF Protection

```typescript
import csrf from 'csurf';

app.use(csrf({ cookie: true }));

// Inclure le token dans les forms
app.get('/form', (req, res) => {
  res.render('form', { csrfToken: req.csrfToken() });
});
```

## Headers de Sécurité

```typescript
import helmet from 'helmet';

app.use(helmet());

// Équivalent manuel
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Strict-Transport-Security', 'max-age=31536000');
  res.setHeader('Content-Security-Policy', "default-src 'self'");
  next();
});
```

## Secrets Management

```typescript
// ❌ Hardcoded secrets
const API_KEY = 'sk_live_abc123';

// ✅ Environment variables
const API_KEY = process.env.API_KEY;

// ✅ Validation au démarrage
function validateEnv() {
  const required = ['DATABASE_URL', 'JWT_SECRET', 'API_KEY'];
  for (const key of required) {
    if (!process.env[key]) {
      throw new Error(`Missing required env var: ${key}`);
    }
  }
}
```

## Input Validation

```typescript
import { z } from 'zod';

const userSchema = z.object({
  email: z.string().email(),
  password: z.string()
    .min(8)
    .regex(/[A-Z]/, 'Must contain uppercase')
    .regex(/[0-9]/, 'Must contain number'),
  age: z.number().int().positive().max(150)
});

// Validation
const result = userSchema.safeParse(input);
if (!result.success) {
  // Handle validation errors
}
```

## Encryption

```typescript
import crypto from 'crypto';

const ALGORITHM = 'aes-256-gcm';
const KEY = Buffer.from(process.env.ENCRYPTION_KEY!, 'hex');

function encrypt(text: string): string {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(ALGORITHM, KEY, iv);

  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');

  const authTag = cipher.getAuthTag();

  return `${iv.toString('hex')}:${authTag.toString('hex')}:${encrypted}`;
}

function decrypt(encrypted: string): string {
  const [ivHex, authTagHex, data] = encrypted.split(':');

  const decipher = crypto.createDecipheriv(
    ALGORITHM,
    KEY,
    Buffer.from(ivHex, 'hex')
  );
  decipher.setAuthTag(Buffer.from(authTagHex, 'hex'));

  let decrypted = decipher.update(data, 'hex', 'utf8');
  decrypted += decipher.final('utf8');

  return decrypted;
}
```

## Anti-patterns

- ❌ Secrets dans le code
- ❌ Pas de validation d'entrées
- ❌ Console.log des données sensibles
- ❌ HTTP au lieu de HTTPS
- ❌ Stockage de mots de passe en clair

## Checklist

- [ ] Inputs validés et sanitizés
- [ ] Mots de passe hashés (bcrypt)
- [ ] JWT avec expiration courte
- [ ] Headers de sécurité (helmet)
- [ ] Secrets en env vars

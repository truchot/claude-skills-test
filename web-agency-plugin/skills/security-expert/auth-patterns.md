# Authentication & Authorization Patterns

## Authentication Methods

| Method | Use Case | Security Level |
|--------|----------|----------------|
| Session + Cookie | Web apps traditionnelles | High |
| JWT (Access + Refresh) | APIs, SPAs, mobile | High (if well implemented) |
| OAuth 2.0 / OIDC | SSO, third-party auth | High |
| API Keys | Machine-to-machine | Medium |
| MFA (TOTP/WebAuthn) | Sensitive apps | Very High |

## JWT Implementation

```typescript
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET!;  // Min 256 bits
const ACCESS_TTL = '15m';
const REFRESH_TTL = '7d';

// Generate
function generateTokens(user: { id: string; role: string }) {
  const accessToken = jwt.sign(
    { userId: user.id, role: user.role },
    JWT_SECRET,
    { expiresIn: ACCESS_TTL, algorithm: 'HS256', issuer: 'myapp', audience: 'myapp-users' }
  );
  const refreshToken = jwt.sign(
    { userId: user.id, type: 'refresh' },
    JWT_SECRET,
    { expiresIn: REFRESH_TTL }
  );
  return { accessToken, refreshToken };
}

// Verify
function verifyToken(token: string) {
  return jwt.verify(token, JWT_SECRET, {
    algorithms: ['HS256'],
    issuer: 'myapp',
    audience: 'myapp-users',
  });
}
```

## Auth Middleware Pattern

```typescript
async function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const header = req.headers.authorization;
  if (!header?.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Missing token' });
  }
  try {
    const payload = verifyToken(header.slice(7));
    req.user = payload;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
}
```

## Password Hashing

```typescript
import { hash, verify } from 'argon2';

// Hash (registration)
const hashedPassword = await hash(password, {
  type: 2,  // argon2id
  memoryCost: 65536,
  timeCost: 3,
  parallelism: 4,
});

// Verify (login)
const isValid = await verify(hashedPassword, password);
```

## RBAC Pattern

```typescript
type Role = 'admin' | 'editor' | 'viewer';
type Permission = 'create' | 'read' | 'update' | 'delete';

const rolePermissions: Record<Role, Permission[]> = {
  admin: ['create', 'read', 'update', 'delete'],
  editor: ['create', 'read', 'update'],
  viewer: ['read'],
};

function authorize(...required: Permission[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    const userPerms = rolePermissions[req.user.role as Role] || [];
    const hasAll = required.every(p => userPerms.includes(p));
    if (!hasAll) return res.status(403).json({ error: 'Forbidden' });
    next();
  };
}

// Usage
app.delete('/api/posts/:id', authMiddleware, authorize('delete'), deletePost);
```

## Rate Limiting

```typescript
import rateLimit from 'express-rate-limit';

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,  // 15 minutes
  max: 5,                      // 5 attempts
  message: { error: 'Too many login attempts, try again later' },
  standardHeaders: true,
  keyGenerator: (req) => req.ip + ':' + req.body.email,
});

app.post('/api/auth/login', authLimiter, loginHandler);
app.post('/api/auth/register', authLimiter, registerHandler);
```

## Session Security Checklist

- [ ] HttpOnly flag on session cookies
- [ ] Secure flag (HTTPS only)
- [ ] SameSite=Strict or Lax
- [ ] Session regeneration on login
- [ ] Session invalidation on logout
- [ ] Absolute session timeout (24h max)
- [ ] Idle session timeout (30min)

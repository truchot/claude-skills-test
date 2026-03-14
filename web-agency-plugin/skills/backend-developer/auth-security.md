# Auth & Security - Backend Developer

## JWT (JSON Web Tokens)
```typescript
// Structure: header.payload.signature
{
  header: { alg: "RS256", typ: "JWT" },
  payload: {
    sub: "user-uuid",       // Subject
    iat: 1704067200,        // Issued at
    exp: 1704070800,        // Expiration (court: 15min-1h)
    iss: "api.example.com", // Issuer
    roles: ["user"],        // Claims customs
    jti: "unique-id"        // Pour revocation
  }
}
```
- Access token: courte duree (15min), en memoire
- Refresh token: longue duree (7-30j), httpOnly cookie, rotation
- Toujours RS256 (asymetrique) en production

## OAuth2 / OpenID Connect
- Authorization Code Flow (web apps avec backend)
- PKCE extension (SPA, mobile)
- Providers: Google, GitHub, Auth0, Keycloak
- Stocker tokens cote serveur, pas dans localStorage

## Session-based
```typescript
// Cookie httpOnly, secure, sameSite
app.use(session({
  secret: process.env.SESSION_SECRET,
  cookie: { httpOnly: true, secure: true, sameSite: 'lax', maxAge: 24 * 60 * 60 * 1000 },
  store: new RedisStore({ client: redisClient }),
}));
```

## Authorization (RBAC)
```typescript
// Role-Based Access Control
const permissions = {
  admin: ['read', 'write', 'delete', 'manage_users'],
  editor: ['read', 'write'],
  viewer: ['read'],
};

function authorize(...requiredPermissions: string[]) {
  return (req, res, next) => {
    const userPerms = permissions[req.user.role] || [];
    const hasAll = requiredPermissions.every(p => userPerms.includes(p));
    if (!hasAll) return res.status(403).json({ error: 'Forbidden' });
    next();
  };
}
```

## OWASP Top 10 - Protections
| Risque | Protection |
|--------|-----------|
| Injection SQL | Requetes parametrees, ORM |
| XSS | Sanitize output, CSP headers |
| CSRF | Tokens CSRF, SameSite cookies |
| Broken Auth | Rate limiting, MFA, rotation tokens |
| Broken Access | RBAC, validation cote serveur |
| Security Misconfig | Headers securite, HTTPS, CORS strict |
| Sensitive Data | Chiffrement, ne pas logger secrets |

## Password Hashing
```typescript
import bcrypt from 'bcrypt';
const hash = await bcrypt.hash(password, 12); // cost factor 12
const isValid = await bcrypt.compare(password, hash);
// Alternative: argon2 (recommande)
```

## Headers securite
```typescript
app.use(helmet()); // Ou manuellement:
// Strict-Transport-Security, X-Content-Type-Options: nosniff
// X-Frame-Options: DENY, Content-Security-Policy
```

## Bonnes pratiques
1. Valider TOUTES les entrees (jamais faire confiance au client)
2. Principe du moindre privilege
3. Logging des evenements d'authentification
4. Rate limiting sur login/register
5. Ne jamais stocker de secrets dans le code
6. HTTPS obligatoire, HSTS header

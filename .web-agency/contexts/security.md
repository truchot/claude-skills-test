# Contexte Sécurité

Connaissances essentielles pour la sécurité applicative.

## OWASP Top 10 - Résumé actionnable

### 1. Injection (SQL, NoSQL, Command)

```typescript
// ❌ Vulnérable
const query = `SELECT * FROM users WHERE id = ${userId}`

// ✅ Sécurisé - Requêtes paramétrées
const user = await prisma.user.findUnique({ where: { id: userId } })

// ❌ Vulnérable - Command injection
exec(`ls ${userInput}`)

// ✅ Sécurisé - Pas d'input utilisateur dans les commandes
exec('ls', [sanitizedPath])
```

### 2. Broken Authentication

```typescript
// ✅ Bonnes pratiques
- Hacher les mots de passe (bcrypt, argon2)
- Rate limiting sur /login
- Session timeout
- MFA si données sensibles
- Ne pas exposer si "email existe déjà"

// Hashage
import { hash, verify } from '@node-rs/argon2'

const hashedPassword = await hash(password)
const isValid = await verify(hashedPassword, password)
```

### 3. Sensitive Data Exposure

```typescript
// ✅ Protéger les données sensibles
- HTTPS partout (HSTS header)
- Ne jamais logger de données sensibles
- Chiffrer les données au repos si nécessaire
- Masquer les données dans les réponses API

// Exclure les champs sensibles
const user = await prisma.user.findUnique({
  where: { id },
  select: {
    id: true,
    email: true,
    name: true,
    // password: false (exclus)
  }
})
```

### 4. XML External Entities (XXE)

```typescript
// Désactiver le parsing d'entités externes
// Utiliser des parsers JSON plutôt que XML quand possible
```

### 5. Broken Access Control

```typescript
// ❌ Vulnérable - IDOR
app.get('/api/users/:id', async (req) => {
  return await getUser(req.params.id) // N'importe qui peut accéder
})

// ✅ Sécurisé - Vérifier les permissions
app.get('/api/users/:id', async (req) => {
  if (req.user.id !== req.params.id && !req.user.isAdmin) {
    throw new ForbiddenError()
  }
  return await getUser(req.params.id)
})
```

### 6. Security Misconfiguration

```typescript
// ✅ Headers de sécurité
const securityHeaders = {
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'X-XSS-Protection': '1; mode=block',
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
  'Content-Security-Policy': "default-src 'self'",
  'Referrer-Policy': 'strict-origin-when-cross-origin',
}

// Next.js - next.config.js
const securityHeaders = [
  { key: 'X-Frame-Options', value: 'DENY' },
  // ...
]

module.exports = {
  async headers() {
    return [{ source: '/:path*', headers: securityHeaders }]
  }
}
```

### 7. Cross-Site Scripting (XSS)

```typescript
// ❌ Vulnérable
element.innerHTML = userInput

// ✅ Sécurisé - React échappe par défaut
<div>{userInput}</div>

// ⚠️ Dangereux - éviter si possible
<div dangerouslySetInnerHTML={{ __html: sanitizedHtml }} />

// Si nécessaire, sanitizer avec DOMPurify
import DOMPurify from 'dompurify'
const clean = DOMPurify.sanitize(dirtyHtml)
```

### 8. Insecure Deserialization

```typescript
// ❌ Ne jamais deserializer des données non fiables directement
eval(userInput)
new Function(userInput)

// ✅ Valider avec Zod avant d'utiliser
const data = schema.parse(JSON.parse(input))
```

### 9. Using Components with Known Vulnerabilities

```bash
# Auditer les dépendances
npm audit
npm audit fix

# Mettre à jour régulièrement
npm update
npm outdated
```

### 10. Insufficient Logging & Monitoring

```typescript
// ✅ Logger les événements de sécurité
log.warn('Failed login attempt', { email, ip: req.ip })
log.error('Unauthorized access attempt', { userId, resource, ip: req.ip })
log.info('Password changed', { userId })
log.info('Admin action', { adminId, action, target })
```

## Authentification JWT

```typescript
// Configuration sécurisée
const JWT_CONFIG = {
  algorithm: 'HS256',
  expiresIn: '1h',      // Tokens courts
  issuer: 'myapp',
}

// Refresh token pattern
function generateTokens(userId: string) {
  const accessToken = jwt.sign({ userId }, ACCESS_SECRET, { expiresIn: '15m' })
  const refreshToken = jwt.sign({ userId }, REFRESH_SECRET, { expiresIn: '7d' })

  // Stocker refreshToken en DB pour pouvoir le révoquer
  await storeRefreshToken(userId, refreshToken)

  return { accessToken, refreshToken }
}

// Cookies sécurisés pour les tokens
res.cookie('refreshToken', refreshToken, {
  httpOnly: true,     // Pas accessible via JS
  secure: true,       // HTTPS only
  sameSite: 'strict', // CSRF protection
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 jours
})
```

## Validation des inputs

```typescript
import { z } from 'zod'

// Schemas stricts
const UserInputSchema = z.object({
  email: z.string().email().max(255),
  password: z.string().min(8).max(100),
  name: z.string().min(1).max(100).regex(/^[\p{L}\s'-]+$/u),
})

// Valider à l'entrée
function createUser(input: unknown) {
  const data = UserInputSchema.parse(input)
  // data est maintenant typé et validé
}

// Regex sûres (éviter ReDoS)
// ❌ Vulnérable à ReDoS
const badRegex = /^(a+)+$/

// ✅ Sûr
const safeRegex = /^[a-z]+$/
```

## Rate Limiting

```typescript
// Avec upstash/ratelimit
import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, '10 s'), // 10 requêtes / 10 secondes
})

async function rateLimitMiddleware(req: Request) {
  const ip = req.headers.get('x-forwarded-for') ?? 'anonymous'
  const { success, limit, reset, remaining } = await ratelimit.limit(ip)

  if (!success) {
    return new Response('Too Many Requests', {
      status: 429,
      headers: {
        'X-RateLimit-Limit': limit.toString(),
        'X-RateLimit-Remaining': remaining.toString(),
        'X-RateLimit-Reset': reset.toString(),
      }
    })
  }
}
```

## CSRF Protection

```typescript
// Avec tokens CSRF
import { createHash, randomBytes } from 'crypto'

function generateCsrfToken(sessionId: string): string {
  const secret = process.env.CSRF_SECRET!
  const token = randomBytes(32).toString('hex')
  const hash = createHash('sha256').update(`${sessionId}${token}${secret}`).digest('hex')
  return `${token}.${hash}`
}

function verifyCsrfToken(sessionId: string, token: string): boolean {
  const [tokenPart, hash] = token.split('.')
  const secret = process.env.CSRF_SECRET!
  const expectedHash = createHash('sha256').update(`${sessionId}${tokenPart}${secret}`).digest('hex')
  return hash === expectedHash
}

// Pour les API, utiliser SameSite cookies + vérifier Origin header
function checkOrigin(req: Request): boolean {
  const origin = req.headers.get('origin')
  const allowedOrigins = ['https://myapp.com']
  return origin ? allowedOrigins.includes(origin) : false
}
```

## Secrets Management

```bash
# Ne jamais commiter
.env
.env.local
*.pem
*.key

# Variables d'environnement
DATABASE_URL=xxx
JWT_SECRET=xxx  # Minimum 32 caractères aléatoires
CSRF_SECRET=xxx

# Générer un secret sécurisé
openssl rand -base64 32
```

## Checklist sécurité

```markdown
## Avant mise en production

### Authentification
- [ ] Mots de passe hachés (bcrypt/argon2)
- [ ] Rate limiting sur login
- [ ] Session timeout configuré
- [ ] Tokens JWT courts (15min-1h)

### Autorisation
- [ ] Vérification des permissions sur chaque endpoint
- [ ] Pas d'IDOR (vérifier ownership)
- [ ] Principle of least privilege

### Données
- [ ] Inputs validés (Zod)
- [ ] Outputs échappés (XSS)
- [ ] Requêtes paramétrées (injection)
- [ ] Données sensibles exclues des logs

### Infrastructure
- [ ] HTTPS forcé (HSTS)
- [ ] Headers de sécurité
- [ ] Secrets en variables d'environnement
- [ ] npm audit clean

### Monitoring
- [ ] Logging des événements sécurité
- [ ] Alertes sur patterns suspects
```

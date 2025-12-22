---
name: securite-applicative
description: Sécurité du code et des applications
---

# Sécurité Applicative

Tu guides l'implémentation de la **sécurité applicative** dans le code.

## Principes Fondamentaux

### 1. Validation des Entrées

**Règle** : Ne jamais faire confiance aux données utilisateur.

```typescript
// ❌ Mauvais
const userId = req.params.id;
db.query(`SELECT * FROM users WHERE id = ${userId}`);

// ✅ Bon - Validation + Paramètres préparés
import { z } from 'zod';

const userIdSchema = z.string().uuid();
const userId = userIdSchema.parse(req.params.id);
db.query('SELECT * FROM users WHERE id = $1', [userId]);
```

### 2. Échappement des Sorties

**Règle** : Toujours encoder les données selon le contexte de sortie.

| Contexte | Encodage | Exemple |
|----------|----------|---------|
| HTML body | HTML entities | `&lt;script&gt;` |
| HTML attribute | Attribute encoding | `&quot;` |
| JavaScript | JS encoding | `\x3c` |
| URL | URL encoding | `%3C` |
| CSS | CSS encoding | `\3c` |

```typescript
// React - échappement automatique
return <div>{userInput}</div>;

// ⚠️ Danger - contourne l'échappement
return <div dangerouslySetInnerHTML={{ __html: userInput }} />;

// Node.js - template manual
import { escape } from 'html-escaper';
res.send(`<div>${escape(userInput)}</div>`);
```

### 3. Authentification Sécurisée

```typescript
// Hashage de mot de passe
import bcrypt from 'bcrypt';

const SALT_ROUNDS = 12;

async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, SALT_ROUNDS);
}

async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

// Politique de mot de passe
const passwordSchema = z.string()
  .min(12, 'Minimum 12 caractères')
  .regex(/[A-Z]/, 'Au moins une majuscule')
  .regex(/[a-z]/, 'Au moins une minuscule')
  .regex(/[0-9]/, 'Au moins un chiffre')
  .regex(/[^A-Za-z0-9]/, 'Au moins un caractère spécial');
```

### 4. Gestion des Sessions

```typescript
// Configuration session sécurisée
import session from 'express-session';

app.use(session({
  name: 'sessionId', // Nom générique
  secret: process.env.SESSION_SECRET!,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,      // Pas accessible en JS
    secure: true,        // HTTPS only
    sameSite: 'strict',  // Protection CSRF
    maxAge: 3600000,     // 1 heure
  }
}));
```

### 5. Protection CSRF

```typescript
// Express avec csurf
import csrf from 'csurf';

app.use(csrf({ cookie: true }));

app.get('/form', (req, res) => {
  res.render('form', { csrfToken: req.csrfToken() });
});

// Dans le template
// <input type="hidden" name="_csrf" value="{{csrfToken}}">
```

### 6. Headers de Sécurité

```typescript
// Helmet pour Express
import helmet from 'helmet';

app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'"], // Éviter si possible
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", "data:", "https:"],
      connectSrc: ["'self'", "https://api.example.com"],
    },
  },
  hsts: {
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true,
  },
}));
```

## Vulnérabilités Courantes

### SQL Injection

```typescript
// ❌ Vulnérable
const query = `SELECT * FROM users WHERE email = '${email}'`;

// ✅ Paramètres préparés
const query = 'SELECT * FROM users WHERE email = $1';
db.query(query, [email]);

// ✅ ORM (TypeORM, Prisma)
const user = await prisma.user.findUnique({
  where: { email }
});
```

### XSS (Cross-Site Scripting)

```typescript
// ❌ XSS stocké
comment.content = userInput; // Stocké tel quel
// Plus tard dans le template : <p>{comment.content}</p>

// ✅ Sanitization (DOMPurify côté serveur)
import createDOMPurify from 'dompurify';
import { JSDOM } from 'jsdom';

const window = new JSDOM('').window;
const DOMPurify = createDOMPurify(window);

comment.content = DOMPurify.sanitize(userInput);
```

### IDOR (Insecure Direct Object Reference)

```typescript
// ❌ Vulnérable - pas de vérification d'autorisation
app.get('/api/orders/:id', async (req, res) => {
  const order = await Order.findById(req.params.id);
  res.json(order);
});

// ✅ Vérification de propriété
app.get('/api/orders/:id', async (req, res) => {
  const order = await Order.findOne({
    _id: req.params.id,
    userId: req.user.id  // Vérifie que c'est SA commande
  });

  if (!order) {
    return res.status(404).json({ error: 'Not found' });
  }

  res.json(order);
});
```

### Path Traversal

```typescript
// ❌ Vulnérable
const filePath = `./uploads/${req.params.filename}`;
res.sendFile(filePath);
// Attaque : GET /files/../../../etc/passwd

// ✅ Validation stricte
import path from 'path';

const UPLOAD_DIR = path.resolve('./uploads');

app.get('/files/:filename', (req, res) => {
  const filename = path.basename(req.params.filename); // Retire les ../
  const filePath = path.join(UPLOAD_DIR, filename);

  // Vérifie que le chemin est dans le dossier autorisé
  if (!filePath.startsWith(UPLOAD_DIR)) {
    return res.status(400).json({ error: 'Invalid path' });
  }

  res.sendFile(filePath);
});
```

## Sécurité WordPress

Référence : `wordpress-gutenberg-expert/wp-core/security-validation`

```php
// Nonces
$nonce = wp_create_nonce('my_action');
// Vérification
if (!wp_verify_nonce($_POST['nonce'], 'my_action')) {
    wp_die('Security check failed');
}

// Sanitization
$title = sanitize_text_field($_POST['title']);
$email = sanitize_email($_POST['email']);
$html = wp_kses_post($_POST['content']);

// Escaping
echo esc_html($user_input);
echo esc_attr($attribute);
echo esc_url($url);
echo wp_kses_post($html_content);
```

## Checklist de Sécurité

### Par Feature

- [ ] Entrées validées (type, format, taille)
- [ ] Sorties échappées selon contexte
- [ ] Authentification requise si nécessaire
- [ ] Autorisation vérifiée (c'est SON ressource ?)
- [ ] CSRF protection pour les mutations
- [ ] Rate limiting si sensible
- [ ] Logs des actions sensibles

### Par Release

- [ ] Dépendances à jour
- [ ] Scan de vulnérabilités passé
- [ ] Secrets non exposés
- [ ] Headers de sécurité configurés
- [ ] HTTPS enforced

## Points d'Escalade

| Situation | Action |
|-----------|--------|
| Vulnérabilité dans le code | Fix + review urgente |
| Librairie vulnérable | Upgrade ou patch |
| Doute sur l'implémentation | Demander code review sécurité |

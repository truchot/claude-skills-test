---
id: antipattern-001
severity: high
tags: [configuration, security, environment]
first_occurrence: 2024-06-15
occurrence_count: 5
---

# Anti-Pattern: Configurations Hardcodées

## Symptôme

**Comment détecter ce problème :**

- URLs de prod/staging en dur dans le code
- Clés API directement dans les fichiers PHP/JS
- Credentials dans wp-config.php versionné
- Chemins absolus hardcodés

**Exemple de manifestation :**

```php
// ❌ MAUVAIS - wp-config.php
define('DB_NAME', 'prod_database');
define('DB_USER', 'admin');
define('DB_PASSWORD', 'SuperSecretPassword123!');
define('DB_HOST', 'mysql.prod.server.com');

define('STRIPE_SECRET_KEY', 'sk_live_abc123...');
```

```javascript
// ❌ MAUVAIS - config.js
const API_URL = 'https://api.prod.client.com';
const API_KEY = 'key_live_xyz789';
```

## Pourquoi c'est un Problème

### Impact Technique

- Impossible de changer d'environnement sans modifier le code
- Conflits Git entre développeurs
- Risque de commit de secrets

### Impact Business

- Secrets exposés = faille de sécurité majeure
- Temps perdu en configuration manuelle
- Risque de déployer config dev en prod

### Coût Typique

| Aspect | Coût estimé |
|--------|-------------|
| Temps de debug | 2-4h par occurrence |
| Risque incident | Élevé |
| Dette technique | +++ |

## Solution

### Correction wp-config.php

```php
// ✅ BON - wp-config.php
// Chargement des variables d'environnement
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();

define('DB_NAME', $_ENV['DB_NAME']);
define('DB_USER', $_ENV['DB_USER']);
define('DB_PASSWORD', $_ENV['DB_PASSWORD']);
define('DB_HOST', $_ENV['DB_HOST']);

// Ou avec getenv() pour compatibilité
define('STRIPE_SECRET_KEY', getenv('STRIPE_SECRET_KEY'));
```

### Fichier .env (gitignored)

```bash
# .env
DB_NAME=local_database
DB_USER=root
DB_PASSWORD=root
DB_HOST=localhost

STRIPE_SECRET_KEY=sk_test_xxx
```

### Fichier .env.example (versionné)

```bash
# .env.example - Template pour nouveaux devs
DB_NAME=
DB_USER=
DB_PASSWORD=
DB_HOST=

STRIPE_SECRET_KEY=
```

## Prévention

### Checklist Avant Action

- [ ] Fichier `.env.example` existe
- [ ] `.env` est dans `.gitignore`
- [ ] Aucun secret dans les fichiers versionnés
- [ ] Variables d'environnement documentées

### Outils de Détection

| Outil | Configuration | Quand |
|-------|---------------|-------|
| git-secrets | AWS patterns | Pre-commit |
| gitleaks | Secrets génériques | Pre-commit + CI |
| PHPCS | Custom sniff | Pre-commit |

### Test Automatisé (Template Projet)

> **Note** : Ce test est un template à implémenter dans chaque projet client, pas dans ce repo.

```javascript
// À créer dans le projet client : tests/no-secrets.test.js
const fs = require('fs');
const path = require('path');

const SECRET_PATTERNS = [
  /sk_live_[a-zA-Z0-9]+/,
  /password\s*=\s*['"][^'"]+['"]/i,
  /api_key\s*=\s*['"][^'"]+['"]/i
];

test('should not have hardcoded secrets', () => {
  const configFile = fs.readFileSync('wp-config.php', 'utf8');

  SECRET_PATTERNS.forEach(pattern => {
    expect(configFile).not.toMatch(pattern);
  });
});
```

## Occurrences Documentées

| Projet | Date | Impact | Résolution |
|--------|------|--------|------------|
| Client A | 2024-06-15 | 2h debug staging | Migration .env |
| Client B | 2024-08-20 | Clé API exposée | Rotation + .env |
| Client C | 2024-09-10 | Conflit Git | Refacto config |
| Client D | 2024-10-05 | Deploy prod cassé | Fix urgent |
| Client E | 2024-11-18 | 4h debug | Standardisation |

## Voir Aussi

- [Pattern: wp-env-optimal](../patterns/wp-env-optimal.md)
- [Pattern: secrets-management](../patterns/secrets-management.md)
- [Decision: when-dotenv-vs-constants](../decisions/when-dotenv-vs-constants.md)

## Références

- [WordPress Environment Types](https://developer.wordpress.org/reference/functions/wp_get_environment_type/)
- [PHP dotenv](https://github.com/vlucas/phpdotenv)
- [12 Factor App - Config](https://12factor.net/config)

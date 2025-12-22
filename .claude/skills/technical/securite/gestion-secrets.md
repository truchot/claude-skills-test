---
name: gestion-secrets
description: Gestion sécurisée des secrets et credentials
---

# Gestion des Secrets

Tu encadres la **gestion sécurisée des secrets** (API keys, passwords, tokens, etc.).

## Principes Fondamentaux

### Ce qu'il ne faut JAMAIS faire

```bash
# ❌ JAMAIS dans le code
const API_KEY = "sk_live_abc123...";

# ❌ JAMAIS commité
# .env avec vrais secrets
API_KEY=sk_live_abc123

# ❌ JAMAIS dans les logs
console.log("Connecting with key:", apiKey);

# ❌ JAMAIS dans les URLs
https://api.example.com?apiKey=sk_live_abc123
```

### Bonnes Pratiques

```bash
# ✅ Variables d'environnement
API_KEY=${API_KEY}

# ✅ Fichiers .env ignorés
# .gitignore
.env
.env.local
.env.*.local

# ✅ Exemple de config (sans secrets)
# .env.example
API_KEY=your_api_key_here
DATABASE_URL=postgresql://user:password@localhost:5432/db
```

## Configuration par Environnement

### Structure des Fichiers

```
project/
├── .env.example        # Template (commité)
├── .env.development    # Local dev (ignoré)
├── .env.test           # Tests (ignoré)
├── .env.production     # Prod (ignoré, ou géré par vault)
└── .gitignore
```

### .env.example

```bash
# Application
NODE_ENV=development
PORT=3000
APP_URL=http://localhost:3000

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/myapp

# Authentication
JWT_SECRET=your-secret-key-min-32-chars
SESSION_SECRET=another-secret-key

# External APIs
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Email
SMTP_HOST=smtp.example.com
SMTP_USER=
SMTP_PASSWORD=

# Storage
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_S3_BUCKET=
```

### Validation avec Zod

```typescript
// config/env.ts
import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']),
  PORT: z.string().transform(Number),
  DATABASE_URL: z.string().url(),
  JWT_SECRET: z.string().min(32),
  STRIPE_SECRET_KEY: z.string().startsWith('sk_'),
});

export const env = envSchema.parse(process.env);
```

## Solutions de Gestion de Secrets

### 1. Variables d'Environnement CI/CD

#### GitHub Actions

```yaml
# .github/workflows/deploy.yml
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Deploy
        env:
          DATABASE_URL: ${{ secrets.DATABASE_URL }}
          API_KEY: ${{ secrets.API_KEY }}
        run: |
          npm run deploy
```

#### GitLab CI

```yaml
# .gitlab-ci.yml
deploy:
  script:
    - echo "Deploying with secrets from CI/CD variables"
  variables:
    DATABASE_URL: $DATABASE_URL  # Défini dans Settings > CI/CD > Variables
```

### 2. Secret Managers Cloud

#### AWS Secrets Manager

```typescript
import { SecretsManagerClient, GetSecretValueCommand } from "@aws-sdk/client-secrets-manager";

const client = new SecretsManagerClient({ region: "eu-west-1" });

async function getSecret(secretName: string): Promise<string> {
  const command = new GetSecretValueCommand({ SecretId: secretName });
  const response = await client.send(command);
  return response.SecretString!;
}

// Usage
const dbCredentials = JSON.parse(await getSecret("prod/database"));
```

#### HashiCorp Vault

```typescript
import Vault from "node-vault";

const vault = Vault({
  endpoint: process.env.VAULT_ADDR,
  token: process.env.VAULT_TOKEN,
});

async function getSecret(path: string): Promise<Record<string, string>> {
  const result = await vault.read(path);
  return result.data.data;
}

// Usage
const secrets = await getSecret("secret/data/myapp/database");
```

### 3. Doppler (SaaS)

```bash
# Installation
brew install dopplerhq/cli/doppler

# Configuration
doppler setup

# Run avec injection de secrets
doppler run -- npm start

# Dans CI/CD
doppler run --token $DOPPLER_TOKEN -- npm run deploy
```

## Rotation des Secrets

### Politique de Rotation

| Type de Secret | Fréquence | Déclencheur |
|----------------|-----------|-------------|
| Mots de passe DB | 90 jours | Automatique |
| API Keys | 180 jours | Automatique |
| JWT Secrets | 30 jours | Automatique |
| Service Accounts | 365 jours | Automatique |
| Après incident | Immédiat | Manuel |

### Procédure de Rotation

```
1. Générer nouveau secret
         │
         ▼
2. Déployer avec les deux secrets valides
         │
         ▼
3. Migrer les dépendances vers nouveau secret
         │
         ▼
4. Invalider l'ancien secret
         │
         ▼
5. Supprimer l'ancien secret du config
```

## Détection de Secrets Exposés

### Git Hooks (pre-commit)

```yaml
# .pre-commit-config.yaml
repos:
  - repo: https://github.com/Yelp/detect-secrets
    rev: v1.4.0
    hooks:
      - id: detect-secrets
        args: ['--baseline', '.secrets.baseline']
```

### GitHub Secret Scanning

Activé automatiquement sur les repos publics GitHub.

### Gitleaks

```bash
# Installation
brew install gitleaks

# Scan du repo
gitleaks detect --source . --verbose

# Dans CI
gitleaks detect --source . --redact --exit-code 1
```

## Secrets WordPress

```php
// wp-config.php - Ne pas commiter les vrais secrets

// ✅ Charger depuis l'environnement
define('DB_NAME', getenv('DB_NAME'));
define('DB_USER', getenv('DB_USER'));
define('DB_PASSWORD', getenv('DB_PASSWORD'));

// ✅ Salts - régénérer pour chaque install
define('AUTH_KEY', getenv('AUTH_KEY'));
define('SECURE_AUTH_KEY', getenv('SECURE_AUTH_KEY'));
// etc.

// Générer les salts : https://api.wordpress.org/secret-key/1.1/salt/
```

## Checklist Secrets

### Setup Projet

- [ ] .env.example créé et commité
- [ ] .env dans .gitignore
- [ ] Validation des env vars au démarrage
- [ ] Secret manager configuré (si prod)
- [ ] Gitleaks/detect-secrets en pre-commit

### Déploiement

- [ ] Secrets injectés par CI/CD ou secret manager
- [ ] Pas de secrets en dur dans le code
- [ ] Pas de secrets dans les logs
- [ ] Rotation configurée si applicable

### Incident

- [ ] Identifier les secrets exposés
- [ ] Révoquer immédiatement
- [ ] Générer nouveaux secrets
- [ ] Redéployer
- [ ] Auditer les accès

## Points d'Escalade

| Situation | Action |
|-----------|--------|
| Secret commité | Révoquer, nettoyer historique, nouveau secret |
| Secret en prod exposé | Rotation immédiate, audit accès |
| Accès secret compromis | Rotation + investigation |

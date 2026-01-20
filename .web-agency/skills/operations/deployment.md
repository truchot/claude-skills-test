# Agent : Deployment

Déployer les applications en staging et production.

## Rôle

Tu gères le processus de déploiement de bout en bout : préparation, exécution, vérification et communication.

## Input attendu

```yaml
from: "skills/quality/code-review.md"
data:
  - Code approuvé
  - Tests passants
  - Environnement cible (staging/production)
```

## Process

### 1. Pré-déploiement

```yaml
pre_deploy_checklist:
  code:
    - [ ] PR mergée dans main
    - [ ] Tous les tests CI passent
    - [ ] Build réussit
    - [ ] Pas de vulnérabilités critiques (npm audit)

  database:
    - [ ] Migrations testées en staging
    - [ ] Rollback possible
    - [ ] Backup récent disponible

  config:
    - [ ] Variables d'environnement à jour
    - [ ] Secrets configurés
    - [ ] Feature flags positionnés

  team:
    - [ ] Quelqu'un disponible pour surveiller
    - [ ] Plan de rollback connu
    - [ ] Communication prévue
```

### 2. Déploiement Vercel (Next.js)

```bash
# Déploiement staging (preview)
vercel

# Déploiement production
vercel --prod

# Avec variables d'environnement
vercel --prod --env DATABASE_URL=xxx
```

```yaml
vercel_config:
  # vercel.json
  {
    "buildCommand": "npm run build",
    "outputDirectory": ".next",
    "framework": "nextjs",
    "regions": ["cdg1"],
    "env": {
      "DATABASE_URL": "@database-url",
      "NEXTAUTH_SECRET": "@nextauth-secret"
    }
  }

github_integration:
  - Push sur main → Deploy production auto
  - Push sur autre branche → Deploy preview auto
  - PR → Commentaire avec URL preview
```

### 3. Déploiement Railway (Backend/DB)

```bash
# Installation
npm install -g @railway/cli

# Login et link
railway login
railway link

# Déploiement
railway up

# Variables
railway variables set DATABASE_URL=xxx
railway variables set JWT_SECRET=xxx

# Logs
railway logs
```

```yaml
railway_config:
  # railway.json ou Procfile
  web: npm start

  # Nixpacks auto-détecte Node.js
  # Ou Dockerfile personnalisé

healthcheck:
  path: "/api/health"
  interval: 30s
  timeout: 5s
```

### 4. Déploiement Docker/Fly.io

```dockerfile
# Dockerfile
FROM node:20-alpine AS base

# Install dependencies
FROM base AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

# Build
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Production
FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production

COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

EXPOSE 3000
CMD ["node", "server.js"]
```

```bash
# Fly.io
fly launch
fly deploy
fly secrets set DATABASE_URL=xxx

# Docker local
docker build -t myapp .
docker run -p 3000:3000 myapp
```

### 5. Migrations base de données

```bash
# Prisma - Vérifier le statut
npx prisma migrate status

# Appliquer les migrations (production)
npx prisma migrate deploy

# Rollback manuel si nécessaire
# (Prisma n'a pas de rollback auto, créer une migration inverse)
npx prisma migrate dev --name rollback_xxx
```

```yaml
migration_safety:
  before:
    - Backup de la base
    - Test en staging
    - Vérifier la réversibilité

  during:
    - Surveiller les erreurs
    - Temps de migration raisonnable

  after:
    - Vérifier l'intégrité des données
    - Tester les fonctionnalités impactées
```

### 6. Smoke tests post-déploiement

```yaml
smoke_tests:
  critical:
    - name: "Homepage"
      url: "/"
      expect: 200

    - name: "API Health"
      url: "/api/health"
      expect: { status: "healthy" }

    - name: "Authentication"
      action: "Login flow"
      expect: "Success"

    - name: "Core Feature"
      action: "Main user journey"
      expect: "Works"

  timing:
    - Exécuter immédiatement après déploiement
    - Durée max : 5 minutes
    - Échec → Rollback immédiat
```

### 7. Rollback

```yaml
rollback_procedure:
  vercel:
    command: "vercel rollback"
    time: "< 30 secondes"

  railway:
    command: "railway rollback"
    # Ou redéployer un commit précédent

  database:
    # Si migration était destructive
    action: "Restaurer backup + déployer version précédente"

  communication:
    - Alerter l'équipe
    - Documenter la raison
    - Planifier le fix
```

### 8. Communication

```yaml
deploy_announcement:
  before:
    channel: "#deployments"
    message: |
      🚀 Deploying to [staging|production]
      Version: [commit hash]
      Changes:
      - [Feature 1]
      - [Fix 1]
      ETA: 5 minutes

  after_success:
    channel: "#deployments"
    message: |
      ✅ Deployed to [staging|production]
      URL: [url]
      All smoke tests passed

  after_failure:
    channel: "#deployments"
    message: |
      ❌ Deployment failed
      Error: [error message]
      Rolling back...

  rollback:
    channel: "#deployments"
    message: |
      ⚠️ Rollback completed
      Reason: [reason]
      Investigating...
```

## Output

```yaml
deployment_result:
  environment: "production"
  status: "success"
  timestamp: "2024-01-15T14:30:00Z"

  urls:
    production: "https://example.com"
    preview: null

  artifacts:
    commit: "abc1234"
    build_id: "bld_xxx"

  migrations:
    applied: ["20240115_add_user_role"]
    status: "success"

  smoke_tests:
    total: 5
    passed: 5
    failed: 0

  monitoring:
    error_rate: "0.0%"
    response_time: "120ms"
    status: "healthy"

  rollback_available: true

next_steps:
  - "Monitor for 30 minutes"
  - "Update changelog"
  - "Notify stakeholders"
```

## Checklist de clôture

```markdown
## Déploiement terminé

### Technique
- [ ] Application accessible
- [ ] Smoke tests passés
- [ ] Pas d'erreurs dans les logs
- [ ] Métriques normales

### Documentation
- [ ] CHANGELOG mis à jour
- [ ] Tag git créé
- [ ] Release notes rédigées

### Communication
- [ ] Équipe notifiée
- [ ] Client notifié (si applicable)
- [ ] Documentation mise à jour
```

## Règles

```
✓ Toujours déployer en staging d'abord
✓ Vérifier les smoke tests avant de quitter
✓ Avoir un plan de rollback
✓ Communiquer avant et après
✗ Pas de déploiement vendredi après-midi
✗ Pas de déploiement sans surveillance
```

## Escalade

```yaml
escalate_if:
  - Rollback nécessaire
  - Erreurs inexpliquées post-deploy
  - Performance dégradée
  - Incident sécurité détecté
```

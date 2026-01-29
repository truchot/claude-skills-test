# Workflow : Déploiement

Chaîne de production pour la mise en production.

## Déclencheurs

- Feature prête à déployer
- Hotfix validé
- Release planifiée
- Rollback nécessaire

## Étapes

```
┌─────────────────────────────────────────────────────────────────┐
│  1. PRE-DEPLOY                                                   │
│     Vérifications avant déploiement                             │
│     Agent: skills/operations/deployment.md                       │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│  2. BUILD                                                        │
│     Construire l'artefact de déploiement                        │
│     Agent: skills/operations/ci-cd.md                            │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│  3. STAGING                                                      │
│     Déployer en environnement de staging                        │
│     Agent: skills/operations/deployment.md                       │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│  4. SMOKE TEST                                                   │
│     Tests de fumée sur staging                                  │
│     Agent: skills/quality/testing.md                             │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
                    [VALIDATION STAGING OK ?]
                              │
                      ┌───────┴───────┐
                      │               │
                     NON             OUI
                      │               │
                      ▼               ▼
                  [ROLLBACK]          │
                              ┌───────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│  5. PRODUCTION                                                   │
│     Déployer en production                                      │
│     Agent: skills/operations/deployment.md                       │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│  6. VERIFY                                                       │
│     Vérifier le déploiement production                          │
│     Agent: skills/operations/monitoring.md                       │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│  7. ANNOUNCE                                                     │
│     Communiquer le déploiement                                  │
│     Agent: skills/project/communication.md                       │
└─────────────────────────────────────────────────────────────────┘
```

## Détail des étapes

### 1. Pre-Deploy

**Agent** : `skills/operations/deployment.md`

**Checklist pré-déploiement** :

```markdown
## Code
- [ ] Branche à jour avec main
- [ ] Tous les tests passent
- [ ] Code review approuvée
- [ ] Pas de conflits de merge

## Base de données
- [ ] Migrations prêtes
- [ ] Migrations testées en staging
- [ ] Rollback des migrations possible
- [ ] Backup récent disponible

## Configuration
- [ ] Variables d'environnement à jour
- [ ] Secrets configurés
- [ ] Feature flags configurés

## Dépendances
- [ ] Pas de vulnérabilités critiques (npm audit)
- [ ] Dépendances externes disponibles
- [ ] APIs tierces fonctionnelles

## Équipe
- [ ] Personne disponible pour surveiller
- [ ] Plan de rollback connu
- [ ] Communication prévue
```

### 2. Build

**Agent** : `skills/operations/ci-cd.md`

```yaml
build_steps:
  - name: "Install dependencies"
    command: "npm ci"

  - name: "Run linting"
    command: "npm run lint"

  - name: "Run type check"
    command: "npm run type-check"

  - name: "Run tests"
    command: "npm test"

  - name: "Build application"
    command: "npm run build"

  - name: "Generate artifacts"
    output: "dist/ or .next/"

validation:
  - All steps passed
  - Artifacts generated
  - No warnings (or documented)
```

### 3. Staging

**Agent** : `skills/operations/deployment.md`

```yaml
staging_deployment:
  environment: staging
  url: "https://staging.example.com"

  steps:
    - name: "Deploy to staging"
      method: "vercel deploy --env staging" # ou autre

    - name: "Run migrations"
      command: "npx prisma migrate deploy"

    - name: "Warm up cache"
      command: "curl staging.example.com"

  verification:
    - Deployment successful
    - Application starts
    - No errors in logs
```

### 4. Smoke Test

**Agent** : `skills/quality/testing.md`

```yaml
smoke_tests:
  critical_paths:
    - name: "Homepage loads"
      url: "/"
      expect: 200

    - name: "API health"
      url: "/api/health"
      expect: { status: "healthy" }

    - name: "Auth flow"
      steps:
        - Login page loads
        - Can submit form

    - name: "Core feature"
      steps:
        - Feature accessible
        - Basic flow works

  performance:
    - LCP < 3s
    - No console errors

  duration: "5-10 minutes max"
```

### 5. Production

**Agent** : `skills/operations/deployment.md`

```yaml
production_deployment:
  environment: production
  url: "https://example.com"

  strategy: "rolling" # ou blue-green, canary

  steps:
    - name: "Create backup point"
      action: "Tag current version for rollback"

    - name: "Deploy to production"
      method: "vercel deploy --prod"

    - name: "Run migrations"
      command: "npx prisma migrate deploy"
      caution: "Point of no return si migration destructive"

    - name: "Verify deployment"
      checks:
        - HTTP 200 on /
        - Health check passes
        - No error spike in logs

  rollback:
    trigger: "Error rate > 5% OR manual decision"
    command: "vercel rollback"
    time_limit: "< 5 minutes"
```

### 6. Verify

**Agent** : `skills/operations/monitoring.md`

```yaml
post_deploy_monitoring:
  duration: "30 minutes minimum"

  watch:
    - Error rate (should stay < baseline)
    - Response time (should stay < baseline)
    - CPU/Memory usage
    - Active users/sessions

  alerts:
    - Error rate > 1%
    - Response time > 2x baseline
    - Any 5xx errors

  logs:
    - Check for new error patterns
    - Check for warnings

  decision:
    stable: "Continue monitoring passively"
    issues: "Investigate or rollback"
```

### 7. Announce

**Agent** : `skills/project/communication.md`

```yaml
communication:
  internal:
    channel: "#deployments"
    message: |
      ✅ Deployed to production
      Version: [version]
      Changes: [summary]

  external: # Si applicable
    to: "Client / Users"
    message: |
      Nouvelle version disponible
      - [Feature 1]
      - [Feature 2]

  documentation:
    - Update CHANGELOG
    - Update release notes
    - Tag version in git
```

## Rollback

```yaml
rollback_procedure:
  decision:
    triggers:
      - Error rate spike
      - Critical bug discovered
      - Performance degradation
      - Manual decision

  steps:
    - name: "Announce rollback"
      action: "Notify team immediately"

    - name: "Execute rollback"
      command: "vercel rollback" # ou git revert + deploy

    - name: "Verify rollback"
      checks:
        - Previous version active
        - Errors stopped
        - System stable

    - name: "Database rollback"
      caution: "Only if migration was the issue"
      action: "Apply reverse migration"

    - name: "Post-mortem"
      action: "Document what happened"

  time_target: "< 10 minutes from decision to stable"
```

## Fenêtres de déploiement

```yaml
recommended:
  best: "Mardi-Jeudi, 10h-16h"
  avoid: "Vendredi après-midi, veille de férié"
  never: "Weekend sans astreinte"

exceptions:
  hotfix_p1: "Immédiatement, quelle que soit l'heure"
  hotfix_p2: "Dans les heures ouvrées"
```

## Checklist de clôture

```markdown
## Déploiement terminé

- [ ] Production accessible
- [ ] Smoke tests passés
- [ ] Monitoring en place
- [ ] Équipe notifiée
- [ ] CHANGELOG mis à jour
- [ ] Tag git créé
- [ ] Documentation mise à jour
```

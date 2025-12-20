---
name: cicd-expert
description: Expert en principes CI/CD et automatisation des pipelines
---

# Expert CI/CD

Tu es spécialisé dans les **principes d'intégration continue** (CI) et de **déploiement continu** (CD), indépendamment des outils spécifiques.

## Ton Domaine

- Principes CI/CD
- Structure des pipelines
- Stratégies de tests automatisés
- Stratégies de déploiement
- Bonnes pratiques d'automatisation

> **Note** : Ce skill couvre les principes généraux. Pour les implémentations spécifiques (GitHub Actions pour WordPress, Vercel pour React, etc.), consulter les skills technologiques dédiés.

## CI vs CD

```
┌─────────────────────────────────────────────────────────────────┐
│                    CONTINUOUS INTEGRATION (CI)                  │
│                                                                 │
│   Code Push ──▶ Build ──▶ Tests ──▶ Quality Checks ──▶ Artifact│
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│                    CONTINUOUS DELIVERY (CD)                     │
│                                                                 │
│   Artifact ──▶ Deploy Staging ──▶ Tests E2E ──▶ Approval ──▶  │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│                    CONTINUOUS DEPLOYMENT                        │
│                                                                 │
│   ──▶ Deploy Production (automatique, sans approval manuelle)  │
└─────────────────────────────────────────────────────────────────┘
```

## Pipeline Type

```yaml
# Structure conceptuelle d'un pipeline

stages:
  - setup      # Préparation environnement
  - build      # Compilation, bundling
  - test       # Tests automatisés
  - quality    # Analyse de code
  - security   # Scan de sécurité
  - deploy     # Déploiement
  - notify     # Notifications

# Exécution parallèle quand possible
#
#              ┌─── lint ───┐
#              │            │
# setup ─ build ─├─── test ──├─ security ─ deploy
#              │            │
#              └─ typecheck ┘
```

## Étapes Détaillées

### 1. Setup

```yaml
# Objectif: Préparer l'environnement d'exécution

setup:
  steps:
    - checkout: Récupérer le code source
    - cache: Restaurer les dépendances cachées
    - install: Installer les dépendances
    - cache: Sauvegarder pour les prochains runs
```

### 2. Build

```yaml
# Objectif: Compiler/bundler l'application

build:
  steps:
    - compile: Transpiler le code (TypeScript, Babel)
    - bundle: Créer les bundles (Webpack, Vite, esbuild)
    - optimize: Minifier, tree-shaking
    - artifact: Sauvegarder les fichiers de build
```

### 3. Test

```yaml
# Objectif: Valider le code

test:
  parallel:
    - unit: Tests unitaires (rapides, isolés)
    - integration: Tests d'intégration (avec BDD, APIs)
    - e2e: Tests end-to-end (navigateur, critiques uniquement)
```

### 4. Quality

```yaml
# Objectif: Maintenir la qualité du code

quality:
  parallel:
    - lint: Vérifier les règles de style
    - typecheck: Vérifier les types (TypeScript)
    - coverage: Rapport de couverture de tests
    - complexity: Analyse de complexité
```

### 5. Security

```yaml
# Objectif: Identifier les vulnérabilités

security:
  parallel:
    - dependencies: Audit des dépendances (npm audit, Snyk)
    - sast: Analyse statique du code
    - secrets: Détection de secrets commitées
```

### 6. Deploy

```yaml
# Objectif: Déployer l'application

deploy:
  environments:
    staging:
      trigger: push to main
      auto: true
    production:
      trigger: tag v*
      auto: false
      requires: approval
```

## Stratégies de Déploiement

### 1. Rolling Deployment

```
Instances: [v1] [v1] [v1] [v1]
                     ↓
           [v2] [v1] [v1] [v1]  # 1 instance mise à jour
                     ↓
           [v2] [v2] [v1] [v1]  # 2 instances
                     ↓
           [v2] [v2] [v2] [v1]  # 3 instances
                     ↓
           [v2] [v2] [v2] [v2]  # Terminé

✅ Pas de downtime
✅ Rollback possible
❌ Deux versions en parallèle temporairement
```

### 2. Blue-Green Deployment

```
         Load Balancer
              │
    ┌─────────┴─────────┐
    ▼                   ▼
┌───────┐           ┌───────┐
│ BLUE  │ (active)  │ GREEN │ (idle)
│  v1   │           │  v2   │
└───────┘           └───────┘

Après validation:
              │
    ┌─────────┴─────────┐
    ▼                   ▼
┌───────┐           ┌───────┐
│ BLUE  │ (idle)    │ GREEN │ (active)
│  v1   │           │  v2   │
└───────┘           └───────┘

✅ Rollback instantané (switch back)
✅ Test en conditions réelles avant switch
❌ Double infrastructure
```

### 3. Canary Deployment

```
           100% trafic
               │
               ▼
           ┌───────┐
           │  v1   │
           └───────┘

     90% trafic    10% trafic
         │              │
         ▼              ▼
     ┌───────┐      ┌───────┐
     │  v1   │      │  v2   │ (canary)
     └───────┘      └───────┘

Si OK, augmenter progressivement v2
Si KO, rollback instantané

✅ Risque limité
✅ Validation avec trafic réel
❌ Complexité de setup
❌ Monitoring nécessaire
```

### 4. Feature Flags

```javascript
// Déployer le code, activer la feature progressivement

if (featureFlags.isEnabled('new-checkout', { userId })) {
  return <NewCheckout />;
} else {
  return <OldCheckout />;
}

// Activation progressive:
// - 0% users → Test interne
// - 5% users → Beta testers
// - 25% users → Early adopters
// - 100% users → General availability
```

## Bonnes Pratiques CI/CD

### DO ✅

1. **Fail Fast** : Exécuter les tests rapides en premier
2. **Paralléliser** : Maximiser l'utilisation des runners
3. **Cacher** : Réutiliser node_modules, build cache
4. **Petit commits** : Intégration fréquente = moins de conflits
5. **Tests fiables** : Pas de tests flaky
6. **Rollback prévu** : Toujours pouvoir revenir en arrière

### DON'T ❌

1. **Skipper les tests** : `git push --no-verify`
2. **Merge sans CI** : Bypass de la validation
3. **Secrets en clair** : Dans le code ou les logs
4. **Ignorer les échecs** : "Ça passera la prochaine fois"
5. **Déployer le vendredi** : Sans capacité de réaction

## Métriques CI/CD

### DORA Metrics

| Métrique | Description | Elite |
|----------|-------------|-------|
| **Deployment Frequency** | Fréquence des déploiements | Plusieurs/jour |
| **Lead Time for Changes** | Temps entre commit et prod | < 1 heure |
| **Change Failure Rate** | % de déploiements causant incidents | < 15% |
| **Time to Restore** | Temps pour résoudre un incident | < 1 heure |

### Métriques Pipeline

```
Pipeline Duration: < 10 minutes (idéal)
Build Time: < 2 minutes
Test Time: < 5 minutes
Deploy Time: < 2 minutes

Cache Hit Rate: > 90%
Flaky Test Rate: < 1%
First-Time Fix Rate: > 95%
```

## Structure de Pipeline Recommandée

### Pour un Projet Type

```yaml
# Conceptuel - adapter à l'outil utilisé

name: CI/CD Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  # Job 1: Installation et cache
  setup:
    runs-on: ubuntu-latest
    steps:
      - checkout
      - setup-node with cache
      - install dependencies
      - cache node_modules

  # Job 2: Qualité (parallèle)
  quality:
    needs: setup
    parallel:
      lint:
        - run eslint
      typecheck:
        - run tsc --noEmit
      format:
        - run prettier --check

  # Job 3: Tests (parallèle)
  test:
    needs: setup
    parallel:
      unit:
        - run vitest --coverage
      integration:
        - run vitest --config vitest.integration.config.ts

  # Job 4: Build
  build:
    needs: [quality, test]
    steps:
      - run build
      - upload artifact

  # Job 5: Deploy Staging (auto sur main)
  deploy-staging:
    needs: build
    if: branch == main
    environment: staging
    steps:
      - deploy to staging
      - run smoke tests

  # Job 6: Deploy Production (manuel ou tag)
  deploy-production:
    needs: deploy-staging
    if: tag == v*
    environment:
      name: production
      requires: approval
    steps:
      - deploy to production
      - run smoke tests
      - notify team
```

## Notifications

### Quand Notifier

| Événement | Canal | Urgence |
|-----------|-------|---------|
| Build failed | Slack + Email auteur | Haute |
| Deploy staging OK | Slack channel | Info |
| Deploy prod OK | Slack channel | Info |
| Deploy prod FAILED | Slack + PagerDuty | Critique |
| Security issue | Email security team | Haute |

### Contenu d'une Notification

```markdown
🔴 Pipeline Failed

**Repository**: myorg/myapp
**Branch**: feature/user-auth
**Commit**: abc1234 - "feat: add login page"
**Author**: @developer

**Failed Job**: test-unit
**Error**: 2 tests failed

[View Pipeline](https://...) | [View Logs](https://...)
```

## Checklist Pipeline

- [ ] Tous les tests passent avant merge
- [ ] Couverture de code minimum définie
- [ ] Lint et typecheck automatiques
- [ ] Build vérifié avant déploiement
- [ ] Scan de sécurité des dépendances
- [ ] Déploiement staging automatique
- [ ] Smoke tests post-déploiement
- [ ] Rollback documenté et testé
- [ ] Notifications configurées
- [ ] Secrets sécurisés (pas en clair)

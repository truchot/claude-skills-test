---
id: antipattern-004
severity: high
tags: [deployment, workflow, environment]
first_occurrence: 2024-02-20
occurrence_count: 3
---

# Anti-Pattern: Déploiement Direct en Production

## Symptôme

**Comment détecter ce problème :**

- Pas d'environnement staging
- Push direct sur `main` → prod
- Tests uniquement en local
- Client découvre les bugs en premier

**Exemple de manifestation :**

```bash
# ❌ Workflow sans staging
git push origin main  # → Déploie directement en prod

# ❌ Pas de branche staging
git branch -a
# * main
# remotes/origin/main
# (Pas de staging/preprod)
```

## Pourquoi c'est un Problème

### Impact Technique

- Bugs découverts en production
- Pas de validation avant mise en ligne
- Rollback complexe et risqué
- Tests d'intégration impossibles

### Impact Business

- **Expérience utilisateur** dégradée
- **SEO impacté** par erreurs 500
- **Confiance client** réduite
- **Temps de correction** en urgence

### Coût Typique

| Aspect | Coût estimé |
|--------|-------------|
| Hotfix urgent | 2-4h |
| Risque incident | Élevé |
| Impact réputation | Moyen |
| Stress équipe | Élevé |

## Solution

### Infrastructure Minimale

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   LOCAL     │────▶│   STAGING   │────▶│ PRODUCTION  │
│   (dev)     │     │  (preprod)  │     │   (prod)    │
└─────────────┘     └─────────────┘     └─────────────┘
     git push           Review              Merge
     feature/*          + Tests             main
```

### Workflow Git

```bash
# Développement
git checkout -b feature/new-feature
# ... développement ...
git push origin feature/new-feature

# Review sur staging (automatique via CI)
# PR: feature/* → staging

# Validation client sur staging
# https://staging.client.com

# Production (après validation)
# PR: staging → main
```

### Configuration CI/CD

```yaml
# .github/workflows/deploy.yml
name: Deploy

on:
  push:
    branches: [staging, main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Deploy to staging
        if: github.ref == 'refs/heads/staging'
        run: |
          ssh staging "cd /var/www && git pull origin staging"

      - name: Deploy to production
        if: github.ref == 'refs/heads/main'
        run: |
          ssh prod "cd /var/www && git pull origin main"
```

## Prévention

### Checklist Projet

- [ ] Environnement staging configuré
- [ ] DNS staging (staging.client.com ou preprod.client.com)
- [ ] CI/CD avec déploiement automatique staging
- [ ] Protection branche `main` (review requise)
- [ ] URL staging communiquée au client

### Protection de Branche

```yaml
# GitHub Branch Protection Rules
main:
  require_pull_request: true
  required_approvals: 1
  require_status_checks: true
  required_checks:
    - tests
    - lint
```

## Occurrences Documentées

| Projet | Date | Impact | Résolution |
|--------|------|--------|------------|
| Client A | 2024-02-20 | Bug formulaire contact 2j | Hotfix + setup staging |
| Client B | 2024-06-15 | CSS cassé homepage 4h | Rollback + staging |
| Client C | 2024-10-08 | API down 1h | Setup staging complet |

## Voir Aussi

- [Pattern: staging-protection](../patterns/staging-protection.md)
- [Anti-pattern: prod-without-backup](./prod-without-backup.md)
- [Anti-pattern: skip-tests-ci](./skip-tests-ci.md)

## Références

- [GitFlow Workflow](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow)
- [GitHub Flow](https://docs.github.com/en/get-started/quickstart/github-flow)

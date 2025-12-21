---
name: cicd-orchestrator
description: Orchestrateur pour les principes CI/CD et automatisation
---

# Orchestrateur CI/CD

Ce module coordonne la mise en place de l'intégration et du déploiement continus.

## Agents Spécialisés

| Agent | Responsabilité |
|-------|----------------|
| `ci-principles.md` | Pipelines de validation, tests, qualité |
| `cd-principles.md` | Déploiement, environnements, rollback |
| `deployment-strategies.md` | Rolling, Blue-Green, Canary, Feature Flags |

## Vue d'Ensemble

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

## Pipeline Type Recommandé

```yaml
stages:
  - setup      # Préparation
  - build      # Compilation
  - test       # Tests (parallel)
  - quality    # Lint, typecheck
  - security   # Audit, SAST
  - deploy     # Staging → Prod
```

## Bonnes Pratiques

### DO ✅

1. **Fail Fast** : Exécuter les tests rapides en premier
2. **Paralléliser** : Maximiser l'utilisation des runners
3. **Cacher** : Réutiliser node_modules, build cache
4. **Rollback** : Toujours pouvoir revenir en arrière

### DON'T ❌

1. **Skipper les tests** : `git push --no-verify`
2. **Merge sans CI** : Bypass de la validation
3. **Secrets en clair** : Dans le code ou les logs
4. **Déployer le vendredi** : Sans capacité de réaction

## Métriques Clés (DORA)

| Métrique | Elite | Good |
|----------|-------|------|
| Deploy Frequency | Plusieurs/jour | 1/semaine |
| Lead Time | < 1 heure | < 1 semaine |
| Change Failure Rate | < 15% | < 30% |
| Time to Restore | < 1 heure | < 1 jour |

## Agents à Consulter

- Pour les pipelines de build/test → `ci-principles.md`
- Pour le déploiement → `cd-principles.md`
- Pour les stratégies de deploy → `deployment-strategies.md`

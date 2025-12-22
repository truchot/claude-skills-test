---
name: metriques-qualite
description: Suivi des métriques de qualité technique
---

# Métriques de Qualité

Tu assures le **suivi des métriques de qualité** technique tout au long du projet.

## Catégories de Métriques

### 1. Couverture de Tests

| Métrique | Cible | Outil |
|----------|-------|-------|
| Coverage global | > 80% | Jest, PHPUnit |
| Coverage branches | > 70% | Idem |
| Coverage fonctions | > 85% | Idem |
| Coverage lignes | > 80% | Idem |

```bash
# Générer rapport de coverage
npm run test -- --coverage
```

### 2. Qualité du Code

| Métrique | Cible | Outil |
|----------|-------|-------|
| Code smells | < 5/kloc | SonarQube |
| Duplication | < 3% | SonarQube |
| Complexité cyclomatique | < 10/fonction | ESLint, SonarQube |
| Maintainability Index | > 20 | SonarQube |
| Technical Debt Ratio | < 5% | SonarQube |

### 3. Sécurité

| Métrique | Cible | Outil |
|----------|-------|-------|
| Vulnérabilités critiques | 0 | Snyk, npm audit |
| Vulnérabilités hautes | 0 | Snyk, npm audit |
| Security Hotspots | Reviewed | SonarQube |
| Dépendances outdated | < 20% | Renovate |

### 4. Performance (Core Web Vitals)

| Métrique | Cible | Outil |
|----------|-------|-------|
| LCP (Largest Contentful Paint) | < 2.5s | Lighthouse |
| FID (First Input Delay) | < 100ms | Lighthouse |
| CLS (Cumulative Layout Shift) | < 0.1 | Lighthouse |
| TTFB (Time To First Byte) | < 600ms | WebPageTest |
| Score Lighthouse | > 90 | Lighthouse |

### 5. Fiabilité

| Métrique | Cible | Outil |
|----------|-------|-------|
| Bugs en production | < 5/mois | Jira, Sentry |
| MTTR (Mean Time To Recovery) | < 4h | Incident tracking |
| Disponibilité | > 99.9% | Monitoring |
| Taux d'erreur API | < 0.1% | APM |

## Dashboard de Qualité

```
┌─────────────────────────────────────────────────────────────┐
│                  QUALITÉ TECHNIQUE                          │
│                  Projet: [Nom] - Sprint [X]                 │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Code Coverage    [████████░░] 82%  ✅                      │
│  Tests Passing    [██████████] 100% ✅                      │
│  Code Smells      [█░░░░░░░░░] 12   🟠 (target: <10)       │
│  Duplication      [░░░░░░░░░░] 1.5% ✅                      │
│  Security Issues  [░░░░░░░░░░] 0    ✅                      │
│  Lighthouse       [████████░░] 87   🟠 (target: 90)        │
│  Tech Debt        [██░░░░░░░░] 15h  🟠                      │
│                                                             │
│  Trend: ↗️ Amélioration vs sprint précédent                 │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## Configuration SonarQube

### Quality Gate

```yaml
# sonar-project.properties
sonar.projectKey=my-project
sonar.organization=my-org

sonar.sources=src
sonar.tests=src
sonar.test.inclusions=**/*.test.ts,**/*.spec.ts
sonar.coverage.exclusions=**/*.test.ts,**/*.spec.ts

sonar.javascript.lcov.reportPaths=coverage/lcov.info

# Quality Gate (à configurer dans SonarQube)
# - Coverage on New Code >= 80%
# - Duplicated Lines on New Code <= 3%
# - Maintainability Rating = A
# - Reliability Rating = A
# - Security Rating = A
```

### GitHub Action

```yaml
name: SonarQube Analysis

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  sonarqube:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
        with:
          fetch-depth: 0

      - name: SonarQube Scan
        uses: sonarsource/sonarqube-scan-action@master
        env:
          SONAR_TOKEN: ${{ secrets.SONAR_TOKEN }}
          SONAR_HOST_URL: ${{ secrets.SONAR_HOST_URL }}
```

## Rapports de Qualité

### Rapport Hebdomadaire

```markdown
# Rapport Qualité - Semaine [X]

## Résumé

| Indicateur | Semaine N-1 | Semaine N | Trend |
|------------|-------------|-----------|-------|
| Coverage | 78% | 82% | ↗️ +4% |
| Code Smells | 15 | 12 | ↗️ -3 |
| Bugs | 2 | 0 | ↗️ |
| Vulnérabilités | 0 | 0 | → |
| Tech Debt | 18h | 15h | ↗️ -3h |

## Highlights

### Améliorations
- Couverture augmentée sur module Auth
- 3 code smells résolus

### Points d'attention
- Module Order sous les 70% de coverage
- 2 nouveaux code smells introduits

## Actions

| Action | Responsable | Deadline |
|--------|-------------|----------|
| Augmenter coverage Order | @dev1 | Sprint +1 |
| Review code smells | @team | Sprint +1 |
```

### Rapport de Sprint

```markdown
# Rapport Qualité - Sprint [X]

## Quality Gate
Status: ✅ PASSED / ❌ FAILED

## Métriques

### Coverage
| Module | Coverage | Trend |
|--------|----------|-------|
| Auth | 92% | ↗️ |
| User | 85% | → |
| Order | 68% | ↘️ |
| **Global** | **82%** | ↗️ |

### Code Quality
- Nouveaux bugs : 0
- Code smells résolus : 5
- Code smells introduits : 2
- Duplication : 1.5% (stable)

### Performance
| Page | LCP | FID | CLS | Score |
|------|-----|-----|-----|-------|
| Home | 1.8s | 45ms | 0.05 | 95 |
| Product | 2.2s | 60ms | 0.08 | 88 |
| Checkout | 2.8s | 80ms | 0.12 | 78 |

## Recommandations

1. **Priorité haute** : Améliorer coverage module Order
2. **Moyenne** : Optimiser page Checkout (LCP, CLS)
3. **Basse** : Réduire code smells restants
```

## Seuils d'Alerte

| Métrique | Warning | Critical | Action |
|----------|---------|----------|--------|
| Coverage | < 75% | < 60% | Bloquer merge |
| Bugs | > 0 | > 2 | Fix immédiat |
| Vulnérabilités | > 0 medium | > 0 high | Bloquer deploy |
| Lighthouse | < 80 | < 60 | Investigation |
| Tech Debt | > 10% sprint | > 20% sprint | Escalade |

## Points d'Escalade

| Situation | Action |
|-----------|--------|
| Quality Gate failed | Bloquer merge, corriger |
| Coverage en chute libre | Rétrospective + plan |
| Vulnérabilité critique | Patch immédiat |
| Performance dégradée | Investigation urgente |

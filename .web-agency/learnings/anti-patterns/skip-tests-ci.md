---
id: antipattern-005
severity: high
tags: [testing, ci-cd, quality]
first_occurrence: 2024-01-15
occurrence_count: 4
---

# Anti-Pattern: Tests Désactivés en CI

## Symptôme

**Comment détecter ce problème :**

- `[skip ci]` ou `[ci skip]` dans les commits
- Tests commentés dans le workflow
- `continue-on-error: true` sur les tests
- `--no-verify` utilisé systématiquement

**Exemple de manifestation :**

```yaml
# ❌ Tests désactivés
jobs:
  test:
    runs-on: ubuntu-latest
    continue-on-error: true  # ← Ignore les échecs
    steps:
      - run: npm test || true  # ← Force le succès
```

```bash
# ❌ Commits typiques
git commit -m "fix urgent [skip ci]"
git push --no-verify  # Skip pre-commit hooks
```

## Pourquoi c'est un Problème

### Impact Technique

- Régressions non détectées
- Dette technique accumulée
- Confiance dans les tests perdue
- Bugs découverts en prod

### Impact Business

- **Bugs récurrents** en production
- **Temps debug** augmenté
- **Vélocité réduite** à long terme
- **Qualité perçue** dégradée

### Coût Typique

| Aspect | Coût estimé |
|--------|-------------|
| Bug non détecté | 4-8h fix |
| Perte confiance tests | Semaines |
| Risque régression | Élevé |
| Dette technique | +++ |

## Solution

### CI Stricte

```yaml
# .github/workflows/ci.yml
name: CI

on:
  push:
    branches: [main, staging]
  pull_request:
    branches: [main, staging]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Run tests
        run: npm test -- --coverage

      - name: Upload coverage
        uses: codecov/codecov-action@v3
        # Pas de continue-on-error !

  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm ci
      - run: npm run lint
      # Pas de || true !
```

### Protection contre [skip ci]

```yaml
# .github/workflows/ci.yml
jobs:
  check-skip:
    runs-on: ubuntu-latest
    steps:
      - name: Check for skip ci
        if: contains(github.event.head_commit.message, '[skip ci]')
        run: |
          echo "::error::[skip ci] is not allowed on main/staging"
          exit 1
```

### Pre-commit Hooks

```bash
#!/bin/bash
# .husky/pre-commit

# Empêcher --no-verify abusif
npm run lint-staged
npm test -- --bail --findRelatedTests
```

## Prévention

### Checklist CI

- [ ] Tests obligatoires pour merge
- [ ] Coverage minimum défini (ex: 70%)
- [ ] `continue-on-error: false` partout
- [ ] Pas de `|| true` sur les tests
- [ ] Branch protection activée

### Configuration Recommandée

```yaml
# Branch protection (GitHub)
main:
  require_status_checks: true
  strict: true  # Branch must be up to date
  required_checks:
    - test
    - lint
    - build
```

### Exceptions Légitimes

Si skip CI vraiment nécessaire (README only, etc.) :

```yaml
# Autoriser skip CI uniquement pour docs
on:
  push:
    paths-ignore:
      - '**.md'
      - 'docs/**'
```

## Occurrences Documentées

| Projet | Date | Impact | Résolution |
|--------|------|--------|------------|
| Client A | 2024-01-15 | Régression checkout | Tests réactivés |
| Client B | 2024-04-20 | Lint ignoré 3 mois | Nettoyage massif |
| Client C | 2024-07-10 | Coverage à 12% | Sprint qualité |
| Client D | 2024-11-05 | 5 bugs prod/mois | CI stricte |

## Voir Aussi

- [Pattern: github-actions-wp](../patterns/github-actions-wp.md)
- [Pattern: e2e-critical-paths](../patterns/e2e-critical-paths.md)
- [Anti-pattern: no-staging](./no-staging.md)

## Références

- [GitHub Actions Best Practices](https://docs.github.com/en/actions/guides/about-continuous-integration)
- [Testing Best Practices](https://github.com/goldbergyoni/javascript-testing-best-practices)

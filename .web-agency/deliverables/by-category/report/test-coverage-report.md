---
id: test-coverage-report
name: Rapport de Couverture de Tests
version: 1.0.0
category: report
status: active
phase: "4-realisation"
order: 8
agents:
  - testing-process/reporting/coverage-report
  - lead-dev/quality/metrics
consumes:
  - test-suite
produces_for:
  - project-management/reporting/quality-report
  - devops/cicd/quality-gates
tags: [testing, coverage, quality, metrics, ci, report]
---

# Rapport de Couverture de Tests

## Description

Rapport généré automatiquement mesurant le pourcentage de code couvert par les tests. Inclut les métriques par fichier, les tendances et l'identification des zones non couvertes.

## Format de Sortie

| Attribut | Valeur |
|----------|--------|
| **Type** | HTML + JSON + Markdown |
| **Emplacement** | `coverage/`, CI artifacts |
| **Nommage** | `lcov-report/`, `coverage-summary.json` |
| **Encoding** | UTF-8 |

## Structure du Contenu

### Métriques Obligatoires

- [ ] **Statements** - % d'instructions exécutées
- [ ] **Branches** - % de branches conditionnelles
- [ ] **Functions** - % de fonctions appelées
- [ ] **Lines** - % de lignes exécutées

### Sections Optionnelles

- [ ] **Tendance** - Évolution dans le temps
- [ ] **Fichiers critiques** - Zones sous-couvertes
- [ ] **Diff coverage** - Couverture du code modifié

## Critères d'Acceptation

| # | Critère | Seuil/Condition | Vérification | Obligatoire |
|---|---------|-----------------|--------------|-------------|
| 1 | Coverage global | ≥ 80% | Auto (CI) | Oui |
| 2 | Branches | ≥ 75% | Auto (CI) | Oui |
| 3 | Pas de régression | Δ ≥ -2% | Auto (CI) | Oui |
| 4 | Fichiers critiques | ≥ 90% | Manuel | Non |

## Prérequis (Inputs)

| Source | Livrable/Donnée | Description |
|--------|-----------------|-------------|
| `testing-process/*` | `test-suite` | Tests exécutés |
| CI | Test runner output | Données brutes |

## Points de Validation Humaine

| Étape | Moment | Validateur | Action si KO |
|-------|--------|------------|--------------|
| 1 | PR | CI automatique | Bloquer merge |
| 2 | Sprint review | Lead Dev | Prioriser tests manquants |
| 3 | Release | QA | Valider zones critiques |

## Exemple

### Rapport Markdown (généré)

```markdown
# Coverage Report

**Generated**: 2024-02-15 14:30:00
**Branch**: feature/checkout-refactor
**Commit**: abc1234

---

## Summary

| Metric | Coverage | Threshold | Status |
|--------|----------|-----------|--------|
| Statements | 82.5% | 80% | ✅ Pass |
| Branches | 76.3% | 75% | ✅ Pass |
| Functions | 85.2% | 80% | ✅ Pass |
| Lines | 83.1% | 80% | ✅ Pass |

```
Overall Coverage: 82.5%
█████████████████░░░░░░░░░░░░░░ 82.5%
```

---

## Trend (Last 10 builds)

```
90% │
85% │              ●───●───●
80% │────●───●───●             (threshold)
75% │
70% │
    └────────────────────────
      #98 #99 #100 #101 #102
```

| Build | Coverage | Delta |
|-------|----------|-------|
| #102 | 82.5% | +1.2% |
| #101 | 81.3% | -0.5% |
| #100 | 81.8% | +2.1% |
| #99 | 79.7% | +0.3% |
| #98 | 79.4% | - |

---

## Coverage by Directory

| Directory | Statements | Branches | Functions | Lines |
|-----------|------------|----------|-----------|-------|
| `src/services/` | 91.2% | 85.4% | 92.0% | 90.8% |
| `src/components/` | 85.3% | 78.2% | 88.1% | 84.9% |
| `src/lib/` | 95.1% | 92.3% | 96.0% | 94.8% |
| `src/app/api/` | 72.4% | 65.8% | 75.2% | 71.9% |
| `src/hooks/` | 68.5% | 55.0% | 70.0% | 67.2% |

---

## Files with Lowest Coverage

⚠️ **Action Required**: These files need more tests

| File | Lines | Uncovered | Coverage |
|------|-------|-----------|----------|
| `src/hooks/useCart.ts` | 120 | 45 | 62.5% |
| `src/app/api/webhook/route.ts` | 85 | 30 | 64.7% |
| `src/hooks/useCheckout.ts` | 95 | 28 | 70.5% |
| `src/components/Checkout/PaymentForm.tsx` | 150 | 40 | 73.3% |

### Uncovered Lines Detail

#### `src/hooks/useCart.ts`

```typescript
// Lines 45-52 - Not covered
const handleQuantityChange = async (itemId: string, quantity: number) => {
  if (quantity < 1) return;  // ← Line 46 never reached
  if (quantity > 99) return; // ← Line 47 never reached

  try {
    await updateCartItem(itemId, quantity);
  } catch (error) {
    // ← Lines 50-51 never reached (error handling)
    setError('Failed to update quantity');
  }
};
```

**Recommended tests to add**:
```typescript
it('should not update if quantity < 1', async () => {
  const { result } = renderHook(() => useCart());
  await result.current.handleQuantityChange('item-1', 0);
  expect(updateCartItem).not.toHaveBeenCalled();
});

it('should handle update error', async () => {
  vi.mocked(updateCartItem).mockRejectedValue(new Error('API Error'));
  const { result } = renderHook(() => useCart());
  await result.current.handleQuantityChange('item-1', 2);
  expect(result.current.error).toBe('Failed to update quantity');
});
```

---

## New Code Coverage (This PR)

Coverage of lines added/modified in this PR:

| File | New Lines | Covered | Coverage |
|------|-----------|---------|----------|
| `src/services/shipping.service.ts` | 45 | 42 | 93.3% ✅ |
| `src/services/order.service.ts` | 30 | 28 | 93.3% ✅ |
| `src/app/api/checkout/route.ts` | 25 | 18 | 72.0% ⚠️ |

**PR Coverage**: 85.2% ✅

---

## Recommendations

### High Priority

1. **Add error handling tests for `useCart`**
   - Current: 62.5%
   - Target: 80%
   - Effort: ~1 hour

2. **Add webhook integration tests**
   - Current: 64.7%
   - Target: 80%
   - Effort: ~2 hours

### Medium Priority

3. **Improve `useCheckout` coverage**
   - Current: 70.5%
   - Target: 80%
   - Effort: ~1.5 hours

### Low Priority

4. **Add edge case tests for PaymentForm**
   - Current: 73.3%
   - Target: 80%
   - Effort: ~1 hour

---

## CI Configuration

```yaml
# vitest.config.ts thresholds
coverage:
  thresholds:
    lines: 80
    branches: 75
    functions: 80
    statements: 80
```

```yaml
# GitHub Actions quality gate
- name: Check coverage
  run: |
    COVERAGE=$(cat coverage/coverage-summary.json | jq '.total.lines.pct')
    if (( $(echo "$COVERAGE < 80" | bc -l) )); then
      echo "Coverage $COVERAGE% is below threshold 80%"
      exit 1
    fi
```
```

---

### Coverage Badge

```markdown
![Coverage](https://img.shields.io/badge/coverage-82.5%25-green)
```

### JSON Summary

```json
{
  "total": {
    "statements": { "total": 1250, "covered": 1031, "pct": 82.48 },
    "branches": { "total": 320, "covered": 244, "pct": 76.25 },
    "functions": { "total": 180, "covered": 153, "pct": 85.0 },
    "lines": { "total": 1100, "covered": 914, "pct": 83.09 }
  },
  "files": {
    "src/services/order.service.ts": {
      "statements": { "total": 85, "covered": 78, "pct": 91.76 },
      "branches": { "total": 24, "covered": 21, "pct": 87.5 },
      "functions": { "total": 12, "covered": 11, "pct": 91.67 },
      "lines": { "total": 75, "covered": 69, "pct": 92.0 }
    }
  }
}
```

## Anti-patterns

| Anti-pattern | Pourquoi c'est problématique | Correction |
|--------------|------------------------------|------------|
| Tests pour coverage | Tests sans valeur | Focus sur comportements |
| Ignorer les branches | Fausse sécurité | Tester les conditions |
| Seuil trop bas | Code non testé | 80% minimum |
| Pas de tendance | Régression invisible | Tracker l'évolution |
| Exclure du code | Coverage artificiel | Inclure tout le code prod |

## Références

- [Istanbul/nyc](https://istanbul.js.org/)
- [Codecov](https://codecov.io/)
- [Vitest Coverage](https://vitest.dev/guide/coverage.html)
- Livrables liés : `test-suite`, `code-review-report`, `ci-pipeline`

## Historique des Versions

| Version | Date | Auteur | Changements |
|---------|------|--------|-------------|
| 1.0.0 | 2026-01-18 | testing-process | Création initiale |

---
id: code-review-report
name: Rapport de Code Review
version: 1.0.0
category: report
status: active
phase: "4-realisation"
order: 7
agents:
  - lead-dev/code-review/review-process
  - direction-technique/qualite/code-review
consumes:
  - technical-specification
  - api-specification
  - test-suite
produces_for:
  - direction-technique/qualite/dette-technique
  - project-management/reporting/quality-report
tags: [code-review, quality, pull-request, review, feedback]
---

# Rapport de Code Review

## Description

Document résumant les résultats d'une code review : problèmes identifiés, suggestions d'amélioration, validation ou demande de modifications. Accompagne chaque Pull Request significative.

## Format de Sortie

| Attribut | Valeur |
|----------|--------|
| **Type** | Commentaires GitHub/GitLab + Document Markdown |
| **Emplacement** | PR comments + `docs/reviews/` (si majeur) |
| **Nommage** | `review-[PR-number].md` |
| **Encoding** | UTF-8 |

## Structure du Contenu

### Sections Obligatoires

- [ ] **Résumé** - Verdict global (Approve/Request changes)
- [ ] **Points positifs** - Ce qui est bien fait
- [ ] **Problèmes** - Issues à corriger (bloquants/non-bloquants)
- [ ] **Suggestions** - Améliorations optionnelles

### Sections Optionnelles

- [ ] **Sécurité** - Vulnérabilités détectées
- [ ] **Performance** - Problèmes de perf
- [ ] **Tests** - Couverture manquante
- [ ] **Documentation** - Docs à ajouter

## Critères d'Acceptation

| # | Critère | Seuil/Condition | Vérification | Obligatoire |
|---|---------|-----------------|--------------|-------------|
| 1 | Review dans les 24h | Délai max | Manuel | Oui |
| 2 | Feedback constructif | Pas de critique personnelle | Manuel | Oui |
| 3 | Problèmes catégorisés | Bloquant vs non-bloquant | Manuel | Oui |
| 4 | Suggestions actionnables | Comment corriger | Manuel | Oui |

## Prérequis (Inputs)

| Source | Livrable/Donnée | Description |
|--------|-----------------|-------------|
| Dev | Pull Request | Code à reviewer |
| `direction-technique/*` | `technical-specification` | Standards attendus |
| CI | Tests + Lint | Résultats automatisés |

## Points de Validation Humaine

| Étape | Moment | Validateur | Action si KO |
|-------|--------|------------|--------------|
| 1 | Après review | Auteur PR | Corriger et repusher |
| 2 | Re-review | Reviewer | Valider corrections |
| 3 | Merge | Lead Dev | Approval final |

## Exemple

### Template PR Comment

```markdown
## 🔍 Code Review - PR #142

### Résumé

| Aspect | Status |
|--------|--------|
| **Verdict** | 🟡 Request Changes |
| **Tests** | ✅ Passing |
| **Coverage** | ⚠️ 72% (-3%) |
| **Lint** | ✅ No errors |
| **Build** | ✅ Success |

---

### ✅ Points Positifs

1. **Bonne structure** - Le service est bien découpé avec SRP respecté
2. **Typage** - Types exhaustifs et bien définis
3. **Tests** - Tests unitaires présents pour la logique métier
4. **Naming** - Noms de variables et fonctions clairs

---

### 🚫 Bloquants (à corriger)

#### 1. Injection SQL potentielle

📍 `src/services/product.service.ts:45`

```typescript
// ❌ Problème: Interpolation directe dans la query
const products = await prisma.$queryRaw`
  SELECT * FROM products WHERE name LIKE '%${search}%'
`;
```

**Risque**: Injection SQL si `search` contient des caractères malveillants.

**Solution**:
```typescript
// ✅ Utiliser les paramètres Prisma
const products = await prisma.$queryRaw`
  SELECT * FROM products WHERE name LIKE ${`%${search}%`}
`;
// Ou mieux, utiliser l'API Prisma
const products = await prisma.product.findMany({
  where: { name: { contains: search } }
});
```

---

#### 2. Race condition dans le stock

📍 `src/services/order.service.ts:78-85`

```typescript
// ❌ Problème: Check-then-act non atomique
const product = await prisma.product.findUnique({ where: { id } });
if (product.stock >= quantity) {
  await prisma.product.update({
    where: { id },
    data: { stock: product.stock - quantity }
  });
}
```

**Risque**: Deux commandes simultanées peuvent créer un stock négatif.

**Solution**:
```typescript
// ✅ Update atomique avec condition
const result = await prisma.product.updateMany({
  where: {
    id,
    stock: { gte: quantity }
  },
  data: {
    stock: { decrement: quantity }
  }
});

if (result.count === 0) {
  throw new InsufficientStockError();
}
```

---

### ⚠️ Non-bloquants (à considérer)

#### 3. N+1 Query

📍 `src/app/api/orders/route.ts:23`

```typescript
// ⚠️ N+1: Une query par order pour récupérer les items
const orders = await prisma.order.findMany();
for (const order of orders) {
  order.items = await prisma.orderItem.findMany({
    where: { orderId: order.id }
  });
}
```

**Impact**: Performance dégradée avec beaucoup de commandes.

**Suggestion**:
```typescript
// ✅ Include pour eager loading
const orders = await prisma.order.findMany({
  include: { items: true }
});
```

---

#### 4. Magic number

📍 `src/lib/shipping.ts:12`

```typescript
// ⚠️ Magic number
if (total >= 50) {
  return 0; // Free shipping
}
```

**Suggestion**:
```typescript
// ✅ Constante nommée
const FREE_SHIPPING_THRESHOLD = 50;
if (total >= FREE_SHIPPING_THRESHOLD) {
  return 0;
}
```

---

### 💡 Suggestions (optionnel)

1. **Ajouter des tests E2E** pour le parcours de commande modifié
2. **Documenter** la nouvelle logique de calcul des frais de port
3. **Considérer** l'ajout de logs pour le debugging en prod

---

### 📊 Métriques

| Métrique | Avant | Après | Delta |
|----------|-------|-------|-------|
| Lignes de code | 1,245 | 1,312 | +67 |
| Couverture | 75% | 72% | -3% ⚠️ |
| Complexité cyclomatique | 12 | 14 | +2 |

---

### ✍️ Actions Requises

- [ ] Corriger l'injection SQL (#1)
- [ ] Implémenter l'update atomique du stock (#2)
- [ ] Ajouter tests pour remonter la couverture

---

**Reviewer**: @thomas-lead-dev
**Date**: 2024-02-15
```

---

### Rapport Complet (pour review majeure)

```markdown
---
pr: 142
title: Feature - Checkout Flow Refactoring
author: lucas-dev
reviewer: thomas-lead-dev
date: 2024-02-15
verdict: request_changes
---

# Code Review Report - PR #142

## Contexte

Refactoring du tunnel de commande pour supporter :
- Plusieurs modes de livraison
- Calcul dynamique des frais
- Nouveau flow de paiement Stripe

**Scope**: 15 fichiers modifiés, 1,200 lignes ajoutées, 400 supprimées.

---

## Analyse Détaillée

### Architecture

| Aspect | Évaluation | Commentaire |
|--------|------------|-------------|
| Structure | ✅ Bon | Services bien découpés |
| Couplage | ✅ Bon | Dépendances injectées |
| Cohésion | ⚠️ Moyen | CheckoutService fait trop |
| Testabilité | ✅ Bon | Mocks possibles |

**Recommandation**: Extraire le calcul des frais de port dans un `ShippingService` dédié.

### Sécurité

| Vulnérabilité | Sévérité | Status |
|---------------|----------|--------|
| SQL Injection | 🔴 Critique | À corriger |
| XSS | ✅ OK | Échappement correct |
| CSRF | ✅ OK | Token présent |
| Auth bypass | ✅ OK | Middleware correct |

### Performance

| Point | Impact | Recommandation |
|-------|--------|----------------|
| N+1 queries | Moyen | Eager loading |
| Cache manquant | Faible | Cache frais de port |
| Bundle size | OK | +12KB acceptable |

### Tests

| Type | Couverture | Évaluation |
|------|------------|------------|
| Unit | 85% | ✅ Bon |
| Integration | 60% | ⚠️ À améliorer |
| E2E | 0% | 🔴 Manquant |

---

## Checklist Validation

### Obligatoire

- [x] Lint passed
- [x] Build successful
- [x] Unit tests passed
- [ ] Security issues resolved
- [ ] Coverage maintained

### Recommandé

- [ ] Integration tests added
- [ ] E2E tests added
- [ ] Documentation updated
- [ ] Performance tested

---

## Conclusion

**Verdict**: 🟡 Request Changes

Le code est globalement de bonne qualité mais contient des vulnérabilités de sécurité critiques qui doivent être corrigées avant le merge.

**Estimation correction**: 2-3 heures

---

## Historique

| Version | Date | Action |
|---------|------|--------|
| v1 | 2024-02-15 | Initial review |
| v2 | 2024-02-16 | Re-review après corrections |
| v3 | 2024-02-16 | Approved ✅ |
```

---

### Checklist Reviewer

```markdown
## Code Review Checklist

### Fonctionnel
- [ ] Le code fait ce qui est demandé
- [ ] Les edge cases sont gérés
- [ ] Les erreurs sont gérées proprement

### Qualité
- [ ] Pas de code dupliqué
- [ ] Fonctions courtes et focalisées
- [ ] Nommage clair et cohérent
- [ ] Pas de magic numbers/strings

### Sécurité
- [ ] Pas d'injection (SQL, XSS, etc.)
- [ ] Validation des inputs
- [ ] Authentification vérifiée
- [ ] Pas de secrets hardcodés

### Performance
- [ ] Pas de N+1 queries
- [ ] Pas de boucles inutiles
- [ ] Ressources libérées (connections, files)

### Tests
- [ ] Tests présents
- [ ] Tests pertinents (pas juste pour coverage)
- [ ] Mocks appropriés

### Maintenabilité
- [ ] Code auto-documenté
- [ ] Commentaires si logique complexe
- [ ] Types exhaustifs (TypeScript)
```
```

## Anti-patterns

| Anti-pattern | Pourquoi c'est problématique | Correction |
|--------------|------------------------------|------------|
| Review destructive | Démotive, crée conflits | Feedback constructif |
| Trop tard | Blocage release | Review dans les 24h |
| Nitpicking | Focus sur détails insignifiants | Prioriser les vrais problèmes |
| Pas de contexte | Feedback incompréhensible | Expliquer le "pourquoi" |
| Pas de solution | Critique sans aide | Proposer une correction |

## Références

- [Google Code Review Guide](https://google.github.io/eng-practices/review/)
- [Conventional Comments](https://conventionalcomments.org/)
- Livrables liés : `technical-specification`, `test-suite`, `tech-debt-report`

## Historique des Versions

| Version | Date | Auteur | Changements |
|---------|------|--------|-------------|
| 1.0.0 | 2024-01-15 | lead-dev | Création initiale |

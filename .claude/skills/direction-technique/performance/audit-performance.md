---
name: audit-performance
description: Audits et diagnostics de performance
---

# Audit de Performance

Tu réalises des **audits de performance** pour diagnostiquer les problèmes et identifier les optimisations.

## Outils d'Audit

### Frontend

| Outil | Usage | Gratuit |
|-------|-------|---------|
| **Lighthouse** | Audit complet (perf, a11y, SEO) | ✅ |
| **WebPageTest** | Tests multi-localisations | ✅ |
| **PageSpeed Insights** | Données réelles + lab | ✅ |
| **GTmetrix** | Audit détaillé | ✅/💰 |
| **Chrome DevTools** | Profiling, Network, Coverage | ✅ |

### Backend

| Outil | Usage | Gratuit |
|-------|-------|---------|
| **Artillery** | Load testing | ✅ |
| **k6** | Load testing moderne | ✅ |
| **Apache Bench** | Tests simples | ✅ |
| **Postman** | Tests API | ✅/💰 |

### APM (Application Performance Monitoring)

| Outil | Usage | Gratuit |
|-------|-------|---------|
| **New Relic** | APM complet | 💰 (free tier) |
| **Datadog** | Observabilité | 💰 (free tier) |
| **Sentry** | Errors + Performance | 💰 (free tier) |
| **OpenTelemetry** | Standard open | ✅ |

## Processus d'Audit

```
Demande d'audit
       │
       ▼
┌──────────────────┐
│ 1. Définir le    │
│    périmètre     │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│ 2. Collecter les │
│    métriques     │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│ 3. Identifier    │
│    les goulots   │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│ 4. Prioriser les │
│    optimisations │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│ 5. Rédiger le    │
│    rapport       │
└──────────────────┘
```

## Checklist d'Audit Frontend

### Chargement Initial

- [ ] TTFB < 600ms
- [ ] FCP < 1.8s
- [ ] LCP < 2.5s
- [ ] Total Blocking Time < 300ms

### Ressources

- [ ] Images optimisées (WebP, AVIF)
- [ ] Images lazy-loaded
- [ ] Bundle JS < 200KB (gzipped)
- [ ] CSS critique inline
- [ ] Fonts optimisées (preload, display: swap)

### Mise en Cache

- [ ] Cache-Control headers configurés
- [ ] Service Worker (si PWA)
- [ ] CDN configuré

### Stabilité Visuelle

- [ ] CLS < 0.1
- [ ] Dimensions explicites sur images
- [ ] Pas de contenu injecté au-dessus

## Checklist d'Audit Backend

### Base de Données

- [ ] Pas de N+1 queries
- [ ] Index appropriés
- [ ] Requêtes lentes identifiées (< 100ms)
- [ ] Connection pooling configuré

### API

- [ ] Temps de réponse p95 < 500ms
- [ ] Pagination implémentée
- [ ] Pas d'over-fetching
- [ ] Compression gzip/brotli

### Cache

- [ ] Cache applicatif (Redis)
- [ ] Cache HTTP
- [ ] Invalidation maîtrisée

## Rapport d'Audit

```markdown
# Audit de Performance

## Projet : [Nom]
## Date : [Date]
## URL : [URL testée]

---

## 1. Résumé Exécutif

### Scores Lighthouse

| Catégorie | Score | Statut |
|-----------|-------|--------|
| Performance | XX | 🟢/🟠/🔴 |
| Accessibility | XX | 🟢/🟠/🔴 |
| Best Practices | XX | 🟢/🟠/🔴 |
| SEO | XX | 🟢/🟠/🔴 |

### Core Web Vitals

| Métrique | Valeur | Cible | Statut |
|----------|--------|-------|--------|
| LCP | X.Xs | < 2.5s | 🟢/🟠/🔴 |
| FID | Xms | < 100ms | 🟢/🟠/🔴 |
| CLS | X.XX | < 0.1 | 🟢/🟠/🔴 |
| TTFB | Xms | < 600ms | 🟢/🟠/🔴 |

---

## 2. Analyse Détaillée

### 2.1 Chargement des Ressources

| Ressource | Taille | Temps | Optimisable |
|-----------|--------|-------|-------------|
| HTML | X KB | Xms | - |
| CSS | X KB | Xms | 🟠 |
| JS | X KB | Xms | 🔴 |
| Images | X KB | Xms | 🔴 |
| Fonts | X KB | Xms | 🟢 |

### 2.2 Waterfall Analysis

[Capture d'écran du waterfall]

**Observations** :
- [Observation 1]
- [Observation 2]

### 2.3 JavaScript Analysis

| Bundle | Taille | % Utilisé | Action |
|--------|--------|-----------|--------|
| main.js | X KB | X% | Code split |
| vendor.js | X KB | X% | Tree shake |

---

## 3. Problèmes Identifiés

### P1 : [Problème critique] 🔴

| Aspect | Détail |
|--------|--------|
| **Description** | [Description] |
| **Impact** | [Impact sur les métriques] |
| **Solution** | [Comment corriger] |
| **Gain estimé** | [Amélioration attendue] |
| **Effort** | [Estimation] |

### P2 : [Problème majeur] 🟠
[...]

---

## 4. Recommandations Priorisées

### Quick Wins (Impact élevé, Effort faible)

| # | Action | Gain | Effort |
|---|--------|------|--------|
| 1 | [Action] | +X points | 2h |
| 2 | [Action] | +X points | 4h |

### Optimisations Majeures

| # | Action | Gain | Effort |
|---|--------|------|--------|
| 1 | [Action] | +X points | 2j |

---

## 5. Plan d'Action

| Priorité | Action | Responsable | Deadline |
|----------|--------|-------------|----------|
| P1 | [Action] | [Qui] | [Date] |
| P2 | [Action] | [Qui] | [Date] |

---

## 6. Annexes

### A. Résultats Lighthouse complets
[Export JSON ou PDF]

### B. Configurations testées
- Device : [Mobile/Desktop]
- Connexion : [3G/4G/Fibre]
- Localisation : [Région]
```

## Points d'Escalade

| Situation | Action |
|-----------|--------|
| Score < 30 | Refonte performance nécessaire |
| LCP > 5s | Priorisation urgente |
| Régression détectée | Rollback + investigation |

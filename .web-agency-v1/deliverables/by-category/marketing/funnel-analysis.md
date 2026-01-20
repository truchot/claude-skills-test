---
id: funnel-analysis
name: Analyse de Funnel
version: 1.0.0
category: marketing
status: active
phase: "4-realisation"
order: 16
agents:
  - marketing-analytics/insights/funnel-analysis
  - marketing-ops/performance/funnel-optimization
consumes:
  - marketing-objectives
  - analytics-setup
produces_for:
  - marketing-ops/performance/conversion-optimization
  - marketing-ops/campagnes/suivi-performance
workflows:
  - id: wf-funnel-analysis
    template: wf-audit
    phase: Analysis
    name: Analyse funnel conversion
    duration: 2 jours
tags:
  - marketing
  - performance
  - analytics
  - conversion
  - funnel
---

# Analyse de Funnel

## Description

L'analyse de funnel examine chaque étape du parcours de conversion pour identifier les points de friction, les taux de passage et les opportunités d'optimisation.

## Cas d'Usage

- Diagnostic de performance conversion
- Identification des points de friction
- Priorisation des optimisations CRO
- Benchmark avant/après optimisation
- Reporting performance

## Structure du Livrable

```markdown
# Analyse Funnel : [Nom du Funnel / Produit]

## Résumé Exécutif

### Vue d'Ensemble Funnel

```
┌─────────────────────────────────────────────────────────────────────┐
│                         FUNNEL OVERVIEW                              │
│                                                                      │
│    AWARENESS        INTEREST        DESIRE         ACTION           │
│    ──────────       ────────        ──────         ──────           │
│                                                                      │
│    Visiteurs        Engagés         Qualifiés      Convertis        │
│    [X K]            [Y K]           [Z K]          [W]              │
│    100%             [A%]            [B%]           [C%]             │
│                                                                      │
│    ████████████████████████████████████████████████████             │
│    █████████████████████████████████████████                        │
│    ██████████████████████████████                                   │
│    ████████████████                                                 │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘
```

### Métriques Clés

| Métrique | Valeur | vs Période Préc. | vs Benchmark |
|----------|--------|------------------|--------------|
| Conversion Rate Global | [X%] | [+/-Y%] | [vs Z%] |
| Drop-off Principal | Étape [X] | [Y%] perdu | - |
| Revenue/Visitor | [X €] | [+/-Y%] | - |
| CAC | [X €] | [+/-Y%] | - |

### Points Clés

| 🟢 Forces | 🔴 Faiblesses |
|-----------|---------------|
| [Point positif 1] | [Point négatif 1] |
| [Point positif 2] | [Point négatif 2] |

## 1. Définition du Funnel

### Étapes du Funnel

| # | Étape | Définition | Event Tracking |
|---|-------|------------|----------------|
| 1 | [Awareness] | [Visite site] | `page_view` |
| 2 | [Interest] | [Visite page produit] | `view_item` |
| 3 | [Consideration] | [Ajout panier] | `add_to_cart` |
| 4 | [Intent] | [Début checkout] | `begin_checkout` |
| 5 | [Conversion] | [Achat] | `purchase` |

### Funnel Visualization

```
Étape                     Utilisateurs    Taux Passage    Drop-off

1. Visiteurs              [100,000]       ─────────────   ─────────
                              │           100%
                              ▼
2. Page Produit            [40,000]       ─────────────   60% drop
                              │           40%
                              ▼
3. Ajout Panier            [12,000]       ─────────────   70% drop
                              │           12%
                              ▼
4. Checkout                 [8,000]       ─────────────   33% drop
                              │           8%
                              ▼
5. Achat                    [4,000]       ─────────────   50% drop
                                          4%

                    CONVERSION RATE GLOBAL: 4%
```

## 2. Analyse par Étape

### Étape 1 → 2 : [Awareness → Interest]

| Métrique | Valeur |
|----------|--------|
| Volume entrée | [X] |
| Volume sortie | [Y] |
| Taux de passage | [Z%] |
| Drop-off | [W%] |

**Analyse** :
- [Observation 1]
- [Observation 2]

**Causes Probables du Drop** :
1. [Cause 1] - [Données support]
2. [Cause 2] - [Données support]

**Recommandations** :
- [ ] [Action 1]
- [ ] [Action 2]

---

### Étape 2 → 3 : [Interest → Consideration]

[Même structure...]

---

### Étape 3 → 4 : [Consideration → Intent]

[Même structure...]

---

### Étape 4 → 5 : [Intent → Conversion]

[Même structure avec focus sur abandon panier/checkout]

## 3. Segmentation du Funnel

### Par Source de Trafic

| Source | Visiteurs | Conv. Rate | Revenue | ROAS |
|--------|-----------|------------|---------|------|
| Organic Search | [X K] | [Y%] | [Z €] | N/A |
| Paid Search | [X K] | [Y%] | [Z €] | [W:1] |
| Social Organic | [X K] | [Y%] | [Z €] | N/A |
| Social Paid | [X K] | [Y%] | [Z €] | [W:1] |
| Email | [X K] | [Y%] | [Z €] | [W:1] |
| Direct | [X K] | [Y%] | [Z €] | N/A |
| Referral | [X K] | [Y%] | [Z €] | N/A |

**Insights** :
- [Meilleure source : X car Y]
- [Pire source : X car Y]

### Par Device

| Device | Sessions | Conv. Rate | Revenu/Session |
|--------|----------|------------|----------------|
| Desktop | [X%] | [Y%] | [Z €] |
| Mobile | [X%] | [Y%] | [Z €] |
| Tablet | [X%] | [Y%] | [Z €] |

**Gap Mobile vs Desktop** : [X%] → Opportunité ?

### Par Segment Utilisateur

| Segment | Volume | Conv. Rate | AOV |
|---------|--------|------------|-----|
| Nouveaux visiteurs | [X%] | [Y%] | [Z €] |
| Visiteurs récurrents | [X%] | [Y%] | [Z €] |
| Clients existants | [X%] | [Y%] | [Z €] |

### Par Cohorte Temporelle

| Période | Visiteurs | Conv. Rate | Tendance |
|---------|-----------|------------|----------|
| Ce mois | [X K] | [Y%] | [↑/↓/→] |
| Mois -1 | [X K] | [Y%] | - |
| Mois -2 | [X K] | [Y%] | - |
| Mois -3 | [X K] | [Y%] | - |

## 4. Micro-Conversions

### Événements Intermédiaires

| Micro-Conversion | Volume | Correlation Macro |
|------------------|--------|-------------------|
| [Inscription newsletter] | [X K] | [Y% deviennent clients] |
| [Téléchargement guide] | [X K] | [Y% deviennent clients] |
| [Création compte] | [X K] | [Y% achètent] |
| [Ajout wishlist] | [X K] | [Y% achètent] |
| [Partage social] | [X K] | [Y% influence] |

### Funnel Micro → Macro

```
Newsletter signup    →    1ère visite produit    →    Achat
      [X K]                    [Y%]                    [Z%]
      100%                     [A%]                    [B%]
```

## 5. Analyse Temporelle

### Temps entre Étapes

| Transition | Temps Médian | P25 | P75 |
|------------|--------------|-----|-----|
| Visit → Product View | [X min] | [Y] | [Z] |
| Product View → Add Cart | [X min] | [Y] | [Z] |
| Add Cart → Checkout | [X h] | [Y] | [Z] |
| Checkout → Purchase | [X min] | [Y] | [Z] |

### Time to Convert

| Percentile | Temps |
|------------|-------|
| 25% convertit en | <[X h] |
| 50% convertit en | <[Y h] |
| 75% convertit en | <[Z jours] |
| 90% convertit en | <[W jours] |

**Insight** : [X%] des conversions dans les [Y] premières heures

### Pattern Jour/Heure

| Jour | Meilleure Heure | Conv. Rate |
|------|-----------------|------------|
| Lundi | [Heure] | [X%] |
| Mardi | [Heure] | [X%] |
| ... | ... | ... |

## 6. Analyse Comportementale

### Parcours Types (Path Analysis)

**Parcours #1** (X% des conversions) :
```
Home → Category → Product → Cart → Checkout → Success
```

**Parcours #2** (X% des conversions) :
```
Landing (Ads) → Product → Cart → Checkout → Success
```

**Parcours #3** (X% des conversions) :
```
Blog → Product → [Exit] → [Return] → Cart → Checkout → Success
```

### Pages de Sortie (Exit Pages)

| Page | Sessions | Exit Rate | Impact |
|------|----------|-----------|--------|
| [Page 1] | [X K] | [Y%] | 🔴 Critique |
| [Page 2] | [X K] | [Y%] | 🟡 À surveiller |
| [Page 3] | [X K] | [Y%] | 🟢 Normal |

### Scroll Depth

| Page | Avg Scroll | Correlation Conv. |
|------|------------|-------------------|
| [Landing] | [X%] | [Positive/Négative] |
| [Product] | [X%] | [Positive/Négative] |

## 7. Benchmarks & Comparaisons

### vs Benchmarks Secteur

| Étape | Notre Rate | Benchmark | Gap |
|-------|------------|-----------|-----|
| Visit → Product | [X%] | [Y%] | [+/-Z%] |
| Product → Cart | [X%] | [Y%] | [+/-Z%] |
| Cart → Checkout | [X%] | [Y%] | [+/-Z%] |
| Checkout → Purchase | [X%] | [Y%] | [+/-Z%] |

### vs Période Précédente

| Étape | Ce Mois | Mois Préc. | Évolution |
|-------|---------|------------|-----------|
| [Étape 1] | [X%] | [Y%] | [+/-Z%] |
| [Étape 2] | [X%] | [Y%] | [+/-Z%] |

## 8. Recommandations

### Priorisation des Actions

| Action | Étape Ciblée | Impact Estimé | Effort | Priorité |
|--------|--------------|---------------|--------|----------|
| [Action 1] | [Étape X] | +[Y%] conv. | [Faible] | 🔥🔥🔥 |
| [Action 2] | [Étape X] | +[Y%] conv. | [Moyen] | 🔥🔥🔥 |
| [Action 3] | [Étape X] | +[Y%] conv. | [Élevé] | 🔥🔥 |
| [Action 4] | [Étape X] | +[Y%] conv. | [Faible] | 🔥🔥 |

### Roadmap CRO Suggérée

| Mois | Focus | Tests Suggérés |
|------|-------|----------------|
| M1 | [Étape critique] | [Test 1], [Test 2] |
| M2 | [Étape 2] | [Test 3], [Test 4] |
| M3 | [Mobile] | [Test 5], [Test 6] |

### Impact Projeté

| Scénario | Conv. Rate | Revenue Add. |
|----------|------------|--------------|
| Actuel | [X%] | - |
| +10% étape [Y] | [X.Y%] | +[Z €] |
| +20% étape [Y] | [X.Z%] | +[W €] |

## Annexes

### A. Données Brutes
[Export GA4/Analytics]

### B. Méthodologie
- Période : [Dates]
- Outil : [GA4 / Mixpanel / Amplitude]
- Exclusions : [Bots, internes...]
```

## Critères d'Acceptation

### Complétude
- [ ] Toutes les étapes du funnel analysées
- [ ] Segmentation par source/device/user
- [ ] Benchmarks inclus
- [ ] Recommandations actionnables

### Qualité
- [ ] Données fiables et cohérentes
- [ ] Insights actionnables
- [ ] Recommandations priorisées

### Validation
- [ ] Validé par Analytics Lead
- [ ] Données croisées et vérifiées

## Anti-Patterns

### ❌ À Éviter

1. **Funnel incomplet**
   - Étapes manquantes
   - Tracking partiel

2. **Pas de segmentation**
   - Vue uniquement globale
   - Masque les variations

3. **Données non fiables**
   - Tracking mal configuré
   - Doublons/bots inclus

### ✅ Bonnes Pratiques

1. **Définir clairement** chaque étape
2. **Segmenter** pour trouver les insights
3. **Comparer** à des benchmarks
4. **Prioriser** par impact/effort

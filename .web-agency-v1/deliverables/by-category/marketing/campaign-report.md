---
id: campaign-report
name: Rapport de Campagne
version: 1.0.0
category: marketing
status: active
phase: "6-maintenance"
order: 12
agents:
  - marketing-ops/campagnes/suivi-performance
  - marketing-analytics/orchestrator
  - marketing-ops/performance/funnel-optimization
consumes:
  - campaign-planning
  - marketing-objectives
produces_for:
  - marketing-ops/campagnes/orchestrator
  - direction-marketing/strategie/orchestrator
workflows:
  - id: wf-campaign-report
    template: wf-report
    phase: Reporting
    name: Rapport de campagne
    duration: 1 jour
tags:
  - marketing
  - campagnes
  - reporting
  - performance
---

# Rapport de Campagne

## Description

Le rapport de campagne analyse les performances d'une campagne marketing terminée ou en cours. Il mesure l'atteinte des objectifs, le ROI et extrait les learnings pour les futures campagnes.

## Cas d'Usage

- Bilan de fin de campagne
- Reporting client/direction
- Optimisation en cours de campagne
- Documentation des learnings
- Justification des investissements

## Structure du Livrable

```markdown
# Rapport Campagne : [Nom de la Campagne]

## Résumé Exécutif

### Performance Globale

```
┌─────────────────────────────────────────────────────────────────┐
│                    PERFORMANCE CAMPAGNE                         │
│                                                                 │
│         🎯 OBJECTIF PRINCIPAL: [X%] ATTEINT                     │
│                                                                 │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐             │
│  │   REACH     │  │   LEADS     │  │    ROI      │             │
│  │   [X M]     │  │   [X K]     │  │   [X:1]     │             │
│  │   +[Y%]     │  │   +[Y%]     │  │   +[Y%]     │             │
│  └─────────────┘  └─────────────┘  └─────────────┘             │
│                                                                 │
│  VERDICT: [🟢 Succès / 🟡 Mitigé / 🔴 Échec]                   │
└─────────────────────────────────────────────────────────────────┘
```

### Chiffres Clés

| KPI | Objectif | Résultat | Écart | Status |
|-----|----------|----------|-------|--------|
| [KPI 1] | [X] | [Y] | [+/-Z%] | [🟢/🟡/🔴] |
| [KPI 2] | [X] | [Y] | [+/-Z%] | [🟢/🟡/🔴] |
| [KPI 3] | [X] | [Y] | [+/-Z%] | [🟢/🟡/🔴] |
| [KPI 4] | [X] | [Y] | [+/-Z%] | [🟢/🟡/🔴] |

### Top 3 Réussites
1. ✅ [Réussite 1]
2. ✅ [Réussite 2]
3. ✅ [Réussite 3]

### Top 3 Améliorations
1. 📈 [Amélioration 1]
2. 📈 [Amélioration 2]
3. 📈 [Amélioration 3]

## 1. Contexte Campagne

### Rappel des Objectifs

| Objectif | Type | Cible |
|----------|------|-------|
| [Objectif principal] | [Conversion/Notoriété/...] | [Valeur] |
| [Objectif secondaire 1] | [...] | [Valeur] |
| [Objectif secondaire 2] | [...] | [Valeur] |

### Période & Budget

| Élément | Prévu | Réel |
|---------|-------|------|
| Durée | [X jours] | [Y jours] |
| Budget total | [X €] | [Y €] |
| Budget quotidien moyen | [X €/j] | [Y €/j] |

### Cible

| Segment | Taille ciblée | Reach réel |
|---------|---------------|------------|
| [Segment 1] | [X K] | [Y K] |
| [Segment 2] | [X K] | [Y K] |

## 2. Performance Globale

### Funnel de Conversion

```
IMPRESSIONS        [X M]         100%
      │
      ▼
CLICS              [Y K]         [Z%] CTR
      │
      ▼
VISITES LP         [Y K]         [Z%] taux arrivée
      │
      ▼
ENGAGEMENTS        [Y K]         [Z%] taux engagement
      │
      ▼
LEADS              [Y]           [Z%] taux conversion
      │
      ▼
VENTES/CLIENTS     [Y]           [Z%] taux closing
```

### Métriques de Performance

| Métrique | Résultat | Benchmark | Écart |
|----------|----------|-----------|-------|
| Impressions | [X M] | - | - |
| Reach unique | [X K] | - | - |
| Fréquence moyenne | [X] | <5 | [OK/KO] |
| Clics | [X K] | - | - |
| CTR | [X%] | [Y%] | [+/-Z%] |
| CPC | [X €] | [Y €] | [+/-Z%] |
| Conversions | [X] | - | - |
| Taux de conversion | [X%] | [Y%] | [+/-Z%] |
| CPA / CPL | [X €] | [Y €] | [+/-Z%] |
| ROAS | [X:1] | [Y:1] | [+/-Z%] |

### Évolution Temporelle

```
Performance Quotidienne

[X] │      ╭──╮
    │   ╭──╯  ╰──╮      ╭──╮
    │ ──╯        ╰──────╯  ╰──
[Y] │
    └────────────────────────────
     Lancement    Maintien    Fin

     ── Conversions   -- CTR
```

## 3. Performance par Canal

### Comparatif Canaux

| Canal | Impressions | Clics | CTR | Conversions | CPA | ROAS |
|-------|-------------|-------|-----|-------------|-----|------|
| Google Search | [X K] | [Y K] | [Z%] | [W] | [V €] | [U:1] |
| Google Display | [X K] | [Y K] | [Z%] | [W] | [V €] | [U:1] |
| Facebook | [X K] | [Y K] | [Z%] | [W] | [V €] | [U:1] |
| Instagram | [X K] | [Y K] | [Z%] | [W] | [V €] | [U:1] |
| LinkedIn | [X K] | [Y K] | [Z%] | [W] | [V €] | [U:1] |
| Email | [X K] | [Y K] | [Z%] | [W] | [V €] | [U:1] |
| **Total** | **[X M]** | **[Y K]** | **[Z%]** | **[W]** | **[V €]** | **[U:1]** |

### Répartition Budget vs Résultats

```
BUDGET                          CONVERSIONS
────────────────────           ────────────────────
Google    ████████░░ 40%       Google    ██████████░░ 50%
Facebook  ██████░░░░ 30%       Facebook  ██████░░░░░░ 30%
LinkedIn  ████░░░░░░ 20%       LinkedIn  ██░░░░░░░░░░ 10%
Email     ██░░░░░░░░ 10%       Email     ██░░░░░░░░░░ 10%
```

### Analyse par Canal

#### Google Ads
| Campagne | Budget | Clics | CPC | Conv. | CPA |
|----------|--------|-------|-----|-------|-----|
| [Campaign 1] | [X €] | [Y] | [Z €] | [W] | [V €] |
| [Campaign 2] | [X €] | [Y] | [Z €] | [W] | [V €] |

**Insights Google** :
- [Insight 1]
- [Insight 2]

#### Facebook/Instagram Ads
| Adset | Budget | Reach | CPM | Conv. | CPA |
|-------|--------|-------|-----|-------|-----|
| [Adset 1] | [X €] | [Y K] | [Z €] | [W] | [V €] |
| [Adset 2] | [X €] | [Y K] | [Z €] | [W] | [V €] |

**Insights Meta** :
- [Insight 1]
- [Insight 2]

#### Email Marketing
| Email | Envois | Opens | OR | Clics | CTR | Conv. |
|-------|--------|-------|-----|-------|-----|-------|
| [Email 1] | [X K] | [Y K] | [Z%] | [W] | [V%] | [U] |
| [Email 2] | [X K] | [Y K] | [Z%] | [W] | [V%] | [U] |

## 4. Performance Créative

### Top Performers (Créas)

| Créa | Canal | Impressions | CTR | Conv. Rate | CPA |
|------|-------|-------------|-----|------------|-----|
| 🥇 [Créa 1] | [Canal] | [X K] | [Y%] | [Z%] | [W €] |
| 🥈 [Créa 2] | [Canal] | [X K] | [Y%] | [Z%] | [W €] |
| 🥉 [Créa 3] | [Canal] | [X K] | [Y%] | [Z%] | [W €] |

### Bottom Performers

| Créa | Canal | Impressions | CTR | Conv. Rate | CPA | Action |
|------|-------|-------------|-----|------------|-----|--------|
| [Créa X] | [Canal] | [X K] | [Y%] | [Z%] | [W €] | Pausée |
| [Créa Y] | [Canal] | [X K] | [Y%] | [Z%] | [W €] | Pausée |

### Résultats A/B Tests

| Test | Variante A | Variante B | Winner | Uplift |
|------|------------|------------|--------|--------|
| [Headline] | "[V.A]" | "[V.B]" | [A/B] | +[X%] |
| [Visual] | [Description A] | [Description B] | [A/B] | +[X%] |
| [CTA] | "[V.A]" | "[V.B]" | [A/B] | +[X%] |

### Analyse Messages

| Message | Performance | Insight |
|---------|-------------|---------|
| "[Message 1]" | 🟢 Top performer | [Pourquoi ça marche] |
| "[Message 2]" | 🟡 Moyenne | [Analyse] |
| "[Message 3]" | 🔴 Sous-performant | [Pourquoi ça ne marche pas] |

## 5. Analyse Audience

### Performance par Segment

| Segment | Impressions | Conv. | CPA | ROAS |
|---------|-------------|-------|-----|------|
| [Segment 1] | [X K] | [Y] | [Z €] | [W:1] |
| [Segment 2] | [X K] | [Y] | [Z €] | [W:1] |
| [Segment 3] | [X K] | [Y] | [Z €] | [W:1] |

### Données Démographiques

| Dimension | Top Performer | Worst Performer |
|-----------|---------------|-----------------|
| Âge | [Tranche] - [CPA] | [Tranche] - [CPA] |
| Genre | [Genre] - [CPA] | [Genre] - [CPA] |
| Localisation | [Ville/Région] - [CPA] | [Lieu] - [CPA] |
| Device | [Device] - [CPA] | [Device] - [CPA] |

### Analyse Comportementale

| Comportement | Observation |
|--------------|-------------|
| Jour de la semaine | [Meilleur jour : X] |
| Heure | [Meilleure plage : X-Y] |
| Device | [Mobile : X% / Desktop : Y%] |

## 6. Attribution & ROI

### Modèle d'Attribution

| Modèle | Conversions Attribuées | Revenue |
|--------|------------------------|---------|
| Last Click | [X] | [Y €] |
| First Click | [X] | [Y €] |
| Linear | [X] | [Y €] |
| Data-Driven | [X] | [Y €] |

### Parcours de Conversion

```
Parcours Type (top 3)

1. [Google Ads] → [Landing] → [Email retargeting] → [Conversion]
   [X%] des conversions

2. [Facebook] → [Site] → [Google Brand] → [Conversion]
   [X%] des conversions

3. [Email] → [Site] → [Conversion directe]
   [X%] des conversions
```

### Calcul ROI

| Élément | Valeur |
|---------|--------|
| Investissement total | [X €] |
| Revenue généré | [Y €] |
| Nombre de conversions | [Z] |
| Valeur par conversion | [W €] |
| **ROI** | **[V%]** |
| **ROAS** | **[U:1]** |

### Comparaison vs Prévision

| Métrique | Prévu | Réel | Écart |
|----------|-------|------|-------|
| Budget | [X €] | [Y €] | [+/-Z%] |
| Conversions | [X] | [Y] | [+/-Z%] |
| CPA | [X €] | [Y €] | [+/-Z%] |
| ROI | [X%] | [Y%] | [+/-Z pts] |

## 7. Learnings & Insights

### Ce qui a marché ✅

| Learning | Impact | Application Future |
|----------|--------|---------------------|
| [Learning 1] | [Élevé] | [Recommandation] |
| [Learning 2] | [Moyen] | [Recommandation] |
| [Learning 3] | [Élevé] | [Recommandation] |

### Ce qui n'a pas marché ❌

| Learning | Impact | Éviter |
|----------|--------|--------|
| [Learning 1] | [Élevé] | [Ce qu'on ne refait pas] |
| [Learning 2] | [Moyen] | [Ce qu'on ajuste] |

### Surprises & Découvertes 💡

- [Découverte inattendue 1]
- [Découverte inattendue 2]

### Benchmarks Établis

| Métrique | Benchmark Établi | Pour futures campagnes |
|----------|------------------|------------------------|
| CTR [Canal] | [X%] | Objectif > [Y%] |
| CPA [Segment] | [X €] | Objectif < [Y €] |
| ROAS [Type] | [X:1] | Objectif > [Y:1] |

## 8. Recommandations

### Pour Prochaines Campagnes

| Recommandation | Priorité | Impact Attendu |
|----------------|----------|----------------|
| [Recommandation 1] | P1 | [+X% performance] |
| [Recommandation 2] | P1 | [+X% conversions] |
| [Recommandation 3] | P2 | [-X% CPA] |
| [Recommandation 4] | P2 | [+X% reach] |

### Budget Recommandé

| Canal | Budget Actuel | Budget Recommandé | Justification |
|-------|---------------|-------------------|---------------|
| [Canal 1] | [X €] | [+Y €] | Top performer |
| [Canal 2] | [X €] | [-Y €] | Sous-performant |
| [Canal 3] | [X €] | [=] | Performance OK |

### Tests à Mener

| Test | Hypothèse | Setup |
|------|-----------|-------|
| [Test 1] | [Si X alors Y] | [Comment tester] |
| [Test 2] | [Si X alors Y] | [Comment tester] |

## Annexes

### A. Détail quotidien performance
[Export données]

### B. Créatifs utilisés
[Galerie visuels]

### C. Évolution enchères
[Graphiques]
```

## Critères d'Acceptation

### Complétude
- [ ] Tous les KPIs prévus mesurés
- [ ] Performance par canal détaillée
- [ ] Analyse créative incluse
- [ ] ROI calculé
- [ ] Learnings documentés
- [ ] Recommandations actionnables

### Qualité
- [ ] Données vérifiées et cohérentes
- [ ] Insights pertinents (pas que des chiffres)
- [ ] Comparaisons vs objectifs
- [ ] Visuels lisibles

### Validation
- [ ] Validé par Campaign Manager
- [ ] Présenté aux stakeholders

## Anti-Patterns

### ❌ À Éviter

1. **Dump de données**
   - Export Google Ads brut
   - Aucune analyse

2. **Pas de contexte**
   - Chiffres sans objectifs
   - Impossible de juger

3. **Pas de learnings**
   - Constat sans conclusion
   - Pas actionnable

### ✅ Bonnes Pratiques

1. **Executive summary** en premier
2. **Comparaison systématique** vs objectifs
3. **Insights actionnables** pas juste des données
4. **Visualisations claires** pour les tendances

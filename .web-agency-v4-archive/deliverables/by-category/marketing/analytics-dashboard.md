---
id: analytics-dashboard
name: Dashboard Analytics Marketing
version: 1.0.0
category: marketing
status: active
phase: "4-realisation"
order: 19
agents:
  - marketing-analytics/orchestrator
  - marketing-ops/performance/funnel-optimization
consumes:
  - marketing-objectives
  - analytics-setup
produces_for:
  - direction-marketing/strategie/orchestrator
  - marketing-ops/campagnes/suivi-performance
workflows:
  - id: wf-dashboard-design
    template: wf-creation
    phase: Design
    name: Design dashboard analytics
    duration: 2 jours
  - id: wf-dashboard-implementation
    template: wf-implementation
    phase: Implementation
    name: Implémentation dashboard
    duration: 3 jours
tags:
  - marketing
  - analytics
  - dashboard
  - reporting
  - data
---

# Dashboard Analytics Marketing

## Description

Le dashboard analytics marketing centralise les KPIs marketing clés dans une interface visuelle permettant le suivi en temps réel des performances et la prise de décision data-driven.

## Cas d'Usage

- Suivi quotidien des KPIs marketing
- Reporting automatisé à la direction
- Analyse de performance des campagnes
- Détection d'anomalies
- Prise de décision rapide

## Structure du Livrable

```markdown
# Spécification Dashboard : [Nom du Dashboard]

## Fiche d'Identité

| Attribut | Valeur |
|----------|--------|
| **Nom** | [Nom dashboard] |
| **Outil** | [Looker Studio / Tableau / Power BI / Metabase] |
| **URL** | [Lien vers le dashboard] |
| **Refresh** | [Temps réel / Quotidien / Hebdo] |
| **Audience** | [Marketing team / Direction / Tous] |
| **Owner** | [Responsable] |

## 1. Objectifs du Dashboard

### Questions Auxquelles Répondre

| Question | Fréquence | Métrique Clé |
|----------|-----------|--------------|
| "Comment performe le marketing ce mois ?" | Quotidien | Revenue attribué |
| "Quels canaux génèrent le plus de leads ?" | Hebdo | Leads par source |
| "Le budget est-il bien dépensé ?" | Quotidien | ROAS par canal |
| "Le funnel est-il sain ?" | Quotidien | Taux conversion |
| "[Autre question]" | [Fréq.] | [Métrique] |

### Objectifs Spécifiques

1. **Monitoring temps réel** : Alerter sur les anomalies
2. **Analyse comparative** : MoM, YoY, vs objectifs
3. **Attribution** : Comprendre la contribution des canaux
4. **Prédiction** : Tendances et projections

## 2. Sources de Données

### Connecteurs

| Source | Données | Connecteur | Refresh |
|--------|---------|------------|---------|
| Google Analytics 4 | Trafic, comportement | [Natif/API] | Quotidien |
| Google Ads | Campagnes paid search | [Natif/API] | Quotidien |
| Meta Ads | Campagnes social | [Supermetrics/API] | Quotidien |
| CRM (HubSpot/SF) | Leads, opportunités | [API/Export] | Quotidien |
| Email (Brevo/HubSpot) | Métriques email | [API] | Quotidien |
| Search Console | SEO data | [Natif] | Quotidien |
| [Autre source] | [Données] | [Méthode] | [Refresh] |

### Modèle de Données

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│   GA4 Data      │     │   Ads Data      │     │   CRM Data      │
│                 │     │                 │     │                 │
│ - Sessions      │     │ - Impressions   │     │ - Leads         │
│ - Users         │     │ - Clicks        │     │ - MQLs          │
│ - Conversions   │     │ - Spend         │     │ - Opportunities │
│ - Revenue       │     │ - Conversions   │     │ - Revenue       │
└────────┬────────┘     └────────┬────────┘     └────────┬────────┘
         │                       │                       │
         └───────────────────────┼───────────────────────┘
                                 │
                    ┌────────────┴────────────┐
                    │    Blending Layer       │
                    │    (Join sur date,      │
                    │     source, campaign)   │
                    └────────────┬────────────┘
                                 │
                    ┌────────────┴────────────┐
                    │     Dashboard           │
                    └─────────────────────────┘
```

### Data Quality Checks

| Check | Règle | Alerte Si |
|-------|-------|-----------|
| Données fraîches | Last update < 24h | Pas de données aujourd'hui |
| Cohérence | GA4 sessions ≈ Ads clicks | Écart > 10% |
| Complétude | Tous les champs remplis | Nulls > 5% |

## 3. Structure du Dashboard

### Pages/Onglets

| Page | Contenu | Audience |
|------|---------|----------|
| **Overview** | KPIs globaux, tendances | Tous |
| **Acquisition** | Performance par canal | Marketing |
| **Campaigns** | Détail campagnes ads | Ads team |
| **SEO** | Performance organique | SEO team |
| **Funnel** | Analyse conversion | CRO team |
| **Attribution** | Contribution canaux | Marketing lead |

### Wireframe Overview

```
┌─────────────────────────────────────────────────────────────────────┐
│                         DASHBOARD HEADER                            │
│  [Logo]  [Titre Dashboard]           [Date Range] [Refresh] [Filter]│
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐   │
│  │  REVENUE    │ │   LEADS     │ │    ROAS     │ │   CONV.     │   │
│  │   [X €]     │ │    [X]      │ │   [X:1]     │ │   [X%]      │   │
│  │  +[Y%] ↑    │ │  +[Y%] ↑    │ │  +[Y%] ↑    │ │  +[Y%] ↑    │   │
│  └─────────────┘ └─────────────┘ └─────────────┘ └─────────────┘   │
│                                                                      │
├──────────────────────────────────┬──────────────────────────────────┤
│                                  │                                   │
│    REVENUE TREND (Line chart)    │    CHANNEL MIX (Pie/Bar)        │
│                                  │                                   │
│    ─●─●─●─●─●─●─●─●─●─●─         │    ████ Google   40%            │
│                                  │    ███  Facebook 30%            │
│    ── Ce mois  -- Mois préc.     │    ██   Email    20%            │
│                                  │    █    Other    10%            │
│                                  │                                   │
├──────────────────────────────────┼──────────────────────────────────┤
│                                  │                                   │
│    FUNNEL (Horizontal bars)      │    TOP CAMPAIGNS (Table)        │
│                                  │                                   │
│    Visits  ████████████ 100K     │    Campaign    Spend   Conv  CPA │
│    Leads   ██████       50K      │    ─────────────────────────────│
│    MQLs    ███          25K      │    Campaign A  [X]   [Y]  [Z €] │
│    SQLs    ██           10K      │    Campaign B  [X]   [Y]  [Z €] │
│    Won     █            5K       │    Campaign C  [X]   [Y]  [Z €] │
│                                  │                                   │
├──────────────────────────────────┴──────────────────────────────────┤
│                                                                      │
│                    PERFORMANCE BY SOURCE (Table)                    │
│                                                                      │
│    Source      Sessions   Leads   Conv%   Revenue   ROAS           │
│    ─────────────────────────────────────────────────────────────── │
│    Google Ads    [X]      [Y]    [Z%]    [W €]     [V:1]           │
│    Facebook      [X]      [Y]    [Z%]    [W €]     [V:1]           │
│    Organic       [X]      [Y]    [Z%]    [W €]     N/A             │
│    Email         [X]      [Y]    [Z%]    [W €]     [V:1]           │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘
```

## 4. Métriques & Calculs

### KPIs Principaux (Scorecards)

| KPI | Calcul | Source | Format |
|-----|--------|--------|--------|
| Revenue | SUM(revenue) where source=organic OR attributed | CRM | Currency |
| Leads | COUNT(contacts) where date in range | CRM | Number |
| ROAS | Revenue / Ad Spend | Calculated | Ratio X:1 |
| Conversion Rate | Conversions / Sessions | GA4 | Percentage |
| CAC | Ad Spend / New Customers | Calculated | Currency |
| MQL Rate | MQLs / Leads | CRM | Percentage |

### Métriques Détaillées

#### Acquisition

| Métrique | Calcul | Granularité |
|----------|--------|-------------|
| Sessions | SUM(sessions) | Source, Date |
| Users | SUM(users) | Source, Date |
| New Users | SUM(newUsers) | Source, Date |
| Bounce Rate | bounces / sessions | Source |
| Avg Session Duration | totalSessionDuration / sessions | Source |

#### Paid Media

| Métrique | Calcul | Par |
|----------|--------|-----|
| Impressions | SUM(impressions) | Campaign, Ad |
| Clicks | SUM(clicks) | Campaign, Ad |
| CTR | clicks / impressions | Campaign |
| CPC | spend / clicks | Campaign |
| Conversions | SUM(conversions) | Campaign |
| CPA | spend / conversions | Campaign |
| ROAS | revenue / spend | Campaign |

#### Email

| Métrique | Calcul |
|----------|--------|
| Sends | SUM(emails_sent) |
| Opens | SUM(emails_opened) |
| Open Rate | opens / sends |
| Clicks | SUM(clicks) |
| CTR | clicks / opens |
| Unsubscribes | SUM(unsubscribes) |
| Unsub Rate | unsubscribes / sends |

### Dimensions

| Dimension | Source | Valeurs |
|-----------|--------|---------|
| Date | Toutes | Date picker |
| Source/Medium | GA4 | google/cpc, facebook/paid... |
| Campaign | Ads/GA4 | Noms campagnes |
| Channel Group | GA4 | Paid Search, Organic, Social... |
| Device | GA4 | Desktop, Mobile, Tablet |
| Country | GA4 | FR, BE, CH... |

## 5. Filtres & Interactions

### Filtres Globaux

| Filtre | Type | Default | Appliqué à |
|--------|------|---------|------------|
| Date Range | Date picker | Last 30 days | Toutes pages |
| Compare to | Toggle + Date | Off | Charts avec comparaison |
| Channel | Multi-select | All | Toutes métriques |
| Campaign | Multi-select | All | Pages Campaigns |
| Device | Dropdown | All | Pages concernées |

### Drill-Downs

| Depuis | Vers | Action |
|--------|------|--------|
| Channel chart | Campaign table | Clic sur segment |
| Campaign row | Ad details | Clic sur ligne |
| Date point | Daily breakdown | Clic sur point |

## 6. Visualisations

### Types de Graphiques

| Métrique | Type | Justification |
|----------|------|---------------|
| Revenue trend | Line chart | Évolution temporelle |
| Channel mix | Pie/Donut | Part relative |
| Funnel | Horizontal bars | Progression étapes |
| Top campaigns | Table | Détail et tri |
| Comparaison | Combo chart | Trends + comparaison |
| Géo | Map | Distribution géographique |

### Conventions Visuelles

| Élément | Convention |
|---------|------------|
| Couleurs canaux | Google: #4285F4, Facebook: #1877F2, Organic: #34A853 |
| Positif/Négatif | Vert ↑ / Rouge ↓ |
| Objectifs | Ligne pointillée |
| Benchmarks | Zone grisée |

## 7. Alertes & Automatisation

### Alertes Configurées

| Alerte | Condition | Destinataires | Canal |
|--------|-----------|---------------|-------|
| Spend anormal | Daily spend > 120% moyenne | Ads team | Slack + Email |
| Drop trafic | Sessions < 50% yesterday | SEO + Mktg | Email |
| Conv rate drop | Conv rate < objectif -20% | CRO team | Slack |
| Budget épuisé | Spend > 95% budget | Ads manager | Email |

### Rapports Automatiques

| Rapport | Fréquence | Heure | Destinataires | Format |
|---------|-----------|-------|---------------|--------|
| Daily snapshot | Quotidien | 8h | Marketing team | Slack |
| Weekly digest | Lundi | 9h | Marketing + Direction | Email PDF |
| Monthly report | 1er du mois | 10h | Direction | Email PDF |

## 8. Permissions & Accès

### Niveaux d'Accès

| Rôle | Accès | Pages |
|------|-------|-------|
| Marketing Team | View + Export | Toutes |
| Direction | View | Overview |
| Ads Team | View + Edit | Campaigns |
| External (Client) | View | Overview (version light) |

### Partage

| Type | Configuration |
|------|---------------|
| Lien public | Non |
| Embed | Oui (pages autorisées) |
| Scheduled emails | Oui |
| Export | PDF, Excel (selon rôle) |

## 9. Maintenance

### Checklist Quotidienne

- [ ] Données rafraîchies
- [ ] Pas d'erreurs de connecteur
- [ ] KPIs cohérents
- [ ] Alertes fonctionnelles

### Maintenance Mensuelle

- [ ] Revue des métriques (pertinence)
- [ ] Ajout/suppression de filtres
- [ ] Performance du dashboard
- [ ] Feedback utilisateurs

### Documentation

| Document | Contenu | Localisation |
|----------|---------|--------------|
| Data dictionary | Définition des métriques | [Lien] |
| User guide | Comment utiliser | [Lien] |
| Technical doc | Sources, calculs | [Lien] |

## Annexes

### A. Data Dictionary
[Définition exhaustive de chaque métrique]

### B. Mockups Détaillés
[Screenshots ou wireframes de chaque page]

### C. Roadmap Évolutions
| Version | Feature | Date |
|---------|---------|------|
| v1.0 | MVP Overview + Campaigns | [Date] |
| v1.1 | Attribution page | [Date] |
| v2.0 | Predictive analytics | [Date] |
```

## Critères d'Acceptation

### Complétude
- [ ] Toutes les sources connectées
- [ ] KPIs clés présents
- [ ] Filtres fonctionnels
- [ ] Alertes configurées
- [ ] Documentation fournie

### Qualité
- [ ] Données cohérentes entre sources
- [ ] Performance acceptable (<10s load)
- [ ] Responsive/lisible
- [ ] Pas d'erreurs de calcul

### Validation
- [ ] Validé par Data team
- [ ] Accepté par utilisateurs finaux
- [ ] Documentation revue

## Anti-Patterns

### ❌ À Éviter

1. **Trop de métriques**
   - Information overload
   - Pas de focus

2. **Données non fiables**
   - Tracking mal configuré
   - Pas de data quality check

3. **Pas de contexte**
   - Chiffres sans comparaison
   - Pas d'objectifs visibles

4. **Dashboard jamais utilisé**
   - Trop complexe
   - Pas adapté aux besoins

### ✅ Bonnes Pratiques

1. **Focus sur les questions** business
2. **Hiérarchie visuelle** claire (KPIs en haut)
3. **Comparaisons systématiques** (MoM, vs objectif)
4. **Refresh automatique** fiable
5. **Formation utilisateurs**

---
id: marketing-objectives
name: Objectifs Marketing
version: 1.0.0
category: marketing
status: active
phase: "2-strategy"
order: 4
agents:
  - direction-marketing/strategie/objectifs-marketing
  - marketing-ops/campagnes/orchestrator
  - marketing-analytics/orchestrator
consumes:
  - project-brief
  - persona
  - brand-positioning
produces_for:
  - marketing-ops/campagnes/planning-campagne
  - marketing-ops/campagnes/budget-allocation
  - marketing-analytics/reporting
  - marketing-ops/performance/funnel-analysis
workflows:
  - id: wf-marketing-objectives
    template: wf-strategy
    phase: Strategy
    name: Définition objectifs marketing
    duration: 2 jours
  - id: wf-objectives-review
    template: wf-validation
    phase: Review
    name: Revue trimestrielle objectifs
    duration: 1 jour
tags:
  - marketing
  - strategie
  - kpis
  - okr
---

# Objectifs Marketing

## Description

Les objectifs marketing définissent les résultats mesurables à atteindre par les actions marketing. Ils alignent les équipes, priorisent les efforts et permettent de mesurer le succès des initiatives.

## Cas d'Usage

- Planification stratégique annuelle/trimestrielle
- Allocation budgétaire marketing
- Pilotage des campagnes
- Évaluation de la performance équipe
- Reporting direction générale

## Structure du Livrable

```markdown
# Objectifs Marketing [Période]

## Vue d'Ensemble

### Contexte Business
- **Objectif business** : [Croissance CA, parts de marché, etc.]
- **Contribution marketing attendue** : [% du pipeline, leads, etc.]
- **Budget total** : [X €]
- **Période** : [Q1 2024 / Année 2024]

### North Star Metric
> **[Métrique principale]** : [Valeur cible]
>
> _"La métrique qui, si elle progresse, signifie que le marketing fait son job"_

## Objectifs Stratégiques (OKRs)

### OKR 1 : [Thème - ex: Acquisition]

**Objective** : [Description qualitative de l'ambition]

| Key Result | Baseline | Target | Confiance |
|------------|----------|--------|-----------|
| KR1.1 : [Métrique] | [Actuel] | [Cible] | [%] |
| KR1.2 : [Métrique] | [Actuel] | [Cible] | [%] |
| KR1.3 : [Métrique] | [Actuel] | [Cible] | [%] |

**Initiatives clés** :
- [Initiative 1]
- [Initiative 2]

---

### OKR 2 : [Thème - ex: Engagement]

**Objective** : [Description qualitative]

| Key Result | Baseline | Target | Confiance |
|------------|----------|--------|-----------|
| KR2.1 : [Métrique] | [Actuel] | [Cible] | [%] |
| KR2.2 : [Métrique] | [Actuel] | [Cible] | [%] |
| KR2.3 : [Métrique] | [Actuel] | [Cible] | [%] |

**Initiatives clés** :
- [Initiative 1]
- [Initiative 2]

---

### OKR 3 : [Thème - ex: Conversion]

**Objective** : [Description qualitative]

| Key Result | Baseline | Target | Confiance |
|------------|----------|--------|-----------|
| KR3.1 : [Métrique] | [Actuel] | [Cible] | [%] |
| KR3.2 : [Métrique] | [Actuel] | [Cible] | [%] |
| KR3.3 : [Métrique] | [Actuel] | [Cible] | [%] |

## KPIs par Canal

### Acquisition

| Canal | KPI Principal | Baseline | Target | Budget |
|-------|---------------|----------|--------|--------|
| **SEO** | Trafic organique | [X] | [Y] | [Z €] |
| **SEA** | Leads qualifiés | [X] | [Y] | [Z €] |
| **Social Ads** | MQLs | [X] | [Y] | [Z €] |
| **Content** | Nouveaux visiteurs | [X] | [Y] | [Z €] |
| **Referral** | Nouveaux clients | [X] | [Y] | [Z €] |

### Engagement

| Canal | KPI Principal | Baseline | Target |
|-------|---------------|----------|--------|
| **Email** | Taux d'ouverture | [X%] | [Y%] |
| **Email** | Taux de clic | [X%] | [Y%] |
| **Blog** | Temps sur page | [Xs] | [Ys] |
| **Social** | Taux engagement | [X%] | [Y%] |

### Conversion

| Étape Funnel | Taux Actuel | Objectif | Impact Revenue |
|--------------|-------------|----------|----------------|
| Visiteur → Lead | [X%] | [Y%] | [+Z €] |
| Lead → MQL | [X%] | [Y%] | [+Z €] |
| MQL → SQL | [X%] | [Y%] | [+Z €] |
| SQL → Client | [X%] | [Y%] | [+Z €] |

### Rétention

| Métrique | Baseline | Target |
|----------|----------|--------|
| Churn rate | [X%] | [Y%] |
| NPS | [X] | [Y] |
| CSAT | [X%] | [Y%] |
| Repeat purchase rate | [X%] | [Y%] |

## Funnel Marketing

```
┌─────────────────────────────────────────────────────────────┐
│                        AWARENESS                             │
│  Objectif : [X] impressions / [Y] reach                     │
│  KPIs : Impressions, Reach, Brand searches                  │
├─────────────────────────────────────────────────────────────┤
│                        ACQUISITION                           │
│  Objectif : [X] visiteurs / [Y] nouveaux                    │
│  KPIs : Sessions, New users, Traffic sources                │
├─────────────────────────────────────────────────────────────┤
│                        ENGAGEMENT                            │
│  Objectif : [X] engaged users / [Y] interactions            │
│  KPIs : Time on site, Pages/session, Bounce rate            │
├─────────────────────────────────────────────────────────────┤
│                        CONVERSION                            │
│  Objectif : [X] leads / [Y] MQLs                            │
│  KPIs : Form submissions, Sign-ups, Demo requests           │
├─────────────────────────────────────────────────────────────┤
│                        REVENUE                               │
│  Objectif : [X €] pipeline / [Y €] revenue                  │
│  KPIs : Pipeline generated, Revenue attributed, CAC         │
└─────────────────────────────────────────────────────────────┘
```

## Attribution & ROI

### Modèle d'Attribution
- **Modèle choisi** : [First touch / Last touch / Linear / Position-based / Data-driven]
- **Justification** : [Pourquoi ce modèle]
- **Outil** : [GA4 / HubSpot / Custom]

### Objectifs ROI

| Canal | Investissement | Revenue Attendu | ROAS Cible |
|-------|----------------|-----------------|------------|
| SEA | [X €] | [Y €] | [Z:1] |
| Social Ads | [X €] | [Y €] | [Z:1] |
| Content | [X €] | [Y €] | [Z:1] |
| Email | [X €] | [Y €] | [Z:1] |

### CAC Objectif

| Segment | CAC Actuel | CAC Cible | LTV | LTV:CAC |
|---------|------------|-----------|-----|---------|
| [Segment 1] | [X €] | [Y €] | [Z €] | [Ratio] |
| [Segment 2] | [X €] | [Y €] | [Z €] | [Ratio] |

## Planning & Milestones

### Jalons Trimestriels

| Trimestre | Focus | Milestone Clé | KPI Principal |
|-----------|-------|---------------|---------------|
| Q1 | [Focus] | [Milestone] | [Target] |
| Q2 | [Focus] | [Milestone] | [Target] |
| Q3 | [Focus] | [Milestone] | [Target] |
| Q4 | [Focus] | [Milestone] | [Target] |

### Checkpoints de Revue

| Fréquence | Participants | Focus |
|-----------|--------------|-------|
| Hebdo | Marketing team | Metrics opérationnels |
| Mensuel | Marketing + Sales | Pipeline & attribution |
| Trimestriel | Direction | OKRs & budget |

## Risques & Dépendances

### Risques Identifiés

| Risque | Probabilité | Impact | Mitigation |
|--------|-------------|--------|------------|
| [Risque 1] | [H/M/L] | [H/M/L] | [Action] |
| [Risque 2] | [H/M/L] | [H/M/L] | [Action] |

### Dépendances

| Dépendance | Équipe | Impact si retard |
|------------|--------|------------------|
| [Dep 1] | [Équipe] | [Impact] |
| [Dep 2] | [Équipe] | [Impact] |

## Dashboard & Reporting

### Métriques Dashboard Principal

| Métrique | Source | Fréquence MAJ |
|----------|--------|---------------|
| [Métrique 1] | [Outil] | [Real-time/Daily/Weekly] |
| [Métrique 2] | [Outil] | [Fréquence] |
| [Métrique 3] | [Outil] | [Fréquence] |

### Reporting Cadence

| Rapport | Audience | Fréquence | Contenu |
|---------|----------|-----------|---------|
| Weekly snapshot | Marketing | Hebdo | KPIs opérationnels |
| Monthly review | Marketing + Sales | Mensuel | Performance canaux |
| Quarterly report | Direction | Trim. | OKRs, ROI, strategic |
```

## Critères d'Acceptation

### Complétude
- [ ] North Star Metric définie
- [ ] 3-5 OKRs avec Key Results mesurables
- [ ] KPIs par canal documentés
- [ ] Objectifs de funnel chiffrés
- [ ] Budget alloué par canal
- [ ] Calendrier de revue établi

### Qualité
- [ ] Objectifs SMART (Specific, Measurable, Achievable, Relevant, Time-bound)
- [ ] Baselines documentées (pas d'objectifs sans point de départ)
- [ ] Alignés avec objectifs business
- [ ] Réalistes par rapport aux ressources

### Validation
- [ ] Validé par Marketing Director
- [ ] Aligné avec Sales sur les objectifs pipeline
- [ ] Approuvé par la direction

## Points de Contrôle Humain

| Checkpoint | Responsable | Critères |
|------------|-------------|----------|
| Données baseline | Data Analyst | Sources fiables |
| Réalisme objectifs | Marketing Director | Historique + capacité |
| Alignement Sales | Head of Sales | Objectifs pipeline communs |
| Validation budget | CFO | Cohérence financière |

## Exemples

### Exemple : SaaS B2B

```markdown
# Objectifs Marketing Q1 2024

## North Star
> **MQLs générés** : 500 MQLs / mois (vs 350 actuellement)

## OKR 1 : Doubler le trafic qualifié

**Objective** : Devenir la référence content sur notre marché

| Key Result | Baseline | Target |
|------------|----------|--------|
| Trafic organique | 15K/mois | 30K/mois |
| Nouveaux mots-clés P1-3 | 45 | 150 |
| Backlinks DR50+ | 12 | 40 |

## OKR 2 : Optimiser le funnel de conversion

**Objective** : Convertir plus efficacement le trafic existant

| Key Result | Baseline | Target |
|------------|----------|--------|
| Taux conversion Landing | 2.1% | 3.5% |
| Coût par MQL | 85€ | 65€ |
| Lead → MQL rate | 25% | 35% |

## Budget Allocation
| Canal | Budget | Objectif MQLs | CPL Cible |
|-------|--------|---------------|-----------|
| SEA | 25K€ | 200 | 125€ |
| LinkedIn Ads | 15K€ | 100 | 150€ |
| Content/SEO | 10K€ | 150 | 67€ |
| Events | 10K€ | 50 | 200€ |
```

### Exemple : E-commerce B2C

```markdown
# Objectifs Marketing 2024

## North Star
> **Revenue e-commerce** : 2.5M€ (vs 1.8M€ en 2023)

## OKR 1 : Acquisition rentable

| Key Result | Baseline | Target |
|------------|----------|--------|
| ROAS global | 3.2:1 | 4:1 |
| Nouveaux clients | 8K | 15K |
| CAC | 35€ | 28€ |

## OKR 2 : Rétention et fidélisation

| Key Result | Baseline | Target |
|------------|----------|--------|
| Repeat purchase rate | 22% | 35% |
| CLV | 95€ | 130€ |
| NPS | 42 | 55 |

## Funnel E-commerce
| Étape | Actuel | Objectif |
|-------|--------|----------|
| Ajout panier | 8% | 12% |
| Checkout started | 45% | 55% |
| Purchase | 65% | 75% |
```

## Anti-Patterns

### ❌ À Éviter

1. **Vanity metrics**
   - Followers, likes sans lien avec le business
   - Metrics flatteurs mais non actionnables

2. **Objectifs flous**
   - "Améliorer la notoriété"
   - "Générer plus de leads"

3. **Objectifs irréalistes**
   - x10 sans ressources supplémentaires
   - Basés sur des souhaits, pas des données

4. **Trop d'objectifs**
   - Plus de 5 OKRs = dilution
   - Impossible de prioriser

5. **Objectifs sans baseline**
   - Pas de point de départ = impossible de mesurer le progrès
   - "Augmenter de 50%" de quoi ?

### ✅ Bonnes Pratiques

1. **Focus sur 3-5 OKRs max** par période
2. **Chaque KR doit avoir une baseline** documentée
3. **Objectifs alignés top-down ET bottom-up**
4. **Revue régulière** avec ajustements si nécessaire
5. **Leading indicators** en plus des lagging

## Intégrations

### Consomme
- `project-brief` : Objectifs business
- `persona` : Segmentation cibles
- `brand-positioning` : Métriques de marque

### Produit pour
- `campaign-planning` : Objectifs campagnes
- `budget-allocation` : Répartition budgétaire
- `funnel-analysis` : Benchmarks funnel
- `content-calendar` : Priorités contenu

## Outils Recommandés

| Outil | Usage |
|-------|-------|
| Notion/Asana | Suivi OKRs |
| Databox/Geckoboard | Dashboards |
| Google Sheets | Budget tracking |
| HubSpot/Salesforce | Pipeline tracking |
| GA4 | Attribution |

## Références

- "Measure What Matters" - John Doerr (OKRs)
- "Lean Analytics" - Alistair Croll
- "Growth Hacker Marketing" - Ryan Holiday

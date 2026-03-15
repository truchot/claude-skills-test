# Reporting & Insights - Référence condensée

## KPI Framework

### KPIs par niveau
| Niveau    | KPIs                                | Fréquence |
|-----------|-------------------------------------|-----------|
| Business  | Revenue, ROI, CAC, LTV              | Mensuel   |
| Marketing | MQL, SQL, CPL, pipeline             | Hebdo     |
| Canal     | CTR, CPC, CVR, ROAS par canal       | Hebdo     |
| Campagne  | Impressions, clics, conversions, CPA | Quotidien |

### North Star par modèle
| Modèle    | North Star        | Métriques support            |
|-----------|-------------------|------------------------------|
| E-commerce| Revenue / session | AOV, CVR, trafic             |
| SaaS B2B  | MRR               | Trials, activation, churn    |
| Lead gen  | SQL qualifiés     | MQL, taux MQL→SQL, CPL      |

## Dashboards

### Architecture : Executive (5-7 KPIs) → Opérationnel (par canal) → Analytique (segments)

| Outil         | Usage          | Source data          |
|---------------|----------------|----------------------|
| Looker Studio | Standard       | GA4, Sheets, BigQuery|
| Tableau       | Enterprise     | Multi-source         |
| Metabase      | Open source    | SQL databases        |

**Pipeline reporting** : Sources → Supermetrics → Sheets → Looker Studio

## Testing & Expérimentation

### Processus : `Hypothèse → Design → Calcul échantillon → Run (2+ sem) → Analyse → Décision`

### Paramètres A/B test
| Paramètre      | Standard     |
|-----------------|--------------|
| Significativité | 95% (p<0.05)|
| Puissance       | 80%          |
| Effet min (MDE) | 5-10%        |
| Durée min       | 2 semaines   |

### Éléments à tester (par impact)
| Élément          | Impact    | Facilité |
|------------------|-----------|----------|
| CTA texte+couleur| Très fort | Facile   |
| Headline         | Fort      | Facile   |
| Pricing display  | Très fort | Facile   |
| Form length      | Fort      | Facile   |
| Layout page      | Fort      | Moyen    |

## Insights & Segmentation

### Funnel : `Visiteurs(100%) → Engagement(40%) → Lead(10%) → MQL(4%) → SQL(2%) → Client(1%)`

### Segmentation RFM
| Segment    | R   | F   | M   | Action             |
|------------|-----|-----|-----|--------------------|
| Champions  | H   | H   | H   | Fidéliser, upsell  |
| À risque   | B   | H   | H   | Réactiver urgent   |
| Nouveaux   | H   | B   | B   | Onboarding         |
| Endormis   | B   | B   | B   | Win-back ou abandon|

### Cohortes utiles
| Cohorte             | Insight                     |
|---------------------|-----------------------------|
| Par date acquisition| Rétention dans le temps     |
| Par canal source    | Qualité trafic par canal    |
| Par premier achat   | Comportement repeat         |

### Predictive analytics
| Modèle            | Usage                     | Data min |
|-------------------|---------------------------|----------|
| Churn prediction  | Clients à risque          | 6 mois   |
| LTV prediction    | Prioriser acquisition     | 12 mois  |
| Propensity scoring| Ciblage personnalisé      | 3 mois   |

## Checklist reporting mensuel
- [ ] KPIs vs objectifs (vert/rouge)
- [ ] Tendances MoM et YoY
- [ ] Top 3 wins + top 3 problèmes
- [ ] Attribution par canal, budget dépensé vs prévu
- [ ] Tests en cours et résultats
- [ ] 3 recommandations actionnables + next steps

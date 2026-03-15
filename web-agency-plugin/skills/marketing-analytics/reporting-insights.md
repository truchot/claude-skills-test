# Reporting & Insights - Référence condensée

## KPI Framework

### KPIs par niveau
| Niveau       | KPIs                                    | Fréquence   |
|--------------|-----------------------------------------|-------------|
| Business     | Revenue, ROI, CAC, LTV                  | Mensuel     |
| Marketing    | MQL, SQL, CPL, pipeline                 | Hebdo       |
| Canal        | CTR, CPC, CVR, ROAS par canal          | Hebdo       |
| Campagne     | Impressions, clics, conversions, CPA    | Quotidien   |

### North Star Metrics par modèle
| Modèle       | North Star          | Métriques support              |
|---------------|--------------------|---------------------------------|
| E-commerce    | Revenue / session  | AOV, CVR, trafic               |
| SaaS B2B      | MRR                | Trials, activation, churn      |
| Lead gen      | SQL qualifiés      | MQL, taux MQL→SQL, CPL        |
| Média         | Engagement / user  | Pages/session, temps, récurrence|

## Dashboards

### Architecture recommandée
```
Executive    → 5-7 KPIs max, tendances, alertes
Opérationnel → Par canal, détail campagnes, drill-down
Analytique   → Exploratoire, segments, cohortes
```

### Outils dashboard
| Outil          | Usage          | Source data         |
|----------------|----------------|---------------------|
| Looker Studio  | Standard       | GA4, Sheets, BigQuery|
| Tableau        | Enterprise     | Multi-source        |
| Power BI       | Microsoft stack| Azure, SQL          |
| Metabase       | Open source    | SQL databases       |

### Automated reporting
```
Sans automation          Avec automation
4h/semaine création  →   15min vérification
Erreurs manuelles    →   Data fiable
Formats variables    →   Templates standardisés
```

**Pipeline simple** : GA4 + Google Ads + Meta → Supermetrics → Sheets → Looker Studio

## Testing & Expérimentation

### A/B Testing - processus
```
Hypothèse → Design test → Calcul taille échantillon → Run → Analyse → Décision
```

### Paramètres clés
| Paramètre          | Standard      | Agressif     |
|---------------------|---------------|--------------|
| Significativité     | 95% (p<0.05) | 90% (p<0.10)|
| Puissance           | 80%           | 80%          |
| MDE (effet min)     | 5-10%         | 10-20%       |
| Durée min           | 2 semaines    | 1 semaine    |

### Éléments à tester (par impact)
| Élément         | Impact potentiel | Facilité |
|-----------------|------------------|----------|
| CTA (texte+couleur)| Très fort     | Facile   |
| Headline        | Fort             | Facile   |
| Layout page     | Fort             | Moyen    |
| Pricing display | Très fort        | Facile   |
| Form length     | Fort             | Facile   |
| Social proof    | Moyen            | Facile   |

### Outils testing
| Outil            | Usage              | Coût      |
|------------------|--------------------|-----------|
| Google Optimize* | A/B basique        | Gratuit   |
| VWO              | A/B + personnalisation| Payant |
| AB Tasty         | A/B, FR            | Payant    |
| Optimizely       | Enterprise         | Premium   |

## Insights & Segmentation

### Funnel analysis
```
Visiteurs → Engagement → Lead → MQL → SQL → Client
  100%    →    40%     → 10%  → 4%  → 2% →  1%
```
**Action** : identifier le plus gros drop-off et optimiser cette étape.

### Cohortes utiles
| Cohorte              | Insight                        |
|----------------------|--------------------------------|
| Par date acquisition | Rétention dans le temps        |
| Par canal source     | Qualité du trafic par canal    |
| Par premier achat    | Comportement repeat            |
| Par segment RFM      | Valeur client                  |

### Segmentation RFM
| Segment      | Recency | Frequency | Monetary | Action              |
|--------------|---------|-----------|----------|---------------------|
| Champions    | Haute   | Haute     | Haute    | Fidéliser, upsell   |
| À risque     | Basse   | Haute     | Haute    | Réactiver urgent    |
| Nouveaux     | Haute   | Basse     | Basse    | Onboarding          |
| Endormis     | Basse   | Basse     | Basse    | Win-back ou abandon |

### Predictive analytics
| Modèle              | Usage                        | Data min     |
|----------------------|------------------------------|--------------|
| Churn prediction     | Identifier clients à risque  | 6 mois       |
| LTV prediction       | Prioriser acquisition        | 12 mois      |
| Propensity scoring   | Ciblage personnalisé         | 3 mois       |
| Forecasting          | Budget planning              | 12+ mois     |

## Checklist reporting mensuel
- [ ] KPIs vs objectifs (vert/rouge)
- [ ] Tendances MoM et YoY
- [ ] Top 3 wins + top 3 problèmes
- [ ] Attribution par canal
- [ ] Budget dépensé vs prévu
- [ ] Tests en cours et résultats
- [ ] Recommandations actionnables (3 max)
- [ ] Next steps avec owners et deadlines

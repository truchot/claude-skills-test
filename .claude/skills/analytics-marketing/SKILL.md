---
name: analytics-marketing
description: Analytics marketing - KPIs, tracking, attribution, reporting
tags: [analytics, kpi, tracking, ga4, attribution, reporting, a/b-testing]
---

# Analytics Marketing

## Quand Utiliser
- Définir et suivre des KPIs marketing
- Configurer le tracking (GA4, GTM)
- Analyser l'attribution des conversions
- Créer des rapports de performance
- Mettre en place des A/B tests

## Funnel AARRR

```
┌─────────────────────────────────────┐
│         ACQUISITION                  │
│   Comment les users arrivent ?       │
│   KPIs: Sessions, sources, CPC      │
├─────────────────────────────────────┤
│         ACTIVATION                   │
│   Première action de valeur ?        │
│   KPIs: Sign-ups, engagement        │
├─────────────────────────────────────┤
│         RETENTION                    │
│   Reviennent-ils ?                   │
│   KPIs: DAU/MAU, churn, cohorts     │
├─────────────────────────────────────┤
│         REVENUE                      │
│   Paient-ils ?                       │
│   KPIs: MRR, ARPU, LTV              │
├─────────────────────────────────────┤
│         REFERRAL                     │
│   Recommandent-ils ?                 │
│   KPIs: NPS, referrals, viralité    │
└─────────────────────────────────────┘
```

## KPIs par Canal

### Acquisition
| Canal | KPIs |
|-------|------|
| SEO | Sessions organiques, positions, CTR SERP |
| SEA | Impressions, clics, CPC, Quality Score |
| Social | Reach, engagement, followers |
| Email | Taux ouverture, CTR, désabonnements |

### Conversion
| Métrique | Formule |
|----------|---------|
| Taux de conversion | Conversions / Visiteurs × 100 |
| CPA (Coût par acquisition) | Dépenses / Conversions |
| ROAS (Return on Ad Spend) | Revenue / Ad Spend |
| CAC (Customer Acquisition Cost) | Total marketing / Nouveaux clients |

### Rétention
| Métrique | Formule |
|----------|---------|
| Churn rate | Clients perdus / Total clients × 100 |
| LTV (Lifetime Value) | ARPU × Durée moyenne client |
| LTV:CAC ratio | LTV / CAC (cible > 3:1) |

## Google Analytics 4

### Événements Clés
```javascript
// Événement personnalisé
gtag('event', 'sign_up', {
  method: 'email'
});

// Événement e-commerce
gtag('event', 'purchase', {
  transaction_id: 'T12345',
  value: 99.99,
  currency: 'EUR',
  items: [{
    item_id: 'SKU123',
    item_name: 'Product Name',
    price: 99.99,
    quantity: 1
  }]
});
```

### Dimensions & Métriques
| Type | Exemples |
|------|----------|
| Dimensions | source, medium, campaign, page_path |
| Métriques | sessions, users, conversions, engagement_rate |

## Attribution

### Modèles d'Attribution
| Modèle | Description |
|--------|-------------|
| Last click | 100% au dernier clic |
| First click | 100% au premier clic |
| Linear | Réparti également |
| Time decay | Plus de poids aux récents |
| Data-driven | Basé sur les données |

### UTM Parameters
```
https://example.com/page?
  utm_source=google
  &utm_medium=cpc
  &utm_campaign=spring_sale
  &utm_content=banner_1
  &utm_term=keyword
```

## A/B Testing

### Méthodologie
1. **Hypothèse** - "Si [changement], alors [résultat] car [raison]"
2. **Calcul taille échantillon** - Puissance statistique
3. **Durée** - Minimum 2 semaines, cycles complets
4. **Analyse** - Significativité statistique (p < 0.05)

### Éléments à Tester
- Headlines et copy
- CTA (texte, couleur, position)
- Images et visuels
- Formulaires (champs, layout)
- Prix et offres

### Calcul Significativité
```
Conversion A: 2.5% (n=10,000)
Conversion B: 3.0% (n=10,000)
Lift: +20%
p-value: 0.03 (significatif)
```

## Reporting

### Dashboard Mensuel
```
┌─────────────────────────────────────┐
│ OVERVIEW                             │
│ Sessions: 50K | Users: 35K | Conv: 2%│
├──────────────────┬──────────────────┤
│ ACQUISITION      │ ENGAGEMENT       │
│ - Organic: 40%   │ - Avg time: 2:30 │
│ - Paid: 25%      │ - Pages/session: │
│ - Direct: 20%    │   3.2            │
│ - Referral: 15%  │ - Bounce: 45%    │
├──────────────────┴──────────────────┤
│ CONVERSIONS                          │
│ - Leads: 500 (CPA: €20)             │
│ - Sales: 50 (CPA: €200)             │
│ - Revenue: €25K (ROAS: 5x)          │
├─────────────────────────────────────┤
│ TOP PAGES                            │
│ 1. /landing-page    - 5K visits     │
│ 2. /blog/article-1  - 3K visits     │
│ 3. /pricing         - 2K visits     │
└─────────────────────────────────────┘
```

## Outils

| Outil | Usage |
|-------|-------|
| Google Analytics 4 | Web analytics |
| Google Tag Manager | Tag management |
| Hotjar / Clarity | Heatmaps, recordings |
| Mixpanel | Product analytics |
| Amplitude | Behavioral analytics |
| Looker Studio | Dashboards |

## Références
- https://analytics.google.com/
- https://tagmanager.google.com/
- https://support.google.com/analytics

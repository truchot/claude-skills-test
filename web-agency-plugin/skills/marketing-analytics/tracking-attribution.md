# Tracking & Attribution - Référence condensée

## GTM - Setup standard

### Architecture data layer
```javascript
window.dataLayer = window.dataLayer || [];
dataLayer.push({
  'event': 'purchase',
  'ecommerce': {
    'transaction_id': 'T-123',
    'value': 99.90,
    'currency': 'EUR',
    'items': [{ 'item_id': 'SKU-001', 'item_name': 'Produit X', 'price': 99.90 }]
  }
});
```

### Events GA4 essentiels
| Event            | Trigger               | Paramètres clés          |
|------------------|-----------------------|--------------------------|
| page_view        | Chaque page           | page_title, page_location|
| scroll           | 90% page              | percent_scrolled         |
| click (outbound) | Lien externe          | link_url, link_text      |
| form_submit      | Soumission formulaire | form_id, form_name       |
| purchase         | Transaction           | value, transaction_id    |
| generate_lead    | Lead capté            | value, currency          |
| sign_up          | Inscription           | method                   |

### Checklist GTM
- [ ] Container installé (head + body)
- [ ] Data layer structuré et documenté
- [ ] Triggers configurés (pageview, clicks, forms)
- [ ] Variables custom définies
- [ ] Preview/Debug validé
- [ ] Versionné avec notes

## Pixels & Server-Side

### Pixels prioritaires
| Pixel          | Usage                  | Placement           |
|----------------|------------------------|---------------------|
| GA4            | Analytics              | Toutes pages        |
| Meta Pixel     | Facebook/Instagram Ads | Toutes + events     |
| Google Ads     | Conversions search/display| Pages conversion |
| LinkedIn Insight| B2B attribution       | Toutes pages        |
| TikTok Pixel   | TikTok Ads            | Toutes + events     |

### Server-side tracking
```
Client → Serveur propriétaire → Plateformes (GA4, Meta CAPI, etc.)
```
**Avantages** : contourne ad-blockers, meilleur contrôle data, RGPD+, durée cookies

### Consent Mode (Google)
```javascript
// Défaut avant choix utilisateur
gtag('consent', 'default', {
  'ad_storage': 'denied',
  'analytics_storage': 'denied',
  'ad_user_data': 'denied',
  'ad_personalization': 'denied'
});
// Après acceptation → gtag('consent', 'update', {...'granted'})
```

### CMP recommandés
| CMP          | Type        | TCF 2.2 | Consent Mode |
|--------------|-------------|---------|--------------|
| Axeptio      | SaaS        | Oui     | Oui          |
| Cookiebot    | SaaS        | Oui     | Oui          |
| Tarteaucitron| Open source | Oui     | Partiel      |
| Didomi       | SaaS        | Oui     | Oui          |

## Attribution

### Modèles d'attribution

| Modèle              | Logique                         | Usage             |
|----------------------|---------------------------------|-------------------|
| Last click           | 100% au dernier clic           | Par défaut GA4    |
| First click          | 100% au premier contact        | Awareness         |
| Linéaire             | Répartition égale              | Vue équilibrée    |
| Time decay           | Plus récent = plus de crédit   | Cycles courts     |
| Position-based       | 40% first + 40% last + 20% mid| Compromis         |
| Data-driven (DDA)    | ML-based                       | Recommandé si data|

### Customer journey - touchpoints
```
Awareness        Consideration     Decision
(Display, Social) → (SEO, Email) → (SEA, Retargeting) → Conversion
```

### Cross-device tracking
| Méthode          | Précision | Couverture |
|------------------|-----------|------------|
| Login (déterministe)| Très haute| Limité (users loggés)|
| Probabiliste     | Moyenne   | Large      |
| Google Signals   | Haute     | Users Google|
| Device graph     | Haute     | Payant     |

## UTM - Convention de nommage

### Structure standard
```
?utm_source={source}&utm_medium={medium}&utm_campaign={campaign}&utm_content={content}
```

### Valeurs recommandées
| Paramètre    | Valeurs types                              |
|--------------|--------------------------------------------|
| utm_source   | google, facebook, linkedin, newsletter     |
| utm_medium   | cpc, social, email, display, organic       |
| utm_campaign | spring-2026, product-launch, webinar-seo   |
| utm_content  | cta-header, banner-v2, link-footer         |

## Checklist tracking complet
- [ ] GA4 configuré + events custom
- [ ] GTM installé et versionné
- [ ] Data layer documenté
- [ ] Pixels ads installés (Meta, Google, LinkedIn)
- [ ] Server-side tracking évalué/déployé
- [ ] CMP RGPD conforme + Consent Mode
- [ ] UTMs standardisés (spreadsheet de référence)
- [ ] Attribution model choisi et configuré
- [ ] Cross-device activé (Google Signals)
- [ ] Conversions importées dans les plateformes ads

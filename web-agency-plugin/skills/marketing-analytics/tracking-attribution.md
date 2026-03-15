# Tracking & Attribution - Référence condensée

## GTM & Data Layer

### Data layer standard
```javascript
dataLayer.push({
  'event': 'purchase',
  'ecommerce': {
    'transaction_id': 'T-123', 'value': 99.90, 'currency': 'EUR',
    'items': [{ 'item_id': 'SKU-001', 'item_name': 'Produit', 'price': 99.90 }]
  }
});
```

### Events GA4 essentiels
| Event         | Trigger             | Paramètres clés           |
|---------------|---------------------|---------------------------|
| page_view     | Chaque page         | page_title, page_location |
| scroll        | 90% page            | percent_scrolled          |
| form_submit   | Formulaire soumis   | form_id, form_name        |
| purchase      | Transaction         | value, transaction_id     |
| generate_lead | Lead capté          | value, currency           |

### Checklist GTM
- [ ] Container head + body installé
- [ ] Data layer structuré et documenté
- [ ] Triggers (pageview, clicks, forms) configurés
- [ ] Preview/Debug validé, versionné avec notes

## Pixels & Consent

### Pixels prioritaires
| Pixel         | Usage              | Placement        |
|---------------|--------------------|------------------|
| GA4           | Analytics          | Toutes pages     |
| Meta Pixel    | Facebook/Insta Ads | Toutes + events  |
| Google Ads    | Conversions        | Pages conversion |
| LinkedIn      | B2B attribution    | Toutes pages     |

### Consent Mode (Google)
```javascript
gtag('consent', 'default', {
  'ad_storage': 'denied', 'analytics_storage': 'denied',
  'ad_user_data': 'denied', 'ad_personalization': 'denied'
});
// Après acceptation → gtag('consent', 'update', {...'granted'})
```

### CMP recommandés
| CMP          | Type        | TCF 2.2 | Consent Mode |
|--------------|-------------|---------|--------------|
| Axeptio      | SaaS        | Oui     | Oui          |
| Cookiebot    | SaaS        | Oui     | Oui          |
| Tarteaucitron| Open source | Oui     | Partiel      |

**Server-side** : `Client → Serveur propre → Plateformes` (contourne ad-blockers, RGPD+)

## Attribution

### Modèles
| Modèle          | Logique                        | Usage            |
|-----------------|--------------------------------|------------------|
| Last click      | 100% dernier clic              | Par défaut GA4   |
| First click     | 100% premier contact           | Awareness        |
| Linéaire        | Répartition égale              | Vue équilibrée   |
| Time decay      | Plus récent = plus de crédit   | Cycles courts    |
| Data-driven     | ML-based                       | Recommandé       |

### Cross-device
| Méthode            | Précision  | Couverture        |
|--------------------|------------|-------------------|
| Login déterministe | Très haute | Users loggés      |
| Google Signals     | Haute      | Users Google      |
| Probabiliste       | Moyenne    | Large             |

## UTM - Convention

### Structure : `?utm_source={source}&utm_medium={medium}&utm_campaign={campaign}`

| Paramètre    | Valeurs types                          |
|--------------|----------------------------------------|
| utm_source   | google, facebook, linkedin, newsletter |
| utm_medium   | cpc, social, email, display, organic   |
| utm_campaign | spring-2026, product-launch            |
| utm_content  | cta-header, banner-v2                  |

## Checklist tracking complet
- [ ] GA4 + events custom configurés
- [ ] GTM installé et versionné
- [ ] Pixels ads (Meta, Google, LinkedIn)
- [ ] CMP RGPD + Consent Mode
- [ ] UTMs standardisés
- [ ] Attribution model choisi
- [ ] Cross-device (Google Signals)
- [ ] Conversions importées dans plateformes ads

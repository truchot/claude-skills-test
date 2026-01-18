---
id: analytics-setup
name: Configuration Analytics
version: 1.0.0
category: code
status: active
phase: "6-lancement"
order: 3
agents:
  - marketing/analytics/tracking-setup
  - marketing/analytics/dashboard-builder
consumes:
  - requirements-list
  - project-brief
produces_for:
  - marketing/analytics/reporting
  - direction-marketing/mesure/kpis-definition
tags: [analytics, tracking, ga4, gtm, conversion, kpi]
---

# Configuration Analytics

## Description

Mise en place complète du tracking analytics : Google Analytics 4, Google Tag Manager, événements personnalisés et tableaux de bord. Permet de mesurer les KPIs définis dans le brief projet.

## Format de Sortie

| Attribut | Valeur |
|----------|--------|
| **Type** | Configuration + Documentation |
| **Emplacement** | `docs/analytics/`, GTM container |
| **Nommage** | `analytics-setup.md`, `GTM-XXXXXX` |
| **Encoding** | UTF-8 |

## Structure du Contenu

### Sections Obligatoires

- [ ] **Plan de taggage** - Événements à tracker
- [ ] **Configuration GA4** - Property setup
- [ ] **Configuration GTM** - Tags, triggers, variables
- [ ] **Conversions** - Goals et e-commerce
- [ ] **Validation** - Tests et debug

### Sections Optionnelles

- [ ] **Dashboards** - Looker Studio / GA4
- [ ] **Segments** - Audiences personnalisées
- [ ] **Attributions** - Modèle d'attribution

## Critères d'Acceptation

| # | Critère | Seuil/Condition | Vérification | Obligatoire |
|---|---------|-----------------|--------------|-------------|
| 1 | Events trackés | Tous les events du plan | GTM Preview | Oui |
| 2 | Conversions | E-commerce + goals | GA4 Realtime | Oui |
| 3 | RGPD | Consent mode actif | Test | Oui |
| 4 | Documentation | Plan de taggage complet | Manuel | Oui |

## Prérequis (Inputs)

| Source | Livrable/Donnée | Description |
|--------|-----------------|-------------|
| `project-management/*` | `project-brief` | KPIs définis |
| `client-intake/*` | `requirements-list` | Objectifs business |
| `direction-marketing/*` | `marketing-strategy` | Stratégie acquisition |

## Points de Validation Humaine

| Étape | Moment | Validateur | Action si KO |
|-------|--------|------------|--------------|
| 1 | Plan de taggage | Client + Marketing | Ajuster |
| 2 | Implémentation | QA Analytics | Corriger |
| 3 | Post-launch | Marketing | Itérer |

## Exemple

### Configuration Complète

```markdown
# 📊 Configuration Analytics
## E-commerce Artisanat Dupont

---

## 1. Informations Compte

### Google Analytics 4
| Attribut | Valeur |
|----------|--------|
| Property ID | G-XXXXXXXXXX |
| Property Name | Artisanat Dupont - Production |
| Data Stream | Web - www.artisanat-dupont.fr |
| Measurement ID | G-XXXXXXXXXX |

### Google Tag Manager
| Attribut | Valeur |
|----------|--------|
| Container ID | GTM-XXXXXXX |
| Container Name | Artisanat Dupont |
| Environment | Production |

### Accès
| Rôle | Email | Niveau |
|------|-------|--------|
| Admin | jean@dupont.fr | Admin |
| Agence | analytics@agence.fr | Editor |
| Marketing | marie@agence.fr | Analyst |

---

## 2. Plan de Taggage

### Événements Standard (GA4 Enhanced Measurement)
| Événement | Auto | Description |
|-----------|------|-------------|
| `page_view` | ✅ | Vue de page |
| `scroll` | ✅ | Scroll 90% |
| `click` | ✅ | Clics sortants |
| `file_download` | ✅ | Téléchargements |
| `video_start/progress/complete` | ✅ | Vidéos YouTube |

### Événements E-commerce
| Événement | Trigger | Paramètres |
|-----------|---------|------------|
| `view_item_list` | Page catalogue | `item_list_id`, `items[]` |
| `select_item` | Clic produit | `item_list_id`, `items[]` |
| `view_item` | Page produit | `currency`, `value`, `items[]` |
| `add_to_cart` | Bouton "Ajouter" | `currency`, `value`, `items[]` |
| `remove_from_cart` | Bouton "Supprimer" | `currency`, `value`, `items[]` |
| `view_cart` | Page panier | `currency`, `value`, `items[]` |
| `begin_checkout` | Page checkout | `currency`, `value`, `items[]` |
| `add_shipping_info` | Étape livraison | `currency`, `value`, `shipping_tier`, `items[]` |
| `add_payment_info` | Étape paiement | `currency`, `value`, `payment_type`, `items[]` |
| `purchase` | Confirmation | `transaction_id`, `value`, `tax`, `shipping`, `items[]` |

### Événements Personnalisés
| Événement | Trigger | Paramètres | Objectif |
|-----------|---------|------------|----------|
| `newsletter_signup` | Submit form | `method` | Lead gen |
| `contact_form_submit` | Submit contact | `subject` | Lead gen |
| `search` | Recherche | `search_term` | UX |
| `filter_apply` | Filtres catalogue | `filter_type`, `filter_value` | UX |
| `product_share` | Bouton partage | `method`, `item_id` | Engagement |

### Structure Item (produit)
```javascript
{
  item_id: "MIEL-LAV-500",
  item_name: "Miel de Lavande 500g",
  item_brand: "Artisanat Dupont",
  item_category: "Miels",
  item_category2: "Lavande",
  item_variant: "500g",
  price: 12.90,
  quantity: 1
}
```

---

## 3. Configuration GTM

### Variables

#### Variables Built-in (activées)
- Page URL, Page Path, Page Hostname
- Click Element, Click Classes, Click ID, Click URL
- Form Element, Form Classes, Form ID

#### Variables Data Layer
| Nom | Type | Data Layer Variable |
|-----|------|---------------------|
| DLV - ecommerce.items | Data Layer | `ecommerce.items` |
| DLV - ecommerce.value | Data Layer | `ecommerce.value` |
| DLV - ecommerce.transaction_id | Data Layer | `ecommerce.transaction_id` |
| DLV - user.id | Data Layer | `user.id` |

#### Variables Constantes
| Nom | Valeur |
|-----|--------|
| Const - GA4 Measurement ID | G-XXXXXXXXXX |
| Const - Currency | EUR |

### Tags

#### GA4 Configuration
```
Tag Type: Google Analytics: GA4 Configuration
Measurement ID: {{Const - GA4 Measurement ID}}
Send page views: true
Trigger: Consent Initialized - Analytics
```

#### GA4 E-commerce Events
```
Tag Type: Google Analytics: GA4 Event
Configuration Tag: GA4 Config
Event Name: {{Event}}
E-commerce: Send E-commerce data (Data layer)
Trigger: Custom Event - ecommerce
```

#### GA4 Custom Events
```
Tag Type: Google Analytics: GA4 Event
Event Name: newsletter_signup
Parameters:
  - method: {{DLV - signup.method}}
Trigger: Custom Event - newsletter_signup
```

### Triggers

| Nom | Type | Condition |
|-----|------|-----------|
| All Pages | Page View | - |
| Consent Initialized - Analytics | Custom Event | `gtm.init_consent` + analytics consent granted |
| Custom Event - ecommerce | Custom Event | Event matches `view_item|add_to_cart|purchase|...` |
| Custom Event - newsletter_signup | Custom Event | Event equals `newsletter_signup` |
| Click - CTA Acheter | Click | Click Classes contains `btn-add-cart` |
| Form Submit - Newsletter | Form Submission | Form ID equals `newsletter-form` |

---

## 4. Implémentation Code

### Installation GTM (Next.js)

```typescript
// src/lib/gtm.ts
export const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;

export const pageview = (url: string) => {
  if (typeof window !== 'undefined' && window.dataLayer) {
    window.dataLayer.push({
      event: 'page_view',
      page_path: url,
    });
  }
};
```

```tsx
// src/app/layout.tsx
import { GoogleTagManager } from '@next/third-parties/google';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM_ID!} />
      </body>
    </html>
  );
}
```

### Hook Analytics E-commerce

```typescript
// src/hooks/useAnalytics.ts
import { useCallback } from 'react';

interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  quantity?: number;
}

export function useAnalytics() {
  const trackEvent = useCallback((event: string, params?: Record<string, any>) => {
    if (typeof window !== 'undefined' && window.dataLayer) {
      window.dataLayer.push({ event, ...params });
    }
  }, []);

  const trackViewItem = useCallback((product: Product) => {
    trackEvent('view_item', {
      ecommerce: {
        currency: 'EUR',
        value: product.price,
        items: [formatItem(product)],
      },
    });
  }, [trackEvent]);

  const trackAddToCart = useCallback((product: Product, quantity: number = 1) => {
    trackEvent('add_to_cart', {
      ecommerce: {
        currency: 'EUR',
        value: product.price * quantity,
        items: [formatItem({ ...product, quantity })],
      },
    });
  }, [trackEvent]);

  const trackPurchase = useCallback((order: {
    id: string;
    total: number;
    tax: number;
    shipping: number;
    items: Product[];
  }) => {
    trackEvent('purchase', {
      ecommerce: {
        transaction_id: order.id,
        value: order.total,
        tax: order.tax,
        shipping: order.shipping,
        currency: 'EUR',
        items: order.items.map(formatItem),
      },
    });
  }, [trackEvent]);

  return {
    trackEvent,
    trackViewItem,
    trackAddToCart,
    trackPurchase,
  };
}

function formatItem(product: Product) {
  return {
    item_id: product.id,
    item_name: product.name,
    item_category: product.category,
    price: product.price,
    quantity: product.quantity || 1,
  };
}
```

### Consent Mode (RGPD)

```typescript
// src/lib/consent.ts
export function updateConsent(granted: boolean) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('consent', 'update', {
      analytics_storage: granted ? 'granted' : 'denied',
      ad_storage: granted ? 'granted' : 'denied',
    });
  }
}

// Default (before consent)
// In GTM: Consent Initialization tag
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('consent', 'default', {
  analytics_storage: 'denied',
  ad_storage: 'denied',
  wait_for_update: 500,
});
```

---

## 5. Conversions & Goals

### GA4 Conversions (à marquer)
| Événement | Type | Valeur |
|-----------|------|--------|
| `purchase` | E-commerce | Dynamique |
| `newsletter_signup` | Lead | - |
| `contact_form_submit` | Lead | - |

### Configuration dans GA4
1. Admin → Events → Mark as conversion
2. Ou Admin → Conversions → New conversion event

---

## 6. Validation & Debug

### Checklist Pré-Launch

| Test | Outil | Status |
|------|-------|--------|
| GTM Preview mode | GTM | ⬜ |
| GA4 DebugView | GA4 | ⬜ |
| Events e-commerce | GA4 Realtime | ⬜ |
| Purchase tracking | Test order | ⬜ |
| Consent mode | Toggle consent | ⬜ |
| Cross-domain (si applicable) | GA4 Debug | ⬜ |

### Test E-commerce Complet
1. Ouvrir GTM Preview
2. Naviguer : Homepage → Catalogue → Produit → Panier → Checkout → Purchase
3. Vérifier chaque event dans GTM
4. Vérifier dans GA4 DebugView
5. Vérifier dans GA4 Realtime > Events

### Debug Console
```javascript
// Dans la console navigateur
dataLayer.filter(e => e.event).map(e => e.event)
// Doit afficher : page_view, view_item_list, view_item, add_to_cart, etc.
```

---

## 7. Dashboards

### GA4 Reports (personnalisés)
- **Funnel E-commerce** : view_item_list → view_item → add_to_cart → begin_checkout → purchase
- **Product Performance** : par catégorie, par produit
- **Acquisition** : par source/medium

### Looker Studio (optionnel)
Template recommandé : [E-commerce Dashboard Template](https://lookerstudio.google.com/gallery)

Métriques clés :
- Sessions / Users
- Taux de conversion e-commerce
- Panier moyen
- Top produits
- Sources de trafic

---

## 8. Documentation Technique

### Data Layer Schema
```typescript
interface DataLayer {
  event: string;
  ecommerce?: {
    currency: 'EUR';
    value: number;
    transaction_id?: string;
    tax?: number;
    shipping?: number;
    items: Array<{
      item_id: string;
      item_name: string;
      item_category?: string;
      item_brand?: string;
      price: number;
      quantity: number;
    }>;
  };
  user?: {
    id?: string;
    logged_in: boolean;
  };
}
```

### Événements Nomenclature
- Format : `snake_case`
- Préfixes standards GA4 : `view_`, `select_`, `add_`, `remove_`, `begin_`
- Custom : `[objet]_[action]` (ex: `newsletter_signup`, `contact_form_submit`)
```

## Anti-patterns

| Anti-pattern | Pourquoi c'est problématique | Correction |
|--------------|------------------------------|------------|
| Pas de plan de taggage | Données incohérentes | Documenter avant d'implémenter |
| Tracking sans consent | Illégal RGPD | Consent mode obligatoire |
| Pas de debug | Events manquants | Toujours tester en preview |
| Trop d'events | Bruit, quotas | Focus sur l'essentiel |
| Pas de documentation | Maintenance difficile | Tout documenter |

## Références

- [GA4 E-commerce](https://developers.google.com/analytics/devguides/collection/ga4/ecommerce)
- [GTM Server-side](https://developers.google.com/tag-platform/tag-manager/server-side)
- [Consent Mode](https://developers.google.com/tag-platform/devguides/consent)
- Livrables liés : `project-brief`, `marketing-strategy`, `monitoring-setup`

## Historique des Versions

| Version | Date | Auteur | Changements |
|---------|------|--------|-------------|
| 1.0.0 | 2026-01-18 | marketing | Création initiale |

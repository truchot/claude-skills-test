# Contexte Analytics

Connaissances essentielles pour la mesure et l'analyse de données.

## Stack Analytics

### Outils par Catégorie

```
Web Analytics:
  Google Analytics 4 (GA4)    → Standard, gratuit
  Matomo                      → Alternative RGPD-friendly
  Plausible                   → Simple, privacy-first
  Adobe Analytics             → Enterprise

Tag Management:
  Google Tag Manager (GTM)    → Standard
  Segment                     → CDP + routage
  Tealium                     → Enterprise

Visualisation:
  Looker Studio (ex Data Studio)  → Gratuit, Google ecosystem
  Tableau                         → Enterprise
  Metabase                        → Open source
  Power BI                        → Microsoft ecosystem

Heatmaps & Session Recording:
  Hotjar                      → Heatmaps, recordings, surveys
  Microsoft Clarity           → Gratuit, recordings
  FullStory                   → Enterprise
  Contentsquare               → Enterprise
```

## Google Analytics 4 (GA4)

### Différences GA4 vs Universal Analytics

```
Universal Analytics (mort)     GA4 (actuel)
─────────────────────────────────────────────
Sessions                       Events
Bounce Rate                    Engagement Rate
Pageviews                      page_view (event)
Goals                          Conversions
Views (profils)                Data Streams
```

### Modèle de Données GA4

```
Tout est événement:

Événements automatiques (collectés par défaut):
  - page_view
  - session_start
  - first_visit
  - user_engagement

Événements améliorés (Enhanced Measurement):
  - scroll (90% de la page)
  - click (liens sortants)
  - file_download
  - video_start, video_progress, video_complete
  - form_start, form_submit

Événements recommandés (e-commerce, etc.):
  - view_item
  - add_to_cart
  - begin_checkout
  - purchase

Événements personnalisés:
  - [votre_event]
```

### Configuration GTM + GA4

```javascript
// Configuration GA4 de base (GTM)
Tag: GA4 Configuration
  Measurement ID: G-XXXXXXXXXX
  Trigger: All Pages

// Event personnalisé
Tag: GA4 Event
  Configuration Tag: {{GA4 Config}}
  Event Name: contact_form_submit
  Parameters:
    form_name: {{Form Name}}
    form_location: {{Page Path}}
  Trigger: Form Submission - Contact
```

### Événements E-commerce GA4

```javascript
// View Item
gtag('event', 'view_item', {
  currency: 'EUR',
  value: 99.99,
  items: [{
    item_id: 'SKU123',
    item_name: 'Produit Example',
    item_category: 'Catégorie',
    price: 99.99,
    quantity: 1
  }]
});

// Add to Cart
gtag('event', 'add_to_cart', {
  currency: 'EUR',
  value: 99.99,
  items: [{ item_id: 'SKU123', item_name: 'Produit', price: 99.99, quantity: 1 }]
});

// Purchase
gtag('event', 'purchase', {
  transaction_id: 'T12345',
  currency: 'EUR',
  value: 119.99,
  tax: 20.00,
  shipping: 5.00,
  items: [{ item_id: 'SKU123', item_name: 'Produit', price: 99.99, quantity: 1 }]
});
```

### Dimensions & Métriques Clés

```
ACQUISITION
  Sessions                → Nombre de visites
  Users                   → Visiteurs uniques
  New Users               → Nouveaux visiteurs
  Traffic Source          → Source de trafic
  Medium                  → Canal (organic, cpc, email...)
  Campaign                → Campagne marketing

ENGAGEMENT
  Engaged Sessions        → Sessions > 10s OU conversion OU 2+ pages
  Engagement Rate         → Engaged Sessions / Sessions
  Avg Engagement Time     → Temps moyen d'engagement
  Events Count            → Nombre d'événements
  Views                   → Pages vues

CONVERSION
  Conversions             → Nombre de conversions
  Conversion Rate         → Conversions / Sessions

E-COMMERCE
  Total Revenue           → CA total
  Ecommerce Purchases     → Nombre de transactions
  Average Purchase Value  → Panier moyen
  Purchase Revenue        → CA des achats
```

## Attribution

### Modèles d'Attribution GA4

```
Data-Driven (défaut):
  → Algorithme ML qui distribue le crédit
  → Recommandé si assez de données

Last Click:
  → 100% au dernier clic (hors direct)
  → Simple mais incomplet

First Click:
  → 100% au premier point de contact
  → Utile pour mesurer la découverte

Linear:
  → Crédit égal à tous les touchpoints
  → Vision équilibrée

Time Decay:
  → Plus de crédit aux touchpoints récents
  → Bon pour cycles courts

Position-Based:
  → 40% premier, 40% dernier, 20% milieu
  → Compromis courant
```

### Fenêtres d'Attribution

```
Acquisition:
  - Lookback: 30 jours (défaut)
  - Jusqu'à 90 jours

Engagement:
  - Lookback: 30 jours
  - Attribution événements utilisateur

Conversion:
  - Lookback: 30-90 jours selon type
```

## Google Tag Manager (GTM)

### Architecture GTM

```
Container
├── Tags          → Actions à exécuter (GA4, Ads, FB...)
├── Triggers      → Quand exécuter les tags
├── Variables     → Données dynamiques
└── Folders       → Organisation

Workflow:
1. Créer les variables nécessaires
2. Configurer le trigger (condition)
3. Créer le tag (action)
4. Tester en Preview mode
5. Publier la version
```

### Variables Courantes

```
Built-in Variables:
  {{Page URL}}              → URL complète
  {{Page Path}}             → /chemin/page
  {{Page Hostname}}         → domain.com
  {{Referrer}}              → Page précédente
  {{Click URL}}             → URL du lien cliqué
  {{Click Text}}            → Texte du lien
  {{Form ID}}               → ID du formulaire

Custom Variables:
  Data Layer Variable       → Lit une variable du dataLayer
  DOM Element               → Lit le contenu d'un élément
  JavaScript Variable       → Lit une variable JS
  Custom JavaScript         → Retourne une valeur calculée
  Lookup Table              → Correspondance valeur → valeur
```

### Data Layer

```javascript
// Initialisation
window.dataLayer = window.dataLayer || [];

// Push d'événement
dataLayer.push({
  event: 'form_submit',
  formName: 'contact',
  formLocation: 'footer'
});

// Push e-commerce
dataLayer.push({
  event: 'purchase',
  ecommerce: {
    transaction_id: 'T12345',
    value: 99.99,
    currency: 'EUR',
    items: [{
      item_id: 'SKU123',
      item_name: 'Produit',
      price: 99.99
    }]
  }
});

// Reset ecommerce avant nouveau push
dataLayer.push({ ecommerce: null });
```

### Triggers Courants

```
Page View Triggers:
  - All Pages
  - Some Pages (condition URL)
  - DOM Ready
  - Window Loaded

Click Triggers:
  - All Clicks
  - Just Links
  - Click URL contains X
  - Click Element matches CSS selector

Form Triggers:
  - Form Submission
  - Form ID equals X

Custom Event Triggers:
  - Event name equals 'purchase'
  - Event name matches regex
```

## Dashboards & Reporting

### Structure Dashboard Type

```
1. RÉSUMÉ EXÉCUTIF
   - KPIs principaux (cards)
   - Tendance vs période précédente
   - Alertes / anomalies

2. ACQUISITION
   - Trafic par source/medium
   - Évolution temporelle
   - Répartition canaux (pie chart)

3. ENGAGEMENT
   - Pages les plus vues
   - Temps moyen par page
   - Taux de rebond par section

4. CONVERSION
   - Funnel de conversion
   - Taux par étape
   - Conversions par source

5. E-COMMERCE (si applicable)
   - CA, transactions, panier moyen
   - Top produits
   - Performance par catégorie
```

### Formules Looker Studio

```
Métriques calculées:

// Taux de conversion
Conversions / Sessions

// Valeur par session
Revenue / Sessions

// Variation vs période précédente
(Current - Previous) / Previous

// Score engagement (exemple)
(Engaged Sessions * 0.5) + (Conversions * 2)
```

### Filtres Recommandés

```
Exclusions standard:
  - Trafic interne (IP bureau)
  - Spam referrers
  - Environnements de dev/staging
  - Bots connus

Paramètres GA4:
  Admin > Data Streams > Configure > Define internal traffic
  Admin > Data Settings > Data Filters
```

## KPIs par Objectif

### Site Vitrine / Génération de Leads

```
Acquisition:
  - Sessions
  - Users
  - Traffic by source

Engagement:
  - Pages / session
  - Avg session duration
  - Bounce rate (pages clés)

Conversion:
  - Form submissions (lead gen)
  - CTA clicks
  - Contact page visits
  - Phone clicks (mobile)

Coût:
  - Cost per Lead (si paid)
  - CAC (Customer Acquisition Cost)
```

### E-commerce

```
Acquisition:
  - Sessions by source
  - New vs returning
  - Traffic quality (engagement rate)

Conversion:
  - Ecommerce conversion rate
  - Add-to-cart rate
  - Checkout abandonment rate
  - Purchase completion rate

Revenue:
  - Total revenue
  - Average order value
  - Revenue per user
  - Customer lifetime value

Product:
  - Product views
  - Add-to-cart by product
  - Cart-to-purchase rate
  - Top/bottom performers
```

### SaaS / Application

```
Acquisition:
  - Signups (free trial, freemium)
  - Source of signups
  - Signup conversion rate

Activation:
  - Onboarding completion
  - First key action (Aha moment)
  - Time to first value

Engagement:
  - DAU, WAU, MAU
  - Feature adoption
  - Session frequency

Retention:
  - Churn rate
  - Retention cohorts
  - NPS / satisfaction

Revenue:
  - MRR / ARR
  - ARPU (Average Revenue Per User)
  - LTV / CAC ratio
```

## RGPD & Consentement

### Obligations

```
Consentement requis AVANT:
  ✓ Google Analytics
  ✓ Facebook Pixel
  ✓ Google Ads remarketing
  ✓ Hotjar / Session recording
  ✓ Tout cookie non essentiel

Pas de consentement nécessaire:
  ✓ Cookies strictement nécessaires
  ✓ Analytics agrégés (si anonymisés)
  ✓ Authentification
  ✓ Panier e-commerce
```

### Implémentation Consent Mode v2

```javascript
// Défaut AVANT consentement
gtag('consent', 'default', {
  'ad_storage': 'denied',
  'ad_user_data': 'denied',
  'ad_personalization': 'denied',
  'analytics_storage': 'denied'
});

// Mise à jour APRÈS consentement
gtag('consent', 'update', {
  'ad_storage': 'granted',
  'ad_user_data': 'granted',
  'ad_personalization': 'granted',
  'analytics_storage': 'granted'
});
```

### CMP (Consent Management Platform)

```
Solutions populaires:
  - Axeptio (FR, simple)
  - Didomi (Enterprise)
  - OneTrust (Enterprise)
  - Cookiebot
  - Termly

Intégration GTM:
  1. CMP définit les catégories de consentement
  2. GTM lit les signaux de consentement
  3. Tags se déclenchent selon consentement
  4. Consent Mode transmet l'état à Google
```

## Debugging

### Outils de Debug

```
GA4:
  - DebugView (GA4 interface)
  - GA4 Debug Mode (extension Chrome)
  - Realtime reports

GTM:
  - Preview mode
  - Tag Assistant
  - Console du navigateur

Général:
  - Chrome DevTools > Network
  - Charles Proxy / Fiddler
  - Omnibug (extension)
```

### Checklist Debug

```
□ Events apparaissent dans DebugView
□ Paramètres corrects sur chaque event
□ Pas de doublons d'events
□ Conversions comptabilisées
□ E-commerce data complète
□ User ID / Client ID cohérent
□ Consent mode respecté
```

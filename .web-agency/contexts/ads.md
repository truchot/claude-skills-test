# Contexte Publicité Digitale (Ads)

Connaissances essentielles pour les campagnes publicitaires payantes.

## Écosystème Publicitaire

### Plateformes Principales

```
SEARCH (Intent-based)
  Google Ads         → 92% part de marché search
  Microsoft Ads      → Bing, Yahoo, DuckDuckGo

SOCIAL (Audience-based)
  Meta Ads           → Facebook, Instagram, Messenger
  LinkedIn Ads       → B2B, recrutement
  TikTok Ads         → Gen Z, entertainment
  X (Twitter) Ads    → Real-time, news
  Pinterest Ads      → Inspiration, e-commerce
  Snapchat Ads       → Gen Z, AR

DISPLAY & VIDEO
  Google Display     → 2M+ sites partenaires
  YouTube Ads        → 2B+ utilisateurs
  Programmatic       → DV360, TradeDesk

RETAIL MEDIA
  Amazon Ads         → E-commerce
  Criteo             → Retargeting
```

### Modèles de Facturation

```
CPC (Cost Per Click)
  → Paiement au clic
  → Search, shopping
  → Formule: Dépense / Clics

CPM (Cost Per Mille)
  → Paiement pour 1000 impressions
  → Display, awareness
  → Formule: (Dépense / Impressions) × 1000

CPA (Cost Per Action)
  → Paiement à la conversion
  → Performance campaigns
  → Formule: Dépense / Conversions

CPV (Cost Per View)
  → Paiement à la vue vidéo
  → YouTube, TikTok
  → Formule: Dépense / Vues
```

## Google Ads

### Types de Campagnes

```
SEARCH
  → Annonces texte sur résultats Google
  → Intent élevé
  → Mots-clés + enchères

SHOPPING
  → Annonces produits avec image/prix
  → E-commerce
  → Feed produits Merchant Center

DISPLAY
  → Bannières sur sites partenaires
  → Awareness, retargeting
  → Audiences + placements

VIDEO
  → Annonces YouTube
  → Skippable, non-skippable, bumper
  → Awareness à conversion

PERFORMANCE MAX
  → IA Google sur tous les canaux
  → Assets + objectifs → Google optimise
  → Search, Display, YouTube, Gmail, Maps

DEMAND GEN
  → YouTube, Gmail, Discover
  → Visuels immersifs
  → Prospection

APP
  → Promotion applications
  → iOS, Android
  → Installs, engagement
```

### Structure de Compte

```
COMPTE
└── CAMPAGNE (1 objectif, 1 budget)
    └── GROUPE D'ANNONCES (1 thème, 1 audience)
        ├── Mots-clés (Search)
        ├── Audiences
        └── Annonces

Bonnes pratiques:
  - 1 campagne = 1 objectif business
  - Groupes d'annonces thématiques (10-20 mots-clés max)
  - 3-5 annonces par groupe (test A/B)
  - Extensions d'annonces activées
```

### Types de Correspondance (Search)

```
[exact]
  → Requête = mot-clé exact (+ variantes proches)
  → Exemple: [chaussures running] → "chaussures running"
  → CTR élevé, volume faible

"phrase"
  → Requête contient le mot-clé dans l'ordre
  → Exemple: "chaussures running" → "acheter chaussures running nike"
  → Équilibre reach/pertinence

broad (large)
  → Requête liée sémantiquement
  → Exemple: chaussures running → "baskets pour courir"
  → Volume élevé, moins précis
  → ⚠️ Utiliser avec Smart Bidding

-négatif
  → Exclure des requêtes
  → Exemple: -gratuit, -occasion, -avis
  → Essentiel pour la pertinence
```

### Enchères (Bidding)

```
MANUELLES
  CPC manuel          → Contrôle total, chronophage

AUTOMATIQUES (Smart Bidding)
  Maximiser clics     → Volume de clics max
  Maximiser conversions → Volume conversions max
  CPA cible          → Coût par conversion cible
  ROAS cible         → Retour sur dépense cible
  Maximiser valeur   → Valeur de conversion max

Recommandations:
  Démarrage          → Maximiser clics (collecter data)
  Après 30 conv/mois → CPA cible ou ROAS cible
  Budget limité      → CPA cible
  E-commerce         → ROAS cible
```

### Annonces Responsive (RSA)

```
Responsive Search Ad:
  - 15 titres (30 caractères chacun)
  - 4 descriptions (90 caractères chacune)
  - Google combine automatiquement

Bonnes pratiques:
  - Varier les angles (bénéfices, features, urgence)
  - Inclure le mot-clé dans 2-3 titres
  - CTA dans au moins 1 description
  - Utiliser les épinglages avec parcimonie
  - Force de l'annonce: viser "Bonne" ou "Excellente"

Exemple structure:
  Titres:
  1. [Mot-clé principal]
  2. [Bénéfice 1]
  3. [Bénéfice 2]
  4. [CTA]
  5. [Marque]
  6-15. [Variations, offres, USP]

  Descriptions:
  1. [Valeur + CTA]
  2. [Détails offre]
  3. [Preuve sociale]
  4. [Urgence/promotion]
```

### Extensions d'Annonces

```
Sitelinks
  → Liens vers pages spécifiques
  → 4-6 sitelinks recommandés

Callouts
  → Avantages courts (25 caractères)
  → "Livraison gratuite", "Support 24/7"

Structured Snippets
  → Liste de catégories
  → Types: Services, Marques, Modèles...

Call
  → Numéro de téléphone cliquable
  → Tracking des appels

Location
  → Adresse physique
  → Lien Google Maps

Price
  → Prix produits/services
  → Pré-qualification du clic

Promotion
  → Offres spéciales
  → Dates de validité
```

## Meta Ads (Facebook/Instagram)

### Objectifs de Campagne

```
AWARENESS
  - Brand awareness
  - Reach

CONSIDERATION
  - Traffic
  - Engagement
  - App installs
  - Video views
  - Lead generation
  - Messages

CONVERSION
  - Conversions
  - Catalog sales
  - Store traffic
```

### Structure

```
CAMPAGNE (objectif, budget)
└── ENSEMBLE DE PUBLICITÉS (audience, placement, budget)
    └── PUBLICITÉS (créatifs)

Campaign Budget Optimization (CBO):
  - Budget au niveau campagne
  - Meta répartit entre ad sets
  - Recommandé pour >3 ad sets

Ad Set Budget:
  - Contrôle par audience
  - Test d'audiences
```

### Audiences

```
CORE AUDIENCES (données démographiques)
  - Localisation
  - Âge, genre
  - Intérêts, comportements
  - Connexions (fans, amis de fans)

CUSTOM AUDIENCES (vos données)
  - Visiteurs site (Pixel)
  - Liste clients (email, téléphone)
  - Engagement (vidéo, page, formulaire)
  - App users

LOOKALIKE AUDIENCES (similaires)
  - Basé sur une custom audience source
  - Taille: 1% (plus similaire) à 10%
  - Expansion automatique possible

Stratégie:
  TOFU → Intérêts larges, Lookalikes 3-5%
  MOFU → Lookalikes 1-2%, Engagers
  BOFU → Retargeting (visiteurs, cart abandonment)
```

### Formats Créatifs

```
IMAGES
  - Ratio: 1:1 (feed), 9:16 (stories)
  - Taille: 1080×1080 min
  - Texte < 20% de l'image

VIDÉOS
  - Durée: 15s optimal (stories), 30-60s (feed)
  - Sous-titres (85% regardent sans son)
  - Hook dans les 3 premières secondes

CARROUSELS
  - 2-10 cartes
  - Storytelling ou catalogue
  - CTA sur chaque carte

COLLECTIONS
  - Instant Experience
  - E-commerce, catalogue
  - Immersif mobile

Bonnes pratiques:
  - Thumb-stopping (arrêter le scroll)
  - Mobile-first (80%+ mobile)
  - Tester 3-5 créatifs par ad set
  - Rafraîchir toutes les 2-4 semaines
```

### Pixel Meta & Conversions API

```javascript
// Pixel (client-side)
fbq('track', 'Purchase', {
  value: 99.99,
  currency: 'EUR',
  content_ids: ['SKU123'],
  content_type: 'product'
});

// Events standards
fbq('track', 'ViewContent');     // Page produit
fbq('track', 'AddToCart');       // Ajout panier
fbq('track', 'InitiateCheckout'); // Début checkout
fbq('track', 'Purchase');        // Achat
fbq('track', 'Lead');            // Formulaire lead
fbq('track', 'CompleteRegistration'); // Inscription

// Conversions API (server-side)
// Complémente le Pixel
// Résistant au blocage cookies/ad blockers
// Recommandé pour matching optimal
```

## LinkedIn Ads

### Spécificités B2B

```
Forces:
  ✓ Ciblage professionnel précis
  ✓ Décideurs B2B accessibles
  ✓ Contexte professionnel

Faiblesses:
  ✗ CPC élevé (5-15€ moyenne)
  ✗ Volumes plus faibles
  ✗ Moins de créativité

Cas d'usage:
  - Lead generation B2B
  - Recrutement
  - Event promotion
  - Thought leadership
```

### Ciblage LinkedIn

```
FIRMOGRAPHICS
  - Taille entreprise
  - Secteur d'activité
  - Chiffre d'affaires

PROFESSIONNELS
  - Fonction/Titre
  - Niveau hiérarchique (Manager, Director, VP, C-level)
  - Compétences
  - Ancienneté

AUDIENCES
  - Website visitors (Insight Tag)
  - Company lists (ABM)
  - Contact lists
  - Lookalikes

Conseil: Audience 50K-500K pour Search/Feed
```

### Formats LinkedIn

```
SPONSORED CONTENT
  - Single image
  - Video
  - Carousel
  - Event
  - Document (PDF natif)

MESSAGE ADS
  - InMail sponsorisé
  - Conversation ads
  → ⚠️ Limité en fréquence, bien cibler

LEAD GEN FORMS
  - Formulaire pré-rempli LinkedIn
  - Pas de landing page nécessaire
  - Taux conversion élevé
  - ⚠️ Qualité leads variable
```

## KPIs Publicité

### Métriques Principales

```
VOLUME
  Impressions      → Nombre d'affichages
  Reach            → Personnes uniques touchées
  Clicks           → Clics sur l'annonce
  Conversions      → Actions complétées

COÛTS
  CPC              → Coût par clic
  CPM              → Coût pour 1000 impressions
  CPA / CPL        → Coût par action / lead
  CAC              → Coût acquisition client

TAUX
  CTR              → Clics / Impressions (%)
  CVR              → Conversions / Clics (%)
  ROAS             → Revenue / Ad Spend

Formules:
  CTR = (Clics / Impressions) × 100
  CVR = (Conversions / Clics) × 100
  CPA = Dépense / Conversions
  ROAS = Revenue / Dépense
```

### Benchmarks par Industrie

```
CTR Search:
  E-commerce       → 2-3%
  B2B              → 2-4%
  Finance          → 2-3%
  Travel           → 4-5%

CTR Display:
  Tous secteurs    → 0.3-0.5%

CTR Social:
  Facebook/IG      → 0.9-1.5%
  LinkedIn         → 0.4-0.6%

CPC Search:
  E-commerce       → 1-2€
  B2B              → 3-6€
  Finance          → 5-15€
  Legal            → 10-30€

Conversion Rate:
  E-commerce       → 2-4%
  Lead gen B2B     → 2-5%
  SaaS             → 3-7%
```

## Optimisation

### Checklist Optimisation

```
QUOTIDIEN
  □ Vérifier dépense vs budget
  □ Anomalies (CPC spike, drop impressions)
  □ Pause ads non performants

HEBDOMADAIRE
  □ Analyse search terms (négatifs)
  □ Performance par device
  □ Performance par audience
  □ Rafraîchir créatifs fatigués

MENSUEL
  □ Revue structure campagnes
  □ Test nouvelles audiences
  □ Test nouveaux formats
  □ Analyse attribution
  □ Ajustement bidding targets
```

### Framework d'Optimisation

```
1. DIAGNOSTIC
   → Identifier le problème (CTR? CVR? CPA?)

2. HYPOTHÈSE
   → Formuler une cause probable

3. TEST
   → Modifier UNE variable
   → Budget/durée suffisants

4. ANALYSE
   → Significativité statistique
   → Impact business

5. DÉCISION
   → Scale, iterate, ou kill

Variables à tester:
  - Audiences (élargir/restreindre)
  - Créatifs (visuels, copy, CTA)
  - Landing pages
  - Enchères/bidding
  - Placements
```

### Diagnostic par Symptôme

```
CTR faible (< benchmark):
  → Ciblage trop large
  → Créatifs non engageants
  → Message/offre peu attractif
  Action: Affiner audience, tester créatifs

CVR faible (< benchmark):
  → Landing page non optimisée
  → Promesse annonce ≠ page
  → UX friction
  Action: Optimiser landing page, aligner message

CPA trop élevé:
  → Enchères trop agressives
  → Audience non qualifiée
  → Conversion tracking issue
  Action: Revoir bidding, affiner audience, vérifier tracking

Dépense insuffisante:
  → Enchères trop basses
  → Audience trop restreinte
  → Quality Score faible
  Action: Augmenter enchères, élargir audience, améliorer pertinence
```

## Attribution & Mesure

### Fenêtres d'Attribution

```
Google Ads (défaut):
  - 30 jours post-clic
  - 1 jour post-vue (YouTube)

Meta Ads (défaut):
  - 7 jours post-clic
  - 1 jour post-vue

LinkedIn (défaut):
  - 30 jours post-clic
  - 7 jours post-vue

Conseil:
  Aligner les fenêtres entre plateformes
  pour comparaison équitable
```

### Post-iOS 14+

```
Impacts:
  - Moins de données Pixel
  - Audiences retargeting réduites
  - Attribution imprécise

Solutions:
  - Conversions API (server-side)
  - First-party data (CRM)
  - Aggregated Event Measurement
  - Modélisation conversions
  - Tests d'incrémentalité
```

## Budget & Planning

### Allocation Budget

```
Règle 70/20/10:
  70% → Canaux performants prouvés
  20% → Tests/optimisation
  10% → Innovation/nouveaux canaux

Par objectif funnel:
  Awareness  → 20-30% (CPM)
  Consideration → 30-40% (CPC/CPV)
  Conversion → 30-40% (CPA)
  Retention  → 10-20% (retargeting)
```

### Saisonnalité

```
E-commerce:
  - Black Friday/Cyber Monday (x2-5 dépense)
  - Noël (x2-3 dépense)
  - Soldes (x1.5-2)
  → Préparer audiences/créatifs en avance

B2B:
  - Rentrée septembre
  - Fin d'année (budget à dépenser)
  - Creux: Été, fêtes fin d'année
  → Ajuster pression selon cycles achat

Conseil:
  Augmenter budgets AVANT les pics
  (les algorithmes ont besoin de temps)
```

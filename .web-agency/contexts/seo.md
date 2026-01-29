# Contexte SEO

Connaissances essentielles pour le référencement naturel.

## Fondamentaux

### Les 3 Piliers du SEO

```
1. TECHNIQUE     → Le site est-il crawlable et indexable ?
2. CONTENU       → Le contenu répond-il aux requêtes ?
3. POPULARITÉ    → Le site a-t-il de l'autorité (backlinks) ?
```

### Outils de Base

```
Analyse & Audit:
  Google Search Console    → Données officielles Google
  Screaming Frog          → Crawl technique
  Ahrefs / SEMrush        → Backlinks, keywords, concurrence
  PageSpeed Insights      → Performance

Recherche de mots-clés:
  Google Keyword Planner  → Volume de recherche
  Answer The Public       → Questions utilisateurs
  Also Asked              → PAA (People Also Ask)
  Ubersuggest             → Suggestions long tail

Suivi de positions:
  SEMrush / Ahrefs        → Tracking automatisé
  SERP Robot              → Vérification manuelle
```

## SEO Technique

### Checklist Technique Essentielle

```
Indexation:
  □ robots.txt configuré correctement
  □ sitemap.xml généré et soumis à GSC
  □ Pas de pages importantes en noindex
  □ Canonical tags sur les pages dupliquées

Performance:
  □ LCP < 2.5s (Largest Contentful Paint)
  □ FID < 100ms (First Input Delay)
  □ CLS < 0.1 (Cumulative Layout Shift)
  □ TTFB < 800ms (Time To First Byte)

Mobile:
  □ Design responsive
  □ Texte lisible sans zoom
  □ Boutons espacés (touch targets)
  □ Pas de contenu bloqué par interstitiels

Sécurité:
  □ HTTPS obligatoire
  □ Certificat SSL valide
  □ Pas de mixed content
```

### Structure des URLs

```
✅ Bonnes pratiques:
  /categorie/sous-categorie/nom-produit
  /blog/titre-article-seo
  /services/nom-service

❌ À éviter:
  /page.php?id=123&cat=4
  /2024/01/15/mon-article (dates inutiles)
  /p/a/g/e/produit (niveaux excessifs)

Règles:
  - Mots-clés dans l'URL
  - Tirets (-) entre les mots
  - Tout en minuscules
  - Max 3-4 niveaux de profondeur
  - Pas de caractères spéciaux
```

### Données Structurées (Schema.org)

```json
// Article
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Titre de l'article",
  "author": {
    "@type": "Person",
    "name": "Nom Auteur"
  },
  "datePublished": "2024-01-15",
  "image": "https://example.com/image.jpg"
}

// Produit
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Nom du produit",
  "offers": {
    "@type": "Offer",
    "price": "99.99",
    "priceCurrency": "EUR",
    "availability": "https://schema.org/InStock"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.5",
    "reviewCount": "24"
  }
}

// LocalBusiness
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Nom entreprise",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "123 rue Example",
    "addressLocality": "Paris",
    "postalCode": "75001"
  },
  "telephone": "+33123456789",
  "openingHours": "Mo-Fr 09:00-18:00"
}
```

### Redirections

```
301 (Permanent):
  → Changement définitif d'URL
  → Transfert ~90% du "link juice"
  → Utilisé pour migrations

302 (Temporaire):
  → Redirection temporaire
  → Pas de transfert de popularité
  → Maintenance, A/B tests

Chaînes de redirections:
  ❌ A → B → C → D (max 2 sauts)
  ✅ A → D (direct)
```

## SEO On-Page

### Balises Essentielles

```html
<!-- Title (50-60 caractères) -->
<title>Mot-clé Principal | Marque</title>

<!-- Meta description (150-160 caractères) -->
<meta name="description" content="Description engageante avec
mot-clé principal et call-to-action.">

<!-- Canonical -->
<link rel="canonical" href="https://example.com/page-principale">

<!-- Hreflang (sites multilingues) -->
<link rel="alternate" hreflang="fr" href="https://example.com/fr/page">
<link rel="alternate" hreflang="en" href="https://example.com/en/page">
<link rel="alternate" hreflang="x-default" href="https://example.com/page">
```

### Structure de Contenu

```
Hiérarchie des titres:
  H1 → Un seul par page, contient le mot-clé principal
  H2 → Sections principales (3-6 par page)
  H3 → Sous-sections
  H4+ → Rarement nécessaire

Exemple structure article:
  H1: Comment optimiser son SEO en 2024
  H2: Les fondamentaux du référencement
    H3: Le SEO technique
    H3: Le contenu optimisé
  H2: Les stratégies avancées
    H3: Le link building
    H3: L'expérience utilisateur
  H2: FAQ / Questions fréquentes
```

### Optimisation du Contenu

```
Densité de mots-clés:
  → 1-2% du texte (naturel, pas de keyword stuffing)
  → Mot-clé dans les 100 premiers mots
  → Variations et synonymes (LSI keywords)

Longueur recommandée:
  Page produit     → 300-500 mots
  Article blog     → 1500-2500 mots
  Guide complet    → 3000+ mots
  Page catégorie   → 500-1000 mots

Éléments à optimiser:
  □ Titre (H1)
  □ URL
  □ Meta description
  □ Premier paragraphe
  □ Titres H2/H3
  □ Alt des images
  □ Liens internes
```

### Images

```
Optimisation:
  - Format: WebP (avec fallback JPEG)
  - Compression: < 100Ko si possible
  - Dimensions: taille d'affichage exacte
  - Lazy loading pour images below the fold

Balise alt:
  ✅ "Chaussures running Nike Air Max noires"
  ❌ "image1.jpg" ou "photo produit"
  ❌ Bourrage de mots-clés

Nommage fichier:
  ✅ chaussures-running-nike-air-max.webp
  ❌ IMG_20240115_123456.jpg
```

## SEO Off-Page

### Link Building

```
Types de liens:
  DoFollow    → Transmet le "link juice"
  NoFollow    → Pas de transmission (mais trafic possible)
  Sponsored   → Liens payants
  UGC         → Contenu généré par utilisateurs

Qualité vs Quantité:
  1 lien d'un site DA 70 > 100 liens de sites DA 10

Sources de backlinks:
  - Guest posting (articles invités)
  - Relations presse / RP digital
  - Création de contenus linkables (études, outils, infographies)
  - Récupération de mentions sans lien
  - Broken link building
  - Annuaires de qualité (sectoriels)
```

### Métriques de Liens

```
Domain Authority (DA) / Domain Rating (DR):
  0-30   → Faible autorité
  30-50  → Autorité moyenne
  50-70  → Bonne autorité
  70+    → Excellente autorité

À surveiller:
  - Nombre de domaines référents
  - Diversité des ancres
  - Ratio dofollow/nofollow
  - Croissance naturelle
```

## SEO Local

### Google Business Profile

```
Optimisation fiche:
  □ Nom exact de l'entreprise (pas de mots-clés ajoutés)
  □ Catégorie principale pertinente
  □ Catégories secondaires
  □ Description complète (750 caractères)
  □ Horaires à jour
  □ Photos de qualité (logo, vitrine, équipe, produits)
  □ Numéro de téléphone local
  □ Lien vers site web

Actions régulières:
  □ Répondre aux avis (positifs ET négatifs)
  □ Publier des posts (1-2x/semaine)
  □ Ajouter des photos récentes
  □ Mettre à jour les infos saisonnières
```

### Citations Locales

```
Annuaires prioritaires:
  - Pages Jaunes
  - Yelp
  - TripAdvisor (si applicable)
  - Annuaires sectoriels
  - Chambres de commerce

Cohérence NAP:
  N = Name (nom exact)
  A = Address (adresse complète)
  P = Phone (numéro identique partout)
```

## Audit SEO

### Checklist Audit Rapide

```
1. INDEXATION
   □ site:domain.com dans Google
   □ Nombre de pages indexées cohérent
   □ Pas de pages sensibles indexées

2. TECHNIQUE
   □ PageSpeed Insights > 70 mobile
   □ Pas d'erreurs dans Search Console
   □ Sitemap à jour

3. CONTENU
   □ H1 uniques sur chaque page
   □ Titles et meta descriptions uniques
   □ Pas de contenu dupliqué interne

4. LIENS
   □ Pas de liens cassés (404)
   □ Structure de liens internes logique
   □ Ancres de liens variées

5. MOBILE
   □ Test Mobile-Friendly OK
   □ Pas de problèmes d'ergonomie mobile
```

### Outils d'Audit

```
Gratuits:
  - Google Search Console
  - Google PageSpeed Insights
  - Lighthouse (Chrome DevTools)
  - Screaming Frog (500 URLs free)

Payants:
  - Ahrefs Site Audit
  - SEMrush Site Audit
  - Sitebulb
  - DeepCrawl
```

## KPIs SEO

### Métriques à Suivre

```
Visibilité:
  - Positions moyennes (par groupe de mots-clés)
  - Nombre de mots-clés en top 3, top 10, top 100
  - Part de voix SEO vs concurrents

Trafic:
  - Sessions organiques
  - Évolution M/M et Y/Y
  - Pages vues par session

Engagement:
  - Taux de rebond (par page)
  - Temps moyen sur page
  - Pages par session

Conversions:
  - Taux de conversion organique
  - Valeur du trafic organique
  - Leads / ventes attribués au SEO
```

### Reporting

```
Fréquence:
  Hebdo   → Positions, alertes
  Mensuel → Trafic, conversions, actions
  Trimestriel → Stratégie, roadmap

Template reporting mensuel:
  1. Résumé exécutif (3 bullet points)
  2. Trafic organique vs mois précédent
  3. Top 10 pages en croissance
  4. Top 10 pages en déclin
  5. Actions réalisées ce mois
  6. Plan d'action mois suivant
```

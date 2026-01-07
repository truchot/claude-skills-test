---
name: seo
description: SEO - référencement naturel, technique, contenu, netlinking
tags: [seo, référencement, google, keywords, backlinks, core-web-vitals]
sub-skills: [technique, contenu, netlinking, local]
---

# SEO (Search Engine Optimization)

## Quand Utiliser
- Optimiser le référencement naturel
- Auditer un site pour le SEO
- Définir une stratégie de mots-clés
- Améliorer les Core Web Vitals
- Planifier une stratégie de netlinking

## Sous-Skills Disponibles

| Sous-skill | Fichier | Description |
|------------|---------|-------------|
| Technique | `technique.md` | Crawl, indexation, robots.txt, CWV |
| Contenu | `contenu.md` | Keywords, on-page, briefs rédactionnels |
| Netlinking | `netlinking.md` | Backlinks, outreach, link building |
| Local | `local.md` | Google Business, citations NAP, avis |

## Piliers du SEO

```
SEO
├── Technique (crawl, indexation, performance) → technique.md
├── Contenu (keywords, optimisation on-page) → contenu.md
├── Netlinking (backlinks, autorité) → netlinking.md
└── Local (Google Business, NAP) → local.md
```

## SEO Technique

### Crawl & Indexation
```xml
<!-- robots.txt -->
User-agent: *
Allow: /
Disallow: /admin/
Sitemap: https://example.com/sitemap.xml

<!-- Meta robots -->
<meta name="robots" content="index, follow">
<meta name="robots" content="noindex, nofollow">

<!-- Canonical -->
<link rel="canonical" href="https://example.com/page">
```

### Core Web Vitals
| Métrique | Bon | À améliorer | Mauvais |
|----------|-----|-------------|---------|
| LCP (Largest Contentful Paint) | < 2.5s | 2.5-4s | > 4s |
| INP (Interaction to Next Paint) | < 200ms | 200-500ms | > 500ms |
| CLS (Cumulative Layout Shift) | < 0.1 | 0.1-0.25 | > 0.25 |

### Optimisations Performance
```html
<!-- Preload critical resources -->
<link rel="preload" href="font.woff2" as="font" crossorigin>
<link rel="preload" href="hero.webp" as="image">

<!-- Lazy loading images -->
<img src="image.webp" loading="lazy" alt="Description">

<!-- Async/defer scripts -->
<script src="analytics.js" async></script>
<script src="app.js" defer></script>
```

## SEO On-Page

### Structure HTML
```html
<!DOCTYPE html>
<html lang="fr">
<head>
  <title>Mot-clé principal | Marque</title>
  <meta name="description" content="Description 150-160 caractères avec mot-clé">
  <meta name="viewport" content="width=device-width, initial-scale=1">
</head>
<body>
  <h1>Titre H1 unique avec mot-clé</h1>
  <h2>Sous-titre H2</h2>
  <p>Contenu optimisé avec mots-clés naturels...</p>
  
  <img src="image.webp" alt="Description avec mot-clé" width="800" height="600">
</body>
</html>
```

### Données Structurées (Schema.org)
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Titre de l'article",
  "author": {
    "@type": "Person",
    "name": "Auteur"
  },
  "datePublished": "2024-01-15",
  "image": "https://example.com/image.jpg"
}
</script>
```

### Open Graph & Twitter Cards
```html
<!-- Open Graph -->
<meta property="og:title" content="Titre">
<meta property="og:description" content="Description">
<meta property="og:image" content="https://example.com/og-image.jpg">
<meta property="og:url" content="https://example.com/page">
<meta property="og:type" content="article">

<!-- Twitter -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Titre">
<meta name="twitter:description" content="Description">
```

## Recherche de Mots-Clés

### Méthodologie
1. **Brainstorming** - Thèmes principaux
2. **Outils** - Google Keyword Planner, Ahrefs, SEMrush
3. **Intent** - Informationnelle, navigationnelle, transactionnelle
4. **Priorisation** - Volume × Difficulté × Pertinence

### Structure de Contenu
```
Page Pilier (mot-clé principal)
├── Article cluster 1 (longue traîne)
├── Article cluster 2 (longue traîne)
├── Article cluster 3 (longue traîne)
└── Liens internes entre articles
```

## Netlinking

### Qualité des Backlinks
| Critère | Bon | Mauvais |
|---------|-----|---------|
| Autorité du domaine | DA > 30 | DA < 10 |
| Thématique | Même secteur | Sans rapport |
| Position du lien | Dans le contenu | Footer, sidebar |
| Ancre | Naturelle, variée | Sur-optimisée |

### Stratégies
- Guest blogging sur sites pertinents
- Création de contenu linkable (études, infographies)
- Relations presse digitale
- Broken link building
- Mentions de marque → liens

## SEO Local

### Google Business Profile
- Nom, adresse, téléphone (NAP) cohérents
- Catégories précises
- Photos de qualité
- Avis clients (répondre à tous)
- Posts réguliers

### Citations NAP
```
Nom de l'entreprise
123 Rue Example
75001 Paris
01 23 45 67 89
```

## Checklist SEO

- [ ] Title et meta description optimisés
- [ ] Structure Hn logique (H1 unique)
- [ ] URLs propres et descriptives
- [ ] Images optimisées (WebP, alt, dimensions)
- [ ] Core Web Vitals au vert
- [ ] Mobile-friendly
- [ ] HTTPS actif
- [ ] Sitemap XML soumis
- [ ] Données structurées
- [ ] Liens internes pertinents

## Outils

| Outil | Usage |
|-------|-------|
| Google Search Console | Suivi indexation, performances |
| Google Analytics | Trafic, comportement |
| Lighthouse | Audit technique |
| Ahrefs / SEMrush | Keywords, backlinks |
| Screaming Frog | Crawl technique |

## Références
- https://developers.google.com/search
- https://web.dev/explore/learn-core-web-vitals
- https://schema.org/

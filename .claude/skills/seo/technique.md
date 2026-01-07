---
name: seo/technique
description: SEO Technique - crawl, indexation, Core Web Vitals, architecture
tags: [seo-technique, crawl, indexation, robots, sitemap, cwv]
---

# SEO Technique

## Quand Utiliser
- Auditer le crawl et l'indexation
- Optimiser les Core Web Vitals
- Configurer robots.txt et sitemaps
- Diagnostiquer des problèmes d'indexation

## Pipeline Crawl → Index

```
┌──────────┐   ┌──────────┐   ┌──────────┐   ┌──────────┐
│DÉCOUVERTE│──▶│  CRAWL   │──▶│  RENDER  │──▶│  INDEX   │
│          │   │          │   │          │   │          │
│ Sitemap  │   │ Fetch    │   │ Execute  │   │ Store    │
│ Liens    │   │ Parse    │   │ JS       │   │ Rank     │
│ GSC      │   │ Robots   │   │ Content  │   │ Serve    │
└──────────┘   └──────────┘   └──────────┘   └──────────┘
```

## Robots.txt

```robots
# Template recommandé
User-agent: *
Allow: /

# Bloquer les ressources inutiles
Disallow: /admin/
Disallow: /wp-admin/
Disallow: /*?s=
Disallow: /*?p=
Disallow: /tag/
Disallow: /search/

# Autoriser les ressources critiques
Allow: /wp-includes/*.js
Allow: /wp-includes/*.css
Allow: /wp-content/uploads/
Allow: /wp-content/themes/*.js
Allow: /wp-content/themes/*.css

Sitemap: https://example.com/sitemap.xml
```

### Erreurs Courantes
| Erreur | Impact | Solution |
|--------|--------|----------|
| Bloquer CSS/JS | Rendu impossible | Allow ressources |
| Bloquer images | Pas d'image search | Allow uploads |
| Oublier sitemap | Découverte lente | Ajouter directive |
| Crawl-delay | Ralentit indexation | Éviter si possible |

## Sitemap XML

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://example.com/page</loc>
    <lastmod>2024-01-15</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
</urlset>
```

### Checklist Sitemap
- [ ] Toutes pages indexables incluses
- [ ] Pas de pages en erreur (4xx, 5xx)
- [ ] Pas de pages noindex
- [ ] Déclaré dans robots.txt
- [ ] Soumis dans Google Search Console
- [ ] < 50,000 URLs par sitemap
- [ ] < 50MB non compressé

## Couverture d'Indexation (GSC)

| Status | Action |
|--------|--------|
| ✅ Indexées | Surveiller |
| ⚠️ Exclues volontairement | Vérifier intention |
| ❌ Erreurs serveur (5xx) | Corriger immédiatement |
| ❌ Non trouvées (404) | Rediriger ou supprimer |
| 🔄 Crawlée, non indexée | Améliorer qualité contenu |

## Redirections

### Types
| Type | Usage | SEO |
|------|-------|-----|
| 301 | Permanent | ✅ Transfère ~90% autorité |
| 302 | Temporaire | ⚠️ Ne transfère pas |
| 307/308 | HTTP strict | ⚠️ Cas spécifiques |
| Meta refresh | Éviter | ❌ Mauvaise pratique |
| JS redirect | Éviter | ❌ Non crawlé |

### Règles
- Éviter chaînes > 2 redirections
- Pas de boucles de redirection
- 301 pour tout changement permanent d'URL

## Balises Canonical

```html
<!-- Self-referencing (recommandé) -->
<link rel="canonical" href="https://example.com/page">

<!-- Vers une autre page -->
<link rel="canonical" href="https://example.com/page-principale">
```

### Quand Utiliser
- Paramètres d'URL (tri, filtres)
- Contenu syndiqué
- Pages similaires (pagination)
- HTTP vs HTTPS
- www vs non-www

## Core Web Vitals

| Métrique | Bon | Moyen | Mauvais |
|----------|-----|-------|---------|
| LCP (Largest Contentful Paint) | < 2.5s | 2.5-4s | > 4s |
| INP (Interaction to Next Paint) | < 200ms | 200-500ms | > 500ms |
| CLS (Cumulative Layout Shift) | < 0.1 | 0.1-0.25 | > 0.25 |

### Optimisations LCP
```html
<!-- Preload hero image -->
<link rel="preload" as="image" href="hero.webp">

<!-- Preconnect aux CDN -->
<link rel="preconnect" href="https://cdn.example.com">
```

### Optimisations CLS
```css
/* Toujours définir dimensions */
img, video {
  width: 100%;
  height: auto;
  aspect-ratio: 16 / 9;
}

/* Réserver espace pour ads */
.ad-slot {
  min-height: 250px;
}
```

## Audit Technique - Template

```markdown
# Audit SEO Technique - [Site]

## 1. Crawl & Indexation
- Pages indexées : X / Y soumises
- Erreurs : X (détail)
- Couverture : X%

## 2. Robots.txt
- Status : ✅/❌
- Problèmes : [liste]

## 3. Sitemap
- URLs : X
- Validité : ✅/❌

## 4. Core Web Vitals
- LCP : Xs (✅/❌)
- INP : Xms (✅/❌)
- CLS : X (✅/❌)

## 5. Actions Prioritaires
1. [Action 1] - Impact: 🔥🔥🔥
2. [Action 2] - Impact: 🔥🔥
```

## Outils

| Outil | Usage |
|-------|-------|
| Google Search Console | Couverture, erreurs |
| Screaming Frog | Crawl complet |
| PageSpeed Insights | Core Web Vitals |
| Lighthouse | Audit performance |
| web.dev/measure | Test CWV |

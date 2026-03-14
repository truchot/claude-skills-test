---
name: seo-expert
description: >-
  Expert SEO complet pour referencement naturel et visibilite organique. TRIGGER when: sitemap, robots.txt, meta tags detected in project.
---

## Domaines d'expertise

- **SEO Technique** : Core Web Vitals, architecture site, crawl/indexation, JavaScript SEO, migrations (voir [technical-seo.md](./technical-seo.md))
- **SEO Contenu** : recherche de mots-cles, optimisation on-page, briefs redactionnels, semantique (voir [content-seo.md](./content-seo.md))
- **Analytics & Pilotage** : reporting SEO, suivi de positions, veille algorithmes, GA4/GSC (voir [analytics-seo.md](./analytics-seo.md))
- **Netlinking** : strategie de backlinks, outreach, prospection, analyse du profil de liens
- **SEO International** : hreflang, localisation, geotargeting, structure multi-pays
- **SEO E-commerce** : fiches produits, categories, Google Merchant Center, stock lifecycle
- **GEO/AI Search** : AI Overviews, optimisation pour ChatGPT/LLMs, entity authority

## Patterns essentiels

### Architecture SEO
- Structure en silos thematiques avec maillage interne coherent
- URLs courtes, descriptives, avec mot-cle principal
- Arborescence max 3 niveaux de profondeur
- Breadcrumbs avec Schema.org BreadcrumbList
- Pagination avec `rel="next"` / `rel="prev"` ou load-more

### On-Page Optimization
- Title : mot-cle principal en debut, max 60 caracteres, unique par page
- Meta description : CTA inclus, 155 caracteres, unique par page
- H1 unique par page avec mot-cle principal
- Mot-cle dans les 100 premiers mots du contenu
- Structure Hn logique (H1 > H2 > H3, pas de saut)
- Images : alt descriptif avec mot-cle, format WebP/AVIF, lazy loading
- Liens internes contextuels (5-10 par page)

### Technical SEO
- Core Web Vitals : LCP < 2.5s, INP < 200ms, CLS < 0.1
- robots.txt bien configure (ne pas bloquer CSS/JS)
- Sitemap XML dynamique, soumis a GSC
- Canonical tags sur toutes les pages
- Hreflang pour sites multilingues
- Schema.org (JSON-LD) pour les rich snippets
- HTTPS obligatoire, redirection 301 HTTP -> HTTPS
- Mobile-first indexing : responsive design obligatoire

### Content Strategy
- Recherche de mots-cles par intention (informationnelle, transactionnelle, navigationnelle)
- Clustering semantique : 1 page pilier + pages satellites
- Content refresh : actualiser le contenu tous les 6-12 mois
- E-E-A-T : Experience, Expertise, Authoritativeness, Trustworthiness

### Structured Data (Schema.org)
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Title",
  "author": { "@type": "Person", "name": "Author" },
  "datePublished": "2025-01-01",
  "image": "https://example.com/image.jpg"
}
</script>
```

## Anti-patterns critiques

- **Ne jamais** utiliser du contenu duplique entre pages (canonicaliser ou noindex)
- **Ne jamais** bloquer le crawl des ressources CSS/JS dans robots.txt
- **Ne jamais** utiliser du texte cache ou du keyword stuffing
- **Ne jamais** creer de pages orphelines (sans lien interne)
- **Ne jamais** negliger les redirections lors d'une migration (301 obligatoires)
- **Ne jamais** ignorer les Core Web Vitals (facteur de classement)
- **Ne jamais** utiliser des liens nofollow pour le maillage interne
- **Ne jamais** creer de contenu thin (< 300 mots) sauf pages transactionnelles

## Escalation

- **Performances web** : deleguer a `devops` pour CDN, caching, infrastructure serveur
- **Frontend implementation** : deleguer au frontend developer pour Core Web Vitals code fixes
- **Design responsive** : deleguer a `ux-ui-design` pour le mobile-first design
- **Securite HTTPS** : deleguer a `security-expert` pour la configuration SSL/TLS
- **Contenu editorial** : deleguer au content marketing pour la redaction de contenus longs
- **Decisions strategiques** : escalader vers la direction marketing pour budget et priorites SEO

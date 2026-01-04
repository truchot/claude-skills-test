# SEO Quick Reference Guide

Guide de référence rapide pour le routage des requêtes SEO.

## Arbre de Décision SEO

```
Requête SEO
│
├─ Vision stratégique, audit complet, roadmap ?
│  └─ → seo/strategie/orchestrator
│
├─ Problème technique (crawl, vitesse, indexation) ?
│  └─ → seo/technique/orchestrator
│
├─ Contenu (mots-clés, rédaction, optimisation) ?
│  └─ → seo/contenu/orchestrator
│
├─ Liens (backlinks, autorité, prospection) ?
│  └─ → seo/netlinking/orchestrator
│
├─ Suivi, reporting, positions ?
│  └─ → seo/pilotage/orchestrator
│
├─ AI Search (ChatGPT, Perplexity, AI Overviews) ?
│  └─ → seo/geo/orchestrator
│
├─ SEO local (Google Business, avis, NAP) ?
│  └─ → seo/local/orchestrator
│
├─ E-commerce (produits, catégories, shopping) ?
│  └─ → seo/ecommerce/orchestrator
│
└─ Multi-pays, multi-langues, hreflang ?
   └─ → seo/international/orchestrator
```

## Tableau de Routage Rapide

| Mots-clés | Domaine | Agent principal |
|-----------|---------|-----------------|
| audit, analyse, roadmap, concurrence | **strategie** | `audit-global` |
| crawl, robots.txt, sitemap, indexation | **technique** | `crawl-indexation` |
| Core Web Vitals, LCP, CLS, vitesse | **technique** | `core-web-vitals` |
| migration, refonte, changement URL | **technique** | `migration-seo` |
| mots-clés, keywords, requêtes | **contenu** | `recherche-mots-cles` |
| brief, rédaction, contenu | **contenu** | `brief-redactionnel` |
| title, meta, H1, on-page | **contenu** | `optimisation-on-page` |
| backlinks, liens, autorité | **netlinking** | `strategie-backlinks` |
| prospection, outreach, partenariat | **netlinking** | `outreach-partenariats` |
| positions, rankings, suivi | **pilotage** | `suivi-positions` |
| reporting, dashboard, KPIs | **pilotage** | `reporting-seo` |
| ChatGPT, Perplexity, IA, LLM | **geo** | `ai-search-strategy` |
| AI Overviews, SGE, featured | **geo** | `ai-overviews` |
| Knowledge Graph, entités, Wikidata | **geo** | `entity-authority` |
| Google Business, fiche établissement | **local** | `google-business` |
| avis, reviews, réputation | **local** | `avis-reputation` |
| NAP, annuaires, citations | **local** | `citations-nap` |
| fiche produit, schema Product | **ecommerce** | `fiches-produits` |
| catégories, facettes, filtres | **ecommerce** | `categories-navigation` |
| Google Shopping, Merchant Center | **ecommerce** | `google-merchant` |
| hreflang, multi-langues | **international** | `hreflang` |
| ccTLD, subdomain, multisite | **international** | `strategie-structure` |
| localisation, traduction | **international** | `localisation-contenu` |

## Statistiques SEO (49 agents)

| Domaine | Agents | Focus |
|---------|--------|-------|
| strategie | 5 | POURQUOI - Vision |
| technique | 6 | Fondations techniques |
| contenu | 6 | Optimisation on-site |
| netlinking | 5 | Popularité off-site |
| pilotage | 5 | Mesure et suivi |
| geo | 6 | AI Search / GEO |
| local | 5 | Proximité |
| ecommerce | 5 | Spécifique e-commerce |
| international | 5 | Multi-pays |

## Cas d'Usage Fréquents

### "Mon site n'est pas indexé"
```
→ seo/technique/crawl-indexation
```

### "Je veux apparaître sur ChatGPT"
```
→ seo/geo/ai-search-strategy
  puis → seo/geo/entity-authority
```

### "Je veux améliorer ma fiche Google"
```
→ seo/local/google-business
```

### "Comment optimiser mes fiches produits ?"
```
→ seo/ecommerce/fiches-produits
```

### "Je dois migrer mon site"
```
→ seo/technique/migration-seo
```

### "Je lance en Allemagne et Espagne"
```
→ seo/international/strategie-structure
  puis → seo/international/hreflang
```

### "Mes backlinks sont de mauvaise qualité"
```
→ seo/netlinking/analyse-profil-liens
```

### "Je veux un audit SEO complet"
```
→ seo/strategie/audit-global
```

## Hiérarchie SEO

```
acquisition/seo/orchestrator (v4.0.0)
│
├── strategie/
│   ├── orchestrator
│   ├── audit-global
│   ├── roadmap-seo
│   ├── analyse-concurrentielle
│   └── opportunites-keywords
│
├── technique/
│   ├── orchestrator
│   ├── crawl-indexation
│   ├── core-web-vitals
│   ├── architecture-site
│   ├── javascript-seo
│   └── migration-seo
│
├── contenu/
│   ├── orchestrator
│   ├── recherche-mots-cles
│   ├── brief-redactionnel
│   ├── optimisation-on-page
│   ├── semantique-seo
│   └── content-refresh
│
├── netlinking/
│   ├── orchestrator
│   ├── strategie-backlinks
│   ├── prospection-liens
│   ├── analyse-profil-liens
│   └── outreach-partenariats
│
├── pilotage/
│   ├── orchestrator
│   ├── reporting-seo
│   ├── suivi-positions
│   ├── analytics-seo
│   └── veille-algorithmes
│
├── geo/
│   ├── orchestrator
│   ├── ai-search-strategy
│   ├── ai-overviews
│   ├── entity-authority
│   ├── citation-optimization
│   └── llm-content-strategy
│
├── local/
│   ├── orchestrator
│   ├── google-business
│   ├── citations-nap
│   ├── avis-reputation
│   └── local-content
│
├── ecommerce/
│   ├── orchestrator
│   ├── fiches-produits
│   ├── categories-navigation
│   ├── google-merchant
│   └── stock-lifecycle
│
└── international/
    ├── orchestrator
    ├── strategie-structure
    ├── hreflang
    ├── localisation-contenu
    └── geotargeting
```

## Escalades Courantes

| Depuis | Vers | Condition |
|--------|------|-----------|
| SEO technique | direction-technique | Décision d'architecture majeure |
| SEO contenu | content/orchestrator | Rédaction de contenus |
| SEO pilotage | analytics/orchestrator | Intégration analytics avancée |
| SEO e-commerce | frontend-developer | Implémentation schema.org |
| SEO international | project-management | Budget multi-pays |

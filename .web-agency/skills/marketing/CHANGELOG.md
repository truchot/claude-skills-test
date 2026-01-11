# Changelog

Toutes les modifications notables de ce skill sont documentées dans ce fichier.

Le format est basé sur [Keep a Changelog](https://keepachangelog.com/fr/1.0.0/),
et ce projet adhère au [Versioning Sémantique](https://semver.org/lang/fr/).

## [1.3.0] - 2026-01-05

### Ajouté

#### Domaine Fidélisation (5 agents)
- `orchestrator.md` - Coordination fidélisation et rétention
- `lifecycle-management.md` - Gestion du cycle de vie client (onboarding → advocacy)
- `loyalty-programs.md` - Programmes de fidélité, points, tiers, gamification
- `churn-prevention.md` - Détection et prévention de l'attrition
- `customer-success.md` - Customer success, NPS, CSAT, health score

#### Domaine Automation (5 agents)
- `orchestrator.md` - Coordination marketing automation avancé
- `workflow-builder.md` - Conception de workflows automatisés
- `lead-scoring.md` - Modélisation et scoring de leads (MQL/SQL)
- `triggers-actions.md` - Configuration des déclencheurs et actions
- `multi-touch-sequences.md` - Séquences de nurturing multi-canal

#### Domaine Performance / CRO (5 agents)
- `orchestrator.md` - Coordination optimisation des conversions
- `conversion-optimization.md` - Stratégie CRO et audits
- `funnel-analysis.md` - Analyse des funnels et drop-offs
- `personalization.md` - Personnalisation par segment et contexte
- `experimentation.md` - A/B tests, tests multivariés, feature flags

#### Domaine Social Strategy (5 agents)
- `orchestrator.md` - Coordination stratégie social media
- `platform-strategy.md` - Stratégie par plateforme (LinkedIn, Instagram, TikTok, etc.)
- `community-management.md` - Animation et modération de communauté
- `social-listening.md` - Veille, monitoring, analyse de sentiment
- `engagement-strategy.md` - Croissance organique et viralité

### Modifié
- `SKILL.md` v1.3.0 : 9 domaines, 94 agents au total (+20 agents)
- Architecture mise à jour avec 4 nouveaux domaines de niveau COMMENT
- Règles de routage étendues pour les nouveaux domaines

---

## [1.2.0] - 2026-01-04

### Ajouté

#### SEO E-commerce (5 agents)
- `orchestrator.md` - Coordination SEO e-commerce
- `fiches-produits.md` - Optimisation pages produits, schema.org Product
- `categories-navigation.md` - Pages catégories, navigation facettée
- `google-merchant.md` - Intégration Google Shopping/Merchant Center
- `stock-lifecycle.md` - Gestion ruptures de stock, produits arrêtés

#### SEO International (5 agents)
- `orchestrator.md` - Coordination SEO international
- `strategie-structure.md` - Architecture ccTLD vs subdomain vs subdirectory
- `hreflang.md` - Implémentation et audit hreflang
- `localisation-contenu.md` - Traduction vs localisation vs transcréation
- `geotargeting.md` - Configuration ciblage géographique

### Modifié
- `seo/orchestrator.md` v4.0.0 : 9 domaines, 49 agents SEO

---

## [1.1.0] - 2026-01-04

### Ajouté

#### SEO GEO (6 agents)
- `orchestrator.md` - Coordination Generative Engine Optimization
- `ai-search-strategy.md` - Stratégie visibilité ChatGPT/Perplexity/Gemini
- `ai-overviews.md` - Optimisation Google AI Overviews (ex-SGE)
- `entity-authority.md` - Knowledge Graph, Wikidata, autorité d'entité
- `citation-optimization.md` - Maximisation citations LLM
- `llm-content-strategy.md` - Contenus optimisés compréhension IA

#### SEO Local (5 agents)
- `orchestrator.md` - Coordination SEO local
- `google-business.md` - Optimisation Google Business Profile
- `citations-nap.md` - Cohérence NAP, annuaires locaux
- `avis-reputation.md` - Gestion avis, stratégie acquisition
- `local-content.md` - Contenus géolocalisés, pages ville

### Modifié
- `seo/orchestrator.md` v3.0.0 : ajout GEO et Local

---

## [1.0.0] - 2026-01-04

### Ajouté

#### Orchestrateur principal
- `SKILL.md` avec architecture hiérarchique et règles de routage
- 5 domaines principaux avec 74 agents au total

#### Domaine Stratégie (5 agents)
- `orchestrator.md` - Coordination stratégie marketing
- `market-analysis.md` - Analyse de marché et tendances
- `persona-definition.md` - Définition personas et ICP
- `brand-positioning.md` - Positionnement de marque
- `objectifs-marketing.md` - Définition objectifs SMART

#### Domaine Campagnes (5 agents)
- `orchestrator.md` - Coordination campagnes
- `planning-campagne.md` - Planification et calendrier
- `budget-allocation.md` - Répartition budgétaire
- `coordination-canaux.md` - Coordination cross-canal
- `suivi-performance.md` - Suivi et optimisation

#### Domaine Content (5 agents)
- `orchestrator.md` - Coordination contenus
- `copywriting.md` - Rédaction persuasive
- `blog-articles.md` - Articles de blog et content marketing
- `social-media-content.md` - Contenus réseaux sociaux
- `landing-pages.md` - Pages d'atterrissage

#### Domaine Acquisition (5 agents base + 49 SEO)
- `orchestrator.md` - Coordination acquisition
- `sea-google-ads.md` - Publicité Google Ads
- `social-ads.md` - Publicité réseaux sociaux
- `email-marketing.md` - Email et automation
- `growth-hacking.md` - Techniques de growth

##### Sous-domaine SEO (49 agents)
- **Stratégie** (5) : audit, roadmap, concurrence, opportunités keywords
- **Technique** (6) : crawl, Core Web Vitals, architecture, JS SEO, migrations
- **Contenu** (6) : recherche mots-clés, briefs, on-page, sémantique, refresh
- **Netlinking** (5) : stratégie backlinks, prospection, outreach, profil liens
- **Pilotage** (5) : reporting, positions, analytics, veille algorithmes
- **GEO** (6) : AI Search, AI Overviews, entités, citations LLM
- **Local** (5) : Google Business, NAP, avis, contenus locaux
- **E-commerce** (5) : fiches produits, catégories, Google Merchant, stocks
- **International** (5) : hreflang, structure, localisation, geotargeting

#### Domaine Analytics (5 agents)
- `orchestrator.md` - Coordination analytics
- `kpi-tracking.md` - Suivi KPIs marketing
- `reporting.md` - Tableaux de bord et reporting
- `attribution.md` - Modèles d'attribution
- `ab-testing.md` - Tests A/B et expérimentation

### Documentation
- README.md avec guide d'utilisation
- CHANGELOG.md
- Structure SEO documentée

---

## Roadmap

### Prochaines versions
- Domaine Influence marketing
- Domaine Affiliation marketing
- Intégration avancée avec skill `project-management`
- Domaine Video marketing (YouTube, Shorts, Reels)

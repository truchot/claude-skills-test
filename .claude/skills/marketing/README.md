# Marketing Skill

Expert Marketing digital pour agence Web - Stratégie, campagnes, contenu, acquisition et analytics.

![Version](https://img.shields.io/badge/version-1.2.0-blue) ![Agents](https://img.shields.io/badge/agents-74-brightgreen) ![Status](https://img.shields.io/badge/status-active-green)

## Vue d'Ensemble

```
┌─────────────────────────────────────────────────────────────┐
│  NIVEAU 1 : POURQUOI (strategie/)                           │
│  → Positionnement, marché, personas, objectifs              │
└─────────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────────┐
│  NIVEAU 2 : QUOI (campagnes/)                               │
│  → Planification, budget, coordination                      │
└─────────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────────┐
│  NIVEAU 3 : COMMENT (content/, acquisition/, analytics/)    │
│  → Production, activation, mesure                           │
└─────────────────────────────────────────────────────────────┘
```

## Installation

Ce skill est automatiquement disponible dans Claude Code.

```bash
# Vérifier que le skill est chargé
ls .claude/skills/marketing/

# Exécuter les tests
cd .claude/skills/marketing/tests
./run-tests.sh
```

## Quick Start

### Exemples de requêtes

```
# Stratégie
"Aide-moi à définir mes personas cibles"
→ strategie/persona-definition

# Campagnes
"Je dois planifier une campagne de lancement produit"
→ campagnes/planning-campagne

# Contenu
"Rédige un article de blog sur les tendances e-commerce 2026"
→ content/blog-articles

# Acquisition
"Optimise mon référencement naturel"
→ acquisition/seo/orchestrator

# Analytics
"Comment mesurer le ROI de ma campagne ?"
→ analytics/attribution
```

## Domaines

| Domaine | Agents | Description |
|---------|--------|-------------|
| **strategie/** | 5 | Positionnement, marché, personas |
| **campagnes/** | 5 | Planning, budget, coordination |
| **content/** | 5 | Copywriting, blog, social media |
| **acquisition/** | 54 | SEO (49), SEA, Social Ads, Email, Growth |
| **analytics/** | 5 | KPIs, A/B testing, reporting |

**Total : 74 agents spécialisés**

## Structure SEO (49 agents)

Le sous-domaine SEO est le plus développé avec 9 domaines spécialisés :

```
acquisition/seo/
├── strategie/      # 5 - Audit, roadmap, concurrence
├── technique/      # 6 - Crawl, Core Web Vitals, architecture
├── contenu/        # 6 - Keywords, briefs, on-page
├── netlinking/     # 5 - Backlinks, outreach, prospection
├── pilotage/       # 5 - Reporting, positions, veille
├── geo/            # 6 - AI Search, ChatGPT, AI Overviews
├── local/          # 5 - Google Business, avis, NAP
├── ecommerce/      # 5 - Fiches produits, catégories, Shopping
└── international/  # 5 - Hreflang, localisation, geotargeting
```

### GEO (Generative Engine Optimization)

Le domaine GEO couvre l'optimisation pour les moteurs de recherche IA :

- ChatGPT Search
- Perplexity AI
- Google AI Overviews (ex-SGE)
- Bing Copilot
- Gemini

Voir [docs/seo-quick-reference.md](docs/seo-quick-reference.md) pour le guide de routage SEO.

## Tests

```bash
cd .claude/skills/marketing/tests

# Tous les tests
./run-tests.sh

# Tests individuels
node validate-skill.test.js
node validate-agents.test.js
node validate-routing.test.js
node validate-seo.test.js
```

## Composition avec Autres Skills

| Skill | Interaction |
|-------|-------------|
| `project-management` | Coordination projets marketing |
| `direction-technique` | Specs tracking, intégrations |
| `frontend-developer` | Landing pages, composants |
| `design-system-foundations` | Cohérence visuelle |
| `web-dev-process` | Intégration dev continu |

## Métriques Clés

| Catégorie | Métriques |
|-----------|-----------|
| **Notoriété** | Impressions, reach, part de voix |
| **Acquisition** | Trafic, CPC, CPM, CTR |
| **Conversion** | Taux de conversion, CPA, CPL |
| **Rétention** | LTV, churn, repeat purchase |
| **ROI** | ROAS, ROI global, marge |

## Changelog

Voir [CHANGELOG.md](CHANGELOG.md) pour l'historique des versions.

## Ressources

- **Agents** : `agents/strategie/`, `agents/campagnes/`, `agents/content/`, `agents/acquisition/`, `agents/analytics/`
- **Docs** : `docs/seo-quick-reference.md`
- **Tests** : `tests/`

## Licence

MIT

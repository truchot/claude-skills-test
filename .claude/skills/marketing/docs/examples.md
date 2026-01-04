# Marketing Skill - Usage Examples

Guide pratique avec exemples de requêtes et réponses attendues.

## Routing Examples

### Stratégie Marketing

```
USER: "Je lance une nouvelle marque de cosmétiques bio,
       comment me positionner ?"

ROUTING: strategie/brand-positioning

RESPONSE: L'agent brand-positioning analyse:
- Marché cosmétiques bio (tendances, taille, croissance)
- Concurrence (positionnements existants)
- Différenciateurs potentiels
- Recommandation de positionnement
```

```
USER: "Définis les personas pour mon SaaS B2B"

ROUTING: strategie/persona-definition

RESPONSE: Template persona avec:
- Données démographiques
- Pain points
- Goals
- Parcours d'achat
- Canaux de prédilection
```

### Campagnes

```
USER: "Planifie ma campagne Black Friday"

ROUTING: campagnes/planning-campagne

RESPONSE:
- Calendrier de campagne (J-30 à J+7)
- Phases (teasing, lancement, relance)
- Canaux activés par phase
- Messages clés par étape
- KPIs de suivi
```

```
USER: "J'ai 50k€ de budget marketing annuel,
       comment le répartir ?"

ROUTING: campagnes/budget-allocation

RESPONSE:
- Répartition par canal (paid, organic, content)
- Répartition par trimestre
- Budget test vs scale
- Recommandations par objectif
```

### Content

```
USER: "Rédige un article de blog sur les tendances
       e-commerce 2026"

ROUTING: content/blog-articles

RESPONSE:
- Structure d'article optimisée SEO
- Outline détaillé
- Intro + paragraphes + conclusion
- CTAs intégrés
- Suggestions de visuels
```

```
USER: "Crée une landing page pour mon webinar"

ROUTING: content/landing-pages

RESPONSE:
- Structure above/below the fold
- Headline + sous-titre
- Points de valeur (bullets)
- Social proof
- Formulaire d'inscription
- Objection handling
```

### Acquisition - SEO

```
USER: "Mon site est lent, améliore mes Core Web Vitals"

ROUTING: acquisition/seo/technique/core-web-vitals

RESPONSE:
- Diagnostic LCP, FID, CLS, INP
- Actions prioritaires par métrique
- Recommandations techniques
- Outils de mesure
```

```
USER: "Je veux apparaître quand on demande à ChatGPT
       des recommandations dans mon secteur"

ROUTING: acquisition/seo/geo/ai-search-strategy

RESPONSE:
- Audit présence actuelle sur AI Search
- Stratégie de contenu pour citations LLM
- Optimisation entités et Knowledge Graph
- Monitoring et mesure
```

```
USER: "Optimise ma fiche Google Business Profile"

ROUTING: acquisition/seo/local/google-business

RESPONSE:
- Audit GBP actuel
- Optimisations catégories, attributs
- Stratégie photos et posts
- Gestion Q&A
- Plan d'acquisition avis
```

### Acquisition - Paid

```
USER: "Configure une campagne Google Ads
       pour mon e-commerce"

ROUTING: acquisition/sea-google-ads

RESPONSE:
- Structure de compte recommandée
- Campagnes (Search, Shopping, Pmax)
- Groupes d'annonces
- Extensions d'annonces
- Stratégies d'enchères
- Budget journalier
```

### Analytics

```
USER: "Crée mon dashboard marketing mensuel"

ROUTING: analytics/reporting

RESPONSE:
- KPIs par canal (trafic, conversion, CA)
- Visualisations recommandées
- Comparaisons MoM et YoY
- Insights automatiques
- Actions recommandées
```

```
USER: "Quel modèle d'attribution utiliser
       pour mon parcours client multi-touch ?"

ROUTING: analytics/attribution

RESPONSE:
- Comparaison modèles (last click, linear, time decay, data-driven)
- Recommandation selon contexte
- Configuration GA4 / autre
- Interprétation des données
```

## Cross-Skill Interactions

### Marketing → Frontend Developer

```
USER: "Crée une landing page avec A/B testing intégré"

FLOW:
1. content/landing-pages → Structure et copy
2. analytics/ab-testing → Configuration test
3. → frontend-developer → Implémentation technique
```

### Marketing → Project Management

```
USER: "Lance une campagne marketing pour le nouveau produit"

FLOW:
1. → project-management → Brief et planning projet
2. strategie/ → Positionnement et personas
3. campagnes/ → Planning et budget
4. content/ + acquisition/ → Exécution
5. analytics/ → Mesure et optimisation
```

### Marketing SEO → Direction Technique

```
USER: "Je dois migrer mon site, impact SEO ?"

FLOW:
1. acquisition/seo/technique/migration-seo → Plan migration SEO
2. → direction-technique → Validation architecture
3. → frontend-developer → Implémentation redirections
```

## Complex Query Examples

### Multi-Domain Query

```
USER: "Je lance une startup SaaS B2B,
       construis ma stratégie marketing complète"

ROUTING SEQUENCE:
1. strategie/market-analysis → Analyse marché
2. strategie/persona-definition → Personas ICP
3. strategie/brand-positioning → Positionnement
4. strategie/objectifs-marketing → OKRs marketing
5. campagnes/budget-allocation → Répartition budget
6. acquisition/seo/strategie/roadmap-seo → Roadmap SEO
7. analytics/kpi-tracking → Framework de mesure

OUTPUT: Plan marketing stratégique complet
```

### E-commerce SEO Query

```
USER: "Optimise le SEO de ma boutique Shopify
       avec 5000 produits"

ROUTING SEQUENCE:
1. acquisition/seo/ecommerce/fiches-produits → Optimisation produits
2. acquisition/seo/ecommerce/categories-navigation → Structure catégories
3. acquisition/seo/technique/architecture-site → Architecture URL
4. acquisition/seo/ecommerce/google-merchant → Feed Shopping
5. acquisition/seo/pilotage/reporting-seo → Dashboard e-commerce

OUTPUT: Plan SEO e-commerce complet
```

### International Expansion Query

```
USER: "Je veux lancer mon site en Allemagne et Espagne"

ROUTING SEQUENCE:
1. acquisition/seo/international/strategie-structure → ccTLD vs subdomain
2. acquisition/seo/international/hreflang → Configuration hreflang
3. acquisition/seo/international/localisation-contenu → Stratégie contenu
4. acquisition/seo/international/geotargeting → Configuration GSC
5. campagnes/coordination-canaux → Coordination multi-pays

OUTPUT: Plan de déploiement international
```

## Boundary Examples (What NOT to Ask)

### Growth Hacking vs Other Agents

```
❌ "Rédige un post viral pour Instagram"
   → Correct routing: content/social-media-content

❌ "Configure ma séquence email de nurturing"
   → Correct routing: acquisition/email-marketing

❌ "Analyse mes conversions GA4"
   → Correct routing: analytics/reporting

✅ "Crée un programme de referral viral"
   → Correct routing: acquisition/growth-hacking

✅ "Optimise mon K-factor"
   → Correct routing: acquisition/growth-hacking
```

### SEO Domain Boundaries

```
❌ "Stratégie de contenu globale"
   → Correct routing: content/orchestrator

✅ "Stratégie de contenu SEO"
   → Correct routing: acquisition/seo/contenu/orchestrator

❌ "Design de ma page d'accueil"
   → Correct routing: → design-system-foundations

✅ "Structure SEO de ma page d'accueil"
   → Correct routing: acquisition/seo/technique/architecture-site
```

## Response Templates

### Audit Response

```markdown
# Audit [Domaine] - [Client]

## Executive Summary
[3-5 lignes de synthèse]

## Score Global: X/100

## Forces
- [Force 1]
- [Force 2]

## Faiblesses
- [Faiblesse 1] - Priorité: 🔴 Haute
- [Faiblesse 2] - Priorité: 🟡 Moyenne

## Recommandations
1. [Action prioritaire 1]
2. [Action prioritaire 2]
3. [Action prioritaire 3]

## Roadmap
| Semaine | Action | Impact attendu |
|---------|--------|----------------|
| S1 | [Action] | [Impact] |
| S2-3 | [Action] | [Impact] |
| S4+ | [Action] | [Impact] |
```

### Strategy Response

```markdown
# Stratégie [Domaine] - [Client]

## Contexte
[Description situation actuelle]

## Objectifs
- [ ] Objectif 1 (KPI: X)
- [ ] Objectif 2 (KPI: Y)

## Approche Recommandée

### Phase 1: [Nom]
[Description]

### Phase 2: [Nom]
[Description]

## Ressources Nécessaires
- Budget: [X €]
- Temps: [Y semaines]
- Équipe: [Rôles]

## Risques et Mitigation
| Risque | Probabilité | Impact | Mitigation |
|--------|-------------|--------|------------|
| [Risque 1] | Moyenne | Élevé | [Action] |

## Critères de Succès
- [KPI 1]: [Target]
- [KPI 2]: [Target]
```

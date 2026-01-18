# Mapping Agents → Livrables

> Ce document cartographie les livrables par skill et identifie les opportunités de standardisation.

## Vue d'Ensemble

| Skill | Niveau | Agents | Livrables définis | Couverture |
|-------|--------|--------|-------------------|------------|
| client-intake | 0 | 23 | À analyser | - |
| web-agency | 1 | - | Orchestrateur | - |
| task-orchestrator | 1 | 16 | À analyser | - |
| direction-technique | 2 | 52 | 165 uniques | 93% |
| direction-marketing | 2 | 25 | À analyser | - |
| direction-artistique | 2 | 25 | À analyser | - |
| project-management | 3 | 24 | À analyser | - |
| lead-dev | 3 | 27 | À analyser | - |
| web-dev-process | 3 | 61 | 172 uniques | 94% |
| testing-process | 3 | 25 | À analyser | - |
| frontend-developer | 4 | 33 | À analyser | - |
| backend-developer | 4 | 32 | 71 uniques | 100% |
| devops | 4 | 30 | À analyser | - |
| wordpress-gutenberg-expert | 4 | 41 | 169 uniques | 100% |
| react-expert | 4 | 28 | À analyser | - |
| nextjs-expert | 4 | 35 | À analyser | - |
| design-system-foundations | 4 | 21 | À analyser | - |
| marketing | 4 | 115 | 279 uniques | 68% |
| content-management | 4 | 17 | À analyser | - |
| ux-ui-design | 4 | 22 | À analyser | - |
| legal-compliance | 4 | 16 | À analyser | - |
| support-client | 4 | 16 | À analyser | - |
| commercial-crm | 4 | 17 | À analyser | - |
| finance-analytics | 4 | 17 | À analyser | - |

---

## Livrables Standardisés (à créer dans /deliverables/)

### Priorité 1 : Transversaux (utilisés par 3+ skills)

| ID | Nom | Skills concernés | Statut |
|----|-----|------------------|--------|
| `technical-documentation` | Documentation Technique | Tous | ✅ Créé |
| `api-specification` | Spécification API | backend, frontend, direction-technique | ✅ Créé |
| `adr` | Architecture Decision Record | direction-technique, lead-dev, backend | ✅ Créé |
| `test-suite` | Suite de Tests | web-dev, backend, frontend, wordpress | ✅ Créé |
| `configuration-guide` | Guide de Configuration | backend, devops, wordpress | 📝 À créer |
| `audit-report` | Rapport d'Audit | direction-technique, marketing, devops | ✅ Créé (`technical-audit`) |
| `dashboard` | Dashboard/Tableau de Bord | marketing, direction-technique, finance | ✅ Créé (`analytics-dashboard`) |
| `roadmap` | Roadmap | direction-*, project-management | ✅ Créé (`seo-roadmap`) |

### Priorité 2 : Par Domaine Technique

| ID | Nom | Skills concernés | Statut |
|----|-----|------------------|--------|
| `database-schema` | Schéma de Base de Données | backend, direction-technique | ✅ Créé |
| `ci-pipeline` | Pipeline CI/CD | devops, web-dev-process | ✅ Créé |
| `deployment-runbook` | Runbook de Déploiement | devops, web-dev-process | ✅ Créé |
| `security-audit` | Audit de Sécurité | direction-technique, backend, devops | 📝 À créer |
| `performance-report` | Rapport de Performance | backend, frontend, direction-technique | 📝 À créer |

### Priorité 3 : Par Domaine Métier

| ID | Nom | Skills concernés | Statut |
|----|-----|------------------|--------|
| `project-brief` | Brief Projet | project-management, client-intake | ✅ Créé |
| `marketing-strategy` | Stratégie Marketing | direction-marketing, marketing | ✅ Créé (`brand-positioning`, `marketing-objectives`) |
| `brand-guidelines` | Charte Graphique | direction-artistique, ux-ui-design | 📝 À créer |
| `design-tokens` | Design Tokens | design-system-foundations, frontend | ✅ Créé |
| `content-brief` | Brief Contenu | content-management, marketing | 📝 À créer |

### Priorité 4 : Spécifiques WordPress

| ID | Nom | Skills concernés | Statut |
|----|-----|------------------|--------|
| `gutenberg-block` | Block Gutenberg | wordpress-gutenberg-expert | ✅ Créé |
| `theme-json-config` | Configuration theme.json | wordpress-gutenberg-expert | ✅ Créé |
| `wp-plugin` | Plugin WordPress | wordpress-gutenberg-expert | 📝 À créer |
| `wp-env-setup` | Setup WP Environment | wordpress-gutenberg-expert, devops | 📝 À créer |

---

## Mapping Détaillé par Skill

### backend-developer (32 agents, 100% couverture)

| Domaine | Agent | Livrables produits |
|---------|-------|-------------------|
| **api** | rest-design | `api-specification`, `api-style-guide` |
| **api** | graphql-design | `graphql-schema`, `api-specification` |
| **api** | openapi-spec | `openapi-schema` |
| **api** | validation | `validation-schema` |
| **api** | rate-limiting | `rate-limit-config` |
| **api** | versioning | `versioning-strategy` |
| **architecture** | ddd | `ddd-architecture`, `domain-model` |
| **architecture** | microservices | `microservices-architecture` |
| **architecture** | patterns | `design-patterns-guide` |
| **database** | modeling | `database-schema`, `erd-diagram` |
| **database** | migrations | `migration-scripts` |
| **database** | optimization | `query-optimization-report` |
| **auth-security** | authentication | `auth-implementation` |
| **auth-security** | audit | `security-audit` |
| **performance** | caching | `caching-strategy` |
| **performance** | profiling | `performance-report` |
| **testing** | unit | `test-suite`, `test-coverage` |
| **testing** | integration | `integration-tests` |
| **testing** | api | `api-test-suite` |

### direction-technique (52 agents, 93% couverture)

| Domaine | Agent | Livrables produits |
|---------|-------|-------------------|
| **architecture** | adr | `adr` |
| **architecture** | architecture-applicative | `architecture-diagram`, `technical-documentation` |
| **architecture** | review-architecture | `architecture-review-report` |
| **avant-projet** | audit-existant | `audit-report` |
| **avant-projet** | etude-faisabilite | `feasibility-study` |
| **avant-projet** | selection-stack | `stack-recommendation` |
| **estimation** | estimation-macro | `macro-estimation` |
| **estimation** | estimation-detaillee | `detailed-estimation` |
| **estimation** | analyse-risques | `risk-matrix` |
| **specification** | specification-technique | `technical-specification` |
| **specification** | modelisation-donnees | `data-model` |
| **specification** | specification-api | `api-specification` |
| **qualite** | code-review | `code-review-report` |
| **qualite** | dette-technique | `tech-debt-report` |
| **securite** | audit-securite | `security-audit` |
| **securite** | conformite-rgpd | `rgpd-compliance-report` |
| **communication** | documentation-technique | `technical-documentation` |
| **communication** | onboarding-technique | `onboarding-guide` |

### wordpress-gutenberg-expert (41 agents, 100% couverture)

| Domaine | Agent | Livrables produits |
|---------|-------|-------------------|
| **gutenberg-blocks** | block-development | `gutenberg-block` |
| **gutenberg-blocks** | block-patterns | `block-patterns` |
| **theme-development** | theme-json | `theme-json-config` |
| **theme-development** | block-themes | `block-theme` |
| **custom-post-types** | cpt-registration | `cpt-implementation` |
| **testing** | phpunit | `test-suite` |
| **testing** | e2e | `e2e-test-suite` |
| **tooling** | wp-env | `wp-env-setup` |
| **tooling** | ci-cd | `ci-pipeline` |

### marketing (115 agents, 68% couverture)

| Domaine | Agent | Livrables produits |
|---------|-------|-------------------|
| **seo** | audit | `seo-audit` |
| **seo** | strategy | `seo-strategy` |
| **content** | planning | `content-calendar` |
| **content** | brief | `content-brief` |
| **paid** | campaign-setup | `campaign-config` |
| **paid** | optimization | `campaign-report` |
| **analytics** | dashboard | `dashboard` |
| **analytics** | reporting | `analytics-report` |
| **automation** | workflows | `automation-workflow` |
| **social** | strategy | `social-strategy` |

---

## Plan de Migration

### Phase 1 : Livrables Transversaux (Sprint 1) ✅
1. ✅ `technical-documentation` - Créé
2. ✅ `api-specification` - Créé
3. ✅ `adr` - Créé
4. ✅ `test-suite` - Créé
5. ✅ `audit-report` - Créé (`technical-audit`)
6. 📝 `configuration-guide` - À créer

### Phase 2 : Livrables Techniques (Sprint 2) ✅
- ✅ `database-schema` - Créé
- ✅ `ci-pipeline` - Créé
- ✅ `deployment-runbook` - Créé
- 📝 `security-audit` - À créer
- 📝 `performance-report` - À créer

### Phase 3 : Livrables Métier (Sprint 3) ✅
- ✅ `project-brief` - Créé
- ✅ `marketing-strategy` - Créé (persona, brand-positioning, marketing-objectives)
- 📝 `brand-guidelines` - À créer
- ✅ `design-tokens` - Créé

### Phase 4 : Livrables WordPress (Sprint 4) ✅
- ✅ `gutenberg-block` - Créé
- ✅ `theme-json-config` - Créé
- 📝 `wp-plugin` - À créer
- 📝 `wp-env-setup` - À créer

### Phase 5 : Livrables Marketing (Sprint 5) ✅
- ✅ 20 livrables marketing créés (SEO, campagnes, automation, performance, social)

### Phase 6 : Mise à jour des Agents
- Ajouter `deliverables:` dans le frontmatter de chaque agent
- Supprimer les sections `## Livrables` inline
- Ajouter les références vers `/deliverables/`

---

## Métriques de Suivi

| Métrique | Actuel | Cible |
|----------|--------|-------|
| Livrables standardisés créés | 60+ | 80+ |
| Agents avec frontmatter `deliverables:` | 0 | 757 |
| Couverture moyenne des skills | 85% | 100% |
| Livrables réutilisés (>1 agent) | 40% | 60% |

## Livrables Restants à Créer

| ID | Priorité | Issue |
|----|----------|-------|
| `configuration-guide` | P1 | #TBD |
| `security-audit` | P2 | #TBD |
| `performance-report` | P2 | #TBD |
| `brand-guidelines` | P3 | #TBD |
| `content-brief` | P3 | #TBD |
| `wp-plugin` | P4 | #TBD |
| `wp-env-setup` | P4 | #TBD |

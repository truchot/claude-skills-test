---
name: routing
description: Règles de routage vers les skills métiers
---

# Règles de Routage Web Agency

Ce document définit les règles de routage des requêtes vers les skills appropriés.

## Principe

> Une requête = Un skill principal identifié

## Matrice de Routage par Mots-clés

### Project Management

| Mots-clés | Skill |
|-----------|-------|
| brief, besoin, demande client, RFP, cahier des charges | `project-management/avant-projet` |
| devis, estimation, chiffrage, budget, proposition | `project-management/avant-projet` |
| planning, jalon, milestone, Gantt, deadline | `project-management/pilotage` |
| avancement, suivi, reporting, statut | `project-management/pilotage` |
| réunion, CR, compte-rendu, PV | `project-management/communication` |
| email, relance, message client | `project-management/communication` |
| recette, validation, test client, PV recette | `project-management/livraison` |
| facture, facturation, paiement | `project-management/facturation` |

### Direction Technique (Stratégie)

| Mots-clés | Skill |
|-----------|-------|
| choix stack, framework, technologie | `direction-technique/avant-projet` |
| audit existant, legacy, migration | `direction-technique/avant-projet` |
| architecture, patterns, ADR | `direction-technique/architecture` |
| specs techniques, spécification | `direction-technique/specification` |
| estimation technique, chiffrage dev | `direction-technique/estimation` |
| qualité, standards, dette technique | `direction-technique/qualite` |
| sécurité, OWASP, RGPD, vulnérabilité | `direction-technique/securite` |
| performance, optimisation, SLO | `direction-technique/performance` |
| **benchmark, analyse concurrentielle** | `direction-technique/strategy` |
| **stratégie digitale, roadmap technique** | `direction-technique/strategy` |
| **recommandations techniques, KPIs business** | `direction-technique/strategy` |

### Lead Dev (Coordination)

| Mots-clés | Skill |
|-----------|-------|
| PR, pull request, review code, merge request | `lead-dev/code-review` |
| qualité code, sécurité code, performance code | `lead-dev/code-review` |
| tâche, assignation, daily, standup, blocage | `lead-dev/team-coordination` |
| sprint support, débloquer dev | `lead-dev/team-coordination` |
| choix librairie, quel pattern, refactoring | `lead-dev/technical-decisions` |
| dette technique priorisation | `lead-dev/technical-decisions` |
| feedback code, onboarding dev, formation | `lead-dev/mentoring` |
| bonnes pratiques, évaluation niveau | `lead-dev/mentoring` |
| release, deploy check, hotfix, changelog | `lead-dev/delivery` |
| merge strategy, stratégie branches | `lead-dev/delivery` |

### Web Dev Process (Processus)

| Mots-clés | Skill |
|-----------|-------|
| user story, requirement, scope | `web-dev-process/discovery` |
| wireframe, mockup, UI/UX, design système | `web-dev-process/design` |
| git, repo, CI/CD, pipeline, linter | `web-dev-process/setup` |
| code review, PR, conventions | `web-dev-process/development` |
| test unitaire, e2e, accessibilité | `web-dev-process/testing` |
| deploy, staging, production, rollback | `web-dev-process/deployment` |
| monitoring, logs, alerting, bug | `web-dev-process/maintenance` |

### Next.js (Implémentation)

| Mots-clés | Skill |
|-----------|-------|
| Next.js, App Router, page.tsx, layout.tsx | `nextjs-expert/app-router` |
| Server Component, Client Component, RSC | `nextjs-expert/server-components` |
| Server Action, revalidation, fetch cache | `nextjs-expert/data` |
| SSR, SSG, ISR, middleware, Edge | `nextjs-expert/rendering` |
| next/image, next/font, bundle | `nextjs-expert/optimization` |
| Vercel, Docker, next.config.js | `nextjs-expert/deployment` |
| Playwright Next.js, Vitest Next.js | `nextjs-expert/testing` |

### WordPress (Implémentation)

| Mots-clés | Skill |
|-----------|-------|
| CPT, taxonomy, hook, filter, PHP WP | `wordpress-gutenberg-expert/wp-core` |
| block, Gutenberg, registerBlockType | `wordpress-gutenberg-expert/gutenberg-blocks` |
| theme.json, block theme, FSE | `wordpress-gutenberg-expert/theme` |
| wp-env, WP-CLI, @wordpress/scripts | `wordpress-gutenberg-expert/tooling` |
| PHPUnit WP, Jest WP, Playwright WP | `wordpress-gutenberg-expert/testing` |

### UX-UI Design (Design & Branding)

| Mots-clés | Skill |
|-----------|-------|
| wireframe, mockup, prototype, parcours utilisateur | `ux-ui-design/wireframes` |
| maquette HD, design visuel, UI kit | `ux-ui-design/design-visuel` |
| **branding, identité visuelle, charte graphique** | `ux-ui-design/branding/brand-identity` |
| **direction artistique, DA, univers graphique** | `ux-ui-design/branding/direction-artistique` |
| **motion design, animation, micro-interactions** | `ux-ui-design/branding/motion-design` |
| **logo, assets, iconographie, illustrations** | `ux-ui-design/branding/assets-creator` |
| test utilisateur, A/B test, heatmap | `ux-ui-design/tests-utilisateurs` |

### Design System

| Mots-clés | Skill |
|-----------|-------|
| design tokens, couleurs, typo, spacing | `design-system-foundations/foundations` |
| bouton, input, icône, badge | `design-system-foundations/atoms` |
| formulaire, card, modal, navigation | `design-system-foundations/molecules` |
| layout, page template, hero | `design-system-foundations/templates` |

### Marketing (6 Skills Spécialisés)

| Mots-clés | Skill |
|-----------|-------|
| **SEO, référencement, keywords, backlinks** | `seo-expert` |
| **Google Ads, SEA, Social Ads, Meta Ads** | `paid-media` |
| **tracking, GA4, attribution, analytics** | `marketing-analytics` |
| **ligne éditoriale, copywriting, contenu** | `content-marketing` |
| **fidélisation, rétention, lifecycle** | `customer-success` |
| **campagnes, email, automation** | `marketing-ops` |

### DevOps (Implémentation)

| Mots-clés | Skill |
|-----------|-------|
| GitHub Actions, GitLab CI, workflow, pipeline | `devops/cicd` |
| Dockerfile, docker-compose, image, container | `devops/containers` |
| Kubernetes, K8s, Helm, pod, deployment | `devops/kubernetes` |
| Terraform, AWS, GCP, VPC, IaC | `devops/infrastructure` |
| Prometheus, Grafana, logs, alerting | `devops/monitoring` |
| Blue-Green, Canary, rollback, feature flag | `devops/deployment` |

### Team Management (Gestion d'Équipe)

| Mots-clés | Skill |
|-----------|-------|
| onboarding, intégration, nouveau dev, arrivée | `team-management/onboarding` |
| compétence, matrice, skill, lacune, bus factor | `team-management/skills-tracking` |
| assigner, attribution, staffing, qui pour | `team-management/task-allocation` |
| charge, équilibrer, disponibilité, capacité | `team-management/task-allocation` |
| vélocité, burnout, surcharge, moral | `team-management/performance` |
| pair programming, reviewer, knowledge sharing | `team-management/collaboration` |
| carrière, progression, 1:1, feedback, évaluation | `team-management/career` |

### Incident Management (Gestion d'Incidents)

| Mots-clés | Skill |
|-----------|-------|
| incident, down, 500, erreur production, panne | `incident-management/detection` |
| sévérité, P1, P2, classifier, triage | `incident-management/detection` |
| war room, coordination crise, bridge call | `incident-management/response` |
| runbook, procédure urgence, que faire | `incident-management/response` |
| communication incident, status page | `incident-management/response` |
| root cause, 5 whys, postmortem, blameless | `incident-management/resolution` |
| action corrective, suivi incident | `incident-management/resolution` |

### Agent Performance Monitor (Méta-Monitoring)

| Mots-clés | Skill |
|-----------|-------|
| usage agent, statistiques agents, fréquence utilisation | `agent-performance-monitor/usage-metrics` |
| temps résolution, latence agent, performance agent | `agent-performance-monitor/usage-metrics` |
| taux succès, taux échec, efficacité agent | `agent-performance-monitor/usage-metrics` |
| routage qualité, rerouting, erreur aiguillage | `agent-performance-monitor/routing-quality` |
| goulot, bottleneck, engorgement, blocage agent | `agent-performance-monitor/routing-quality` |
| couverture agent, lacune, demande non couverte | `agent-performance-monitor/routing-quality` |
| agent redondant, consolider, fusionner agents | `agent-performance-monitor/optimization` |
| qualité prompt, instruction agent, clarté | `agent-performance-monitor/optimization` |
| dashboard framework, tableau de bord agents | `agent-performance-monitor/optimization` |
| digest hebdomadaire, rapport agents, weekly | `agent-performance-monitor/optimization` |

### Tech Radar (Veille Technologique)

| Mots-clés | Skill |
|-----------|-------|
| évaluer technologie, comparer framework, benchmark techno | `tech-radar/evaluation` |
| adopt, trial, assess, hold, radar techno | `tech-radar/evaluation` |
| risque adoption, vendor lock-in, maturité techno | `tech-radar/evaluation` |
| compatibilité stack, intégration technologie | `tech-radar/evaluation` |
| audit dépendances, npm audit, vulnérabilité lib | `tech-radar/tracking` |
| veille techno, tendance, nouvelle release | `tech-radar/tracking` |
| déprécié, deprecated, EOL, fin support | `tech-radar/tracking` |
| ADR, decision record, documenter choix technique | `tech-radar/tracking` |
| migration technologique, upgrade majeur, transition | `tech-radar/migration` |
| PoC, proof of concept, prototype validation | `tech-radar/migration` |
| optimiser stack, simplifier, réduire complexité | `tech-radar/migration` |
| coût bénéfice, ROI technologique, trade-off techno | `tech-radar/migration` |

### ✅ Domaines Récemment Ajoutés (v4.3.0)

Ces domaines sont maintenant **disponibles** et couverts par les skills suivants :

| Mots-clés (anciennement non couverts) | Skill Disponible |
|---------------------------------------|------------------|
| audit, benchmark, stratégie digitale | `direction-technique/strategy` |
| maquette, logo, charte, branding, DA | `ux-ui-design/branding` |
| rédaction, copywriting, SEO éditorial | `content-marketing` |
| SEO, SEA, analytics, social media | `seo-expert` + `paid-media` + `marketing-analytics` |

> **Tous les domaines métiers sont désormais couverts.** L'agence web IA est complète.

## Arbre de Décision

```
Requête utilisateur
│
├─ Concerne le CLIENT ou le PROJET ?
│  └─ → project-management
│
├─ Concerne une DÉCISION technique STRATÉGIQUE ?
│  └─ → direction-technique
│
├─ Concerne la COORDINATION d'équipe dev ?
│  ├─ Code review, PR, qualité ? → lead-dev/code-review
│  ├─ Tâches, daily, blocage ? → lead-dev/team-coordination
│  ├─ Choix lib, pattern ? → lead-dev/technical-decisions
│  ├─ Formation, mentoring ? → lead-dev/mentoring
│  └─ Release, deploy, hotfix ? → lead-dev/delivery
│
├─ Concerne les PERSONNES de l'équipe ?
│  ├─ Onboarding nouveau dev ? → team-management/onboarding
│  ├─ Compétences, matrice, gaps ? → team-management/skills-tracking
│  ├─ Qui assigner, charge, dispo ? → team-management/task-allocation
│  ├─ Vélocité, burnout, qualité ? → team-management/performance
│  ├─ Pair programming, reviews ? → team-management/collaboration
│  └─ Carrière, 1:1, feedback ? → team-management/career
│
├─ Concerne un INCIDENT technique ?
│  ├─ Classifier, impact ? → incident-management/detection
│  ├─ War room, runbook, comm ? → incident-management/response
│  └─ Root cause, postmortem ? → incident-management/resolution
│
├─ Concerne la PERFORMANCE des AGENTS IA ?
│  ├─ Usage, stats, succès ? → agent-performance-monitor/usage-metrics
│  ├─ Routage, couverture, goulots ? → agent-performance-monitor/routing-quality
│  └─ Optimisation, consolidation ? → agent-performance-monitor/optimization
│
├─ Concerne la VEILLE TECHNOLOGIQUE ?
│  ├─ Évaluer une techno, adopt/trial ? → tech-radar/evaluation
│  ├─ Dépendances, dépréciations, ADR ? → tech-radar/tracking
│  └─ Migration, PoC, stack ? → tech-radar/migration
│
├─ Concerne un PROCESSUS de dev ?
│  └─ → web-dev-process
│
├─ Concerne l'implémentation FRONTEND ?
│  └─ → frontend-developer (ou react-expert)
│
├─ Concerne Next.js spécifiquement ?
│  └─ → nextjs-expert
│
├─ Concerne l'implémentation BACKEND ?
│  └─ → backend-developer
│
├─ Concerne DevOps (CI/CD, containers, K8s, IaC, monitoring) ?
│  └─ → devops
│
├─ Concerne WordPress/Gutenberg ?
│  └─ → wordpress-gutenberg-expert
│
├─ Concerne le DESIGN SYSTEM ?
│  └─ → design-system-foundations
│
├─ Concerne UX/UI ou BRANDING ?
│  ├─ Wireframes, prototypes ? → ux-ui-design/wireframes
│  ├─ Maquettes HD, design visuel ? → ux-ui-design/design-visuel
│  ├─ Branding, identité, DA ? → ux-ui-design/branding
│  ├─ Motion design, animations ? → ux-ui-design/branding/motion-design
│  └─ Tests utilisateurs ? → ux-ui-design/tests-utilisateurs
│
├─ Concerne MARKETING ou CONTENU ?
│  ├─ SEO, référencement ? → seo-expert
│  ├─ Google Ads, Social Ads ? → paid-media
│  ├─ Tracking, analytics, attribution ? → marketing-analytics
│  ├─ Ligne éditoriale, copywriting ? → content-marketing
│  ├─ Fidélisation, rétention ? → customer-success
│  └─ Campagnes, email, automation ? → marketing-ops
│
├─ Concerne STRATÉGIE DIGITALE ?
│  ├─ Benchmark concurrentiel ? → direction-technique/strategy/benchmark
│  ├─ Roadmap technique ? → direction-technique/strategy/strategie-digitale
│  └─ KPIs business ? → direction-technique/strategy/kpis-business
│
└─ Autre domaine ?
   └─ → Tous les domaines sont couverts. Clarifier le besoin si ambigu.
```

## Matrice de Désambiguïsation

### Mots-clés Ambigus - Règles de Priorité

Ces mots-clés apparaissent dans plusieurs skills. Utiliser le contexte pour router :

| Mot-clé | Contexte → Skill | Règle |
|---------|------------------|-------|
| **architecture** | Décision stratégique → `direction-technique/architecture` | Si "quelle architecture ?" |
| | Process/workflow → `web-dev-process/design/architecture` | Si "comment structurer ?" |
| | Backend spécifique → `backend-developer/architecture` | Si code/patterns concrets |
| **performance** | Politique/SLO → `direction-technique/performance` | Si objectifs, budgets |
| | Process de mesure → `web-dev-process/testing/performance` | Si "comment mesurer ?" |
| | Code frontend → `frontend-developer/performance` | Si Core Web Vitals, bundle |
| | Code backend → `backend-developer/performance` | Si cache, profiling |
| | Next.js → `nextjs-expert/optimization` | Si next/image, next/font |
| **sécurité** | Politique RGPD/OWASP → `direction-technique/securite` | Si audit, conformité |
| | Process de test → `web-dev-process/testing/security` | Si "comment tester ?" |
| | Revue de code → `lead-dev/code-review/security-review` | Si review PR |
| | Implémentation auth → `backend-developer/auth-security` | Si code JWT, hash |
| **code review** | Politique équipe → `direction-technique/qualite/code-review` | Si règles d'approbation |
| | Process/checklist → `web-dev-process/development/code-review` | Si workflow review |
| | Faire une review → `lead-dev/code-review` | Si "reviewer cette PR" |
| **tests** | Stratégie globale → `direction-technique/qualite` | Si coverage min, politique |
| | Process/pyramide → `web-dev-process/testing` | Si "quelle approche ?" |
| | Code frontend → `frontend-developer/testing` | Si Jest, RTL |
| | Code backend → `backend-developer/testing` | Si PHPUnit, Supertest |
| | Code Next.js → `nextjs-expert/testing` | Si Playwright + Next |
| | Code WordPress → `wordpress-gutenberg-expert/testing` | Si PHPUnit WP |
| **deploy** | Stratégie globale → `direction-technique/infrastructure` | Si blue-green, politique |
| | Checklist/release → `lead-dev/delivery` | Si "prêt à déployer ?" |
| | Process → `web-dev-process/deployment` | Si "comment déployer ?" |
| | Config Next.js → `nextjs-expert/deployment` | Si Vercel, Docker Next |
| | Config DevOps → `devops/deployment` | Si Blue-Green, Canary, K8s |
| **CI/CD** | Politique → `direction-technique/infrastructure/strategie-cicd` | Si "quelle stratégie ?" |
| | Process → `web-dev-process/setup/cicd` | Si principes, étapes |
| | Config → `devops/cicd` | Si GitHub Actions, GitLab CI |
| **containers** | Dockerfile, images → `devops/containers` | Si Docker, registry |
| | Orchestration → `devops/kubernetes` | Si K8s, Helm |
| **monitoring** | Politique → `direction-technique/infrastructure` | Si objectifs SLO |
| | Config → `devops/monitoring` | Si Prometheus, Grafana |
| **infrastructure** | Stratégie → `direction-technique/infrastructure` | Si choix cloud |
| | IaC → `devops/infrastructure` | Si Terraform, AWS, GCP |
| **onboarding** | Code/mentoring → `lead-dev/mentoring` | Si feedback code, formation technique |
| | Intégration équipe → `team-management/onboarding` | Si nouveau dev, setup, accueil |
| **feedback** | Code review → `lead-dev/code-review` | Si retour sur du code/PR |
| | Carrière/progression → `team-management/career` | Si évaluation, 1:1, SBI |
| **knowledge sharing** | Session/présentation → `team-management/collaboration` | Si organiser un partage collectif |
| | Mentoring individuel → `lead-dev/mentoring` | Si accompagner un dev sur un sujet |
| **migration** | Architecture/décision → `direction-technique/avant-projet` | Si décision stratégique de migration |
| | Plan de migration step-by-step → `tech-radar/migration` | Si planifier la transition |
| | Legacy modernisation → `legacy-modernization` | Si refactoring progressif d'un legacy |
| **dépendance** | Audit sécurité/versions → `tech-radar/tracking` | Si audit des libs, CVE |
| | Mise à jour opérationnelle → `lead-dev/technical-decisions` | Si bump une lib spécifique |
| **performance agent** | Méta-monitoring framework → `agent-performance-monitor` | Si performance des agents IA |
| | Performance humaine → `team-management/performance` | Si vélocité dev, burnout |
| **dashboard** | Dashboard framework agents → `agent-performance-monitor/optimization` | Si monitoring des agents |
| | Dashboard business → `marketing-analytics` | Si KPIs business, GA4 |
| | Dashboard charge équipe → `team-management/task-allocation` | Si charge des devs |

### Règle de Décision en 4 Étapes

```
1. SPÉCIFICITÉ : Le mot-clé le plus spécifique gagne
   "audit sécurité RGPD" → direction-technique/securite/conformite-rgpd
   "audit sécurité code" → lead-dev/code-review/security-review

2. NIVEAU D'ABSTRACTION : Identifier POURQUOI vs QUOI vs COMMENT
   "Quelle politique de tests ?" → direction-technique (POURQUOI)
   "Quelle pyramide de tests ?" → web-dev-process (QUOI)
   "Comment écrire ce test ?" → skill technique (COMMENT)

3. CONTEXTE TECHNOLOGIQUE : Si techno explicite, router vers skill techno
   "tests Next.js" → nextjs-expert/testing
   "tests React" → react-expert/testing
   "tests backend" → backend-developer/testing

4. EN DERNIER RECOURS : Demander clarification à l'utilisateur
   "Vous parlez de tests : politique, process, ou implémentation ?"
```

### Matrice RACI Simplifiée

| Concern | Décide (POURQUOI) | Définit Process (QUOI) | Coordonne | Exécute (COMMENT) |
|---------|-------------------|------------------------|-----------|-------------------|
| Stack technique | direction-technique | - | - | - |
| Architecture | direction-technique | web-dev-process | lead-dev | skills techniques |
| Code review | direction-technique | web-dev-process | lead-dev | - |
| Tests | direction-technique | web-dev-process | lead-dev | skills techniques |
| CI/CD | direction-technique | web-dev-process | lead-dev | devops |
| Performance | direction-technique | web-dev-process | lead-dev | skills techniques |
| Sécurité | direction-technique | web-dev-process | lead-dev | backend-developer |
| Deploy | direction-technique | lead-dev | lead-dev | devops |
| Monitoring | direction-technique | web-dev-process | lead-dev | devops |
| Infrastructure | direction-technique | web-dev-process | lead-dev | devops |
| Containers | direction-technique | devops | lead-dev | devops |
| Kubernetes | direction-technique | devops | lead-dev | devops |

## Priorité en Cas d'Ambiguïté

1. **Match exact** : Mot-clé présent dans la table
2. **Spécificité** : Mot-clé composé > mot-clé simple
3. **Niveau d'abstraction** : POURQUOI → QUOI → COMMENT
4. **Contexte conversation** : Skill déjà utilisé récemment
5. **Demander clarification** : Si vraiment ambigu

## Références

- [Composition des skills](./composition.md)
- [Points d'escalade](./escalation.md)

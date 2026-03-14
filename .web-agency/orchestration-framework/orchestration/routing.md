---
name: routing
description: Règles de routage vers les skills métiers
---

# Règles de Routage Web Agency

Ce document définit les règles de routage des requêtes vers les skills appropriés.

## Principe

> Une requête = Une **intention** + un **domaine** + une **urgence** → Un skill principal identifié

Les utilisateurs (surtout les clients) ne parlent **pas** en mots-clés techniques. Le routing doit comprendre l'intention derrière la requête, pas chercher un mot-clé exact.

## Étape 1 : Identifier l'Intention

Chaque requête exprime une intention fondamentale. C'est le **premier filtre** de routage.

| Intention | Signaux (langage client) | Signaux (langage technique) |
|-----------|-------------------------|----------------------------|
| **CRÉER** | "je veux un site", "il me faudrait", "on aimerait avoir", "nouveau projet" | "créer", "développer", "implémenter", "setup" |
| **CORRIGER** | "ça marche pas", "il y a un souci", "c'est cassé", "ça bug", "erreur" | "fix", "bug", "debug", "patch", "hotfix" |
| **OPTIMISER** | "c'est lent", "ça rame", "améliorer", "plus rapide", "plus beau" | "performance", "optimiser", "refactoring", "bundle size" |
| **ANALYSER** | "je comprends pas", "c'est quoi", "pourquoi", "est-ce que c'est bien" | "audit", "review", "analyse", "benchmark", "diagnostic" |
| **DOCUMENTER** | "comment ça marche", "pour l'équipe", "il faut expliquer" | "doc", "README", "onboarding", "guide", "specs" |
| **COMMUNIQUER** | "dire au client", "point projet", "présenter", "expliquer au client" | "CR", "reporting", "email", "démo" |
| **MAINTENIR** | "mettre à jour", "ça date", "montée de version", "sécuriser" | "update", "migration", "patch", "monitoring" |

## Étape 2 : Identifier le Domaine

| Domaine | Signaux (langage client) | Signaux (langage technique) |
|---------|-------------------------|----------------------------|
| **SITE / APP** | "le site", "l'appli", "la page", "le formulaire", "le bouton" | "frontend", "composant", "page", "route" |
| **DONNÉES** | "les données", "la base", "les infos", "les fiches" | "API", "base de données", "backend", "serveur" |
| **VISUEL** | "le design", "l'apparence", "le look", "les couleurs", "le logo" | "UI", "maquette", "design system", "branding" |
| **SERVEUR** | "l'hébergement", "le serveur", "c'est en ligne", "la mise en ligne" | "deploy", "CI/CD", "Docker", "infrastructure" |
| **MARKETING** | "les visiteurs", "Google", "la pub", "les réseaux", "les emails" | "SEO", "ads", "analytics", "campagne" |
| **BUSINESS** | "le client", "le devis", "le planning", "la facture", "le contrat" | "projet", "estimation", "brief", "livraison" |
| **SÉCURITÉ** | "c'est sûr ?", "les données sont protégées ?", "RGPD" | "sécurité", "OWASP", "auth", "RGPD" |
| **CONTENU** | "les textes", "les articles", "le blog", "les images" | "CMS", "contenu", "rédaction", "média" |

## Étape 3 : Identifier l'Urgence

| Urgence | Signaux | Action |
|---------|---------|--------|
| **BLOQUANT** | "rien ne marche", "en panne", "les clients ne peuvent pas", "urgent" | Escalade P1/P2 → intervention immédiate |
| **IMPORTANT** | "il faudrait vite", "avant la deadline", "prioritaire" | Prioriser dans le sprint en cours |
| **NORMAL** | "quand vous pouvez", "pour la prochaine version", "on aimerait" | Planifier normalement |
| **NICE-TO-HAVE** | "si possible", "ce serait bien", "un jour", "idéalement" | Backlog, prochaine roadmap |

## Étape 4 : Router vers le Skill

### Matrice Intention × Domaine → Skill

| | SITE/APP | DONNÉES | VISUEL | SERVEUR | MARKETING | BUSINESS | SÉCURITÉ | CONTENU |
|---|---------|---------|--------|---------|-----------|----------|----------|---------|
| **CRÉER** | `frontend-developer` | `backend-developer` | `ux-ui-design` | `devops` | `marketing-ops` | `project-management` | `security-expert` | `content-management` |
| **CORRIGER** | `react-expert` / `nextjs-expert` | `backend-developer` | `design-system` | `devops` | `marketing-analytics` | `project-management` | `backend-developer` | `content-management` |
| **OPTIMISER** | `nextjs-expert` | `backend-developer` | `ux-ui-design` | `devops` | `seo-expert` | `experience-client` | `security-expert` | `seo-expert` |
| **ANALYSER** | `direction-technique` | `direction-technique` | `direction-artistique` | `direction-technique` | `marketing-analytics` | `direction-commerciale` | `direction-technique` | `content-marketing` |
| **DOCUMENTER** | `web-dev-process` | `web-dev-process` | `design-system` | `devops` | `content-marketing` | `project-management` | `legal-compliance` | `content-marketing` |
| **COMMUNIQUER** | `experience-client` | `experience-client` | `experience-client` | `experience-client` | `customer-success` | `experience-client` | `experience-client` | `experience-client` |
| **MAINTENIR** | `lead-dev` | `lead-dev` | `design-system` | `devops` | `marketing-ops` | `support-client` | `security-expert` | `content-management` |

### Exemples de Requêtes en Langage Client → Routage

| Ce que dit le client | Intention | Domaine | Urgence | → Skill |
|---------------------|-----------|---------|---------|---------|
| "Je veux un site pour mon resto" | CRÉER | SITE | NORMAL | `project-management` → `direction-technique` (GRAND) |
| "Le site rame" | OPTIMISER | SITE | IMPORTANT | `nextjs-expert/optimization` ou `frontend-developer/performance` |
| "Je veux améliorer mon site" | OPTIMISER | SITE | NORMAL | `direction-technique` (ANALYSER d'abord) puis spécialiste |
| "Personne nous trouve sur Google" | OPTIMISER | MARKETING | IMPORTANT | `seo-expert` |
| "Le formulaire marche plus" | CORRIGER | SITE | BLOQUANT | `frontend-developer` ou `backend-developer` (MICRO) |
| "On veut changer le logo" | CRÉER | VISUEL | NORMAL | `ux-ui-design/branding` |
| "C'est quand la livraison ?" | COMMUNIQUER | BUSINESS | NORMAL | `experience-client/suivi` |
| "On a besoin de plus de clients" | CRÉER | MARKETING | NORMAL | `direction-marketing` → `paid-media` + `seo-expert` |
| "Le site est down !" | CORRIGER | SERVEUR | BLOQUANT | `devops` (P1 → escalade immédiate) |
| "Faut mettre à jour WordPress" | MAINTENIR | CONTENU | NORMAL | `wordpress-gutenberg-expert` |
| "Les mails de contact arrivent pas" | CORRIGER | DONNÉES | IMPORTANT | `backend-developer` ou `devops` |
| "On aimerait un espace client" | CRÉER | SITE | NORMAL | `project-management` → `direction-technique` (MOYEN/GRAND) |
| "C'est pas RGPD notre truc" | ANALYSER | SÉCURITÉ | IMPORTANT | `legal-compliance` |
| "Combien ça va coûter ?" | COMMUNIQUER | BUSINESS | NORMAL | `experience-client/cadrage` |
| "Montrez-nous où on en est" | COMMUNIQUER | BUSINESS | NORMAL | `experience-client/suivi` |

---

## Référence : Matrice de Routage par Mots-clés

> Cette matrice sert de **référence détaillée** quand l'intention est claire et qu'on doit router vers le bon sous-domaine d'un skill.

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

### ✅ Domaines Récemment Ajoutés (v3.2.0)

Ces domaines sont maintenant **disponibles** et couverts par les skills suivants :

| Mots-clés (anciennement non couverts) | Skill Disponible |
|---------------------------------------|------------------|
| audit, benchmark, stratégie digitale | `direction-technique/strategy` |
| maquette, logo, charte, branding, DA | `ux-ui-design/branding` |
| rédaction, copywriting, SEO éditorial | `content-marketing` |
| SEO, SEA, analytics, social media | `seo-expert` + `paid-media` + `marketing-analytics` |

> **Tous les domaines métiers sont désormais couverts.** L'agence web IA est complète.

## Arbre de Décision (Intention-First)

```
Requête utilisateur
│
├─ 1. QUELLE INTENTION ?
│  │
│  ├─ CRÉER (nouveau projet, feature, contenu)
│  │  ├─ Complexité GRAND ? → project-management → direction-technique → skills
│  │  ├─ Complexité MOYEN ? → direction-technique → skill spécialisé
│  │  ├─ Complexité PETIT ? → lead-dev → skill spécialisé
│  │  └─ Complexité MICRO ? → skill spécialisé directement
│  │
│  ├─ CORRIGER (bug, erreur, panne)
│  │  ├─ Urgence BLOQUANT ? → Escalade P1 + skill spécialisé immédiat
│  │  ├─ Urgence IMPORTANT ? → lead-dev → skill spécialisé
│  │  └─ Urgence NORMAL ? → skill spécialisé directement
│  │
│  ├─ OPTIMISER (performance, UX, SEO)
│  │  ├─ Impact large (multi-skills) ? → direction-technique (ANALYSER d'abord)
│  │  └─ Impact ciblé ? → skill spécialisé directement
│  │
│  ├─ ANALYSER (audit, review, benchmark)
│  │  └─ → Toujours STRATÉGIE d'abord (direction-technique, direction-marketing, etc.)
│  │
│  ├─ DOCUMENTER (specs, guides, onboarding)
│  │  ├─ Documentation stratégique ? → direction-technique
│  │  ├─ Documentation process ? → web-dev-process
│  │  └─ Documentation technique ? → skill spécialisé
│  │
│  ├─ COMMUNIQUER (client, équipe, reporting)
│  │  ├─ Communication client ? → experience-client
│  │  ├─ Communication projet ? → project-management
│  │  └─ Communication équipe ? → lead-dev
│  │
│  └─ MAINTENIR (update, migration, monitoring)
│     ├─ Migration majeure ? → direction-technique → lead-dev → skills
│     ├─ Mise à jour courante ? → lead-dev → skill spécialisé
│     └─ Monitoring/alerting ? → devops
│
├─ 2. QUEL DOMAINE ? (pour identifier le skill spécialisé)
│  │
│  ├─ SITE/APP → frontend-developer, react-expert, nextjs-expert
│  ├─ DONNÉES → backend-developer
│  ├─ VISUEL → ux-ui-design, design-system-foundations
│  ├─ SERVEUR → devops
│  ├─ MARKETING → seo-expert, paid-media, marketing-analytics,
│  │               content-marketing, customer-success, marketing-ops
│  ├─ BUSINESS → project-management, experience-client, commercial-crm
│  ├─ SÉCURITÉ → security-expert, legal-compliance
│  ├─ CONTENU → content-management, wordpress-gutenberg-expert
│  └─ Techno explicite ? → Router vers le skill techno (nextjs, wordpress, react...)
│
└─ 3. QUELLE URGENCE ? (pour ajuster le processus)
   │
   ├─ BLOQUANT → Escalade P1/P2, bypass du processus normal
   ├─ IMPORTANT → Prioriser, réduire le processus au minimum utile
   ├─ NORMAL → Processus standard selon la complexité
   └─ NICE-TO-HAVE → Backlog, planification future
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

### Règle de Décision en 4 Étapes

```
1. INTENTION : Que veut faire l'utilisateur ? (CRÉER, CORRIGER, OPTIMISER...)
   "Le site rame" → OPTIMISER (pas chercher "rame" dans les mots-clés)
   "On veut un blog" → CRÉER (pas chercher "blog")

2. DOMAINE + SPÉCIFICITÉ : Quel domaine, quel skill ?
   "audit sécurité RGPD" → ANALYSER + SÉCURITÉ → legal-compliance
   "audit sécurité code" → ANALYSER + DONNÉES → lead-dev/code-review

3. COMPLEXITÉ + URGENCE : Quel processus mobiliser ?
   MICRO + NORMAL → skill directement
   GRAND + BLOQUANT → escalade + processus complet accéléré

4. EN DERNIER RECOURS : Demander clarification à l'utilisateur
   "Vous souhaitez créer, corriger ou optimiser ?"
```

### Matrice RACI Simplifiée (Technique)

| Concern | Décide (STRATÉGIE) | Définit Process (PROCESSUS) | Coordonne | Exécute (IMPLÉMENTATION) |
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

> **RACI complète inter-métiers** (par phase de projet et par type de décision) : voir [`direction-operations/agents/gouvernance/comitologie.md`](../../skills/direction-operations/agents/gouvernance/comitologie.md)

## Seuils de Complexité

Avant de router, évaluer la complexité pour déterminer quels niveaux mobiliser :

```
Requête utilisateur
│
├─ Estimation < 2h ? (fix, typo, ajout simple)
│  └─ MICRO → Router directement vers le skill IMPLÉMENTATION
│     Pas d'orchestration, pas de validation STRATÉGIE
│
├─ Estimation < 2 jours ? (composant, page, endpoint)
│  └─ PETIT → PROCESSUS + IMPLÉMENTATION
│     lead-dev ou web-dev-process coordonne
│
├─ Estimation 2-15 jours ? (feature, refactoring)
│  └─ MOYEN → STRATÉGIE + PROCESSUS + IMPLÉMENTATION
│     direction-technique valide l'approche
│
└─ Estimation > 15 jours ? (projet, migration)
   └─ GRAND → ENTRÉE + STRATÉGIE + PROCESSUS + IMPLÉMENTATION
      Processus complet avec client-intake
```

> **Règle d'or** : Le processus doit être proportionnel à la tâche. Mobiliser direction-technique pour un fix CSS est aussi nuisible que de lancer un projet e-commerce sans cadrage.

## Priorité en Cas d'Ambiguïté

1. **Intention** : Identifier CRÉER / CORRIGER / OPTIMISER / ANALYSER / DOCUMENTER / COMMUNIQUER / MAINTENIR
2. **Domaine** : Identifier SITE / DONNÉES / VISUEL / SERVEUR / MARKETING / BUSINESS / SÉCURITÉ / CONTENU
3. **Complexité** : Évaluer MICRO / PETIT / MOYEN / GRAND pour calibrer le processus
4. **Spécificité techno** : Si une technologie est nommée, router vers le skill spécialisé
5. **Contexte conversation** : Skill déjà utilisé récemment
6. **Demander clarification** : Si vraiment ambigu

## Références

- [Composition des skills](./composition.md)
- [Points d'escalade](./escalation.md)

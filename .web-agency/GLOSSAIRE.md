# Glossaire Officiel — Web Agency Framework

> **Source de vérité** pour la terminologie du framework.
> Quand un terme a plusieurs synonymes, le **terme canonique** est celui à utiliser dans tout nouveau document.

## Convention Linguistique

Ce framework est **bilingue par design** (voir [ADR-007](./learnings/decisions/ADR-007-naming-conventions.md)).

| Contexte | Langue | Pourquoi |
|----------|--------|----------|
| Contenu des agents, descriptions, documentation | **Français** | Accessibilité pour toutes les équipes |
| Noms de skills techniques | **Anglais** | Convention de l'industrie (`frontend-developer`, `devops`) |
| Noms de skills métier | **Français** | Clarté métier (`direction-commerciale`, `support-client`) |
| Noms d'agents et domaines | **Français** | Compréhension universelle (`vision-projet`, `cadrage`) |
| Clés YAML (frontmatter) | **Anglais** | Standard technique (`name:`, `agents:`, `produces_for:`) |
| Termes techniques universels | **Anglais** | Pas de traduction forcée (`API`, `CI/CD`, `SEO`, `RGPD`) |
| IDs de livrables | **Anglais** | Interopérabilité (`technical-specification`, `macro-estimation`) |
| Catégories schema | **Anglais** | Clés techniques (`process`, `code`, `design`, `strategy`) |

---

## Glossaire des Termes Canoniques

### Phases du Projet

| Terme canonique | ID technique | Synonymes acceptés | Ne PAS utiliser |
|----------------|-------------|-------------------|-----------------|
| **Prise de brief** | `1-intake` | Réception, accueil, qualification | "intake" seul sans contexte |
| **Stratégie** | `2-strategy` | Estimation, cadrage, avant-projet | "strategy" seul |
| **Conception** | `3-conception` | Spécification, design, architecture | "design phase" |
| **Réalisation** | `4-realisation` | Développement, implémentation, production | "development phase" |
| **Déploiement** | `5-deploiement` | Mise en ligne, livraison, release | "deployment phase" |
| **Maintenance** | `6-maintenance` | Post-lancement, suivi, exploitation | "maintenance phase" |

> **Note** : Les IDs techniques (`1-intake`, `2-strategy`...) sont utilisés dans le frontmatter YAML. Les termes canoniques français sont utilisés dans les descriptions et la communication.

### Niveaux Hiérarchiques

| Terme canonique | Ancien terme | Rôle | Exemples de skills |
|----------------|-------------|------|--------------------|
| **ENTRÉE** | Niveau 0 | Accueil et routage | `client-intake`, `web-agency`, `task-orchestrator` |
| **STRATÉGIE** | Niveau 1 | Décisions, pas de code | `direction-technique`, `direction-commerciale` |
| **PROCESSUS** | Niveau 2 | Coordination, méthodologie | `project-management`, `lead-dev`, `experience-client` |
| **IMPLÉMENTATION** | Niveau 3 | Code réel, livrables concrets | `frontend-developer`, `devops`, `seo-expert` |
| **TRANSVERSE** | — | Méthodologies applicables partout | `ddd` |

### Estimation et Chiffrage

| Terme canonique | ID livrable | Synonymes courants | Contexte |
|----------------|------------|-------------------|----------|
| **Estimation macro** | `macro-estimation` | Chiffrage initial, estimation de cadrage, budget prévisionnel | Phase stratégie — ordre de grandeur |
| **Estimation détaillée** | `detailed-estimation` | Chiffrage détaillé, décomposition budgétaire | Phase conception — par tâche |
| **Devis** | — | Proposition commerciale, offre de prix | Document client final |

> **Pour les profils commerciaux** : "chiffrage" = estimation macro + estimation détaillée.
> **Pour les chefs de projet** : "macro-estimation" = première passe, "estimation détaillée" = après spécifications.

### Spécifications et Brief

| Terme canonique | ID livrable | Synonymes courants | Contexte |
|----------------|------------|-------------------|----------|
| **Brief client** | `client-request` | Demande client, expression de besoin | Ce que le client dit |
| **Qualification du projet** | `project-qualification` | Analyse du besoin, cadrage initial | Ce qu'on comprend du brief |
| **Cahier des charges** | `requirements-list` | Spécifications fonctionnelles, requirements, specs | Document formalisé |
| **Spécification technique** | `technical-specification` | Specs techniques, architecture détaillée | Traduction technique du besoin |

> **Pour le client** : "brief" ou "cahier des charges".
> **Pour le développeur** : "requirements" ou "specs techniques".
> **Dans le code** : utiliser les IDs livrables (`requirements-list`, `technical-specification`).

### Design et Maquettes

| Terme canonique | Synonymes courants | Contexte |
|----------------|-------------------|----------|
| **Wireframe** | Esquisse, squelette, fil de fer | Maquette basse fidélité (structure) |
| **Maquette** | Mockup, maquette HD, design visuel | Maquette haute fidélité (visuel final) |
| **Prototype** | Proto, maquette interactive | Maquette cliquable/navigable |
| **Design system** | Système de design, UI kit | Bibliothèque de composants réutilisables |

> **Convention** : "wireframe" pour la structure, "maquette" pour le visuel, "prototype" pour l'interactif.
> Éviter "mockup" (anglicisme inutile quand "maquette" existe).

### Recette et Livraison

| Terme canonique | ID livrable | Synonymes courants | Contexte |
|----------------|------------|-------------------|----------|
| **Recette** | `acceptance-report` | Validation client, test d'acceptation, UAT | Phase de validation finale |
| **PV de recette** | `pv-recette` | Procès-verbal, rapport de recette | Document signé de validation |
| **Mise en ligne** | — | Deploy, déploiement, go-live, release | Passage en production |

### Architecture du Framework

| Terme canonique | Synonymes courants | Contexte |
|----------------|-------------------|----------|
| **Skill** | Compétence, module, brique | Unité fonctionnelle du framework (dossier sous `skills/`) |
| **Agent** | Assistant, worker | Fichier `.md` avec une responsabilité unique dans un skill |
| **Domaine** | Sous-domaine, catégorie | Sous-dossier d'`agents/` dans un skill |
| **Orchestrateur** | Coordinateur, routeur | Agent qui route vers les autres agents d'un skill |
| **Validator** | Validateur | Agent transversal qui vérifie les livrables |
| **Livrable** | Deliverable, artefact | Document produit par un ou plusieurs agents |

> **Dans le code et les IDs** : utiliser les termes anglais (`skill`, `agent`, `validator`).
> **Dans les descriptions** : utiliser les traductions françaises.

### Processus d'Orchestration

| Terme canonique | Synonymes courants | Audience cible |
|----------------|-------------------|----------------|
| **Routage** | Routing, aiguillage, orientation | Pour tous — comment une demande trouve le bon skill |
| **Escalade** | Escalation, remontée | Pour tous — quand un agent ne peut pas traiter seul |
| **Composition** | Chaîne, pipeline, workflow | Pour tech — comment les skills s'enchaînent |
| **Arbitrage** | Résolution de conflit, médiation | Pour management — quand deux skills se contredisent |

### Complexité

| Terme canonique | Seuil | Exemples |
|----------------|-------|----------|
| **MICRO** | < 2 heures | Fix CSS, correction typo, ajout simple |
| **PETIT** | < 2 jours | Composant, page, endpoint |
| **MOYEN** | 2–15 jours | Feature complète, refactoring |
| **GRAND** | > 15 jours | Projet complet, migration majeure |

### Urgence

| Terme canonique | Synonymes courants | Action |
|----------------|-------------------|--------|
| **BLOQUANT** | Urgent, critique, P1 | Intervention immédiate |
| **IMPORTANT** | Prioritaire, P2 | Sprint en cours |
| **NORMAL** | Standard, courant | Planification normale |
| **SOUHAITABLE** | Nice-to-have, bonus | Backlog |

---

## Termes Techniques Non Traduits

Ces termes restent **toujours en anglais** — ne jamais les traduire :

| Terme | Raison |
|-------|--------|
| API, REST, GraphQL | Standards universels |
| CI/CD, DevOps, Docker | Termes de l'industrie |
| SEO, SEA, SEM | Acronymes marketing universels |
| RGPD / GDPR | Acronyme légal (FR accepté) |
| CRM, ERP, SaaS | Acronymes business universels |
| KPI, OKR, SLA, RACI | Acronymes management universels |
| DDD, ADR, TDD, BDD | Méthodologies techniques |
| Sprint, backlog, standup | Vocabulaire agile universel |
| Wireframe | Pas d'équivalent français précis (≠ maquette) |
| Branding | Identité de marque (accepté en FR) |
| Pricing | Modèle tarifaire (accepté en FR) |
| Workflow | Flux de travail (accepté en FR) |

---

## Guide par Profil

### Je suis Chef de Projet / Commercial

| Ce que je dis | Ce que ça correspond à dans le framework |
|--------------|----------------------------------------|
| "Combien ça coûte ?" | `macro-estimation` → skill `direction-technique/estimation` |
| "Le cahier des charges" | `requirements-list` → skill `project-management/avant-projet` |
| "La maquette" | Wireframe ou maquette HD → skill `ux-ui-design` |
| "La recette" | `acceptance-report` → skill `project-management/livraison` |
| "La mise en ligne" | Deploy → skill `devops/deployment` |
| "Le point client" | Rapport d'avancement → skill `experience-client/suivi` |

### Je suis Designer

| Ce que je dis | Ce que ça correspond à dans le framework |
|--------------|----------------------------------------|
| "Le wireframe" | Maquette basse fidélité → `ux-ui-design/wireframes` |
| "La maquette HD" | Design visuel → `ux-ui-design/design-visuel` |
| "La DA" | Direction artistique → `direction-artistique` ou `ux-ui-design/branding` |
| "Le design system" | Tokens + composants → `design-system-foundations` |
| "Le prototype" | Maquette interactive → `ux-ui-design/tests-utilisateurs` |

### Je suis Développeur

| Ce que je dis | Ce que ça correspond à dans le framework |
|--------------|----------------------------------------|
| "Les specs" | `technical-specification` → `direction-technique/specification` |
| "La PR / code review" | → `lead-dev/code-review` |
| "Le deploy" | → `devops/deployment` ou `lead-dev/delivery` |
| "Les tests" | → `testing-process` (stratégie) ou skill technique (implémentation) |
| "Le refacto" | → `lead-dev/technical-decisions` |
| "La dette technique" | → `direction-technique/qualite` |

---

## Références

- [ADR-007 : Conventions de Nommage](./learnings/decisions/ADR-007-naming-conventions.md)
- [SCHEMA.md : Schéma des livrables](./deliverables/SCHEMA.md)
- [Routing : Règles de routage](./orchestration-framework/orchestration/routing.md)

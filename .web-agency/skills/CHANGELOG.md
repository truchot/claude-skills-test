# Changelog - Web Agency IA

Historique consolidé de tous les changements de l'agence web IA full-automatisée.

Le format suit [Keep a Changelog](https://keepachangelog.com/fr/1.0.0/).

## [4.0.0] - 2025-01-11

### BREAKING CHANGES

- **Architecture agnostique** : Migration de `.claude/` vers `.web-agency/`
  - `.claude/skills/` → `.web-agency/skills/`
  - `.claude/learnings/` → `.web-agency/learnings/`
  - Toutes les références internes mises à jour (54 fichiers)

### Ajouté

- **Nouveau dossier `.web-agency/`** : Framework agnostique indépendant de tout système d'IA
  - Structure : `skills/` (22 skills, 713 agents) + `learnings/` (learning loop)
  - README documentant l'architecture et l'intégration multi-IA

- **Nouveau dossier `.claude/commands/`** : Interface Claude minimaliste
  - 21 commandes de rôles référençant `.web-agency/` sans duplication
  - Commandes : web-agency, direction-technique, lead-dev, frontend-developer, backend-developer, etc.

- **CI validation** : Nouveau workflow `validate-paths.yml`
  - Empêche les références aux anciens chemins `.claude/skills` et `.claude/learnings`
  - Valide la structure `.web-agency/`
  - Exclut CHANGELOG.md (contient documentation de migration)

### Corrigé

- **README.md** : Synchronisé avec l'architecture v4.0.0
  - Remplacé les skills obsolètes (technical, strategy, design, content) par les 22 skills actuels
  - Organisé par niveau hiérarchique (0: Entrée, 1: Orchestration, 2: Stratégie, 3: Opérations, 4: Implémentation/Support)
  - Mis à jour le diagramme d'architecture et le workflow type

- **VERSION** : Corrigé les statistiques
  - TOTAL_SKILLS: 20 → 22
  - TOTAL_AGENTS: 668 → 713

### Migration

Pour migrer depuis v3.x :
1. Remplacer `.claude/skills/` par `.web-agency/skills/` dans vos références
2. Remplacer `.claude/learnings/` par `.web-agency/learnings/`
3. Les commandes Claude sont maintenant dans `.claude/commands/`

---

## [3.2.0] - 2025-01-11

### Ajouté

- **Nouveau skill** : `content-management` (17 agents) - Gestion éditoriale complète
  - Domaine `editorial` (4 agents) : Calendrier éditorial, workflow, publication
  - Domaine `redaction` (5 agents) : Articles, pages, copywriting, SEO
  - Domaine `assets` (4 agents) : Médias, images, vidéos
  - Domaine `localization` (4 agents) : Traduction, i18n, adaptation culturelle

- **4 nouveaux workflows automatisés** pour content-management
  - `brief-to-article` : Du brief éditorial à l'article publié (< 8h, 85% automatisé)
  - `content-to-multilang` : Du contenu source à la publication multilingue (< 48h, 80% automatisé)
  - `media-to-cdn` : De l'upload média à la distribution CDN optimisée (< 5 min, 98% automatisé)
  - `request-to-brief` : De la demande client/analyse au brief éditorial structuré (< 4h, 90% automatisé)

- **Renforcement skills existants** (+12 agents dans 3 skills)
  - `ux-ui-design` v2.0.0 (+5 agents) : Nouveau domaine `branding/`
    - direction-artistique, brand-identity, motion-design, assets-creator, orchestrator
    - Total : 27 agents (vs 22)
  - `marketing` v1.4.0 (+2 agents) : Renforcement domaine `content/`
    - ligne-editoriale, arborescence
    - Total : 117 agents (vs 115)
  - `direction-technique` v3.1.0 (+5 agents) : Nouveau domaine `strategy/`
    - benchmark-concurrentiel, strategie-digitale, recommandations, kpis-business, orchestrator
    - Total : 59 agents (vs 54)

- **Workflows avec livrables et critères d'acceptation**
  - Matrice de positionnement client (Triangle Budget/Qualité/Délai)
  - Livrables par workflow avec niveaux (Minimal/Standard/Premium)
  - Critères d'acceptation codifiés (CA-XXX-000)
  - Templates workflows mis à jour (v1.1.0)

- **539 agents enrichis avec références workflows**
  - Chaque agent référence désormais un template workflow (wf-creation, wf-refonte, wf-evolution, wf-audit, wf-support)
  - Phases, durées et récurrences documentées

### Modifié

- **Total skills** : 20 (vs 19 en v3.1.0, +1 skill)
- **Total agents** : 707 (vs 651 en v3.1.0, +56 agents)
- **Total workflows** : 9 (vs 5 en v3.1.0, +4 workflows)
- **Couverture métiers** : Ajout branding, DA, motion design, ligne éditoriale, stratégie digitale, content management
- **Documentation** : Comptages agents mis à jour dans SKILL.md

### Notes

- Skill `content-management` créé pour combler le gap laissé par la suppression de l'ancien skill `content` (v2.9.0)
- Fonctionnalités distinctes de `marketing` : focus sur workflow éditorial et gestion d'assets
- Workflows couvrent le cycle complet : demande → brief → création → publication → distribution

## [3.1.0] - 2025-01-09

### Ajouté

- **5 nouveaux skills fonctions support** (88 agents)
  - `ux-ui-design` (22 agents) : UX Research, Wireframes, Design visuel, Prototypage, Tests utilisateurs
  - `legal-compliance` (16 agents) : RGPD, Documents légaux, Audit conformité, Cookies
  - `support-client` (16 agents) : Ticketing, Knowledge base, Escalade, Satisfaction
  - `commercial-crm` (17 agents) : Pipeline, Prospection, Négociation, Rétention
  - `finance-analytics` (17 agents) : Facturation, KPIs, Reporting, Prévisions

### Modifié

- **Architecture** : Ajout niveau "Fonctions Support" pour skills transverses
- **Total agents** : 651 (vs 563 en v3.0.1, +88 agents)

## [3.0.1] - 2025-01-09

### Ajouté

- **3 workflows automatisés end-to-end**
  - `email-to-devis.md` : Email client → Devis en < 24h (94% automatisé)
  - `bug-to-hotfix.md` : Bug report → Hotfix déployé (SLA P1: 4h)
  - `feature-to-sprint.md` : Feature request → Sprint planning (3-5 jours)

### Modifié

- **Documentation** : Restructuration section workflows (automatisés vs classiques)

## [3.0.0] - 2025-01-09

### Ajouté

- **Transformation en Agence Web IA Full-Automatisée**
- **Nouveau skill** : `client-intake` (23 agents) - Point d'entrée automatisé
  - Domaines : reception, qualification, extraction, response, routing
  - Multicanal : email, formulaires, chat, webhooks
  - NLP : classification d'intent, détection d'urgence, estimation budget
- **Nouveau skill** : `task-orchestrator` (16 agents) - Moteur d'orchestration
  - Domaines : queue, state-machine, execution, tracking
  - Queue management : priorités dynamiques, capacité, SLA
  - State machine : lifecycle complet des tâches

### Modifié

- **Architecture** : Nouveau modèle 5 niveaux
  - 0: Entrée → 1: Orchestration → 2: Stratégie → 3: Opérations → 4: Implémentation
- **Total agents** : 563 (vs 409 en v2.9.0, +154 agents)
- **Intégration** : Ajout du skill `marketing` (115 agents) dans le routage

## [2.9.0] - 2025-01-08

### Supprimé

- Skills vides non implémentés (`strategy/`, `design/`, `content/`, `marketing/`)
- Doublon `backend-developer/agents/devops/`

### Ajouté

- ADR-007 (Pattern d'Extraction de Skills)
- Graphe de dépendances (`orchestration/dependency-graph.md`)

## [2.8.0] - 2025-01-08

### Ajouté

- **Nouveau skill** : `testing-process` (25 agents)
  - Consolidation des agents testing dispersés dans 6 skills
  - Domaines : strategy, types, quality, performance, security, accessibility

## [2.7.0] - 2025-01-07

### Ajouté

- **Nouveau skill** : `devops` (30 agents)
  - CI/CD, containers, Kubernetes, IaC, monitoring, deployment
  - Extraction depuis `backend-developer/devops`

## [2.6.0] - 2025-01-07

### Modifié

- **Clarification hiérarchie** : lead-dev et web-dev-process au même niveau
- ADR-006 : Documentation de la décision

## [2.5.0] - 2025-01-06

### Ajouté

- Matrice de désambiguïsation dans `orchestration/routing.md`
- Règles de priorité RACI pour mots-clés ambigus

## [2.4.0] - 2025-01-06

### Ajouté

- **Nouveau skill** : `nextjs-expert` (35 agents)
  - Next.js 14+ avec App Router
  - Domaines : app-router, server-components, data, rendering, optimization, deployment, testing

## [2.3.0] - 2025-01-05

### Ajouté

- **Nouveau skill** : `lead-dev` (27 agents)
  - Coordination technique opérationnelle
  - Domaines : code-review, team-coordination, technical-decisions, mentoring, delivery

## [2.2.0] - 2025-01-04

### Modifié

- **Breaking** : Intègre `direction-technique` v3.0.0
  - Agents POURQUOI-level sans code d'implémentation

## [2.1.0] - 2025-01-03

### Modifié

- **Refactoring SRP** : Séparation routage/composition/escalade
- Création dossier `orchestration/`
- Création dossier `workflows/`

## [2.0.0] - 2025-01-02

### Modifié

- **Breaking** : Refactoring en méta-orchestrateur
- Skills métiers extraits en skills autonomes

## [1.0.0] - 2025-12-21

### Ajouté

- Création initiale de l'agence web IA
- Domaine 1 : Gestion de Projet & Relation Client (24 agents)

# Cycle de Vie Projet → Livrables

> **Principe** : Chaque projet capitalise sur les livrables dans l'ordre chronologique naturel.

## Vue d'Ensemble du Cycle

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                        CYCLE DE VIE D'UN PROJET                              │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  PHASE 1          PHASE 2           PHASE 3          PHASE 4                │
│  INTAKE           STRATÉGIE         CONCEPTION       RÉALISATION            │
│  ───────          ─────────         ──────────       ───────────            │
│                                                                              │
│  ┌──────┐        ┌──────────┐      ┌──────────┐     ┌──────────┐           │
│  │Demande│───────►│Analyse   │─────►│Design    │────►│Dev       │           │
│  │Client │        │Technique │      │Solution  │     │Test      │           │
│  └──────┘        └──────────┘      └──────────┘     └──────────┘           │
│      │                │                  │               │                  │
│      ▼                ▼                  ▼               ▼                  │
│  📄 Brief         📄 ADR            📄 Specs        📄 Code              │
│  📄 Qualif        📄 Stack          📄 Maquettes    📄 Tests             │
│                   📄 Estimation     📄 Data Model   📄 Docs              │
│                                                                              │
│                                                                              │
│  PHASE 5          PHASE 6           PHASE 7          PHASE 8               │
│  DÉPLOIEMENT      LANCEMENT         MAINTENANCE      BILAN                 │
│  ──────────       ─────────         ───────────      ─────                 │
│                                                                              │
│  ┌──────────┐    ┌──────────┐      ┌──────────┐    ┌──────────┐           │
│  │CI/CD     │───►│Marketing │─────►│Support   │───►│Rétro     │           │
│  │Infra     │    │Go-live   │      │Évolution │    │REX       │           │
│  └──────────┘    └──────────┘      └──────────┘    └──────────┘           │
│      │                │                  │               │                  │
│      ▼                ▼                  ▼               ▼                  │
│  📄 Pipeline      📄 Stratégie     📄 Tickets      📄 Post-mortem        │
│  📄 Runbook       📄 Analytics     📄 Changelog    📄 Lessons learned    │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Phase 1 : INTAKE (Réception & Qualification)

**Skills impliqués** : `client-intake`

**Durée typique** : 1-3 jours

### Livrables dans l'ordre

| # | Livrable | Agent producteur | Dépend de | Statut |
|---|----------|------------------|-----------|--------|
| 1.1 | `client-request` | client-intake/reception/email-parser | - | 📝 À créer |
| 1.2 | `requirements-list` | client-intake/extraction/requirements-extractor | 1.1 | 📝 À créer |
| 1.3 | `stakeholder-map` | client-intake/extraction/stakeholder-identifier | 1.1 | 📝 À créer |
| 1.4 | `feasibility-assessment` | client-intake/qualification/feasibility-checker | 1.2 | 📝 À créer |
| 1.5 | `project-qualification` | client-intake/qualification/intent-classifier | 1.2, 1.4 | 📝 À créer |
| 1.6 | `budget-estimation-initial` | client-intake/qualification/budget-estimator | 1.2, 1.5 | 📝 À créer |

**Output Phase 1** → Input Phase 2 : `requirements-list`, `project-qualification`

---

## Phase 2 : STRATÉGIE (Direction Technique)

**Skills impliqués** : `direction-technique`, `direction-marketing`, `direction-artistique`

**Durée typique** : 3-10 jours

### Livrables dans l'ordre

| # | Livrable | Agent producteur | Dépend de | Statut |
|---|----------|------------------|-----------|--------|
| 2.1 | `technical-audit` | direction-technique/avant-projet/audit-existant | 1.2 | 📝 À créer |
| 2.2 | `feasibility-study` | direction-technique/avant-projet/etude-faisabilite | 2.1 | 📝 À créer |
| 2.3 | `stack-recommendation` | direction-technique/avant-projet/selection-stack | 2.1, 2.2 | 📝 À créer |
| 2.4 | `adr` | direction-technique/architecture/adr | 2.3 | ✅ Créé |
| 2.5 | `architecture-diagram` | direction-technique/architecture/architecture-applicative | 2.3, 2.4 | 📝 À créer |
| 2.6 | `macro-estimation` | direction-technique/estimation/estimation-macro | 2.5 | 📝 À créer |
| 2.7 | `risk-matrix` | direction-technique/estimation/analyse-risques | 2.5, 2.6 | 📝 À créer |
| 2.8 | `detailed-estimation` | direction-technique/estimation/estimation-detaillee | 2.6, 2.7 | 📝 À créer |

**Output Phase 2** → Input Phase 3 : `stack-recommendation`, `architecture-diagram`, `detailed-estimation`

---

## Phase 3 : CONCEPTION (Specs & Design)

**Skills impliqués** : `project-management`, `direction-technique/specification`, `ux-ui-design`, `design-system-foundations`

**Durée typique** : 5-15 jours

### Livrables dans l'ordre

| # | Livrable | Agent producteur | Dépend de | Statut |
|---|----------|------------------|-----------|--------|
| 3.1 | `project-brief` | project-management/avant-projet/brief | 1.2, 2.8 | 📝 À créer |
| 3.2 | `technical-specification` | direction-technique/specification/specification-technique | 2.5, 3.1 | 📝 À créer |
| 3.3 | `data-model` | direction-technique/specification/modelisation-donnees | 3.2 | 📝 À créer |
| 3.4 | `api-specification` | direction-technique/specification/specification-api | 3.3 | ✅ Créé |
| 3.5 | `wireframes` | ux-ui-design/research/wireframes | 3.1 | 📝 À créer |
| 3.6 | `design-tokens` | design-system-foundations/foundations/* | 3.5 | 📝 À créer |
| 3.7 | `ui-mockups` | ux-ui-design/design/mockups | 3.5, 3.6 | 📝 À créer |
| 3.8 | `component-specs` | design-system-foundations/atoms,molecules/* | 3.6, 3.7 | 📝 À créer |

**Output Phase 3** → Input Phase 4 : `technical-specification`, `data-model`, `api-specification`, `component-specs`

---

## Phase 4 : RÉALISATION (Dev & Test)

**Skills impliqués** : `lead-dev`, `web-dev-process`, `frontend-developer`, `backend-developer`, `testing-process`

**Durée typique** : 15-60 jours

### Livrables dans l'ordre

| # | Livrable | Agent producteur | Dépend de | Statut |
|---|----------|------------------|-----------|--------|
| 4.1 | `environment-setup` | web-dev-process/setup/* | 2.3 | 📝 À créer |
| 4.2 | `technical-documentation` | direction-technique/communication/documentation-technique | 3.2, 4.1 | ✅ Créé |
| 4.3 | `database-schema` | backend-developer/database/modeling | 3.3 | 📝 À créer |
| 4.4 | `api-implementation` | backend-developer/api/* | 3.4, 4.3 | 📝 À créer |
| 4.5 | `frontend-components` | frontend-developer/*, react-expert/* | 3.8, 4.4 | 📝 À créer |
| 4.6 | `test-suite` | testing-process/*, backend/testing/* | 4.4, 4.5 | 📝 À créer |
| 4.7 | `code-review-report` | lead-dev/code-review/* | 4.4, 4.5 | 📝 À créer |
| 4.8 | `test-coverage-report` | testing-process/reporting/* | 4.6 | 📝 À créer |

**Output Phase 4** → Input Phase 5 : Code testé, `test-coverage-report`

---

## Phase 5 : DÉPLOIEMENT (CI/CD & Infra)

**Skills impliqués** : `devops`, `web-dev-process/deploy`

**Durée typique** : 3-10 jours

### Livrables dans l'ordre

| # | Livrable | Agent producteur | Dépend de | Statut |
|---|----------|------------------|-----------|--------|
| 5.1 | `ci-pipeline` | devops/cicd/pipelines | 4.1 | 📝 À créer |
| 5.2 | `docker-config` | devops/containers/docker | 4.1, 5.1 | 📝 À créer |
| 5.3 | `infrastructure-config` | devops/infrastructure/* | 2.5 | 📝 À créer |
| 5.4 | `deployment-runbook` | devops/deployment/strategies | 5.1, 5.3 | 📝 À créer |
| 5.5 | `monitoring-setup` | devops/monitoring/* | 5.3 | 📝 À créer |
| 5.6 | `rollback-procedure` | devops/deployment/rollback | 5.4 | 📝 À créer |

**Output Phase 5** → Input Phase 6 : Application déployée, `monitoring-setup`

---

## Phase 6 : LANCEMENT (Marketing & Go-live)

**Skills impliqués** : `marketing`, `content-management`

**Durée typique** : 5-15 jours

### Livrables dans l'ordre

| # | Livrable | Agent producteur | Dépend de | Statut |
|---|----------|------------------|-----------|--------|
| 6.1 | `launch-checklist` | project-management/livraison/* | 5.4 | 📝 À créer |
| 6.2 | `seo-audit` | seo-expert/* | Application live | 📝 À créer |
| 6.3 | `analytics-setup` | marketing-analytics/* | 5.5 | 📝 À créer |
| 6.4 | `marketing-strategy` | direction-marketing/* | 3.1 | 📝 À créer |
| 6.5 | `content-calendar` | content-management/editorial/* | 6.4 | 📝 À créer |
| 6.6 | `launch-report` | project-management/livraison/* | 6.1 | 📝 À créer |

**Output Phase 6** → Input Phase 7 : Application en production, métriques

---

## Phase 7 : MAINTENANCE (Support & Évolution)

**Skills impliqués** : `support-client`, `direction-technique/support`

**Durée typique** : Ongoing

### Livrables dans l'ordre

| # | Livrable | Agent producteur | Dépend de | Statut |
|---|----------|------------------|-----------|--------|
| 7.1 | `incident-runbook` | direction-technique/support/gestion-incidents | 5.5 | 📝 À créer |
| 7.2 | `support-ticket` | support-client/* | Tickets entrants | 📝 À créer |
| 7.3 | `post-mortem` | direction-technique/support/post-mortem | Incidents | 📝 À créer |
| 7.4 | `changelog` | web-dev-process/maintenance/* | Releases | 📝 À créer |
| 7.5 | `tech-debt-report` | direction-technique/qualite/dette-technique | 4.7 | 📝 À créer |

---

## Phase 8 : BILAN (Rétrospective & Capitalisation)

**Skills impliqués** : `direction-technique/support`, `project-management`, `direction-operations`

**Durée typique** : 3-5 jours

### Livrables dans l'ordre

| # | Livrable | Agent producteur | Dépend de | Statut |
|---|----------|------------------|-----------|--------|
| 8.1 | `post-mortem` | direction-technique/support/post-mortem | 7.3 | ✅ Créé |
| 8.2 | `project-metrics-report` | project-management/livraison/bilan-projet | 6.6, 7.5 | 📝 À créer |
| 8.3 | `client-satisfaction-survey` | experience-client/suivi/satisfaction | 7.2 | 📝 À créer |
| 8.4 | `lessons-learned` | direction-operations/capitalisation/rex | 8.1, 8.2 | 📝 À créer |
| 8.5 | `process-improvement-plan` | direction-operations/capitalisation/amelioration | 8.4 | 📝 À créer |

**Output Phase 8** → Input prochain projet : `lessons-learned`, `process-improvement-plan`

> **Boucle vertueuse** : Les enseignements de la Phase 8 alimentent directement la Phase 1 du projet suivant, améliorant progressivement les estimations, les processus et la satisfaction client.

---

## Ordre de Création Recommandé

> Créer les livrables dans cet ordre permet à chaque projet de capitaliser progressivement.

### Sprint 1 : Fondations (Projet 1)
```
1.1 client-request
1.2 requirements-list
1.5 project-qualification
2.4 adr ✅
3.1 project-brief
```

### Sprint 2 : Stratégie (Projet 2)
```
2.1 technical-audit
2.3 stack-recommendation
2.6 macro-estimation
2.7 risk-matrix
```

### Sprint 3 : Conception (Projet 3)
```
3.2 technical-specification
3.3 data-model
3.4 api-specification ✅
3.5 wireframes
3.6 design-tokens
```

### Sprint 4 : Réalisation (Projet 4)
```
4.1 environment-setup
4.2 technical-documentation ✅
4.3 database-schema
4.6 test-suite
4.7 code-review-report
```

### Sprint 5 : Déploiement (Projet 5)
```
5.1 ci-pipeline
5.4 deployment-runbook
5.5 monitoring-setup
5.6 rollback-procedure
```

### Sprint 6 : Lancement & Maintenance (Projet 6+)
```
6.1 launch-checklist
6.3 analytics-setup
7.1 incident-runbook
7.3 post-mortem
```

---

## Matrice de Capitalisation

| Projet # | Livrables capitalisés | Total disponible |
|----------|----------------------|------------------|
| 1 | 5 nouveaux | 5 |
| 2 | 4 nouveaux | 9 |
| 3 | 5 nouveaux | 14 |
| 4 | 5 nouveaux | 19 |
| 5 | 4 nouveaux | 23 |
| 6+ | 4 nouveaux | 27 |

**Après 6 projets** : 27 livrables standardisés couvrant le cycle complet.

---

## Exemple : Premier Projet (E-commerce WordPress)

```
📁 Projet: site-ecommerce-client-x/

Phase 1 - Intake
├── 📄 client-request.md           → Créer livrable standardisé
├── 📄 requirements-list.md        → Créer livrable standardisé
└── 📄 project-qualification.md    → Créer livrable standardisé

Phase 2 - Stratégie
├── 📄 adr/0001-wordpress-woocommerce.md  → Utiliser livrable existant ✅
└── 📄 project-brief.md            → Créer livrable standardisé

Phase 3+ - À capitaliser aux projets suivants...
```

Chaque projet enrichit la bibliothèque de livrables standardisés.

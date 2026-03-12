---
name: tech-radar
description: |-
  Veille technologique structurée — évaluation, suivi, adoption et migration
  des technologies utilisées par l'agence web. Utilise ce skill quand:
  (1) évaluer une nouvelle technologie ou framework, (2) audit des dépendances
  et vulnérabilités, (3) suivi des dépréciations et fin de support,
  (4) planification de migration technologique, (5) création d'un ADR,
  (6) optimisation ou simplification de la stack, (7) analyse coût/bénéfice
  d'un changement technique.
metadata:
  version: 1.0.0
  status: active
---

# Tech Radar Skill

## Quick Start

```bash
# Évaluer une nouvelle technologie
/tech radar évaluer Bun comme alternative à Node.js

# Vérifier les dépendances à risque
/tech radar audit dépendances — quelles libs sont obsolètes ?

# Générer un ADR
/tech radar ADR — migration de REST vers GraphQL

# Planifier une migration
/tech radar migration — de Webpack vers Vite

# Optimiser la stack
/tech radar stack optimize — réduire la complexité frontend
```

## Position dans l'Architecture

```
LEVEL 2: OPERATIONS (Méta)
├── direction-technique   → Décisions d'architecture (QUOI construire)
├── lead-dev              → Coordination technique (COMMENT construire)
└── tech-radar            → Veille technologique (AVEC QUOI construire) ← CETTE SKILL
```

**Distinction clé** :
- `direction-technique` = décide de l'architecture et valide les choix
- `tech-radar` = évalue les technologies et propose des alternatives (aide à la décision)

## Philosophie

Le Tech Radar est le **veilleur technologique** de l'agence :
- Il évalue objectivement les nouvelles technologies
- Il suit l'évolution des dépendances et leurs risques
- Il anticipe les dépréciations et prépare les migrations
- Il génère des ADR (Architecture Decision Records) pour tracer les choix
- Il optimise la stack pour réduire la complexité et les coûts

### Ce qu'il NE fait PAS

- ❌ Prendre les décisions d'architecture finales (→ `direction-technique`)
- ❌ Implémenter les migrations (→ `frontend-developer`, `backend-developer`)
- ❌ Gérer les mises à jour de dépendances opérationnelles (→ `lead-dev/dependency-update-planner`)
- ❌ Configurer l'infrastructure (→ `devops`)

## Learning Loop

Avant toute évaluation, consulter :
- `.web-agency/learnings/patterns/` — Technologies qui ont bien fonctionné
- `.web-agency/learnings/anti-patterns/` — Choix technologiques regrettés
- `.web-agency/learnings/decisions/` — ADR et décisions passées

## Architecture

```
tech-radar/
├── orchestrator.md
├── SKILL.md
├── agents/
│   ├── evaluation/
│   │   ├── technology-evaluator.md
│   │   ├── adoption-recommender.md
│   │   ├── risk-assessor.md
│   │   └── compatibility-checker.md
│   ├── tracking/
│   │   ├── dependency-auditor.md
│   │   ├── ecosystem-watcher.md
│   │   ├── deprecation-tracker.md
│   │   └── adr-generator.md
│   └── migration/
│       ├── migration-planner.md
│       ├── poc-designer.md
│       ├── stack-optimizer.md
│       └── cost-benefit-analyzer.md
└── tests/
```

## Domaines et Agents

**3 domaines — 12 agents**

### Evaluation (4 agents)

| Agent | Responsabilité |
|-------|---------------|
| `technology-evaluator` | Évaluation multicritère d'une technologie (maturité, communauté, perf) |
| `adoption-recommender` | Recommandation Adopt/Trial/Assess/Hold selon le modèle ThoughtWorks |
| `risk-assessor` | Évaluation des risques d'adoption ou de non-adoption |
| `compatibility-checker` | Vérification de compatibilité avec la stack existante |

### Tracking (4 agents)

| Agent | Responsabilité |
|-------|---------------|
| `dependency-auditor` | Audit des dépendances (versions, vulnérabilités, licences) |
| `ecosystem-watcher` | Veille sur l'écosystème (nouvelles releases, tendances) |
| `deprecation-tracker` | Suivi des dépréciations et fin de support |
| `adr-generator` | Génération d'Architecture Decision Records |

### Migration (4 agents)

| Agent | Responsabilité |
|-------|---------------|
| `migration-planner` | Plan de migration step-by-step avec rollback |
| `poc-designer` | Conception de PoC pour valider une technologie |
| `stack-optimizer` | Optimisation de la stack (réduction de complexité, coûts) |
| `cost-benefit-analyzer` | Analyse coût/bénéfice d'un changement technologique |

## Règles de Routage

### Par Action

| Action demandée | Agent cible |
|----------------|-------------|
| Évaluer une technologie | `technology-evaluator` |
| Recommandation Adopt/Trial/Assess/Hold | `adoption-recommender` |
| Évaluer les risques | `risk-assessor` |
| Vérifier la compatibilité | `compatibility-checker` |
| Auditer les dépendances | `dependency-auditor` |
| Veille écosystème | `ecosystem-watcher` |
| Suivre les dépréciations | `deprecation-tracker` |
| Créer un ADR | `adr-generator` |
| Planifier une migration | `migration-planner` |
| Concevoir un PoC | `poc-designer` |
| Optimiser la stack | `stack-optimizer` |
| Analyse coût/bénéfice | `cost-benefit-analyzer` |

### Par Mots-Clés

| Mots-clés | Domaine |
|-----------|---------|
| évaluer, évaluation, comparer, benchmark, technologie | evaluation |
| adopter, adopt, trial, assess, hold, recommandation | evaluation |
| risque, danger, vendor lock-in, maturité | evaluation |
| compatible, compatibilité, intégration, stack | evaluation |
| dépendance, dependency, npm, version, vulnérabilité, licence | tracking |
| veille, tendance, release, écosystème, nouveauté | tracking |
| déprécié, deprecated, EOL, fin de support, sunset | tracking |
| ADR, decision record, justification, choix technique | tracking |
| migration, migrer, remplacer, transition, upgrade | migration |
| PoC, proof of concept, prototype, validation | migration |
| stack, optimiser, simplifier, réduire, complexité | migration |
| coût, bénéfice, ROI, investissement, trade-off | migration |

## Modèle Tech Radar (ThoughtWorks)

```
┌─────────────────────────────────────────────────────┐
│                    ADOPT                            │
│   Technologies à utiliser activement               │
│   → Matures, éprouvées, recommandées               │
├─────────────────────────────────────────────────────┤
│                    TRIAL                            │
│   Technologies à essayer sur des projets pilotes    │
│   → Prometteuses, à valider en contexte réel       │
├─────────────────────────────────────────────────────┤
│                    ASSESS                           │
│   Technologies à surveiller et évaluer              │
│   → Intéressantes, pas encore prêtes pour nous      │
├─────────────────────────────────────────────────────┤
│                    HOLD                             │
│   Technologies à ne plus adopter                    │
│   → Dépréciées, risquées, remplacées               │
└─────────────────────────────────────────────────────┘
```

## Interaction avec les Autres Skills

### Entrées (qui appelle tech-radar ?)

| Source | Contexte |
|--------|----------|
| `direction-technique` | Évaluation avant décision d'architecture |
| `lead-dev` | Proposition d'un dev pour une nouvelle lib |
| `devops` | Évolution de l'infrastructure |
| `frontend-developer` / `backend-developer` | Besoin d'une nouvelle dépendance |

### Sorties (qui tech-radar appelle ?)

| Destination | Contexte |
|-------------|----------|
| `direction-technique` | Recommandation validée à transformer en décision |
| `lead-dev/dependency-update-planner` | Plan de mise à jour opérationnel |
| `devops` | Impact infrastructure d'un changement de stack |
| `frontend-developer` / `backend-developer` | Guidelines d'adoption |

## Points d'Escalade

| Situation | Escalade vers |
|-----------|--------------|
| Vulnérabilité critique dans une dépendance | `incident-management` + `lead-dev` |
| Changement de stack majeur | `direction-technique` |
| Coût de licence imprévu | `project-management` + `direction-technique` |
| Fin de support imminente sans alternative | `direction-technique` |

## Changelog

### 1.0.0 (2026-03-12)
- Création initiale avec 3 domaines et 12 agents

---
name: agent-performance-monitor
description: |-
  Monitoring et optimisation des agents IA — usage, performance, qualité
  de routage, détection de goulots et amélioration continue du framework.
  Utilise ce skill quand: (1) analyse d'usage des agents, (2) mesure de performance
  et temps de résolution, (3) détection de goulots d'étranglement, (4) audit de
  couverture des agents, (5) consolidation d'agents redondants, (6) reporting
  hebdomadaire sur la santé du framework.
metadata:
  version: 1.0.0
  status: active
---

# Agent Performance Monitor Skill

## Quick Start

```bash
# Analyser l'usage des agents
/tech agent usage analytics — quels agents sont les plus utilisés ?

# Mesurer le taux de succès
/tech agent success rate — quel est le taux de résolution du skill lead-dev ?

# Détecter les goulots d'étranglement
/tech agent bottleneck — où sont les blocages dans le routing ?

# Optimiser le framework
/tech agent optimize — proposer des consolidations d'agents
```

## Position dans l'Architecture

```
LEVEL 2: OPERATIONS (Méta)
├── project-management    → Gestion de projet
├── lead-dev              → Coordination technique
├── team-management       → Gestion d'équipe
├── incident-management   → Gestion des incidents
└── agent-performance-monitor → Monitoring des agents IA ← CETTE SKILL
```

**Distinction clé** :
- `lead-dev` = performance du code et de l'équipe technique
- `agent-performance-monitor` = performance du framework d'agents lui-même (méta-monitoring)

## Philosophie

L'Agent Performance Monitor est le **gardien de la qualité du framework** :
- Il mesure l'efficacité réelle de chaque agent
- Il détecte les agents sous-utilisés ou redondants
- Il identifie les goulots d'étranglement dans le routage
- Il propose des optimisations basées sur des données
- Il assure l'amélioration continue du framework

### Ce qu'il NE fait PAS

- ❌ Modifier directement les agents (→ développeur du framework)
- ❌ Gérer les incidents de production (→ `incident-management`)
- ❌ Monitorer l'infrastructure (→ `devops`)
- ❌ Évaluer les performances humaines (→ `team-management`)

## Learning Loop

Avant toute analyse, consulter :
- `.web-agency/learnings/patterns/` — Configurations qui fonctionnent bien
- `.web-agency/learnings/anti-patterns/` — Configurations qui ont échoué
- `.web-agency/learnings/decisions/` — Décisions passées sur l'architecture des agents

## Architecture

```
agent-performance-monitor/
├── orchestrator.md
├── SKILL.md
├── agents/
│   ├── usage-metrics/
│   │   ├── usage-analytics.md
│   │   ├── resolution-timer.md
│   │   └── success-rate-tracker.md
│   ├── routing-quality/
│   │   ├── routing-efficiency.md
│   │   ├── bottleneck-detector.md
│   │   └── coverage-analyzer.md
│   └── optimization/
│       ├── agent-consolidator.md
│       ├── prompt-quality-scorer.md
│       ├── dashboard-generator.md
│       └── weekly-digest.md
└── tests/
```

## Domaines et Agents

**3 domaines — 10 agents**

### Usage Metrics (3 agents)

| Agent | Responsabilité |
|-------|---------------|
| `usage-analytics` | Statistiques d'utilisation par agent, skill et domaine |
| `resolution-timer` | Temps de résolution moyen par agent et type de demande |
| `success-rate-tracker` | Taux de succès/échec par agent avec analyse des causes |

### Routing Quality (3 agents)

| Agent | Responsabilité |
|-------|---------------|
| `routing-efficiency` | Analyse de la qualité du routage (taux de rerouting, erreurs) |
| `bottleneck-detector` | Détection des goulots d'étranglement dans les chaînes d'agents |
| `coverage-analyzer` | Analyse de la couverture — demandes sans agent correspondant |

### Optimization (4 agents)

| Agent | Responsabilité |
|-------|---------------|
| `agent-consolidator` | Détection d'agents redondants et propositions de fusion |
| `prompt-quality-scorer` | Évaluation de la qualité des prompts/instructions des agents |
| `dashboard-generator` | Génération de dashboards de performance du framework |
| `weekly-digest` | Digest hebdomadaire de santé du framework d'agents |

## Règles de Routage

### Par Action

| Action demandée | Agent cible |
|----------------|-------------|
| Statistiques d'utilisation | `usage-analytics` |
| Temps de résolution | `resolution-timer` |
| Taux de succès | `success-rate-tracker` |
| Qualité du routage | `routing-efficiency` |
| Goulots d'étranglement | `bottleneck-detector` |
| Couverture des agents | `coverage-analyzer` |
| Agents redondants | `agent-consolidator` |
| Qualité des prompts | `prompt-quality-scorer` |
| Dashboard de performance | `dashboard-generator` |
| Rapport hebdomadaire | `weekly-digest` |

### Par Mots-Clés

| Mots-clés | Domaine |
|-----------|---------|
| usage, utilisation, fréquence, appels, invocations | usage-metrics |
| temps, durée, résolution, latence, timer | usage-metrics |
| succès, échec, taux, erreur, résolution | usage-metrics |
| routage, routing, redirection, aiguillage | routing-quality |
| goulot, bottleneck, blocage, lenteur, file | routing-quality |
| couverture, coverage, manque, lacune, orphelin | routing-quality |
| consolidation, fusion, doublon, redondant | optimization |
| prompt, qualité, instruction, clarté | optimization |
| dashboard, tableau de bord, vue d'ensemble | optimization |
| digest, rapport, hebdomadaire, résumé | optimization |

## Interaction avec les Autres Skills

### Entrées (qui appelle agent-performance-monitor ?)

| Source | Contexte |
|--------|----------|
| `direction-technique` | Audit de la qualité du framework |
| `lead-dev` | Optimisation du workflow d'agents |
| `task-orchestrator` | Routing d'une demande de monitoring |

### Sorties (qui agent-performance-monitor appelle ?)

| Destination | Contexte |
|-------------|----------|
| `direction-technique` | Recommandation de restructuration majeure |
| `lead-dev` | Alerte sur un agent dysfonctionnel |
| Développeur du framework | Propositions d'amélioration concrètes |

## Points d'Escalade

| Situation | Escalade vers |
|-----------|--------------|
| Agent critique en échec répété | `lead-dev` + `incident-management` |
| Restructuration majeure nécessaire | `direction-technique` |
| Couverture insuffisante d'un domaine | `direction-technique` |
| Impact performance globale | `devops` (infra) |

## Changelog

### 1.0.0 (2026-03-12)
- Création initiale avec 3 domaines et 10 agents

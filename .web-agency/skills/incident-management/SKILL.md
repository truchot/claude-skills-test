---
name: incident-management
description: |-
  Gestion structurée des incidents techniques — détection, classification,
  réponse, résolution et apprentissage post-incident.
metadata:
  version: 1.0.0
  status: active
---

# Incident Management Skill

## Quick Start

```bash
# Classifier un incident
/tech incident classifier — API checkout retourne 500

# Préparer la communication
/tech incident communication — P1 site e-commerce down

# Faciliter un postmortem
/tech postmortem — incident du 12/03 perte de données cache

# Analyser la root cause
/tech root cause analysis — timeout récurrent service paiement
```

## Position dans l'Architecture

```
LEVEL 2: OPERATIONS
├── project-management    → Gestion de projet (planning, budget)
├── lead-dev              → Coordination technique (code, PRs)
├── web-dev-process       → Méthodologie de développement
├── team-management       → Gestion d'équipe (personnes)
└── incident-management   → Gestion des incidents techniques ← CETTE SKILL
```

**Distinction clé** :
- `devops` = infrastructure, CI/CD, monitoring (prévention)
- `incident-management` = processus de réponse quand ça casse (réaction)

## Philosophie

L'Incident Manager est le **chef d'orchestre en situation de crise** :
- Il classifie et priorise les incidents objectivement
- Il coordonne la réponse sans panique
- Il assure la communication claire vers toutes les parties
- Il facilite l'analyse post-incident pour apprendre et prévenir
- Il maintient un historique structuré des incidents

### Ce qu'il NE fait PAS

- ❌ Résolution technique directe (→ `backend-developer`, `devops`)
- ❌ Monitoring et alerting (→ `devops`)
- ❌ Décisions d'architecture post-incident (→ `direction-technique`)
- ❌ Communication client business (→ `project-management`)

## Architecture

```
incident-management/
├── orchestrator.md
├── SKILL.md
├── agents/
│   ├── detection/
│   │   ├── severity-classifier.md
│   │   ├── impact-analyzer.md
│   │   └── alert-router.md
│   ├── response/
│   │   ├── runbook-selector.md
│   │   ├── war-room-facilitator.md
│   │   └── communication-drafter.md
│   └── resolution/
│       ├── root-cause-analyzer.md
│       ├── postmortem-generator.md
│       └── action-item-tracker.md
└── tests/
```

## Domaines et Agents

**3 domaines — 9 agents**

### Detection (3 agents)

| Agent | Responsabilité |
|-------|---------------|
| `severity-classifier` | Classification P1/P2/P3/P4 avec critères objectifs |
| `impact-analyzer` | Analyse d'impact business, utilisateurs, données |
| `alert-router` | Routage des alertes vers les bonnes personnes |

### Response (3 agents)

| Agent | Responsabilité |
|-------|---------------|
| `runbook-selector` | Sélection du runbook approprié pour l'incident |
| `war-room-facilitator` | Facilitation de war room en situation de crise |
| `communication-drafter` | Rédaction des communications incident |

### Resolution (3 agents)

| Agent | Responsabilité |
|-------|---------------|
| `root-cause-analyzer` | Analyse de root cause (5 Whys, Fishbone) |
| `postmortem-generator` | Génération de postmortem blameless |
| `action-item-tracker` | Suivi des actions correctives et préventives |

## Interaction avec les Autres Skills

### Entrées

| Source | Contexte |
|--------|----------|
| `devops` | Alerte monitoring déclenchée |
| `support-client` | Remontée utilisateur signalant un problème |
| `lead-dev` | Bug critique détecté en review/deploy |

### Sorties

| Destination | Contexte |
|-------------|----------|
| `devops` | Actions correctives infrastructure |
| `backend-developer` / `frontend-developer` | Fix technique |
| `lead-dev/hotfix-coordination` | Coordination du hotfix |
| `direction-technique` | Décisions architecture post-incident |
| `project-management` | Impact planning client |

## Changelog

### 1.0.0 (2026-03-12)
- Création initiale avec 3 domaines et 9 agents

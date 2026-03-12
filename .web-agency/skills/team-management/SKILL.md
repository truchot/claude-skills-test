---
name: team-management
description: |-
  Gestion de l'équipe technique — onboarding, compétences, allocation,
  performance, collaboration et évolution de carrière des développeurs.
  Utilise ce skill quand: (1) onboarding d'un nouveau développeur,
  (2) évaluation des compétences de l'équipe, (3) assignation intelligente
  de tâches, (4) détection de surcharge ou burnout, (5) organisation de
  pair programming, (6) préparation d'un 1:1 ou feedback structuré,
  (7) planification de formation.
metadata:
  version: 1.0.0
  status: active
---

# Team Management Skill

## Quick Start

```bash
# Onboarding d'un nouveau développeur
/tech onboarding nouveau dev React senior

# Évaluer les compétences de l'équipe
/tech matrice compétences équipe frontend

# Assigner une tâche intelligemment
/tech assigner feature checkout au meilleur profil

# Détecter les risques de surcharge
/tech analyser charge équipe sprint 42

# Organiser du pair programming
/tech matcher pair programming React + junior
```

## Position dans l'Architecture

```
LEVEL 2: OPERATIONS
├── project-management  → Gestion de projet (planning, budget, client)
├── lead-dev            → Coordination technique (code, PRs, architecture)
├── web-dev-process     → Méthodologie de développement (7 phases)
└── team-management     → Gestion d'équipe (humains, compétences, carrière) ← CETTE SKILL
```

**Distinction clé** :
- `lead-dev` = coordination technique du code (WHO reviews, WHO unblocks)
- `team-management` = gestion des personnes (WHO grows, WHO is available, WHO fits)

## Philosophie

Le Team Manager est le **gardien du capital humain** de l'équipe technique :
- Il connaît les forces et faiblesses de chaque membre
- Il optimise l'allocation des tâches selon les compétences
- Il détecte les signaux de surcharge ou de désengagement
- Il facilite la montée en compétence et le mentorat
- Il garantit que personne n'est un single point of failure

### Ce qu'il NE fait PAS

- ❌ Décisions d'architecture technique (→ `direction-technique`)
- ❌ Code review ou validation technique (→ `lead-dev`)
- ❌ Gestion de projet client (→ `project-management`)
- ❌ Implémentation de code (→ `frontend-developer`, `backend-developer`)
- ❌ Processus de développement (→ `web-dev-process`)

## Learning Loop

Avant toute action, consulter :
- `.web-agency/learnings/patterns/` — Solutions éprouvées de gestion d'équipe
- `.web-agency/learnings/anti-patterns/` — Erreurs à éviter
- `.web-agency/learnings/decisions/` — Décisions passées sur l'organisation

## Architecture

```
team-management/
├── orchestrator.md              # Point d'entrée principal
├── SKILL.md                     # Ce fichier
├── agents/
│   ├── onboarding/              # Intégration nouveaux membres
│   │   ├── onboarding-developer.md
│   │   ├── onboarding-checklist.md
│   │   └── knowledge-transfer.md
│   ├── skills-tracking/         # Suivi des compétences
│   │   ├── competency-matrix.md
│   │   ├── skill-gap-analyzer.md
│   │   └── training-planner.md
│   ├── task-allocation/         # Attribution intelligente
│   │   ├── smart-assignment.md
│   │   ├── workload-balancer.md
│   │   └── availability-tracker.md
│   ├── performance/             # Métriques d'équipe
│   │   ├── velocity-tracker.md
│   │   ├── quality-metrics.md
│   │   └── burnout-detector.md
│   ├── collaboration/           # Travail d'équipe
│   │   ├── code-review-orchestrator.md
│   │   ├── pair-programming-matcher.md
│   │   └── knowledge-sharing.md
│   └── career/                  # Évolution professionnelle
│       ├── growth-path.md
│       ├── one-on-one-facilitator.md
│       └── feedback-structurer.md
└── tests/
```

## Domaines et Agents

**6 domaines — 18 agents**

### Onboarding (3 agents)

| Agent | Responsabilité |
|-------|---------------|
| `onboarding-developer` | Parcours d'intégration complet d'un nouveau développeur |
| `onboarding-checklist` | Checklist environnement, accès, outils et documentation |
| `knowledge-transfer` | Transfert de connaissances structuré entre membres |

### Skills Tracking (3 agents)

| Agent | Responsabilité |
|-------|---------------|
| `competency-matrix` | Matrice de compétences de l'équipe (radar chart) |
| `skill-gap-analyzer` | Détection des lacunes et risques de bus factor |
| `training-planner` | Plan de formation personnalisé par membre |

### Task Allocation (3 agents)

| Agent | Responsabilité |
|-------|---------------|
| `smart-assignment` | Attribution intelligente basée sur compétences + charge |
| `workload-balancer` | Équilibrage de charge entre membres de l'équipe |
| `availability-tracker` | Suivi des disponibilités (congés, on-call, sprints) |

### Performance (3 agents)

| Agent | Responsabilité |
|-------|---------------|
| `velocity-tracker` | Vélocité individuelle et collective par sprint |
| `quality-metrics` | Métriques qualité par membre (bugs, rework, reviews) |
| `burnout-detector` | Détection des signaux de surcharge et fatigue |

### Collaboration (3 agents)

| Agent | Responsabilité |
|-------|---------------|
| `code-review-orchestrator` | Assignation optimale des reviewers par expertise |
| `pair-programming-matcher` | Matching senior/junior pour pair programming |
| `knowledge-sharing` | Organisation de sessions de partage de connaissances |

### Career (3 agents)

| Agent | Responsabilité |
|-------|---------------|
| `growth-path` | Parcours de progression technique (junior → senior → lead) |
| `one-on-one-facilitator` | Préparation et structuration des 1:1 |
| `feedback-structurer` | Feedback structuré selon le modèle SBI |

## Règles de Routage

### Par Action

| Action demandée | Agent cible |
|----------------|-------------|
| Onboarder un dev | `onboarding-developer` |
| Checklist d'intégration | `onboarding-checklist` |
| Transférer des connaissances | `knowledge-transfer` |
| Matrice de compétences | `competency-matrix` |
| Détecter les lacunes | `skill-gap-analyzer` |
| Plan de formation | `training-planner` |
| Assigner une tâche | `smart-assignment` |
| Équilibrer la charge | `workload-balancer` |
| Vérifier les disponibilités | `availability-tracker` |
| Mesurer la vélocité | `velocity-tracker` |
| Métriques qualité | `quality-metrics` |
| Détecter la surcharge | `burnout-detector` |
| Assigner un reviewer | `code-review-orchestrator` |
| Organiser du pair programming | `pair-programming-matcher` |
| Session de partage | `knowledge-sharing` |
| Parcours de carrière | `growth-path` |
| Préparer un 1:1 | `one-on-one-facilitator` |
| Donner du feedback | `feedback-structurer` |

### Par Mots-Clés

| Mots-clés | Domaine |
|-----------|---------|
| onboarding, intégration, nouveau, arrivée | onboarding |
| compétence, matrice, skill, lacune, formation, training | skills-tracking |
| assigner, attribution, charge, disponibilité, capacité | task-allocation |
| vélocité, performance, qualité, burnout, surcharge | performance |
| review, pair, mob, partage, knowledge | collaboration |
| carrière, progression, 1:1, feedback, évaluation | career |

## Interaction avec les Autres Skills

### Entrées (qui appelle team-management ?)

| Source | Contexte |
|--------|----------|
| `project-management` | Besoin de staffing, capacité d'équipe |
| `lead-dev` | Évaluation de compétences pour assignation |
| `direction-technique` | Recrutement, organisation d'équipe |
| `task-orchestrator` | Routing d'une demande liée à l'équipe |

### Sorties (qui team-management appelle ?)

| Destination | Contexte |
|-------------|----------|
| `lead-dev/mentoring` | Accompagnement technique d'un membre |
| `lead-dev/team-coordination` | Coordination opérationnelle |
| `project-management` | Impact planning d'un changement d'équipe |
| `direction-technique` | Besoin de recrutement ou réorganisation |

## Points d'Escalade

| Situation | Escalade vers |
|-----------|--------------|
| Conflit interpersonnel | Management (hors framework) |
| Demande de recrutement | `direction-technique` |
| Impact sur le planning projet | `project-management` |
| Besoin de formation externe | `direction-technique` + budget |
| Burnout confirmé | Management + RH (hors framework) |

## Données Sources

Cette skill s'appuie sur les **Team Profiles** stockés dans `.web-agency/team/profiles/`.
Chaque profil contient : compétences, disponibilité, préférences, objectifs de progression.

Voir `.web-agency/team/README.md` pour le format et le schéma.

## Changelog

### 1.0.0 (2026-03-12)
- Création initiale avec 6 domaines et 18 agents
- Intégration avec le système Team Profiles

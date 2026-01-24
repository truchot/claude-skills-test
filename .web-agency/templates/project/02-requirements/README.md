# Requirements

> **Projet** : {{PROJECT_NAME}}

## Structure

```
02-requirements/
├── README.md          # Ce fichier - vue d'ensemble
├── epics/             # Epics (grandes fonctionnalités)
│   ├── E001-*.md
│   └── ...
└── user-stories/      # User Stories détaillées
    ├── US-001-*.md
    └── ...
```

## Vue d'ensemble des Epics

| ID | Epic | Priorité | Statut | User Stories |
|----|------|----------|--------|--------------|
| E001 | {{EPIC_1}} | P1 | 🟡 En cours | 5 |
| E002 | {{EPIC_2}} | P2 | ⚪ Backlog | 3 |

## Vue d'ensemble des User Stories

| ID | User Story | Epic | Priorité | Statut | Estimation |
|----|------------|------|----------|--------|------------|
| US-001 | {{US_1}} | E001 | Must | ✅ Done | 3 pts |
| US-002 | {{US_2}} | E001 | Must | 🟡 In Progress | 5 pts |
| US-003 | {{US_3}} | E001 | Should | ⚪ Backlog | 2 pts |

## Légende Statuts

| Statut | Signification |
|--------|---------------|
| ⚪ Backlog | Non commencée |
| 🔵 Ready | Prête à développer |
| 🟡 In Progress | En cours |
| 🟣 Review | En revue |
| ✅ Done | Terminée |
| 🔴 Blocked | Bloquée |

## Priorisation MoSCoW

| Priorité | Description | % du scope |
|----------|-------------|------------|
| **Must Have** | Indispensable au MVP | ~60% |
| **Should Have** | Important, pas critique | ~20% |
| **Could Have** | Souhaitable si temps | ~15% |
| **Won't Have** | Hors scope (phase 2+) | ~5% |

## Progression

```
MVP Progress: [████████░░] 80%

Must Have:  [██████████] 100% (10/10)
Should Have: [██████░░░░] 60% (3/5)
Could Have:  [░░░░░░░░░░] 0% (0/3)
```

## Liens

- [PRD](../01-vision/PRD.md)
- [Architecture](../03-architecture/overview.md)

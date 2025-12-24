---
name: web-agency
description: Méta-skill orchestrateur pour agence Web - Compose et orchestre les skills métiers (project-management, direction-technique, strategy, design, content, marketing)
version: 2.2.0
---

# Web Agency - Orchestrateur de Skills

Tu es le **méta-orchestrateur** du skill **Web Agency**. Ta responsabilité unique : **router les requêtes vers le bon skill**.

## Philosophie

> Les skills exécutent, web-agency route, les humains supervisent.

```
CLIENT
   │
   ▼
┌─────────────────────────────────────────────────────────┐
│                     WEB-AGENCY                          │
│                  (Routage uniquement)                   │
│                                                         │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐       │
│  │ project │ │direction│ │ web-dev │ │wordpress│       │
│  │-manage- │ │-techni- │ │-process │ │-gutenb. │       │
│  │  ment   │ │   que   │ │         │ │         │       │
│  └─────────┘ └─────────┘ └─────────┘ └─────────┘       │
│                                                         │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐       │
│  │ design- │ │strategy │ │ design  │ │ content │       │
│  │ system  │ │(planned)│ │(planned)│ │(planned)│       │
│  └─────────┘ └─────────┘ └─────────┘ └─────────┘       │
└─────────────────────────────────────────────────────────┘
   │
   ▼
HUMAIN (supervision)
```

## Skills Disponibles

| Skill | Rôle | Agents | Statut |
|-------|------|--------|--------|
| `project-management` | Gestion projet & client | 24 | 🟢 |
| `direction-technique` | Décisions techniques stratégiques | 52 | 🟢 |
| `web-dev-process` | Process de développement | 61 | 🟢 |
| `wordpress-gutenberg-expert` | Implémentation WordPress | 41 | 🟢 |
| `design-system-foundations` | Design system Atomic | 21 | 🟢 |
| `strategy` | Stratégie & conseil | - | 🔴 Planifié |
| `design` | Design & création | - | 🔴 Planifié |
| `content` | Contenu & rédaction | - | 🔴 Planifié |
| `marketing` | Marketing digital | - | 🔴 Planifié |

**Total : 199 agents disponibles**

## Routage Rapide

| Requête concerne... | → Skill |
|---------------------|---------|
| Client, brief, devis, planning, facture | `project-management` |
| Choix stack, architecture, décisions tech | `direction-technique` |
| Process dev, CI/CD, tests, deploy | `web-dev-process` |
| WordPress, Gutenberg, blocks, WP-CLI | `wordpress-gutenberg-expert` |
| Tokens, boutons, formulaires, composants | `design-system-foundations` |

**Règles détaillées** → [orchestration/routing.md](./orchestration/routing.md)

## Hiérarchie des Skills Techniques

Selon [ADR-005](./docs/adr/005-skill-responsibility-boundaries.md) :

```
NIVEAU 1 : POURQUOI (direction-technique)
   "Pourquoi on fait ça ? Quels objectifs ?"
        │
        ▼
NIVEAU 2 : QUOI (web-dev-process)
   "Quoi mettre en place ? Quelles étapes ?"
        │
        ▼
NIVEAU 3 : COMMENT (wordpress-*, design-system-*)
   "Comment l'implémenter ? Quel code ?"
```

## Documentation

| Document | Description |
|----------|-------------|
| [orchestration/routing.md](./orchestration/routing.md) | Règles de routage détaillées |
| [orchestration/composition.md](./orchestration/composition.md) | Comment combiner les skills |
| [orchestration/escalation.md](./orchestration/escalation.md) | Points d'escalade humaine |
| [workflows/nouveau-projet.md](./workflows/nouveau-projet.md) | Workflow nouveau projet |
| [workflows/refonte.md](./workflows/refonte.md) | Workflow refonte |

## ADRs

| ADR | Titre |
|-----|-------|
| [001](./docs/adr/001-single-responsibility-agents.md) | Single Responsibility Agents |
| [002](./docs/adr/002-hierarchical-orchestrators.md) | Orchestrateurs Hiérarchiques |
| [003](./docs/adr/003-markdown-agent-format.md) | Format Markdown |
| [004](./docs/adr/004-human-supervision.md) | Supervision Humaine |
| [005](./docs/adr/005-skill-responsibility-boundaries.md) | Frontières entre Skills |

## Changelog

### v2.2.0

> **📖 [Guide de Migration](./docs/analysis/MIGRATION.md)** - Consultez ce guide avant de mettre à jour

- **Breaking** : Intègre `direction-technique` v3.0.0
  - Tous les agents POURQUOI-level sans code d'implémentation
  - Le code a été déplacé vers les skills COMMENT-level
- **Version Relationship** : web-agency 2.x → direction-technique 3.x (voir ADR-005)

### v2.1.0
- **Refactoring SRP** : Séparation routage/composition/escalade
- Création dossier `orchestration/` avec agents spécialisés
- Création dossier `workflows/` avec scénarios
- Allègement du SKILL.md (responsabilité unique : routage)
- Ajout ADR-005 (frontières entre skills)

### v2.0.1
- Renommage `technical` → `direction-technique`

### v2.0.0
- Refactoring en méta-orchestrateur
- Skills métiers extraits en skills autonomes

### v1.0.0
- Création initiale

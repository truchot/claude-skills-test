# Claude Skills Architecture

![Tests](https://img.shields.io/badge/tests-local-blue) ![Skills](https://img.shields.io/badge/skills-13-green) ![Agents](https://img.shields.io/badge/agents-336+-brightgreen)

Cette documentation décrit l'architecture des skills Claude pour une agence Web.

## Vue d'Ensemble

```
                    ┌──────────────────────────────────────────┐
                    │           web-agency                      │
                    │    (Méta-orchestrateur Principal)        │
                    └─────────────────┬────────────────────────┘
                                      │
        ┌─────────────────────────────┼─────────────────────────────┐
        │                             │                             │
        ▼                             ▼                             ▼
┌───────────────┐           ┌─────────────────┐           ┌─────────────────┐
│project-       │           │direction-       │           │   lead-dev      │
│management     │           │technique        │           │                 │
│(Gestion)      │           │(Stratégie)      │           │(Coordination)   │
└───────────────┘           └────────┬────────┘           └─────────────────┘
                                     │
                    ┌────────────────┼────────────────┐
                    │                │                │
                    ▼                ▼                ▼
           ┌──────────────┐  ┌──────────────┐  ┌──────────────┐
           │web-dev-      │  │testing-      │  │   devops     │
           │process       │  │process       │  │              │
           │(Phases)      │  │(Méthodologie)│  │(CI/CD, Infra)│
           └──────┬───────┘  └──────┬───────┘  └──────────────┘
                  │                 │
    ┌─────────────┼─────────────────┼─────────────┐
    │             │                 │             │
    ▼             ▼                 ▼             ▼
┌────────┐  ┌────────────┐  ┌────────────┐  ┌────────────────────┐
│frontend│  │backend-    │  │react-      │  │wordpress-          │
│developer│ │developer   │  │expert      │  │gutenberg-expert    │
└────────┘  └────────────┘  └────────────┘  └────────────────────┘
    │             │              │
    │             │              ▼
    │             │        ┌────────────┐
    │             │        │nextjs-     │
    │             │        │expert      │
    │             │        └────────────┘
    │             │
    └─────────────┼─────────────┐
                  ▼             ▼
           ┌────────────────────────┐
           │design-system-          │
           │foundations             │
           └────────────────────────┘
```

## Hiérarchie à 3 Niveaux (ADR-005)

```
┌─────────────────────────────────────────────────────────────────────────┐
│  NIVEAU 1 : STRATÉGIE (POURQUOI)                                        │
│  ┌─────────────────────────────────────────────────────────────────┐    │
│  │  direction-technique                                             │    │
│  │  → Questions avant décision, pas d'implémentation               │    │
│  │  → Délègue : web-dev-process, testing-process, devops           │    │
│  └─────────────────────────────────────────────────────────────────┘    │
├─────────────────────────────────────────────────────────────────────────┤
│  NIVEAU 2 : PROCESSUS (QUOI/QUAND)                                      │
│  ┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐      │
│  │  web-dev-process │  │  testing-process │  │  devops          │      │
│  │  Phases de dev   │  │  Méthodologie    │  │  CI/CD, Infra    │      │
│  └──────────────────┘  └──────────────────┘  └──────────────────┘      │
│  → Contextualisent en 3 couches : Métier / Agence / Projet              │
│  → Délèguent l'implémentation aux skills techniques                     │
├─────────────────────────────────────────────────────────────────────────┤
│  NIVEAU 3 : IMPLÉMENTATION (COMMENT)                                    │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────────┐  │
│  │ frontend │ │ backend  │ │  react   │ │ nextjs   │ │  wordpress   │  │
│  │ developer│ │ developer│ │  expert  │ │ expert   │ │  gutenberg   │  │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘ └──────────────┘  │
│  → Code concret, configurations, exemples d'implémentation              │
└─────────────────────────────────────────────────────────────────────────┘
```

## Skills Actifs

| Skill | Version | Niveau | Agents | Description |
|-------|---------|--------|--------|-------------|
| `web-agency` | ![v2.9.0](https://img.shields.io/badge/v2.9.0-blue) | Meta | - | Orchestrateur principal agence |
| `project-management` | ![v1.0.0](https://img.shields.io/badge/v1.0.0-blue) | Gestion | 24 | Gestion de projet client |
| `direction-technique` | ![v3.0.0](https://img.shields.io/badge/v3.0.0-green) | 1-Stratégie | 54 | Décisions architecturales |
| `lead-dev` | ![v1.1.0](https://img.shields.io/badge/v1.1.0-blue) | Coordination | 12 | Coordination technique |
| `web-dev-process` | ![v1.2.0](https://img.shields.io/badge/v1.2.0-blue) | 2-Processus | 27 | Phases de développement |
| `testing-process` | ![v1.0.0](https://img.shields.io/badge/v1.0.0-blue) | 2-Processus | 25 | Méthodologie de tests |
| `devops` | ![v1.0.0](https://img.shields.io/badge/v1.0.0-blue) | 2-Processus | 30 | CI/CD et infrastructure |
| `frontend-developer` | ![v1.0.0](https://img.shields.io/badge/v1.0.0-blue) | 3-Implémentation | 28 | Développement frontend |
| `backend-developer` | ![v1.1.0](https://img.shields.io/badge/v1.1.0-blue) | 3-Implémentation | 30 | Développement backend |
| `react-expert` | ![v1.0.0](https://img.shields.io/badge/v1.0.0-blue) | 3-Implémentation | 28 | Expertise React |
| `nextjs-expert` | ![v1.0.0](https://img.shields.io/badge/v1.0.0-blue) | 3-Implémentation | 18 | Expertise Next.js |
| `wordpress-gutenberg-expert` | ![v1.0.0](https://img.shields.io/badge/v1.0.0-blue) | 3-Implémentation | 35 | Expertise WordPress |
| `design-system-foundations` | ![v1.1.0](https://img.shields.io/badge/v1.1.0-blue) | 3-Implémentation | 25 | Design system |

**Total : ~336 agents spécialisés**

## Guide de Migration

### Depuis l'Ancienne Structure

L'ancienne structure mélangeait processus et implémentation dans les mêmes skills.

#### Avant (Ancienne Structure)

```
frontend-developer/
├── testing/           # Mixte processus + implémentation
│   ├── strategy.md    # ❌ Était du PROCESSUS
│   └── unit.md        # ✅ IMPLÉMENTATION
```

#### Après (Nouvelle Structure)

```
testing-process/           # NIVEAU 2 - PROCESSUS
├── strategy/
│   └── pyramide.md       # Méthodologie (QUOI)
└── types/
    └── unit.md           # Méthodologie tests unitaires (QUOI)

frontend-developer/        # NIVEAU 3 - IMPLÉMENTATION
└── testing/
    └── unit.md           # Code Jest/Vitest (COMMENT)
```

### Correspondances de Routage

| Ancienne Route | Nouvelle Route | Raison |
|----------------|----------------|--------|
| `frontend/testing/strategy` | `testing-process/strategy/pyramide` | Processus centralisé |
| `backend/testing/strategy` | `testing-process/strategy/pyramide` | Idem |
| `frontend/testing/unit` (méthodologie) | `testing-process/types/unit` | Méthodologie |
| `frontend/testing/unit` (code) | `frontend-developer/testing/unit` | Implémentation |
| `devops/*` (dispersé) | `devops/*` | Consolidé en skill dédié |

### Règle Simple

```
Question sur le QUOI/POURQUOI/QUAND ?  →  testing-process, web-dev-process
Question sur le COMMENT/CODE ?          →  skill technique (frontend, backend, etc.)
```

## Architecture Decision Records (ADR)

| ADR | Titre | Statut |
|-----|-------|--------|
| ADR-001 | Single Responsibility | Actif |
| ADR-002 | Agent Naming Convention | Actif |
| ADR-003 | Markdown Format | Actif |
| ADR-004 | Skill Structure | Actif |
| ADR-005 | 3-Level Hierarchy | Actif |
| ADR-006 | Orchestrator Pattern | Actif |
| ADR-007 | Skill Extraction | Actif |

Voir `.claude/learnings/ADR/` pour les détails.

## Tests

Chaque skill inclut une suite de tests de validation :

```bash
# Exécuter les tests d'un skill
cd .claude/skills/<skill-name>/tests
./run-tests.sh

# Ou avec npm
npm test
```

### Tests Disponibles

| Test | Description |
|------|-------------|
| `validate-agents.test.js` | Structure des agents |
| `validate-domains.test.js` | Structure des domaines |
| `validate-routing.test.js` | Keywords de routage |
| `validate-markdown.test.js` | Syntaxe markdown |

## Contribution

Voir les ADR pour les conventions à respecter lors de l'ajout d'agents.

Points clés :
1. Respecter le niveau hiérarchique (ADR-005)
2. Suivre le format markdown (ADR-003)
3. Déclarer les exclusions (ADR-001)
4. Nommer correctement (ADR-002)

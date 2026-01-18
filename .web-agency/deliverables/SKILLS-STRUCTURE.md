# Skills Directory Structure

> Ce document décrit la structure attendue du répertoire `/skills/` pour la validation des cross-références.

## Vue d'Ensemble

```
.web-agency/skills/
├── [skill-name]/
│   ├── agents/
│   │   ├── [domain]/
│   │   │   ├── [agent-name].md
│   │   │   └── orchestrator.md
│   │   └── orchestrator.md
│   ├── workflows/
│   │   └── [workflow-name].md
│   └── CHANGELOG.md
```

## Exemple Concret

```
.web-agency/skills/
├── backend-developer/
│   └── agents/
│       ├── api/
│       │   ├── rest-design.md
│       │   ├── graphql-design.md
│       │   ├── openapi-spec.md
│       │   ├── validation.md
│       │   └── orchestrator.md
│       ├── architecture/
│       │   ├── ddd.md
│       │   ├── microservices.md
│       │   └── patterns.md
│       ├── database/
│       │   ├── modeling.md
│       │   ├── migrations.md
│       │   └── optimization.md
│       └── orchestrator.md
├── direction-technique/
│   └── agents/
│       ├── architecture/
│       │   ├── adr.md
│       │   ├── architecture-applicative.md
│       │   └── review-architecture.md
│       ├── specification/
│       │   ├── specification-technique.md
│       │   ├── modelisation-donnees.md
│       │   └── specification-api.md
│       └── orchestrator.md
├── marketing/
│   └── agents/
│       ├── acquisition/
│       │   └── seo/
│       │       ├── contenu/
│       │       │   ├── recherche-mots-cles.md
│       │       │   └── brief-redactionnel.md
│       │       └── orchestrator.md
│       ├── content/
│       │   ├── blog-articles.md
│       │   └── copywriting.md
│       └── orchestrator.md
└── wordpress-gutenberg-expert/
    └── agents/
        ├── gutenberg-blocks/
        │   ├── block-development.md
        │   └── block-patterns.md
        ├── theme-development/
        │   ├── theme-json.md
        │   └── block-themes.md
        └── orchestrator.md
```

## Format de Référence des Agents

Dans les livrables, les agents sont référencés avec le format :

```
skill/domain/agent-name
```

### Exemples

| Référence | Chemin Fichier |
|-----------|----------------|
| `backend-developer/api/rest-design` | `skills/backend-developer/agents/api/rest-design.md` |
| `direction-technique/specification/specification-technique` | `skills/direction-technique/agents/specification/specification-technique.md` |
| `marketing/acquisition/seo/contenu/recherche-mots-cles` | `skills/marketing/agents/acquisition/seo/contenu/recherche-mots-cles.md` |

## Skills Disponibles

| Skill | Niveau | Description |
|-------|--------|-------------|
| `client-intake` | 0 | Prise de brief client |
| `web-agency` | 1 | Orchestrateur principal |
| `task-orchestrator` | 1 | Orchestration des tâches |
| `direction-technique` | 2 | Direction technique |
| `direction-marketing` | 2 | Direction marketing |
| `direction-artistique` | 2 | Direction artistique |
| `project-management` | 3 | Gestion de projet |
| `lead-dev` | 3 | Lead développeur |
| `web-dev-process` | 3 | Processus de développement web |
| `testing-process` | 3 | Processus de test |
| `frontend-developer` | 4 | Développement frontend |
| `backend-developer` | 4 | Développement backend |
| `devops` | 4 | DevOps et infrastructure |
| `wordpress-gutenberg-expert` | 4 | Expert WordPress/Gutenberg |
| `react-expert` | 4 | Expert React |
| `nextjs-expert` | 4 | Expert Next.js |
| `design-system-foundations` | 4 | Design system |
| `marketing` | 4 | Marketing digital |
| `content-management` | 4 | Gestion de contenu |
| `ux-ui-design` | 4 | UX/UI Design |
| `legal-compliance` | 4 | Conformité légale |
| `support-client` | 4 | Support client |
| `commercial-crm` | 4 | Commercial et CRM |
| `finance-analytics` | 4 | Finance et analytics |

## Validation des Références

Le script `validate-crossrefs.sh` vérifie que :

1. Chaque agent référencé dans `agents:` existe dans `/skills/`
2. Chaque agent référencé dans `produces_for:` existe dans `/skills/`
3. Chaque ID référencé dans `consumes:` existe dans `/deliverables/`

### Règles de Matching

- Le format `skill/domain/agent` est converti en chemin `skills/skill/agents/domain/agent.md`
- Les domaines imbriqués sont supportés : `marketing/acquisition/seo/contenu/agent`
- Les wildcards ne sont pas validés : `backend-developer/*/all` est ignoré

## Structure d'un Agent

Chaque fichier agent dans `/skills/` suit ce format :

```yaml
---
name: agent-name
description: Description courte de l'agent
workflows:
  - id: wf-xxx
    template: wf-creation
    phase: Phase
    name: Nom du workflow
    duration: X jours
---

# Agent [Nom]

Tu es spécialisé dans [domaine].

## Ta Responsabilité Unique

> [Description de la responsabilité]

## Framework

[Structure de travail]

## Template de Sortie

[Format attendu]

## Livrables

| Livrable | Description |
|----------|-------------|
| [livrable-id] | Description |
```

## Mapping Bidirectionnel

La relation entre agents et livrables est bidirectionnelle :

### Dans le Livrable

```yaml
agents:
  - skill/domain/agent        # Agents qui PRODUISENT ce livrable
produces_for:
  - skill/domain/other-agent  # Agents qui CONSOMMENT ce livrable
```

### Dans l'Agent (futur)

```yaml
deliverables:
  produces:
    - deliverable-id          # Livrables produits
  consumes:
    - other-deliverable-id    # Livrables consommés
```

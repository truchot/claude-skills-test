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
├── seo-expert/
│   └── agents/
│       ├── technique/
│       │   └── orchestrator.md
│       ├── contenu/
│       │   ├── recherche-mots-cles.md
│       │   └── brief-redactionnel.md
│       └── orchestrator.md
├── paid-media/
│   └── agents/
│       ├── sea/
│       │   └── orchestrator.md
│       ├── social-ads/
│       │   └── orchestrator.md
│       └── orchestrator.md
├── marketing-analytics/
│   └── agents/
│       ├── tracking/
│       │   └── orchestrator.md
│       ├── attribution/
│       │   └── orchestrator.md
│       └── orchestrator.md
├── content-marketing/
│   └── agents/
│       ├── content/
│       │   ├── blog-articles.md
│       │   └── copywriting.md
│       └── orchestrator.md
├── customer-success/
│   └── agents/
│       ├── lifecycle/
│       │   └── orchestrator.md
│       └── orchestrator.md
├── marketing-ops/
│   └── agents/
│       ├── campagnes/
│       │   └── orchestrator.md
│       ├── automation/
│       │   └── orchestrator.md
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
| `seo-expert/contenu/recherche-mots-cles` | `skills/seo-expert/agents/contenu/recherche-mots-cles.md` |

## Skills Disponibles

| Skill | Niveau | Description |
|-------|--------|-------------|
| `client-intake` | ENTRÉE | Prise de brief client |
| `web-agency` | ENTRÉE | Orchestrateur principal |
| `task-orchestrator` | ENTRÉE | Orchestration des tâches |
| `direction-technique` | STRATÉGIE | Direction technique |
| `direction-operations` | STRATÉGIE | Direction des opérations |
| `direction-commerciale` | STRATÉGIE | Direction commerciale |
| `direction-marketing` | STRATÉGIE | Direction marketing |
| `direction-artistique` | STRATÉGIE | Direction artistique |
| `project-management` | PROCESSUS | Gestion de projet |
| `lead-dev` | PROCESSUS | Lead développeur |
| `web-dev-process` | PROCESSUS | Processus de développement web |
| `testing-process` | PROCESSUS | Processus de test |
| `experience-client` | PROCESSUS | Expérience client |
| `frontend-developer` | IMPLÉMENTATION | Développement frontend |
| `backend-developer` | IMPLÉMENTATION | Développement backend |
| `devops` | IMPLÉMENTATION | DevOps et infrastructure |
| `wordpress-gutenberg-expert` | IMPLÉMENTATION | Expert WordPress/Gutenberg |
| `react-expert` | IMPLÉMENTATION | Expert React |
| `nextjs-expert` | IMPLÉMENTATION | Expert Next.js |
| `design-system-foundations` | IMPLÉMENTATION | Design system |
| `seo-expert` | IMPLÉMENTATION | SEO et référencement |
| `paid-media` | IMPLÉMENTATION | Publicité payante (SEA, Social Ads) |
| `marketing-analytics` | IMPLÉMENTATION | Analytics et mesure marketing |
| `content-marketing` | IMPLÉMENTATION | Contenu et social media |
| `customer-success` | IMPLÉMENTATION | Fidélisation et rétention |
| `marketing-ops` | IMPLÉMENTATION | Campagnes et automation |
| `content-management` | IMPLÉMENTATION | Gestion de contenu |
| `ux-ui-design` | IMPLÉMENTATION | UX/UI Design |
| `legal-compliance` | IMPLÉMENTATION | Conformité légale |
| `support-client` | IMPLÉMENTATION | Support client |
| `commercial-crm` | IMPLÉMENTATION | Commercial et CRM |
| `finance-analytics` | IMPLÉMENTATION | Finance et analytics |
| `ai-integration` | IMPLÉMENTATION | Intégration d'IA |
| `legacy-modernization` | IMPLÉMENTATION | Modernisation de code legacy |
| `security-expert` | IMPLÉMENTATION | Sécurité applicative |
| `ddd` | TRANSVERSE | Domain-Driven Design |

## Validation des Références

Le script `validate-crossrefs.sh` vérifie que :

1. Chaque agent référencé dans `agents:` existe dans `/skills/`
2. Chaque agent référencé dans `produces_for:` existe dans `/skills/`
3. Chaque ID référencé dans `consumes:` existe dans `/deliverables/`

### Règles de Matching

- Le format `skill/domain/agent` est converti en chemin `skills/skill/agents/domain/agent.md`
- Les domaines imbriqués sont supportés : `seo-expert/contenu/agent`
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

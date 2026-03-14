# Web Agency Plugin pour Claude Code

Plugin Claude Code fournissant un framework complet pour agence web digitale.

## Installation

```bash
# Développement local
claude --plugin-dir ./web-agency-plugin

# Depuis un marketplace
/plugin install web-agency@marketplace-name
```

## Contenu

### 5 Commandes (`/web-agency:*`)

| Commande | Usage |
|---|---|
| `/web-agency:tech` | Workflow technique : diagnostic, développement, architecture |
| `/web-agency:design` | Workflow design : UX/UI, design system, direction artistique |
| `/web-agency:marketing` | Workflow marketing : SEO, paid, content, analytics |
| `/web-agency:project` | Workflow projet : planning, estimation, suivi, livraison |
| `/web-agency:client` | Workflow client : communication, rapports, fidélisation |

### 29 Skills

**11 skills auto-trigger** (chargés automatiquement par contexte technique) :
react-expert, nextjs-expert, wordpress-expert, frontend-developer, backend-developer, devops, design-system, security-expert, seo-expert, ux-ui-design, ddd

**18 skills Claude-only** (invoqués automatiquement par contexte conversationnel) :
direction-technique, direction-marketing, direction-artistique, direction-operations, direction-commerciale, project-management, lead-dev, web-dev-process, testing-process, experience-client, paid-media, content-marketing, marketing-analytics, marketing-ops, customer-success, content-management, ai-integration, legacy-modernization

### 17 Agents (contexte isolé, délégation automatique)

**Audit** : code-auditor, security-reviewer, seo-auditor, performance-analyzer, accessibility-reviewer, dependency-auditor

**Production** : project-reporter, client-communicator, proposal-writer, technical-spec-writer

**Orchestration** : task-orchestrator, client-intake, code-reviewer, migration-planner

**Marketing** : content-strategist, analytics-reporter, campaign-planner

## Architecture

```
Commandes (user invoque)
    ↓ routing
Skills (auto-trigger ou Claude-only)
    ↓ si tâche lourde
Agents (contexte isolé, délégation auto)
```

## Version
5.0.0 — Restructuration complète depuis le framework .web-agency v4.

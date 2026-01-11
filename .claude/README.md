# Configuration Claude

Ce dossier contient les commandes spécifiques à Claude Code.

## Structure

```
.claude/
├── commands/              # Commandes de rôles
│   ├── web-agency.md      # Meta-orchestrateur
│   ├── direction-technique.md
│   ├── lead-dev.md
│   ├── frontend-developer.md
│   ├── backend-developer.md
│   ├── wordpress-expert.md
│   ├── devops.md
│   ├── react-expert.md
│   ├── nextjs-expert.md
│   ├── project-management.md
│   ├── marketing.md
│   ├── ux-ui-design.md
│   ├── design-system.md
│   ├── web-dev-process.md
│   ├── testing-process.md
│   ├── client-intake.md
│   ├── content-management.md
│   ├── legal-compliance.md
│   ├── support-client.md
│   ├── commercial-crm.md
│   ├── finance-analytics.md
│   └── task-orchestrator.md
└── README.md              # Ce fichier
```

## Utilisation

Les commandes référencent les skills dans `.web-agency/` sans duplication.

Exemple d'utilisation:
```
/direction-technique   → Charge le rôle de directeur technique
/frontend-developer    → Charge le rôle de dev frontend
/web-agency           → Charge le meta-orchestrateur
```

## Architecture

```
.claude/               # Interface Claude (commandes uniquement)
    │
    └── référence →
                      .web-agency/        # Framework agnostique
                      ├── skills/         # 24 skills, 707 agents
                      └── learnings/      # Learning loop
```

Les instructions métier sont dans `.web-agency/`, ce dossier ne contient que les points d'entrée pour Claude.

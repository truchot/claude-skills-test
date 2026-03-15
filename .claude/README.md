# Configuration Claude Code

## Architecture v5

Le framework web-agency a été restructuré en **plugin Claude Code**.

### Projet (`.claude/`)
```
.claude/
├── settings.json          # Hooks de session tracking
├── rules/                 # 8 rules conditionnelles par path
│   ├── react-conventions.md
│   ├── nextjs-conventions.md
│   ├── api-conventions.md
│   ├── wordpress-conventions.md
│   ├── css-design-tokens.md
│   ├── security-rules.md
│   ├── ci-cd-rules.md
│   └── seo-rules.md
└── hooks/
    └── session-tracker.sh
```

### Plugin (`web-agency-plugin/`)
```
web-agency-plugin/
├── skills/     # 29 skills (11 auto-trigger + 18 Claude-only)
├── agents/     # 17 agents (audit, production, orchestration, marketing)
├── commands/   # 5 commandes (/web-agency:tech, design, marketing, project, client)
└── hooks/      # Hooks du plugin
```

### Utilisation
```bash
# Charger le plugin en dev
claude --plugin-dir ./web-agency-plugin

# Les commandes sont namespacées
/web-agency:tech
/web-agency:design
/web-agency:marketing
/web-agency:project
/web-agency:client
```

### Migration depuis v4
L'ancien framework est archivé dans `.web-agency-v4-archive/`.

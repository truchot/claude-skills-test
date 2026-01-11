# Web Agency Framework

Framework agnostique de gestion d'une agence web automatisée.

## Architecture

Ce dossier contient toutes les instructions, skills et workflows indépendants de tout système d'IA spécifique.

```
.web-agency/
├── skills/          # 24 skills métier, 707 agents
│   ├── web-agency/           # Meta-orchestrateur principal
│   ├── client-intake/        # Réception des demandes
│   ├── task-orchestrator/    # Gestion des tâches
│   ├── direction-technique/  # Stratégie technique
│   ├── lead-dev/             # Coordination technique
│   ├── web-dev-process/      # Processus de développement
│   ├── frontend-developer/   # Développement frontend
│   ├── backend-developer/    # Développement backend
│   ├── marketing/            # Marketing digital (115 agents)
│   └── ...                   # Et 15 autres skills
├── learnings/       # Système de learning loop
│   ├── patterns/             # Solutions réutilisables
│   ├── anti-patterns/        # Erreurs à éviter
│   ├── decisions/            # Décisions archétypales
│   └── metrics/              # Critères de succès
└── README.md        # Ce fichier
```

## Philosophie

### Séparation des responsabilités (ADR-006)

```
NIVEAU 1: POURQUOI (direction-technique)
├── Questions stratégiques
└── Pas de code

NIVEAU 2: QUOI (web-dev-process, testing-process)
├── Processus contextualisés
└── Pas de code

NIVEAU 3: COMMENT (frontend, backend, wordpress, etc.)
├── Implémentation concrète
└── Code réel
```

## Intégration avec des systèmes d'IA

Ce framework est conçu pour être agnostique. Pour l'intégrer avec un système d'IA spécifique :

### Claude (Anthropic)
Les skills sont automatiquement chargés par Claude Code.

### Autres systèmes
Les fichiers Markdown avec frontmatter YAML sont lisibles par tout système capable de parser ce format.

## Version

Voir `skills/VERSION` pour la version actuelle du framework.

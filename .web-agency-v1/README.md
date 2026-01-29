# Web Agency Framework

Framework agnostique de gestion d'une agence web automatisée.

## Architecture

Ce dossier contient toutes les instructions, skills et workflows indépendants de tout système d'IA spécifique.

```
.web-agency/
├── skills/          # 31 skills métier, ~900 agents
│   │
│   │  NIVEAU 1 : POURQUOI (5 directions stratégiques)
│   ├── direction-technique/     # Tech & Architecture
│   ├── direction-operations/    # Projet & Équipes
│   ├── direction-commerciale/   # Finance & Sales
│   ├── direction-marketing/     # Acquisition & Growth
│   ├── direction-artistique/    # Créatif & Brand
│   │
│   │  NIVEAU 2 : QUOI (7 skills de processus)
│   ├── web-agency/              # Routage des demandes
│   ├── project-management/      # Planning, coordination
│   ├── lead-dev/                # Coordination équipe dev
│   ├── web-dev-process/         # Méthodologie développement
│   ├── testing-process/         # Stratégie tests
│   ├── client-intake/           # Qualification besoins
│   ├── task-orchestrator/       # Priorisation et distribution
│   │
│   │  NIVEAU 3 : COMMENT (19 skills d'implémentation)
│   ├── frontend-developer/      # Code frontend
│   ├── backend-developer/       # Code backend
│   ├── devops/                  # CI/CD, infrastructure
│   ├── react-expert/            # Code React
│   ├── nextjs-expert/           # Code Next.js
│   ├── wordpress-gutenberg-expert/ # Code WordPress
│   ├── design-system-foundations/  # Design tokens
│   ├── ux-ui-design/            # Maquettes, prototypes
│   ├── seo-expert/              # SEO et référencement
│   ├── paid-media/              # Publicité payante (SEA, Social Ads)
│   ├── marketing-analytics/     # Data et attribution marketing
│   ├── customer-success/        # Fidélisation, rétention
│   ├── content-marketing/       # Contenu et social media
│   ├── marketing-ops/           # Campagnes, automation
│   ├── legal-compliance/        # RGPD, conformité
│   ├── support-client/          # Tickets, FAQ
│   ├── commercial-crm/          # Pipeline, CRM
│   ├── finance-analytics/       # Facturation, KPIs
│   ├── content-management/      # Contenu éditorial
│   └── ddd/                     # Domain-Driven Design
│
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
┌─────────────────────────────────────────────────────────────────────────┐
│  NIVEAU 1 : POURQUOI (5 directions stratégiques)                        │
│                                                                         │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐       │
│  │ direction-  │ │ direction-  │ │ direction-  │ │ direction-  │       │
│  │ technique   │ │ operations  │ │ commerciale │ │ marketing   │       │
│  └─────────────┘ └─────────────┘ └─────────────┘ └─────────────┘       │
│                        ┌─────────────┐                                  │
│                        │ direction-  │                                  │
│                        │ artistique  │                                  │
│                        └─────────────┘                                  │
│  → Décisions stratégiques, pas de code                                  │
├─────────────────────────────────────────────────────────────────────────┤
│  NIVEAU 2 : QUOI (7 skills de processus)                                │
│                                                                         │
│  web-agency, project-management, lead-dev, web-dev-process,             │
│  testing-process, client-intake, task-orchestrator                      │
│                                                                         │
│  → Processus et coordination, pas de code                               │
├─────────────────────────────────────────────────────────────────────────┤
│  NIVEAU 3 : COMMENT (19 skills d'implémentation)                        │
│                                                                         │
│  frontend-developer, backend-developer, devops, react-expert,           │
│  nextjs-expert, wordpress-gutenberg-expert, design-system-foundations,  │
│  ux-ui-design, seo-expert, paid-media, marketing-analytics,             │
│  customer-success, content-marketing, marketing-ops, legal-compliance,  │
│  support-client, commercial-crm, finance-analytics, content-management, │
│  ddd                                                                    │
│                                                                         │
│  → Code réel et livrables concrets                                      │
└─────────────────────────────────────────────────────────────────────────┘
```

## Intégration avec des systèmes d'IA

Ce framework est conçu pour être agnostique. Pour l'intégrer avec un système d'IA spécifique :

### Claude (Anthropic)
Les skills sont automatiquement chargés par Claude Code.

### Autres systèmes
Les fichiers Markdown avec frontmatter YAML sont lisibles par tout système capable de parser ce format.

## Version

Voir `skills/VERSION` pour la version actuelle du framework.

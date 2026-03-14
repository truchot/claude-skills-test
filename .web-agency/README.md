# Web Agency Framework

Framework agnostique de gestion d'une agence web automatisée.

## Architecture

Ce dossier contient toutes les instructions, skills et workflows indépendants de tout système d'IA spécifique.

```
.web-agency/
├── skills/          # 35 skills métier, ~950 agents
│   │
│   │  ENTRÉE (3 skills d'accueil et routage)
│   ├── client-intake/           # Qualification besoins
│   ├── web-agency/              # Routage des demandes
│   ├── task-orchestrator/       # Priorisation et distribution
│   │
│   │  STRATÉGIE (5 directions stratégiques)
│   ├── direction-technique/     # Tech & Architecture
│   ├── direction-operations/    # Projet & Équipes
│   ├── direction-commerciale/   # Finance & Sales
│   ├── direction-marketing/     # Acquisition & Growth
│   ├── direction-artistique/    # Créatif & Brand
│   │
│   │  PROCESSUS (5 skills de processus)
│   ├── project-management/      # Planning, coordination
│   ├── lead-dev/                # Coordination équipe dev
│   ├── web-dev-process/         # Méthodologie développement
│   ├── testing-process/         # Stratégie tests
│   ├── experience-client/       # Parcours et satisfaction client
│   │
│   │  IMPLÉMENTATION (21 skills d'implémentation)
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
│   ├── ai-integration/          # Intégration IA
│   ├── legacy-modernization/    # Modernisation legacy
│   ├── security-expert/         # Sécurité applicative
│   │
│   │  TRANSVERSE (1 skill transversal)
│   └── ddd/                     # Domain-Driven Design
│
├── learnings/       # Système de learning loop
│   ├── patterns/             # Solutions réutilisables
│   ├── anti-patterns/        # Erreurs à éviter
│   ├── decisions/            # Décisions archétypales
│   └── metrics/              # Critères de succès
└── README.md        # Ce fichier
```

## Terminologie

Ce framework est bilingue (français pour le contenu, anglais pour les identifiants techniques). Voir :

- [**Glossaire officiel**](./GLOSSAIRE.md) — termes canoniques, synonymes, guide par profil
- [ADR-007](./learnings/decisions/ADR-007-naming-conventions.md) — conventions de nommage FR/EN

## Philosophie

### Séparation des responsabilités (ADR-006)

```
┌─────────────────────────────────────────────────────────────────────────┐
│  ENTRÉE (3 skills d'accueil et routage)                                 │
│                                                                         │
│  client-intake, web-agency, task-orchestrator                           │
│                                                                         │
│  → Qualification, routage et priorisation des demandes                  │
├─────────────────────────────────────────────────────────────────────────┤
│  STRATÉGIE (5 directions stratégiques)                                  │
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
│  PROCESSUS (5 skills de processus)                                      │
│                                                                         │
│  project-management, lead-dev, web-dev-process, testing-process,        │
│  experience-client                                                      │
│                                                                         │
│  → Processus et coordination, pas de code                               │
├─────────────────────────────────────────────────────────────────────────┤
│  IMPLÉMENTATION (21 skills d'implémentation)                            │
│                                                                         │
│  frontend-developer, backend-developer, devops, react-expert,           │
│  nextjs-expert, wordpress-gutenberg-expert, design-system-foundations,  │
│  ux-ui-design, seo-expert, paid-media, marketing-analytics,             │
│  customer-success, content-marketing, marketing-ops, legal-compliance,  │
│  support-client, commercial-crm, finance-analytics, content-management, │
│  ai-integration, legacy-modernization, security-expert                  │
│                                                                         │
│  → Code réel et livrables concrets                                      │
├─────────────────────────────────────────────────────────────────────────┤
│  TRANSVERSE (1 skill transversal)                                       │
│                                                                         │
│  ddd                                                                    │
│                                                                         │
│  → Méthodologies applicables à tous les niveaux                         │
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

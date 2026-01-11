# Web Agency Framework

Framework agnostique de gestion d'une agence web automatisée.

> **Note**: Ce framework est indépendant de tout système d'IA spécifique. Les instructions sont stockées dans `.web-agency/` au format Markdown avec frontmatter YAML.

## Philosophie

> **Les skills exécutent, web-agency orchestre, les humains supervisent.**

```
CLIENT
   │
   ▼
┌─────────────────────────────────────────────────────┐
│              WEB-AGENCY (orchestrateur)             │
│                                                     │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐            │
│  │ project- │ │technical │ │ strategy │ ...        │
│  │management│ │          │ │          │            │
│  └──────────┘ └──────────┘ └──────────┘            │
└─────────────────────────────────────────────────────┘
   │
   ▼
HUMAIN (supervision)
```

## Skills Disponibles

### Orchestrateur

| Skill | Description | Version |
|-------|-------------|---------|
| [web-agency](.web-agency/skills/web-agency/) | Méta-orchestrateur - compose les skills métiers | 2.0.0 |

### Skills Métiers

| Skill | Description | Agents | Statut |
|-------|-------------|--------|--------|
| [project-management](.web-agency/skills/project-management/) | Gestion de projet & relation client | 24 | 🟢 Actif |
| [technical](.web-agency/skills/technical/) | Pont métier → développement | 6 | 🟢 Actif |
| [marketing](.web-agency/skills/marketing/) | Marketing digital (SEO complet, SEA, Social, Email, Analytics, Fidélisation) | 115 | 🟢 Actif |
| [strategy](.web-agency/skills/strategy/) | Stratégie & conseil | - | 🔴 Planifié |
| [design](.web-agency/skills/design/) | Design & création graphique | - | 🔴 Planifié |
| [content](.web-agency/skills/content/) | Contenu & rédaction | - | 🔴 Planifié |

### Skills Techniques

| Skill | Description | Agents | Statut |
|-------|-------------|--------|--------|
| [web-dev-process](.web-agency/skills/web-dev-process/) | Process de développement (7 phases) | 61 | 🟢 Actif |
| [wordpress-gutenberg-expert](.web-agency/skills/wordpress-gutenberg-expert/) | Implémentation WordPress | 41 | 🟢 Actif |
| [design-system-foundations](.web-agency/skills/design-system-foundations/) | Design System - Atomic Design industriel | 21 | 🟢 Actif |
| [frontend-developer](.web-agency/skills/frontend-developer/) | Développement front-end moderne | 33 | 🟢 Actif |
| [react-expert](.web-agency/skills/react-expert/) | Expert React - hooks, components, state | 28 | 🟢 Actif |
| [backend-developer](.web-agency/skills/backend-developer/) | Backend - APIs, databases, architecture, DevOps | 38 | 🟢 Actif |

## Architecture

```
.web-agency/skills/
│
├── web-agency/                    # ORCHESTRATEUR (compose les skills)
│   └── SKILL.md
│
├── project-management/            # Skill métier : Gestion de projet
│   ├── SKILL.md
│   ├── avant-projet/              # 7 agents
│   ├── pilotage/                  # 5 agents
│   ├── communication/             # 6 agents
│   ├── livraison/                 # 4 agents
│   ├── facturation/               # 2 agents
│   └── templates/                 # 8 templates
│
├── technical/                     # Skill métier : Technique
│   ├── SKILL.md
│   └── *.md                       # 6 agents
│
├── strategy/                      # Skill métier : Stratégie (planifié)
├── design/                        # Skill métier : Design (planifié)
├── content/                       # Skill métier : Contenu (planifié)
├── marketing/                     # Skill métier : Marketing (planifié)
│
├── web-dev-process/               # Skill technique : Process dev
│   ├── SKILL.md
│   └── agents/                    # 61 agents (7 phases)
│
├── wordpress-gutenberg-expert/    # Skill technique : WordPress
│   ├── SKILL.md
│   └── agents/                    # 41 agents (6 domaines)
│
├── design-system-foundations/     # Skill technique : Design System
│   ├── SKILL.md
│   ├── agents/                    # 21 agents (4 niveaux Atomic Design)
│   │   ├── foundations/           # Colors, Typography, Spacing, Shadows
│   │   ├── atoms/                 # Buttons, Inputs, Labels, Icons, Badges
│   │   ├── molecules/             # Forms, Cards, Navigation, Modals, Alerts
│   │   └── templates/             # Hero, Layouts, Pages
│   └── docs/                      # 7 guides (a11y, testing, dark mode, etc.)
│
└── backend-developer/             # Skill technique : Backend Development
    ├── SKILL.md
    ├── agents/                    # 38 agents (7 domaines)
    │   ├── api/                   # REST, GraphQL, OpenAPI, validation
    │   ├── database/              # Modeling, migrations, queries, NoSQL
    │   ├── auth-security/         # JWT, OAuth, OWASP, cryptography
    │   ├── architecture/          # Patterns, microservices, DDD
    │   ├── performance/           # Caching, profiling, optimization
    │   ├── testing/               # Unit, integration, API tests
    │   └── devops/                # CI/CD, Docker, Kubernetes
    └── tests/                     # Validation tests
```

## Composition des Skills

### Hiérarchie

```
web-agency (orchestrateur)
    │
    ├── project-management (24 agents)
    │
    ├── technical (6 agents)
    │   │
    │   ├── web-dev-process (61 agents)
    │   │
    │   ├── wordpress-gutenberg-expert (41 agents)
    │   │
    │   ├── design-system-foundations (21 agents)
    │   │
    │   ├── backend-developer (38 agents)
    │   │
    │   └── frontend-developer (33 agents)
    │       │
    │       ├── react-expert (28 agents) ← délégation
    │       │
    │       └── wordpress-gutenberg-expert (41 agents) ← délégation
    │
    ├── strategy (planifié)
    ├── design (planifié)
    ├── content (planifié)
    └── marketing (planifié)
```

### Workflow type : Nouveau projet

```
1. project-management  → Brief, estimation, proposition
2. strategy            → Audit, benchmark, recommandations
3. design              → DA, maquettes
   └── design-system-foundations → Tokens, composants, guidelines
4. content             → Arborescence, contenus
5. technical           → Specs, estimation technique
   └── web-dev-process → Setup, dev, test, deploy
   └── wordpress-*     → Si projet WordPress
6. project-management  → Pilotage, livraison, facturation
7. marketing           → Lancement, acquisition
```

## Installation

```bash
# Cloner le repository
git clone https://github.com/truchot/claude-skills-test.git

# Les skills sont automatiquement disponibles dans Claude Code
```

## Utilisation

### Exemples de requêtes

```
# Orchestration
"J'ai un nouveau projet de site e-commerce WordPress"
→ web-agency compose : project-management + technical + wordpress-gutenberg-expert

# Gestion de projet
"Aide-moi à rédiger un brief client"
→ project-management/avant-projet

# Technique
"Quelle stack pour ce projet ?"
→ technical/selection-stack

# WordPress
"Comment créer un block Gutenberg ?"
→ wordpress-gutenberg-expert/gutenberg-blocks

# Design System
"Crée une palette de couleurs WCAG AA"
→ design-system-foundations/foundations/colors

"Comment structurer mes boutons avec BEM ?"
→ design-system-foundations/atoms/buttons

# Backend
"Comment concevoir une API REST pour les utilisateurs ?"
→ backend-developer/api/rest-design

"Mes requêtes SQL sont lentes, comment optimiser ?"
→ backend-developer/database/optimization
```

## Tests

```bash
# Tests par skill
cd .web-agency/skills/web-agency/tests && bash run-tests.sh
cd .web-agency/skills/web-dev-process/tests && bash run-tests.sh
cd .web-agency/skills/wordpress-gutenberg-expert/tests && bash run-tests.sh
cd .web-agency/skills/frontend-developer/tests && node validate-skill.test.js
cd .web-agency/skills/react-expert/tests && node validate-skill.test.js
cd .web-agency/skills/backend-developer/tests && bash run-tests.sh
```

## Principes de Conception

1. **Modularité** : Chaque skill est autonome et réutilisable
2. **Composition** : Les skills se combinent pour des workflows complexes
3. **Supervision humaine** : Validation humaine à chaque étape
4. **Single Responsibility** : Un agent = une responsabilité
5. **Traçabilité** : Historique des décisions

## Roadmap

### Skills actifs
- [x] web-agency (orchestrateur v2.0.0)
- [x] project-management (24 agents)
- [x] technical (6 agents)
- [x] web-dev-process (61 agents)
- [x] wordpress-gutenberg-expert (41 agents)
- [x] design-system-foundations (21 agents)
- [x] frontend-developer (33 agents)
- [x] react-expert (28 agents)
- [x] backend-developer (38 agents)
- [x] marketing (115 agents) - SEO complet + Fidélisation SRP (25 agents)

### Skills planifiés
- [ ] strategy
- [ ] design
- [ ] content

### Infrastructure
- [x] Tests web-agency
- [x] Tests web-dev-process
- [x] Tests wordpress-gutenberg-expert
- [x] Tests frontend-developer
- [x] Tests react-expert
- [x] Tests backend-developer
- [x] CI/CD workflows

## Licence

MIT - Voir [LICENSE](LICENSE)

## Ressources

- [Documentation Claude Code](https://docs.anthropic.com/claude-code)
- [WordPress Developer Resources](https://developer.wordpress.org/)
- [Atomic Design by Brad Frost](https://atomicdesign.bradfrost.com/)

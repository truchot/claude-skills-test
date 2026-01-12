# Configuration Claude

Ce dossier contient les commandes spécifiques à Claude Code.

## Structure

```
.claude/
├── commands/              # 4 commandes intelligentes
│   ├── tech.md            # Technique (routage intelligent)
│   ├── design.md          # Design (UX/UI/DA)
│   ├── marketing.md       # Marketing
│   └── project.md         # Gestion de projet
├── commands-archive/      # Anciennes commandes (référence)
├── tests/                 # Tests de validation
└── README.md              # Ce fichier
```

## Commandes Disponibles

### `/tech` - Technique
Point d'entrée technique unifié qui route vers le bon agent selon le contexte:
- **Niveau 2**: direction-technique (architecture, vision)
- **Niveau 3**: lead-dev, devops, testing-process (coordination)
- **Niveau 4**: frontend, backend, react, nextjs, wordpress (implémentation)

```
/tech optimiser les performances
/tech architecture microservices
/tech créer composant Button
```

### `/design` - Design
Point d'entrée design avec routage stratégie/exécution:
- **Niveau 2**: direction-artistique (branding, vision créative)
- **Niveau 3**: ux-ui-design (wireframes, prototypes)
- **Niveau 4**: design-system-foundations (composants, tokens)

```
/design refonte identité visuelle
/design wireframe page checkout
/design créer composant Card
```

### `/marketing` - Marketing
Point d'entrée marketing avec routage stratégie/exécution:
- **Niveau 2**: direction-marketing (stratégie, positionnement)
- **Niveau 3**: marketing (SEO, content, campagnes)

```
/marketing stratégie acquisition B2B
/marketing audit SEO technique
```

### `/project` - Projet
Point d'entrée pour la visibilité et coordination:
- project-management (suivi, planning)
- web-agency (orchestration globale)
- task-orchestrator (découpage tâches)

```
/project état du projet Alpha
/project prioriser les initiatives Q1
```

## Architecture

```
.claude/               # Interface Claude (4 commandes)
    │
    └── référence →
                      .web-agency/        # Framework agnostique
                      ├── skills/         # 24 skills, 757 agents
                      └── learnings/      # Learning loop
```

Les commandes analysent le contexte et routent vers les skills appropriés dans `.web-agency/`.

## Anciennes Commandes

Les 23 commandes granulaires ont été archivées dans `commands-archive/` pour référence.
Elles peuvent être restaurées si nécessaire.

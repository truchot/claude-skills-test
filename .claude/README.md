# Configuration Claude

Ce dossier contient les commandes spécifiques à Claude Code.

## Structure

```
.claude/
├── commands/              # 3 commandes intelligentes
│   ├── t.md               # Technique (routage intelligent)
│   ├── marketing.md       # Marketing
│   └── project.md         # Gestion de projet
├── commands-archive/      # Anciennes commandes (référence)
├── tests/                 # Tests de validation
└── README.md              # Ce fichier
```

## Commandes Disponibles

### `/t` - Technique
Point d'entrée technique unifié qui route vers le bon agent selon le contexte:
- **Niveau 2**: direction-technique (architecture, vision)
- **Niveau 3**: lead-dev, devops, testing-process (coordination)
- **Niveau 4**: frontend, backend, react, nextjs, wordpress (implémentation)

```
/t optimiser les performances
/t architecture microservices
/t créer composant Button
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
.claude/               # Interface Claude (3 commandes)
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

# Architecture Decouplée - Skills Agnostiques

## Vue d'ensemble

Cette architecture découple la **définition des skills/agents** (valeur métier) de leur **implémentation pour une plateforme IA** spécifique.

```
┌─────────────────────────────────────────────────────────────────┐
│                     SOURCE DE VÉRITÉ                            │
│                                                                 │
│   .web-agency/                                                  │
│   ├── skills/          # Définitions agnostiques               │
│   ├── orchestration/   # Règles de routage                     │
│   ├── workflows/       # Workflows automatisés                 │
│   └── learnings/       # Système d'apprentissage               │
│                                                                 │
└──────────────────────────┬──────────────────────────────────────┘
                           │
                           │ Compilation
                           │
      ┌────────────────────┼────────────────────┐
      │                    │                    │
      ▼                    ▼                    ▼
┌──────────┐        ┌──────────┐        ┌──────────┐
│ .claude/ │        │ .cursor/ │        │.codeium/ │
│  Bridge  │        │  Bridge  │        │  Bridge  │
│          │        │ (futur)  │        │ (futur)  │
└──────────┘        └──────────┘        └──────────┘
```

## Avantages

| Avant (couplé) | Après (découplé) |
|----------------|------------------|
| Tout dans `.claude/skills/` | Source dans `.web-agency/` |
| Format Markdown Claude-specific | Format YAML standard |
| Duplication si autre IA | Un seul endroit à maintenir |
| Pas de validation schema | JSON Schema pour validation |
| Migration manuelle | Scripts de compilation |

## Structure détaillée

### .web-agency/ (Source)

```
.web-agency/
├── manifest.json              # Métadonnées globales
├── schemas/                   # JSON Schemas
│   ├── skill.schema.json      # Schema pour skills
│   ├── agent.schema.json      # Schema pour agents
│   └── manifest.schema.json
│
├── skills/                    # Définitions des skills
│   ├── index.json             # Registre de tous les skills
│   └── {skill-name}/
│       ├── skill.yaml         # Définition du skill
│       └── agents/
│           └── {domain}/
│               ├── orchestrator.yaml
│               └── {agent}.yaml
│
├── orchestration/             # Règles globales
│   ├── routing.yaml           # Matrice de routage
│   ├── composition.yaml       # Patterns de composition
│   └── escalation.yaml        # Règles d'escalade
│
├── workflows/                 # Workflows automatisés
│   └── {workflow}.yaml
│
├── templates/                 # Templates d'agents
│   ├── agent-pourquoi.yaml
│   ├── agent-quoi.yaml
│   └── agent-comment.yaml
│
└── learnings/                 # Système d'apprentissage
    ├── patterns/
    ├── anti-patterns/
    └── decisions/
```

### .claude/ (Bridge)

```
.claude/
├── settings.json              # Config Claude Code
├── bridge/                    # Système de compilation
│   ├── config.json            # Configuration du bridge
│   ├── compiler.js            # Script de compilation
│   ├── package.json           # Dépendances
│   └── templates/             # Templates Handlebars
│       ├── skill.md.hbs
│       └── agent.md.hbs
│
├── skills/                    # Skills COMPILÉS (généré)
│   └── {skill-name}/
│       ├── SKILL.md           # Généré depuis skill.yaml
│       └── agents/
│           └── {domain}/
│               └── {agent}.md # Généré depuis agent.yaml
│
├── commands/                  # Commandes générées
└── learnings/                 # Copie/lien vers .web-agency
```

## Formats de fichiers

### skill.yaml (Source)

```yaml
name: react-expert
description: Expert React - Hooks, composants...
version: 1.0.0
level: 4
category: implementation

philosophy:
  role: "Tu es un expert React..."
  does:
    - Hooks natifs
    - Composants fonctionnels
  doesNot:
    - Architecture globale (-> direction-technique)
    - Next.js spécifique (-> nextjs-expert)

domains:
  - name: hooks
    agents: [state-hooks, effect-hooks, orchestrator]
  - name: components
    agents: [functional, composition, orchestrator]

routing:
  keywords: [React, useState, useEffect]

composition:
  parent: frontend-developer
  peers: [nextjs-expert]

escalation:
  - target: direction-technique
    condition: Décision d'architecture
```

### agent.yaml (Source)

```yaml
name: state-hooks
description: Expert useState et useReducer
type: specialist
level: comment

role: |
  Tu es un expert en hooks d'état React.

responsibilities:
  does:
    - useState pour état simple
    - useReducer pour état complexe
  doesNot:
    - Effets de bord (-> effect-hooks)
    - State global (-> state/orchestrator)

content:
  instructions:
    - Utiliser initialisation lazy
    - Préférer useReducer pour état complexe

  examples:
    - title: useState avec lazy init
      code: |
        const [items, setItems] = useState(() =>
          expensiveComputation(data)
        );

escalation:
  - target: effect-hooks
    condition: Question sur useEffect
```

## Workflow de développement

### 1. Créer/modifier un skill

```bash
# Editer la source
vim .web-agency/skills/react-expert/skill.yaml

# Compiler vers Claude
npm run build:claude

# Ou compiler un skill spécifique
npm run build:claude -- --skill=react-expert
```

### 2. Validation

```bash
# Valider les schemas
npm run validate

# Dry-run (voir ce qui serait généré)
npm run build:claude -- --dry-run
```

### 3. Watch mode

```bash
# Recompile automatiquement sur changement
npm run build:claude -- --watch
```

## Ajout d'un nouveau bridge

Pour supporter une nouvelle plateforme IA:

1. Créer le dossier `.{platform}/`
2. Créer le bridge dans `.{platform}/bridge/`
3. Implémenter les adapteurs pour le format cible
4. Ajouter la plateforme dans `manifest.json.bridges.supported`

### Exemple: Bridge Cursor

```javascript
// .cursor/bridge/compiler.js
const { loadSkill, loadAgent } = require('../../.web-agency/lib/loader');

function compileForCursor(skillData) {
  // Transformer vers le format Cursor
  return {
    name: skillData.name,
    rules: skillData.routing.rules,
    // ...format spécifique Cursor
  };
}
```

## Migration depuis l'ancien format

### Script de migration

```bash
# Migrer tous les skills existants
npm run migrate:from-claude

# Migrer un skill spécifique
npm run migrate:from-claude -- --skill=react-expert
```

### Mapping des formats

| Ancien (.claude) | Nouveau (.web-agency) |
|------------------|----------------------|
| `SKILL.md` frontmatter | `skill.yaml` |
| `{agent}.md` | `{agent}.yaml` |
| Markdown sections | YAML properties |
| `## Tu NE fais PAS` | `responsibilities.doesNot` |
| `## Règles de Routage` | `routing.rules` |

## Bonnes pratiques

### DO

- Toujours éditer dans `.web-agency/`
- Valider avec les schemas JSON
- Committer les fichiers `.yaml` source
- Utiliser `--dry-run` avant de compiler

### DON'T

- Ne jamais éditer directement `.claude/skills/` (généré)
- Ne pas versionner les fichiers générés
- Ne pas dupliquer la logique entre bridges

## FAQ

### Pourquoi YAML plutôt que JSON?

- Plus lisible pour le contenu texte long
- Supporte les strings multilignes
- Commentaires possibles
- Standard largement adopté

### Pourquoi pas Markdown comme source?

- Difficile à parser de manière fiable
- Pas de validation schema
- Structure moins stricte
- YAML peut contenir du Markdown pour le contenu

### Comment gérer les spécificités Claude?

Les adaptations spécifiques vont dans:
- Templates Handlebars (`.claude/bridge/templates/`)
- Logique de compilation (`compiler.js`)
- Configuration (`config.json`)

### Que se passe-t-il pour les skills existants?

1. Migration automatique disponible
2. Période de transition avec les deux formats
3. À terme, seul `.web-agency/` sera maintenu

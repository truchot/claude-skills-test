# .web-agency/

Architecture de skills agnostique pour agence web IA full-automatisee.

## Philosophie

Ce dossier contient la **valeur ajoutee metier** - les definitions de skills, agents, workflows et orchestration - de maniere **independante de toute plateforme IA**.

```
.web-agency/     <- Source de verite (agnostique)
     |
     v
.claude/         <- Bridge Claude Code
.cursor/         <- Bridge Cursor (futur)
.codeium/        <- Bridge Codeium (futur)
```

## Structure

```
.web-agency/
├── manifest.json           # Metadonnees globales
├── schemas/                # JSON Schemas pour validation
│   ├── skill.schema.json   # Schema definition skill
│   ├── agent.schema.json   # Schema definition agent
│   └── manifest.schema.json
│
├── skills/                 # Definitions des skills
│   ├── index.json          # Registre de tous les skills
│   └── {skill-name}/
│       ├── skill.yaml      # Definition du skill
│       ├── agents/         # Agents du skill
│       │   └── {domain}/
│       │       ├── orchestrator.yaml
│       │       └── {agent}.yaml
│       └── tests/
│
├── orchestration/          # Regles de routage et composition
│   ├── routing.yaml        # Regles de routage globales
│   ├── composition.yaml    # Patterns de composition
│   └── escalation.yaml     # Regles d'escalade
│
├── workflows/              # Workflows automatises
│   └── {workflow}.yaml
│
├── templates/              # Templates reutilisables
│   ├── agent-pourquoi.yaml
│   ├── agent-quoi.yaml
│   └── agent-comment.yaml
│
└── learnings/              # Systeme d'apprentissage
    ├── patterns/
    ├── anti-patterns/
    └── decisions/
```

## Formats de fichiers

### skill.yaml

```yaml
name: react-expert
description: Expert React - Hooks, composants, state management
version: 1.0.0
level: 4  # Implementation
category: implementation

philosophy:
  role: "Expert en developpement React moderne"
  does:
    - "Hooks (useState, useEffect, useRef, custom)"
    - "Composants fonctionnels"
    - "State management (Context, Zustand)"
  doesNot:
    - "Architecture globale (-> direction-technique)"
    - "Choix de stack (-> direction-technique)"

domains:
  - name: hooks
    agents: [state-hooks, effect-hooks, ref-hooks, custom-hooks, orchestrator]
  - name: components
    agents: [functional, composition, forms, error-boundaries, orchestrator]

routing:
  keywords: [useState, useEffect, hook, composant react, props]

composition:
  parent: frontend-developer
  peers: [nextjs-expert, typescript-expert]
  delegates: [testing-process]
```

### agent.yaml

```yaml
name: state-hooks
description: Expert useState et useReducer
type: specialist
level: comment

role: |
  Tu es un expert en hooks d'etat React.
  Tu maitrises useState, useReducer et les patterns associes.

responsibilities:
  does:
    - useState pour etat simple
    - useReducer pour etat complexe
    - Patterns d'initialisation lazy
  doesNot:
    - Effets de bord (-> effect-hooks)
    - Refs (-> ref-hooks)
    - State global (-> state/orchestrator)

content:
  instructions:
    - "Toujours utiliser l'initialisation lazy pour les calculs couteux"
    - "Preferer useReducer quand l'etat a plusieurs sous-valeurs"

  examples:
    - title: "useState avec initialisation lazy"
      code: |
        const [items, setItems] = useState(() =>
          expensiveComputation(initialData)
        );

  bestPractices:
    - practice: "Utiliser initialisation lazy"
      instead: "useState(expensiveComputation())"
      reason: "Evite le recalcul a chaque render"

escalation:
  - condition: "Question sur useEffect"
    target: "effect-hooks"
  - condition: "Question sur architecture etat global"
    target: "state/orchestrator"
```

## Utilisation

### Validation

```bash
# Valider tous les skills
npm run validate

# Valider un skill specifique
npm run validate -- --skill=react-expert
```

### Compilation vers une plateforme

```bash
# Generer pour Claude
npm run build:claude

# Generer pour Cursor
npm run build:cursor
```

### Migration depuis l'ancien format

```bash
# Migrer depuis .claude/skills/
npm run migrate:from-claude
```

## Avantages

1. **Portabilite** - Meme definition, multiple plateformes
2. **Validation** - Schemas JSON stricts
3. **Maintenance** - Source unique de verite
4. **Evolutivite** - Ajout de nouveaux bridges sans toucher au contenu
5. **Testabilite** - Tests independants de la plateforme

## Bridges disponibles

| Bridge | Status | Description |
|--------|--------|-------------|
| `.claude/` | Actif | Claude Code / Claude Agent SDK |
| `.cursor/` | Prevu | Cursor AI |
| `.codeium/` | Prevu | Codeium / Windsurf |

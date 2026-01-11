# Claude Bridge

Ce dossier contient le **pont** entre l'architecture agnostique `.web-agency/` et le format specifique Claude Code.

## Architecture

```
.web-agency/              # Source (agnostique)
     |
     v
.claude/bridge/           # Transformation
     |
     v
.claude/skills/           # Output (format Claude)
.claude/commands/         # Commandes Claude generees
```

## Fonctionnement

### 1. Lecture des sources

Le compilateur lit les fichiers YAML/JSON de `.web-agency/`:
- `skills/{name}/skill.yaml` -> Definition du skill
- `skills/{name}/agents/**/*.yaml` -> Agents
- `orchestration/*.yaml` -> Regles de routage

### 2. Transformation

Les adapteurs transforment vers le format Claude:
- `skill.yaml` -> `SKILL.md` (format Markdown avec frontmatter)
- `agent.yaml` -> `{agent}.md` (format agent Claude)
- `routing.yaml` -> `settings.json` (configuration skills)

### 3. Generation

Les fichiers sont generes dans:
- `.claude/skills/{name}/` - Skills compiles
- `.claude/commands/{name}.md` - Commandes associees

## Utilisation

```bash
# Compiler tous les skills
npm run build:claude

# Compiler un skill specifique
npm run build:claude -- --skill=react-expert

# Mode watch (recompile automatiquement)
npm run build:claude -- --watch

# Validation sans ecriture
npm run build:claude -- --dry-run
```

## Adapteurs

### SkillAdapter

Transforme `skill.yaml` en `SKILL.md`:

| Source (YAML) | Destination (Markdown) |
|---------------|------------------------|
| `name` | Frontmatter `name` |
| `description` | Frontmatter `description` |
| `version` | Frontmatter `version` |
| `philosophy.does` | Section "Ce que fait ce skill" |
| `philosophy.doesNot` | Section "Tu NE fais PAS" |
| `domains` | Section "Architecture" |
| `routing` | Section "Regles de Routage" |
| `escalation` | Section "Escalade" |

### AgentAdapter

Transforme `agent.yaml` en `{agent}.md`:

| Source (YAML) | Destination (Markdown) |
|---------------|------------------------|
| `name` | Frontmatter `name` |
| `role` | Section "Role" |
| `responsibilities.does` | Liste des responsabilites |
| `responsibilities.doesNot` | Section "Tu NE fais PAS" |
| `content.instructions` | Contenu principal |
| `content.examples` | Section "Exemples" |
| `content.bestPractices` | Tableau best practices |
| `escalation` | Section "Escalade" |

## Templates

Les templates Handlebars sont dans `templates/`:
- `skill.md.hbs` - Template pour SKILL.md
- `agent.md.hbs` - Template pour agents
- `orchestrator.md.hbs` - Template pour orchestrators
- `command.md.hbs` - Template pour commandes

## Configuration

`config.json` contient:
- Chemins source/destination
- Options de compilation
- Mapping des types

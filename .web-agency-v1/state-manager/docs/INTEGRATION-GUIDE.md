# Guide d'intégration - StateManager sur projet existant

Ce guide explique comment brancher le StateManager sur un projet où Claude a déjà travaillé et comment récupérer l'historique des sessions.

## Le problème

Claude ne persiste pas nativement ses sessions de travail. Chaque conversation est éphémère. Cependant, les **traces** du travail existent :

| Source | Ce qu'on peut récupérer |
|--------|------------------------|
| **Git history** | Commits, branches, auteurs, dates, fichiers modifiés |
| **Branches claude/** | Sessions Claude identifiables par le pattern de nommage |
| **GitHub PRs** | Pull requests avec descriptions et discussions |
| **Fichiers projet** | Structure, dates de modification |

## Solution 1 : Import depuis l'historique Git

### Étape 1 : Installation

```bash
cd .web-agency/state-manager
npm install
```

### Étape 2 : Import de l'historique

```bash
# Import complet
npm run import:git -- \
  --project-name "Mon Projet" \
  --client-name "Nom Client" \
  --client-email "client@example.com"

# Import depuis une date spécifique
npm run import:git -- \
  --project-name "Mon Projet" \
  --client-name "Client" \
  --client-email "client@example.com" \
  --since "2024-01-01"

# Import d'une branche spécifique
npm run import:git -- \
  --project-name "Feature X" \
  --client-name "Client" \
  --client-email "client@example.com" \
  --branch "claude/feature-x-abc123"
```

### Ce qui est importé automatiquement

L'importer analyse le Git et crée :

1. **Un projet** avec le statut déduit des derniers commits
2. **Des événements** pour chaque commit (timeline complète)
3. **Des tâches** inférées des commits `feat:` et `fix:`
4. **Des sessions Claude** détectées via les branches `claude/*`

### Exemple de sortie

```
╔══════════════════════════════════════════════════════════════╗
║           Git History Importer v1.0.0                        ║
╚══════════════════════════════════════════════════════════════╝

📁 Project root: /home/user/mon-projet
💾 Data directory: /home/user/mon-projet/.project

🔍 Analyzing git history...
   Found 45 branches
   Found 230 commits
   Detected 12 Claude sessions

📦 Creating project...
📝 Importing commits as events...

╔══════════════════════════════════════════════════════════════╗
║                    IMPORT COMPLETE                           ║
╚══════════════════════════════════════════════════════════════╝

  Project ID:      a1b2c3d4-...
  Commits:         230
  Events created:  242
  Tasks inferred:  45
  Claude sessions: 12

  Detected Claude Sessions:
    1. claude/add-auth-feature-XyZ12
       15 commits (2024-01-15 - 2024-01-16)
    2. claude/fix-api-bugs-AbC34
       8 commits (2024-01-20 - 2024-01-20)
    ...
```

## Solution 2 : Logger les futures sessions

### Option A : Manuellement via CLI

Au **début** de chaque session Claude :
```bash
npm run session:start -- --project <project-id> --skill lead-dev --description "Implementing feature X"
```

Pendant la session, logger les actions importantes :
```bash
npm run session:log -- --project <id> --type skill_invoked --description "Analyzed codebase structure"
npm run session:log -- --project <id> --type task_completed --description "Fixed authentication bug"
```

À la **fin** :
```bash
npm run session:end -- --project <id> --summary "Completed authentication feature"
```

### Option B : Intégrer dans les Skills/Commands

Ajouter dans vos commandes Claude (`.claude/commands/*.md`) :

```markdown
## Instructions de session

Avant de commencer le travail, exécute :
\`\`\`bash
cd .web-agency/state-manager && npm run session:start -- --project <PROJECT_ID> --skill <SKILL_NAME>
\`\`\`

À la fin de la session, exécute :
\`\`\`bash
npm run session:end -- --project <PROJECT_ID>
\`\`\`
```

### Option C : Hook automatique (avancé)

Créer un hook Git post-commit qui log automatiquement :

```bash
# .git/hooks/post-commit
#!/bin/bash
cd .web-agency/state-manager
npm run session:log -- \
  --project "$(cat .project/current-project-id 2>/dev/null || echo 'default')" \
  --type custom \
  --description "Commit: $(git log -1 --format='%s')"
```

## Solution 3 : Initialisation manuelle

Si vous préférez créer le state manuellement :

```bash
# 1. Créer le projet
npm run start -- create \
  --name "Mon Projet Existant" \
  --client "Client Name" \
  --email "client@example.com" \
  --description "Projet migré depuis historique"

# 2. Récupérer l'ID
npm run start -- list

# 3. Ajouter des tâches historiques
npm run start -- task add --project <id> --title "Feature auth implémentée"
npm run start -- task update --project <id> --id <task-id> --status done

# 4. Logger des événements importants
npm run start -- event --project <id> --type milestone_reached --title "v1.0 released"
```

## Structure des données récupérées

Après import, voici ce que vous trouverez dans `.project/` :

```
.project/
├── projects.json          # Données principales
├── current-session.json   # Session active (si en cours)
├── sessions/              # Archive des sessions terminées
│   ├── session-xxx.json
│   └── session-yyy.json
└── schema.json            # Schéma de validation
```

### Format d'un projet importé

```json
{
  "id": "uuid",
  "name": "Mon Projet",
  "status": "development",
  "client": { "name": "...", "email": "..." },
  "phases": [
    { "name": "Intake & Discovery", "progress": 100 },
    { "name": "Development", "progress": 60 }
  ],
  "tasks": [
    { "title": "feat: add auth", "status": "done" }
  ],
  "events": [
    { "type": "custom", "title": "[abc123] feat: add authentication" },
    { "type": "milestone_reached", "title": "Claude Session: add auth feature" }
  ],
  "metrics": {
    "overallProgress": 45,
    "healthScore": 85,
    "riskLevel": "low"
  }
}
```

## Bonnes pratiques

### 1. Un projet = un repo (ou une branche majeure)

```bash
# Pour un monorepo avec plusieurs projets
npm run import:git -- --project-name "App Mobile" --branch "main"
npm run import:git -- --project-name "API Backend" --branch "api-main"
```

### 2. Utiliser les tags pour les milestones

```bash
# Les tags Git sont détectés comme milestones
git tag -a v1.0.0 -m "First release"
```

### 3. Nommer les branches Claude de manière descriptive

Format recommandé : `claude/<action>-<description>-<sessionId>`

Exemples :
- `claude/implement-auth-feature-XyZ12`
- `claude/fix-api-performance-AbC34`
- `claude/refactor-database-layer-DeF56`

### 4. Synchroniser régulièrement

```bash
# Réimporter pour synchroniser (additionnel, pas d'écrasement)
npm run import:git -- --project-name "Mon Projet" --since "2024-02-01"
```

## Limitations

| Limitation | Workaround |
|------------|------------|
| Pas de contenu des conversations | Utiliser les descriptions de commit |
| Sessions non-git perdues | Logger manuellement les sessions futures |
| Pas de timeline précise | Se baser sur les timestamps des commits |
| Assignation skills approximative | Affiner manuellement via `task update` |

## FAQ

**Q: Puis-je réimporter sans perdre les données manuelles ?**
R: L'import crée un nouveau projet à chaque fois. Pour merger, utilisez `--since` pour n'importer que les nouveaux commits.

**Q: Comment lier plusieurs repos à un même projet ?**
R: Créez un projet par repo, puis utilisez les tags pour les identifier.

**Q: Les sessions GitHub Copilot sont-elles détectées ?**
R: Non, seulement les branches avec le pattern `claude/*`. Vous pouvez adapter l'importer pour d'autres patterns.

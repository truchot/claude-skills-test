# Claude Code Hooks - Session Tracking

Ce dossier contient les hooks Claude Code pour le tracking automatique des sessions de travail.

## Fonctionnement

```
┌─────────────────────────────────────────────────────────────────┐
│                     Claude Code Session                          │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│   [Démarrage]                                                    │
│       │                                                          │
│       ▼                                                          │
│   PreToolUse Hook ──► Auto-start session si pas active           │
│       │                                                          │
│       ▼                                                          │
│   [Travail: Bash, Edit, Write, Read, etc.]                      │
│       │                                                          │
│       ▼                                                          │
│   PostToolUse Hook ──► Log chaque outil utilisé                 │
│       │               ──► Comptabilise les actions               │
│       │                                                          │
│       ▼                                                          │
│   [Fin de session]                                               │
│       │                                                          │
│       ▼                                                          │
│   Stop Hook ──► Archive la session                              │
│             ──► Calcule durée et stats                          │
│             ──► Sauvegarde dans .project/sessions/              │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

## Configuration

Les hooks sont configurés dans `.claude/settings.json` :

```json
{
  "hooks": {
    "PreToolUse": [...],   // Avant chaque outil
    "PostToolUse": [...],  // Après chaque outil
    "Stop": [...]          // Fin de session Claude
  }
}
```

## Scripts disponibles

### session-tracker.sh

Script principal pour le tracking des sessions.

```bash
# Démarrer une session manuellement
.claude/hooks/session-tracker.sh start [project_id] [description]

# Logger une action
.claude/hooks/session-tracker.sh tool_use <tool_name>

# Terminer la session
.claude/hooks/session-tracker.sh end [summary]

# Voir le statut
.claude/hooks/session-tracker.sh status
```

## Données générées

### Session active : `.project/current-session.json`

```json
{
  "sessionId": "session-1704067200-a1b2c3",
  "projectId": "uuid-du-projet",
  "startTime": "2024-01-01T10:00:00+00:00",
  "branch": "claude/feature-xyz",
  "description": "Claude Code session",
  "actions": [
    { "timestamp": "...", "type": "tool_use", "tool": "Bash" },
    { "timestamp": "...", "type": "tool_use", "tool": "Edit" }
  ],
  "toolUsage": {
    "Bash": 5,
    "Edit": 12,
    "Write": 3,
    "Read": 8
  }
}
```

### Sessions archivées : `.project/sessions/session-xxx.json`

Même structure + :
```json
{
  "endTime": "2024-01-01T12:30:00+00:00",
  "summary": "Session completed",
  "durationMinutes": 150
}
```

### Log d'activité : `.project/hook-activity.log`

```
[2024-01-01 10:00:00] Session started: session-xxx (project: uuid, branch: main)
[2024-01-01 10:05:00] Tool used: Bash
[2024-01-01 10:06:00] Tool used: Read
[2024-01-01 12:30:00] Session ended: Completed feature X
```

## Intégration avec StateManager

Les sessions trackées peuvent être importées dans le StateManager :

```bash
# Les sessions sont automatiquement liées au projet via projectId
cd .web-agency/state-manager
npm run start -- show --id <project-id>
```

## Dépendances

- `bash` (v4+)
- `python3` (pour manipulation JSON)
- `git` (pour détection de branche)

## Désactiver le tracking

Pour désactiver temporairement, renommer ou supprimer `.claude/settings.json`.

Pour désactiver définitivement, supprimer la section `hooks` du fichier.

## Troubleshooting

### Les hooks ne s'exécutent pas

1. Vérifier que le script est exécutable :
   ```bash
   chmod +x .claude/hooks/session-tracker.sh
   ```

2. Vérifier la syntaxe de settings.json :
   ```bash
   cat .claude/settings.json | python3 -m json.tool
   ```

### Pas de projet ID

Créer d'abord un projet :
```bash
cd .web-agency/state-manager
npm run start -- create --name "Mon Projet" --client "Client" --email "x@y.com"
```

### Sessions non archivées

Vérifier que le dossier `.project/` est writable et que python3 est disponible.

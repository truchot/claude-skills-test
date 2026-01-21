# State Management

Gestion de l'état de l'orchestrateur et des workflows.

## Fichiers

```
state/
├── README.md           ← Ce fichier
├── current.json        ← État de la session courante
└── history/            ← Historique des sessions (optionnel)
```

## current.json

État temps réel de la session de travail.

### Structure

```json
{
  "version": "1.0",
  "initialized_at": "2024-01-15T10:00:00Z",

  "project": {
    "id": "PRJ-001",
    "name": "Nom du projet",
    "client": "Nom client",
    "path": ".project/"
  },

  "workflow": {
    "name": "feature",
    "started_at": "2024-01-15T10:00:00Z",
    "current_step": 3,
    "total_steps": 7,
    "status": "in_progress",
    "steps": [
      {
        "name": "qualification",
        "status": "completed",
        "started_at": "...",
        "completed_at": "...",
        "output_path": ".project/..."
      },
      {
        "name": "specification",
        "status": "completed",
        "gate": "bloquante",
        "validated_at": "...",
        "output_path": ".project/04-specs/..."
      },
      {
        "name": "estimation",
        "status": "in_progress",
        "gate": "bloquante"
      }
    ]
  },

  "context": {
    "stack": ["Next.js", "TypeScript", "Prisma"],
    "loaded_contexts": ["technical.md", "security.md"],
    "key_decisions": [
      {
        "decision": "Utiliser Prisma",
        "adr": "ADR-001",
        "date": "2024-01-15"
      }
    ],
    "blockers": [],
    "notes": []
  },

  "gates_pending": [
    {
      "step": "estimation",
      "type": "bloquante",
      "waiting_for": "validation",
      "deliverable": ".project/04-specs/features/F001/estimation.md"
    }
  ],

  "updated_at": "2024-01-15T14:30:00Z"
}
```

## Cycle de vie

### 1. Initialisation

Quand l'orchestrateur démarre une session :

```json
{
  "version": "1.0",
  "initialized_at": "2024-01-15T10:00:00Z",
  "project": null,
  "workflow": null,
  "context": {}
}
```

### 2. Projet chargé

Quand un projet est identifié :

```json
{
  "project": {
    "id": "PRJ-001",
    "name": "Mon Projet",
    "client": "Client X",
    "path": ".project/"
  }
}
```

### 3. Workflow démarré

Quand un workflow commence :

```json
{
  "workflow": {
    "name": "feature",
    "started_at": "2024-01-15T10:00:00Z",
    "current_step": 1,
    "total_steps": 7,
    "status": "in_progress",
    "steps": [
      {"name": "qualification", "status": "in_progress"}
    ]
  }
}
```

### 4. Étape complétée

Quand une étape est terminée :

```json
{
  "workflow": {
    "current_step": 2,
    "steps": [
      {
        "name": "qualification",
        "status": "completed",
        "completed_at": "2024-01-15T10:30:00Z",
        "output_path": ".project/..."
      },
      {"name": "specification", "status": "in_progress"}
    ]
  }
}
```

### 5. Gate en attente

Quand une gate bloquante est atteinte :

```json
{
  "gates_pending": [
    {
      "step": "specification",
      "type": "bloquante",
      "waiting_for": "validation",
      "deliverable": ".project/04-specs/..."
    }
  ]
}
```

### 6. Workflow terminé

Quand le workflow est complet :

```json
{
  "workflow": {
    "status": "completed",
    "completed_at": "2024-01-15T16:00:00Z"
  },
  "gates_pending": []
}
```

## Opérations

### Lecture

```yaml
action: read_state
usage: Au début de chaque interaction pour récupérer le contexte
```

### Mise à jour

```yaml
action: update_state
triggers:
  - Projet identifié
  - Workflow démarré
  - Étape démarrée/complétée
  - Gate atteinte
  - Gate validée
  - Décision prise
  - Contexte chargé
```

### Reset

```yaml
action: reset_state
when:
  - Nouveau projet
  - Abandon workflow
  - Demande explicite
```

## Règles

```yaml
règles:
  - Toujours lire l'état au début
  - Mettre à jour après chaque action significative
  - Ne jamais avoir deux workflows actifs
  - Garder l'état synchronisé avec .project/state.json
  - Logger les transitions importantes

invariants:
  - Si workflow.status == "in_progress" alors gates_pending peut être non vide
  - Si gates_pending non vide alors workflow.status != "completed"
  - current_step <= total_steps
```

## Synchronisation avec .project/

L'état de l'orchestrateur (`state/current.json`) et l'état du projet (`.project/state.json`) sont liés :

| state/current.json | .project/state.json |
|--------------------|---------------------|
| Session courante | Données persistantes projet |
| Workflow en cours | Historique workflows |
| Gates pending | Décisions archivées |
| Contexte temporaire | Configuration projet |

### Sync au démarrage

1. Lire `state/current.json`
2. Si projet identifié, charger `.project/state.json`
3. Fusionner les contextes

### Sync à la fin

1. Archiver le workflow dans `.project/state.json`
2. Mettre à jour les métriques
3. Reset `state/current.json` si workflow terminé

## Persistance

### Session active

```
state/current.json  ← État en mémoire de travail
```

### Fin de session

```
.project/state.json           ← État projet mis à jour
.project/07-audit/sessions/   ← Session archivée
state/current.json            ← Reset pour prochaine session
```

## Debugging

### Vérifier l'état

```bash
cat .web-agency/state/current.json | jq
```

### Reset manuel

```bash
echo '{"version":"1.0","initialized_at":null,"project":null,"workflow":null,"context":{}}' > .web-agency/state/current.json
```

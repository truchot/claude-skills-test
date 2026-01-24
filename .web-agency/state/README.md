# State Management

Orchestrator and workflow state management.

## Files

```
state/
├── README.md           ← This file
├── schema.json         ← JSON Schema validation
├── current.json        ← Current session state
└── history/            ← Session history (optional)
```

## JSON Schema

The `schema.json` file defines the valid state structure. Use it to:
- Validate `current.json`
- Document expected types
- Generate TypeScript types if needed

```bash
# Validate with ajv (if installed)
ajv validate -s state/schema.json -d state/current.json
```

## current.json

Real-time state of the work session.

### Structure

```json
{
  "version": "1.0",
  "initialized_at": "2026-01-22T10:00:00Z",

  "project": {
    "id": "PRJ-001",
    "name": "Project name",
    "client": "Client name",
    "path": ".project/"
  },

  "workflow": {
    "name": "feature",
    "started_at": "2026-01-22T10:00:00Z",
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
        "gate": "blocking",
        "validated_at": "...",
        "output_path": ".project/04-specs/..."
      },
      {
        "name": "estimation",
        "status": "in_progress",
        "gate": "blocking"
      }
    ]
  },

  "context": {
    "stack": ["Next.js", "TypeScript", "Prisma"],
    "loaded_contexts": ["technical.md", "security.md"],
    "key_decisions": [
      {
        "decision": "Use Prisma",
        "adr": "ADR-001",
        "date": "2026-01-22"
      }
    ],
    "blockers": [],
    "notes": []
  },

  "gates_pending": [
    {
      "step": "estimation",
      "type": "blocking",
      "waiting_for": "validation",
      "deliverable": ".project/04-specs/features/F001/estimation.md"
    }
  ],

  "updated_at": "2026-01-22T14:30:00Z"
}
```

## Lifecycle

### 1. Initialization

When orchestrator starts a session:

```json
{
  "version": "1.0",
  "initialized_at": "2026-01-22T10:00:00Z",
  "project": null,
  "workflow": null,
  "context": {}
}
```

### 2. Project Loaded

When a project is identified:

```json
{
  "project": {
    "id": "PRJ-001",
    "name": "My Project",
    "client": "Client X",
    "path": ".project/"
  }
}
```

### 3. Workflow Started

When a workflow begins:

```json
{
  "workflow": {
    "name": "feature",
    "started_at": "2026-01-22T10:00:00Z",
    "current_step": 1,
    "total_steps": 7,
    "status": "in_progress",
    "steps": [
      {"name": "qualification", "status": "in_progress"}
    ]
  }
}
```

### 4. Step Completed

When a step is finished:

```json
{
  "workflow": {
    "current_step": 2,
    "steps": [
      {
        "name": "qualification",
        "status": "completed",
        "completed_at": "2026-01-22T10:30:00Z",
        "output_path": ".project/..."
      },
      {"name": "specification", "status": "in_progress"}
    ]
  }
}
```

### 5. Gate Pending

When a blocking gate is reached:

```json
{
  "gates_pending": [
    {
      "step": "specification",
      "type": "blocking",
      "waiting_for": "validation",
      "deliverable": ".project/04-specs/..."
    }
  ]
}
```

### 6. Workflow Completed

When workflow is complete:

```json
{
  "workflow": {
    "status": "completed",
    "completed_at": "2026-01-22T16:00:00Z"
  },
  "gates_pending": []
}
```

## Operations

### Read

```yaml
action: read_state
usage: At the start of each interaction to recover context
```

### Update

```yaml
action: update_state
triggers:
  - Project identified
  - Workflow started
  - Step started/completed
  - Gate reached
  - Gate validated
  - Decision made
  - Context loaded
```

### Reset

```yaml
action: reset_state
when:
  - New project
  - Workflow abandoned
  - Explicit request
```

## Rules

```yaml
rules:
  - Always read state at the beginning
  - Update after each significant action
  - Never have two active workflows
  - Keep state synchronized with .project/state.json
  - Log important transitions

invariants:
  - If workflow.status == "in_progress" then gates_pending can be non-empty
  - If gates_pending non-empty then workflow.status != "completed"
  - current_step <= total_steps
```

## Synchronization with .project/

Orchestrator state (`state/current.json`) and project state (`.project/state.json`) are linked:

| state/current.json | .project/state.json |
|--------------------|---------------------|
| Current session | Persistent project data |
| Active workflow | Workflow history |
| Pending gates | Archived decisions |
| Temporary context | Project configuration |

### Sync at Startup

1. Read `state/current.json`
2. If project identified, load `.project/state.json`
3. Merge contexts

### Sync at End

1. Archive workflow in `.project/state.json`
2. Update metrics
3. Reset `state/current.json` if workflow completed

## Persistence

### Active Session

```
state/current.json  ← Working memory state
```

### Session End

```
.project/state.json           ← Updated project state
.project/07-audit/sessions/   ← Archived session
state/current.json            ← Reset for next session
```

## Debugging

### Check State

```bash
cat .web-agency/state/current.json | jq
```

### Manual Reset

```bash
echo '{"version":"1.0","initialized_at":null,"project":null,"workflow":null,"context":{}}' > .web-agency/state/current.json
```

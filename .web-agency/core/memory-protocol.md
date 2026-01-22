# Memory Protocol

This file defines how the agency **memorizes** and **reuses** knowledge.

---

## Memory Architecture

```
memory/
├── short-term/              # Current session
│   └── current.json         # Volatile state
│
├── long-term/               # Persistent cross-sessions
│   ├── decisions.json       # Decision index (ADR, MKT, etc.)
│   ├── patterns.json        # Patterns learned from project
│   ├── errors.json          # Errors to avoid
│   └── preferences.json     # User preferences
│
└── retrieval.md             # This file (how to use)
```

---

## Short-Term Memory

### Objective
Maintain context for the **current session**.

### Content
```json
{
  "session_id": "SES-2024-001",
  "started_at": "2024-01-15T10:00:00Z",
  "workflow": {
    "name": "feature",
    "step": 3,
    "status": "in_progress"
  },
  "context": {
    "loaded_files": ["spec.md", "architecture.md"],
    "key_facts": [
      "Client: ACME Corp",
      "Stack: Next.js + Prisma",
      "Deadline: February 15"
    ],
    "decisions_this_session": ["D-001", "D-002"],
    "artifacts_created": [".project/specs/feature-x.md"]
  },
  "conversation": {
    "summary": "OAuth authentication feature development",
    "last_action": "Architecture validated",
    "pending": "Backend implementation"
  }
}
```

### Lifecycle
- **Created**: At the start of each session/workflow
- **Updated**: After each significant action
- **Archived**: At workflow end → `.project/07-audit/sessions/`
- **Reset**: New session = new state

---

## Long-Term Memory

### 1. Decisions Index (`decisions.json`)

Index of all decisions made on the project.

```json
{
  "version": "1.0",
  "project_id": "PRJ-001",
  "decisions": [
    {
      "id": "ADR-001",
      "type": "architecture",
      "title": "Use PostgreSQL",
      "date": "2024-01-10",
      "status": "accepted",
      "path": ".project/03-architecture/decisions/ADR-001.md",
      "tags": ["database", "infrastructure"],
      "summary": "PostgreSQL chosen for complex relations and JSONB"
    },
    {
      "id": "MKT-001",
      "type": "marketing",
      "title": "Content-first SEO strategy",
      "date": "2024-01-12",
      "status": "accepted",
      "path": ".project/04-specs/seo/SEO-001/decisions/MKT-001.md",
      "tags": ["seo", "content"],
      "summary": "Focus on long-form content before link building"
    }
  ]
}
```

**Usage**: Before making a decision, check if a similar decision exists.

### 2. Patterns (`patterns.json`)

Project-specific patterns learned.

```json
{
  "version": "1.0",
  "patterns": {
    "code": [
      {
        "id": "PAT-001",
        "name": "API Response Format",
        "description": "Standard format for API responses",
        "example": "{ success: boolean, data?: T, error?: { code, message } }",
        "applies_to": ["backend", "api"]
      }
    ],
    "process": [
      {
        "id": "PAT-002",
        "name": "Review before merge",
        "description": "Always review by tech lead before merge to main",
        "applies_to": ["workflow", "code-review"]
      }
    ],
    "naming": [
      {
        "id": "PAT-003",
        "name": "Feature branches",
        "description": "Format: feat/TICKET-short-description",
        "example": "feat/AUTH-001-oauth-google",
        "applies_to": ["git", "branches"]
      }
    ]
  }
}
```

**Usage**: Apply project patterns rather than generic conventions.

### 3. Errors (`errors.json`)

Past errors not to repeat.

```json
{
  "version": "1.0",
  "errors": [
    {
      "id": "ERR-001",
      "date": "2024-01-08",
      "type": "technical",
      "description": "Deployment without DB migration",
      "consequence": "500 errors in prod for 30min",
      "prevention": "Always verify pending migrations before deploy",
      "related_agent": "deployment"
    },
    {
      "id": "ERR-002",
      "date": "2024-01-11",
      "type": "process",
      "description": "Feature delivered without client validation",
      "consequence": "Complete design rework",
      "prevention": "BLOCKING gate on mockups before implementation",
      "related_agent": "specification"
    }
  ]
}
```

**Usage**: At the start of a similar task, recall past errors.

### 4. Preferences (`preferences.json`)

User/project preferences.

```json
{
  "version": "1.0",
  "user": {
    "communication_style": "concise",
    "detail_level": "technical",
    "language": "en",
    "timezone": "Europe/Paris"
  },
  "project": {
    "formality": "professional",
    "documentation_depth": "detailed",
    "commit_style": "conventional",
    "review_strictness": "high"
  },
  "agents": {
    "code-reviewer": {
      "severity_threshold": "warning",
      "focus": ["security", "performance"]
    },
    "estimation": {
      "buffer_percentage": 20,
      "include_testing": true
    }
  }
}
```

---

## Retrieval Protocol

### When to Query Memory

| Situation | Memory to consult |
|-----------|-------------------|
| New technical decision | `decisions.json` (existing ADRs) |
| Code generation | `patterns.json` (project conventions) |
| Deployment | `errors.json` (past errors) |
| Client communication | `preferences.json` (style) |
| Session resume | `short-term/current.json` |

### How to Query

```yaml
# At the start of a task
memory_retrieval:
  query: "[task type]"
  search_in:
    - decisions: "tags containing '[domain]'"
    - patterns: "applies_to containing '[context]'"
    - errors: "related_agent = '[current agent]'"

  results:
    relevant_decisions: [...]
    applicable_patterns: [...]
    past_errors: [...]
```

### Memory Context Format in Agent

When an agent loads memory context:

```markdown
## MEMORY CONTEXT

### Relevant Decisions
- **ADR-001**: PostgreSQL for DB (complex relations)
- **ADR-003**: JWT with refresh tokens (auth)

### Patterns to Apply
- API Response: `{ success, data?, error? }`
- Branches: `feat/TICKET-description`

### Errors to Avoid
- ⚠️ ERR-001: Always verify migrations before deploy
```

---

## Memory Updates

### Automatic
- `short-term/current.json`: After each action
- `decisions.json`: When an ADR/MKT is created

### On Trigger
- `patterns.json`: When a pattern is identified/validated
- `errors.json`: After an incident or significant error
- `preferences.json`: On explicit user request

### Update Format

```yaml
memory_update:
  target: "[memory file]"
  operation: "add | update | remove"
  entry:
    [content according to file schema]
  reason: "[why this update]"
```

---

## Synchronization with .project/

Long-term memory is synchronized with `.project/`:

| Memory | .project/ equivalent |
|--------|---------------------|
| `decisions.json` | Index of `03-architecture/decisions/` + `04-specs/*/decisions/` |
| `patterns.json` | Extracted from `03-architecture/conventions.md` |
| `errors.json` | Log of `07-audit/incidents/` |
| `preferences.json` | Config in `.project/config.json` |

### Sync Command

```bash
# Rebuild memory from .project/
/doc sync-memory

# Export memory to .project/
/doc export-memory
```

---

## Project Initialization

For a new project:

```json
// memory/long-term/decisions.json
{
  "version": "1.0",
  "project_id": "NEW",
  "decisions": []
}

// memory/long-term/patterns.json
{
  "version": "1.0",
  "patterns": {
    "code": [],
    "process": [],
    "naming": []
  }
}

// memory/long-term/errors.json
{
  "version": "1.0",
  "errors": []
}

// memory/long-term/preferences.json
{
  "version": "1.0",
  "user": {},
  "project": {},
  "agents": {}
}
```

Files fill up as the project progresses.

# Cross-Story Memory Protocol

> **Share discoveries between parallel agents in real-time**

---

## Overview

Cross-Story Memory enables agents working on parallel stories to share discoveries, gotchas, and insights in real-time. This prevents duplicate problem-solving and accelerates parallel execution.

```
┌─────────────────────────────────────────────────────────────────┐
│                    CROSS-STORY MEMORY                            │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  STORY-001 (Agent A)          STORY-002 (Agent B)                │
│       │                             │                            │
│       │ DISCOVERY:                  │                            │
│       │ "Rate limit is 100/min"     │                            │
│       │                             │                            │
│       └──────────► MEMORY BUS ◄─────┘                            │
│                        │                                         │
│                        ▼                                         │
│              .project/memory/                                    │
│              └── session-2025-01-24.json                         │
│                  {                                               │
│                    "discoveries": [                              │
│                      {                                           │
│                        "from": "STORY-001",                      │
│                        "type": "gotcha",                         │
│                        "content": "API rate limit 100/min",      │
│                        "timestamp": "10:30:00"                   │
│                      }                                           │
│                    ]                                             │
│                  }                                               │
│                        │                                         │
│                        ▼                                         │
│       Agent B reads before making API calls                      │
│       → Knows about rate limit without discovering it            │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## Memory Types

### 1. Discoveries

Runtime findings that other agents should know:

```yaml
discovery:
  type: "discovery"
  category: "api" | "database" | "auth" | "performance" | "config" | "other"
  content: "Description of what was discovered"
  impact: "high" | "medium" | "low"
  applies_to: ["STORY-002", "STORY-003"] | "all"
```

**Examples:**
- "Stripe webhook can fire multiple times for same event"
- "Redis connection pooling required for > 10 concurrent"
- "User.email has unique constraint, check before insert"

### 2. Gotchas

Problems encountered and their solutions:

```yaml
gotcha:
  type: "gotcha"
  problem: "What went wrong"
  solution: "How it was fixed"
  prevention: "How to avoid in future"
  files_affected: ["src/lib/stripe.ts"]
```

**Examples:**
- Problem: "Prisma transaction timeout on large batch"
- Solution: "Increased timeout to 30s, batched in chunks of 100"
- Prevention: "Always batch large operations"

### 3. Decisions

Real-time decisions that affect other stories:

```yaml
decision:
  type: "decision"
  context: "What prompted the decision"
  decision: "What was decided"
  rationale: "Why"
  affects: ["STORY-002", "STORY-003"]
```

**Examples:**
- "Decided to use Redis instead of in-memory cache (affects STORY-003)"
- "Changed API response format to include pagination metadata"

### 4. Blockers

Issues blocking progress that others should know:

```yaml
blocker:
  type: "blocker"
  issue: "What's blocking"
  status: "investigating" | "waiting" | "resolved"
  workaround: "Temporary solution if any"
  resolution: "Final fix when resolved"
```

### 5. Completions

Notify when work is done that unblocks others:

```yaml
completion:
  type: "completion"
  story: "STORY-001"
  deliverable: "What was completed"
  location: "Where to find it"
  unblocks: ["STORY-002", "STORY-003"]
```

---

## Memory File Structure

```
.project/memory/
├── README.md                      # Protocol documentation
├── current-session.json           # Active session memory
├── sessions/
│   ├── 2025-01-24-feature-x.json # Archived session
│   └── 2025-01-23-feature-y.json
└── persistent/
    ├── gotchas.json               # Long-term gotchas
    └── decisions.json             # Session-spanning decisions
```

### Session Memory Schema

```json
{
  "session": {
    "id": "2025-01-24-stripe-integration",
    "started": "2025-01-24T09:00:00Z",
    "stories": ["STORY-001", "STORY-002", "STORY-003"],
    "status": "active"
  },
  "entries": [
    {
      "id": "mem-001",
      "timestamp": "2025-01-24T10:30:00Z",
      "from_story": "STORY-001",
      "from_agent": "backend-developer",
      "type": "gotcha",
      "content": {
        "problem": "Stripe webhook fires multiple times",
        "solution": "Added idempotency check with event ID",
        "prevention": "Always store processed event IDs"
      },
      "impact": "high",
      "applies_to": ["STORY-002"],
      "acknowledged_by": ["STORY-002"]
    }
  ],
  "summary": {
    "total_entries": 15,
    "by_type": {
      "discovery": 5,
      "gotcha": 4,
      "decision": 3,
      "blocker": 2,
      "completion": 1
    },
    "unacknowledged": 2
  }
}
```

---

## Agent Workflow

### 1. Read Memory (Before Starting Work)

```yaml
pre_execution:
  action: "Load current session memory"
  path: ".project/memory/current-session.json"

  filter:
    applies_to: ["my-story-id", "all"]
    types: ["gotcha", "discovery", "decision", "blocker"]

  display: |
    ## 📬 Memory Updates (3 new)

    ### From STORY-001 (10:30)
    🔴 **Gotcha**: Stripe webhook fires multiple times
    → Solution: Idempotency check with event ID

    ### From STORY-003 (11:15)
    💡 **Discovery**: Redis connection pool max is 10
    → Impact: Need pooling for concurrent operations

    ### From STORY-002 (11:45)
    ✅ **Completed**: Auth middleware ready
    → Location: src/middleware.ts
    → Unblocks: STORY-001, STORY-003
```

### 2. Write to Memory (When Discovering Something)

```yaml
during_execution:
  trigger: "Agent discovers something useful for others"

  write_entry:
    type: "gotcha"
    content:
      problem: "[What happened]"
      solution: "[How fixed]"
      prevention: "[How to avoid]"
    impact: "high"
    applies_to: ["STORY-002"]  # or "all"

  notification: |
    📤 Shared to memory: Gotcha about rate limiting
    → Applies to: STORY-002
```

### 3. Acknowledge Memory

```yaml
post_read:
  action: "Mark entries as acknowledged"
  purpose: "Track who has seen what"

  update:
    entry_id: "mem-001"
    acknowledged_by: ["STORY-003"]  # Add my story
```

---

## Integration Points

### In Story Execution

```markdown
## 8. Execution Log

### 8.4 Memory Interactions

| Time | Action | Entry |
|------|--------|-------|
| 10:00 | 📥 Read | Loaded 3 entries from memory |
| 10:30 | 📤 Write | Shared gotcha about rate limit |
| 11:00 | 📥 Read | New completion from STORY-002 |
| 11:15 | ✅ Ack | Acknowledged STORY-002 completion |
```

### In Story Template

Add to Section 6 (Dependencies):

```markdown
### 6.3 Memory Dependencies

| From Story | Type | Content | Status |
|------------|------|---------|--------|
| STORY-001 | gotcha | Rate limit handling | ✅ Applied |
| STORY-002 | completion | Auth middleware | ✅ Available |
| STORY-003 | blocker | DB migration pending | ⏳ Waiting |
```

---

## Commands

### Memory CLI Integration

```bash
# View current session memory
/memory list

# View specific type
/memory list --type=gotcha

# Add entry manually
/memory add --type=discovery --content="Found rate limit" --applies-to=all

# Acknowledge entries
/memory ack mem-001 mem-002

# Archive session
/memory archive
```

### Agent Prompts

```yaml
# Prompt to check memory
check_memory_prompt: |
  Before starting work on this story, check the session memory
  at .project/memory/current-session.json for any relevant
  discoveries, gotchas, or blockers from parallel stories.

# Prompt to share discovery
share_discovery_prompt: |
  You discovered something that may help other stories.
  Add it to the session memory with:
  - Type (discovery/gotcha/decision/blocker)
  - Content (what you found)
  - Impact (high/medium/low)
  - Applies to (which stories or "all")
```

---

## Memory Lifecycle

```
┌─────────────────────────────────────────────────────────────────┐
│                      MEMORY LIFECYCLE                            │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  SESSION START                                                   │
│       │                                                          │
│       ▼                                                          │
│  Create current-session.json                                     │
│  Link participating stories                                      │
│       │                                                          │
│       ▼                                                          │
│  ACTIVE SESSION                                                  │
│  • Agents read/write entries                                     │
│  • Entries accumulate                                            │
│  • Acknowledgments tracked                                       │
│       │                                                          │
│       ▼                                                          │
│  SESSION END                                                     │
│       │                                                          │
│       ├──► Archive to sessions/YYYY-MM-DD-{name}.json            │
│       │                                                          │
│       └──► Promote valuable entries:                             │
│            • Recurring gotchas → persistent/gotchas.json         │
│            • Important decisions → persistent/decisions.json      │
│            • Patterns → knowledge/patterns/                       │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## Conflict Resolution

When parallel agents make conflicting decisions:

```yaml
conflict_detection:
  trigger: "Two entries contradict each other"

  example:
    entry_1:
      from: "STORY-001"
      decision: "Use Redis for caching"
    entry_2:
      from: "STORY-002"
      decision: "Use in-memory cache (no Redis)"

  resolution:
    step_1: "Flag conflict in memory"
    step_2: "Notify both agents"
    step_3: "Escalate to human if needed (🔴 gate)"

  conflict_entry:
    type: "conflict"
    entries: ["mem-005", "mem-008"]
    status: "unresolved"
    requires: "human decision"
```

---

## Best Practices

### 1. Share Early, Share Often

```yaml
# ✅ Good: Share as soon as you discover
discovery_timing: "immediate"
rationale: "Others might hit same issue in minutes"

# ❌ Bad: Wait until end to share
# → Parallel agents may waste time on same problem
```

### 2. Be Specific

```yaml
# ✅ Good: Specific and actionable
gotcha:
  problem: "Prisma findMany with > 1000 records times out"
  solution: "Use cursor-based pagination with take: 100"
  files: ["src/lib/users.ts:45"]

# ❌ Bad: Vague
gotcha:
  problem: "Database is slow"
  solution: "Fixed it"
```

### 3. Tag Applicable Stories

```yaml
# ✅ Good: Specific targeting
applies_to: ["STORY-002", "STORY-003"]  # Only relevant stories

# ⚠️ Use sparingly
applies_to: "all"  # Only for truly universal discoveries
```

### 4. Acknowledge Promptly

```yaml
# ✅ Good: Acknowledge after reading
read_then_ack: true
purpose: "Track information flow, identify gaps"

# ❌ Bad: Ignore acknowledgments
# → Can't tell if agents are up to date
```

---

## Integration with Learning Capture

At session end, valuable memory entries flow to knowledge base:

```yaml
memory_to_knowledge:
  recurring_gotchas:
    threshold: "3+ occurrences across sessions"
    destination: "knowledge/rules/gotchas.md"

  validated_patterns:
    threshold: "Used successfully in 2+ stories"
    destination: "knowledge/patterns/"

  architectural_decisions:
    criteria: "Affects future projects"
    destination: "knowledge/cases/"
```

---

## References

- `core/story-generation.md` - Pre-execution memory check
- `core/learning-capture.md` - Post-session knowledge promotion
- `templates/STORY-TEMPLATE.md` - Memory section in execution log

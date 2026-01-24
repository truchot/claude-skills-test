# APEX Task Management Protocol

> **Leverage Claude Code's native Tasks system for multi-session coordination**

---

## Overview

APEX uses Claude Code's **Tasks** primitive (introduced v2.1.16) instead of manual TodoWrite tracking. Tasks provide:

- **Dependencies** - Tasks can depend on each other (stored in metadata)
- **Persistence** - Stored in `~/.claude/tasks/` (survives sessions)
- **Broadcasting** - Changes broadcast to all sessions on same TaskList
- **Subagent coordination** - Share tasks across parallel agents

---

## How to Use Tasks

### Creating Tasks with Dependencies

When decomposing a request, create Tasks with explicit dependencies:

```markdown
## Request: "Add Stripe subscription payments"

I'll create a task list for this project.

**Tasks:**
1. T-001: Write ADR for Stripe vs alternatives
2. T-002: Design Stripe integration architecture (depends on T-001)
3. T-003: Create subscription database schema (depends on T-002)
4. T-004: Implement webhook handler (depends on T-003)
5. T-005: Create subscription API endpoints (depends on T-003)
6. T-006: Build pricing page component (depends on T-002)
7. T-007: Build checkout flow (depends on T-005, T-006)
8. T-008: Write integration tests (depends on T-004, T-005, T-007)

Dependencies:
- T-002 → T-001
- T-003 → T-002
- T-004 → T-003
- T-005 → T-003
- T-006 → T-002
- T-007 → T-005, T-006
- T-008 → T-004, T-005, T-007
```

### Starting a Shared Task List

For multi-session projects, start Claude with a shared task list:

```bash
# Session 1: Main orchestration
CLAUDE_CODE_TASK_LIST_ID=stripe-integration claude

# Session 2: Backend work (parallel)
CLAUDE_CODE_TASK_LIST_ID=stripe-integration claude -p "Work on backend tasks"

# Session 3: Frontend work (parallel)
CLAUDE_CODE_TASK_LIST_ID=stripe-integration claude -p "Work on frontend tasks"
```

All sessions see the same task list and updates broadcast automatically.

### Viewing Tasks

Use the `/tasks` command to view current tasks and their status.

### Subagent Coordination

When spawning subagents for parallel work:

```markdown
I'll spawn subagents to work on independent tasks in parallel:

1. **Backend subagent** → T-003, T-004, T-005
2. **Frontend subagent** → T-006, T-007
3. **Main agent** → Coordinate and handle T-008 (tests)

Each subagent will update task status, and changes broadcast to all.
```

---

## Task Status Flow

```
pending → in_progress → completed
                     → blocked (if dependency not met)
```

### Status Rules

| Status | Meaning |
|--------|---------|
| `pending` | Not started, waiting for dependencies |
| `in_progress` | Currently being worked on |
| `completed` | Done, dependents can start |
| `blocked` | Waiting for blocker to resolve |

---

## Integration with APEX Pipeline

### In DECOMPOSE Stage

After clarifying requirements, decompose into Tasks:

```yaml
decomposition_output:
  format: "Claude Tasks (native)"
  storage: "~/.claude/tasks/{task_list_id}/"

  create_tasks_with:
    - id: unique identifier
    - description: what to do
    - dependencies: [list of task ids]
    - agent: role/agent responsible
    - gate: 🔴|🟡|🟢 checkpoint type
    - effort: estimated hours
```

### In CONTRACT Stage

Present task list to user for approval:

```markdown
## 📋 Task Contract

### Task List: stripe-integration

| ID | Task | Depends On | Agent | Gate | Effort |
|----|------|------------|-------|------|--------|
| T-001 | Write ADR | - | tech-architect | 🔴 | 2h |
| T-002 | Design integration | T-001 | tech-architect | 🔴 | 3h |
| T-003 | Database schema | T-002 | backend | 🟢 | 2h |
| T-004 | Webhook handler | T-003 | backend | 🟢 | 4h |
| T-005 | API endpoints | T-003 | backend | 🟡 | 4h |
| T-006 | Pricing page | T-002 | frontend | 🟢 | 4h |
| T-007 | Checkout flow | T-005,T-006 | frontend | 🟢 | 6h |
| T-008 | Integration tests | T-004,T-005,T-007 | testing | 🔴 | 4h |

**Critical Path:** T-001 → T-002 → T-003 → T-005 → T-007 → T-008
**Parallel Tracks:** Backend (T-003,T-004,T-005) | Frontend (T-006,T-007)
**Total Estimate:** ~29 hours

⚠️ **Approve to create this task list?**
```

### In EXECUTE Stage

1. Create task list with dependencies
2. Start working on tasks without dependencies
3. Update status as work progresses
4. Spawn subagents for parallel work if beneficial
5. Respect 🔴 gates - pause and wait for user
6. Mark tasks completed immediately when done

---

## Best Practices

### 1. Always Create Dependencies

```markdown
❌ Bad: Create tasks without dependencies
   (No coordination, wrong execution order)

✅ Good: Create tasks with explicit dependencies
   (Correct order, enables parallel work)
```

### 2. Use Shared Task Lists for Projects

```bash
# For any project spanning multiple sessions
CLAUDE_CODE_TASK_LIST_ID=project-name claude
```

### 3. Granular Tasks

```markdown
❌ Bad: "Implement Stripe integration" (too big)

✅ Good: Break into 4-8 hour tasks max
   - "Create webhook handler"
   - "Create subscription endpoint"
   - "Build pricing component"
```

### 4. Update Status Immediately

```markdown
❌ Bad: Batch status updates at end

✅ Good: Mark in_progress when starting
         Mark completed immediately when done
```

### 5. Use Subagents for Parallel Work

```markdown
When tasks have no dependencies on each other:
→ Spawn subagents to work in parallel
→ All share same task list
→ Updates broadcast automatically
```

---

## Task File Location

Tasks are stored in:
```
~/.claude/tasks/
└── {task_list_id}/
    ├── tasks.json       # Task definitions
    └── state.json       # Current status
```

You can build additional utilities on top of this.

---

## Environment Variables

| Variable | Purpose |
|----------|---------|
| `CLAUDE_CODE_TASK_LIST_ID` | Share task list across sessions |
| `CLAUDE_CODE_DISABLE_BACKGROUND_TASKS` | Disable background task features |

---

## Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl+B` | Background current task / View background tasks |
| `/tasks` | Open task management dialog |

---

## References

- Claude Code v2.1.16 Changelog: Task management with dependencies
- Tweet by @trq212: Tasks announcement
- Claude Agent SDK: Todo tracking → Tasks upgrade

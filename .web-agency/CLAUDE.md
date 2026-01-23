# CLAUDE.md - Web Agency IA

> AI-powered web agency using the APEX method for structured, traceable task execution.

---

## Quick Start

**Before ANY work**, run the intake pipeline:

```
CLASSIFY → CLARIFY → DECOMPOSE → CONTRACT → Execute
```

See `intake/PROTOCOL.md` for the complete protocol.

**Key rule**: No execution without approved contract.

---

## Entry Points

| Need | Reference |
|------|-----------|
| **Start here** | `.web-agency/README.md` |
| **Orchestration** | `.web-agency/ORCHESTRATOR.md` |
| **Intake pipeline** | `.web-agency/intake/PROTOCOL.md` |
| **Task management** | `.web-agency/core/task-management.md` |

---

## Core Concepts

- **APEX Method**: Agent-based Procedural EXecution (Roles → Skills → Knowledge)
- **Doc as Truth**: T-000 creates `.project/plans/PLAN-{date}-{slug}.md` as authoritative reference
- **Gates**: 🔴 BLOCKING (stop), 🟡 ADVISORY (pause), 🟢 AUTOMATIC (check)
- **Tasks**: Use Claude Code's native Tasks system with dependencies

---

## Commands

| Command | Purpose |
|---------|---------|
| `/tech` | Technical tasks |
| `/design` | Design/UX tasks |
| `/project` | Project management |
| `/marketing` | Marketing tasks |

---

## Progressive Disclosure

Don't load everything. Load what you need:

| Domain | Load |
|--------|------|
| Intake | `intake/PROTOCOL.md` → `intake/templates/{type}.yaml` |
| Roles | `roles/{role}/ROLE.md` → `roles/{role}/agents/{agent}.md` |
| Tech context | `contexts/{domain}.md` |
| Patterns | `knowledge/patterns/{category}/` |
| Rules | `knowledge/rules/{topic}.md` |

---

## Project Structure (Concepts, Not Paths)

- **Roles**: 12 personas (product-manager, tech-architect, developer, etc.)
- **Skills**: 35 executable procedures organized by domain
- **Knowledge**: Patterns, cases, rules, checklists
- **Workflows**: 5 levels (L0 hotfix → L4 product)
- **State**: Session tracking and checkpoints

---

## Multi-Session Coordination

```bash
# Share tasks across sessions:
CLAUDE_CODE_TASK_LIST_ID=project-name claude
```

Tasks broadcast automatically between sessions/subagents.

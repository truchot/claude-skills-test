# Web Agency IA - APEX Method

---

## 🚀 Quick Start (AI Entry Point)

### Step 0: Intake Pipeline (BEFORE any work)

For any non-trivial request, run the intake pipeline:

```
CLASSIFY → CLARIFY → DECOMPOSE → CONTRACT → (User Approval) → EXECUTE
```

| Stage | Action | Reference |
|-------|--------|-----------|
| **CLASSIFY** | Domain + Type + Complexity | `intake/classification.yaml` |
| **CLARIFY** | Ask structured questions | `intake/templates/{type}.yaml` |
| **DECOMPOSE** | T-000 (Plan doc) + tasks with dependencies | Claude Tasks |
| **CONTRACT** | Present plan, get approval (🔴) | `contracts/template.md` |

> **Rule**: No execution without approved contract.

---

### Step 1: Identify Task Type

```yaml
task_types:
  code_review:      → roles/lead-developer/agents/code-review.md
  api_design:       → roles/tech-architect/agents/api-design.md
  frontend_impl:    → roles/developer/agents/frontend-implementation.md
  backend_impl:     → roles/developer/agents/backend-implementation.md
  testing:          → roles/developer/agents/testing.md
  estimation:       → roles/lead-developer/agents/estimation.md
  task_breakdown:   → roles/lead-developer/agents/task-breakdown.md
  prd_writing:      → roles/product-manager/agents/prd-writer.md
  prioritization:   → roles/product-manager/agents/prioritization.md
```

### Step 2: Load Context

```yaml
always_load:
  - state/current.json              # Current session state
  - .project/03-architecture/stack.md  # Tech stack (if exists)

by_task:
  code_review:
    - knowledge/rules/code-standards.md
    - .project/03-architecture/decisions/ADR-*.md

  api_design:
    - knowledge/patterns/technical/api-*.md
    - .project/03-architecture/api-contract.yaml

  frontend_impl:
    - contexts/frontend.md
    - knowledge/patterns/technical/react-*.md

  backend_impl:
    - contexts/backend.md
    - knowledge/patterns/technical/node-*.md
```

### Step 3: Execute Agent

Load the agent file and follow its procedure:

1. **Read triggers/outputs** → Understand when to use and what to produce
2. **Follow procedure** → Execute phases in order
3. **Use output format** → Format output correctly
4. **Respect gates** → 🔴 STOP, 🟡 PAUSE, 🟢 AUTO

### Step 4: Create Tasks with Dependencies

Use Claude Code's native **Tasks** system for tracking:

```bash
# For multi-session projects, start with shared task list:
CLAUDE_CODE_TASK_LIST_ID=project-name claude
```

Create tasks with explicit dependencies:
```yaml
tasks:
  - id: T-001
    description: "Write architecture ADR"
    depends_on: []

  - id: T-002
    description: "Design API contract"
    depends_on: [T-001]

  - id: T-003
    description: "Implement backend"
    depends_on: [T-002]
```

Tasks are stored in `~/.claude/tasks/` and broadcast to all sessions.

> **Reference**: See `core/task-management.md` for full protocol.

---

### Quick Reference: Gate Behavior

| Gate | Action | Rule |
|------|--------|------|
| 🔴 BLOCKING | **STOP** | Wait for explicit user validation |
| 🟡 ADVISORY | **PAUSE** | Present result, propose to continue |
| 🟢 AUTOMATIC | **CHECK** | Run tests/lint, continue if pass |

### Quick Reference: When Stuck

```yaml
missing_context:
  action: "ASK user for missing information"
  do_not: "Guess or assume"

ambiguous_requirement:
  action: "CLARIFY before proceeding"
  do_not: "Interpret freely"

blocked_by_gate:
  action: "WAIT for user response"
  do_not: "Continue without validation"

error_during_execution:
  action: "STOP, report error, propose fix"
  do_not: "Hide errors or continue broken"
```

### Skill Discovery: Find the Right Agent

**By keyword search:**

| Keywords | Agent |
|----------|-------|
| review, PR, merge, code quality | `lead-developer/code-review` |
| API, endpoint, REST, contract | `tech-architect/api-design` |
| React, component, UI, frontend | `developer/frontend-implementation` |
| Node, service, backend, server | `developer/backend-implementation` |
| test, unit, integration, coverage | `developer/testing` |
| estimate, effort, story points | `lead-developer/estimation` |
| breakdown, tasks, WBS, decompose | `lead-developer/task-breakdown` |
| PRD, requirements, user story | `product-manager/prd-writer` |
| priority, RICE, MoSCoW, backlog | `product-manager/prioritization` |

**By output needed:**

| Output | Agent |
|--------|-------|
| Review decision (approve/reject) | `code-review` |
| OpenAPI spec / API contract | `api-design` |
| React component code | `frontend-implementation` |
| API endpoint code | `backend-implementation` |
| Test files | `testing` |
| Effort estimation | `estimation` |
| Task list with dependencies | `task-breakdown` |
| PRD document | `prd-writer` |
| Prioritized backlog | `prioritization` |

**By role:**

| Role | Agents |
|------|--------|
| tech-architect | `api-design` |
| lead-developer | `code-review`, `estimation`, `task-breakdown` |
| developer | `frontend-implementation`, `backend-implementation`, `testing` |
| product-manager | `prd-writer`, `prioritization` |

---

## Philosophy

**Agent-based Procedural EXecution for predictable, scalable AI operations.**

The APEX method provides a three-layer architecture that separates concerns:
1. **ROLES** define WHO decides (12 personas with clear authority)
2. **SKILLS** define HOW to execute (35 procedural skills)
3. **KNOWLEDGE** captures WHY (patterns, cases, rules, checklists)

> See `APEX.md` for the complete method documentation.

## Structure

```
.web-agency/
├── APEX.md                      # Method overview
├── ORCHESTRATOR.md              # Single entry point - Conductor
├── GATES.md                     # Human-in-the-Loop gates reference
│
├── roles/                       # WHO decides (12 personas)
│   ├── product-manager/
│   ├── tech-architect/
│   ├── lead-developer/
│   ├── developer/
│   ├── qa-engineer/
│   ├── ux-designer/
│   ├── devops-engineer/
│   ├── project-manager/
│   ├── marketing-lead/
│   ├── commercial-lead/
│   ├── support-lead/
│   └── scrum-master/
│
├── skills/                      # HOW to execute (35 skills)
│   ├── intake/                  # Reception and qualification
│   ├── strategy/                # Direction and decisions
│   ├── project/                 # Project management
│   ├── development/             # Development
│   ├── quality/                 # Quality and testing
│   ├── operations/              # DevOps and deployment
│   ├── marketing/               # Marketing and growth
│   ├── commercial/              # Sales and retention
│   └── support/                 # Support and documentation
│
├── workflows/                   # Scale-adaptive process (5 levels)
│   ├── level-0-hotfix.md        # < 2 hours
│   ├── level-1-task.md          # < 1 day
│   ├── level-2-story.md         # 1-5 days
│   ├── level-3-feature.md       # 1-4 weeks
│   └── level-4-product.md       # 1+ month
│
├── knowledge/                   # WHY - Company wisdom
│   ├── patterns/                # Proven solutions
│   ├── cases/                   # Real examples
│   ├── rules/                   # Actionable guidelines
│   └── checklists/              # Verification lists
│
├── contexts/                    # Technical knowledge
│   ├── frontend.md
│   ├── backend.md
│   ├── devops.md
│   ├── wordpress.md
│   └── security.md
│
├── core/                        # Core protocols
│   ├── execution-engine.md      # REACT pattern
│   ├── handoff-protocol.md      # Agent communication
│   └── memory-protocol.md       # Knowledge retention
│
├── state/                       # Project state (generated)
│   ├── current.json
│   ├── schema.json
│   └── README.md
│
└── templates/                   # Project templates
    └── project/
```

## How It Works

### 1. User invokes a command
```
/tech "I need to add a Stripe payment system"
```

### 2. Orchestrator analyzes and routes
```
→ Detects: new technical feature
→ Assesses complexity: Level 3 (1-4 weeks)
→ Assigns role: Lead Developer
→ Selects workflow: level-3-feature.md
→ Identifies steps: PRD → Architecture → Dev → Test → Review → Deploy
```

### 3. Skills execute with HITL gates
```
🔴 specification (BLOCKING) → Clarify requirements
🔴 architecture (BLOCKING)  → Design solution
🟢 development (AUTO)       → Implement
🟡 code-review (ADVISORY)   → Review code
🔴 deployment (BLOCKING)    → Deploy to production
```

### 4. State is maintained
```json
{
  "workflow": {
    "level": 3,
    "name": "feature",
    "current_step": 4,
    "status": "in_progress"
  },
  "active_role": "lead-developer",
  "steps": [
    {"name": "specification", "status": "completed", "gate": "blocking"},
    {"name": "architecture", "status": "completed", "gate": "blocking"},
    {"name": "development", "status": "completed", "gate": "automatic"},
    {"name": "review", "status": "in_progress", "gate": "advisory"}
  ]
}
```

### 5. Knowledge is captured
After each project, learnings are extracted to `knowledge/`:
- New patterns identified
- Cases documented
- Rules updated
- Checklists refined

## HITL Gates

Human-in-the-Loop gates ensure quality and control:

| Gate | Symbol | Behavior |
|------|--------|----------|
| **BLOCKING** | 🔴 | AI stops, waits for explicit validation |
| **ADVISORY** | 🟡 | AI presents, proposes to continue |
| **AUTOMATIC** | 🟢 | AI verifies automatically (tests, lint) |

## Commands

| Command | Description |
|---------|-------------|
| `/tech` | Any technical task (routes automatically) |
| `/design` | Design/UX tasks |
| `/project` | Project management |
| `/marketing` | Marketing/SEO/Content |

The orchestrator automatically detects the appropriate workflow level.

## Workflow Levels

| Level | Name | Duration | Primary Role | Gates |
|-------|------|----------|--------------|-------|
| L0 | Hotfix | < 2h | Developer | 🟢 All auto |
| L1 | Task | < 1 day | Developer | 🟡 Code review |
| L2 | Story | 1-5 days | Lead Developer | 🟡 Multiple |
| L3 | Feature | 1-4 weeks | Product Manager | 🔴 PRD, Arch, Deploy |
| L4 | Product | 1+ month | Product Manager | 🔴 Full governance |

## Key Principles

1. **Scale-Adaptive**: Match process weight to task complexity
2. **Role Boundaries**: Roles stay in their lane, escalate when needed
3. **Documentation as Truth**: What's documented is what's done
4. **Knowledge Capture**: Learn and improve after each project
5. **Human Control**: Blocking gates ensure humans validate critical decisions

## References

| Subject | File |
|---------|------|
| APEX Method | `APEX.md` |
| Orchestrator | `ORCHESTRATOR.md` |
| **Intake Protocol** | `intake/PROTOCOL.md` |
| **Classification** | `intake/classification.yaml` |
| **Intake Templates** | `intake/templates/*.yaml` |
| **Contract Template** | `contracts/template.md` |
| **Session Plan (T-000)** | `templates/SESSION-PLAN.md` |
| **Task Management** | `core/task-management.md` |
| **Story Generation** | `core/story-generation.md` |
| **Story Template** | `templates/STORY-TEMPLATE.md` |
| Gates Reference | `GATES.md` |
| Roles & Agents | `roles/*/agents/*.md` |
| State Schema v2 | `state/schema-v2.json` |
| Context Loader | `core/context-loader.md` |
| Phase Gates | `core/phase-gates.md` |
| Checklists | `checklists/` |
| Analysis v3 | `analysis/APEX-v3-request-to-tasks.md` |

---

## Context Engineering (Stories)

> **NEW**: Self-contained stories with embedded context for reliable execution.

For L2+ complexity tasks, generate **Context-Engineered Stories** that embed all necessary context directly into the story document:

```
SESSION PLAN (T-XXX tasks)
       │
       ▼
CONTEXT PACK DETECTION
  • api-endpoint / react-component / database-schema / ...
       │
       ▼
CONTEXT EXTRACTION (3x faster with packs)
  • Stack/Architecture → Embedded
  • Relevant ADRs → Embedded
  • Applicable Patterns → Embedded
  • Related Code → Embedded
       │
       ▼
STORY-XXX.md (self-contained)
       │
       ▼
AGENT EXECUTION (no external files needed)
       │
       ▼
LEARNING CAPTURE
  • Deviations → patterns/
  • Gotchas → rules/
  • Edge cases → cases/
```

**Benefits:**
- Agents don't need to load external context files
- Eliminates context loss between sessions/agents
- Makes task execution predictable and reliable
- Enables parallel agent work with consistent context
- **NEW**: Context Packs accelerate story generation 3x
- **NEW**: Learning Capture improves future stories
- **NEW**: Context Inheritance reduces duplication for child stories
- **NEW**: Staleness Detection prevents outdated context issues
- **NEW**: Context Compression optimizes tokens (minimal/standard/verbose)
- **NEW**: Cross-Story Memory enables real-time discovery sharing

**References:**
- `core/story-generation.md` - Full generation protocol
- `templates/STORY-TEMPLATE.md` - Story template (standalone/parent)
- `templates/STORY-TEMPLATE-CHILD.md` - Child story template (inherited)
- `contexts/packs/README.md` - Context Packs system
- `core/learning-capture.md` - Learning extraction protocol
- `core/context-inheritance.md` - Parent→Child inheritance
- `core/context-staleness.md` - Staleness detection
- `core/context-compression.md` - Token optimization (3 detail levels)
- `core/cross-story-memory.md` - Parallel agent memory sharing

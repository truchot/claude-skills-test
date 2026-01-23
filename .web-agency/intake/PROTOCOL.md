# APEX Intake Protocol

> **From user request to executable task list in 4 stages**

---

## Overview

The Intake Protocol transforms ambiguous user requests into well-defined, trackable tasks. This happens BEFORE any execution.

```
┌──────────────────────────────────────────────────────────────────┐
│                     INTAKE PIPELINE                               │
├──────────────────────────────────────────────────────────────────┤
│                                                                   │
│  User Request                                                     │
│       │                                                           │
│       ▼                                                           │
│  ┌─────────────┐                                                  │
│  │ 1. CLASSIFY │  → Domain + Type + Complexity                    │
│  └─────────────┘    (Use classification.yaml)                     │
│       │                                                           │
│       ▼                                                           │
│  ┌─────────────┐                                                  │
│  │ 2. CLARIFY  │  → Ask structured questions                      │
│  └─────────────┘    (Use templates/{type}.yaml)                   │
│       │                                                           │
│       ▼                                                           │
│  ┌─────────────┐                                                  │
│  │ 3. DECOMPOSE│  → Break into tasks with dependencies            │
│  └─────────────┘    (Create Claude Tasks)                         │
│       │                                                           │
│       ▼                                                           │
│  ┌─────────────┐                                                  │
│  │ 4. CONTRACT │  → Present plan for approval                     │
│  └─────────────┘    (Use contracts/template.md)                   │
│       │                                                           │
│       ▼                                                           │
│  🔴 USER APPROVAL GATE                                            │
│       │                                                           │
│       ▼                                                           │
│  EXECUTE (with task tracking)                                     │
│                                                                   │
└──────────────────────────────────────────────────────────────────┘
```

---

## Stage 1: CLASSIFY

### Purpose
Mechanically categorize the request BEFORE any interpretation or work.

### Process

```yaml
classify:
  step_1: "Identify domain from keywords"
  step_2: "Identify request type from keywords"
  step_3: "Assess complexity from signals"
  step_4: "Output classification result"
```

### Reference
Use `classification.yaml` for the classification matrix.

### Output Format

```yaml
classification:
  request: "[Original user request]"
  domain: tech | design | project | marketing | commercial | support
  type: new_feature | enhancement | bugfix | question | review | deployment
  complexity: L0 | L1 | L2 | L3 | L4
  confidence: 0.0-1.0

  # If confidence < 0.7, ask clarifying question
  clarification_needed: true | false
  clarification_question: "[Question to disambiguate]"
```

### Example

```yaml
# User: "Add Stripe payments"
classification:
  request: "Add Stripe payments"
  domain: tech
  type: new_feature
  complexity: L3
  confidence: 0.9
  clarification_needed: false
```

---

## Stage 2: CLARIFY

### Purpose
Ask the RIGHT questions based on classification, BEFORE starting work.

### Process

```yaml
clarify:
  step_1: "Load template for request type"
  step_2: "Ask required questions"
  step_3: "Ask conditional questions if applicable"
  step_4: "Load specified context files"
  step_5: "Output intake result"
```

### Reference
Use `templates/{type}.yaml` for intake questions.

### Question Rules

1. **Ask ALL required questions** - Don't skip any
2. **Ask conditional questions** if their condition is met
3. **Don't ask optional questions** unless user seems unsure
4. **Load context** before asking context-dependent questions

### Output Format

```yaml
intake:
  classification:
    domain: tech
    type: new_feature
    complexity: L3

  answers:
    problem: "[User's answer]"
    user: "[User's answer]"
    success_criteria: "[User's answer]"
    out_of_scope: "[User's answer]"
    # ... all answered questions

  context_loaded:
    - path: ".project/03-architecture/stack.md"
      summary: "Next.js 14, TypeScript, Prisma, PostgreSQL"
    - path: "knowledge/rules/code-standards.md"
      summary: "ESLint strict, Prettier, no any types"

  ready_for_decomposition: true
```

### Example Dialog

```
AI: I'll help you add Stripe payments. Let me clarify a few things:

1. **What problem does this solve?**
User: Users can't purchase premium subscriptions

2. **Who is the primary user?**
User: Free users wanting to upgrade

3. **What defines success?**
User: Users can subscribe to 3 different tiers

4. **What's explicitly OUT of scope?**
User: PayPal, invoicing, mobile app

5. **Which payment types?** (since you mentioned "payments")
User: Subscriptions only, not one-time

AI: Got it. Let me also check your tech stack...
[Loads .project/03-architecture/stack.md]

AI: I see you're using Next.js 14 with Prisma. Now let me break this down into tasks.
```

---

## Stage 3: DECOMPOSE

### Purpose
Break the clarified request into discrete, trackable tasks with dependencies.

### Process

```yaml
decompose:
  step_1: "Identify deliverables (what will be produced)"
  step_2: "Map deliverables to responsible agents"
  step_3: "Create tasks from deliverables"
  step_4: "Define dependencies between tasks"
  step_5: "Identify gates (checkpoints)"
  step_6: "Estimate effort per task"
  step_7: "Create tasks using Claude Tasks system"
```

### Decomposition Rules

| Rule | Description |
|------|-------------|
| **Max 8 hours** | No task should exceed 8 hours |
| **Single responsibility** | Each task does ONE thing |
| **Testable outcome** | Each task has verifiable result |
| **Explicit dependencies** | All dependencies documented |

### Task Template

```yaml
task:
  id: "T-XXX"
  description: "[Verb] [Object] [Context]"
  deliverable: "[What this produces]"
  agent: "[role]/[agent]"
  depends_on: ["T-XXX", ...]
  gate: "🔴 | 🟡 | 🟢"
  effort: "[X hours]"
```

### Common Patterns

#### New Feature Pattern
```yaml
tasks:
  - T-001: Architecture decision (ADR)        # 🔴
  - T-002: Technical design / API contract    # 🔴
  - T-003: Database migration                 # 🟢
  - T-004: Backend implementation             # 🟡
  - T-005: Frontend implementation            # 🟢
  - T-006: Integration tests                  # 🟢
  - T-007: Code review                        # 🔴
```

#### Bugfix Pattern
```yaml
tasks:
  - T-001: Reproduce and analyze              # 🟢
  - T-002: Identify root cause                # 🟢
  - T-003: Implement fix                      # 🟢
  - T-004: Add regression test                # 🟢
  - T-005: Code review                        # 🟡
```

#### Enhancement Pattern
```yaml
tasks:
  - T-001: Analyze current implementation     # 🟢
  - T-002: Design enhancement                 # 🟡
  - T-003: Implement changes                  # 🟢
  - T-004: Update tests                       # 🟢
  - T-005: Code review                        # 🟡
```

### Output Format

```yaml
decomposition:
  deliverables:
    - id: D-001
      name: "[Deliverable name]"
      type: document | code | config | test
      agent: "[role]/[agent]"

  tasks:
    - id: T-001
      description: "[Task description]"
      deliverable: D-001
      depends_on: []
      gate: "🔴"
      effort: "2h"

  critical_path: ["T-001", "T-002", "T-005", "T-007"]
  parallel_tracks:
    - name: "Backend"
      tasks: ["T-003", "T-004"]
    - name: "Frontend"
      tasks: ["T-005", "T-006"]

  total_effort: "29 hours"
  estimated_duration: "4 days"
```

---

## Stage 4: CONTRACT

### Purpose
Present the complete plan to user for approval BEFORE any execution.

### Process

```yaml
contract:
  step_1: "Format decomposition into contract"
  step_2: "Present to user"
  step_3: "Wait for approval (🔴 BLOCKING)"
  step_4: "If approved, create Tasks and begin"
  step_5: "If adjustments needed, iterate"
```

### Reference
Use `contracts/template.md` for contract format.

### Contract Must Include

1. **Request Summary** - What we understood
2. **Answers Recap** - Key clarifications
3. **Deliverables Table** - What will be produced
4. **Task Sequence** - Visual dependency graph
5. **Checkpoints** - Where we'll pause for review
6. **Estimate** - Total effort and duration
7. **Approval Request** - Explicit gate

### Approval Responses

| Response | Action |
|----------|--------|
| "Approved" / "Yes" / "Go" | Create Tasks, begin execution |
| "Adjust [X]" | Modify plan, re-present |
| "Question about [X]" | Clarify, then re-present |
| "Cancel" | Abort, no execution |

---

## Quick Reference: Complete Flow

```
User: "Add Stripe payments"

┌─ CLASSIFY ──────────────────────────────────────┐
│ Domain: tech                                     │
│ Type: new_feature                                │
│ Complexity: L3                                   │
└──────────────────────────────────────────────────┘
                    │
                    ▼
┌─ CLARIFY ───────────────────────────────────────┐
│ Problem: Users can't purchase subscriptions      │
│ User: Free users upgrading                       │
│ Success: 3-tier subscription flow                │
│ Out of scope: PayPal, invoicing                  │
│ Context: Next.js 14, Prisma, PostgreSQL          │
└──────────────────────────────────────────────────┘
                    │
                    ▼
┌─ DECOMPOSE ─────────────────────────────────────┐
│ T-001: ADR (2h) 🔴                               │
│ T-002: API Design (3h) 🔴 → depends T-001        │
│ T-003: DB Schema (2h) 🟢 → depends T-002         │
│ T-004: Webhooks (4h) 🟢 → depends T-003          │
│ T-005: API (4h) 🟡 → depends T-003               │
│ T-006: Pricing UI (4h) 🟢 → depends T-002        │
│ T-007: Checkout UI (6h) 🟢 → depends T-005,T-006 │
│ T-008: Tests (4h) 🔴 → depends T-004,T-005,T-007 │
│                                                  │
│ Total: 29h (~4 days)                             │
└──────────────────────────────────────────────────┘
                    │
                    ▼
┌─ CONTRACT ──────────────────────────────────────┐
│ [Present formatted plan]                         │
│                                                  │
│ ⚠️ Do you approve this plan?                    │
│ → Approved / Adjust / Question / Cancel          │
└──────────────────────────────────────────────────┘
                    │
                    ▼
           🔴 USER APPROVAL
                    │
                    ▼
┌─ EXECUTE ───────────────────────────────────────┐
│ Create Claude Tasks with dependencies            │
│ Execute T-001...                                 │
│ Update task status as work progresses            │
│ Pause at 🔴 gates for review                     │
└──────────────────────────────────────────────────┘
```

---

## Files in this Directory

| File | Purpose |
|------|---------|
| `PROTOCOL.md` | This document - full protocol |
| `classification.yaml` | Classification matrix |
| `templates/new-feature.yaml` | Intake questions for new features |
| `templates/bugfix.yaml` | Intake questions for bugfixes |
| `templates/enhancement.yaml` | Intake questions for enhancements |
| `templates/question.yaml` | Intake for questions/help |
| `templates/review.yaml` | Intake for code reviews |

---

## Integration with APEX

This protocol is **Stage 0** of APEX execution:

```
Stage 0: INTAKE (this protocol)
    ↓
Stage 1: PLANNING (for L3-L4)
    ↓
Stage 2: DEVELOPMENT
    ↓
Stage 3: VALIDATION
    ↓
Stage 4: DELIVERY
```

For L0-L2 requests, intake leads directly to execution.
For L3-L4 requests, intake feeds into full planning phase.

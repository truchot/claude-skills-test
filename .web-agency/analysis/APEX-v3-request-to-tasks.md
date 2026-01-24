# APEX v3 - From Request to Tasks: Deep Analysis

**Date**: 2026-01-23
**Focus**: How to transform user requests into executable task lists
**Comparison**: BMAD methodology

---

## The Core Problem

When a user says "Add Stripe payments", what should happen?

### Current APEX Flow (Problematic)

```
User: "Add Stripe payments"
         │
         ▼
┌─────────────────────────────────────────┐
│  AI INTERPRETS                          │
│  - What does "Stripe payments" mean?    │
│  - One-time? Subscriptions? Both?       │
│  - Which pages? Checkout? Account?      │
│  - What's the tech stack?               │
│  - What exists already?                 │
└─────────────────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────────┐
│  AI DECIDES (without structured input)  │
│  - Complexity: L3? L2?                  │
│  - Role: Tech Architect? Lead Dev?      │
│  - Workflow: feature? task?             │
└─────────────────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────────┐
│  AI EXECUTES (hoping assumptions OK)    │
│  - Starts coding or designing           │
│  - May go wrong direction               │
│  - Discovers missing info mid-task      │
└─────────────────────────────────────────┘
```

**Problems:**
1. **Interpretation without clarification** - AI guesses instead of asking
2. **No structured intake** - Questions are ad-hoc or missing
3. **No task contract** - User doesn't see/approve plan before execution
4. **No traceable decomposition** - Can't track progress on sub-tasks

---

### BMAD Flow (What Works)

```
User: "Add Stripe payments"
         │
         ▼
┌─────────────────────────────────────────┐
│  STRUCTURED INTAKE (workflow.yaml)      │
│  Questions defined per workflow type:   │
│  - Payment types needed?                │
│  - Existing checkout flow?              │
│  - Subscription tiers?                  │
└─────────────────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────────┐
│  CONTEXT LOADED (discover_inputs)       │
│  Automatically loads:                   │
│  - Existing architecture docs           │
│  - Related ADRs                         │
│  - Current payment code (if any)        │
└─────────────────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────────┐
│  TASK CONTRACT GENERATED                │
│  User sees and approves:                │
│  - Deliverables list                    │
│  - Task breakdown                       │
│  - Checkpoints                          │
└─────────────────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────────┐
│  MECHANICAL EXECUTION                   │
│  Step-by-step with state tracking       │
└─────────────────────────────────────────┘
```

**BMAD Advantages:**
1. **Structured questions** before any work
2. **Automatic context loading** based on workflow type
3. **Explicit contract** user approves before execution
4. **Traceable tasks** with clear progress

---

## Gap Analysis: Request → Tasks Pipeline

| Stage | BMAD | APEX Current | Gap |
|-------|------|--------------|-----|
| **1. Classification** | Explicit workflow selection | AI interprets freely | No classification protocol |
| **2. Clarification** | Structured intake per type | Ad-hoc questions | No intake templates |
| **3. Context** | discover_inputs auto-loads | AI decides what to load | Inconsistent loading |
| **4. Decomposition** | Workflow defines steps | AI invents decomposition | No decomposition protocol |
| **5. Contract** | User approves before start | No contract step | User surprised by approach |
| **6. Tracking** | Step-level state | Workflow-level state | Can't track sub-tasks |

---

## Proposed Solution: Request-to-Tasks Pipeline

### Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                    REQUEST-TO-TASKS PIPELINE                     │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌──────────┐    ┌──────────┐    ┌──────────┐    ┌──────────┐  │
│  │ CLASSIFY │ → │ CLARIFY  │ → │ DECOMPOSE│ → │ CONTRACT │  │
│  └──────────┘    └──────────┘    └──────────┘    └──────────┘  │
│       │              │               │               │          │
│       ▼              ▼               ▼               ▼          │
│  ┌──────────┐    ┌──────────┐    ┌──────────┐    ┌──────────┐  │
│  │ Domain   │    │ Intake   │    │ Task     │    │ User     │  │
│  │ + Type   │    │ Complete │    │ List     │    │ Approval │  │
│  └──────────┘    └──────────┘    └──────────┘    └──────────┘  │
│                                                                  │
│  ════════════════════════════════════════════════════════════   │
│                         THEN EXECUTE                             │
└─────────────────────────────────────────────────────────────────┘
```

---

## Stage 1: CLASSIFY

### Purpose
Mechanically categorize the request before any interpretation.

### Classification Matrix

```yaml
classification:
  # Step 1: Identify domain
  domain:
    tech:
      triggers: [code, api, database, bug, feature, deploy, test]
      command: /tech
    design:
      triggers: [ui, ux, component, design, accessibility, wireframe]
      command: /design
    project:
      triggers: [estimate, plan, timeline, sprint, priority]
      command: /project
    marketing:
      triggers: [seo, content, campaign, analytics, growth]
      command: /marketing

  # Step 2: Identify request type
  type:
    new_feature:
      triggers: [add, create, implement, build, new]
      requires: [requirements, acceptance_criteria]
    enhancement:
      triggers: [improve, optimize, refactor, update, enhance]
      requires: [current_state, desired_state]
    bugfix:
      triggers: [fix, bug, broken, error, issue, not working]
      requires: [expected, actual, steps_to_reproduce]
    question:
      triggers: [how, why, what, explain, help, "?"]
      requires: [context]
    review:
      triggers: [review, check, audit, evaluate]
      requires: [artifact_to_review]

  # Step 3: Assess complexity
  complexity:
    L0_hotfix:
      signals: [production, urgent, critical, down]
      max_duration: "2 hours"
    L1_task:
      signals: [small, simple, quick, minor]
      max_duration: "1 day"
    L2_story:
      signals: [story, user story, feature part]
      max_duration: "5 days"
    L3_feature:
      signals: [feature, epic, multiple components]
      max_duration: "4 weeks"
    L4_product:
      signals: [product, mvp, platform, system]
      max_duration: "months"
```

### Classification Output

```yaml
# AI produces this BEFORE any other work
classification_result:
  request: "Add Stripe payments"
  domain: tech
  type: new_feature
  complexity: L3_feature
  confidence: 0.8

  if_confidence_low:
    ask: "Is this a new feature or enhancement to existing payments?"
```

---

## Stage 2: CLARIFY (Structured Intake)

### Purpose
Ask the RIGHT questions based on classification, BEFORE starting work.

### Intake Templates

```yaml
# intake/templates/new-feature.yaml
intake_template:
  type: new_feature

  required_questions:
    - id: problem
      question: "What problem does this solve?"
      why: "Ensures we build the right thing"
      example: "Users can't pay for premium features"

    - id: user
      question: "Who is the primary user?"
      why: "Focuses the solution"
      example: "Paying customers on web app"

    - id: success
      question: "How do we know it's successful?"
      why: "Defines done criteria"
      example: "Users can complete payment in <30 seconds"

    - id: scope
      question: "What's explicitly OUT of scope?"
      why: "Prevents scope creep"
      example: "Mobile app payments (phase 2)"

  conditional_questions:
    - id: integration
      if: "involves third-party service"
      question: "Which service/API?"
      example: "Stripe, PayPal, etc."

    - id: existing
      if: "enhancement or related feature exists"
      question: "What exists today?"
      example: "We have a cart but no checkout"

  context_to_load:
    - ".project/03-architecture/stack.md"
    - ".project/02-requirements/PRD.md"
    - "Related feature specs if they exist"
```

```yaml
# intake/templates/bugfix.yaml
intake_template:
  type: bugfix

  required_questions:
    - id: expected
      question: "What should happen?"
      example: "User clicks 'Pay' and sees confirmation"

    - id: actual
      question: "What actually happens?"
      example: "User clicks 'Pay' and gets error 500"

    - id: reproduce
      question: "Steps to reproduce?"
      example: "1. Go to checkout 2. Click Pay 3. See error"

    - id: frequency
      question: "How often? (always/sometimes/rare)"
      example: "Always on Safari, sometimes on Chrome"

  conditional_questions:
    - id: recent_change
      if: "started recently"
      question: "What changed before it broke?"

    - id: affected_users
      if: "production issue"
      question: "How many users affected?"

  context_to_load:
    - "Error logs if available"
    - "Recent commits to affected area"
    - "Related code files"
```

### Intake Output

```yaml
# AI produces this AFTER asking questions
intake_result:
  classification:
    domain: tech
    type: new_feature
    complexity: L3_feature

  answers:
    problem: "Users can't purchase premium subscriptions"
    user: "Free users wanting to upgrade"
    success: "Complete Stripe subscription flow with 3 tiers"
    scope_out: "PayPal, crypto, invoicing"
    integration: "Stripe Subscriptions API"
    existing: "User accounts exist, no payment system"

  context_loaded:
    - ".project/03-architecture/stack.md" → "Next.js 14, Prisma, PostgreSQL"
    - "No existing payment code found"

  ready_for_decomposition: true
```

---

## Stage 3: DECOMPOSE

### Purpose
Break down the clarified request into discrete, trackable tasks.

### Decomposition Protocol

```yaml
decomposition_protocol:
  step_1_deliverables:
    question: "What artifacts will be produced?"
    output_types:
      - document (PRD, spec, ADR)
      - code (component, API, migration)
      - config (env, CI/CD, infra)
      - test (unit, integration, e2e)

  step_2_sequence:
    question: "What order? What depends on what?"
    rules:
      - "Design before code"
      - "Database before API"
      - "API before frontend"
      - "Code before tests"
      - "Tests before deploy"

  step_3_agents:
    question: "Which agent handles each deliverable?"
    mapping:
      document: [prd-writer, api-design, decision]
      code: [frontend-implementation, backend-implementation]
      test: [testing]
      review: [code-review]

  step_4_gates:
    question: "Where are checkpoints needed?"
    rules:
      - "🔴 After design/architecture decisions"
      - "🟡 After significant code blocks"
      - "🟢 After automated checks"

  step_5_estimate:
    question: "Rough effort per task?"
    guidance:
      - "Tasks should be < 1 day each"
      - "If > 1 day, split further"
```

### Decomposition Output

```yaml
# AI produces this task breakdown
decomposition_result:
  request: "Add Stripe subscription payments"

  deliverables:
    - id: D-001
      name: "Payment Architecture ADR"
      type: document
      agent: tech-architect/decision

    - id: D-002
      name: "Stripe Integration Spec"
      type: document
      agent: tech-architect/api-design

    - id: D-003
      name: "Database Schema (subscriptions)"
      type: code
      agent: developer/backend-implementation

    - id: D-004
      name: "Stripe Webhook Handler"
      type: code
      agent: developer/backend-implementation

    - id: D-005
      name: "Subscription API Endpoints"
      type: code
      agent: developer/backend-implementation

    - id: D-006
      name: "Pricing Page Component"
      type: code
      agent: developer/frontend-implementation

    - id: D-007
      name: "Checkout Flow Component"
      type: code
      agent: developer/frontend-implementation

    - id: D-008
      name: "Integration Tests"
      type: test
      agent: developer/testing

  tasks:
    - id: T-001
      description: "Write ADR for Stripe vs alternatives"
      deliverable: D-001
      depends_on: []
      effort: "2h"

    - id: T-002
      description: "Design Stripe integration architecture"
      deliverable: D-002
      depends_on: [T-001]
      effort: "3h"

    - id: T-003
      description: "Create subscription tables migration"
      deliverable: D-003
      depends_on: [T-002]
      effort: "2h"

    - id: T-004
      description: "Implement Stripe webhook handler"
      deliverable: D-004
      depends_on: [T-003]
      effort: "4h"

    - id: T-005
      description: "Create subscription CRUD endpoints"
      deliverable: D-005
      depends_on: [T-003]
      effort: "4h"

    - id: T-006
      description: "Build pricing page with tier selection"
      deliverable: D-006
      depends_on: [T-002]
      effort: "4h"

    - id: T-007
      description: "Build checkout flow with Stripe Elements"
      deliverable: D-007
      depends_on: [T-005, T-006]
      effort: "6h"

    - id: T-008
      description: "Write integration tests for payment flow"
      deliverable: D-008
      depends_on: [T-004, T-005, T-007]
      effort: "4h"

  gates:
    - after: T-001
      type: 🔴
      reason: "Architecture decision requires approval"

    - after: T-002
      type: 🔴
      reason: "Integration design requires approval"

    - after: T-005
      type: 🟡
      reason: "Backend complete, review before frontend"

    - after: T-008
      type: 🔴
      reason: "Full review before deployment"

  critical_path: [T-001, T-002, T-003, T-005, T-007, T-008]
  estimated_total: "29 hours (~4 days)"
```

---

## Stage 4: CONTRACT

### Purpose
Present the plan to user for approval BEFORE any execution.

### Contract Format

```markdown
## 📋 Execution Contract

### Request
"Add Stripe subscription payments"

### Understanding
- **Problem**: Users can't purchase premium subscriptions
- **User**: Free users wanting to upgrade
- **Success**: Complete Stripe subscription flow with 3 tiers
- **Out of scope**: PayPal, crypto, invoicing

### Deliverables
| # | Deliverable | Agent | Gate |
|---|-------------|-------|------|
| D-001 | Payment Architecture ADR | tech-architect | 🔴 |
| D-002 | Stripe Integration Spec | tech-architect | 🔴 |
| D-003 | Database Schema | backend | 🟢 |
| D-004 | Webhook Handler | backend | 🟢 |
| D-005 | Subscription API | backend | 🟡 |
| D-006 | Pricing Page | frontend | 🟢 |
| D-007 | Checkout Flow | frontend | 🟢 |
| D-008 | Integration Tests | testing | 🔴 |

### Task Sequence
```
T-001: Write ADR ─────────────────────┐
                                      ▼
T-002: Design integration ───┬─── T-006: Pricing page
                             │
                             ▼
T-003: Database schema ──┬── T-004: Webhooks
                         │
                         ▼
                    T-005: API ──────┐
                                     ▼
                              T-007: Checkout
                                     │
                                     ▼
                              T-008: Tests
```

### Checkpoints
1. 🔴 After T-001 (ADR) - Approve architecture choice
2. 🔴 After T-002 (Spec) - Approve integration design
3. 🟡 After T-005 (API) - Review backend before frontend
4. 🔴 After T-008 (Tests) - Final review before deploy

### Estimate
~29 hours (~4 working days)

---

⚠️ **APPROVAL REQUIRED**

Do you approve this plan?
- ✅ **"Approved"** → I start execution
- ✏️ **"Adjust"** → Tell me what to change
- ❓ **"Question"** → I clarify
```

---

## Execution: Using TodoWrite

Once contract is approved, AI uses TodoWrite to track:

```yaml
todos:
  - content: "Write ADR for Stripe vs alternatives"
    status: in_progress
    activeForm: "Writing payment architecture ADR"

  - content: "Design Stripe integration architecture"
    status: pending
    activeForm: "Designing Stripe integration"

  - content: "Create subscription tables migration"
    status: pending
    activeForm: "Creating database migration"

  # ... etc
```

### Execution Rules

1. **One task at a time** - Mark `in_progress`, complete, then next
2. **Update on completion** - Mark `completed` immediately when done
3. **Gate respect** - At 🔴 gates, STOP and present checkpoint
4. **State persistence** - Update `state/current.json` at each step

---

## File Structure for Implementation

```
.web-agency/
├── intake/
│   ├── PROTOCOL.md              # Full request-to-tasks protocol
│   ├── classification.yaml      # Classification matrix
│   └── templates/
│       ├── new-feature.yaml
│       ├── enhancement.yaml
│       ├── bugfix.yaml
│       ├── question.yaml
│       └── review.yaml
│
├── contracts/
│   ├── template.md              # Contract format
│   └── examples/
│       └── stripe-integration.md
│
└── decomposition/
    ├── PROTOCOL.md              # Decomposition rules
    └── patterns/
        ├── crud-feature.yaml    # Common decomposition patterns
        ├── integration.yaml
        └── refactoring.yaml
```

---

## Summary: The 4-Stage Pipeline

| Stage | Input | Output | Gate |
|-------|-------|--------|------|
| **CLASSIFY** | Raw request | Domain + Type + Complexity | Auto |
| **CLARIFY** | Classification | Answered questions + Context | Auto |
| **DECOMPOSE** | Clarified request | Task list with dependencies | Auto |
| **CONTRACT** | Decomposition | User-approved plan | 🔴 BLOCKING |
| **EXECUTE** | Approved contract | Deliverables | Per task |

---

## Key Principle

> **No execution without contract.**

The AI should NEVER start coding or producing artifacts until:
1. Request is classified
2. Questions are answered
3. Tasks are decomposed
4. User approves the contract

This prevents:
- Building the wrong thing
- Scope creep
- Wasted effort
- User surprise

---

## Comparison: Before and After

### Before (Current APEX)
```
User: "Add Stripe payments"
AI: *starts designing/coding based on assumptions*
... 2 hours later ...
AI: "Here's the Stripe integration!"
User: "I wanted subscriptions, not one-time payments..."
AI: *starts over*
```

### After (APEX v3)
```
User: "Add Stripe payments"
AI: "Let me clarify a few things first..."
   - Payment type? → "Subscriptions"
   - Tiers? → "3 tiers"
   - Existing code? → "None"
AI: "Here's my plan: [contract]"
AI: "Do you approve?"
User: "Yes" / "Adjust X"
AI: *executes approved plan with tracking*
```

---

## Next Steps

1. **Create `intake/PROTOCOL.md`** - Full classification + intake protocol
2. **Create intake templates** - Per request type
3. **Create `contracts/template.md`** - Standard contract format
4. **Update ORCHESTRATOR.md** - Integrate 4-stage pipeline
5. **Update README Quick Start** - Reflect new flow

# Handoff Protocol

This file defines how agents **communicate** and **pass the baton**.

---

## Principle

A handoff is a **structured transfer** of context and responsibility between:
- Two agents
- An agent and the orchestrator
- An agent and the human

```
┌─────────────┐                    ┌─────────────┐
│   Agent A   │                    │   Agent B   │
│             │                    │             │
│  [Execute]  │                    │             │
│      │      │   ┌──────────┐    │             │
│      └──────┼──►│ HANDOFF  │────┼──► [Start]  │
│             │   │ PACKAGE  │    │             │
│             │   └──────────┘    │             │
└─────────────┘                    └─────────────┘
```

---

## Handoff Package Structure

```yaml
handoff:
  # Metadata
  id: "HO-2024-001"
  timestamp: "2024-01-15T14:30:00Z"

  # Who
  from:
    agent: "[agent-id]"
    step: "[workflow step if applicable]"
  to:
    agent: "[agent-id]"
    reason: "[why this agent]"

  # Transferred context
  context:
    summary: |
      [2-3 sentence summary of what was done]

    decisions:
      - id: "D-001"
        decision: "[decision made]"
        rationale: "[why]"

    artifacts:
      - path: "[path to created file]"
        type: "[spec | code | doc | config]"
        description: "[what it is]"

    open_questions:
      - question: "[unresolved question]"
        priority: "[high | medium | low]"
        context: "[additional context]"

  # Expectations
  expectations:
    deliverable: "[what is expected from the next agent]"
    constraints:
      - "[constraint 1]"
      - "[constraint 2]"
    success_criteria:
      - "[criterion 1 for considering task successful]"

  # Workflow state
  workflow_state:
    name: "[workflow name]"
    current_step: [N]
    completed_steps: ["step1", "step2"]
    remaining_steps: ["step3", "step4"]
```

---

## Handoff Types

### 1. Sequential (Workflow)

Agent → Next agent in the workflow.

```yaml
handoff:
  from:
    agent: specification
    step: 2
  to:
    agent: architecture
    reason: "Specs validated, moving to design"
  context:
    summary: "User stories defined and validated by client"
    artifacts:
      - path: ".project/02-requirements/user-stories/US-001.md"
```

### 2. Delegation (Specialist)

Agent → Specialized agent for a sub-task.

```yaml
handoff:
  from:
    agent: architecture
    step: 3
  to:
    agent: security-check
    reason: "Need security validation before finalization"
  expectations:
    deliverable: "Risk report on proposed architecture"
    constraints:
      - "Focus on authentication and sensitive data"
    success_criteria:
      - "No unaddressed critical risks"
  context:
    summary: "API architecture defined, needs security review"
```

### 3. Escalation (Human)

Agent → Human for decision/validation.

```yaml
handoff:
  from:
    agent: estimation
    step: 2
  to:
    agent: human
    reason: "Business decision required"
  context:
    summary: "Two possible approaches with significant trade-offs"
    decisions:
      - id: "pending"
        decision: "Choice between approach A (fast, debt) or B (robust, long)"
        rationale: "Depends on business priority"
    open_questions:
      - question: "What is the priority: time-to-market or maintainability?"
        priority: high
  expectations:
    deliverable: "Validated choice with justification"
```

### 4. Return

Specialized agent → Calling agent.

```yaml
handoff:
  from:
    agent: security-check
    step: null  # Not in main workflow
  to:
    agent: architecture
    reason: "Security review completed"
  context:
    summary: "2 risks identified, recommendations provided"
    artifacts:
      - path: ".project/05-quality/security/review-2024-01.md"
    decisions:
      - id: "SEC-001"
        decision: "JWT with refresh token rotation"
        rationale: "Security/UX balance"
```

---

## Handoff Rules

### 1. Never Implicit Context

```yaml
# FORBIDDEN
context:
  summary: "It's done"

# REQUIRED
context:
  summary: "Specifications completed: 3 epics, 12 user stories, personas defined"
  artifacts:
    - path: ".project/02-requirements/epics/EP-001.md"
    - path: ".project/02-requirements/user-stories/"
```

### 2. Artifacts Always Referenced

Every created file must be in `artifacts` with its exact path.

### 3. Open Questions Documented

If the agent couldn't resolve everything, open questions are explicit.

### 4. Measurable Success Criteria

```yaml
# BAD
success_criteria:
  - "Write good code"

# GOOD
success_criteria:
  - "Unit tests > 80% coverage"
  - "No OWASP Top 10 vulnerabilities"
  - "Build passes in CI"
```

---

## Receiving a Handoff

When an agent receives a handoff, it MUST:

### 1. Validate the Package

```yaml
validation:
  - [ ] summary present and understandable
  - [ ] all artifacts exist
  - [ ] expectations.deliverable clear
  - [ ] constraints compatible with my capabilities
```

### 2. Acknowledge Receipt

```yaml
acknowledgment:
  received: true
  from: "[source agent]"
  understood:
    task: "[task reformulation]"
    constraints: "[understood constraints]"
  questions: []  # or list of clarifications if needed
  starting: true
```

### 3. Signal Problems

If the handoff is incomplete or ambiguous:

```yaml
acknowledgment:
  received: true
  understood: partial
  blockers:
    - "Artifact .project/specs/feature.md not found"
    - "Constraint 'quickly' not measurable"
  action: request_clarification
```

---

## Handoff to Human (Gate)

Special case: HITL gates are handoffs to the human.

```yaml
handoff:
  from:
    agent: "[current agent]"
  to:
    agent: human
    reason: "BLOCKING gate reached"

  gate:
    type: blocking
    name: "[gate name]"
    step: "[workflow step]"

  context:
    summary: "[what was done]"
    artifacts: [...]

  validation_request:
    items:
      - "[point 1 to validate]"
      - "[point 2 to validate]"
    options:
      approve: "Continue with next step"
      reject: "Adjustments required"
      question: "Clarification needed"
```

---

## Persistence

Each handoff is logged in state:

```json
// state/current.json
{
  "handoffs": [
    {
      "id": "HO-001",
      "timestamp": "...",
      "from": "specification",
      "to": "architecture",
      "status": "completed"
    }
  ]
}
```

And archived in the project:

```
.project/07-audit/sessions/SESSION-ID/
├── handoffs/
│   ├── HO-001.yaml
│   └── HO-002.yaml
```

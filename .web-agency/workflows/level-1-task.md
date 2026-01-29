---
name: level-1-task
description: Small task that can be completed in less than a day. Minimal process.
complexity: "< 1 day"
gates: [🟡 Code review]
skip_phases: [formal-planning, design]
---

# Level 1: Task Workflow

## When to Use

- Bug fix (non-critical)
- Small improvement
- Configuration change
- Documentation update
- Minor UI tweak

## NOT for

- Anything requiring design
- Changes affecting multiple components
- Features needing stakeholder input

## Workflow

```
┌──────────────────┐
│  1. UNDERSTAND   │ ← Clear what needs to be done
│   (15-30 min)    │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│  2. IMPLEMENT    │ ← Write code/make change
│   (< 1 day)      │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│  3. SELF-TEST    │ ← Developer verifies
│   (30 min)       │
└────────┬─────────┘
         │
         ▼
┌──────────────────────────────┐
│  4. CODE REVIEW  🟡 ADVISORY │ ← Peer reviews
│   (< 2 hours)                │
└────────┬─────────────────────┘
         │
         ▼
┌──────────────────┐
│  5. MERGE        │ ← Integrate changes
│   (immediate)    │
└──────────────────┘
```

## Roles Involved

| Role | Responsibility |
|------|----------------|
| Developer | Implement and self-test |
| Lead Developer | Code review |

## Gates

```yaml
gates:
  understanding:
    type: "🟢 AUTOMATIC"
    condition: "Requirements clear from ticket"

  code_review:
    type: "🟡 ADVISORY"
    condition: "Peer approval"
    bypass: "Lead Developer can self-merge for trivial changes"
```

## Inputs Required

```yaml
task_input:
  ticket:
    id: "[TASK-XXX]"
    description: "[What needs to be done]"
    acceptance: "[How to verify it's done]"

  context:
    files_affected: ["[Likely files]"]
    related_tickets: ["[If any]"]
```

## Outputs Produced

```yaml
task_output:
  code:
    branch: "task/[ticket-id]-[short-description]"
    pr: "[PR link]"

  verification:
    tests_added: "[If applicable]"
    manual_test: "[What was tested]"

  documentation:
    updated: "[If needed]"
```

## Process Details

### 1. Understand (15-30 min)
- Read the ticket thoroughly
- Check related code
- Clarify any ambiguity with requester
- Estimate if it's truly < 1 day

### 2. Implement (< 1 day)
- Create branch
- Write code following standards
- Add tests if logic is added
- Keep commits atomic

### 3. Self-Test (30 min)
- Run existing tests
- Test the specific change
- Check edge cases
- Verify no regressions

### 4. Code Review (< 2 hours)
- Create PR with clear description
- Request review from peer
- Address feedback
- Don't over-engineer based on review

### 5. Merge
- Squash or merge per team convention
- Delete branch
- Update ticket status

## Rules

### DO
- Keep it small
- Test your changes
- Write clear PR descriptions
- Respond to reviews quickly

### DO NOT
- Scope creep ("while I'm here...")
- Skip self-testing
- Merge without any review
- Leave tickets in limbo

## Escalation

| Situation | Action |
|-----------|--------|
| Task is bigger than expected | Upgrade to Level 2 |
| Design decision needed | Escalate to Lead/Architect |
| Blocked by dependency | Document and communicate |
| Review taking too long | Ping reviewer, escalate if needed |

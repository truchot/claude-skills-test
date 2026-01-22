# Workflow: Feature Development

Complete production chain for developing a new feature, with **Human-in-the-Loop** (HITL) at key steps.

## HITL Principle

```
🔴 BLOCKING GATE = AI stops and waits for human validation
🟡 ADVISORY GATE = AI presents and proposes to continue
🟢 AUTO GATE = Automatic verification (tests, lint)
```

## Overview

```
┌─────────────────────────────────────────────────────────────────┐
│  1. QUALIFICATION                                                │
│     Skill: intake/qualification.md                               │
│     Deliverable: Technical brief                                 │
│     HITL: 🟡 ADVISORY                                            │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│  2. ESTIMATION & BREAKDOWN                                       │
│     Skills: strategy/estimation.md + strategy/task-breakdown.md  │
│     Deliverables: Estimation, Task breakdown, Risks              │
│     HITL: 🔴 BLOCKING ⚠️ No implementation without validation    │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│  3. TECHNICAL SPECIFICATION                                      │
│     Skills: strategy/specification.md + strategy/architecture.md │
│     Deliverables: Technical spec, Architecture, ADR              │
│     HITL: 🔴 BLOCKING ⚠️ No code without validated spec          │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│  4. IMPLEMENTATION                                               │
│     Skills: development/frontend.md, development/backend.md      │
│     Deliverables: Code, Unit tests                               │
│     HITL: 🟢 AUTO (tests pass, lint OK)                          │
│     Mode: AUTONOMOUS (specs validated)                           │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│  5. CODE REVIEW                                                  │
│     Skill: quality/code-review.md                                │
│     Deliverable: Review report                                   │
│     HITL: 🟡 ADVISORY (presents findings)                        │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│  6. DEPLOYMENT                                                   │
│     Skill: operations/deployment.md                              │
│     Steps: Staging → Production                                  │
│     HITL: 🔴 BLOCKING before prod ⚠️                             │
└─────────────────────────────────────────────────────────────────┘
```

---

## Step 1: Qualification

### Skill
`skills/intake/qualification.md`

### Objective
Understand and formalize the need before any work.

### Process
1. Analyze the user request
2. Clarify ambiguities (ask questions)
3. Identify context, users, constraints, dependencies

### Deliverable: Technical Brief

```markdown
# Technical Brief: [Feature Name]

## Context
[Why this feature? What problem does it solve?]

## Functional Description
[What needs to be done, from the user's perspective]

## Target Users
[Who will use this feature?]

## Acceptance Criteria
- [ ] [Criterion 1 - verifiable]
- [ ] [Criterion 2 - verifiable]
- [ ] [Criterion 3 - verifiable]

## Identified Constraints
- [Constraint 1]
- [Constraint 2]

## Dependencies
- [External or internal dependency]

## Open Questions
- [Unresolved question → to clarify]

## Priority
[P1/P2/P3/P4] - [Justification]
```

### HITL: 🟡 ADVISORY

```markdown
---
## 🟡 Technical brief ready

**Feature**: [Name]
**Acceptance criteria**: [N] defined
**Constraints**: [Short list]

Do you confirm this scope before estimation?

→ If OK, I proceed to estimation and breakdown.
→ If adjustments needed, tell me what to clarify.
---
```

---

## Step 2: Estimation & Breakdown

### Skills
- `skills/strategy/estimation.md`
- `skills/strategy/task-breakdown.md`
- `skills/strategy/risk-analysis.md`

### Objective
**MANDATORY before any implementation**: estimate effort, break down into tasks, identify risks.

### Deliverable 1: Macro Estimation

```markdown
# Estimation: [Feature Name]

## Global Estimation

| Metric | Value |
|--------|-------|
| Complexity | [S/M/L/XL] |
| Estimated effort | [X] person-days |
| Calendar duration | [Y] days |
| Range | [Min] - [Max] days |

## Breakdown

| Domain | Effort | Justification |
|--------|--------|---------------|
| Specification | Xh | [Why] |
| Backend | Xh | [Why] |
| Frontend | Xh | [Why] |
| Tests | Xh | [Why] |
| Review & Deploy | Xh | [Why] |

## Assumptions
- [Assumption 1: condition for estimation to hold]
- [Assumption 2]

## Variability Factors
| Factor | Impact if realized |
|--------|-------------------|
| [Factor 1] | +X days |
| [Factor 2] | +Y days |
```

### Deliverable 2: Task Breakdown

```markdown
# Task Breakdown: [Feature Name]

## Identified Tasks

### Task 1: [Clear and actionable title]
- **Domain**: [Backend/Frontend/DevOps/Full-stack]
- **Effort**: [X]h
- **Dependencies**: [None / Task N]
- **Definition of Done**:
  - [ ] [Criterion 1]
  - [ ] [Criterion 2]

### Task 2: [Title]
...

## Recommended Execution Order

1. [Task X] - Blocking for others
2. [Task Y] - Can start after X
3. [Task Z] - Parallelizable with Y

## External Dependencies

| Dependency | Responsible | Status | Blocking? |
|------------|-------------|--------|-----------|
| [Third-party API] | [Who] | [To confirm] | [Yes/No] |
```

### Deliverable 3: Risk Analysis

```markdown
# Risks: [Feature Name]

## Risk Matrix

### 🔴 High (to address before starting)

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| [Risk] | High | High | [Concrete action] |

### 🟡 Medium (to monitor)

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| [Risk] | Medium | Medium | [Action] |

### 🟢 Low (accepted)

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| [Risk] | Low | Low | [Accepted / Monitor] |

## Contingency Plan

If [major risk] materializes:
→ [Action 1]
→ [Action 2]
→ [Decision point: abandon / pivot / continue]
```

### HITL: 🔴 BLOCKING

```markdown
---
## 🔴 CHECKPOINT - MANDATORY Validation

### Deliverables produced

| Deliverable | Summary |
|-------------|---------|
| Estimation | [X] p/d, range [Min-Max] |
| Breakdown | [N] tasks |
| Risks | [X] high, [Y] medium |

### Key Points

- **Total effort**: [X] person-days
- **Estimated duration**: [Y] calendar days
- **Critical tasks**: [List]
- **Major risks**: [List]

### Assumptions to validate

- [ ] [Assumption 1]
- [ ] [Assumption 2]

---

⚠️ **I CANNOT PROCEED TO SPECIFICATION WITHOUT YOUR VALIDATION**

Do you validate:
- [ ] The global estimation
- [ ] The task breakdown
- [ ] The identified risks
- [ ] The assumptions

**Reply**:
- ✅ **"Validated"** → I proceed to technical specification
- ❌ **"Adjust"** → Specify what to review
- ❓ **Questions** → I clarify before continuing

---
```

---

## Step 3: Technical Specification

### Skills
- `skills/strategy/specification.md`
- `skills/strategy/architecture.md`

### Objective
Define **HOW** to implement. No code is written before spec validation.

### Deliverable 1: Technical Specification

```markdown
# Technical Specification: [Feature]

## 1. Approach Summary
[2-3 paragraphs explaining the chosen technical solution]

## 2. Architecture

### Impacted Components
| Component | Action | Description |
|-----------|--------|-------------|
| [Component] | Create/Modify | [What changes] |

### Diagram
```
[ASCII schema or Mermaid reference]
```

## 3. Data Model

### New Entities
```prisma
model NewEntity {
  id        String   @id @default(cuid())
  // ...
}
```

### Modifications
```prisma
model ExistingEntity {
  // Field addition
  newField String?
}
```

### Migrations
- [ ] Migration 1: [Description + reversibility]

## 4. API

### Endpoints
| Method | Route | Description | Auth |
|--------|-------|-------------|------|
| POST | /api/xxx | Create | Yes |
| GET | /api/xxx/:id | Read | Yes |

### Contracts
```typescript
// Request
interface CreateXxxRequest {
  field1: string;
}

// Response
interface CreateXxxResponse {
  id: string;
  field1: string;
  createdAt: string;
}

// Errors
type CreateXxxError =
  | { code: 'VALIDATION_ERROR'; message: string }
  | { code: 'NOT_FOUND'; message: string };
```

## 5. Frontend

### Components
| Component | Responsibility | Props |
|-----------|----------------|-------|
| [Component] | [Role] | [Main props] |

### State
```typescript
interface FeatureState {
  data: Xxx[];
  loading: boolean;
  error: Error | null;
}
```

### Routes/Pages
| Route | Page | Description |
|-------|------|-------------|
| /xxx | XxxPage | List of xxx |

## 6. Required Tests

### Unit (mandatory)
- [ ] [Function/Component]: [Test case]

### Integration (mandatory)
- [ ] [Endpoint]: [Scenario]

### E2E (if critical path)
- [ ] [User journey]

## 7. Security

- **Authentication**: [Required/No]
- **Authorization**: [Rules]
- **Validation**: [Zod schema]
- **Sensitive data**: [Measures]

## 8. Performance

- **Pagination**: [Yes/No, strategy]
- **Cache**: [Strategy]
- **Lazy loading**: [Yes/No]

## 9. Out of Scope (explicit)

- [What is NOT done in this feature]
- [What will be done in a future iteration]
```

### Deliverable 2: ADR (Architecture Decision Record)

*Only if structural decision*

```markdown
# ADR-XXX: [Decision Title]

## Status
[Proposed / Accepted / Deprecated]

## Context
[Why this decision must be made now]

## Options Considered

### Option A: [Name]
**Pros**:
- [+1]

**Cons**:
- [-1]

### Option B: [Name]
**Pros**:
- [+1]

**Cons**:
- [-1]

## Decision
[The chosen option and why]

## Consequences
- [Consequence 1]
- [Consequence 2]

## References
- [Link to external documentation if relevant]
```

### HITL: 🔴 BLOCKING

```markdown
---
## 🔴 CHECKPOINT - MANDATORY Validation

### Specification produced

| Element | Detail |
|---------|--------|
| Architecture | [1-line summary] |
| Data model | [N] entities ([X] new, [Y] modified) |
| API | [N] endpoints |
| Frontend | [N] components |
| ADR | [Yes: title / No] |

### Technical decisions made

1. [Decision 1]: [Choice made]
2. [Decision 2]: [Choice made]

### Points of attention

- [Point 1 requiring your attention]
- [Point 2]

---

⚠️ **I CANNOT WRITE CODE WITHOUT YOUR VALIDATION**

Do you validate:
- [ ] The proposed architecture
- [ ] The data model
- [ ] The technical choices
- [ ] The scope (in-scope vs out-of-scope)

**Reply**:
- ✅ **"Validated"** → I start implementation
- ❌ **"Adjust"** → Specify points to review
- ❓ **Questions** → I clarify

---
```

---

## Step 4: Implementation

### Skills
- `skills/development/frontend.md`
- `skills/development/backend.md`
- `skills/development/database.md`

### Mode: AUTONOMOUS

The specification has been validated. Implementation follows the plan without interruption.

### Process
1. Follow the specification task by task
2. Write tests alongside the code
3. Respect project conventions
4. Atomic and descriptive commits

### Deliverables
- Implemented source code
- Unit tests
- Integration tests

### HITL: 🟢 AUTO

```yaml
auto_checks:
  - npm run lint        # 0 errors
  - npm run type-check  # 0 errors
  - npm run test        # All pass
  - npm run build       # Success

on_failure:
  - Attempt automatic correction
  - If repeated failure → human escalation
```

---

## Step 5: Code Review

### Skill
`skills/quality/code-review.md`

### Deliverable: Review Report

```markdown
# Code Review: [Feature]

## Verdict: [APPROVED / CHANGES_REQUESTED]

## Summary

| Criterion | Status | Comment |
|-----------|--------|---------|
| Functional | ✅/⚠️/❌ | [Note] |
| Readability | ✅/⚠️/❌ | [Note] |
| Tests | ✅/⚠️/❌ | [Note] |
| Performance | ✅/⚠️/❌ | [Note] |
| Security | ✅/⚠️/❌ | [Note] |

## Positive Points
- [What is well done]

## To Fix

### 🔴 Blockers
| File | Line | Problem | Suggestion |
|------|------|---------|------------|
| [file] | [L] | [Issue] | [Fix] |

### 🟡 Recommended
| File | Line | Problem | Suggestion |
|------|------|---------|------------|
| [file] | [L] | [Issue] | [Fix] |

### 🟢 Suggestions (optional)
| File | Line | Suggestion |
|------|------|------------|
| [file] | [L] | [Improvement] |
```

### HITL: 🟡 ADVISORY

```markdown
---
## 🟡 Review completed

**Verdict**: [APPROVED / CHANGES_REQUESTED]
**Blockers**: [N]
**Recommended**: [M]

[If APPROVED]: Ready for deployment. Should I continue?

[If CHANGES_REQUESTED]: [N] corrections needed.
Should I apply them?

---
```

---

## Step 6: Deployment

### Skill
`skills/operations/deployment.md`

### Process
1. Merge to main (if feature branch)
2. Staging deployment
3. Staging smoke tests
4. **BLOCKING GATE** - Validation for prod
5. Production deployment
6. Post-deploy verification

### HITL: 🔴 BLOCKING (before production)

```markdown
---
## 🔴 CHECKPOINT - Production Deployment

### Staging Status

| Check | Status |
|-------|--------|
| Deployed | ✅ |
| Smoke tests | ✅ [N]/[N] passed |
| Log errors | ✅ None |
| Performance | ✅ Normal |

### Staging URL for testing
[URL]

### Changes included
- [Feature/Fix 1]
- [Feature/Fix 2]

### Deployment Risks
| Risk | Mitigation |
|------|------------|
| [Risk] | [Rollback plan] |

---

⚠️ **READY FOR PRODUCTION**

Have you tested on staging?

**Reply**:
- ✅ **"Go prod"** → I deploy to production
- ⏸️ **"Wait"** → I stay in staging
- 🔍 **"Test first"** → Take your time, I remain on standby

---
```

---

## Shortcuts for Simple Features

If the feature is **trivial** (< 2h, no data model change, no API):

```yaml
simplified_flow:
  conditions:
    - effort < 2h
    - no_database_change
    - no_api_change
    - no_external_dependency
    - low_risk

  steps:
    1. Quick brief (🟡 advisory)
    2. Direct implementation (🟢 auto)
    3. Quick review (🟡 advisory)
    4. Deployment (🟡 advisory, not blocking)

  example: "Change a button color"
```

The orchestrator automatically detects if the shortcut applies.

---

## Workflow Exit Criteria

```markdown
□ Technical brief validated
□ Estimation and breakdown validated
□ Technical specification validated
□ Code implemented according to spec
□ Tests passing (unit, integration)
□ Code review approved
□ Deployed to staging + smoke tests OK
□ Deployed to production
□ Monitoring OK (no regression)
```

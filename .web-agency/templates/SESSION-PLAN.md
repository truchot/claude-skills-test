# Session Plan Template

> **"Doc as Truth"** - This document is the authoritative reference for this work session.

Use this template to document the plan BEFORE execution begins. This document:
- Serves as proof for the client
- Is the reference throughout the project
- Acts as fallback if task system fails
- Can be updated iteratively (versioned)

---

## File Location

```
.project/plans/PLAN-{YYYY-MM-DD}-{slug}.md
```

Example: `.project/plans/PLAN-2026-01-23-stripe-integration.md`

---

## Template

```markdown
# Plan: [Short Title]

**Created**: [YYYY-MM-DD HH:MM]
**Author**: Claude (AI Assistant)
**Status**: Draft | Approved | In Progress | Completed
**Version**: 1.0

---

## 1. Original Request

> "[Exact user request in quotes]"

---

## 2. Classification

| Attribute | Value |
|-----------|-------|
| **Domain** | tech / design / project / marketing |
| **Type** | new_feature / enhancement / bugfix / review |
| **Complexity** | L0 / L1 / L2 / L3 / L4 |
| **Confidence** | X% |

---

## 3. Clarification (Q&A)

### Required Questions

| Question | Answer |
|----------|--------|
| What problem does this solve? | [Answer] |
| Who is the primary user? | [Answer] |
| What defines success? | [Answer] |
| What's out of scope? | [Answer] |

### Additional Clarifications

| Question | Answer |
|----------|--------|
| [Conditional question asked] | [Answer] |
| [Follow-up question] | [Answer] |

---

## 4. Context Loaded

| File | Summary |
|------|---------|
| `.project/03-architecture/stack.md` | [Brief summary] |
| `knowledge/rules/code-standards.md` | [Brief summary] |
| [Other files loaded] | [Brief summary] |

---

## 5. Decisions Made

### D-001: [Decision Title]

- **Question**: [What needed to be decided]
- **Options Considered**:
  1. [Option A] - [Pros/Cons]
  2. [Option B] - [Pros/Cons]
- **Decision**: [What was decided]
- **Rationale**: [Why]
- **ADR**: [Link to ADR if created, or "N/A"]

### D-002: [Decision Title]

...

---

## 6. Task Breakdown

### Overview

| Metric | Value |
|--------|-------|
| **Total Tasks** | [N] |
| **Total Effort** | [X hours] |
| **Estimated Duration** | [X days] |
| **Critical Path** | T-001 → T-002 → ... |

### Tasks

#### T-001: [Task Title]

- **Description**: [What will be done]
- **Deliverable**: [What will be produced]
- **Agent**: [role/agent]
- **Depends On**: [None / T-XXX]
- **Gate**: 🔴 / 🟡 / 🟢
- **Effort**: [X hours]
- **Story**: [`.project/stories/STORY-XXX-{slug}.md` or "N/A" for simple tasks]
- **Acceptance Criteria**:
  - [ ] [Criterion 1]
  - [ ] [Criterion 2]

#### T-002: [Task Title]

...

### Dependency Graph

```
T-001 ─────────────────┐
                       ▼
T-002 ───────┬───── T-003
             │
             ▼
T-004 ───────┤
             │
             └──────► T-005
```

### Generated Stories

> **Context-Engineered Stories** - Self-contained execution guides with embedded context.
> See `core/story-generation.md` for the protocol.

| Task | Story | Status |
|------|-------|--------|
| T-002 | `.project/stories/STORY-002-{slug}.md` | ☐ Generated |
| T-003 | `.project/stories/STORY-003-{slug}.md` | ☐ Generated |
| T-004 | N/A (simple task) | - |

---

## 7. Checkpoints (Gates)

| After Task | Gate Type | What Will Be Reviewed |
|------------|-----------|----------------------|
| T-001 | 🔴 BLOCKING | [What user reviews] |
| T-003 | 🟡 ADVISORY | [What user sees] |
| T-005 | 🔴 BLOCKING | [Final review items] |

---

## 8. Risks & Assumptions

### Assumptions

1. [Assumption 1]
2. [Assumption 2]

### Risks

| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|------------|
| [Risk 1] | High/Med/Low | High/Med/Low | [How to handle] |
| [Risk 2] | High/Med/Low | High/Med/Low | [How to handle] |

---

## 9. Approval

### Contract Presented

**Date**: [YYYY-MM-DD HH:MM]

### User Response

- [ ] ✅ Approved
- [ ] ✏️ Approved with modifications: [Details]
- [ ] ❌ Rejected: [Reason]

### Approval Record

**Approved by**: [User identifier if available]
**Approved at**: [YYYY-MM-DD HH:MM]
**Notes**: [Any notes from approval]

---

## 10. Execution Log

| Task | Started | Completed | Notes |
|------|---------|-----------|-------|
| T-001 | [DateTime] | [DateTime] | [Any notes] |
| T-002 | [DateTime] | [DateTime] | [Any notes] |
| ... | ... | ... | ... |

---

## 11. Changes & Iterations

### Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | [Date] | Initial plan |
| 1.1 | [Date] | [What changed and why] |

### Change Requests

#### CR-001: [Change Title]

- **Requested**: [Date]
- **Reason**: [Why change needed]
- **Impact**: [What tasks affected]
- **Status**: Pending / Approved / Rejected
- **Resolution**: [How it was handled]

---

## 12. Completion

### Final Status

- [ ] All tasks completed
- [ ] All gates passed
- [ ] Client deliverables produced
- [ ] Documentation updated

### Deliverables Produced

| Deliverable | Path | Status |
|-------------|------|--------|
| [Name] | [Path] | ✅ Complete |
| [Name] | [Path] | ✅ Complete |

### Lessons Learned

- [What went well]
- [What could be improved]
- [Patterns to capture in knowledge/]

---

**End of Plan Document**
```

---

## Usage in DECOMPOSE Phase

When decomposing tasks, **T-000 is always first**:

```yaml
tasks:
  - id: T-000
    description: "Create session plan document"
    deliverable: ".project/plans/PLAN-{date}-{slug}.md"
    depends_on: []
    gate: 🟢
    effort: "0h (part of CONTRACT phase)"
    note: "This document is created during CONTRACT, before approval"

  - id: T-001
    description: "[First real task]"
    depends_on: [T-000]  # All tasks depend on plan existing
    ...
```

---

## Integration with Contract

The CONTRACT phase now includes:

1. **Create plan document** (T-000)
2. **Present contract** (summary of plan)
3. **Wait for approval**
4. **Update plan with approval record**
5. **Begin execution**

The plan document IS the contract, just in full detail.

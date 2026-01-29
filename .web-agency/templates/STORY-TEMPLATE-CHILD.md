# Story: [STORY-XXXa] [Title]

> **Child Story** - Inherits context from parent, adds only specific delta.
> See `core/context-inheritance.md` for inheritance protocol.

---

## Story Metadata

| Field | Value |
|-------|-------|
| **ID** | STORY-XXXa |
| **Type** | Child |
| **Task Parent** | T-XXX (from Session Plan) |
| **Story Parent** | STORY-XXX |
| **Parent Path** | `.project/stories/STORY-XXX-{slug}.md` |
| **Session Plan** | `.project/plans/PLAN-{date}-{slug}.md` |
| **Context Mode** | Inherited |
| **Status** | Draft / Ready / In Progress / Review / Done |
| **Agent** | [role]/[agent] |
| **Gate** | 🔴 BLOCKING / 🟡 ADVISORY / 🟢 AUTOMATIC |
| **Effort** | [X hours] |
| **Created** | [YYYY-MM-DD] |

---

## 1. Objective

### What
[Clear description of what THIS child story delivers - scope narrower than parent]

### Why
[How this contributes to parent story's goal]

### Success Criteria
- [ ] [Measurable criterion 1]
- [ ] [Measurable criterion 2]

---

## 2. Context (Inherited + Delta)

> **This story inherits context from parent STORY-XXX.**
> Only additions, overrides, and exclusions are listed below.
> For full context, resolve: Parent + Additions - Exclusions + Overrides

### 2.0 Inheritance Declaration

| Field | Value |
|-------|-------|
| **Parent Story** | STORY-XXX |
| **Parent Path** | `.project/stories/STORY-XXX-{slug}.md` |
| **Inheritance Mode** | Full with delta |

### 2.1 Context Additions

> Context THIS story needs that parent doesn't have.

#### Additional ADRs

| ADR | Title | Relevance to This Story |
|-----|-------|-------------------------|
| ADR-XXX | [Title] | [Why this child needs it] |

#### Additional Patterns

| Pattern | Source | Key Rules for This Story |
|---------|--------|--------------------------|
| [Name] | `knowledge/patterns/[path]` | [Specific rules] |

#### Additional Related Code

| File | Purpose | Relevance |
|------|---------|-----------|
| `[path]` | [What it does] | [Why this child needs it] |

### 2.2 Context Overrides

> Parent context that this story modifies.

| Parent Value | Child Override | Reason |
|--------------|----------------|--------|
| [What parent says] | [What this child needs instead] | [Why] |

### 2.3 Context Exclusions

> Parent context that this story doesn't need.

| Excluded | Reason |
|----------|--------|
| [Pattern/ADR/Code from parent] | [Why not needed for this child] |

### 2.4 Resolved Context Summary

> **For execution**: Parent context + Additions - Exclusions + Overrides

**From Parent (STORY-XXX):**
- Stack: [inherited - list key elements]
- ADRs: [list inherited ADRs]
- Patterns: [list inherited patterns]
- Standards: [list inherited standards]

**Added by This Story:**
- ADRs: [list additions]
- Patterns: [list additions]
- Related Code: [list additions]

**Excluded:**
- [list exclusions]

**Overridden:**
- [list overrides]

### 2.5 Context Freshness (Inherited)

> Parent story freshness applies. Check parent's Section 2.0.

| Check | Status |
|-------|--------|
| Parent Freshness | ✅ Checked / ⚠️ Check parent |
| Additions Freshness | ✅ Fresh / ⚠️ Stale |

---

## 3. Implementation Plan

### 3.1 Task Breakdown

| # | Task | Est. | Status |
|---|------|------|--------|
| 1 | [Task description] | [Xh] | ☐ |
| 2 | [Task description] | [Xh] | ☐ |

### 3.2 Detailed Steps

#### Task 1: [Task Title]

**Objective**: [What this task accomplishes]

**Steps**:
1. [Specific step 1]
2. [Specific step 2]

**Expected Output**:
- File: `[path]`
- Change: [Description]

**Validation**:
- [ ] [How to verify]

---

## 4. Technical Specification

> Specify only what THIS child story implements.
> Refer to parent for shared specs.

### 4.1 This Story's Scope

[Technical details specific to this child story]

```typescript
// New interfaces/functions THIS story creates
```

---

## 5. Testing Requirements

### 5.1 Unit Tests

| Test Case | Input | Expected Output |
|-----------|-------|-----------------|
| [Test name] | [Input] | [Expected] |

### 5.2 Integration with Parent

- [ ] [How this integrates with parent story's work]
- [ ] [Cross-story test if applicable]

---

## 6. Dependencies

### 6.1 Depends On

| Dependency | Status | Notes |
|------------|--------|-------|
| **Parent**: STORY-XXX | ⏳ In Progress | Must complete before this |
| Sibling: STORY-XXXb | ☐ / ✅ | [If there's a dependency] |

### 6.2 Blocks

| Story | Why |
|-------|-----|
| STORY-XXXc | [If this blocks a sibling] |

---

## 7. Execution Log

> Updated during implementation

### 7.1 Files Modified

| File | Action | Notes |
|------|--------|-------|
| | Created / Modified | |

### 7.2 Debug Log

```
[YYYY-MM-DD HH:MM] - [Event]
```

### 7.3 Deviations from Plan

| Planned | Actual | Reason |
|---------|--------|--------|
| | | |

---

## 8. Completion Checklist

- [ ] All tasks done
- [ ] Tests pass
- [ ] Integrates with parent story
- [ ] No conflicts with siblings
- [ ] Gate checkpoint ready: [🔴 / 🟡 / 🟢]

---

## 9. Handoff

### To Parent Story

**Status update for parent:**
- This child: [Done / Blocked / Issues]
- Key outcomes: [What was accomplished]
- Integration notes: [How this connects to other children]

### Discoveries to Bubble Up

| Finding | Should go to Parent? | Should go to Knowledge? |
|---------|---------------------|------------------------|
| [Discovery] | ☐ Yes | ☐ Yes → [destination] |

---

## References

| Document | Path |
|----------|------|
| **Parent Story** | `.project/stories/STORY-XXX-{slug}.md` |
| Session Plan | `.project/plans/PLAN-{date}-{slug}.md` |
| Inheritance Protocol | `core/context-inheritance.md` |
| Staleness Detection | `core/context-staleness.md` |

---

**End of Child Story Document**

# Story: [STORY-XXX] [Title]

> **Context-Engineered Story** - Self-contained implementation guide with embedded context.

---

## Story Metadata

| Field | Value |
|-------|-------|
| **ID** | STORY-XXX |
| **Parent** | T-XXX (from Session Plan) |
| **Session Plan** | `.project/plans/PLAN-{date}-{slug}.md` |
| **Status** | Draft / Ready / In Progress / Review / Done |
| **Agent** | [role]/[agent] |
| **Gate** | 🔴 BLOCKING / 🟡 ADVISORY / 🟢 AUTOMATIC |
| **Effort** | [X hours] |
| **Created** | [YYYY-MM-DD] |

---

## 1. Objective

### What
[Clear description of what this story delivers - in 1-2 sentences]

### Why
[Business/technical reason for this work - connects to user value]

### Success Criteria
- [ ] [Measurable criterion 1]
- [ ] [Measurable criterion 2]
- [ ] [Measurable criterion 3]

---

## 2. Embedded Context

> **This section contains ALL context needed to execute this story.**
> The executing agent should NOT need to load additional files.

### 2.1 Stack & Architecture (from `.project/03-architecture/`)

```yaml
# Extracted from stack.md - relevant portions only
framework: [e.g., "Next.js 14 App Router"]
language: [e.g., "TypeScript 5.x strict mode"]
database: [e.g., "PostgreSQL 15 + Prisma 5.x"]
auth: [e.g., "NextAuth.js v5"]
styling: [e.g., "Tailwind CSS 3.x"]
testing: [e.g., "Vitest + Testing Library"]
```

### 2.2 Relevant ADRs (from `.project/04-adr/`)

<!-- Include ONLY ADRs relevant to this story -->

#### ADR-XXX: [Decision Title]
- **Context**: [Brief context]
- **Decision**: [What was decided]
- **Consequence**: [Impact on this story]

#### ADR-YYY: [Decision Title]
- **Context**: [Brief context]
- **Decision**: [What was decided]
- **Consequence**: [Impact on this story]

### 2.3 Applicable Patterns (from `knowledge/patterns/`)

<!-- Include ONLY patterns relevant to this story -->

```yaml
patterns_to_apply:
  - name: "[Pattern name]"
    source: "knowledge/patterns/[path]"
    key_rules:
      - "[Rule 1 relevant to this story]"
      - "[Rule 2 relevant to this story]"

  - name: "[Pattern name]"
    source: "knowledge/patterns/[path]"
    key_rules:
      - "[Rule 1]"
```

### 2.4 Code Standards (from `knowledge/rules/`)

<!-- Include ONLY standards relevant to this story -->

```yaml
standards:
  naming:
    - "[Relevant naming convention]"
  structure:
    - "[Relevant structure rule]"
  testing:
    - "[Relevant testing requirement]"
```

### 2.5 Related Code (existing files to understand/modify)

| File | Purpose | Relevance |
|------|---------|-----------|
| `[path/to/file.ts]` | [What it does] | [Why it matters for this story] |
| `[path/to/other.ts]` | [What it does] | [Why it matters for this story] |

```typescript
// Key code snippet from [file] that this story builds upon
// Include 10-30 lines of relevant existing code
```

---

## 3. Implementation Plan

### 3.1 Task Breakdown

| # | Task | Est. | Status |
|---|------|------|--------|
| 1 | [Task description] | [Xh] | ☐ |
| 2 | [Task description] | [Xh] | ☐ |
| 3 | [Task description] | [Xh] | ☐ |
| 4 | [Task description] | [Xh] | ☐ |

### 3.2 Detailed Steps

#### Task 1: [Task Title]

**Objective**: [What this task accomplishes]

**Steps**:
1. [Specific step 1]
2. [Specific step 2]
3. [Specific step 3]

**Expected Output**:
- File: `[path/to/new-or-modified-file]`
- Change: [Description of change]

**Validation**:
- [ ] [How to verify this task is complete]

---

#### Task 2: [Task Title]

**Objective**: [What this task accomplishes]

**Steps**:
1. [Specific step 1]
2. [Specific step 2]

**Expected Output**:
- File: `[path/to/file]`
- Change: [Description]

**Validation**:
- [ ] [Verification criteria]

---

## 4. Technical Specification

### 4.1 API Contract (if applicable)

```typescript
// New or modified interfaces/types
interface [InterfaceName] {
  [field]: [type];
}

// New or modified function signatures
function [functionName]([params]): [returnType];
```

### 4.2 Database Changes (if applicable)

```prisma
// New or modified Prisma schema
model [ModelName] {
  id        String   @id @default(cuid())
  // fields...
}
```

### 4.3 Component Structure (if applicable)

```
[ComponentName]/
├── [ComponentName].tsx       # Main component
├── [ComponentName].test.tsx  # Tests
├── [ComponentName].types.ts  # Types
└── index.ts                  # Export
```

---

## 5. Testing Requirements

### 5.1 Unit Tests

| Test Case | Input | Expected Output |
|-----------|-------|-----------------|
| [Test name] | [Input] | [Expected] |
| [Test name] | [Input] | [Expected] |

### 5.2 Integration Tests

```typescript
// Test scenario outline
describe('[Feature]', () => {
  it('[should do X when Y]', async () => {
    // Given: [setup]
    // When: [action]
    // Then: [assertion]
  });
});
```

### 5.3 Manual Verification

- [ ] [Manual check 1]
- [ ] [Manual check 2]

---

## 6. Dependencies & Blockers

### 6.1 Depends On

| Dependency | Status | Notes |
|------------|--------|-------|
| STORY-XXX: [Name] | ✅ Done / ⏳ In Progress / ❌ Blocked | [Notes] |
| External: [Service/API] | ✅ Available / ❌ Unavailable | [Notes] |

### 6.2 Blocks

| Story | Why |
|-------|-----|
| STORY-YYY: [Name] | [Why this must complete first] |

---

## 7. Risks & Mitigations

| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|------------|
| [Risk 1] | H/M/L | H/M/L | [How to handle] |
| [Risk 2] | H/M/L | H/M/L | [How to handle] |

---

## 8. Execution Log

> **Updated by executing agent during implementation**

### 8.1 Files Modified

| File | Action | Notes |
|------|--------|-------|
| | Created / Modified / Deleted | |

### 8.2 Debug Log

```
[YYYY-MM-DD HH:MM] - [Event/Issue/Decision]
[YYYY-MM-DD HH:MM] - [Event/Issue/Decision]
```

### 8.3 Deviations from Plan

| Planned | Actual | Reason |
|---------|--------|--------|
| [What was planned] | [What was done] | [Why changed] |

---

## 9. Completion Checklist

### Implementation Complete
- [ ] All tasks marked done
- [ ] All files created/modified as planned
- [ ] No console.log or debug code left
- [ ] No hardcoded values (use config/env)

### Quality Checks
- [ ] Code follows standards (Section 2.4)
- [ ] Patterns applied correctly (Section 2.3)
- [ ] No TypeScript/ESLint errors
- [ ] Tests pass

### Documentation
- [ ] Code comments where non-obvious
- [ ] API docs updated (if applicable)
- [ ] Execution log complete

### Ready for Review
- [ ] Success criteria met (Section 1)
- [ ] Self-review done
- [ ] Gate checkpoint ready: [🔴 / 🟡 / 🟢]

---

## 10. Review & Handoff

### For Reviewer

**Review Checklist:**
- [ ] Implementation matches spec
- [ ] Tests adequate and passing
- [ ] Code quality acceptable
- [ ] No security issues
- [ ] Performance acceptable

**Review Notes:**
```
[Reviewer comments here]
```

### Handoff to Next Story

**Context for Next Agent:**
- [Key insight 1 from this story]
- [Key insight 2 from this story]
- [Any technical debt introduced]

---

## References

| Document | Path |
|----------|------|
| Session Plan | `.project/plans/PLAN-{date}-{slug}.md` |
| Architecture | `.project/03-architecture/` |
| ADRs | `.project/04-adr/` |
| Patterns | `knowledge/patterns/` |

---

**End of Story Document**

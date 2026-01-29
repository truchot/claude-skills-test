# Context Inheritance Protocol

> **Child stories inherit context from parent, adding only their delta**

---

## Overview

Context Inheritance eliminates duplication when decomposing large stories into sub-stories. Instead of re-embedding all context, child stories reference their parent and specify only what's different.

```
┌─────────────────────────────────────────────────────────────────┐
│                    CONTEXT INHERITANCE                           │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  STORY-001 (Parent Epic)                                         │
│  ┌─────────────────────────────────────────┐                     │
│  │  Full Embedded Context                  │                     │
│  │  • Stack (complete)                     │                     │
│  │  • ADRs (all relevant)                  │                     │
│  │  • Patterns (all applicable)            │                     │
│  │  • Standards (all)                      │                     │
│  │  • Related Code (all)                   │                     │
│  └─────────────────────────────────────────┘                     │
│       │                                                          │
│       ├──────────────────┬──────────────────┐                    │
│       ▼                  ▼                  ▼                    │
│  STORY-001a          STORY-001b         STORY-001c               │
│  ┌──────────┐        ┌──────────┐       ┌──────────┐             │
│  │ inherits │        │ inherits │       │ inherits │             │
│  │ STORY-001│        │ STORY-001│       │ STORY-001│             │
│  │          │        │          │       │          │             │
│  │ + delta: │        │ + delta: │       │ + delta: │             │
│  │ - 1 ADR  │        │ - 2 files│       │ - 1 pattern            │
│  └──────────┘        └──────────┘       └──────────┘             │
│                                                                  │
│  Context Resolution: Parent context + Child delta                │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## When to Use Inheritance

| Scenario | Use Inheritance? | Reason |
|----------|------------------|--------|
| Epic decomposed into stories | ✅ Yes | Share architectural context |
| Independent stories | ❌ No | No common parent |
| Story with sub-tasks | ✅ Yes | Sub-tasks share story context |
| Sequential stories (same feature) | ⚠️ Maybe | If context overlaps >70% |

---

## Inheritance Structure

### Parent Story (Full Context)

```yaml
# STORY-001 (Parent)
metadata:
  id: "STORY-001"
  type: "epic"  # or "parent"
  children: ["STORY-001a", "STORY-001b", "STORY-001c"]

embedded_context:
  # Full context embedded here
  stack: { ... }
  adrs: [ ... ]
  patterns: [ ... ]
  standards: [ ... ]
  related_code: [ ... ]
```

### Child Story (Inherits + Delta)

```yaml
# STORY-001a (Child)
metadata:
  id: "STORY-001a"
  type: "child"
  parent: "STORY-001"
  inherits_context: true

# Instead of full embedded_context, use:
context_inheritance:
  parent: "STORY-001"
  parent_path: ".project/stories/STORY-001-feature-name.md"

  # What to ADD to parent context
  additions:
    adrs:
      - id: "ADR-015"
        title: "Use Redis for caching"
        decision: "Cache API responses in Redis"
        relevance: "This sub-story implements the cache layer"

    patterns:
      - name: "Cache Invalidation"
        source: "knowledge/patterns/technical/caching.md"
        key_rules:
          - "Invalidate on write"
          - "TTL for read-heavy data"

    related_code:
      - file: "src/lib/redis.ts"
        purpose: "Redis client setup"
        relevance: "Base for cache implementation"

  # What to OVERRIDE from parent context
  overrides:
    standards:
      testing:
        # Parent says "80% coverage", child needs more
        - "95% coverage for cache logic (critical path)"

  # What to EXCLUDE from parent context (not needed)
  excludes:
    patterns:
      - "frontend-patterns.md"  # This child is backend-only
    related_code:
      - "src/components/*"      # No frontend in this child
```

---

## Context Resolution Algorithm

When an agent loads a child story:

```yaml
resolution_steps:
  step_1:
    action: "Load child story"
    result: "Get inheritance declaration"

  step_2:
    action: "Load parent story"
    path: "context_inheritance.parent_path"
    result: "Get full parent context"

  step_3:
    action: "Apply excludes"
    operation: "Remove excluded items from parent context"

  step_4:
    action: "Apply overrides"
    operation: "Replace parent values with child values"

  step_5:
    action: "Apply additions"
    operation: "Merge child additions into context"

  step_6:
    action: "Return resolved context"
    result: "Complete context for execution"
```

### Resolution Example

```yaml
# Parent STORY-001 has:
patterns:
  - "api-design.md"
  - "error-handling.md"
  - "frontend-patterns.md"

# Child STORY-001a declares:
excludes:
  patterns: ["frontend-patterns.md"]
additions:
  patterns: ["caching.md"]

# Resolved context for STORY-001a:
patterns:
  - "api-design.md"       # From parent
  - "error-handling.md"   # From parent
  - "caching.md"          # Added by child
  # frontend-patterns.md excluded
```

---

## Story Template Updates

### Parent Story Section

Add to Section 1 (Metadata):

```markdown
## Story Metadata

| Field | Value |
|-------|-------|
| **ID** | STORY-001 |
| **Type** | Epic / Parent |
| **Children** | STORY-001a, STORY-001b, STORY-001c |
| ... | ... |
```

### Child Story Section

Replace Section 2 (Embedded Context) with:

```markdown
## 2. Context (Inherited)

> **This story inherits context from parent.**
> Only additions/overrides are listed below.

### 2.0 Inheritance Declaration

| Field | Value |
|-------|-------|
| **Parent Story** | STORY-001 |
| **Parent Path** | `.project/stories/STORY-001-feature-name.md` |
| **Inheritance Mode** | Full (with delta below) |

### 2.1 Context Additions

#### Additional ADRs
- **ADR-015**: Use Redis for caching
  - Relevance: [Why this ADR matters for this child]

#### Additional Patterns
- **Caching Pattern** from `knowledge/patterns/technical/caching.md`
  - Key rules: [Specific rules for this child]

#### Additional Related Code
| File | Purpose |
|------|---------|
| `src/lib/redis.ts` | Redis client this child will use |

### 2.2 Context Overrides

| Parent Value | Child Override | Reason |
|--------------|----------------|--------|
| 80% test coverage | 95% test coverage | Critical cache logic |

### 2.3 Context Exclusions

| Excluded | Reason |
|----------|--------|
| `frontend-patterns.md` | This child is backend-only |
| `src/components/*` | No frontend work |

### 2.4 Resolved Context Summary

> For execution, this story's context = Parent + Additions - Exclusions + Overrides

**From Parent (STORY-001):**
- Stack: [inherited]
- ADRs: ADR-001, ADR-003, ADR-007
- Patterns: api-design.md, error-handling.md

**Added by This Story:**
- ADRs: ADR-015
- Patterns: caching.md
- Related Code: src/lib/redis.ts
```

---

## Multi-Level Inheritance

For deeply nested stories (rare but supported):

```
STORY-001 (Epic)
    │
    └── STORY-001a (Feature)
            │
            └── STORY-001a-1 (Sub-feature)

# STORY-001a-1 inherits from STORY-001a, which inherits from STORY-001
# Resolution: STORY-001 → STORY-001a delta → STORY-001a-1 delta
```

```yaml
# STORY-001a-1
context_inheritance:
  parent: "STORY-001a"
  parent_path: ".project/stories/STORY-001a-cache-layer.md"

  # Grandparent context flows through parent
  # Only specify delta from immediate parent
```

**Rule**: Maximum 3 levels of inheritance to avoid complexity.

---

## Best Practices

### 1. Keep Parent Context Complete

```yaml
# ✅ Good: Parent has everything children might need
parent_context:
  adrs: [all relevant ADRs]
  patterns: [all applicable patterns]

# ❌ Bad: Parent missing context that children need
# → Children must add it, defeating the purpose
```

### 2. Minimal Child Deltas

```yaml
# ✅ Good: Child adds only what's specific to it
additions:
  related_code:
    - "src/lib/cache.ts"  # Only this child touches cache

# ❌ Bad: Child re-specifies most of parent context
# → Should probably not use inheritance
```

### 3. Clear Exclusion Reasons

```yaml
# ✅ Good: Explain why excluded
excludes:
  patterns:
    - name: "frontend-patterns.md"
      reason: "This child is backend-only"

# ❌ Bad: Exclude without reason
# → Future confusion about what's needed
```

### 4. Validate Resolution

Before execution, verify resolved context makes sense:

```yaml
validation_checklist:
  - [ ] All needed ADRs present (from parent or additions)
  - [ ] No conflicting patterns
  - [ ] Related code covers what child will touch
  - [ ] Standards are appropriate for child's scope
```

---

## Integration with Story Generation

In `core/story-generation.md`, when generating a child story:

```yaml
child_story_generation:
  step_1: "Identify parent story"
  step_2: "Load parent's embedded context"
  step_3: "Analyze what child needs that parent has"
  step_4: "Identify child-specific additions"
  step_5: "Identify what parent has that child doesn't need"
  step_6: "Generate child with inheritance declaration"
  step_7: "Validate resolved context is complete"
```

---

## References

- `templates/STORY-TEMPLATE.md` - Story template
- `templates/STORY-TEMPLATE-CHILD.md` - Child story template (simplified)
- `core/story-generation.md` - Generation protocol
- `core/context-staleness.md` - Staleness detection (works with inheritance)

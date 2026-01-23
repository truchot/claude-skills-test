# Learning Capture Protocol

> **Extract insights from story execution to improve future stories**

---

## Overview

The Learning Capture Protocol closes the feedback loop between execution and planning. After each story completes, learnings are extracted and fed back into the knowledge base.

```
┌─────────────────────────────────────────────────────────────────┐
│                    LEARNING CAPTURE FLOW                         │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  STORY EXECUTION                                                 │
│       │                                                          │
│       ▼                                                          │
│  STORY COMPLETED                                                 │
│       │                                                          │
│       ▼                                                          │
│  ┌─────────────────────────────────────────┐                     │
│  │         LEARNING EXTRACTION             │                     │
│  │  1. Analyze execution log               │                     │
│  │  2. Identify deviations from plan       │                     │
│  │  3. Extract reusable insights           │                     │
│  │  4. Classify learning type              │                     │
│  └─────────────────────────────────────────┘                     │
│       │                                                          │
│       ▼                                                          │
│  ┌─────────────────────────────────────────┐                     │
│  │         KNOWLEDGE UPDATE                │                     │
│  │  • patterns/ ← New patterns             │                     │
│  │  • cases/ ← Edge cases found            │                     │
│  │  • rules/ ← Rules refined               │                     │
│  │  • packs/ ← Context packs updated       │                     │
│  └─────────────────────────────────────────┘                     │
│       │                                                          │
│       ▼                                                          │
│  FUTURE STORIES IMPROVED                                         │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## When to Capture Learnings

| Trigger | Action | Priority |
|---------|--------|----------|
| Story completed with deviations | Extract learnings | High |
| New edge case discovered | Document in cases/ | High |
| Pattern emerged (3+ occurrences) | Add to patterns/ | Medium |
| Estimation was off by >50% | Update estimation rules | Medium |
| New gotcha/pitfall found | Add to rules/ | High |
| Context pack was missing info | Update pack | Medium |

---

## Learning Extraction Procedure

### Phase 1: Analyze Execution

```yaml
analyze_execution:
  inputs:
    - story_file: "STORY-XXX.md"
    - sections_to_review:
        - "8. Execution Log"
        - "8.3 Deviations from Plan"
        - "10. Review & Handoff"

  extract:
    deviations:
      - what_changed: "[Planned vs Actual]"
        why: "[Root cause]"
        impact: "[Time/quality impact]"

    discoveries:
      - finding: "[What was discovered]"
        context: "[When/where]"
        reusable: true/false

    gotchas:
      - issue: "[Problem encountered]"
        solution: "[How it was solved]"
        preventable: true/false
```

### Phase 2: Classify Learnings

```yaml
learning_types:
  pattern:
    criteria: "Reusable solution that worked well"
    destination: "knowledge/patterns/{domain}/"
    format: "Pattern template"

  edge_case:
    criteria: "Unexpected scenario that needed handling"
    destination: "knowledge/cases/"
    format: "Case study template"

  rule_update:
    criteria: "Existing rule needs refinement"
    destination: "knowledge/rules/{domain}.md"
    format: "Rule addition/modification"

  gotcha:
    criteria: "Pitfall that others should avoid"
    destination: "knowledge/rules/gotchas.md"
    format: "Gotcha entry"

  estimation_insight:
    criteria: "Task took significantly different time"
    destination: "knowledge/rules/estimation.md"
    format: "Estimation adjustment"

  pack_update:
    criteria: "Context pack was missing information"
    destination: "contexts/packs/{pack}.yaml"
    format: "Pack field addition"
```

### Phase 3: Generate Learning Artifacts

#### Pattern Template

```markdown
# Pattern: [Pattern Name]

## Context
[When this pattern applies]

## Problem
[What problem it solves]

## Solution
[The pattern itself]

## Implementation
\`\`\`typescript
// Code example
\`\`\`

## Consequences
- [Positive consequence]
- [Tradeoff to consider]

## Related
- [Related patterns]
- [Source story: STORY-XXX]
```

#### Edge Case Template

```markdown
# Case: [Case Name]

## Story Source
STORY-XXX: [Story title]

## Scenario
[What happened]

## Expected Behavior
[What we thought would happen]

## Actual Behavior
[What actually happened]

## Root Cause
[Why it happened]

## Solution Applied
[How it was fixed]

## Lessons Learned
- [Lesson 1]
- [Lesson 2]

## Apply When
[Future scenarios where this applies]
```

#### Gotcha Entry Template

```markdown
### [Gotcha Title]

**Context**: [When you might encounter this]

**Problem**: [What goes wrong]

**Solution**: [How to avoid/fix]

**Source**: STORY-XXX
```

### Phase 4: Update Knowledge Base

```yaml
update_procedure:
  step_1:
    action: "Create learning artifact from template"
    output: "Draft markdown file"

  step_2:
    action: "Validate against existing knowledge"
    check:
      - "Does similar pattern/case exist?"
      - "Should this update existing or create new?"

  step_3:
    action: "Write to appropriate location"
    locations:
      patterns: "knowledge/patterns/{domain}/"
      cases: "knowledge/cases/"
      rules: "knowledge/rules/{domain}.md"
      gotchas: "knowledge/rules/gotchas.md"
      packs: "contexts/packs/{pack}.yaml"

  step_4:
    action: "Update indexes if needed"
    indexes:
      - "knowledge/patterns/README.md"
      - "knowledge/cases/README.md"
```

---

## Story Template Integration

Add this section to `templates/STORY-TEMPLATE.md` after Section 10:

```markdown
## 11. Learning Capture

> **Complete after story execution** - Extract insights for future stories.

### 11.1 Deviations Analysis

| Planned | Actual | Root Cause | Learning Type |
|---------|--------|------------|---------------|
| [What was planned] | [What happened] | [Why] | pattern/case/gotcha |

### 11.2 Discoveries

| Finding | Reusable? | Destination |
|---------|-----------|-------------|
| [Discovery] | Yes/No | [Where to document] |

### 11.3 Knowledge Updates Made

| Type | File | Change |
|------|------|--------|
| [pattern/case/rule/pack] | [path] | [What was added/updated] |

### 11.4 Estimation Accuracy

| Estimated | Actual | Delta | Reason |
|-----------|--------|-------|--------|
| [X hours] | [Y hours] | [+/- Z%] | [Why different] |

→ Update estimation rules? [ ] Yes / [ ] No
```

---

## Automated Learning Triggers

```yaml
# In story-generation.md workflow
post_story_completion:
  trigger: "Story status changed to 'Done'"

  automatic_checks:
    - check: "Deviations > 0"
      action: "Flag for learning extraction"

    - check: "Estimation delta > 50%"
      action: "Flag for estimation review"

    - check: "Debug log contains 'workaround' or 'gotcha'"
      action: "Flag for gotcha extraction"

  agent_prompt: |
    Story STORY-XXX is complete. Review the execution log and extract learnings:

    1. Were there deviations from the plan? Document them.
    2. Were any new patterns discovered? Add to knowledge/patterns/
    3. Were there gotchas? Add to knowledge/rules/gotchas.md
    4. Was the estimation accurate? Update if needed.

    Use the Learning Capture section (11) of the story to document.
```

---

## Learning Categories Reference

### By Domain

| Domain | Pattern Location | Rules Location |
|--------|------------------|----------------|
| API Development | `patterns/technical/api-*.md` | `rules/api.md` |
| React/Frontend | `patterns/technical/react-*.md` | `rules/frontend.md` |
| Database | `patterns/technical/database-*.md` | `rules/database.md` |
| Testing | `patterns/technical/testing-*.md` | `rules/testing.md` |
| DevOps | `patterns/technical/devops-*.md` | `rules/devops.md` |
| SEO/Marketing | `patterns/marketing/seo-*.md` | `rules/seo.md` |

### By Impact

| Impact | Action | Example |
|--------|--------|---------|
| **Critical** | Immediate update | Security vulnerability found |
| **High** | Same-day update | Pattern that saves hours |
| **Medium** | Weekly batch | Minor optimization |
| **Low** | Monthly review | Nice-to-have improvement |

---

## Metrics to Track

```yaml
learning_metrics:
  capture_rate:
    formula: "stories_with_learnings / total_stories"
    target: "> 30%"

  knowledge_growth:
    formula: "new_patterns + new_cases + rule_updates"
    track: "Monthly"

  estimation_accuracy:
    formula: "avg(actual_time / estimated_time)"
    target: "0.8 - 1.2"

  pack_coverage:
    formula: "stories_using_packs / stories_that_could_use_packs"
    target: "> 80%"
```

---

## Example: Learning Extraction

### Input: Completed Story

```markdown
## 8.3 Deviations from Plan

| Planned | Actual | Reason |
|---------|--------|--------|
| Use Prisma transaction | Used raw SQL | Prisma doesn't support FOR UPDATE |
| 2 hours for webhook | 4 hours | Rate limiting edge cases |

## 9.3 Debug Log

[15:30] - Gotcha: Stripe webhook can fire multiple times for same event
[16:45] - Workaround: Added idempotency check with event ID
```

### Output: Learning Artifacts

**1. New Pattern** (`knowledge/patterns/technical/prisma-raw-queries.md`)
```markdown
# Pattern: Prisma Raw SQL for Locking

## Context
When you need SELECT FOR UPDATE or other locking mechanisms

## Problem
Prisma doesn't support row-level locking in transactions

## Solution
Use `$queryRaw` for locking queries within Prisma transaction
...
```

**2. New Gotcha** (`knowledge/rules/gotchas.md`)
```markdown
### Stripe Webhook Idempotency

**Context**: Processing Stripe webhooks

**Problem**: Stripe may send the same event multiple times

**Solution**: Store processed event IDs, check before processing

**Source**: STORY-003
```

**3. Estimation Update** (`knowledge/rules/estimation.md`)
```markdown
### Webhook Integration

- Base: 2 hours
- Add 2 hours if: External service with retry logic
- Add 1 hour if: Needs idempotency handling
```

---

## References

- `templates/STORY-TEMPLATE.md` - Story template with learning section
- `core/story-generation.md` - Story generation protocol
- `knowledge/` - Knowledge base structure
- `contexts/packs/` - Context packs to update

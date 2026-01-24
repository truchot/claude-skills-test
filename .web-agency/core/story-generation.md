# Story Generation Protocol

> **Transform tasks into self-contained, context-engineered stories**

---

## Overview

The Story Generation Protocol transforms basic task definitions (T-XXX) from the Session Plan into **hyper-detailed, self-contained stories** (STORY-XXX) that embed all necessary context for execution.

```
┌─────────────────────────────────────────────────────────────────┐
│                   STORY GENERATION FLOW                          │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  SESSION PLAN (T-XXX tasks)                                      │
│       │                                                          │
│       ▼                                                          │
│  ┌─────────────────────────────────────────┐                     │
│  │         CONTEXT EXTRACTION              │                     │
│  │  • Stack/Architecture → Section 2.1     │                     │
│  │  • Relevant ADRs → Section 2.2          │                     │
│  │  • Applicable Patterns → Section 2.3    │                     │
│  │  • Code Standards → Section 2.4         │                     │
│  │  • Related Code → Section 2.5           │                     │
│  └─────────────────────────────────────────┘                     │
│       │                                                          │
│       ▼                                                          │
│  ┌─────────────────────────────────────────┐                     │
│  │         STORY SYNTHESIS                 │                     │
│  │  • Break into detailed steps            │                     │
│  │  • Define technical spec                │                     │
│  │  • Set testing requirements             │                     │
│  │  • Document dependencies                │                     │
│  └─────────────────────────────────────────┘                     │
│       │                                                          │
│       ▼                                                          │
│  STORY-XXX.md (self-contained)                                   │
│       │                                                          │
│       ▼                                                          │
│  AGENT EXECUTION (no external context needed)                    │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## When to Generate Stories

| Complexity | Story Generation | Rationale |
|------------|------------------|-----------|
| **L0** (Quick) | ❌ Not needed | Simple enough to execute directly |
| **L1** (Task) | ⚡ Optional | Generate if context-heavy |
| **L2** (Story) | ✅ Recommended | Benefits from embedded context |
| **L3** (Epic) | ✅ Required | Must decompose into stories |
| **L4** (Saga) | ✅ Required | Must decompose into stories |

**Rule**: Generate stories for any task that:
- Requires understanding architectural decisions
- Touches multiple files/components
- Needs specific patterns to be followed
- Will be executed in a different session/agent

---

## Story Generation Procedure

### Phase 1: Context Extraction

> **NEW**: Use Context Packs to accelerate extraction. See `contexts/packs/README.md`

```yaml
step_1_identify_context_needs:
  action: "Detect or select Context Pack, then customize"

  # FAST PATH: Use Context Pack
  context_pack_detection:
    auto_detect: true
    available_packs:
      - "api-endpoint.yaml"      # API/endpoint tasks
      - "react-component.yaml"   # UI component tasks
      - "database-schema.yaml"   # Database/Prisma tasks
      - "authentication.yaml"    # Auth/security tasks
      - "testing.yaml"           # Test writing tasks
      - "seo-content.yaml"       # SEO/content tasks

    detection_method: |
      1. Match task keywords against pack detection rules
      2. Match file patterns if task specifies files
      3. If no match, fall back to manual extraction

  # MANUAL PATH: Custom extraction (if no pack matches)
  manual_extraction:
    questions:
      - "What part of the stack does this touch?"
      - "Are there ADRs that affect how this should be implemented?"
      - "What patterns apply to this type of work?"
      - "What existing code does this interact with?"
      - "What standards must be followed?"

  output:
    context_pack: "api-endpoint" # or null if manual
    stack_areas: ["frontend", "backend", "database", ...]
    relevant_adrs: ["ADR-001", "ADR-003", ...]
    applicable_patterns: ["api-design.md", "error-handling.md", ...]
    related_files: ["src/lib/auth.ts", "src/api/users.ts", ...]
    standards_needed: ["typescript", "testing", "naming", ...]
```

#### Using Context Packs

```yaml
# If context pack detected/selected:
pack_usage:
  step_1: "Load pack definition from contexts/packs/{pack}.yaml"
  step_2: "Extract stack_sections specified in pack"
  step_3: "Match ADRs using pack's adr_patterns"
  step_4: "Load patterns specified in pack"
  step_5: "Apply standards from pack"
  step_6: "Search for related files using pack's patterns"
  step_7: "Run key_extractions to find specific code"
  step_8: "Include implementation_hints in story"

# Benefit: 3x faster story generation with consistent context
```

### Phase 1b: Inheritance Check (for Child Stories)

> **NEW**: If generating a child story, inherit from parent instead of full extraction.
> See `core/context-inheritance.md` for the inheritance protocol.

```yaml
step_1b_check_inheritance:
  action: "Determine if this is a child story"

  is_child_story:
    when:
      - "Task is part of a decomposed epic"
      - "Parent story already exists with full context"
      - "Context overlap with parent > 70%"

  if_child:
    action: "Use inheritance instead of full extraction"
    steps:
      - "Load parent story"
      - "Identify additions (what child needs that parent lacks)"
      - "Identify exclusions (what parent has that child doesn't need)"
      - "Identify overrides (what child needs differently)"
      - "Use STORY-TEMPLATE-CHILD.md"

  if_standalone:
    action: "Continue with full context extraction (Phase 2)"
```

### Phase 1c: Hash Computation (for Staleness Detection)

> **NEW**: Compute hashes of source files for staleness detection.
> See `core/context-staleness.md` for the staleness protocol.

```yaml
step_1c_compute_hashes:
  action: "Record source file hashes for freshness tracking"

  for_each_source_file:
    - file: "[path to source file]"
      hash: "sha256(content)[:12]"  # First 12 chars of SHA-256
      extracted_at: "[ISO timestamp]"

  output:
    context_sources:
      - file: ".project/03-architecture/stack.md"
        hash: "a1b2c3d4e5f6"
        extracted_at: "2025-01-24T10:30:00Z"
      # ... for each source file

  purpose: "Enable staleness detection before story execution"
```

### Phase 2: Context Loading

```yaml
step_2_load_context:
  action: "Load and extract relevant portions of context files"

  sources:
    stack_architecture:
      path: ".project/03-architecture/stack.md"
      extract: "Only sections relevant to task's stack areas"

    adrs:
      path: ".project/04-adr/ADR-XXX.md"
      extract: "Decision + Consequences (not full history)"

    patterns:
      path: "knowledge/patterns/{pattern}.md"
      extract: "Key rules + anti-patterns (not full examples)"

    code_standards:
      path: "knowledge/rules/{standard}.md"
      extract: "Rules that apply to this task type"

    existing_code:
      path: "[identified related files]"
      extract: "Key functions/interfaces this task interacts with"

  output: "Condensed context for embedding (not full files)"
```

### Phase 3: Story Synthesis

```yaml
step_3_synthesize_story:
  action: "Create detailed story from task + context"

  components:
    objective:
      what: "Transform task description into clear deliverable"
      why: "Connect to user value from Session Plan"
      criteria: "Derive from task acceptance criteria"

    embedded_context:
      principle: "Include ONLY what's needed for THIS story"
      format: "Condensed, actionable extracts"
      goal: "Agent can execute without loading other files"

    implementation_plan:
      breakdown: "Split into 2-4 hour subtasks max"
      steps: "Specific, actionable instructions"
      validation: "How to verify each subtask"

    technical_spec:
      interfaces: "Define API contracts upfront"
      database: "Schema changes if any"
      components: "Structure for new code"

    testing:
      unit: "Key test cases for logic"
      integration: "End-to-end scenarios"
      manual: "What to check by hand"

    dependencies:
      depends_on: "What must complete before this"
      blocks: "What this enables"
```

### Phase 4: Story Validation

```yaml
step_4_validate_story:
  action: "Ensure story is self-contained and executable"

  checklist:
    completeness:
      - "Can an agent execute this without asking questions?"
      - "Is all needed context embedded?"
      - "Are steps specific enough to follow?"

    accuracy:
      - "Does embedded context match source files?"
      - "Are patterns correctly applied?"
      - "Is technical spec feasible?"

    scope:
      - "Is the story sized appropriately (2-8 hours)?"
      - "Is scope clear (what's in/out)?"
      - "Are dependencies correctly identified?"

  if_issues:
    too_big: "Split into multiple stories"
    missing_context: "Load and embed more context"
    unclear_steps: "Add more detail to implementation plan"
```

---

## Context Extraction Templates

### 2.1 Stack & Architecture Extract

```yaml
# From: .project/03-architecture/stack.md
# Extract: Only stack elements relevant to story

# Example for a "Create API endpoint" story:
extract_for_api_story:
  framework: "Next.js 14 App Router"
  language: "TypeScript 5.x strict mode"
  api_style: "Route handlers in app/api/"
  database: "PostgreSQL + Prisma"
  validation: "Zod schemas"
  auth: "NextAuth.js v5"

# Example for a "Create React component" story:
extract_for_component_story:
  framework: "Next.js 14 App Router"
  language: "TypeScript 5.x strict mode"
  styling: "Tailwind CSS + shadcn/ui"
  state: "React hooks + Context"
  testing: "Vitest + Testing Library"
```

### 2.2 ADR Extract

```yaml
# From: .project/04-adr/ADR-XXX.md
# Extract: Decision + Impact (not full context/alternatives)

extract_format:
  adr_id: "ADR-XXX"
  title: "[Decision title]"
  decision: "[What was decided - 1-2 sentences]"
  consequence_for_story: "[How this affects this specific story]"

# Example:
example_extract:
  adr_id: "ADR-003"
  title: "Use Prisma for database access"
  decision: "All database access via Prisma ORM with typed queries"
  consequence_for_story: "Must define Prisma model before API, use prisma client"
```

### 2.3 Pattern Extract

```yaml
# From: knowledge/patterns/{domain}/{pattern}.md
# Extract: Key rules + anti-patterns relevant to story

extract_format:
  pattern_name: "[Name]"
  key_rules:
    - "[Rule 1 - actionable]"
    - "[Rule 2 - actionable]"
  anti_patterns:
    - "[What NOT to do]"
  example_snippet: |
    // Brief code example if helpful
    [10-20 lines max]

# Example for API pattern:
example_extract:
  pattern_name: "REST API Design"
  key_rules:
    - "Use plural nouns for resources (/users not /user)"
    - "Return appropriate HTTP status codes"
    - "Validate input with Zod before processing"
    - "Wrap responses in { data: ... } or { error: ... }"
  anti_patterns:
    - "Don't expose internal errors to client"
    - "Don't use verbs in URLs"
```

### 2.4 Code Standards Extract

```yaml
# From: knowledge/rules/{standard}.md
# Extract: Rules that apply to this story's code

extract_format:
  domain: "[typescript|react|api|testing|...]"
  rules:
    - "[Applicable rule 1]"
    - "[Applicable rule 2]"

# Example for TypeScript story:
example_extract:
  domain: "typescript"
  rules:
    - "No 'any' types - use 'unknown' + type guards"
    - "Export interfaces from .types.ts files"
    - "Use const assertions for literal types"
```

### 2.5 Related Code Extract

```yaml
# From: Source code files
# Extract: Interfaces/functions this story interacts with

extract_format:
  file: "[path/to/file.ts]"
  relevance: "[Why this matters for the story]"
  code_snippet: |
    // Key interface or function
    // 10-30 lines that story needs to understand

# Example:
example_extract:
  file: "src/lib/auth.ts"
  relevance: "Story must check user authentication"
  code_snippet: |
    export async function getServerSession() {
      // ... implementation
    }

    export interface Session {
      user: {
        id: string;
        email: string;
        role: 'admin' | 'user';
      }
    }
```

---

## Story File Location

```
.project/stories/
├── STORY-001-{slug}.md
├── STORY-002-{slug}.md
└── ...
```

Naming convention: `STORY-{number}-{short-slug}.md`

Examples:
- `STORY-001-stripe-webhook-handler.md`
- `STORY-002-pricing-page-component.md`
- `STORY-003-subscription-api.md`

---

## Integration with APEX Pipeline

### In DECOMPOSE Stage

```yaml
decompose_with_stories:
  step_1: "Create T-XXX tasks in Session Plan (existing)"
  step_2: "For each T-XXX where story needed:"
  step_3: "  → Generate STORY-XXX using this protocol"
  step_4: "  → Store in .project/stories/"
  step_5: "Session Plan references stories"
```

### Session Plan Updates

Add to SESSION-PLAN.md Section 6 (Tasks):

```markdown
#### T-003: Create webhook handler

- **Description**: Implement Stripe webhook handler
- **Story**: `.project/stories/STORY-003-stripe-webhook.md`
- **Agent**: tech/backend-developer
- **Gate**: 🟢
- **Effort**: 4h
```

### Execution Flow

```
1. Agent receives task T-003
2. Agent loads STORY-003-stripe-webhook.md
3. Story contains ALL needed context
4. Agent executes without loading other files
5. Agent updates story execution log
6. Story handed off to next stage
```

---

## Example: Generating a Story

### Input: Task from Session Plan

```markdown
#### T-003: Create Stripe webhook handler

- **Description**: Implement endpoint to receive Stripe events
- **Deliverable**: `/api/webhooks/stripe` endpoint
- **Agent**: tech/backend
- **Depends On**: T-002 (DB schema)
- **Gate**: 🟢
- **Effort**: 4h
```

### Context Extraction

```yaml
context_needs:
  stack_areas: ["api", "database"]
  relevant_adrs: ["ADR-003 (Prisma)", "ADR-007 (Stripe)"]
  applicable_patterns: ["api-design.md", "error-handling.md", "webhook-security.md"]
  related_files: ["src/lib/stripe.ts", "prisma/schema.prisma"]
  standards_needed: ["typescript", "api-validation"]
```

### Generated Story (abbreviated)

See full template in `templates/STORY-TEMPLATE.md`

```markdown
# Story: STORY-003 Stripe Webhook Handler

## 1. Objective
### What
Create `/api/webhooks/stripe` endpoint to receive and process Stripe events

### Why
Enable real-time subscription updates when users upgrade/downgrade/cancel

## 2. Embedded Context

### 2.1 Stack
framework: "Next.js 14 App Router"
api_style: "Route handlers"
database: "PostgreSQL + Prisma"

### 2.2 Relevant ADRs
- ADR-003: Use Prisma → Must update subscription via Prisma
- ADR-007: Stripe Integration → Use official SDK, verify signatures

### 2.3 Applicable Patterns
- Webhook Security: Verify signature, idempotency keys
- Error Handling: Never expose internal errors

### 2.4 Related Code
[Stripe client setup, Subscription model]

## 3. Implementation Plan
1. Create route handler file (0.5h)
2. Implement signature verification (1h)
3. Handle subscription events (2h)
4. Add tests (0.5h)

[... full details in each section ...]
```

---

## Quality Criteria

A good story passes this checklist:

### Self-Containment Test
- [ ] Agent can start immediately without asking questions
- [ ] No need to load `.project/` or `knowledge/` files
- [ ] All decisions already made and documented

### Specificity Test
- [ ] Steps are concrete, not vague
- [ ] Expected outputs defined for each step
- [ ] Validation criteria are testable

### Scope Test
- [ ] Completable in 2-8 hours
- [ ] Clear what's included/excluded
- [ ] Dependencies explicitly listed

### Context Accuracy Test
- [ ] Embedded context matches source files
- [ ] Patterns correctly interpreted
- [ ] Standards properly applied

---

## Pre-Execution: Staleness Check

Before executing a story, verify embedded context is still fresh:

```yaml
pre_execution_staleness_check:
  trigger: "Agent loads story for execution"

  procedure:
    step_1:
      action: "Parse context_sources from story Section 2.0"
      extract: "List of {file, hash, extracted_at}"

    step_2:
      action: "For each source file"
      sub_steps:
        - "Check file exists"
        - "Compute current hash: sha256(content)[:12]"
        - "Compare with stored hash"

    step_3:
      action: "Classify staleness severity"
      levels:
        critical: # 🔴 Architecture, ADRs, Schema
          files: [".project/03-architecture/*", ".project/04-adr/*", "prisma/*"]
          action: "Block execution, require refresh"

        high: # 🟡 Patterns, Rules
          files: ["knowledge/patterns/*", "knowledge/rules/*"]
          action: "Warn, recommend refresh"

        low: # 🟢 Source code, Tests
          files: ["src/*", "**/*.test.ts"]
          action: "Note for awareness, continue"

    step_4:
      action: "Present results and options"
      if_all_fresh: "Proceed with execution"
      if_some_stale:
        options:
          - "Refresh stale context (recommended)"
          - "Continue with warning"
          - "Abort execution"

  refresh_procedure:
    - "Re-extract context from stale files"
    - "Update embedded content in story"
    - "Update hash and timestamp"
    - "Log refresh in execution log"
```

See `core/context-staleness.md` for full staleness detection protocol.

---

## Post-Execution: Learning Capture

After story execution, extract learnings to improve future stories:

```yaml
post_story_workflow:
  trigger: "Story marked as 'Done'"

  steps:
    1_analyze:
      action: "Review execution log and deviations"
      source: "Story Section 8 (Execution Log)"

    2_extract:
      action: "Identify reusable insights"
      types: ["pattern", "edge_case", "gotcha", "estimation_insight"]

    3_update:
      action: "Add to knowledge base"
      destinations:
        - "knowledge/patterns/" # New patterns
        - "knowledge/cases/"    # Edge cases
        - "knowledge/rules/"    # Rules & gotchas
        - "contexts/packs/"     # Pack improvements

    4_document:
      action: "Complete Learning Capture section (11) in story"
```

See `core/learning-capture.md` for full protocol.

---

## References

- `templates/STORY-TEMPLATE.md` - Full story template (standalone/parent)
- `templates/STORY-TEMPLATE-CHILD.md` - Child story template (inherited context)
- `templates/SESSION-PLAN.md` - How stories link to tasks
- `intake/PROTOCOL.md` - DECOMPOSE stage integration
- `core/task-management.md` - Task system overview
- `core/learning-capture.md` - Learning extraction protocol
- `core/context-inheritance.md` - Parent→Child context inheritance
- `core/context-staleness.md` - Staleness detection and refresh
- `contexts/packs/README.md` - Context Packs system

---

## Inspired By

This protocol adapts the "hyper-detailed stories" concept from the [BMAD Method](https://github.com/bmad-code-org/BMAD-METHOD), where stories are self-contained documents with embedded context that eliminate the "telephone game" effect between planning and execution.

Key BMAD principles adopted:
- **Self-contained stories** with embedded architectural context
- **Document synthesis** from multiple sources into single artifact
- **Execution tracking** within the story document
- **Handoff notes** for continuity between agents/sessions

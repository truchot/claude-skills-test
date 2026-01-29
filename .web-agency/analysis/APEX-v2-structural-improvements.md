# APEX v2 - Structural Improvements for AI Task Processing

**Date**: 2026-01-22
**Status**: Analysis & Recommendations
**Context**: Comparison with BMAD methodology post-Phase 1 improvements

---

## Executive Summary

After implementing Phase 1 improvements (context-loader, compiled-agents, state-v2, executable checklists), a critical gap remains:

> **Our system is DESCRIPTIVE, not EXECUTABLE.**

BMAD's advantage is that its files are **machine-interpretable** - an AI can parse and execute them directly. Our files describe what should happen but require the AI to interpret and remember the rules.

### The Core Problem

```
BMAD Approach:
┌─────────────────────────────────────────────┐
│ workflow.xml → PARSES → instructions.md    │
│ → EXECUTES steps → SAVES state per step    │
│ → LOADS context via discover_inputs        │
└─────────────────────────────────────────────┘
Result: Mechanical execution, AI follows instructions

APEX Current:
┌─────────────────────────────────────────────┐
│ ORCHESTRATOR.md → AI READS and INTERPRETS  │
│ → AI DECIDES what to load                  │
│ → AI REMEMBERS what step it's on           │
│ → AI TRACKS state mentally                 │
└─────────────────────────────────────────────┘
Result: Cognitive load on AI, inconsistent execution
```

---

## Gap Analysis: Documentation vs Execution

### Gap 1: Context Loader is Descriptive

**Current State** (`core/context-loader.md`):
```yaml
# This is documentation that the AI must interpret
role_context:
  tech_architect:
    load:
      - path: ".project/03-architecture/*.md"
      - path: "knowledge/patterns/technical/*.md"
```

**Problem**: AI must:
1. Read and understand these rules
2. Remember them during execution
3. Apply them consistently
4. Handle edge cases not covered

**BMAD Approach** (`discover_inputs`):
```xml
<discover_inputs>
  <strategy>INDEX_GUIDED</strategy>
  <index_file>docs/index.md</index_file>
</discover_inputs>
```
Result: Mechanical parsing, guaranteed context loading.

---

### Gap 2: Compiled Agents Lack Execution Directives

**Current State** (compiled agents):
```markdown
## Full Procedure

### Phase 1: Understand the Change
step_1_understand:
  action: "Understand what the PR is trying to accomplish"
  gather_info:
    from_pr:
      - "PR title and description"
```

**Problem**: This describes WHAT to do, not HOW to execute mechanically.

**Missing**:
- Step completion markers
- State save points
- Explicit "WAIT FOR USER" points
- Output validation rules
- Failure recovery paths

---

### Gap 3: State is Schema-Only

**Current State** (`state/schema-v2.json`):
- Defines structure for step-level tracking
- Defines checkpoints format
- Defines progress tracking

**Problem**: No implementation. The schema exists but:
- No code to read/write state
- No automatic checkpointing
- AI must manually update JSON (error-prone)

---

### Gap 4: No Task Contract

BMAD has a clear task contract format that defines what the AI receives at the start of each task. APEX lacks this.

**What AI currently receives**: Variable, depends on what user provides and what AI decides to load.

**What AI should receive**: Standardized task contract with everything needed.

---

## Proposed Architecture: APEX v2

### Principle: Make Files Executable, Not Descriptive

Transform APEX from a documentation framework into an execution framework by:

1. **Task Contracts** - Standardized input format
2. **Inline Directives** - Embedded execution commands
3. **State Protocol** - Simple state machine the AI follows
4. **Output Validation** - Inline validators for each step

---

## P0 Improvements (Critical Foundation)

### 1. Task Contract Format

Create a standardized format that the AI receives at task start:

```yaml
# .web-agency/contracts/task-contract.yaml
task_contract:
  version: "1.0"

  # What the AI is doing
  task:
    type: "code-review"
    description: "Review PR #123"
    role: "lead-developer"
    agent: "code-review"

  # Everything the AI needs (pre-loaded)
  context:
    project:
      type: "saas"
      stack: ["Next.js", "TypeScript", "Prisma"]

    artifacts:
      - path: ".project/03-architecture/stack.md"
        summary: "Tech stack is Next.js 14 with App Router..."
      - path: "knowledge/rules/code-standards.md"
        summary: "Key rules: ESLint strict, Prettier, no any..."

    decisions:
      - "ADR-001: Using tRPC for type-safe APIs"
      - "ADR-003: Prisma over Drizzle"

  # What the AI must produce
  expected_outputs:
    - type: "review_decision"
      format: "approved|changes_requested|blocked"
      required: true
    - type: "review_comments"
      format: "list of comments by severity"
      required: true

  # Current state
  state:
    step: 1
    total_steps: 5
    checkpoint: "task-start"

  # Execution rules
  execution:
    gate_at_end: "blocking"
    auto_checkpoint: true
    max_iterations: 5
```

**Why This Helps AI**:
- No interpretation needed - everything is explicit
- Context is pre-loaded and summarized
- Expected outputs are clear
- State is provided, not constructed

---

### 2. Inline Execution Directives

Add machine-readable directives within compiled agents:

```markdown
# Code Review Agent (v2)

<!-- @APEX:INIT -->
<!-- @LOAD: .project/03-architecture/stack.md -->
<!-- @LOAD: knowledge/rules/code-standards.md -->
<!-- @REQUIRE: PR diff or files to review -->
<!-- @APEX:END_INIT -->

## Phase 1: Understand the Change

<!-- @APEX:STEP id="1" name="understand" -->

### Action
Understand what the PR is trying to accomplish.

### Gather Info
- PR title and description
- Linked issue/ticket
- Files changed

### Output
```yaml
understanding:
  pr_title: "[title]"
  purpose: "[what it does]"
  scope: "[files affected]"
  concerns: "[if any]"
```

<!-- @APEX:CHECKPOINT name="understood" -->
<!-- @APEX:VALIDATE -->
<!-- - understanding.pr_title is not empty -->
<!-- - understanding.purpose is not empty -->
<!-- @APEX:END_VALIDATE -->
<!-- @APEX:END_STEP -->

## Phase 2: Review

<!-- @APEX:STEP id="2" name="review" depends="1" -->
...
<!-- @APEX:END_STEP -->

## Phase 5: Decision

<!-- @APEX:STEP id="5" name="decision" -->
<!-- @APEX:GATE type="blocking" -->

### Output Decision

<!-- @APEX:OUTPUT type="review_decision" required="true" -->
```yaml
decision: "[approved|changes_requested|blocked]"
rationale: "[why]"
```
<!-- @APEX:END_OUTPUT -->

<!-- @APEX:WAIT_USER prompt="Do you approve this review?" -->
<!-- @APEX:END_STEP -->
```

**Directive Reference**:

| Directive | Purpose |
|-----------|---------|
| `@APEX:INIT` | Declare initialization requirements |
| `@LOAD` | Context files to load |
| `@REQUIRE` | Required inputs from user |
| `@APEX:STEP` | Begin step with id and name |
| `@APEX:CHECKPOINT` | Save state at this point |
| `@APEX:VALIDATE` | Validate step outputs |
| `@APEX:GATE` | HITL gate (blocking/advisory) |
| `@APEX:OUTPUT` | Expected output format |
| `@APEX:WAIT_USER` | Pause for user input |
| `@APEX:END_*` | Close blocks |

---

### 3. Simple State Protocol

Instead of complex JSON schema, provide a simple protocol:

```markdown
# State Protocol

## State File Location
`state/current.json`

## State Operations

### READ_STATE
At task start, read current state:
```json
{
  "task_id": "T-001",
  "step": 2,
  "checkpoint": "review-complete",
  "outputs": {
    "step_1": { "understanding": {...} }
  }
}
```

### SAVE_STEP
After completing each step:
```json
{
  "step": 3,
  "checkpoint": "step-3-complete",
  "outputs": {
    "step_1": {...},
    "step_2": {...},
    "step_3": { "current_output": {...} }
  }
}
```

### RESUME
If resuming from checkpoint:
1. Read `state/current.json`
2. Find last `checkpoint`
3. Load `outputs` from previous steps
4. Continue from `step` + 1

### COMPLETE
At task end:
```json
{
  "status": "completed",
  "completed_at": "...",
  "final_output": {...}
}
```
```

---

### 4. Context Manifest (Replace Context Loader)

Instead of rules to interpret, create explicit manifests per task type:

```yaml
# .web-agency/manifests/code-review.manifest.yaml
manifest:
  task: "code-review"
  role: "lead-developer"

  # Exact files to load (no interpretation needed)
  context_files:
    required:
      - ".project/03-architecture/stack.md"
      - "knowledge/rules/code-standards.md"

    if_exists:
      - ".project/04-specs/features/{feature}/spec.md"
      - ".project/03-architecture/decisions/ADR-*.md"

    from_user:
      - "PR diff or list of files to review"

  # Summaries to include (pre-generated)
  context_summaries:
    stack: "Load and summarize tech stack"
    standards: "Load and extract key rules"

  # State requirements
  state:
    load: "state/current.json"
    checkpoint_after: ["understand", "review", "decision"]

  # Output requirements
  outputs:
    review_decision:
      format: "yaml"
      schema: "schemas/review-decision.yaml"
    review_comments:
      format: "list"
      group_by: "severity"
```

**Manifest per task type**:
```
manifests/
├── code-review.manifest.yaml
├── api-design.manifest.yaml
├── estimation.manifest.yaml
├── frontend-implementation.manifest.yaml
├── prd-writing.manifest.yaml
└── ...
```

---

## P1 Improvements (Reduce Cognitive Load)

### 5. Step Markers with Progress Tracking

Add visual progress tracking:

```markdown
<!-- @APEX:PROGRESS -->
## Current Progress

| Step | Name | Status |
|------|------|--------|
| 1 | Understand | ✅ Complete |
| 2 | Review | 🔄 In Progress |
| 3 | Findings | ⏳ Pending |
| 4 | Comments | ⏳ Pending |
| 5 | Decision | ⏳ Pending |

**Current**: Step 2 of 5 - Review
**Checkpoint**: step-1-complete
<!-- @APEX:END_PROGRESS -->
```

### 6. Output Validators (Inline)

Instead of separate checklists, embed validators:

```markdown
<!-- @APEX:VALIDATOR id="review-decision" -->
```yaml
validator:
  type: "review_decision"
  rules:
    - field: "decision"
      type: "enum"
      values: ["approved", "changes_requested", "blocked"]
      required: true

    - field: "rationale"
      type: "string"
      min_length: 20
      required: true

    - field: "comments"
      type: "array"
      required_if: "decision == 'changes_requested'"
      min_items: 1

  auto_checks:
    - "No 'TODO' in code if decision is 'approved'"
    - "All critical issues have comments if 'changes_requested'"
```
<!-- @APEX:END_VALIDATOR -->
```

### 7. Error Recovery Patterns

Embed recovery instructions:

```markdown
<!-- @APEX:ON_ERROR -->
## Error Recovery

### If context is missing:
```yaml
action: "STOP"
message: "Missing required context: {file}"
recovery: "Load the file and retry"
```

### If validation fails:
```yaml
action: "RETRY"
max_retries: 2
message: "Output validation failed: {reason}"
recovery: "Review output format and regenerate"
```

### If blocked by dependency:
```yaml
action: "ESCALATE"
message: "Blocked by: {dependency}"
recovery: "Request user to complete {dependency} first"
```

### If max iterations reached:
```yaml
action: "CHECKPOINT_AND_PAUSE"
message: "Reached max iterations without completion"
recovery: "Save state and ask user how to proceed"
```
<!-- @APEX:END_ON_ERROR -->
```

---

## P2 Improvements (Optimization)

### 8. Resume Protocol

Standardized resume from any checkpoint:

```yaml
# .web-agency/protocols/resume.protocol.yaml
resume_protocol:
  version: "1.0"

  steps:
    1_load_state:
      action: "Read state/current.json"
      extract: ["task_id", "step", "checkpoint", "outputs"]

    2_load_manifest:
      action: "Read manifests/{task_type}.manifest.yaml"
      extract: ["context_files", "outputs"]

    3_load_context:
      action: "Load files from manifest.context_files"
      skip_if: "already summarized in state.outputs"

    4_restore_outputs:
      action: "Load previous step outputs from state.outputs"
      format: "Inject as context for current step"

    5_continue:
      action: "Resume from step = state.step + 1"
      using: "compiled-agents/{role}/{agent}.compiled.md"

  announce_template: |
    ## Resuming Task

    **Task**: {task_id}
    **Resuming from**: Step {step} ({checkpoint})
    **Previous outputs loaded**: {output_count}

    Continuing with step {next_step}...
```

### 9. Learning Trigger Protocol

When to capture knowledge:

```yaml
# .web-agency/protocols/learning.protocol.yaml
learning_triggers:
  version: "1.0"

  # Automatic triggers
  auto_triggers:
    - condition: "Task completed successfully"
      check: "Was there a novel solution?"
      action: "Propose pattern capture"

    - condition: "Gate failed then passed after adjustment"
      check: "What was learned?"
      action: "Capture as rule or checklist item"

    - condition: "Estimation was off by > 30%"
      check: "Why?"
      action: "Update estimation knowledge"

    - condition: "Same error occurred twice"
      check: "Pattern?"
      action: "Add to troubleshooting"

  # Capture templates
  pattern_template:
    path: "knowledge/patterns/{category}/{name}.md"
    fields:
      - "Problem/Context"
      - "Solution"
      - "When to apply"
      - "Example"

  rule_template:
    path: "knowledge/rules/{category}.md"
    append: true
    fields:
      - "Rule statement"
      - "Why"
      - "Source (project/date)"
```

---

## Migration Path

### Phase 1: Task Contracts (Week 1)
1. Create `contracts/` directory
2. Build `task-contract.yaml` template
3. Create contracts for top 5 task types
4. Update ORCHESTRATOR to generate contracts

### Phase 2: Inline Directives (Week 2)
1. Define directive syntax
2. Update 8 compiled agents with directives
3. Create directive parser documentation
4. Test with real tasks

### Phase 3: Manifests (Week 3)
1. Create `manifests/` directory
2. Convert context-loader rules to manifests
3. One manifest per task type
4. Deprecate interpretive context loading

### Phase 4: Protocols (Week 4)
1. Create `protocols/` directory
2. Implement resume protocol
3. Implement error recovery
4. Implement learning triggers

---

## Comparison: Before and After

### Before (Current APEX)

```
User: "Review this PR"
    │
    ▼
AI reads ORCHESTRATOR.md (750 lines)
    │
    ▼
AI interprets context-loader rules
    │
    ▼
AI decides what to load
    │
    ▼
AI reads compiled-agent (400 lines)
    │
    ▼
AI interprets procedure
    │
    ▼
AI mentally tracks steps
    │
    ▼
AI produces output (maybe correct format)
```

**Problems**:
- High cognitive load
- Inconsistent execution
- No automatic checkpointing
- Format variations in output

### After (APEX v2)

```
User: "Review this PR"
    │
    ▼
System generates task-contract.yaml
(context pre-loaded, state initialized)
    │
    ▼
AI loads compiled-agent with directives
    │
    ▼
AI executes @APEX:STEP 1
    │
    ▼
@APEX:CHECKPOINT → state saved
    │
    ▼
@APEX:VALIDATE → output validated
    │
    ▼
AI executes @APEX:STEP 2
    │
    ▼
... (mechanical execution)
    │
    ▼
@APEX:GATE → waits for user
    │
    ▼
@APEX:OUTPUT → validated format
```

**Benefits**:
- Low cognitive load (follow directives)
- Consistent execution
- Automatic checkpointing
- Validated output format

---

## File Structure: APEX v2

```
.web-agency/
├── ORCHESTRATOR.md                 # Updated with v2 protocol
├── APEX.md                         # Updated with v2 architecture
│
├── contracts/                      # NEW: Task contracts
│   ├── task-contract.template.yaml
│   └── examples/
│       └── code-review.contract.yaml
│
├── manifests/                      # NEW: Context manifests
│   ├── code-review.manifest.yaml
│   ├── api-design.manifest.yaml
│   ├── estimation.manifest.yaml
│   └── ...
│
├── protocols/                      # NEW: Execution protocols
│   ├── resume.protocol.yaml
│   ├── error-recovery.protocol.yaml
│   └── learning.protocol.yaml
│
├── compiled-agents/                # UPDATED: With directives
│   ├── lead-developer/
│   │   └── code-review.compiled.md  # Now with @APEX directives
│   └── ...
│
├── schemas/                        # NEW: Output schemas
│   ├── review-decision.schema.yaml
│   ├── estimation.schema.yaml
│   └── ...
│
├── state/
│   ├── current.json               # Runtime state
│   ├── schema-v2.json             # Schema definition
│   └── checkpoints/               # NEW: Checkpoint storage
│       └── {task_id}/
│
└── core/
    ├── context-loader.md          # DEPRECATED: Replaced by manifests
    └── directive-reference.md     # NEW: Directive documentation
```

---

## Recommendation Summary

| Priority | Improvement | Impact | Effort |
|----------|-------------|--------|--------|
| **P0** | Task Contract Format | High - Standardizes input | Medium |
| **P0** | Inline Directives | High - Enables mechanical execution | Medium |
| **P0** | Context Manifests | High - Eliminates interpretation | Low |
| **P1** | Step Progress Tracking | Medium - Visual feedback | Low |
| **P1** | Output Validators | Medium - Ensures quality | Medium |
| **P1** | Error Recovery | Medium - Handles failures | Low |
| **P2** | Resume Protocol | Medium - Enables pause/resume | Low |
| **P2** | Learning Triggers | Low - Improves over time | Low |

---

## Next Steps

1. **Validate approach** - Review this analysis with team
2. **Prototype** - Build one complete task flow with v2 architecture
3. **Test** - Run real tasks through v2 pipeline
4. **Iterate** - Refine based on results
5. **Migrate** - Convert remaining agents to v2 format

---

## Appendix: BMAD Patterns We're Adopting

| BMAD Pattern | APEX v2 Adaptation |
|--------------|-------------------|
| `workflow.xml` orchestrator | Task Contract + Directive-based agents |
| `discover_inputs` | Context Manifests |
| Step-level state | `@APEX:CHECKPOINT` directives |
| `template-output` | `@APEX:OUTPUT` with schemas |
| Tri-modal workflows | Not adopted (keep simpler model) |
| IDE compiler | Not adopted (manual compilation) |

---

## Appendix: What We're NOT Adopting

| BMAD Feature | Reason |
|--------------|--------|
| Multi-IDE compiler | Adds complexity, low ROI |
| .agent.yaml source files | Manual .compiled.md is sufficient |
| Tri-modal workflows | Over-engineering for our scale |
| XML-based workflows | YAML is sufficient and cleaner |

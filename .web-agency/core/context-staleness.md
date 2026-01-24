# Context Staleness Detection

> **Detect when embedded context becomes outdated**

---

## Overview

Embedded context can become stale if source files change after story generation. Staleness Detection tracks source file hashes and warns before execution if context may be outdated.

```
┌─────────────────────────────────────────────────────────────────┐
│                    STALENESS DETECTION                           │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  STORY GENERATION (T=0)                                          │
│  ┌─────────────────────────────────────────┐                     │
│  │  Source Files → Hash → Embed Context    │                     │
│  │                                          │                     │
│  │  stack.md        [hash: a1b2c3]         │                     │
│  │  ADR-001.md      [hash: d4e5f6]         │                     │
│  │  api-design.md   [hash: g7h8i9]         │                     │
│  └─────────────────────────────────────────┘                     │
│                                                                  │
│  TIME PASSES... Source files may change                          │
│                                                                  │
│  STORY EXECUTION (T=n)                                           │
│  ┌─────────────────────────────────────────┐                     │
│  │  Before Execute: Staleness Check        │                     │
│  │                                          │                     │
│  │  stack.md        [hash: a1b2c3] ✅ OK    │                     │
│  │  ADR-001.md      [hash: x9y8z7] ⚠️ STALE │                     │
│  │  api-design.md   [hash: g7h8i9] ✅ OK    │                     │
│  └─────────────────────────────────────────┘                     │
│       │                                                          │
│       ▼                                                          │
│  ⚠️ WARNING: 1 source file changed since context extraction      │
│  Options: [Refresh] [Continue Anyway] [Abort]                    │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## How It Works

### 1. At Story Generation

When extracting context, record source metadata:

```yaml
# In STORY-XXX.md, Section 2.X
context_sources:
  stack:
    file: ".project/03-architecture/stack.md"
    hash: "sha256:a1b2c3d4e5f6..."  # Content hash
    extracted_at: "2025-01-24T10:30:00Z"
    lines_extracted: "15-45"  # Optional: specific lines

  adrs:
    - file: ".project/04-adr/ADR-001.md"
      hash: "sha256:d4e5f6g7h8i9..."
      extracted_at: "2025-01-24T10:30:00Z"

    - file: ".project/04-adr/ADR-003.md"
      hash: "sha256:j1k2l3m4n5o6..."
      extracted_at: "2025-01-24T10:30:00Z"

  patterns:
    - file: "knowledge/patterns/technical/api-design.md"
      hash: "sha256:p7q8r9s0t1u2..."
      extracted_at: "2025-01-24T10:30:00Z"

  related_code:
    - file: "src/lib/auth.ts"
      hash: "sha256:v3w4x5y6z7a8..."
      extracted_at: "2025-01-24T10:30:00Z"
```

### 2. At Story Execution

Before starting work, run staleness check:

```yaml
staleness_check:
  action: "Compute current hash for each source file"
  compare: "Against stored hash in context_sources"

  results:
    - file: ".project/03-architecture/stack.md"
      stored_hash: "sha256:a1b2c3d4..."
      current_hash: "sha256:a1b2c3d4..."
      status: "✅ fresh"

    - file: ".project/04-adr/ADR-001.md"
      stored_hash: "sha256:d4e5f6g7..."
      current_hash: "sha256:x9y8z7w6..."  # Different!
      status: "⚠️ stale"
      age: "3 days since extraction"
```

### 3. Handle Stale Context

```yaml
staleness_response:
  if_stale:
    severity: "warning"  # or "error" for critical files

    options:
      refresh:
        action: "Re-extract context from changed files"
        updates: "Embedded context in story"
        note: "Recommended if changes are significant"

      continue:
        action: "Proceed with potentially outdated context"
        risk: "May miss important changes"
        when: "Changes are minor or irrelevant to story"

      abort:
        action: "Stop execution, review changes first"
        when: "Critical files changed significantly"

    decision_factors:
      - "How critical is the changed file?"
      - "How long since extraction?"
      - "What changed in the file?"
```

---

## Staleness Severity Levels

```yaml
severity_levels:
  critical:
    files:
      - ".project/03-architecture/*"
      - ".project/04-adr/*"
      - "prisma/schema.prisma"
    action: "🔴 STOP - Must refresh before execution"
    reason: "Architectural changes affect implementation"

  high:
    files:
      - "knowledge/patterns/*"
      - "knowledge/rules/*"
    action: "🟡 WARN - Recommend refresh"
    reason: "Pattern/rule changes may affect approach"

  medium:
    files:
      - "src/lib/*"
      - "src/types/*"
    action: "🟡 WARN - Review diff"
    reason: "Code changes may affect integration"

  low:
    files:
      - "src/components/*"
      - "**/*.test.ts"
    action: "🟢 INFO - Note for awareness"
    reason: "Less likely to affect story execution"
```

---

## Story Template Integration

Add to Section 2 of `STORY-TEMPLATE.md`:

```markdown
## 2. Embedded Context

### 2.0 Context Freshness

> **Staleness tracking for embedded context**

| Source File | Hash | Extracted | Status |
|-------------|------|-----------|--------|
| `.project/03-architecture/stack.md` | `a1b2c3` | 2025-01-24 | ✅ Fresh |
| `.project/04-adr/ADR-001.md` | `d4e5f6` | 2025-01-24 | ✅ Fresh |
| `.project/04-adr/ADR-003.md` | `g7h8i9` | 2025-01-24 | ✅ Fresh |
| `knowledge/patterns/api-design.md` | `j1k2l3` | 2025-01-24 | ✅ Fresh |
| `src/lib/auth.ts` | `m4n5o6` | 2025-01-24 | ✅ Fresh |

**Last Staleness Check**: [YYYY-MM-DD HH:MM] or "Not yet checked"
**Check Result**: ✅ All fresh / ⚠️ X files stale / 🔴 Critical staleness

<!-- If stale, list changes: -->
### Stale Files (if any)

| File | Change Summary | Impact | Action Taken |
|------|----------------|--------|--------------|
| `ADR-001.md` | Added rate limiting section | Medium | Refreshed ✅ |
```

---

## Refresh Protocol

When refreshing stale context:

```yaml
refresh_procedure:
  step_1:
    action: "Identify stale files"
    output: "List of files needing refresh"

  step_2:
    action: "Load current file content"
    for_each: "Stale file"

  step_3:
    action: "Re-extract relevant portions"
    method: "Same extraction rules as original"

  step_4:
    action: "Update embedded context in story"
    sections: "Replace old content with new"

  step_5:
    action: "Update hash and timestamp"
    fields: "context_sources entries"

  step_6:
    action: "Document the refresh"
    location: "Story execution log"

  step_7:
    action: "Validate story still coherent"
    check: "New context doesn't contradict other sections"
```

---

## Hash Computation

Use consistent hashing for reliable comparison:

```yaml
hash_algorithm:
  method: "SHA-256"
  input: "File content (UTF-8)"
  output: "First 12 characters of hex digest"

  # Pseudocode:
  # hash = sha256(file_content).hexdigest()[:12]

  # Example:
  # Content: "# Stack\n\nframework: Next.js 14\n..."
  # Hash: "a1b2c3d4e5f6"

normalization:
  # Normalize before hashing to avoid false positives
  - "Trim trailing whitespace"
  - "Normalize line endings to LF"
  - "Remove trailing newlines"
```

---

## Automated Staleness Check

Add to execution workflow:

```yaml
# In story execution flow
pre_execution_check:
  trigger: "Agent loads story for execution"

  steps:
    - action: "Parse context_sources from story"
    - action: "For each source file:"
      sub_steps:
        - "Check file exists"
        - "Compute current hash"
        - "Compare with stored hash"
    - action: "Aggregate results"
    - action: "If any stale:"
      sub_steps:
        - "Determine severity"
        - "Present options to agent"
        - "Wait for decision"

  output:
    all_fresh: "Proceed with execution"
    some_stale: "Present refresh/continue/abort options"
    critical_stale: "Block execution, require refresh"
```

---

## Staleness Report Format

When stale files detected, generate report:

```markdown
## ⚠️ Staleness Report

**Story**: STORY-003
**Check Time**: 2025-01-27 14:30:00
**Result**: 2 of 5 source files are stale

### Stale Files

#### 1. `.project/04-adr/ADR-001.md` (🔴 Critical)

| Field | Value |
|-------|-------|
| Extracted | 2025-01-24 10:30:00 |
| Age | 3 days |
| Stored Hash | `d4e5f6g7` |
| Current Hash | `x9y8z7w6` |

**Diff Summary**:
- Added: Rate limiting section (lines 45-60)
- Modified: Error handling guidance (lines 30-35)

**Recommendation**: 🔴 Refresh required (architectural impact)

---

#### 2. `src/lib/auth.ts` (🟢 Low)

| Field | Value |
|-------|-------|
| Extracted | 2025-01-24 10:30:00 |
| Age | 3 days |
| Stored Hash | `m4n5o6p7` |
| Current Hash | `q8r9s0t1` |

**Diff Summary**:
- Modified: Import statement (line 3)
- Added: JSDoc comment (lines 15-18)

**Recommendation**: 🟢 Continue OK (cosmetic changes)

---

### Recommended Action

Given 1 critical stale file, recommend: **Refresh before execution**

[ ] Refresh all stale files
[ ] Refresh critical only
[ ] Continue with current context
[ ] Abort execution
```

---

## Integration with Inheritance

When using context inheritance, staleness checks cascade:

```yaml
inheritance_staleness:
  parent_story:
    check: "All parent context_sources"
    if_stale: "Child inherits stale context"

  child_story:
    check: "Parent sources + Child additions"
    if_parent_stale: "Warn about inherited staleness"

  resolution:
    option_1: "Refresh parent, then child inherits fresh"
    option_2: "Refresh in child (override stale parent content)"
```

---

## References

- `templates/STORY-TEMPLATE.md` - Story template with freshness section
- `core/context-inheritance.md` - How staleness works with inheritance
- `core/story-generation.md` - Adding hashes during generation

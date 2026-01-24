---
name: debugging
parent_role: developer
description: Systematically investigates and fixes bugs using proven debugging techniques.
triggers: ["bug", "debug", "fix", "error", "issue", "broken", "crash", "exception", "not working"]
outputs: [Bug Fix, Root Cause Analysis, Fix Verification, Prevention Recommendation]
gate: 🟢 AUTOMATIC - Fix verified before PR
---

# Debugging Agent

## Purpose

Find and fix bugs systematically. Good debugging is methodical, not random. Understand the root cause before fixing, and prevent the bug from recurring.

## When to Invoke

- Investigating reported bugs
- Fixing failing tests
- Diagnosing production issues
- Understanding unexpected behavior
- Troubleshooting errors

## Debugging Principles

```yaml
debugging_principles:
  principle_1:
    name: "Reproduce first"
    rule: "Can't fix what you can't reproduce"
    why: "Confirms the bug exists, enables verification"

  principle_2:
    name: "Understand before fixing"
    rule: "Know the root cause, not just symptoms"
    why: "Prevents partial fixes, enables prevention"

  principle_3:
    name: "Minimal changes"
    rule: "Change only what's necessary"
    why: "Reduces risk of new bugs"

  principle_4:
    name: "Verify the fix"
    rule: "Prove the bug is fixed"
    why: "Prevents false confidence"
```

## Procedure

### Phase 1: Bug Triage

```yaml
step_1_triage:
  action: "Understand and prioritize the bug"

  gather_information:
    what_happened:
      - "Expected behavior"
      - "Actual behavior"
      - "Error messages"
      - "Screenshots/recordings"

    when_it_happened:
      - "When did it start?"
      - "What changed recently?"
      - "Is it intermittent?"

    who_is_affected:
      - "All users or specific?"
      - "Specific browser/device?"
      - "Specific data conditions?"

    how_severe:
      critical: "System down, data loss"
      high: "Major feature broken"
      medium: "Feature impaired"
      low: "Minor inconvenience"

  reproduce_steps:
    document:
      - "Step 1: ..."
      - "Step 2: ..."
      - "Expected: ..."
      - "Actual: ..."

    if_cannot_reproduce:
      - "Get more details from reporter"
      - "Check logs for occurrences"
      - "Try different conditions"
      - "Consider environment differences"
```

### Phase 2: Reproduction

```yaml
step_2_reproduce:
  action: "Reliably reproduce the bug"

  reproduction_checklist:
    - "Follow exact steps from report"
    - "Use same browser/device if relevant"
    - "Use same or similar data"
    - "Check if environment-specific"

  if_intermittent:
    strategies:
      - "Increase logging"
      - "Run in loop"
      - "Check race conditions"
      - "Check timing dependencies"
      - "Check external service state"

  create_minimal_reproduction:
    why: "Isolate the bug from other factors"
    how:
      - "Remove unrelated code"
      - "Use minimal data"
      - "Simplify the scenario"

  document_reproduction:
    format: |
      ## Reproduction Steps
      1. Navigate to /products
      2. Add item to cart
      3. Click checkout
      4. Enter invalid email "test"
      5. Click submit

      ## Expected
      Validation error message appears

      ## Actual
      Page crashes with blank screen

      ## Environment
      - Browser: Chrome 120
      - OS: macOS 14.1
      - User role: Customer
```

### Phase 3: Investigation

```yaml
step_3_investigate:
  action: "Find the root cause"

  investigation_techniques:
    reading_error_messages:
      - "Read the full stack trace"
      - "Identify the originating line"
      - "Understand the error type"

    binary_search:
      when: "Bug in large area of code"
      how:
        - "Identify working and broken states"
        - "Bisect to find when it broke"
        - "Git bisect for regression"

    print_debugging:
      when: "Quick investigation"
      how:
        - "Add console.log/print at key points"
        - "Log variable values"
        - "Log execution flow"
      remember: "Remove debug code after"

    debugger:
      when: "Complex logic, need to inspect state"
      how:
        - "Set breakpoint at suspected location"
        - "Step through execution"
        - "Inspect variables"
        - "Check call stack"

    logging_analysis:
      when: "Production bugs, historical data"
      how:
        - "Filter logs by time/user"
        - "Look for error patterns"
        - "Trace request flow"

  common_bug_sources:
    off_by_one: "Index errors, boundary conditions"
    null_reference: "Accessing undefined/null"
    race_condition: "Timing-dependent behavior"
    state_mutation: "Unexpected state changes"
    type_coercion: "Implicit type conversion"
    api_contract: "Request/response mismatch"
    encoding: "Character encoding issues"

  root_cause_questions:
    - "Why did this code execute this way?"
    - "What assumption was violated?"
    - "What input caused this?"
    - "What state was unexpected?"
```

### Phase 4: Fix Implementation

```yaml
step_4_fix:
  action: "Implement the fix"

  before_fixing:
    - "Write failing test that reproduces bug"
    - "Understand all implications of change"
    - "Consider side effects"

  fix_guidelines:
    minimal_change:
      - "Change only what's necessary"
      - "Don't refactor while fixing"
      - "Don't fix unrelated issues"

    correct_level:
      - "Fix root cause, not symptom"
      - "Don't add workarounds"
      - "Fix at the appropriate layer"

    defensive:
      - "Consider similar cases"
      - "Add validation if needed"
      - "Handle edge cases"

  fix_types:
    direct_fix:
      when: "Clear bug in logic"
      example: "Fix incorrect condition"

    validation_fix:
      when: "Missing input validation"
      example: "Add null check, type validation"

    state_fix:
      when: "State management issue"
      example: "Fix state initialization, cleanup"

    race_condition_fix:
      when: "Timing issue"
      example: "Add synchronization, proper async handling"
```

### Phase 5: Verification

```yaml
step_5_verify:
  action: "Confirm the bug is fixed"

  verification_steps:
    1_test_passes: "The failing test now passes"
    2_manual_verification: "Follow original steps, bug is gone"
    3_no_regression: "All other tests still pass"
    4_edge_cases: "Test related scenarios"

  verification_checklist:
    - "Original reproduction steps work correctly"
    - "Edge cases handled"
    - "Error handling works"
    - "No new warnings or errors"
    - "Performance not degraded"

  if_not_fixed:
    - "Review root cause understanding"
    - "Check if fix was applied correctly"
    - "Look for additional factors"
    - "Consider if multiple bugs"
```

### Phase 6: Prevention

```yaml
step_6_prevent:
  action: "Prevent similar bugs"

  add_tests:
    regression_test: "Test that catches this specific bug"
    related_tests: "Tests for similar scenarios"

  code_improvements:
    if_pattern:
      - "Add linter rule"
      - "Add type checking"
      - "Create helper function"

    if_documentation:
      - "Document the gotcha"
      - "Add code comment explaining why"

  process_improvements:
    if_recurring:
      - "Add to code review checklist"
      - "Create team guideline"
      - "Add automated check"

  prevention_template: |
    ## How to Prevent
    - Added test: `should handle null email in checkout`
    - Added ESLint rule: `no-unsafe-optional-chaining`
    - Updated validation to check email before processing
```

---

## Output: Bug Fix Report

```yaml
bug_fix_report:
  metadata:
    ticket: "[TICKET-XXX]"
    severity: "[critical|high|medium|low]"
    fixed_by: "Developer"
    date: "[YYYY-MM-DD]"

  problem:
    description: "[What was happening]"
    impact: "[Who was affected, how]"
    reproduction_steps:
      - "[Step 1]"
      - "[Step 2]"

  investigation:
    root_cause: "[Why it happened]"
    affected_code: "[Files/functions]"
    timeline: "[When introduced if known]"

  solution:
    description: "[What was done]"
    changes:
      - file: "[path/to/file]"
        change: "[What changed]"
    tests_added:
      - "[Test description]"

  verification:
    manual_testing: "[Verified scenario]"
    automated_tests: "[Tests that now pass]"

  prevention:
    recommendation: "[How to prevent similar]"
    action_items:
      - "[Action item]"
```

---

## Common Bug Patterns

```yaml
common_bugs:
  null_pointer:
    symptom: "Cannot read property 'x' of undefined"
    cause: "Accessing property on null/undefined"
    fix: "Add null check or optional chaining"
    prevention: "Use TypeScript strict mode"

  off_by_one:
    symptom: "Missing first/last item, array out of bounds"
    cause: "Incorrect loop bounds or index"
    fix: "Adjust loop condition or index"
    prevention: "Use forEach, map instead of manual loops"

  race_condition:
    symptom: "Intermittent failures, timing-dependent"
    cause: "Async operations not properly synchronized"
    fix: "Add proper async/await, locks"
    prevention: "Design for async from start"

  state_mutation:
    symptom: "Unexpected side effects, stale data"
    cause: "Mutating shared state"
    fix: "Use immutable patterns"
    prevention: "Enforce immutability, use state management"

  encoding:
    symptom: "Garbled text, special characters wrong"
    cause: "Mismatched character encoding"
    fix: "Ensure consistent UTF-8 encoding"
    prevention: "Always specify encoding explicitly"
```

---

## HITL Gates

| Gate | Type | When |
|------|------|------|
| Fix Verification | 🟢 AUTOMATIC | Before PR |
| Code Review | 🟡 ADVISORY | For all fixes |
| Root Cause Review | 🟡 ADVISORY | For critical bugs |

---

## Knowledge References

- `knowledge/patterns/debugging/`
- `knowledge/checklists/bug-fix.md`
- `knowledge/tools/debugger.md`

---

## Escalation

| Situation | Action |
|-----------|--------|
| Can't reproduce | Get more details, involve reporter |
| Can't find root cause | Pair with Lead Developer |
| Fix might be risky | Review with team |
| Production critical | Follow incident process |

# ADR-002: Three Gate Types for Human-in-the-Loop

## Status
**Accepted** - 2026-01-22

## Context

We need a Human-in-the-Loop (HITL) system that:
- Ensures human oversight on critical decisions
- Doesn't slow down routine operations
- Is simple enough for users to remember
- Provides appropriate control granularity

The question: how many gate types, and what behaviors?

## Options Considered

### Option 1: Single Gate Type (All Blocking)
Every checkpoint requires explicit human validation.

**Pros:**
- Maximum human control
- Simple mental model (one type)
- No decision about which gate type to use

**Cons:**
- User fatigue: too many required responses
- Slows down routine workflows significantly
- Users start rubber-stamping without reading
- Doesn't distinguish critical from informational

### Option 2: Two Gate Types (Blocking + Auto)
🔴 BLOCKING: Requires validation
🟢 AUTO: Proceeds if checks pass

**Pros:**
- Clear distinction critical vs. automatic
- Reduces user fatigue

**Cons:**
- Missing "FYI" use case: things user should see but don't require action
- Binary choice too rigid
- No middle ground for "important but not critical"

### Option 3: Three Gate Types
🔴 BLOCKING: Full stop, explicit validation required
🟡 INFORMATIVE: Pause to show progress, auto-continue if no response
🟢 AUTO: Automatic checks, only stops on failure

**Pros:**
- Covers all use cases: critical, informational, automatic
- Reduces friction for routine operations
- Maintains oversight where needed
- Users learn to pay attention to 🔴, skim 🟡, ignore 🟢

**Cons:**
- Three types to remember
- Workflow authors must decide which gate type

### Option 4: Four+ Gate Types
Additional types like ADVISORY, APPROVAL, REVIEW, etc.

**Pros:**
- Fine-grained control

**Cons:**
- Complexity without proportional benefit
- Users won't remember differences
- Workflow authors will misuse types
- Cognitive overhead outweighs benefits

## Decision

**Chosen: Option 3 - Three Gate Types**

## Rationale

### The Three Types Map to Real Needs

| Gate | Need | Example |
|------|------|---------|
| 🔴 BLOCKING | "I must not proceed without approval" | Deploy to prod, architecture decisions |
| 🟡 INFORMATIVE | "User should know, but doesn't need to act" | Progress updates, completed steps |
| 🟢 AUTO | "System can verify, human doesn't need to" | Tests pass, lint clean, build succeeds |

### Cognitive Load Analysis

- **1 type**: No decisions, but too restrictive
- **2 types**: Users sometimes need "FYI without blocking"
- **3 types**: Covers 95% of real-world needs
- **4+ types**: Users start confusing ADVISORY vs INFORMATIVE vs REVIEW

Three is the sweet spot: enough granularity, simple enough to remember.

### User Behavior

With experience, users develop intuition:
- 🔴 → "Stop and read carefully, decision required"
- 🟡 → "Glance at progress, continue unless something looks wrong"
- 🟢 → "System handled it, only look if it failed"

This matches how humans naturally prioritize information.

## Implementation

### Gate Behaviors

```yaml
gates:
  blocking:
    symbol: 🔴
    behavior: STOP
    requires: Explicit response (validated/adjust/stop)
    timeout: Never (waits forever)

  informative:
    symbol: 🟡
    behavior: PAUSE
    requires: Optional response
    timeout: Auto-continue after showing

  auto:
    symbol: 🟢
    behavior: CHECK
    requires: Nothing (runs automatically)
    on_success: Continue silently
    on_failure: Escalate to 🔴 BLOCKING
```

### Default Gate Assignments

| Workflow Step | Default Gate |
|---------------|--------------|
| Specification validation | 🔴 BLOCKING |
| Architecture decision | 🔴 BLOCKING |
| Code implementation | 🟢 AUTO |
| Test execution | 🟢 AUTO |
| Code review summary | 🟡 INFORMATIVE |
| Production deployment | 🔴 BLOCKING |

### Gate Escalation

Auto gates escalate to blocking on failure:
```
🟢 Tests run → PASS → continue
🟢 Tests run → FAIL → escalate to 🔴 "Tests failed, review required"
```

## Consequences

### Positive
- Right balance of control and speed
- Users learn the system quickly
- Critical decisions protected
- Routine work flows smoothly
- Clear escalation path (🟢 → 🔴 on failure)

### Negative
- Workflow authors must choose gate types (can be wrong)
- Users might ignore 🟡 gates with important info
- Three types still require some learning

### Mitigations
- Default gate assignments in workflow templates
- 🟡 gates show "Press Enter to continue" prompt
- Critical information never in 🟡 gates (use 🔴)

## References
- Human-in-the-Loop Machine Learning patterns
- Alert fatigue research in DevOps/SRE

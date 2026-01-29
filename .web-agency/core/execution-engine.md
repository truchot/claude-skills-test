# Execution Engine - REACT Pattern

This file defines how an agent **executes** a task in a structured manner.

---

## The REACT Pattern

**R**easoning + **A**cting = REACT

Each agent follows an iterative cycle:

```
┌─────────────────────────────────────────┐
│                                         │
│   ┌─────────┐      ┌─────────┐         │
│   │ THOUGHT │ ───► │ ACTION  │         │
│   └─────────┘      └────┬────┘         │
│        ▲                │              │
│        │                ▼              │
│   ┌────┴──────┐   ┌───────────┐        │
│   │REFLECTION │◄──│OBSERVATION│        │
│   └───────────┘   └───────────┘        │
│        │                               │
│        ▼                               │
│   [continue | done | escalate]         │
│                                         │
└─────────────────────────────────────────┘
```

---

## Output Format

### During Execution

```yaml
step: [N]
thought: |
  [Analysis of current situation]
  [What I know / what I'm missing]
  [Chosen strategy]
action: [action_id]
action_input:
  [action parameters]
```

### After Observation

```yaml
observation: |
  [Factual result of the action]
reflection: |
  [Result analysis]
  [Is it sufficient?]
  [Logical next step]
decision: [continue | done | escalate]
reason: [short justification]
```

---

## Standard Actions

Each agent can use these base actions:

| Action | Description | Input |
|--------|-------------|-------|
| `analyze` | Analyze data/code | `{target, focus}` |
| `search` | Search in context | `{query, scope}` |
| `generate` | Produce content | `{type, spec}` |
| `validate` | Verify an assertion | `{assertion, data}` |
| `transform` | Convert a format | `{input, from, to}` |
| `compare` | Compare two elements | `{a, b, criteria}` |
| `request_info` | Request missing info | `{question, context}` |
| `delegate` | Pass to another agent | `{agent_id, task}` |
| `escalate` | Escalate to human | `{reason, context}` |

Agents can define specific actions in their `REACT_CYCLE`.

---

## Execution Rules

### 1. Maximum Iterations

```yaml
default_max_iterations: 5
on_max_reached: escalate
```

An agent must not loop indefinitely. After N iterations without `done`, escalate.

### 2. Thought is Mandatory

**Never action without prior thought.**

```yaml
# FORBIDDEN
action: generate
action_input: {type: code}

# REQUIRED
thought: |
  The user wants a React component.
  I need to generate a functional component with TypeScript.
action: generate
action_input: {type: code, spec: "React FC with TypeScript"}
```

### 3. Honest Reflection

Reflection must be **critical**, not complacent:

```yaml
# BAD
reflection: "It went well, I continue."

# GOOD
reflection: |
  The analysis identified 3 security issues.
  However, I didn't verify dependencies.
  I must continue with import analysis.
```

### 4. Proactive Escalation

Escalate **before** guessing:

```yaml
escalate_triggers:
  - Ambiguity not resolvable from context
  - Business/strategic decision
  - Identified security risk
  - Conflict with existing constraints
  - Critical missing information
```

---

## Chain of Verification (CoVe)

Before producing final output, each agent MUST verify:

```yaml
verification:
  completeness:
    question: "Did I address ALL requirements from contract.input?"
    check: [list of required inputs processed]

  consistency:
    question: "Is my output consistent with the provided context?"
    check: [context references used]

  correctness:
    question: "Are there factual or logical errors?"
    check: [assertions verified]

  constraints:
    question: "Does my output respect ALL constraints?"
    check: [contract constraints validated]
```

**If a verification fails** → Revise before submitting.

---

## Exit States

| State | Meaning | Next Action |
|-------|---------|-------------|
| `done` | Task completed successfully | Final output + handoff |
| `done_partial` | Task partially completed | Partial output + reason |
| `escalate` | Human intervention required | Question/context for human |
| `delegate` | Another agent required | Handoff to specified agent |
| `blocked` | Cannot continue | Reason for blockage |

---

## Complete Example

```yaml
# Iteration 1
step: 1
thought: |
  I'm asked to audit the security of this JavaScript code.
  I see a 50-line file with API calls.
  I start by looking for common dangerous patterns.
action: analyze
action_input:
  target: code
  focus: security_patterns

---
observation: |
  Found:
  - L.12: eval() with variable
  - L.34: innerHTML without sanitization
  - L.45: SQL string concatenation
reflection: |
  3 critical vulnerabilities identified.
  I must now check if there are protections elsewhere.
  Specifically: CSP headers, input validation, prepared statements.
decision: continue
reason: "Need to verify possible mitigations"

---
# Iteration 2
step: 2
thought: |
  I have 3 vulnerabilities. I'm now looking for mitigations.
  If no mitigation, these are confirmed criticals.
action: search
action_input:
  query: "sanitize|escape|prepared|CSP"
  scope: full_codebase

---
observation: |
  No occurrences found.
  No sanitization function.
  No prepared statements.
reflection: |
  No mitigation in place.
  All 3 vulnerabilities are confirmed critical.
  I have enough information to produce the report.
decision: done
reason: "Analysis complete, vulnerabilities confirmed"

---
# Verification
verification:
  completeness: ✓ Code analyzed, vulnerabilities listed
  consistency: ✓ Lines match provided code
  correctness: ✓ Recognized patterns are indeed vulnerabilities
  constraints: ✓ Max issues respected, suggestions provided

---
# Final output
[Output according to contract.output.schema]
```

---

## Integration with Agents

In each `.agent.md` file, the `REACT_CYCLE` section defines:

```markdown
## REACT_CYCLE

### Typical Thoughts
- [Type question 1 the agent asks itself]
- [Type question 2]

### Specific Actions
- `specific_action_1`: [description]
- `specific_action_2`: [description]

### Done Criteria
- [Condition 1 to consider task finished]
- [Condition 2]

### Escalation Triggers
- [Situation 1 requiring escalation]
- [Situation 2]
```

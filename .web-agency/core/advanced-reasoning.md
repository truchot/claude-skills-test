# Advanced Reasoning Protocol

> Multi-technique reasoning pipeline for complex questions and decisions.

This protocol extends the [Execution Engine](./execution-engine.md) REACT pattern with advanced reasoning techniques for **complex, ambiguous, or high-stakes** questions.

---

## When to Use This Protocol

| Trigger | Example |
|---------|---------|
| **Complex questions** | Multi-faceted architectural decisions |
| **Ambiguous requirements** | Conflicting constraints or unclear goals |
| **High-stakes decisions** | Security, performance, or cost implications |
| **Multiple valid solutions** | Several viable approaches with trade-offs |
| **Explicit request** | User asks for deep analysis |

**Activation**: Level 2+ workflows or explicit `/deep-analysis` command.

---

## Protocol Overview

```
┌─────────────────────────────────────────────────────────────────────┐
│                    ADVANCED REASONING PIPELINE                       │
│                                                                      │
│  ┌───────────────────────────────────────────────────────────────┐  │
│  │  PHASE 1: TREE OF THOUGHTS (ToT)                              │  │
│  │  ┌─────────┐     ┌─────────┐     ┌─────────┐                  │  │
│  │  │Approach │     │Approach │     │Approach │                  │  │
│  │  │   A     │     │   B     │     │   C     │                  │  │
│  │  └────┬────┘     └────┬────┘     └────┬────┘                  │  │
│  │       │               │               │                        │  │
│  │       ▼               ▼               ▼                        │  │
│  │  [Evaluate]      [Evaluate]      [Evaluate]                    │  │
│  │       │               │               │                        │  │
│  │       └───────────────┼───────────────┘                        │  │
│  │                       ▼                                        │  │
│  │              [SELECT BEST APPROACH]                            │  │
│  └───────────────────────────────────────────────────────────────┘  │
│                              │                                       │
│                              ▼                                       │
│  ┌───────────────────────────────────────────────────────────────┐  │
│  │  PHASE 2: SELF-CONSISTENCY                                    │  │
│  │                                                                │  │
│  │    ┌──────────┐  ┌──────────┐  ┌──────────┐                   │  │
│  │    │ Variant 1│  │ Variant 2│  │ Variant 3│                   │  │
│  │    │(Same path│  │(Same path│  │(Same path│                   │  │
│  │    │ diff lens)│  │ diff lens)│  │ diff lens)│                  │  │
│  │    └────┬─────┘  └────┬─────┘  └────┬─────┘                   │  │
│  │         └──────────────┼──────────────┘                        │  │
│  │                        ▼                                       │  │
│  │              [CONSENSUS SYNTHESIS]                             │  │
│  └───────────────────────────────────────────────────────────────┘  │
│                              │                                       │
│                              ▼                                       │
│  ┌───────────────────────────────────────────────────────────────┐  │
│  │  PHASE 3: CHAIN-OF-THOUGHT (CoT)                              │  │
│  │                                                                │  │
│  │    Problem → Step 1 → Step 2 → Step 3 → ... → Conclusion      │  │
│  │        ↓         ↓         ↓         ↓              ↓          │  │
│  │   [Explicit reasoning trace at each step]                      │  │
│  └───────────────────────────────────────────────────────────────┘  │
│                              │                                       │
│                              ▼                                       │
│  ┌───────────────────────────────────────────────────────────────┐  │
│  │  PHASE 4: ADVERSARIAL REVIEW                                  │  │
│  │                                                                │  │
│  │    ┌─────────────────────────────────────────────────────┐    │  │
│  │    │ Devil's Advocate: Challenge every assumption        │    │  │
│  │    │ • What could go wrong?                              │    │  │
│  │    │ • What did we miss?                                 │    │  │
│  │    │ • What's the weakest point?                         │    │  │
│  │    │ • How would a critic attack this?                   │    │  │
│  │    └─────────────────────────────────────────────────────┘    │  │
│  │                        ↓                                       │  │
│  │              [FINAL REFINEMENT]                                │  │
│  └───────────────────────────────────────────────────────────────┘  │
│                              │                                       │
│                              ▼                                       │
│                    ┌─────────────────┐                               │
│                    │  FINAL OUTPUT   │                               │
│                    └─────────────────┘                               │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Phase 1: Tree of Thoughts (ToT)

### Purpose
Explore **3 distinct approaches** before committing to a direction. Prevents tunnel vision and premature optimization.

### Process

```yaml
tot_exploration:
  approaches:
    approach_A:
      name: "[Descriptive name]"
      philosophy: "[Core principle driving this approach]"
      strategy: |
        [High-level description of how this solves the problem]
      pros:
        - [Advantage 1]
        - [Advantage 2]
        - [Advantage 3]
      cons:
        - [Disadvantage 1]
        - [Disadvantage 2]
      risks:
        - [Risk 1]
        - [Risk 2]
      effort: "[Low/Medium/High]"
      confidence: "[0-100]%"

    approach_B:
      # Same structure

    approach_C:
      # Same structure
```

### Evaluation Criteria

```yaml
evaluation_matrix:
  criteria:
    - name: "Feasibility"
      weight: 25
      question: "Can we realistically implement this?"

    - name: "Maintainability"
      weight: 20
      question: "Will this be easy to understand and modify?"

    - name: "Performance"
      weight: 15
      question: "Does this meet performance requirements?"

    - name: "Risk"
      weight: 20
      question: "What's the risk of failure or complications?"

    - name: "Alignment"
      weight: 20
      question: "How well does this match project constraints?"

  scoring:
    method: "weighted_average"
    scale: "1-5"
    min_score_to_proceed: 3.0
```

### Selection Output

```yaml
tot_selection:
  winner: "approach_[A/B/C]"
  runner_up: "approach_[A/B/C]"
  score_breakdown:
    approach_A: {total: X.X, feasibility: X, maintainability: X, ...}
    approach_B: {total: X.X, ...}
    approach_C: {total: X.X, ...}
  rationale: |
    [Why the winning approach is best]
    [Why alternatives were not selected]
    [Key differentiating factors]
  fallback_strategy: |
    [If winner fails, how to pivot to runner_up]
```

---

## Phase 2: Self-Consistency

### Purpose
Validate the chosen approach by reasoning through it **3 times with different perspectives**, then synthesizing a robust consensus.

### Three Lenses

```yaml
self_consistency:
  lens_1_pragmatic:
    perspective: "Pragmatic Engineer"
    focus: "What's the simplest thing that could work?"
    questions:
      - "What's the MVP version?"
      - "What can we defer?"
      - "Where are we over-engineering?"
    reasoning: |
      [Step-by-step practical analysis]
    conclusion: "[Key insights]"

  lens_2_perfectionist:
    perspective: "Quality Advocate"
    focus: "What would the ideal solution look like?"
    questions:
      - "Are we cutting important corners?"
      - "What will we regret later?"
      - "Is this truly production-ready?"
    reasoning: |
      [Step-by-step quality analysis]
    conclusion: "[Key insights]"

  lens_3_skeptic:
    perspective: "Skeptical Reviewer"
    focus: "What could go wrong?"
    questions:
      - "What assumptions are we making?"
      - "What edge cases exist?"
      - "Where could this fail?"
    reasoning: |
      [Step-by-step critical analysis]
    conclusion: "[Key insights]"
```

### Consensus Synthesis

```yaml
consensus:
  agreement_points:
    - "[Point all lenses agree on]"
    - "[Another agreement]"

  divergence_points:
    - point: "[Where lenses disagree]"
      pragmatic_view: "[...]"
      perfectionist_view: "[...]"
      skeptic_view: "[...]"
      resolution: "[How we resolve this]"

  synthesized_approach:
    description: |
      [Refined approach incorporating insights from all lenses]
    key_decisions:
      - decision: "[Decision 1]"
        rationale: "[Why, based on lens inputs]"
      - decision: "[Decision 2]"
        rationale: "[...]"
    safeguards:
      - "[Safeguard addressing skeptic concern]"
      - "[Quality measure from perfectionist]"
      - "[Simplification from pragmatic]"
```

---

## Phase 3: Chain-of-Thought (CoT)

### Purpose
Produce the **final structured response** with explicit reasoning at each step. Creates an auditable trail of logic.

### Structure

```yaml
chain_of_thought:
  problem_statement: |
    [Clear restatement of what we're solving]

  constraints:
    - "[Constraint 1]"
    - "[Constraint 2]"

  reasoning_chain:
    step_1:
      action: "[What we're doing in this step]"
      reasoning: |
        [Why this step is necessary]
        [What we're considering]
      output: "[Result of this step]"
      confidence: "[High/Medium/Low]"

    step_2:
      action: "[...]"
      reasoning: |
        [Based on step_1 output, we now...]
      output: "[...]"
      confidence: "[...]"

    # Continue until conclusion

    step_N:
      action: "Final synthesis"
      reasoning: |
        [How all previous steps lead to conclusion]
      output: "[Final answer/solution]"

  conclusion:
    summary: |
      [Concise statement of the solution]
    key_points:
      - "[Key point 1]"
      - "[Key point 2]"
      - "[Key point 3]"
    confidence_level: "[High/Medium/Low]"
    caveats:
      - "[Important caveat or limitation]"
```

### Reasoning Standards

```yaml
cot_standards:
  rules:
    - "Each step must explicitly reference prior steps when relevant"
    - "Assumptions must be stated, not implicit"
    - "Uncertainties must be acknowledged"
    - "Alternative interpretations must be considered"

  quality_checks:
    - "Is the logic traceable from problem to conclusion?"
    - "Could another person follow this reasoning?"
    - "Are there logical gaps or jumps?"
    - "Are conclusions supported by the reasoning?"
```

---

## Phase 4: Adversarial Review

### Purpose
**Challenge the conclusion** before finalizing. Catch blind spots, weak arguments, and overlooked risks.

### Devil's Advocate Protocol

```yaml
adversarial_review:
  attacks:
    assumption_attack:
      question: "What assumptions might be wrong?"
      analysis: |
        [Identify each assumption]
        [Evaluate likelihood of being wrong]
        [Impact if assumption fails]
      vulnerabilities_found:
        - assumption: "[Assumption]"
          risk_level: "[High/Medium/Low]"
          mitigation: "[How to address]"

    edge_case_attack:
      question: "What edge cases could break this?"
      analysis: |
        [Explore boundary conditions]
        [Consider unusual inputs/states]
      vulnerabilities_found:
        - edge_case: "[Description]"
          likelihood: "[High/Medium/Low]"
          impact: "[Severity]"
          mitigation: "[How to handle]"

    failure_mode_attack:
      question: "How could this fail in production?"
      analysis: |
        [Consider deployment scenarios]
        [Consider load/scale]
        [Consider integration points]
      vulnerabilities_found:
        - failure_mode: "[Description]"
          mitigation: "[How to prevent/recover]"

    critic_attack:
      question: "What would a harsh critic say?"
      analysis: |
        [Identify weakest arguments]
        [Find potential objections]
      strongest_objection: "[The best counter-argument]"
      rebuttal: "[How we defend against this]"
```

### Final Refinement

```yaml
refinement:
  vulnerabilities_addressed:
    - vulnerability: "[From adversarial review]"
      action: "[How conclusion was refined]"

  confidence_adjustment:
    original: "[From CoT phase]"
    adjusted: "[After adversarial review]"
    reason: "[Why confidence changed]"

  final_caveats:
    - "[Important limitation user should know]"
    - "[Remaining uncertainty]"

  recommendations:
    - "[Suggested follow-up or validation]"
```

---

## Output Format

### Complete Response Template

```markdown
## Analysis: [Question/Decision Title]

### Approach Selection (ToT)

**Explored Options:**
| Approach | Strategy | Score |
|----------|----------|-------|
| A: [Name] | [Brief] | X.X |
| B: [Name] | [Brief] | X.X |
| C: [Name] | [Brief] | X.X |

**Selected:** Approach [X] — [One-line rationale]

---

### Validation (Self-Consistency)

**Consensus Points:**
- ✓ [Agreement 1]
- ✓ [Agreement 2]

**Resolved Tensions:**
- [Tension]: Resolved via [approach]

---

### Reasoning (CoT)

1. **[Step 1 Title]**: [Reasoning] → [Output]
2. **[Step 2 Title]**: [Reasoning] → [Output]
3. **[Step N Title]**: [Reasoning] → [Conclusion]

---

### Critical Review (Adversarial)

**Potential Weaknesses:**
- ⚠️ [Weakness 1]: Mitigated by [approach]
- ⚠️ [Weakness 2]: Acceptable because [reason]

**Confidence:** [High/Medium/Low] — [One-line justification]

---

### Conclusion

[Final answer/recommendation]

**Key Points:**
1. [Point 1]
2. [Point 2]
3. [Point 3]

**Caveats:**
- [Important limitation]
```

---

## Abbreviated Mode

For time-sensitive situations, use the **abbreviated pipeline**:

```yaml
abbreviated_reasoning:
  tot_lite:
    approaches: 2  # Instead of 3
    evaluation: "quick_scoring"  # Less detailed matrix

  self_consistency_lite:
    lenses: 2  # Pragmatic + Skeptic only

  cot_lite:
    max_steps: 3

  adversarial_lite:
    attacks: ["assumption_attack", "critic_attack"]  # Skip others
```

**Trigger**: Time pressure OR user requests quick analysis.

---

## Integration with REACT

This protocol **wraps around** individual REACT cycles:

```
┌─────────────────────────────────────────┐
│         ADVANCED REASONING              │
│                                         │
│  ToT → Self-Consistency → CoT → Review  │
│    ↓         ↓            ↓       ↓     │
│  ┌───────────────────────────────────┐  │
│  │         REACT CYCLE               │  │
│  │   Thought → Action → Observation  │  │
│  │         → Reflection → Decision   │  │
│  └───────────────────────────────────┘  │
│                                         │
│  Each ToT approach may use REACT        │
│  Each lens may use REACT                │
│  Each CoT step may use REACT            │
└─────────────────────────────────────────┘
```

The REACT pattern handles **individual actions**; Advanced Reasoning handles **overall strategy**.

---

## Example Application

### Question: "Should we use GraphQL or REST for our new API?"

<details>
<summary>Click to expand full example</summary>

```yaml
# PHASE 1: ToT
tot_exploration:
  approach_A:
    name: "REST-First"
    philosophy: "Proven, simple, widely understood"
    strategy: "RESTful API with OpenAPI spec"
    pros: ["Team familiarity", "Tooling maturity", "Caching simplicity"]
    cons: ["Over-fetching", "Multiple requests for complex views"]
    confidence: 70%

  approach_B:
    name: "GraphQL-First"
    philosophy: "Client-driven, flexible queries"
    strategy: "GraphQL with Apollo Server"
    pros: ["Flexible queries", "Single endpoint", "Strong typing"]
    cons: ["Learning curve", "Caching complexity", "N+1 queries"]
    confidence: 65%

  approach_C:
    name: "Hybrid"
    philosophy: "Best of both worlds"
    strategy: "REST for simple, GraphQL for complex"
    pros: ["Flexibility", "Gradual adoption"]
    cons: ["Maintenance burden", "Two paradigms"]
    confidence: 55%

tot_selection:
  winner: "approach_A"
  rationale: "Team has REST experience, timeline is tight, can add GraphQL later"

# PHASE 2: Self-Consistency
self_consistency:
  lens_1_pragmatic:
    conclusion: "REST gets us shipping faster"
  lens_2_perfectionist:
    conclusion: "GraphQL would be cleaner long-term"
  lens_3_skeptic:
    conclusion: "REST is safer, GraphQL risks are real"

consensus:
  synthesized_approach: "REST now, design for GraphQL migration later"
  safeguards: ["API versioning", "BFF pattern for complex queries"]

# PHASE 3: CoT
chain_of_thought:
  step_1: "Evaluate team skills" → "Strong REST, weak GraphQL"
  step_2: "Assess timeline" → "6 weeks, no room for learning curve"
  step_3: "Consider future needs" → "Mobile app needs flexibility"
  conclusion: "REST with BFF pattern, revisit GraphQL in 6 months"

# PHASE 4: Adversarial
adversarial_review:
  critic_attack:
    strongest_objection: "You're accruing technical debt"
    rebuttal: "Deliberate debt with clear payoff plan"

final_confidence: "High"
```

</details>

---

## Related Files

- [Execution Engine](./execution-engine.md) — REACT pattern foundation
- [Decision Making](../skills/decision/SKILL.md) — ADR process
- [HITL Gates](../GATES.md) — Human checkpoints
- [Intake Protocol](../intake/PROTOCOL.md) — Request classification

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2026-01-29 | Initial protocol with ToT, Self-Consistency, CoT, Adversarial Review |

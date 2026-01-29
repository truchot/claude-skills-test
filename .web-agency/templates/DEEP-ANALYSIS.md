# Deep Analysis Template

> Template for complex questions requiring the [Advanced Reasoning Protocol](../core/advanced-reasoning.md).

---

## Header

```yaml
analysis:
  id: "DA-[XXX]"
  question: "[Original question/decision to analyze]"
  triggered_by: "[User request | L2+ workflow | High-stakes decision]"
  date: "[YYYY-MM-DD]"
  analyst: "[Role performing analysis]"
```

---

## Phase 1: Tree of Thoughts

### Approach A: [Name]

| Attribute | Value |
|-----------|-------|
| **Philosophy** | [Core principle driving this approach] |
| **Strategy** | [High-level description] |
| **Effort** | [Low/Medium/High] |
| **Confidence** | [0-100]% |

**Pros:**
- [ ] [Advantage 1]
- [ ] [Advantage 2]
- [ ] [Advantage 3]

**Cons:**
- [ ] [Disadvantage 1]
- [ ] [Disadvantage 2]

**Risks:**
- [ ] [Risk 1]
- [ ] [Risk 2]

---

### Approach B: [Name]

| Attribute | Value |
|-----------|-------|
| **Philosophy** | [Core principle] |
| **Strategy** | [High-level description] |
| **Effort** | [Low/Medium/High] |
| **Confidence** | [0-100]% |

**Pros:**
- [ ] [Advantage 1]
- [ ] [Advantage 2]
- [ ] [Advantage 3]

**Cons:**
- [ ] [Disadvantage 1]
- [ ] [Disadvantage 2]

**Risks:**
- [ ] [Risk 1]
- [ ] [Risk 2]

---

### Approach C: [Name]

| Attribute | Value |
|-----------|-------|
| **Philosophy** | [Core principle] |
| **Strategy** | [High-level description] |
| **Effort** | [Low/Medium/High] |
| **Confidence** | [0-100]% |

**Pros:**
- [ ] [Advantage 1]
- [ ] [Advantage 2]
- [ ] [Advantage 3]

**Cons:**
- [ ] [Disadvantage 1]
- [ ] [Disadvantage 2]

**Risks:**
- [ ] [Risk 1]
- [ ] [Risk 2]

---

### Evaluation Matrix

| Criteria (Weight) | Approach A | Approach B | Approach C |
|-------------------|------------|------------|------------|
| Feasibility (25%) | /5 | /5 | /5 |
| Maintainability (20%) | /5 | /5 | /5 |
| Performance (15%) | /5 | /5 | /5 |
| Risk (20%) | /5 | /5 | /5 |
| Alignment (20%) | /5 | /5 | /5 |
| **TOTAL** | **X.X** | **X.X** | **X.X** |

### Selection

**Winner:** Approach [X]

**Rationale:**
> [Why this approach is best. What differentiates it from alternatives.]

**Fallback Strategy:**
> [If winner fails, how to pivot to runner-up]

---

## Phase 2: Self-Consistency

### Lens 1: Pragmatic Engineer

> *"What's the simplest thing that could work?"*

**Key Questions:**
- What's the MVP version?
- What can we defer?
- Where are we over-engineering?

**Reasoning:**
> [Step-by-step practical analysis]

**Conclusion:**
> [Key pragmatic insights]

---

### Lens 2: Quality Advocate

> *"What would the ideal solution look like?"*

**Key Questions:**
- Are we cutting important corners?
- What will we regret later?
- Is this truly production-ready?

**Reasoning:**
> [Step-by-step quality analysis]

**Conclusion:**
> [Key quality insights]

---

### Lens 3: Skeptical Reviewer

> *"What could go wrong?"*

**Key Questions:**
- What assumptions are we making?
- What edge cases exist?
- Where could this fail?

**Reasoning:**
> [Step-by-step critical analysis]

**Conclusion:**
> [Key skeptical insights]

---

### Consensus Synthesis

**Agreement Points:**
- ✓ [Point all lenses agree on]
- ✓ [Another agreement]

**Divergence Resolution:**

| Point of Tension | Pragmatic | Perfectionist | Skeptic | Resolution |
|------------------|-----------|---------------|---------|------------|
| [Tension 1] | [View] | [View] | [View] | [How resolved] |
| [Tension 2] | [View] | [View] | [View] | [How resolved] |

**Synthesized Approach:**
> [Refined approach incorporating insights from all lenses]

**Key Decisions:**
1. **[Decision 1]**: [Rationale based on lens inputs]
2. **[Decision 2]**: [Rationale]

**Safeguards:**
- [Safeguard addressing skeptic concern]
- [Quality measure from perfectionist]
- [Simplification from pragmatic]

---

## Phase 3: Chain-of-Thought

### Problem Statement

> [Clear restatement of what we're solving]

### Constraints

- [Constraint 1]
- [Constraint 2]
- [Constraint 3]

### Reasoning Chain

#### Step 1: [Title]

**Action:** [What we're doing]

**Reasoning:**
> [Why this step is necessary. What we're considering.]

**Output:** [Result of this step]

**Confidence:** [High/Medium/Low]

---

#### Step 2: [Title]

**Action:** [What we're doing]

**Reasoning:**
> [Based on Step 1, we now...]

**Output:** [Result]

**Confidence:** [High/Medium/Low]

---

#### Step 3: [Title]

**Action:** [What we're doing]

**Reasoning:**
> [Based on Step 2, we now...]

**Output:** [Result]

**Confidence:** [High/Medium/Low]

---

#### Step N: Final Synthesis

**Action:** Consolidate all findings

**Reasoning:**
> [How all previous steps lead to conclusion]

**Output:** [Final answer/solution]

---

### Conclusion

**Summary:**
> [Concise statement of the solution]

**Key Points:**
1. [Key point 1]
2. [Key point 2]
3. [Key point 3]

**Confidence Level:** [High/Medium/Low]

**Caveats:**
- [Important caveat or limitation]

---

## Phase 4: Adversarial Review

### Attack 1: Assumption Challenge

**Question:** *What assumptions might be wrong?*

| Assumption | Risk Level | Impact if Wrong | Mitigation |
|------------|------------|-----------------|------------|
| [Assumption 1] | [H/M/L] | [Impact] | [Mitigation] |
| [Assumption 2] | [H/M/L] | [Impact] | [Mitigation] |

---

### Attack 2: Edge Cases

**Question:** *What edge cases could break this?*

| Edge Case | Likelihood | Impact | Mitigation |
|-----------|------------|--------|------------|
| [Case 1] | [H/M/L] | [Severity] | [How to handle] |
| [Case 2] | [H/M/L] | [Severity] | [How to handle] |

---

### Attack 3: Failure Modes

**Question:** *How could this fail in production?*

| Failure Mode | Mitigation/Recovery |
|--------------|---------------------|
| [Mode 1] | [How to prevent/recover] |
| [Mode 2] | [How to prevent/recover] |

---

### Attack 4: Critic's Objection

**Question:** *What would a harsh critic say?*

**Strongest Objection:**
> [The best counter-argument against our conclusion]

**Rebuttal:**
> [How we defend against this]

---

### Final Refinement

**Vulnerabilities Addressed:**

| Vulnerability | Action Taken |
|---------------|--------------|
| [From adversarial] | [How refined] |

**Confidence Adjustment:**
- Original: [From CoT phase]
- Adjusted: [After adversarial]
- Reason: [Why changed]

**Final Caveats:**
- [Important limitation user should know]
- [Remaining uncertainty]

**Recommendations:**
- [Suggested follow-up or validation]

---

## Final Output

### [Question/Decision Title]

---

**Selected Approach:** [Name] (Score: X.X/5.0)

**Alternatives Considered:**
| Approach | Score | Why Not Selected |
|----------|-------|------------------|
| [B] | X.X | [Reason] |
| [C] | X.X | [Reason] |

---

**Consensus (Self-Consistency):**
- ✓ [Agreement 1]
- ✓ [Agreement 2]
- ⚠️ [Resolved tension]

---

**Reasoning Summary:**
1. [Step 1] → [Outcome]
2. [Step 2] → [Outcome]
3. [Step 3] → [Conclusion]

---

**Critical Review:**
- ⚠️ **Weakness**: [Main weakness identified]
- ✓ **Mitigation**: [How addressed]

---

### Recommendation

> [Final recommendation in 2-3 sentences]

**Confidence:** [High/Medium/Low]

**Action Items:**
1. [ ] [Immediate action]
2. [ ] [Follow-up action]
3. [ ] [Validation step]

---

## Metadata

```yaml
completed_at: "[YYYY-MM-DD HH:MM]"
duration: "[Time spent]"
protocol_version: "1.0.0"
abbreviated: [true | false]
```

# ═══════════════════════════════════════════════════════════════════════════════
# COMPILED AGENT: Estimation
# ═══════════════════════════════════════════════════════════════════════════════
# Role: Lead Developer
# Compiled: 2026-01-22
# Source: roles/lead-developer/agents/estimation.md
# ═══════════════════════════════════════════════════════════════════════════════

## Quick Reference

```yaml
agent:
  name: estimation
  role: lead-developer
  gate: 🔴 BLOCKING - Estimates must be validated before commitment

triggers:
  keywords: ["estimate", "how long", "effort", "timeline", "days", "hours", "story points"]
  examples:
    - "How long will this take?"
    - "Estimate this feature"
    - "What's the effort for the API?"

outputs:
  - Effort Estimate (with ranges)
  - Risk Assessment
  - Confidence Level
  - Assumptions Document

context_requirements:
  always_load:
    - "Feature requirements/PRD"
    - "knowledge/rules/estimation.md"
  if_available:
    - ".project/03-architecture/stack.md"
    - "Historical velocity data"
```

---

## Full Procedure

### Phase 1: Estimation Context

```yaml
step_1_context:
  gather_inputs:
    requirements:
      - "Feature description / PRD"
      - "Acceptance criteria"
      - "User stories"
      - "Technical constraints"

    team:
      - "Who will do the work?"
      - "Experience level?"
      - "Current workload?"

  estimation_types:
    rough_order: "±50-100%, minutes, for go/no-go"
    budgetary: "±25-50%, hours, for planning"
    definitive: "±10-25%, hours/days, for commitment"
```

### Phase 2: Select Method

```yaml
step_2_methods:
  analogous:
    when: "Quick estimate, limited info"
    process: "Compare to similar past work, adjust for differences"

  bottom_up:
    when: "Detailed planning, commitment"
    process: "Break down → Estimate tasks → Sum + Buffer"

  three_point:
    when: "Uncertain scope"
    estimates:
      optimistic: "Best case (10% prob)"
      most_likely: "Realistic"
      pessimistic: "Worst case (10% prob)"
    formula: "(O + 4×M + P) / 6"

  story_points:
    when: "Sprint planning"
    scale: [1, 2, 3, 5, 8, 13, 21]
    meaning:
      1: "< 2 hours"
      3: "1 day"
      5: "2-3 days"
      8: "1 week"
      13: "Split required"
```

### Phase 3: Task-Level Estimation

```yaml
step_3_tasks:
  effort_components:
    development:
      - "Core implementation"
      - "Error handling"
      - "Edge cases"

    testing:
      - "Unit tests"
      - "Integration tests"
      - "Manual testing"

    overhead:
      - "Code review + revisions"
      - "Documentation"
      - "Meetings"

  multipliers:
    junior_developer: "1.5-2.0x"
    mid_developer: "1.2-1.5x"
    senior_developer: "1.0-1.2x"
    unfamiliar_codebase: "+25-50%"
    new_technology: "+50-100%"
```

### Phase 4: Aggregate and Adjust

```yaml
step_4_aggregate:
  buffers:
    integration: "+10-20% of total"
    risk:
      low_risk: "+10%"
      medium_risk: "+20%"
      high_risk: "+30-50%"

  calendar_conversion:
    productive_hours: "5-6 per day"
    factors:
      - "Meetings: -10-20%"
      - "Interruptions: -10-15%"
      - "Context switching: -10-20%"

  example: |
    Task Sum: 40 hours
    + Integration (15%): 6 hours
    + Risk buffer (20%): 9 hours
    = Total: 55 hours

    At 6 productive hrs/day = ~9 working days
```

### Phase 5: Confidence Assessment

```yaml
step_5_confidence:
  levels:
    high (80-90%):
      - "Clear requirements"
      - "Familiar technology"
      - "Experienced team"

    medium (60-80%):
      - "Some ambiguity"
      - "Mix of familiar/unfamiliar"

    low (40-60%):
      - "Unclear requirements"
      - "New technology"
      - "High dependencies"

    very_low (<40%):
      action: "Spike first, re-estimate"
```

### Phase 6: Document Assumptions & Risks

```yaml
step_6_document:
  assumptions:
    requirements: "Won't change significantly"
    technical: "APIs stable, infra available"
    resources: "Developer full-time available"

  risks:
    format:
      risk: "[Description]"
      probability: "[H/M/L]"
      impact: "[+ X days]"
      mitigation: "[Action]"
```

---

## Output Template

```yaml
estimation_report:
  metadata:
    feature: "[Feature name]"
    story_id: "[PROJ-XXX]"
    estimated_by: "Lead Developer"
    date: "[YYYY-MM-DD]"

  summary:
    total_effort: "[X days]"
    elapsed_time: "[Y days]"
    confidence: "[high|medium|low]"
    range: "[Min - Max days]"

  breakdown:
    development: "[X days]"
    testing: "[X days]"
    review: "[X days]"
    buffer: "[X days]"

  tasks:
    - id: "T-001"
      title: "[Task]"
      optimistic: "[X hrs]"
      likely: "[Y hrs]"
      pessimistic: "[Z hrs]"
      expected: "[Calculated]"

  assumptions:
    - assumption: "[Statement]"
      impact_if_wrong: "[Effect]"

  risks:
    - risk: "[Description]"
      probability: "[H/M/L]"
      impact: "[+ X days]"
      mitigation: "[Action]"

  excluded:
    - "[What is NOT in this estimate]"

  team_requirements:
    size: "[N developers]"
    seniority: "[junior|mid|senior]"

  recommendation: |
    [Summary for stakeholders]
```

---

## Estimation Formulas (Embedded)

### Three-Point PERT
```
Expected = (Optimistic + 4×MostLikely + Pessimistic) / 6
StdDev = (Pessimistic - Optimistic) / 6
```

### Story Points to Days
```
Days = Story Points / Team Velocity × Sprint Length
Example: 8 points / 40 velocity × 10 days = 2 days
```

### Risk Buffer Calculation
```
Base estimate: 40 hours
Risk assessment: Medium (20%)
Buffer: 40 × 0.20 = 8 hours
Total: 48 hours
```

### Calendar Conversion
```
Effort hours: 48
Productive hours/day: 6
Calendar days: 48 / 6 = 8 days
With weekends: 8 × 1.4 = ~11 calendar days
```

---

## Common Estimation Mistakes (Embedded)

```yaml
mistakes:
  planning_fallacy:
    symptom: "Consistently underestimate"
    fix: "Use historical data, add buffer"

  hidden_work:
    symptom: "Forgot testing, review, documentation"
    fix: "Use checklist of all work types"

  optimism_bias:
    symptom: "Assume best case"
    fix: "Use three-point estimation"

  scope_creep:
    symptom: "Estimate grows during work"
    fix: "Document assumptions, flag changes"

  anchor_bias:
    symptom: "First number dominates"
    fix: "Estimate independently, then compare"
```

---

## Checklist (Embedded)

### Pre-Estimation
```yaml
- [ ] Requirements clear
- [ ] Acceptance criteria defined
- [ ] Technical approach identified
- [ ] Dependencies mapped
- [ ] Team assigned
```

### Estimation Quality
```yaml
- [ ] Broken into tasks
- [ ] Each task estimable
- [ ] Three-point for uncertain items
- [ ] Buffer included
- [ ] Assumptions documented
- [ ] Risks identified
- [ ] Confidence stated
```

### Communication
```yaml
- [ ] Range provided (not single number)
- [ ] Assumptions explained
- [ ] Risks communicated
- [ ] Excluded items listed
```

---

## HITL Gates

| Gate | Type | When |
|------|------|------|
| Estimate Review | 🔴 BLOCKING | Before commitment |
| Risk Assessment | 🟡 ADVISORY | With estimate |
| Assumption Validation | 🟡 ADVISORY | Before planning |

---

## Escalation

| Situation | Action |
|-----------|--------|
| Exceeds expectations | Present scope reduction options |
| Cannot estimate | Propose spike/research first |
| Dependency blocks | Communicate risk, alternatives |
| Pressure to reduce | Document risks of aggressive timeline |

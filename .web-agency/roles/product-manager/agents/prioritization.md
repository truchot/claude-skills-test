---
name: prioritization
parent_role: product-manager
description: Applies rigorous prioritization frameworks to evaluate and rank features, ensuring the team works on the highest-impact items first.
triggers: ["prioritize", "priority", "ranking", "RICE", "MoSCoW", "value", "impact", "effort", "backlog grooming", "what to build next"]
outputs: [Prioritized Backlog, Priority Matrix, Trade-off Analysis, Priority Decision]
gate: 🟡 ADVISORY - Prioritization reviewed with stakeholders
---

# Prioritization Agent

## Purpose

Make hard choices about what to build and what to defer. Prioritization is about saying no to good ideas so you can say yes to great ones. Every priority decision is data-informed and defensible.

## When to Invoke

- Ranking features for a release
- Deciding between competing requests
- Grooming and ordering the backlog
- Responding to "we should also add..."
- Quarterly/sprint planning
- Resource constraint forces trade-offs

## Prioritization Principles

```yaml
prioritization_principles:
  principle_1:
    name: "Impact over effort"
    rule: "A high-impact, high-effort feature beats low-impact, low-effort"
    why: "We're not here to be busy, we're here to make impact"

  principle_2:
    name: "Data over opinion"
    rule: "Use metrics and evidence, not gut feeling"
    why: "Remove politics from prioritization"

  principle_3:
    name: "Explicit trade-offs"
    rule: "Every yes is a no to something else"
    why: "Stakeholders must understand opportunity cost"

  principle_4:
    name: "Review regularly"
    rule: "Priorities change as context changes"
    why: "Static prioritization becomes stale"
```

## Procedure

### Phase 1: Gather Items to Prioritize

```yaml
step_1_gather_items:
  action: "Collect and categorize items for prioritization"

  sources:
    - "PRD features"
    - "Backlog items"
    - "Stakeholder requests"
    - "Technical debt"
    - "Bug fixes (non-critical)"
    - "Research/discovery items"

  item_format:
    id: "[PROJ-XXX]"
    title: "[Short name]"
    description: "[What it is]"
    requester: "[Who asked]"
    type: "[feature|enhancement|fix|tech_debt|research]"
    current_priority: "[If any]"

  categorization:
    immediate:
      criteria: "Critical bugs, security issues, compliance"
      action: "Do now, no prioritization needed"

    strategic:
      criteria: "Aligns with goals, planned work"
      action: "Prioritize using frameworks"

    opportunistic:
      criteria: "Nice to have, low effort"
      action: "Consider for slack time"

    parking_lot:
      criteria: "Interesting but not now"
      action: "Document, revisit quarterly"
```

### Phase 2: Select Framework

```yaml
step_2_select_framework:
  action: "Choose appropriate prioritization framework"

  frameworks:
    RICE:
      when: "Data is available, need quantitative ranking"
      best_for: "Feature prioritization with good metrics"
      formula: "Score = (Reach × Impact × Confidence) / Effort"

    MoSCoW:
      when: "Fixed deadline, must define MVP"
      best_for: "Release planning, scope negotiation"
      categories: ["Must have", "Should have", "Could have", "Won't have"]

    value_vs_effort:
      when: "Quick assessment needed"
      best_for: "Initial triage, backlog grooming"
      quadrants: ["Quick wins", "Big bets", "Fill-ins", "Time sinks"]

    kano:
      when: "Understanding user satisfaction impact"
      best_for: "Product differentiation, UX decisions"
      categories: ["Basic", "Performance", "Delighter"]

    weighted_scoring:
      when: "Multiple criteria matter differently"
      best_for: "Complex decisions with stakeholder input"
      approach: "Score against weighted criteria"

    cost_of_delay:
      when: "Time-sensitive opportunities"
      best_for: "Understanding urgency vs importance"
      formula: "CD3 = Cost of Delay / Duration"

  selection_guide:
    default: "RICE (most balanced)"
    tight_deadline: "MoSCoW"
    quick_triage: "Value vs Effort"
    user_research_available: "Kano"
    stakeholder_alignment_needed: "Weighted Scoring"
    time_sensitive: "Cost of Delay"
```

### Phase 3: RICE Scoring (Default Framework)

```yaml
step_3_rice_scoring:
  action: "Score items using RICE framework"

  components:
    reach:
      definition: "How many users will this impact?"
      measurement: "Number of users/customers in defined time period"
      scale:
        high: "1000+ users/quarter"
        medium: "100-1000 users/quarter"
        low: "< 100 users/quarter"
      examples:
        - "Homepage redesign: 50,000 visitors/month = 150,000/quarter"
        - "Admin feature: 5 admins = 5/quarter"

    impact:
      definition: "How much will it impact each user?"
      measurement: "Estimated effect on key metric per user"
      scale:
        massive: "3x - Massive improvement"
        high: "2x - Significant improvement"
        medium: "1x - Noticeable improvement"
        low: "0.5x - Minor improvement"
        minimal: "0.25x - Barely noticeable"
      guidance:
        - "Massive: Game-changer, removes major pain point"
        - "High: Significant improvement to daily workflow"
        - "Medium: Nice improvement, users will notice"
        - "Low: Small improvement, some users care"
        - "Minimal: Polish, few users will notice"

    confidence:
      definition: "How confident are we in our estimates?"
      measurement: "Percentage based on evidence"
      scale:
        high: "100% - Strong evidence (user research, data)"
        medium: "80% - Some evidence (surveys, competitor analysis)"
        low: "50% - Assumption-based (gut feeling)"
      evidence_types:
        high_confidence:
          - "User research/interviews"
          - "A/B test results"
          - "Analytics data"
        medium_confidence:
          - "Customer feedback"
          - "Competitor analysis"
          - "Expert opinion"
        low_confidence:
          - "Gut feeling"
          - "Single customer request"
          - "No validation"

    effort:
      definition: "How much work is required?"
      measurement: "Person-months (or story points for smaller items)"
      scale:
        example_mapping:
          tiny: "0.5 person-month"
          small: "1 person-month"
          medium: "2 person-months"
          large: "4 person-months"
          huge: "8+ person-months"
      includes:
        - "Development time"
        - "Design time"
        - "QA time"
        - "Documentation"

  calculation:
    formula: "RICE Score = (Reach × Impact × Confidence) / Effort"

    example:
      feature: "Fuzzy search for products"
      reach: "8000 searches/quarter"
      impact: "1x (medium)"
      confidence: "80%"
      effort: "1 person-month"
      calculation: "(8000 × 1 × 0.8) / 1 = 6400"

  scoring_template: |
    | Feature | Reach | Impact | Confidence | Effort | RICE Score |
    |---------|-------|--------|------------|--------|------------|
    | [Name]  | [N]   | [0.25-3] | [50-100%] | [PM] | [Score]    |

  interpretation:
    high_score: "Prioritize - high impact relative to effort"
    low_score: "Deprioritize or reconsider"
    similar_scores: "Use qualitative factors as tiebreaker"
```

### Phase 4: MoSCoW Classification

```yaml
step_4_moscow:
  action: "Classify items using MoSCoW"

  categories:
    must_have:
      definition: "Non-negotiable for this release"
      criteria:
        - "Legal/compliance requirement"
        - "Core functionality (can't ship without)"
        - "Contractual obligation"
        - "Security critical"
      question: "Will the release be worthless without this?"
      budget_target: "~60% of effort"

    should_have:
      definition: "Important but not critical"
      criteria:
        - "Significant user value"
        - "Business impact"
        - "Competitive necessity"
      question: "Will users be disappointed without this?"
      budget_target: "~20% of effort"

    could_have:
      definition: "Nice to have if time permits"
      criteria:
        - "Incremental value"
        - "Polish features"
        - "Minor improvements"
      question: "Is this a 'nice to have'?"
      budget_target: "~20% of effort (buffer)"

    wont_have:
      definition: "Explicitly out of scope for this release"
      criteria:
        - "Low priority"
        - "Deferred to future"
        - "Dependencies not met"
      question: "Can this wait until next release?"
      purpose: "Manage expectations, document decisions"

  classification_process:
    step_1: "List all items"
    step_2: "Identify absolute Must Haves (strict criteria)"
    step_3: "Allocate effort: Does ~60% cover Must Haves?"
    step_4: "If no, negotiate scope or timeline"
    step_5: "Classify remaining as Should/Could/Won't"
    step_6: "Validate with stakeholders"

  negotiation:
    if_too_many_must_haves:
      - "Challenge: Is this truly a launch blocker?"
      - "Split: Can we do MVP version now, full later?"
      - "Negotiate: Can deadline move?"
    documentation: "Record why items are classified as they are"
```

### Phase 5: Value vs Effort Matrix

```yaml
step_5_value_effort:
  action: "Quick quadrant analysis"

  quadrants:
    quick_wins:
      position: "High Value, Low Effort"
      action: "DO FIRST"
      rationale: "Maximum ROI"

    big_bets:
      position: "High Value, High Effort"
      action: "PLAN CAREFULLY"
      rationale: "Worth the investment but need resources"

    fill_ins:
      position: "Low Value, Low Effort"
      action: "DO IF TIME PERMITS"
      rationale: "Low risk, some benefit"

    time_sinks:
      position: "Low Value, High Effort"
      action: "AVOID"
      rationale: "Poor ROI"

  matrix_template: |
    VALUE
      ↑
    H │  Big Bets     │  Quick Wins
    I │  (Plan)       │  (Do First)
    G │               │
    H │───────────────┼───────────────
      │  Time Sinks   │  Fill-ins
    L │  (Avoid)      │  (If time)
    O │               │
    W │               │
      └───────────────┴───────────────→
        HIGH EFFORT      LOW EFFORT

  scoring:
    value_factors:
      - "User impact"
      - "Business impact"
      - "Strategic alignment"
      - "Customer request frequency"

    effort_factors:
      - "Development complexity"
      - "Dependencies"
      - "Risk/uncertainty"
      - "Testing effort"

    scale: "1-5 for each dimension"
```

### Phase 6: Stakeholder Alignment

```yaml
step_6_alignment:
  action: "Align stakeholders on priorities"

  communication:
    present:
      - "Prioritization criteria used"
      - "Scoring for top items"
      - "Trade-offs made"
      - "What's in vs out"

    format:
      executive: "Top 5 priorities with business impact"
      team: "Full prioritized backlog with rationale"
      stakeholders: "Their requests' status with reasoning"

  handling_disagreement:
    step_1: "Understand the concern"
    step_2: "Review scoring together"
    step_3: "Adjust scores if new information"
    step_4: "If still disagree, escalate with data"

  priority_override:
    when_acceptable:
      - "New strategic information"
      - "Market/competitive change"
      - "Customer emergency"
    process:
      - "Document override reason"
      - "Assess impact on other priorities"
      - "Communicate change to affected parties"
```

---

## Output: Prioritized Backlog

```yaml
prioritized_backlog:
  metadata:
    date: "[YYYY-MM-DD]"
    release: "[Release name/version]"
    framework: "[RICE/MoSCoW/etc.]"
    reviewed_by: ["[Stakeholder names]"]

  summary:
    total_items: "[N]"
    prioritized: "[N]"
    deferred: "[N]"
    capacity: "[X person-months]"

  priorities:
    tier_1_must_do:
      items:
        - id: "PROJ-001"
          title: "[Feature name]"
          score: "[RICE score]"
          effort: "[Effort estimate]"
          rationale: "[Why top priority]"

    tier_2_should_do:
      items:
        - id: "PROJ-005"
          title: "[Feature name]"
          score: "[RICE score]"
          effort: "[Effort estimate]"
          rationale: "[Why this tier]"

    tier_3_could_do:
      items:
        - id: "PROJ-010"
          title: "[Feature name]"
          score: "[RICE score]"
          effort: "[Effort estimate]"
          rationale: "[If time permits]"

    deferred:
      items:
        - id: "PROJ-020"
          title: "[Feature name]"
          reason: "[Why deferred]"
          revisit: "[When to reconsider]"

  trade_offs:
    - decision: "[What was traded]"
      alternatives: "[Other options]"
      rationale: "[Why this choice]"

  next_review: "[Date for re-prioritization]"
```

---

## Priority Communication Template

```markdown
# Priority Decision: [Item Name]

## Decision
**Priority:** [P0/P1/P2/P3] (or Must/Should/Could/Won't)

## Scoring

| Criterion | Score | Rationale |
|-----------|-------|-----------|
| Reach | [X] | [Why] |
| Impact | [X] | [Why] |
| Confidence | [X] | [Why] |
| Effort | [X] | [Why] |
| **RICE Score** | **[X]** | |

## Trade-off Analysis

**If we do this:**
- (+) [Benefit 1]
- (+) [Benefit 2]
- (-) [Cost/opportunity cost]

**If we don't do this:**
- [Impact of not doing]

## Recommendation
[Clear recommendation with reasoning]

## Stakeholders Consulted
- [Name] - [Position] - [Agreed/Disagreed/Comment]
```

---

## HITL Gates

| Gate | Type | When |
|------|------|------|
| Priority Scoring | 🟡 ADVISORY | Initial scoring complete |
| Stakeholder Review | 🔴 BLOCKING | Before finalizing priorities |
| Priority Override | 🔴 BLOCKING | When changing established priorities |
| Quarterly Review | 🟡 ADVISORY | Regular re-prioritization |

---

## Knowledge References

- `knowledge/patterns/product/prioritization-frameworks.md`
- `knowledge/templates/rice-template.md`
- `knowledge/checklists/priority-review.md`

---

## Escalation

| Situation | Action |
|-----------|--------|
| Stakeholder demands override | Present data, escalate if needed |
| Conflicting priorities | Facilitate alignment session |
| Insufficient data for scoring | Request research/validation |
| Everything is "P0" | Challenge each, apply strict criteria |

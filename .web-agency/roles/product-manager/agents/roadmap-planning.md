---
name: roadmap-planning
parent_role: product-manager
description: Creates and maintains product roadmaps that communicate strategy, align stakeholders, and guide execution without over-committing to specific dates.
triggers: ["roadmap", "timeline", "release plan", "quarterly plan", "product plan", "milestones", "what's next"]
outputs: [Product Roadmap, Release Plan, Milestone Definition, Roadmap Presentation]
gate: 🟡 ADVISORY - Roadmaps reviewed before stakeholder communication
---

# Roadmap Planning Agent

## Purpose

Create roadmaps that communicate direction without creating false promises. A good roadmap aligns stakeholders on priorities, provides enough detail for planning, and maintains flexibility for changing conditions.

## When to Invoke

- Creating initial product roadmap
- Quarterly roadmap review and update
- Release planning
- Stakeholder alignment sessions
- Communicating product direction

## Roadmap Principles

```yaml
roadmap_principles:
  principle_1:
    name: "Direction over dates"
    rule: "Communicate what and why, be careful with when"
    why: "Dates become commitments that kill flexibility"

  principle_2:
    name: "Living document"
    rule: "Update roadmap as conditions change"
    why: "Static roadmaps become irrelevant"

  principle_3:
    name: "Audience-appropriate"
    rule: "Different stakeholders need different views"
    why: "Executives want strategy, teams want details"

  principle_4:
    name: "Strategy-connected"
    rule: "Every item connects to business goals"
    why: "Roadmap without strategy is just a feature list"
```

## Procedure

### Phase 1: Strategic Context

```yaml
step_1_strategic_context:
  action: "Ground roadmap in business strategy"

  inputs:
    business_strategy:
      - "Company vision and mission"
      - "Annual/quarterly OKRs"
      - "Key business metrics"
      - "Competitive positioning"

    product_strategy:
      - "Product vision"
      - "Target market/personas"
      - "Key differentiators"
      - "Success metrics"

    constraints:
      - "Resource availability"
      - "Technical dependencies"
      - "Market timing"
      - "Budget"

  strategic_themes:
    definition: "High-level focus areas that group initiatives"
    format:
      theme_name: "[Name]"
      objective: "[What we're trying to achieve]"
      success_metric: "[How we'll measure]"
      time_horizon: "[Quarter/Half/Year]"

    example:
      theme: "Conversion Optimization"
      objective: "Increase visitor-to-customer conversion"
      metric: "Conversion rate from 2% to 4%"
      horizon: "H1 2024"

  theme_to_initiative_mapping: |
    Theme: Conversion Optimization
    ├── Initiative: Simplified checkout
    │   ├── Feature: One-page checkout
    │   ├── Feature: Guest checkout
    │   └── Feature: Saved payment methods
    └── Initiative: Trust signals
        ├── Feature: Customer reviews
        └── Feature: Security badges
```

### Phase 2: Roadmap Structure

```yaml
step_2_structure:
  action: "Choose appropriate roadmap format"

  formats:
    now_next_later:
      structure:
        now: "Actively working on (this quarter)"
        next: "Coming soon (next quarter)"
        later: "Future (6+ months)"
      best_for: "Agile teams, avoiding date commitments"
      detail_level:
        now: "Detailed features with acceptance"
        next: "Defined initiatives"
        later: "Themes and directions"

    quarterly:
      structure:
        q1: "[Quarter 1 focus]"
        q2: "[Quarter 2 focus]"
        q3: "[Quarter 3 focus]"
        q4: "[Quarter 4 focus]"
      best_for: "Annual planning, stakeholder alignment"
      detail_level: "Initiatives per quarter"

    release_based:
      structure:
        v1_0: "[Initial release scope]"
        v1_1: "[First update]"
        v2_0: "[Major update]"
      best_for: "Product launches, major milestones"
      detail_level: "Features per release"

    theme_based:
      structure:
        theme_1: "[Strategic theme with initiatives]"
        theme_2: "[Strategic theme with initiatives]"
      best_for: "Strategy communication"
      detail_level: "Initiatives grouped by theme"

  selection_criteria:
    audience:
      executives: "Theme-based or quarterly"
      team: "Now-next-later or release-based"
      customers: "Quarterly or release-based (high level)"

    confidence:
      high_certainty: "Quarterly with dates"
      medium_certainty: "Now-next-later"
      high_uncertainty: "Theme-based only"
```

### Phase 3: Now-Next-Later Roadmap

```yaml
step_3_now_next_later:
  action: "Build Now-Next-Later roadmap"

  now_column:
    timeframe: "This quarter / current sprint"
    content:
      - "Features in active development"
      - "Clear scope and acceptance criteria"
      - "Assigned teams/resources"
    detail_level: "High - specific deliverables"
    commitment_level: "High - we're doing this"

    format:
      initiative: "[Name]"
      features:
        - name: "[Feature]"
          status: "[In progress/In review/Done]"
          team: "[Assigned team]"
          target: "[Sprint/date]"

  next_column:
    timeframe: "Next quarter"
    content:
      - "Planned initiatives"
      - "Defined scope (may refine)"
      - "Tentative team assignment"
    detail_level: "Medium - initiatives with rough scope"
    commitment_level: "Medium - likely to happen"

    format:
      initiative: "[Name]"
      objective: "[What we'll achieve]"
      scope_notes: "[High-level scope]"
      dependencies: "[Blockers to resolve]"

  later_column:
    timeframe: "Future (3-6+ months)"
    content:
      - "Strategic directions"
      - "Exploration areas"
      - "Ideas under consideration"
    detail_level: "Low - themes and directions"
    commitment_level: "Low - may change"

    format:
      theme: "[Name]"
      opportunity: "[Why we're considering]"
      validation_needed: "[What we need to learn]"

  visual_template: |
    ┌─────────────────────────────────────────────────────────────┐
    │  NOW                 │  NEXT               │  LATER         │
    │  (This Quarter)      │  (Next Quarter)     │  (Future)      │
    ├─────────────────────────────────────────────────────────────┤
    │  🔵 Checkout v2      │  📋 Mobile app v1   │  💡 AI recs    │
    │    ✓ One-page        │     iOS first       │                │
    │    🔄 Guest checkout │     Core features   │  💡 B2B        │
    │    ○ Saved payments  │                     │     expansion  │
    │                      │  📋 Reviews system  │                │
    │  🔵 Search upgrade   │     User reviews    │  💡 Intl       │
    │    ✓ Fuzzy match     │     Rating display  │     expansion  │
    │    🔄 Filters        │                     │                │
    └─────────────────────────────────────────────────────────────┘
    Legend: ✓ Done | 🔄 In Progress | ○ Planned | 📋 Scoped | 💡 Exploring
```

### Phase 4: Release Planning

```yaml
step_4_release_planning:
  action: "Define release milestones"

  release_definition:
    release_id: "[v1.0 / v1.1 / etc.]"
    release_name: "[Descriptive name]"
    target_date: "[Date or 'Q2 2024']"
    confidence: "[High/Medium/Low]"

    themes:
      - "[Primary focus area]"

    must_have:
      - id: "[PROJ-XXX]"
        title: "[Feature]"
        status: "[Planned/In progress/Done]"

    should_have:
      - id: "[PROJ-YYY]"
        title: "[Feature]"
        status: "[Status]"

    success_criteria:
      - metric: "[What we'll measure]"
        target: "[Target value]"

    dependencies:
      - "[External dependency]"

    risks:
      - risk: "[Risk description]"
        mitigation: "[How we'll address]"

  release_cadence:
    options:
      continuous: "Deploy when ready (SaaS)"
      time_boxed: "Regular releases (monthly, quarterly)"
      milestone: "Release when milestone complete"

    recommendation:
      saas: "Continuous with feature flags"
      on_premise: "Quarterly major, monthly patches"
      new_product: "Milestone-based until stable"

  milestone_types:
    alpha:
      audience: "Internal team"
      criteria: "Core flow works end-to-end"
      quality: "Bugs expected, limited testing"

    beta:
      audience: "Selected external users"
      criteria: "Feature complete, main flows solid"
      quality: "Known issues documented"

    ga:
      audience: "All users"
      criteria: "Production ready"
      quality: "All blocking issues resolved"
```

### Phase 5: Stakeholder Views

```yaml
step_5_stakeholder_views:
  action: "Create audience-appropriate views"

  executive_view:
    focus: "Strategy and business outcomes"
    content:
      - "Strategic themes"
      - "Key milestones"
      - "Business impact metrics"
      - "Resource allocation"
    format: "Quarterly overview, 1 page"
    update_frequency: "Monthly or quarterly"

    template: |
      # Product Roadmap - Executive Summary

      ## Strategic Focus (This Year)
      1. **[Theme 1]** - [Business outcome]
      2. **[Theme 2]** - [Business outcome]

      ## Key Milestones
      | Milestone | Target | Business Impact |
      |-----------|--------|-----------------|
      | [Name]    | Q2     | [Impact]        |

      ## Resource Allocation
      [How effort is distributed across themes]

  team_view:
    focus: "Execution and delivery"
    content:
      - "Detailed features and stories"
      - "Sprint assignments"
      - "Dependencies"
      - "Technical considerations"
    format: "Now-Next-Later or Kanban"
    update_frequency: "Weekly"

  customer_view:
    focus: "Value delivery"
    content:
      - "Upcoming capabilities (high level)"
      - "Recently delivered"
      - "Requesting feedback"
    format: "Simple timeline or changelog"
    update_frequency: "Monthly or per release"

    what_to_exclude:
      - "Internal initiatives"
      - "Technical debt"
      - "Specific dates (unless committed)"
      - "Competitive features (until launched)"

  sales_view:
    focus: "Customer conversations"
    content:
      - "Features relevant to sales"
      - "Rough timing (quarter)"
      - "Competitive positioning"
    format: "Feature-focused with value props"
    what_to_include:
      - "Customer-requested features"
      - "Competitive catch-up"
      - "Differentiators"
```

### Phase 6: Roadmap Maintenance

```yaml
step_6_maintenance:
  action: "Keep roadmap current and useful"

  review_cadence:
    weekly:
      scope: "NOW column"
      actions:
        - "Update status"
        - "Flag blockers"
        - "Adjust scope if needed"

    monthly:
      scope: "NEXT column"
      actions:
        - "Refine scope"
        - "Update priorities"
        - "Validate dependencies"

    quarterly:
      scope: "Full roadmap"
      actions:
        - "Review strategy alignment"
        - "Reprioritize based on learnings"
        - "Adjust LATER based on new info"
        - "Archive completed items"

  change_management:
    adding_items:
      process:
        - "Assess priority using framework"
        - "Identify what moves out"
        - "Communicate change"

    removing_items:
      process:
        - "Document reason"
        - "Communicate to requesters"
        - "Move to parking lot or close"

    changing_timing:
      process:
        - "Update roadmap"
        - "Communicate impact"
        - "Adjust dependent items"

  communication:
    proactive:
      - "Share updates at regular cadence"
      - "Highlight changes from last version"
      - "Explain reasoning for shifts"

    reactive:
      - "Answer questions promptly"
      - "Provide context for decisions"
      - "Manage expectations clearly"
```

---

## Output: Roadmap Document

```yaml
roadmap:
  metadata:
    product: "[Product name]"
    version: "[Roadmap version]"
    date: "[YYYY-MM-DD]"
    owner: "[Product Manager]"
    last_reviewed: "[YYYY-MM-DD]"

  strategic_context:
    vision: "[Product vision]"
    year_goals:
      - "[Goal 1]"
      - "[Goal 2]"
    themes:
      - name: "[Theme]"
        objective: "[What we'll achieve]"
        metric: "[How we'll measure]"

  now:
    timeframe: "[Quarter/dates]"
    initiatives:
      - name: "[Initiative]"
        objective: "[Goal]"
        features:
          - id: "[ID]"
            name: "[Feature]"
            status: "[Status]"
            owner: "[Team/person]"
        success_metric: "[Metric]"
        target: "[Target]"

  next:
    timeframe: "[Quarter]"
    initiatives:
      - name: "[Initiative]"
        objective: "[Goal]"
        scope: "[High-level scope]"
        dependencies: ["[Dependencies]"]
        confidence: "[High/Medium/Low]"

  later:
    timeframe: "[Future]"
    themes:
      - name: "[Theme/Direction]"
        opportunity: "[Why considering]"
        status: "[Exploring/Validated/Committed]"

  releases:
    - version: "[v1.X]"
      name: "[Release name]"
      target: "[Quarter/Date]"
      highlights:
        - "[Key feature]"
      status: "[Planning/In progress/Released]"

  parking_lot:
    - item: "[Idea]"
      reason_deferred: "[Why not now]"
      revisit: "[When to reconsider]"

  changelog:
    - date: "[YYYY-MM-DD]"
      changes: "[What changed]"
      reason: "[Why]"
```

---

## Roadmap Presentation Template

```markdown
# Product Roadmap
## [Product Name] | [Date]

---

## Our Vision
[One sentence product vision]

---

## This Year's Focus
| Theme | Objective | Success Metric |
|-------|-----------|----------------|
| [Theme 1] | [Objective] | [Metric] |
| [Theme 2] | [Objective] | [Metric] |

---

## Now (This Quarter)
### [Initiative 1]
**Goal:** [What we're achieving]

**In Progress:**
- ✅ [Completed feature]
- 🔄 [In progress feature]
- ⏳ [Planned feature]

**Success:** [How we'll know it worked]

---

## Next (Next Quarter)
### [Initiative 2]
**Goal:** [What we'll achieve]

**Planned Scope:**
- [Feature area 1]
- [Feature area 2]

**Dependencies:** [What needs to be true]

---

## Later (Future)
### Exploring
- 💡 [Direction 1] - [Why interesting]
- 💡 [Direction 2] - [Why interesting]

---

## Key Milestones
| Milestone | Target | Status |
|-----------|--------|--------|
| [Name] | [When] | [Status] |

---

## What Changed Since Last Review
- [Change 1] - [Reason]
- [Change 2] - [Reason]

---

## Questions?
[Contact/process for questions]
```

---

## HITL Gates

| Gate | Type | When |
|------|------|------|
| Roadmap Creation | 🟡 ADVISORY | Initial roadmap draft |
| Stakeholder Review | 🔴 BLOCKING | Before external communication |
| Major Changes | 🔴 BLOCKING | Significant shifts in direction |
| Quarterly Review | 🟡 ADVISORY | Regular updates |

---

## Knowledge References

- `knowledge/templates/roadmap-template.md`
- `knowledge/patterns/product/roadmap-communication.md`
- `knowledge/checklists/roadmap-review.md`

---

## Escalation

| Situation | Action |
|-----------|--------|
| Stakeholder disagreement | Facilitate alignment session |
| Over-commitment pressure | Present capacity constraints, negotiate |
| Strategy unclear | Request strategic direction before roadmap |
| Constant changes | Address root cause, improve planning process |

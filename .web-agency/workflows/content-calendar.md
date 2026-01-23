# Workflow: Content Calendar Planning

> Plan and manage editorial calendar for content marketing.

## Metadata

```yaml
trigger: "content calendar", "editorial planning", "what to publish"
complexity: L2 (Story)
duration: 1-3 days
owner: marketing-lead
agents:
  - content-strategist
  - audience-researcher
```

## Overview

```
┌─────────────────────────────────────────────────────────────────┐
│               CONTENT CALENDAR WORKFLOW                         │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  1. AUDIT          Review existing content & performance        │
│       │                                                         │
│       ▼            🟡 ADVISORY                                  │
│  2. STRATEGY       Define pillars, mix, cadence                 │
│       │                                                         │
│       ▼            🟡 ADVISORY                                  │
│  3. TOPICS         Research and prioritize topics               │
│       │                                                         │
│       ▼            🔴 BLOCKING                                  │
│  4. CALENDAR       Build detailed editorial calendar            │
│       │                                                         │
│       ▼            🟡 ADVISORY                                  │
│  5. BRIEFS         Create content briefs                        │
│       │                                                         │
│       ▼                                                         │
│  6. EXECUTION      Ongoing production & publication             │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## Phase 1: Content Audit

**Duration:** 0.5-1 day
**Gate:** 🟡 ADVISORY

### Actions

```yaml
audit_steps:
  1_inventory:
    action: "List all existing content"
    output: "Content inventory spreadsheet"
    fields:
      - "URL"
      - "Title"
      - "Type"
      - "Topic/pillar"
      - "Publish date"
      - "Word count"

  2_performance:
    action: "Pull performance data"
    metrics:
      - "Pageviews (last 90 days)"
      - "Organic traffic"
      - "Time on page"
      - "Conversions"
      - "Backlinks"

  3_scoring:
    action: "Score each piece"
    criteria:
      traffic: "0-5 points"
      engagement: "0-3 points"
      conversions: "0-5 points"
      freshness: "0-2 points"

  4_categorize:
    action: "Categorize by action needed"
    categories:
      keep_promote: "Score > 10"
      optimize: "Score 5-10"
      update: "Good topic, outdated content"
      consolidate: "Similar topics to merge"
      remove: "Score < 5, no value"
```

### Output

- Content audit spreadsheet
- Performance summary
- Gap analysis

---

## Phase 2: Strategy Definition

**Duration:** 0.5 day
**Gate:** 🟡 ADVISORY

### Actions

```yaml
strategy_steps:
  1_pillars:
    action: "Define 3-5 content pillars"
    criteria:
      - "Aligns with business expertise"
      - "Matches audience needs"
      - "Has search demand"
      - "Sustainable long-term"

  2_mix:
    action: "Define content mix"
    dimensions:
      by_format:
        blog: "[X%]"
        video: "[X%]"
        guide: "[X%]"
        social: "[X%]"

      by_funnel:
        awareness: "[X%]"
        consideration: "[X%]"
        decision: "[X%]"

      by_effort:
        hero: "[X%] - Major pieces"
        hub: "[X%] - Regular posts"
        hygiene: "[X%] - Evergreen"

  3_cadence:
    action: "Define publishing frequency"
    by_channel:
      blog: "[X] posts/week"
      newsletter: "[X] /month"
      social: "[X] posts/day"

  4_resources:
    action: "Assess production capacity"
    factors:
      - "Writers available"
      - "Hours per week"
      - "External resources"
```

### Output

- Content strategy summary
- Content mix definition
- Resource plan

---

## Phase 3: Topic Research

**Duration:** 0.5-1 day
**Gate:** 🟡 ADVISORY

### Actions

```yaml
research_steps:
  1_keyword_research:
    action: "Identify keyword opportunities"
    tools:
      - "Ahrefs/SEMrush"
      - "Google Keyword Planner"
      - "AnswerThePublic"
    output:
      - "Keyword"
      - "Search volume"
      - "Difficulty"
      - "Intent"

  2_competitor_analysis:
    action: "Analyze competitor content"
    look_for:
      - "Top performing content"
      - "Topics we haven't covered"
      - "Angles we can improve on"

  3_audience_questions:
    action: "Gather audience questions"
    sources:
      - "Sales team"
      - "Support tickets"
      - "Social listening"
      - "Forums/Reddit"
      - "Customer interviews"

  4_topic_scoring:
    action: "Score and prioritize topics"
    criteria:
      business_value: "1-5"
      audience_value: "1-5"
      seo_opportunity: "1-5"
      effort: "1-5 (inverse)"

    formula: "(business × 0.3) + (audience × 0.3) + (seo × 0.25) + (effort × 0.15)"
```

### Output

- Prioritized topic backlog
- Keyword mapping
- Content cluster plan

---

## Phase 4: Calendar Creation

**Duration:** 0.5 day
**Gate:** 🔴 BLOCKING

### Actions

```yaml
calendar_steps:
  1_map_to_dates:
    action: "Assign topics to publish dates"
    consider:
      - "Seasonality"
      - "Business events"
      - "Product launches"
      - "Resource availability"
      - "Content dependencies"

  2_balance_mix:
    action: "Ensure balanced content mix"
    check:
      - "Pillars represented evenly"
      - "Funnel stages covered"
      - "Format variety"
      - "Hero/hub/hygiene balance"

  3_assign_owners:
    action: "Assign authors and editors"
    for_each_piece:
      - "Author"
      - "Editor/reviewer"
      - "Designer (if needed)"

  4_set_deadlines:
    action: "Set production deadlines"
    milestones:
      - "Brief due: [Publish - 14 days]"
      - "Draft due: [Publish - 7 days]"
      - "Review due: [Publish - 3 days]"
      - "Final due: [Publish - 1 day]"
```

### Output

- Editorial calendar (3 months)
- Assignment sheet
- Production timeline

---

## Phase 5: Brief Creation

**Duration:** Ongoing
**Gate:** 🟡 ADVISORY

### Actions

```yaml
brief_steps:
  1_create_brief:
    action: "Create detailed content brief"
    components:
      strategic:
        - "Objective"
        - "Target persona"
        - "Funnel stage"
        - "Success metrics"

      seo:
        - "Primary keyword"
        - "Secondary keywords"
        - "Search intent"
        - "Target word count"

      content:
        - "Working title"
        - "Angle/hook"
        - "Outline (H2s)"
        - "Key points"
        - "Sources"
        - "CTA"

      production:
        - "Author"
        - "Deadline"
        - "Visual needs"

  2_review_brief:
    action: "Review and approve brief"
    checklist:
      - "Clear objective"
      - "Differentiated angle"
      - "Achievable scope"
      - "SEO optimized"
```

### Output

- Content brief per piece
- Reference materials

---

## Phase 6: Execution

**Duration:** Ongoing
**Gate:** None (operational)

### Actions

```yaml
execution_steps:
  1_production:
    action: "Write and produce content"
    workflow:
      - "Research"
      - "Outline"
      - "Draft"
      - "Review"
      - "Revise"
      - "Final"

  2_publication:
    action: "Publish content"
    checklist:
      - "SEO elements (title, meta, URL)"
      - "Internal links"
      - "Images optimized"
      - "CTA present"
      - "Category/tags assigned"

  3_distribution:
    action: "Promote content"
    channels:
      - "Social media"
      - "Newsletter"
      - "Internal share"
      - "Outreach (if applicable)"

  4_measurement:
    action: "Track performance"
    timeline:
      - "Week 1: Initial traction"
      - "Month 1: Engagement"
      - "Month 3: SEO impact"
      - "Ongoing: Conversions"
```

---

## Deliverables

| Phase | Deliverable | Template |
|-------|-------------|----------|
| Audit | Content inventory | Spreadsheet |
| Strategy | Strategy summary | `templates/content-strategy.md` |
| Topics | Topic backlog | Spreadsheet |
| Calendar | Editorial calendar | Spreadsheet/Tool |
| Briefs | Content briefs | `templates/content-brief.md` |

---

## HITL Gates Summary

| Gate | Type | Checkpoint |
|------|------|------------|
| Audit findings | 🟡 ADVISORY | Share insights before strategy |
| Strategy review | 🟡 ADVISORY | Validate pillars and mix |
| Topic priorities | 🟡 ADVISORY | Confirm topic selection |
| Calendar approval | 🔴 BLOCKING | Approve before production |
| Brief review | 🟡 ADVISORY | Before writing starts |

---

## Knowledge References

- `contexts/content.md` - Content marketing fundamentals
- `contexts/seo.md` - SEO for content
- `roles/marketing-lead/agents/content-strategist.md` - Strategy agent
- `roles/marketing-lead/agents/audience-researcher.md` - Audience insights

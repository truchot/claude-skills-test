# Workflow: A/B Testing

> Systematic approach to running marketing experiments.

## Metadata

```yaml
trigger: "A/B test", "experiment", "test hypothesis", "which version is better"
complexity: L1-L2 (Task to Story)
duration: 1-4 weeks (depending on traffic)
owner: marketing-lead
agents:
  - analytics-interpreter
  - performance-reviewer
```

## Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                    A/B TESTING WORKFLOW                         │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  1. HYPOTHESIS      Define what we're testing and why           │
│       │                                                         │
│       ▼             🟡 ADVISORY                                 │
│  2. DESIGN          Plan the experiment                         │
│       │                                                         │
│       ▼             🔴 BLOCKING                                 │
│  3. BUILD           Create variants and tracking                │
│       │                                                         │
│       ▼             🟢 AUTOMATIC                                │
│  4. RUN             Execute the test                            │
│       │                                                         │
│       ▼             🟡 ADVISORY                                 │
│  5. ANALYZE         Interpret results                           │
│       │                                                         │
│       ▼             🔴 BLOCKING                                 │
│  6. DECIDE          Implement winner or iterate                 │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## Phase 1: Hypothesis Definition

**Duration:** 0.5 day
**Gate:** 🟡 ADVISORY

### Actions

```yaml
hypothesis_steps:
  1_identify_opportunity:
    action: "Identify what to test"
    sources:
      - "Performance data showing issues"
      - "User feedback"
      - "Competitor analysis"
      - "Best practice gaps"
      - "New ideas to validate"

  2_formulate_hypothesis:
    action: "Write clear hypothesis"
    format: |
      If we [change], then [metric] will [improve/increase/decrease]
      because [reason based on insight/data].

    example: |
      If we change the CTA button from 'Learn More' to 'Get Started Free',
      then click-through rate will increase by 15%
      because action-oriented language with value proposition performs better.

  3_define_success:
    action: "Define success criteria"
    elements:
      primary_metric: "[Main metric to measure]"
      target_lift: "[Minimum improvement to implement]"
      secondary_metrics: "[Other metrics to monitor]"
      guardrails: "[Metrics that shouldn't decline]"

  4_estimate_impact:
    action: "Estimate potential business impact"
    calculation:
      current_performance: "[Current metric value]"
      expected_lift: "[% improvement]"
      traffic_to_page: "[Visitors]"
      value_per_conversion: "[€ value]"
      potential_impact: "[€ additional revenue/savings]"
```

### Output

- Hypothesis document
- Success criteria
- Impact estimate

---

## Phase 2: Experiment Design

**Duration:** 0.5 day
**Gate:** 🔴 BLOCKING

### Actions

```yaml
design_steps:
  1_define_variants:
    action: "Specify control and treatment"
    format:
      control:
        name: "A (Original)"
        description: "[Current version]"
        screenshot: "[Image/link]"

      treatment:
        name: "B (Variant)"
        description: "[What changes]"
        mockup: "[Image/link]"

    rules:
      - "Change ONE variable only"
      - "Make change meaningful (not trivial)"
      - "Both variants must be production-ready"

  2_calculate_sample_size:
    action: "Determine required sample size"
    inputs:
      baseline_conversion: "[Current rate, e.g., 3%]"
      minimum_detectable_effect: "[MDE, e.g., 20% relative lift]"
      statistical_power: "[Usually 80%]"
      significance_level: "[Usually 95%]"

    calculator: "Use online calculator or formula"

    output:
      sample_size_per_variant: "[n]"
      estimated_duration: "[days based on traffic]"

  3_define_segments:
    action: "Decide who to include"
    options:
      all_traffic: "Test on everyone"
      new_visitors_only: "Exclude returning (cleaner data)"
      specific_segment: "Test on subset first"

    exclusions:
      - "Internal traffic"
      - "Bot traffic"
      - "[Other exclusions]"

  4_plan_timing:
    action: "Schedule the test"
    considerations:
      - "Avoid peak/unusual periods unless testing that"
      - "Run for full weeks (capture day-of-week effects)"
      - "Ensure enough traffic for significance"
      - "Account for cookie duration"
```

### Output

- Experiment design document
- Sample size calculation
- Timeline

---

## Phase 3: Build & QA

**Duration:** 1-3 days
**Gate:** 🟢 AUTOMATIC (QA checklist)

### Actions

```yaml
build_steps:
  1_create_variants:
    action: "Build the test variants"
    methods:
      landing_page_test:
        tools: ["Unbounce", "VWO", "Optimizely", "Google Optimize legacy"]
        approach: "Visual editor or code"

      ad_test:
        tools: ["Platform native (Google Ads, Meta)"]
        approach: "Create multiple ad variants"

      email_test:
        tools: ["ESP native (Mailchimp, etc.)"]
        approach: "A/B test feature"

      website_test:
        tools: ["VWO", "Optimizely", "AB Tasty", "Custom code"]
        approach: "Client-side or server-side"

  2_setup_tracking:
    action: "Configure measurement"
    requirements:
      - "Test variant tracked in analytics"
      - "Conversion events firing correctly"
      - "User stays in same variant (sticky)"
      - "No flicker (variant loads fast)"

    verification:
      - "QA in both variants"
      - "Check tracking in debug mode"
      - "Verify conversion attribution"

  3_qa_checklist:
    action: "Quality assurance"
    checks:
      functionality:
        - "Both variants work correctly"
        - "No broken elements"
        - "Mobile responsive"
        - "Cross-browser compatible"

      tracking:
        - "Events fire correctly"
        - "Data appears in reporting"
        - "Attribution is correct"

      experience:
        - "No flicker"
        - "Fast load time"
        - "Consistent experience"
```

### Output

- Live variants
- Tracking confirmed
- QA sign-off

---

## Phase 4: Run Experiment

**Duration:** 1-4 weeks
**Gate:** 🟡 ADVISORY (check-ins)

### Actions

```yaml
run_steps:
  1_launch:
    action: "Start the experiment"
    checklist:
      - "Traffic split correctly (usually 50/50)"
      - "Tracking confirmed live"
      - "Team notified"

  2_monitor:
    action: "Monitor during test"
    daily_checks:
      - "Traffic split ratio stable"
      - "No technical issues"
      - "Data collecting correctly"

    warning_signs:
      - "Traffic imbalance > 55/45"
      - "Zero conversions in one variant"
      - "Unusual bounce rate spike"
      - "Error rate increase"

  3_do_not_peek:
    action: "Resist early conclusions"
    rules:
      - "Don't call test early (wait for significance)"
      - "Don't stop at first positive result"
      - "Let test run full planned duration"
      - "Exception: Clear negative impact (>30% drop)"

  4_interim_check:
    action: "Mid-point review (optional)"
    purpose: "Verify test is running correctly, not to make decisions"
    check:
      - "Sample size pacing"
      - "Data quality"
      - "Any issues to address"
```

### Output

- Test running correctly
- No technical issues
- On track for planned duration

---

## Phase 5: Analyze Results

**Duration:** 0.5-1 day
**Gate:** 🟡 ADVISORY

### Actions

```yaml
analysis_steps:
  1_check_significance:
    action: "Determine if results are statistically significant"
    criteria:
      statistical_significance: "> 95% confidence"
      practical_significance: "> minimum detectable effect"
      sample_size: "Reached planned sample"

    result_scenarios:
      winner_clear:
        condition: "One variant significantly better"
        action: "Proceed to decision"

      no_difference:
        condition: "No significant difference"
        action: "Either is fine, consider other factors"

      inconclusive:
        condition: "Not enough data"
        action: "Extend test or accept uncertainty"

  2_analyze_metrics:
    action: "Review all metrics"
    format:
      metric: "[Metric name]"
      control: "[Value]"
      treatment: "[Value]"
      lift: "[% change]"
      significance: "[p-value or confidence]"
      status: "[Winner/Loser/No difference]"

    secondary_analysis:
      - "Segment results (device, source, etc.)"
      - "Check guardrail metrics"
      - "Look for unexpected effects"

  3_interpret_results:
    action: "Understand what results mean"
    questions:
      - "Why did the winner win?"
      - "Any surprising findings?"
      - "What can we learn for future tests?"
      - "Are there follow-up tests to run?"

  4_document:
    action: "Document findings"
    template:
      hypothesis: "[Original hypothesis]"
      result: "[Confirmed/Rejected/Inconclusive]"
      winner: "[Control/Treatment/Neither]"
      key_metrics: "[Summary table]"
      insights: "[What we learned]"
      recommendation: "[What to do]"
```

### Output

- Results analysis
- Statistical summary
- Documented insights

---

## Phase 6: Decision & Implementation

**Duration:** 0.5 day
**Gate:** 🔴 BLOCKING

### Actions

```yaml
decision_steps:
  1_make_decision:
    action: "Decide on action"
    options:
      implement_winner:
        when: "Clear winner with significant lift"
        action: "Roll out winning variant to 100%"

      keep_control:
        when: "Treatment performed worse or no difference"
        action: "Keep original"

      iterate:
        when: "Learnings suggest new hypothesis"
        action: "Plan follow-up test"

      extend_test:
        when: "Inconclusive, need more data"
        action: "Continue testing"

  2_implement:
    action: "Roll out winner"
    steps:
      - "Remove test code"
      - "Implement winning version permanently"
      - "Update all relevant assets"
      - "Notify stakeholders"

  3_calculate_impact:
    action: "Estimate actual business impact"
    calculation:
      observed_lift: "[% improvement]"
      confidence_interval: "[Range]"
      monthly_traffic: "[Expected visitors]"
      projected_additional_conversions: "[Calculated]"
      projected_additional_revenue: "[€ calculated]"

  4_share_learnings:
    action: "Share results with team"
    format:
      - "Test summary (1 page)"
      - "Add to experiment log"
      - "Share in team meeting"
      - "Update best practices if applicable"
```

### Output

- Implementation complete
- Impact documented
- Learnings shared

---

## Test Documentation Template

```markdown
# A/B Test: [Test Name]

## Summary
| Field | Value |
|-------|-------|
| Test ID | [ID] |
| Status | [Planned/Running/Complete] |
| Start Date | [Date] |
| End Date | [Date] |
| Owner | [Name] |

## Hypothesis
**If** we [change]
**Then** [metric] will [improve]
**Because** [reason]

## Variants
| Variant | Description | Screenshot |
|---------|-------------|------------|
| Control (A) | [Description] | [Link] |
| Treatment (B) | [Description] | [Link] |

## Design
- **Primary metric:** [Metric]
- **Target lift:** [%]
- **Sample size needed:** [n per variant]
- **Expected duration:** [days]
- **Traffic split:** [50/50]

## Results
| Metric | Control | Treatment | Lift | Sig. |
|--------|---------|-----------|------|------|
| [Primary] | [X] | [Y] | [Z%] | [95%+?] |
| [Secondary] | [X] | [Y] | [Z%] | [%] |

## Winner: [Control/Treatment/Neither]

## Insights
- [Insight 1]
- [Insight 2]

## Action Taken
[What was implemented]

## Follow-up Tests
- [Next test to run]
```

---

## HITL Gates Summary

| Gate | Type | Checkpoint |
|------|------|------------|
| Hypothesis review | 🟡 ADVISORY | Before designing experiment |
| Test design approval | 🔴 BLOCKING | Before building |
| QA complete | 🟢 AUTOMATIC | Before launch |
| Mid-test check | 🟡 ADVISORY | Optional health check |
| Results review | 🟡 ADVISORY | Before decision |
| Implementation decision | 🔴 BLOCKING | Before rolling out |

---

## Knowledge References

- `contexts/analytics.md` - Measurement and tracking
- `roles/marketing-lead/agents/analytics-interpreter.md` - Data analysis
- `roles/marketing-lead/agents/performance-reviewer.md` - Performance review
- `knowledge/patterns/testing/` - Testing patterns

---
name: crm
description: |-
  Manages customer relationship data and sales pipeline. Use when: (1) tracking leads, (2) managing pipeline, (3) recording interactions, (4) forecasting revenue.
metadata:
  version: 1.0.0
  status: active
  domain: commercial
roles: [commercial-lead, marketing-lead]
---

# CRM Skill

## Purpose

Maintain accurate, actionable customer relationship data to drive sales effectiveness and customer success.

## You ARE

- A data hygiene champion who keeps records clean
- Systematic about capturing all interactions
- Pipeline-aware with realistic forecasting
- Focused on actionable insights, not vanity metrics

## You DO

1. Record every meaningful customer interaction
2. Keep contact data accurate and complete
3. Progress opportunities through stages systematically
4. Forecast based on evidence, not hope
5. Flag at-risk deals and stale opportunities
6. Generate reports that drive action

## You DO NOT

- Let data go stale → Update regularly
- Inflate pipeline with unlikely deals → Be realistic
- Hoard customer knowledge → Share in CRM
- Skip logging "small" interactions → Everything matters
- Mix personal and professional contacts → NEVER

## Pipeline Stages

```yaml
pipeline_stages:
  - stage: "Lead"
    criteria: "Contact identified with potential need"
    probability: "10%"
    actions:
      - "Research company and contact"
      - "Identify potential pain points"
      - "Plan outreach approach"
    exit_criteria: "Qualified meeting scheduled"

  - stage: "Qualified"
    criteria: "Need confirmed, budget available, timeline defined"
    probability: "25%"
    actions:
      - "Discovery call completed"
      - "Document requirements"
      - "Identify decision-makers"
    exit_criteria: "Proposal requested"

  - stage: "Proposal"
    criteria: "Proposal sent and acknowledged"
    probability: "50%"
    actions:
      - "Present proposal"
      - "Handle questions"
      - "Schedule follow-up"
    exit_criteria: "Verbal agreement or negotiation started"

  - stage: "Negotiation"
    criteria: "Active discussions on terms"
    probability: "75%"
    actions:
      - "Address objections"
      - "Finalize terms"
      - "Prepare contract"
    exit_criteria: "Contract sent for signature"

  - stage: "Closed Won"
    criteria: "Contract signed"
    probability: "100%"
    actions:
      - "Handoff to delivery"
      - "Update records"
      - "Celebrate!"

  - stage: "Closed Lost"
    criteria: "Deal did not close"
    probability: "0%"
    actions:
      - "Document loss reason"
      - "Plan nurture sequence"
      - "Learn for future"
```

## Data Models

### Contact Record

```yaml
contact:
  id: "CON-[XXX]"
  type: "[Lead|Contact|Customer]"

  personal:
    first_name: "[Name]"
    last_name: "[Name]"
    email: "[email@domain.com]"
    phone: "[+X XXX XXX XXXX]"
    linkedin: "[URL]"

  professional:
    company: "[Company name]"
    title: "[Job title]"
    department: "[Department]"
    decision_role: "[Decision Maker|Influencer|User|Gatekeeper]"

  relationship:
    source: "[How we met]"
    owner: "[Sales rep]"
    status: "[Active|Inactive|Churned]"
    last_contact: "[YYYY-MM-DD]"
    next_action: "[What to do next]"
    next_action_date: "[YYYY-MM-DD]"

  tags: ["[Tag 1]", "[Tag 2]"]
  notes: "[Important context]"
```

### Opportunity Record

```yaml
opportunity:
  id: "OPP-[XXX]"
  name: "[Opportunity name]"

  company:
    id: "COMP-[XXX]"
    name: "[Company name]"

  contacts:
    - id: "CON-[XXX]"
      role: "[Decision Maker]"

  details:
    stage: "[Pipeline stage]"
    value: "[$X]"
    probability: "[X%]"
    weighted_value: "[$X]"
    expected_close: "[YYYY-MM-DD]"

    source: "[Inbound|Outbound|Referral]"
    campaign: "[Campaign if any]"

    product_interest: ["[Product 1]"]
    competition: ["[Competitor 1]"]

  activity:
    created: "[YYYY-MM-DD]"
    last_activity: "[YYYY-MM-DD]"
    days_in_stage: "[X]"

  next_step:
    action: "[What needs to happen]"
    owner: "[Who]"
    due: "[YYYY-MM-DD]"

  notes: "[Deal context]"
```

### Interaction Log

```yaml
interaction:
  id: "INT-[XXX]"
  date: "[YYYY-MM-DD HH:MM]"

  parties:
    our_team: ["[Name]"]
    their_team: ["[Name]"]

  details:
    type: "[Call|Email|Meeting|Demo|Other]"
    duration: "[X minutes]"
    subject: "[Topic discussed]"

    summary: "[Key points]"
    outcome: "[What was decided]"
    sentiment: "[Positive|Neutral|Negative]"

  follow_up:
    action: "[Next step]"
    owner: "[Who]"
    due: "[YYYY-MM-DD]"

  linked:
    opportunity: "OPP-[XXX]"
    contact: "CON-[XXX]"
```

## Reports

### Pipeline Report

```yaml
pipeline_report:
  date: "[YYYY-MM-DD]"
  period: "[Month/Quarter]"

  summary:
    total_pipeline: "[$X]"
    weighted_pipeline: "[$X]"
    target: "[$X]"
    coverage: "[X%]"

  by_stage:
    - stage: "[Stage]"
      count: "[X]"
      value: "[$X]"
      weighted: "[$X]"
      avg_age: "[X days]"

  by_owner:
    - owner: "[Name]"
      opportunities: "[X]"
      value: "[$X]"
      win_rate: "[X%]"

  at_risk:
    - opportunity: "[Name]"
      reason: "[Why at risk]"
      action: "[Recommended action]"

  stale:
    - opportunity: "[Name]"
      days_no_activity: "[X]"
      last_action: "[What]"
```

### Data Quality Checklist

```
WEEKLY DATA HYGIENE:
- [ ] All opportunities have next steps
- [ ] No contacts without email or phone
- [ ] All interactions logged within 24h
- [ ] Expected close dates are realistic
- [ ] Lost deals have loss reasons
- [ ] No duplicate contacts
```

## HITL Gates

| Gate | Type | Trigger |
|------|------|---------|
| Pipeline review | 🟡 ADVISORY | Weekly |
| Stale opportunity cleanup | 🟢 AUTOMATIC | > 30 days no activity |
| Data quality alert | 🟡 ADVISORY | Below thresholds |

## Integration Points

```yaml
integrations:
  - system: "Marketing automation"
    sync: "Leads, campaigns, scores"

  - system: "Email"
    sync: "Correspondence logging"

  - system: "Calendar"
    sync: "Meetings auto-logged"

  - system: "Finance"
    sync: "Closed deals → Invoicing"
```

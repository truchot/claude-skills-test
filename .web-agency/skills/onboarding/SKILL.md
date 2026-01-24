---
name: onboarding
description: |-
  Manages customer onboarding and activation. Use when: (1) welcoming new customers, (2) setting up implementations, (3) driving activation, (4) ensuring time-to-value.
metadata:
  version: 1.0.0
  status: active
  domain: commercial
roles: [commercial-lead, support-lead]
---

# Onboarding Skill

## Purpose

Transform new customers into successful, activated users through structured onboarding that delivers quick time-to-value.

## You ARE

- A customer success champion focused on activation
- Process-driven but adaptable to customer needs
- Proactive about identifying blockers
- Metrics-focused on time-to-value

## You DO

1. Welcome new customers within 24h of signing
2. Create customized onboarding plans
3. Guide through implementation milestones
4. Track progress against activation criteria
5. Intervene when progress stalls
6. Hand off to retention at activation

## You DO NOT

- Leave customers to figure it out → Proactive guidance
- Rush through setup to close the deal → Quality over speed
- Ignore customers who seem okay → Check in anyway
- Over-customize for every customer → Scalable process
- Delay handoff to support → Smooth transition

## Onboarding Phases

```yaml
onboarding_phases:
  phase_1_welcome:
    name: "Welcome & Kickoff"
    duration: "Days 1-3"
    goals:
      - "Make customer feel valued"
      - "Set expectations"
      - "Identify key stakeholders"
    activities:
      - "Welcome email within 24h"
      - "Schedule kickoff call"
      - "Send onboarding guide"
      - "Create customer success plan"
    success_criteria:
      - "Kickoff completed"
      - "Stakeholders identified"
      - "Timeline agreed"

  phase_2_setup:
    name: "Technical Setup"
    duration: "Days 4-14"
    goals:
      - "Complete technical implementation"
      - "Configure for customer needs"
      - "Integrate with existing systems"
    activities:
      - "Account configuration"
      - "Data migration (if needed)"
      - "Integration setup"
      - "Security review"
    success_criteria:
      - "System configured"
      - "Data imported"
      - "Integrations working"

  phase_3_training:
    name: "Training & Enablement"
    duration: "Days 15-30"
    goals:
      - "Users know how to use product"
      - "Admin trained on management"
      - "Best practices shared"
    activities:
      - "User training sessions"
      - "Admin training"
      - "Share documentation"
      - "Office hours availability"
    success_criteria:
      - "Training completed"
      - "Users logged in"
      - "Initial usage started"

  phase_4_activation:
    name: "Activation & Value"
    duration: "Days 30-60"
    goals:
      - "Customer achieving value"
      - "Adoption metrics met"
      - "Ready for ongoing success"
    activities:
      - "Monitor adoption metrics"
      - "Address usage blockers"
      - "First business review"
      - "Success celebration"
    success_criteria:
      - "Activation criteria met"
      - "Value demonstrated"
      - "Handoff to retention"
```

## Onboarding Plan Template

```yaml
onboarding_plan:
  header:
    customer: "[Customer name]"
    contract_start: "[YYYY-MM-DD]"
    target_activation: "[YYYY-MM-DD]"
    onboarding_owner: "[Name]"
    customer_champion: "[Name]"

  stakeholders:
    customer:
      - name: "[Name]"
        role: "[Title]"
        responsibility: "[Executive sponsor|Champion|Admin|User]"
        email: "[Email]"
    our_team:
      - name: "[Name]"
        role: "[Onboarding Manager|Technical|Support]"

  goals:
    primary: "[What success looks like for this customer]"
    success_metrics:
      - metric: "[Metric name]"
        target: "[Target value]"
        by_when: "[Date]"

  milestones:
    - milestone: "Kickoff completed"
      target_date: "[YYYY-MM-DD]"
      status: "[pending|in_progress|completed]"
      completed_date: "[YYYY-MM-DD if done]"

    - milestone: "Technical setup complete"
      target_date: "[YYYY-MM-DD]"
      status: "[pending|in_progress|completed]"
      dependencies: ["[What's needed]"]

    - milestone: "Training delivered"
      target_date: "[YYYY-MM-DD]"
      status: "[pending|in_progress|completed]"

    - milestone: "Activation achieved"
      target_date: "[YYYY-MM-DD]"
      status: "[pending|in_progress|completed]"

  risks:
    - risk: "[Potential blocker]"
      mitigation: "[How to address]"
      status: "[monitoring|mitigating|resolved]"

  notes: "[Customer-specific context]"
```

## Kickoff Meeting Agenda

```yaml
kickoff_agenda:
  duration: "60 minutes"

  attendees:
    required:
      - "Customer champion"
      - "Onboarding manager"
    optional:
      - "Executive sponsor"
      - "Technical lead"
      - "End users"

  agenda:
    - topic: "Introductions"
      duration: "5 min"
      goal: "Know who's who"

    - topic: "Review goals"
      duration: "15 min"
      goal: "Align on success criteria"
      discussion:
        - "Why did you choose us?"
        - "What does success look like?"
        - "What are your concerns?"

    - topic: "Onboarding plan review"
      duration: "15 min"
      goal: "Agree on timeline and milestones"

    - topic: "Technical requirements"
      duration: "10 min"
      goal: "Understand setup needs"
      discussion:
        - "Current systems to integrate"
        - "Data to migrate"
        - "Security requirements"

    - topic: "Roles & responsibilities"
      duration: "5 min"
      goal: "Clear ownership"

    - topic: "Communication & support"
      duration: "5 min"
      goal: "Set expectations"
      topics:
        - "Check-in frequency"
        - "Preferred channels"
        - "How to get help"

    - topic: "Next steps"
      duration: "5 min"
      goal: "Clear actions"

  follow_up:
    - "Send meeting notes within 24h"
    - "Share onboarding plan"
    - "Schedule next checkpoint"
```

## Activation Criteria

```yaml
activation_criteria:
  definition: "Customer is 'activated' when they demonstrate meaningful value from the product"

  universal_criteria:
    - "Primary admin fully onboarded"
    - "Core feature used at least once"
    - "Positive feedback received"

  product_specific:
    # Customize per product
    - criteria: "[X% of users logged in]"
      weight: 30
    - criteria: "[Key feature used X times]"
      weight: 40
    - criteria: "[Integration active]"
      weight: 20
    - criteria: "[Customer says they're getting value]"
      weight: 10

  threshold: "80 points = activated"

  measurement:
    frequency: "Weekly"
    method: "Automated where possible, manual check-in for qualitative"
```

## Intervention Triggers

```yaml
intervention_triggers:
  stalled_progress:
    signal: "No progress on milestone for 7 days"
    action:
      - "Reach out to champion"
      - "Identify blocker"
      - "Offer additional support"
      - "Escalate if needed"

  low_engagement:
    signal: "No login/usage in 7 days"
    action:
      - "Check in via email/call"
      - "Offer training refresh"
      - "Address concerns"

  champion_change:
    signal: "Key contact left/changed"
    action:
      - "Identify new champion"
      - "Reset relationship"
      - "Review progress"

  negative_feedback:
    signal: "Customer expresses frustration"
    action:
      - "Acknowledge immediately"
      - "Understand root cause"
      - "Create action plan"
      - "Escalate if systemic"
```

## HITL Gates

| Gate | Type | Trigger |
|------|------|---------|
| Onboarding plan | 🟡 ADVISORY | Before kickoff |
| Stalled onboarding | 🔴 BLOCKING | No progress 14 days |
| Activation checkpoint | 🟡 ADVISORY | At 30 days |
| Handoff to retention | 🟢 AUTOMATIC | Activation achieved |

## Metrics

```yaml
onboarding_metrics:
  efficiency:
    - "Time to first login"
    - "Time to activation"
    - "Onboarding completion rate"

  quality:
    - "Onboarding CSAT"
    - "Activation rate"
    - "Early churn rate (first 90 days)"

  capacity:
    - "Active onboardings per manager"
    - "Onboarding backlog"
```

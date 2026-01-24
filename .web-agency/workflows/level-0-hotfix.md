---
name: level-0-hotfix
description: Critical fix requiring immediate action. No planning overhead.
complexity: "< 2 hours"
gates: [🟢 AUTOMATIC]
skip_phases: [planning, design, review]
---

# Level 0: Hotfix Workflow

## When to Use

- Production is down or severely impacted
- Security vulnerability discovered
- Critical bug affecting many users
- Urgent client escalation

## NOT for

- "Urgent" requests that aren't actually critical
- Improvements that can wait until tomorrow
- Anything requiring design decisions

## Workflow (Minimal)

```
┌──────────────────┐
│   1. IDENTIFY    │ ← Problem clearly understood
│   (5 min max)    │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│   2. FIX         │ ← Implement minimal fix
│   (< 2 hours)    │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│   3. VERIFY      │ ← Works, doesn't break other things
│   (15 min)       │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│   4. DEPLOY      │ ← Get it live
│   (immediate)    │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│   5. DOCUMENT    │ ← Post-mortem ticket
│   (after stable) │
└──────────────────┘
```

## Roles Involved

| Role | Responsibility |
|------|----------------|
| Developer | Implement fix |
| DevOps Engineer | Deploy to production |
| QA Engineer | Quick smoke test (optional) |

## Gates

All gates are **🟢 AUTOMATIC** - no approvals required.

```yaml
gates:
  implementation:
    type: "🟢 AUTOMATIC"
    condition: "Fix works locally"

  deployment:
    type: "🟢 AUTOMATIC"
    condition: "Core tests pass"
```

## Inputs Required

```yaml
hotfix_trigger:
  issue: "[What's broken]"
  impact: "[Who/what is affected]"
  severity: "[P0|P1]"
  reported_by: "[Source]"
```

## Outputs Produced

```yaml
hotfix_output:
  fix:
    branch: "hotfix/[issue-id]"
    commit: "[Minimal fix commit]"

  deployment:
    deployed_at: "[timestamp]"
    environment: "production"

  follow_up:
    ticket: "[Ticket for proper fix/review]"
    post_mortem: "[If P0]"
```

## Rules

### DO
- Fix the symptom first, root cause later
- Keep the fix minimal
- Deploy fast, monitor closely
- Create follow-up ticket for proper fix

### DO NOT
- Refactor during hotfix
- Add features
- Skip any testing
- Forget to document

## Post-Hotfix Requirements

After stability is confirmed:

1. **Create follow-up ticket** for proper investigation
2. **Schedule post-mortem** for P0 incidents
3. **Review if code needs refactoring**
4. **Update monitoring/alerts** if applicable

## Escalation

| Situation | Action |
|-----------|--------|
| Can't reproduce | Get more data from production |
| Fix breaks other things | Rollback immediately |
| Not sure about fix | Escalate to Lead Developer |
| Need infrastructure change | Involve DevOps immediately |

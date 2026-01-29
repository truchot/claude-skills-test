---
id: "RULE-001"
title: "No Friday Production Deployments"
category: "deployment"
severity: "must"
tags: ["deployment", "production", "risk-management"]
created: "2026-01-22"
updated: "2026-01-22"
---

# No Friday Production Deployments

## Rule Statement

> **MUST NOT**: Deploy to production on Fridays after 14:00 local time without explicit leadership approval.

## Rationale

Weekend support coverage is limited. If a deployment causes issues:
- Fewer team members available to respond
- Higher stress for on-call engineers
- Longer time to resolution
- Worse customer experience

Historical data shows Friday deployments have 2.5x higher incident rate due to rushed fixes and reduced monitoring.

## Scope

**Applies to**:
- DevOps Engineers
- Developers with deploy access
- Anyone triggering production deployments

**Applies when**:
- Any production deployment
- Any production configuration change
- Any database migration to production

## Compliance

### How to Follow

1. Plan deployments for Monday-Thursday
2. If Thursday deployment, ensure monitoring through Friday morning
3. Schedule Friday deployments for the following Monday
4. If urgent, follow exception process

### Verification

```
CHECKLIST:
- [ ] Is today Friday after 14:00?
- [ ] If yes, do I have leadership approval?
- [ ] If no approval, have I rescheduled to Monday?
```

## Exceptions

| Exception | Approval Required | Example |
|-----------|-------------------|---------|
| Critical security patch | CTO or VP Engineering | Zero-day vulnerability |
| P0 production incident fix | On-call lead | System down |
| Contractual obligation | Leadership + Customer approval | SLA commitment |

### Exception Process

1. Document the urgency
2. Get verbal approval from authorized approver
3. Ensure on-call coverage for weekend
4. Have rollback plan ready
5. Monitor extra closely

## Enforcement

**Mechanism**:
- CI/CD pipeline blocks Friday deploys by default
- Manual override requires approval code
- Audit log of all Friday deployments

**Consequence of violation**:
- Deployment without approval: Incident report required
- Repeated violations: Removal of deploy access
- If incident occurs: Post-mortem mandatory

## Examples

### Correct ✅

```
Scenario: Feature ready Thursday evening
Action: Schedule deployment for Monday morning
Result: Safe deployment with full team available
```

### Incorrect ❌

```
Scenario: Feature ready Friday afternoon
Action: Deploy immediately without approval
Result: Bug discovered Saturday, 6-hour outage, weekend incident response
```

## Related Rules

- `rules/deployment-checklist.md` - Pre-deployment requirements
- `rules/rollback-plan.md` - Mandatory rollback procedures

## Changelog

| Date | Change |
|------|--------|
| 2026-01-22 | Initial version |

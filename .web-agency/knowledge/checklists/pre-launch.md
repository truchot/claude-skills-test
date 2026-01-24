---
id: "CHECK-001"
title: "Pre-Launch Checklist"
category: "release"
gate: "🔴 Release Approval"
tags: ["launch", "release", "production", "qa"]
created: "2026-01-22"
updated: "2026-01-22"
---

# Pre-Launch Checklist

## Purpose

Verify that all quality, operational, and business requirements are met before releasing to production. This checklist supports the 🔴 Release Approval gate.

## When to Use

- **Before**: Any production release (features, updates, hotfixes)
- **Who**: QA Engineer leads, with sign-off from relevant roles
- **Gate**: 🔴 BLOCKING - Cannot proceed without completion

## Prerequisites

- [ ] All development work complete
- [ ] Code merged to release branch
- [ ] Staging deployment successful

## Checklist

### Quality Assurance

- [ ] **All automated tests passing**
  - Details: Unit, integration, and E2E tests in CI
  - Pass criteria: 100% pass rate, no skipped critical tests

- [ ] **No P0/P1 bugs open**
  - Details: Check bug tracker for blocking issues
  - Pass criteria: Zero P0, Zero P1 against this release

- [ ] **Regression testing complete**
  - Details: Run full regression suite on staging
  - Pass criteria: All regression tests pass

- [ ] **Performance acceptable**
  - Details: Load testing results within SLA
  - Pass criteria: Response times < target, no degradation

- [ ] **Security review complete**
  - Details: Security scan, dependency audit
  - Pass criteria: No critical/high vulnerabilities

### Operations

- [ ] **Monitoring configured**
  - Details: Alerts, dashboards, logs for new features
  - Pass criteria: Can detect and alert on failures

- [ ] **Rollback plan documented**
  - Details: Step-by-step rollback procedure
  - Pass criteria: Tested rollback procedure exists

- [ ] **Database migrations tested**
  - Details: Migrations run on staging, reversible
  - Pass criteria: Forward and backward migrations work

- [ ] **Infrastructure ready**
  - Details: Capacity, scaling, dependencies
  - Pass criteria: No infrastructure blockers

- [ ] **On-call aware**
  - Details: On-call team briefed on release
  - Pass criteria: On-call has runbook

### Business

- [ ] **Stakeholders notified**
  - Details: PM, leadership, affected teams informed
  - Pass criteria: No objections raised

- [ ] **Release notes prepared**
  - Details: User-facing changes documented
  - Pass criteria: Notes reviewed and approved

- [ ] **Support team trained**
  - Details: Support knows new features/changes
  - Pass criteria: Support documentation updated

- [ ] **Marketing/comms ready**
  - Details: If public announcement needed
  - Pass criteria: Comms scheduled (if applicable)

### Documentation

- [ ] **User documentation updated**
  - Details: Help docs, guides for new features
  - Pass criteria: Docs published or staged

- [ ] **Technical documentation updated**
  - Details: API docs, architecture docs
  - Pass criteria: Docs accurate for new version

## Completion

### All Items Pass

```
GATE APPROVED:
✅ QA Engineer signs off
✅ DevOps Engineer confirms operational readiness
✅ Product Manager confirms business readiness

→ Proceed to production deployment
```

### Items Fail

| Failed Item Type | Action |
|------------------|--------|
| P0/P1 bug | BLOCK - Fix before release |
| Security issue | BLOCK - Fix before release |
| Missing docs | Can proceed, must complete within 24h |
| Monitoring gap | Can proceed if manual monitoring in place |

## Evidence

- [ ] Screenshot of passing CI/CD pipeline
- [ ] Link to QA test results
- [ ] Sign-off from QA Engineer
- [ ] Sign-off from DevOps Engineer
- [ ] Sign-off from Product Manager

## Related Checklists

- `checklists/post-launch.md` - Verification after deployment
- `checklists/rollback.md` - Emergency rollback procedure

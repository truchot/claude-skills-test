---
name: "Scope Creep Prevention"
category: "project-management"
tags: ["scope", "change-management", "stakeholders"]
created: "2026-01-22"
updated: "2026-01-22"
---

# Scope Creep Prevention

## Problem

Stakeholders continuously add requirements during a project, causing timeline delays, budget overruns, and team burnout.

## Context

This problem occurs when:
- Project is already in progress
- Initial scope was loosely defined
- Multiple stakeholders have input
- "One more thing" culture exists

## Forces

- **Stakeholder satisfaction**: Want to deliver what stakeholders want
- **Project constraints**: Limited time and budget
- **Team capacity**: Developers can only do so much
- **Quality requirements**: Adding scope often reduces quality

## Solution

Implement a formal change request process that makes the cost of changes visible.

### Steps

1. **Define scope clearly upfront**
   - Document what's IN scope
   - Document what's OUT of scope (equally important)
   - Get formal sign-off

2. **Establish change request process**
   - Any new requirement triggers a Change Request
   - CR includes impact assessment
   - CR requires stakeholder approval

3. **Make costs visible**
   - Show impact on timeline
   - Show impact on budget
   - Show what gets cut if scope is added

4. **Offer trade-offs, not just "no"**
   - "We can add X if we remove Y"
   - "We can add X if we extend timeline by Z"

### Example

```yaml
example:
  situation: "Client wanted to add payment feature mid-project"
  application: |
    1. Created formal Change Request
    2. Estimated 2 weeks additional effort
    3. Presented options:
       a) Add payment, delay launch 2 weeks
       b) Add payment, cut reporting feature
       c) Launch on time, add payment in v2
    4. Client chose option (c)
  result: "Launched on time, payment added in phase 2"
```

## Consequences

### Positive

- Clear boundaries understood by all
- Timeline and budget more predictable
- Team not overworked
- Quality maintained
- Decisions documented

### Negative

- Some stakeholders feel restricted
- More overhead for small changes
- Requires discipline to enforce
- May seem bureaucratic

## Related Patterns

- `patterns/project-management/change-request.md` - The CR process itself
- `patterns/communication/stakeholder-management.md` - Managing expectations

## References

- PMI PMBOK scope management
- Agile change management practices

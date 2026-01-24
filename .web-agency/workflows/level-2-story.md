---
name: level-2-story
description: User story or feature that takes 1-5 days. Requires planning and review.
complexity: "1-5 days"
gates: [🟡 Technical approach, 🟡 Code review, 🟡 QA sign-off]
phases: [planning, implementation, testing, review]
---

# Level 2: Story Workflow

## When to Use

- User story with clear acceptance criteria
- Feature enhancement
- Integration with external system
- Significant refactoring
- Bug requiring investigation

## NOT for

- Tasks under 1 day → Level 1
- Features needing UX design → Level 3
- Multi-week epics → Level 3 or 4

## Workflow

```
┌──────────────────────────────────┐
│  1. PLANNING                     │
│  - Understand requirements       │
│  - Technical approach  🟡        │
│  - Task breakdown               │
│  (0.5 day)                      │
└────────┬─────────────────────────┘
         │
         ▼
┌──────────────────────────────────┐
│  2. IMPLEMENTATION               │
│  - Code development              │
│  - Unit tests                    │
│  - Self-testing                  │
│  (2-4 days)                     │
└────────┬─────────────────────────┘
         │
         ▼
┌──────────────────────────────────┐
│  3. CODE REVIEW  🟡              │
│  - Peer review                   │
│  - Address feedback              │
│  (0.5 day)                      │
└────────┬─────────────────────────┘
         │
         ▼
┌──────────────────────────────────┐
│  4. QA TESTING  🟡               │
│  - Test against acceptance       │
│  - Regression testing            │
│  (0.5-1 day)                    │
└────────┬─────────────────────────┘
         │
         ▼
┌──────────────────────────────────┐
│  5. MERGE & DEPLOY               │
│  - Merge to main                 │
│  - Deploy to staging             │
│  - Verify in staging             │
└──────────────────────────────────┘
```

## Roles Involved

| Role | Phase | Responsibility |
|------|-------|----------------|
| Product Manager | Planning | Clarify requirements |
| Developer | All | Implementation |
| Lead Developer | Planning, Review | Approach, code review |
| QA Engineer | Testing | Verify quality |

## Gates

```yaml
gates:
  technical_approach:
    type: "🟡 ADVISORY"
    when: "Before implementation starts"
    who: "Lead Developer"
    criteria:
      - "Approach makes sense"
      - "Risks identified"
      - "Estimate is reasonable"

  code_review:
    type: "🟡 ADVISORY"
    when: "After implementation"
    who: "Peer Developer"
    criteria:
      - "Meets coding standards"
      - "Tests adequate"
      - "No obvious issues"

  qa_signoff:
    type: "🟡 ADVISORY"
    when: "After code review"
    who: "QA Engineer"
    criteria:
      - "Acceptance criteria met"
      - "No regressions found"
      - "Edge cases handled"
```

## Inputs Required

```yaml
story_input:
  ticket:
    id: "[STORY-XXX]"
    title: "[Story title]"
    description: "[User story format]"
    acceptance_criteria:
      - "[AC 1]"
      - "[AC 2]"
    priority: "[P1|P2|P3]"

  context:
    related_stories: ["[If any]"]
    dependencies: ["[Blockers]"]
    technical_notes: ["[Existing context]"]
```

## Outputs Produced

```yaml
story_output:
  planning:
    approach_doc: "[Brief technical approach]"
    task_breakdown:
      - task: "[Sub-task 1]"
        estimate: "[hours]"
      - task: "[Sub-task 2]"
        estimate: "[hours]"

  code:
    branch: "story/[ticket-id]-[short-description]"
    pr: "[PR link]"
    commits: "[Number of commits]"

  testing:
    unit_tests: "[Tests added/modified]"
    manual_tests: "[What was tested]"
    qa_report: "[QA findings]"

  documentation:
    updated: "[Files updated]"
```

## Process Details

### 1. Planning (0.5 day)

**Understand Requirements:**
- Review story and acceptance criteria
- Clarify ambiguities with Product Manager
- Identify edge cases

**Technical Approach:**
- Identify files/components affected
- Outline implementation approach
- Identify risks and dependencies
- Get Lead Developer input

**Task Breakdown:**
- Break into < 1 day tasks
- Estimate each task
- Sequence tasks

### 2. Implementation (2-4 days)

**Development:**
- Follow the planned approach
- Keep commits small and focused
- Write tests alongside code
- Update documentation

**Self-Testing:**
- Run full test suite
- Test all acceptance criteria
- Test edge cases
- Check for regressions

### 3. Code Review (0.5 day)

**Create PR:**
- Clear description
- Link to ticket
- Screenshots if UI change
- Test instructions

**Review Process:**
- Address all feedback
- Discuss disagreements
- Don't drag out

### 4. QA Testing (0.5-1 day)

**Testing:**
- Test all acceptance criteria
- Exploratory testing
- Cross-browser/device if applicable
- Performance spot check

**Bug Fixing:**
- Fix issues found
- Re-test fixes

### 5. Merge & Deploy

**Merge:**
- Squash and merge
- Delete feature branch
- Update ticket

**Deploy:**
- Deploy to staging
- Smoke test in staging
- Monitor for issues

## Rules

### DO
- Plan before coding
- Test as you go
- Communicate blockers early
- Keep scope focused

### DO NOT
- Skip the planning phase
- Gold-plate the solution
- Ignore QA feedback
- Deploy on Friday

## Escalation

| Situation | Action |
|-----------|--------|
| Scope is bigger than planned | Discuss with PM, potentially split |
| Technical blocker | Escalate to Lead/Architect |
| QA finds major issues | Fix before merge, extend timeline |
| Requirements unclear | Stop and clarify, don't guess |

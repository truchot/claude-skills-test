---
name: level-3-feature
description: Feature requiring design, architecture, and multi-person effort. Takes 1-4 weeks.
complexity: "1-4 weeks"
gates: [🔴 PRD approval, 🔴 Architecture review, 🟡 Design approval, 🟡 Code review, 🔴 QA release sign-off]
phases: [specification, design, architecture, implementation, testing, release]
---

# Level 3: Feature Workflow

## When to Use

- New feature with UX implications
- Major enhancement to existing functionality
- Cross-component changes
- Features requiring stakeholder approval
- Anything with user-facing design

## NOT for

- Small improvements → Level 1 or 2
- Products with multiple features → Level 4
- Hotfixes → Level 0

## Workflow

```
┌─────────────────────────────────────────┐
│  1. SPECIFICATION  🔴 BLOCKING          │
│  - Requirements gathering               │
│  - PRD creation and approval            │
│  (2-3 days)                            │
└────────┬────────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────────┐
│  2. DESIGN  🟡 ADVISORY                 │
│  - UX research/wireframes               │
│  - UI design                            │
│  - Design review                        │
│  (3-5 days)                            │
└────────┬────────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────────┐
│  3. ARCHITECTURE  🔴 BLOCKING           │
│  - Technical design                     │
│  - ADR if significant decision          │
│  - Architecture review                  │
│  (2-3 days)                            │
└────────┬────────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────────┐
│  4. IMPLEMENTATION                      │
│  - Sprint planning                      │
│  - Development (multiple stories)       │
│  - Code reviews (ongoing)               │
│  (1-3 weeks)                           │
└────────┬────────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────────┐
│  5. TESTING                             │
│  - Integration testing                  │
│  - User acceptance testing              │
│  - Performance testing                  │
│  (3-5 days)                            │
└────────┬────────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────────┐
│  6. RELEASE  🔴 BLOCKING                │
│  - Release preparation                  │
│  - Staged rollout                       │
│  - Monitoring                           │
│  (1-2 days)                            │
└─────────────────────────────────────────┘
```

## Roles Involved

| Role | Phases | Responsibility |
|------|--------|----------------|
| Product Manager | Specification | PRD, requirements |
| UX Designer | Design | Wireframes, mockups |
| Tech Architect | Architecture | Technical design, ADR |
| Lead Developer | Architecture, Implementation | Approach, oversight |
| Developer | Implementation | Code |
| QA Engineer | Testing, Release | Quality gates |
| Project Manager | All | Coordination |
| Scrum Master | Implementation | Ceremonies |

## Gates

```yaml
gates:
  prd_approval:
    type: "🔴 BLOCKING"
    when: "Before design starts"
    who: "Stakeholders"
    criteria:
      - "Problem clearly stated"
      - "Success metrics defined"
      - "Scope bounded"
      - "Out-of-scope explicit"
    deliverable: ".project/04-specs/features/[feature]/prd.md"

  design_review:
    type: "🟡 ADVISORY"
    when: "Before architecture starts"
    who: "Product Manager, Stakeholders"
    criteria:
      - "Addresses user needs"
      - "Accessibility considered"
      - "All states designed"
    deliverable: "Figma link + design spec"

  architecture_review:
    type: "🔴 BLOCKING"
    when: "Before implementation starts"
    who: "Tech Architect, Lead Developer"
    criteria:
      - "Approach is sound"
      - "Risks identified"
      - "ADR written if significant"
    deliverable: "Technical design doc"

  code_review:
    type: "🟡 ADVISORY"
    when: "Throughout implementation"
    who: "Peers"
    criteria:
      - "Standards followed"
      - "Tests adequate"
    deliverable: "Approved PRs"

  qa_release_signoff:
    type: "🔴 BLOCKING"
    when: "Before production release"
    who: "QA Engineer"
    criteria:
      - "All acceptance criteria met"
      - "No P0/P1 bugs"
      - "Performance acceptable"
      - "Regression suite passes"
    deliverable: "QA sign-off document"
```

## Inputs Required

```yaml
feature_input:
  request:
    source: "[Who requested]"
    business_case: "[Why this feature]"
    target_users: "[Who benefits]"

  constraints:
    budget: "[If applicable]"
    deadline: "[If applicable]"
    dependencies: ["[External dependencies]"]
```

## Outputs Produced

```yaml
feature_output:
  specification:
    prd: ".project/04-specs/features/[feature]/prd.md"
    user_stories: "[List of stories]"

  design:
    wireframes: "[Link]"
    mockups: "[Link]"
    design_spec: "[Link]"

  architecture:
    technical_design: ".project/04-specs/features/[feature]/technical-design.md"
    adr: ".project/03-architecture/decisions/ADR-XXX.md"  # If applicable

  implementation:
    epic: "[EPIC-XXX]"
    stories: ["[STORY-XXX]", "[STORY-YYY]"]
    prs: ["[PR links]"]

  testing:
    test_plan: ".project/05-tests/[feature]/test-plan.md"
    test_results: ".project/05-tests/[feature]/results.md"

  release:
    release_notes: "[Release notes]"
    runbook: "[If applicable]"
```

## Process Details

### 1. Specification (2-3 days)

**Requirements Gathering:**
- Stakeholder interviews
- User research (if available)
- Competitor analysis

**PRD Creation:**
- Problem statement
- Success metrics
- User stories
- Acceptance criteria
- Out of scope

**PRD Approval: 🔴 BLOCKING**
- Review with stakeholders
- Address feedback
- Get sign-off

### 2. Design (3-5 days)

**UX Design:**
- User flows
- Wireframes
- Usability considerations

**UI Design:**
- Visual mockups
- All states (empty, loading, error, success)
- Responsive breakpoints

**Design Review: 🟡 ADVISORY**
- Present to stakeholders
- Gather feedback
- Iterate

### 3. Architecture (2-3 days)

**Technical Design:**
- Component architecture
- Data model changes
- API design
- Integration approach

**ADR (if applicable):**
- Document significant decisions
- Alternatives considered
- Trade-offs

**Architecture Review: 🔴 BLOCKING**
- Review with Tech Architect
- Validate approach
- Finalize design

### 4. Implementation (1-3 weeks)

**Sprint Planning:**
- Break into stories
- Estimate effort
- Prioritize

**Development:**
- Daily standups
- Continuous integration
- Ongoing code reviews

**Tracking:**
- Burndown monitoring
- Risk management
- Stakeholder updates

### 5. Testing (3-5 days)

**Testing Activities:**
- Integration testing
- User acceptance testing
- Performance testing
- Security review (if applicable)

**Bug Fixing:**
- Triage by severity
- Fix P0/P1 before release
- P2/P3 can be backlogged

### 6. Release (1-2 days)

**Preparation:**
- Release notes
- Documentation updates
- Training (if needed)

**Rollout: 🔴 BLOCKING (QA Sign-off)**
- Staged rollout (canary/percentage)
- Monitoring
- Rollback plan ready

**Post-Release:**
- Monitor metrics
- Gather feedback
- Close out project

## Rules

### DO
- Get PRD approved before design
- Get architecture approved before coding
- Test thoroughly before release
- Communicate progress regularly

### DO NOT
- Skip specification phase
- Design while coding
- Rush to release without QA
- Ignore stakeholder feedback

## Escalation

| Situation | Action |
|-----------|--------|
| Scope creep | Formal change request to PM |
| Technical blocker | Escalate to Architect |
| Timeline at risk | Alert PM and stakeholders |
| Major bug found late | Delay release, fix first |

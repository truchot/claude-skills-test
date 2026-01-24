# Phase Gates - Two-Phase Execution Model

## Purpose

Enforce strict separation between Planning and Development phases to prevent:
- Architecture decisions made during development
- Conflicting implementations between developers
- Costly rework due to late changes
- Context loss between agents

---

## The Two-Phase Model

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           PHASE 1: PLANNING                                  │
│                                                                              │
│  Analyst → Product Manager → Tech Architect                                  │
│                                                                              │
│  Outputs:                                                                    │
│  ├── PRD (requirements)                                                      │
│  ├── Architecture (system design)                                            │
│  ├── ADRs (decisions)                                                        │
│  ├── API Contracts (if applicable)                                           │
│  └── Data Model (if applicable)                                              │
│                                                                              │
│  ═══════════════════════════════════════════════════════════════════════════ │
│  🔴 PLANNING GATE: All artifacts approved before development starts          │
│  ═══════════════════════════════════════════════════════════════════════════ │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                          PHASE 2: DEVELOPMENT                                │
│                                                                              │
│  Lead Developer → Developer → QA → DevOps                                    │
│                                                                              │
│  Rules:                                                                      │
│  ├── Architecture is FROZEN                                                  │
│  ├── API Contracts are FROZEN                                                │
│  ├── Changes require Change Request (CR)                                     │
│  └── CRs go back through Planning Gate                                       │
│                                                                              │
│  Outputs:                                                                    │
│  ├── Implementation Briefs                                                   │
│  ├── Code                                                                    │
│  ├── Tests                                                                   │
│  └── Documentation                                                           │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Phase 1: Planning

### Roles Active
- Product Manager
- Tech Architect
- (Optionally) UX Designer

### Required Artifacts

```yaml
planning_artifacts:
  mandatory:
    prd:
      path: ".project/01-vision/PRD.md"
      owner: "Product Manager"
      gate: "🔴 BLOCKING"
      checklist:
        - "[ ] Problem statement clear"
        - "[ ] Success metrics defined"
        - "[ ] Scope explicitly stated (in/out)"
        - "[ ] User personas identified"
        - "[ ] Stakeholder approved"

    architecture:
      path: ".project/03-architecture/overview.md"
      owner: "Tech Architect"
      gate: "🔴 BLOCKING"
      checklist:
        - "[ ] System components defined"
        - "[ ] Technology stack chosen"
        - "[ ] Key decisions documented as ADRs"
        - "[ ] Security considerations addressed"
        - "[ ] Scalability addressed"

    stack:
      path: ".project/03-architecture/stack.md"
      owner: "Tech Architect"
      gate: "🟡 ADVISORY"
      checklist:
        - "[ ] All technologies listed"
        - "[ ] Versions specified"
        - "[ ] Rationale for choices"

  conditional:
    api_contract:
      when: "Project has API"
      path: ".project/03-architecture/api-contract.yaml"
      owner: "Tech Architect"
      gate: "🔴 BLOCKING"
      checklist:
        - "[ ] All endpoints defined"
        - "[ ] Request/response schemas"
        - "[ ] Authentication specified"
        - "[ ] Error responses defined"

    data_model:
      when: "Project has database"
      path: ".project/03-architecture/data-model.md"
      owner: "Tech Architect"
      gate: "🔴 BLOCKING"
      checklist:
        - "[ ] All entities defined"
        - "[ ] Relationships documented"
        - "[ ] Indexes planned"
        - "[ ] Migration strategy"

    adrs:
      when: "Significant decisions made"
      path: ".project/03-architecture/decisions/ADR-*.md"
      owner: "Tech Architect"
      gate: "🟡 ADVISORY"
      minimum: 1
      checklist:
        - "[ ] Context explained"
        - "[ ] Options considered"
        - "[ ] Decision stated"
        - "[ ] Consequences listed"
```

### Planning Gate Validation

```yaml
planning_gate:
  name: "Planning Approval"
  type: "🔴 BLOCKING"

  validation:
    all_artifacts_exist:
      check: "All mandatory artifacts created"
      fail_action: "List missing artifacts"

    all_checklists_complete:
      check: "All checklist items checked"
      fail_action: "List incomplete items"

    stakeholder_approval:
      check: "PRD has stakeholder sign-off"
      fail_action: "Request stakeholder review"

  on_pass:
    - "Set state.planning_approved = true"
    - "Freeze architecture artifacts"
    - "Allow development phase to begin"

  on_fail:
    - "List all failing criteria"
    - "Block development"
    - "Request fixes"
```

---

## Phase 2: Development

### Prerequisites

```yaml
development_prerequisites:
  required:
    - "state.planning_approved == true"
    - "All 🔴 BLOCKING gates from planning passed"

  on_missing:
    action: "Block development"
    message: |
      ⛔ Development cannot start.

      Planning artifacts are incomplete or not approved.
      Missing: {list_of_missing}

      Please complete planning phase first.
```

### Frozen Artifacts

```yaml
frozen_artifacts:
  description: "These cannot change during development without a Change Request"

  frozen:
    architecture:
      files:
        - ".project/03-architecture/overview.md"
        - ".project/03-architecture/stack.md"
      reason: "Ensures all developers work with same foundation"

    api_contract:
      files:
        - ".project/03-architecture/api-contract.yaml"
      reason: "Prevents breaking changes and conflicts"

    data_model:
      files:
        - ".project/03-architecture/data-model.md"
      reason: "Database changes are costly"

    key_adrs:
      files:
        - ".project/03-architecture/decisions/ADR-*.md"
      reason: "Decisions are commitments"

  enforcement:
    on_edit_attempt:
      action: "Warn and require CR"
      message: |
        ⚠️ This artifact is FROZEN during development.

        To modify, you must:
        1. Create a Change Request (CR)
        2. Assess impact on existing work
        3. Get CR approved
        4. Update artifact through planning process
```

### Change Request Process

```yaml
change_request:
  trigger:
    - "Developer discovers architecture won't work"
    - "New requirement discovered"
    - "Technical constraint requires change"

  process:
    step_1:
      action: "Create CR document"
      template: |
        # Change Request: CR-{number}

        ## What Needs to Change
        [Artifact and specific change]

        ## Why
        [Reason for change]

        ## Impact Assessment
        - **Existing code**: [What needs to change]
        - **Timeline**: [Impact on schedule]
        - **Risk**: [Associated risks]

        ## Proposed Solution
        [How to address it]

    step_2:
      action: "Impact review"
      roles: ["Tech Architect", "Lead Developer"]
      gate: "🔴 BLOCKING"

    step_3:
      action: "Update planning artifacts"
      roles: ["Tech Architect"]
      note: "This unfreezes the artifact temporarily"

    step_4:
      action: "Re-freeze and continue"
      roles: ["Lead Developer"]

  tracking:
    location: ".project/07-audit/change-requests/"
    format: "CR-{number}-{short-description}.md"
```

---

## Roles Active in Each Phase

### Planning Phase

```yaml
planning_roles:
  active:
    product_manager:
      primary_agents:
        - requirements_discovery
        - prd_writer
        - scope_guardian
      outputs: ["PRD", "User Stories", "Acceptance Criteria"]

    tech_architect:
      primary_agents:
        - system_architecture
        - api_design
        - data_modeling
        - security_architecture
        - adr_writer
      outputs: ["Architecture", "ADRs", "API Contract", "Data Model"]

    ux_designer:
      if: "Project has UI"
      outputs: ["Wireframes", "Mockups", "User Flows"]

  inactive:
    developer:
      reason: "No code until planning approved"

    devops_engineer:
      reason: "Infrastructure planning only"

    qa_engineer:
      reason: "Test planning only"
```

### Development Phase

```yaml
development_roles:
  active:
    lead_developer:
      primary_agents:
        - task_breakdown
        - estimation
        - code_review
        - sprint_planning
      outputs: ["Implementation Briefs", "Estimates", "Reviews"]

    developer:
      primary_agents:
        - frontend_implementation
        - backend_implementation
        - testing
        - debugging
      outputs: ["Code", "Tests", "Documentation"]

    qa_engineer:
      primary_agents:
        - testing
        - security_check
      outputs: ["Test Results", "Bug Reports"]

    devops_engineer:
      primary_agents:
        - ci_cd
        - deployment
        - monitoring
      outputs: ["Pipelines", "Deployments"]

  limited:
    product_manager:
      allowed: "Clarify requirements, answer questions"
      not_allowed: "Add new requirements (requires CR)"

    tech_architect:
      allowed: "Answer questions, clarify decisions"
      not_allowed: "Change architecture (requires CR)"
```

---

## Gate Enforcement Rules

### During Planning

```yaml
planning_enforcement:
  role_boundaries:
    product_manager:
      can:
        - "Define requirements"
        - "Write PRD"
        - "Prioritize features"
      cannot:
        - "Make technical decisions"
        - "Choose technology stack"

    tech_architect:
      can:
        - "Design architecture"
        - "Choose technologies"
        - "Write ADRs"
      cannot:
        - "Write implementation code"
        - "Define business requirements"

  artifact_dependencies:
    sequence:
      - "PRD must exist before Architecture"
      - "Architecture must exist before API Contract"
      - "All above must be approved before Development"
```

### During Development

```yaml
development_enforcement:
  frozen_artifact_protection:
    on_attempt_to_modify:
      - "Display warning"
      - "Require explicit acknowledgment"
      - "Log modification attempt"
      - "Require CR for significant changes"

  scope_protection:
    new_feature_request:
      - "Route to Product Manager"
      - "Assess if in scope"
      - "If not in scope, create CR or defer"

  architecture_questions:
    on_conflict:
      - "Route to Tech Architect"
      - "If resolution requires change, create CR"
      - "If clarification only, document understanding"
```

---

## State Transitions

```yaml
state_machine:
  states:
    - "not_started"
    - "planning_in_progress"
    - "planning_review"
    - "planning_approved"
    - "development_in_progress"
    - "development_review"
    - "completed"

  transitions:
    not_started → planning_in_progress:
      trigger: "Project kickoff"

    planning_in_progress → planning_review:
      trigger: "All artifacts created"
      condition: "All mandatory artifacts exist"

    planning_review → planning_approved:
      trigger: "Planning gate passed"
      condition: "All checklists complete, stakeholder approved"
      action: "Freeze artifacts"

    planning_approved → development_in_progress:
      trigger: "Development starts"
      prerequisite: "planning_approved == true"

    development_in_progress → planning_in_progress:
      trigger: "Change Request approved"
      condition: "CR requires planning changes"
      action: "Unfreeze specific artifacts"

    development_in_progress → development_review:
      trigger: "All features implemented"

    development_review → completed:
      trigger: "QA passed, deployment approved"
```

---

## Practical Examples

### Example 1: Attempting Code Before Planning

```
User: "Let's start building the login page"

AI Response:
⛔ I cannot proceed with implementation yet.

**Current State**: Planning in progress

**Missing Artifacts**:
- [ ] PRD not approved
- [ ] Architecture not defined
- [ ] Auth strategy not decided (needs ADR)

**Next Steps**:
1. Complete the PRD with authentication requirements
2. Have Tech Architect define auth strategy
3. Get planning approval
4. Then we can implement the login page

Would you like to start with the PRD?
```

### Example 2: Attempting to Change Architecture During Development

```
User: "Let's switch from PostgreSQL to MongoDB"

AI Response:
⚠️ The data model is FROZEN during development.

**Current State**: Development in progress
**Frozen Artifact**: `.project/03-architecture/data-model.md`

**Impact of This Change**:
- All existing models need rewrite
- Queries need refactoring
- Migrations become complex

**Options**:
1. **Create Change Request** - Formally assess impact and get approval
2. **Defer to Next Version** - Keep current approach, plan for future
3. **Discuss with Architect** - Understand if there's a way to address the underlying need

Which would you like to do?
```

### Example 3: Planning Gate Check

```
User: "Is planning complete? Can we start development?"

AI Response:
📋 **Planning Gate Validation**

**PRD** (.project/01-vision/PRD.md)
- [x] Problem statement clear
- [x] Success metrics defined
- [x] Scope explicitly stated
- [ ] ⚠️ Stakeholder approval pending

**Architecture** (.project/03-architecture/overview.md)
- [x] System components defined
- [x] Technology stack chosen
- [x] Key decisions documented

**API Contract** (.project/03-architecture/api-contract.yaml)
- [x] Endpoints defined
- [x] Schemas complete
- [x] Auth specified

**Result**: ❌ CANNOT PROCEED

**Blocking Items**:
1. PRD needs stakeholder sign-off

Once resolved, development can begin.
```

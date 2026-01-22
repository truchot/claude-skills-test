---
name: task-breakdown
parent_role: lead-developer
description: Decomposes features and user stories into implementable tasks with clear boundaries, dependencies, and acceptance criteria.
triggers: ["break down", "task list", "decompose", "subtasks", "work breakdown", "WBS", "implementation tasks"]
outputs: [Task List, Work Breakdown Structure, Dependency Map, Implementation Plan]
gate: 🟡 ADVISORY - Task breakdown reviewed before estimation
---

# Task Breakdown Agent

## Purpose

Transform features into implementable tasks. A good breakdown enables accurate estimation, parallel work, and clear progress tracking. Every task should be completable by one developer in one day or less.

## When to Invoke

- Breaking down a new feature for implementation
- Preparing stories for sprint planning
- Creating work breakdown structure
- Identifying dependencies between work items
- Clarifying implementation approach

## Breakdown Principles

```yaml
breakdown_principles:
  principle_1:
    name: "One day max"
    rule: "No task should take more than one day"
    why: "Enables accurate estimation and daily progress"
    action: "Split larger tasks further"

  principle_2:
    name: "Single responsibility"
    rule: "Each task does one thing"
    why: "Clear scope, easy to review"
    action: "If task has 'and' in description, split it"

  principle_3:
    name: "Testable outcome"
    rule: "Each task has a verifiable result"
    why: "Know when it's done"
    action: "Define 'done' criteria for each task"

  principle_4:
    name: "Minimal dependencies"
    rule: "Tasks should be as independent as possible"
    why: "Enables parallel work, reduces blocking"
    action: "Identify and document all dependencies"
```

## Procedure

### Phase 1: Understand the Feature

```yaml
step_1_understand:
  action: "Gather all context about the feature"

  inputs:
    - "User story / PRD section"
    - "Acceptance criteria"
    - "Mockups / wireframes"
    - "API contracts (if any)"
    - "Related technical decisions"

  clarify:
    questions:
      - "What is the user trying to accomplish?"
      - "What are the success criteria?"
      - "What are the edge cases?"
      - "What are the non-functional requirements?"
      - "What existing code will be affected?"

    if_unclear: "Ask Product Manager / Tech Architect before proceeding"

  document:
    feature_summary:
      name: "[Feature name]"
      objective: "[What it achieves]"
      user_story: "[As a... I want... so that...]"
      acceptance_criteria: ["[AC 1]", "[AC 2]"]
      constraints: ["[Technical constraints]"]
```

### Phase 2: Identify Components

```yaml
step_2_identify_components:
  action: "Map the feature to technical components"

  decomposition_layers:
    user_interface:
      - "Pages / screens"
      - "Components"
      - "Forms / inputs"
      - "Validation"
      - "Error states"
      - "Loading states"

    api_layer:
      - "Endpoints"
      - "Request/response handling"
      - "Validation"
      - "Error handling"
      - "Authentication/authorization"

    business_logic:
      - "Services"
      - "Use cases"
      - "Business rules"
      - "Calculations"

    data_layer:
      - "Database schema"
      - "Migrations"
      - "Queries"
      - "Caching"

    infrastructure:
      - "Configuration"
      - "Environment variables"
      - "Third-party integrations"

  component_template:
    layer: "[UI/API/Business/Data/Infra]"
    component: "[Component name]"
    type: "[New/Modify/Remove]"
    complexity: "[Simple/Medium/Complex]"
    dependencies: ["[Other components]"]
```

### Phase 3: Create Task List

```yaml
step_3_create_tasks:
  action: "Convert components into tasks"

  task_creation_rules:
    size: "4-8 hours maximum per task"
    scope: "One logical unit of work"
    output: "Verifiable deliverable"

  task_template:
    id: "T-[XXX]"
    title: "[Action] [Object] [Context]"
    description: "[Detailed description]"
    type: "[feature|fix|refactor|test|docs|chore]"
    layer: "[UI|API|Business|Data|Infra]"
    estimated_effort: "[X hours]"
    dependencies: ["T-XXX"]
    acceptance_criteria:
      - "[What must be true when done]"
    technical_notes:
      - "[Implementation hints]"

  task_naming_conventions:
    pattern: "[Verb] [Noun] [Context]"
    good_examples:
      - "Create user registration form component"
      - "Add email validation to signup API"
      - "Write unit tests for payment service"
      - "Add index on orders.user_id column"
    bad_examples:
      - "Registration" # No verb, too vague
      - "Fix stuff" # Not specific
      - "Work on frontend" # Too broad

  common_task_types:
    database:
      - "Create migration for [table]"
      - "Add index on [columns]"
      - "Update [entity] model"

    api:
      - "Create [endpoint] endpoint"
      - "Add validation for [endpoint]"
      - "Implement [endpoint] error handling"
      - "Write tests for [endpoint]"

    frontend:
      - "Create [component] component"
      - "Add [component] styling"
      - "Implement [component] state management"
      - "Add [component] error handling"
      - "Write tests for [component]"

    integration:
      - "Configure [service] integration"
      - "Implement [service] client"
      - "Add [service] error handling"
      - "Write integration tests for [service]"
```

### Phase 4: Map Dependencies

```yaml
step_4_map_dependencies:
  action: "Identify task dependencies"

  dependency_types:
    blocks:
      meaning: "Must complete before dependent can start"
      example: "Database migration blocks API endpoint"

    informs:
      meaning: "Output needed but can work in parallel"
      example: "API contract informs frontend development"

    tests:
      meaning: "Validates the other task"
      example: "Integration test validates API endpoint"

  dependency_rules:
    minimize: "Fewer dependencies = more parallel work"
    explicit: "Document all dependencies clearly"
    bidirectional: "Note both directions (blocks/blocked by)"

  dependency_analysis:
    critical_path:
      - "Identify longest dependency chain"
      - "This determines minimum duration"
      - "Focus optimization here"

    parallel_opportunities:
      - "Tasks with no dependencies"
      - "Tasks on different layers"
      - "Tasks assignable to different developers"

  visualization: |
    T-001: Create DB migration
       ↓
    T-002: Create API endpoint ──┬── T-003: Write API tests
       ↓                        │
    T-004: Create UI component ──┤
       ↓                        │
    T-005: Add form validation   │
       ↓                        │
    T-006: Integration tests ────┘
```

### Phase 5: Sequence Tasks

```yaml
step_5_sequence:
  action: "Order tasks for optimal execution"

  sequencing_principles:
    foundation_first:
      order: "Data → Business → API → UI"
      why: "Build on stable foundations"

    risk_first:
      order: "Uncertain tasks early"
      why: "Discover problems while there's time"

    value_first:
      order: "Core functionality before polish"
      why: "Deliver value incrementally"

    parallel_when_possible:
      approach: "Different layers, different developers"
      why: "Maximize throughput"

  sprint_distribution:
    if_multi_sprint:
      sprint_1: "Foundation + core happy path"
      sprint_2: "Edge cases + error handling"
      sprint_3: "Polish + optimization"

  sequence_template:
    phase_1_foundation:
      tasks: ["T-001", "T-002"]
      focus: "Database and core logic"
      can_parallelize: false

    phase_2_implementation:
      tasks: ["T-003", "T-004", "T-005"]
      focus: "API and UI"
      can_parallelize: true

    phase_3_validation:
      tasks: ["T-006", "T-007"]
      focus: "Testing and integration"
      can_parallelize: true
```

### Phase 6: Validate Breakdown

```yaml
step_6_validate:
  action: "Review breakdown for completeness"

  validation_checklist:
    coverage:
      - "All acceptance criteria have tasks"
      - "Error handling is included"
      - "Testing is included"
      - "Documentation is included (if needed)"

    size:
      - "No task > 8 hours"
      - "Average task 4-6 hours"
      - "Can track daily progress"

    clarity:
      - "Task titles are descriptive"
      - "Acceptance criteria are specific"
      - "Dependencies are clear"

    completeness:
      - "All layers covered"
      - "Integration points identified"
      - "Edge cases considered"

  common_missing_tasks:
    often_forgotten:
      - "Database migrations"
      - "Error handling"
      - "Loading states"
      - "Empty states"
      - "Validation messages"
      - "Unit tests"
      - "Integration tests"
      - "Documentation updates"
      - "Configuration/env setup"
      - "Code review time"

  review_with_team:
    who: "Developer who will implement"
    why: "Catch missing context, refine estimates"
    outcome: "Adjusted task list"
```

---

## Output: Work Breakdown Structure

```yaml
work_breakdown:
  metadata:
    feature: "[Feature name]"
    story_id: "[PROJ-XXX]"
    created_by: "Lead Developer"
    date: "[YYYY-MM-DD]"
    version: "1.0"

  summary:
    total_tasks: "[N]"
    estimated_effort: "[X days]"
    parallel_tracks: "[N]"
    critical_path_length: "[X days]"

  tasks:
    - id: "T-001"
      title: "[Task title]"
      description: "[Detailed description]"
      type: "[feature|test|docs|chore]"
      layer: "[UI|API|Business|Data]"
      effort: "[X hours]"
      dependencies: []
      blocked_by: []
      acceptance_criteria:
        - "[Criterion 1]"
      assignee_profile: "[junior|mid|senior]"
      technical_notes:
        - "[Note 1]"

  phases:
    - name: "Foundation"
      tasks: ["T-001", "T-002"]
      duration: "[X days]"
      parallel: false

    - name: "Implementation"
      tasks: ["T-003", "T-004", "T-005"]
      duration: "[X days]"
      parallel: true

  dependency_graph: |
    [ASCII representation of dependencies]

  critical_path:
    tasks: ["T-001", "T-002", "T-004", "T-006"]
    duration: "[X days]"

  risks:
    - task: "T-003"
      risk: "[Risk description]"
      mitigation: "[How to address]"
```

---

## Task Breakdown Patterns

```yaml
common_patterns:
  crud_feature:
    tasks:
      - "Create database migration"
      - "Create entity model"
      - "Create repository/data access"
      - "Create service with business logic"
      - "Create API endpoint - Create"
      - "Create API endpoint - Read (single)"
      - "Create API endpoint - Read (list)"
      - "Create API endpoint - Update"
      - "Create API endpoint - Delete"
      - "Write API unit tests"
      - "Create list component"
      - "Create form component"
      - "Create detail view component"
      - "Write frontend unit tests"
      - "Write integration tests"

  form_feature:
    tasks:
      - "Create form component structure"
      - "Add form fields and layout"
      - "Implement client-side validation"
      - "Add error message display"
      - "Add loading state"
      - "Add success state/feedback"
      - "Connect to API endpoint"
      - "Handle API errors"
      - "Write component tests"
      - "Write e2e tests"

  integration_feature:
    tasks:
      - "Research API documentation"
      - "Create integration client"
      - "Implement authentication"
      - "Implement core API calls"
      - "Add error handling"
      - "Add retry logic"
      - "Create webhook receiver (if needed)"
      - "Write integration tests"
      - "Document integration setup"

  search_feature:
    tasks:
      - "Design search index"
      - "Create database indexes"
      - "Implement search query logic"
      - "Create search API endpoint"
      - "Create search UI component"
      - "Add search input with debounce"
      - "Add search results display"
      - "Add no results state"
      - "Add loading state"
      - "Write search tests"
```

---

## HITL Gates

| Gate | Type | When |
|------|------|------|
| Breakdown Review | 🟡 ADVISORY | After initial breakdown |
| Developer Review | 🟡 ADVISORY | Before estimation |
| Sprint Planning | 🟢 AUTOMATIC | When adding to sprint |

---

## Knowledge References

- `knowledge/patterns/task-breakdown.md`
- `knowledge/checklists/task-breakdown.md`
- `knowledge/templates/task-template.md`

---

## Escalation

| Situation | Action |
|-----------|--------|
| Requirements unclear | Block breakdown, request clarification |
| Technical approach uncertain | Spike task first, then break down |
| Task too complex to split | Involve Tech Architect |
| Dependencies on other teams | Document and communicate early |

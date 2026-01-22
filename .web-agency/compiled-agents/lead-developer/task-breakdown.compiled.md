# ===============================================================================
# COMPILED AGENT: Task Breakdown
# ===============================================================================
# Role: Lead Developer
# Compiled: 2026-01-22
# Source: roles/lead-developer/agents/task-breakdown.md
# ===============================================================================

## Quick Reference

```yaml
agent:
  name: task-breakdown
  role: lead-developer
  gate: 🟡 ADVISORY - Task breakdown reviewed before estimation

triggers:
  keywords: ["break down", "task list", "decompose", "subtasks", "work breakdown", "WBS", "implementation tasks"]
  examples:
    - "Break down this feature"
    - "Create task list for implementation"
    - "What tasks are needed for this?"

outputs:
  - Task List
  - Work Breakdown Structure
  - Dependency Map
  - Implementation Plan

context_requirements:
  always_load:
    - "Feature/user story specification"
    - ".project/03-architecture/stack.md"
  if_available:
    - "API contracts"
    - "Mockups/wireframes"
    - "Existing codebase structure"
```

---

## Full Procedure

### Phase 1: Understand the Feature

```yaml
step_1_understand:
  action: "Gather all context"

  inputs:
    - "User story / PRD section"
    - "Acceptance criteria"
    - "Mockups / wireframes"
    - "API contracts (if any)"
    - "Related technical decisions"

  clarify:
    - "What is the user trying to accomplish?"
    - "What are the success criteria?"
    - "What are the edge cases?"
    - "What are the non-functional requirements?"
    - "What existing code will be affected?"

  document:
    feature_summary:
      name: "[Feature name]"
      objective: "[What it achieves]"
      user_story: "[As a... I want... so that...]"
      acceptance_criteria: ["AC 1", "AC 2"]
      constraints: ["Technical constraints"]
```

### Phase 2: Identify Components

```yaml
step_2_components:
  action: "Map feature to technical components"

  layers:
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
    dependencies: ["Other components"]
```

### Phase 3: Create Task List

```yaml
step_3_tasks:
  action: "Convert components into tasks"

  rules:
    size: "4-8 hours maximum per task"
    scope: "One logical unit of work"
    output: "Verifiable deliverable"

  task_template:
    id: "T-XXX"
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

  naming_conventions:
    pattern: "[Verb] [Noun] [Context]"
    good:
      - "Create user registration form component"
      - "Add email validation to signup API"
      - "Write unit tests for payment service"
    bad:
      - "Registration" # No verb, too vague
      - "Fix stuff" # Not specific
      - "Work on frontend" # Too broad
```

### Phase 4: Map Dependencies

```yaml
step_4_dependencies:
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

  rules:
    minimize: "Fewer dependencies = more parallel work"
    explicit: "Document all dependencies clearly"
    bidirectional: "Note both directions"

  critical_path:
    - "Identify longest dependency chain"
    - "This determines minimum duration"
    - "Focus optimization here"
```

### Phase 5: Sequence Tasks

```yaml
step_5_sequence:
  action: "Order tasks for optimal execution"

  principles:
    foundation_first:
      order: "Data -> Business -> API -> UI"
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
    sprint_1: "Foundation + core happy path"
    sprint_2: "Edge cases + error handling"
    sprint_3: "Polish + optimization"
```

### Phase 6: Validate Breakdown

```yaml
step_6_validate:
  action: "Review for completeness"

  checklist:
    coverage:
      - "All acceptance criteria have tasks"
      - "Error handling is included"
      - "Testing is included"
      - "Documentation is included"

    size:
      - "No task > 8 hours"
      - "Average task 4-6 hours"
      - "Can track daily progress"

    clarity:
      - "Task titles are descriptive"
      - "Acceptance criteria are specific"
      - "Dependencies are clear"

  commonly_forgotten:
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
```

---

## Output Template

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
    T-001: Create DB migration
       |
    T-002: Create API endpoint --+-- T-003: Write API tests
       |                         |
    T-004: Create UI component --+
       |
    T-005: Integration tests ----+

  critical_path:
    tasks: ["T-001", "T-002", "T-004", "T-006"]
    duration: "[X days]"

  risks:
    - task: "T-003"
      risk: "[Risk description]"
      mitigation: "[How to address]"
```

---

## Common Breakdown Patterns (Embedded)

### CRUD Feature
```yaml
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
```

### Form Feature
```yaml
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
```

### Integration Feature
```yaml
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
```

### Search Feature
```yaml
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

## Breakdown Principles (Embedded)

```yaml
principles:
  one_day_max:
    rule: "No task should take more than one day"
    why: "Enables accurate estimation and daily progress"
    action: "Split larger tasks further"

  single_responsibility:
    rule: "Each task does one thing"
    why: "Clear scope, easy to review"
    action: "If task has 'and' in description, split it"

  testable_outcome:
    rule: "Each task has a verifiable result"
    why: "Know when it's done"
    action: "Define 'done' criteria for each task"

  minimal_dependencies:
    rule: "Tasks should be as independent as possible"
    why: "Enables parallel work, reduces blocking"
    action: "Identify and document all dependencies"
```

---

## Checklist (Embedded)

### Before Breakdown
```yaml
- [ ] Requirements are clear
- [ ] Acceptance criteria defined
- [ ] Technical approach identified
- [ ] Mockups/API contracts available
```

### Breakdown Quality
```yaml
- [ ] All acceptance criteria covered
- [ ] No task exceeds 8 hours
- [ ] Dependencies are mapped
- [ ] Testing tasks included
- [ ] Error handling considered
- [ ] Documentation tasks included
```

### Validation
```yaml
- [ ] Developer reviewed breakdown
- [ ] Critical path identified
- [ ] Risks documented
- [ ] Parallel opportunities noted
```

---

## HITL Gates

| Gate | Type | When |
|------|------|------|
| Breakdown Review | 🟡 ADVISORY | After initial breakdown |
| Developer Review | 🟡 ADVISORY | Before estimation |
| Sprint Planning | 🟢 AUTOMATIC | When adding to sprint |

---

## Escalation

| Situation | Action |
|-----------|--------|
| Requirements unclear | Block breakdown, request clarification |
| Technical approach uncertain | Spike task first, then break down |
| Task too complex to split | Involve Tech Architect |
| Dependencies on other teams | Document and communicate early |

---
name: routing-rules
description: Semantic routing rules for directing requests to appropriate roles and agents
version: "1.0.0"
---

# Semantic Routing Rules

## Overview

Routing rules determine which role and sub-agent handles a given request. The system uses keyword matching, context analysis, and disambiguation rules to route accurately.

## Routing Algorithm

```yaml
routing_algorithm:
  step_1_extract:
    action: "Extract keywords and intent from request"
    analyze:
      - "Primary nouns (what is being discussed)"
      - "Action verbs (what needs to be done)"
      - "Context clues (project phase, existing artifacts)"

  step_2_match_role:
    action: "Match request to primary role"
    use: "Role keyword mappings"
    fallback: "If unclear, ask for clarification"

  step_3_match_agent:
    action: "Within role, match to specific agent"
    use: "Agent keyword mappings"
    fallback: "Use role default behavior"

  step_4_disambiguation:
    action: "Handle overlapping keywords"
    use: "Disambiguation rules"
    consider: "Current workflow phase, recent context"

  step_5_handoff:
    action: "If agent needs another role's expertise"
    use: "Handoff protocol"
    maintain: "Context and state"
```

## Role Routing Matrix

```yaml
role_routing:
  tech_architect:
    keywords:
      primary:
        - "architecture"
        - "stack"
        - "technology"
        - "framework"
        - "system design"
        - "infrastructure"
        - "database"
        - "API"
        - "security"
        - "performance"
        - "scalability"

      triggers:
        - "What technology should we use?"
        - "How should we design..."
        - "What's the best approach for..."
        - "Architecture for..."
        - "Is this scalable?"

    context_signals:
      strong:
        - "Technical decision needed"
        - "Comparing technologies"
        - "Design patterns"
      moderate:
        - "Implementation approach"
        - "Integration planning"

  product_manager:
    keywords:
      primary:
        - "requirements"
        - "features"
        - "user story"
        - "PRD"
        - "scope"
        - "priority"
        - "roadmap"
        - "backlog"
        - "stakeholder"

      triggers:
        - "What should we build?"
        - "What features do we need?"
        - "Is this in scope?"
        - "What's the priority?"
        - "Define the requirements..."

    context_signals:
      strong:
        - "Feature definition"
        - "Business requirements"
        - "User needs"
      moderate:
        - "Project planning"
        - "Scope discussion"

  lead_developer:
    keywords:
      primary:
        - "estimate"
        - "task"
        - "sprint"
        - "code review"
        - "standards"
        - "breakdown"
        - "velocity"
        - "capacity"

      triggers:
        - "How long will this take?"
        - "Break this down into tasks"
        - "Review this PR"
        - "What's our capacity?"
        - "Plan the sprint"

    context_signals:
      strong:
        - "Estimation needed"
        - "Work planning"
        - "Code quality"
      moderate:
        - "Team coordination"
        - "Technical guidance"

  developer:
    keywords:
      primary:
        - "implement"
        - "code"
        - "build"
        - "fix"
        - "bug"
        - "test"
        - "component"
        - "endpoint"
        - "debug"

      triggers:
        - "Implement this feature"
        - "Write the code for..."
        - "Fix this bug"
        - "Add tests for..."
        - "Build the component"

    context_signals:
      strong:
        - "Implementation work"
        - "Bug fixing"
        - "Writing tests"
      moderate:
        - "Technical implementation"
        - "Code changes"
```

## Agent Routing Within Roles

### Tech Architect Agents

```yaml
tech_architect_agents:
  stack_selection:
    keywords: ["stack", "framework", "library", "choose", "compare", "technology"]
    triggers:
      - "What framework should we use?"
      - "React vs Vue"
      - "Choose a database"
    excludes: ["existing stack", "current technology"]

  api_design:
    keywords: ["API", "endpoint", "REST", "GraphQL", "contract", "versioning"]
    triggers:
      - "Design the API"
      - "API structure"
      - "REST vs GraphQL"
    excludes: ["implement endpoint"]

  data_modeling:
    keywords: ["database", "schema", "model", "entity", "relationship", "migration"]
    triggers:
      - "Design the data model"
      - "Database schema"
      - "Entity relationships"
    excludes: ["query optimization"]

  security_architecture:
    keywords: ["security", "auth", "authentication", "authorization", "OWASP", "encryption"]
    triggers:
      - "Security approach"
      - "Authentication strategy"
      - "How to secure..."
    priority: "High for sensitive data discussions"

  system_architecture:
    keywords: ["system", "component", "deployment", "monolith", "microservices"]
    triggers:
      - "System design"
      - "Component architecture"
      - "Deployment strategy"

  performance_design:
    keywords: ["performance", "caching", "optimization", "speed", "latency"]
    triggers:
      - "How to optimize..."
      - "Caching strategy"
      - "Performance requirements"

  integration_design:
    keywords: ["integration", "third-party", "webhook", "Stripe", "external"]
    triggers:
      - "Integrate with..."
      - "Webhook design"
      - "Third-party service"

  adr_writer:
    keywords: ["ADR", "decision", "document", "record"]
    triggers:
      - "Document this decision"
      - "Create ADR"
      - "Record the choice"
```

### Product Manager Agents

```yaml
product_manager_agents:
  requirements_discovery:
    keywords: ["requirements", "needs", "discovery", "interview", "stakeholder"]
    triggers:
      - "What do users need?"
      - "Gather requirements"
      - "Interview stakeholders"

  scope_guardian:
    keywords: ["scope", "change request", "creep", "in scope", "out of scope"]
    triggers:
      - "Is this in scope?"
      - "Can we add..."
      - "Scope change"
    priority: "High when features being added"

  prd_writer:
    keywords: ["PRD", "specification", "requirements document", "product spec"]
    triggers:
      - "Write the PRD"
      - "Document requirements"
      - "Create specification"

  user_story_writer:
    keywords: ["story", "user story", "acceptance criteria", "INVEST"]
    triggers:
      - "Write user stories"
      - "Create tickets"
      - "Acceptance criteria"

  prioritization:
    keywords: ["priority", "RICE", "MoSCoW", "ranking", "what first"]
    triggers:
      - "What should we build first?"
      - "Prioritize features"
      - "Rank these items"

  roadmap_planning:
    keywords: ["roadmap", "timeline", "release", "quarterly", "planning"]
    triggers:
      - "What's the roadmap?"
      - "Plan the releases"
      - "Quarterly planning"
```

### Lead Developer Agents

```yaml
lead_developer_agents:
  task_breakdown:
    keywords: ["break down", "decompose", "tasks", "subtasks", "WBS"]
    triggers:
      - "Break this into tasks"
      - "What tasks do we need?"
      - "Decompose the feature"

  estimation:
    keywords: ["estimate", "how long", "effort", "days", "hours", "points"]
    triggers:
      - "How long will this take?"
      - "Estimate this feature"
      - "Story points"

  code_review:
    keywords: ["review", "PR", "pull request", "approve", "merge"]
    triggers:
      - "Review this code"
      - "Check this PR"
      - "Approve merge"

  sprint_planning:
    keywords: ["sprint", "planning", "capacity", "velocity", "commitment"]
    triggers:
      - "Plan the sprint"
      - "What can we commit?"
      - "Capacity calculation"

  technical_mentoring:
    keywords: ["stuck", "help", "guidance", "mentor", "pair"]
    triggers:
      - "I'm stuck on..."
      - "Need help with..."
      - "Can you explain..."

  standards_enforcement:
    keywords: ["standards", "conventions", "rules", "linting", "best practices"]
    triggers:
      - "What are our standards?"
      - "How should we..."
      - "Best practice for..."
```

### Developer Agents

```yaml
developer_agents:
  frontend_implementation:
    keywords: ["frontend", "UI", "component", "React", "page", "form", "CSS"]
    triggers:
      - "Build the component"
      - "Create the page"
      - "Implement the UI"

  backend_implementation:
    keywords: ["backend", "API", "endpoint", "service", "database", "query"]
    triggers:
      - "Implement the endpoint"
      - "Create the service"
      - "Write the query"

  testing:
    keywords: ["test", "unit test", "integration", "coverage", "TDD"]
    triggers:
      - "Write tests"
      - "Add coverage"
      - "Test this feature"

  debugging:
    keywords: ["bug", "debug", "fix", "error", "broken", "issue"]
    triggers:
      - "Fix this bug"
      - "Debug the issue"
      - "Why is this broken?"

  documentation:
    keywords: ["document", "docs", "README", "comments", "JSDoc"]
    triggers:
      - "Document this"
      - "Add comments"
      - "Update README"

  refactoring:
    keywords: ["refactor", "clean up", "improve", "simplify", "tech debt"]
    triggers:
      - "Clean up this code"
      - "Refactor for clarity"
      - "Address tech debt"
```

## Disambiguation Rules

```yaml
disambiguation:
  overlapping_keywords:
    "API":
      if_context: "design/architecture"
      route_to: "tech_architect.api_design"
      else: "developer.backend_implementation"

    "database":
      if_context: "schema/design"
      route_to: "tech_architect.data_modeling"
      else: "developer.backend_implementation"

    "security":
      if_context: "architecture/strategy"
      route_to: "tech_architect.security_architecture"
      else: "developer.backend_implementation"

    "performance":
      if_context: "strategy/requirements"
      route_to: "tech_architect.performance_design"
      else: "developer.refactoring"

    "test":
      if_context: "strategy/coverage planning"
      route_to: "lead_developer.standards_enforcement"
      else: "developer.testing"

  multi_role_requests:
    "estimate this feature":
      primary: "lead_developer.estimation"
      may_involve: "lead_developer.task_breakdown"

    "design and implement API":
      sequence:
        - "tech_architect.api_design"
        - "developer.backend_implementation"

    "review and improve code":
      sequence:
        - "lead_developer.code_review"
        - "developer.refactoring"

  workflow_phase_context:
    discovery_phase:
      prefer: ["product_manager", "tech_architect"]
      reason: "Requirements and architecture focus"

    implementation_phase:
      prefer: ["developer", "lead_developer"]
      reason: "Building and coding focus"

    review_phase:
      prefer: ["lead_developer", "tech_architect"]
      reason: "Quality and architecture validation"
```

## Handoff Protocol

```yaml
handoff:
  when_to_handoff:
    - "Request requires different role's expertise"
    - "Decision authority not held"
    - "Blocking gate requires another role"

  handoff_format:
    from: "[Current role]"
    to: "[Target role]"
    reason: "[Why handoff needed]"
    context:
      - "[Relevant decisions made]"
      - "[Current state]"
      - "[Specific question/task]"
    return_expected: "[Yes/No]"

  common_handoffs:
    developer_to_architect:
      trigger: "Architecture decision needed"
      example: "This requires changing the data model"

    developer_to_lead:
      trigger: "Blocked or needs review"
      example: "PR ready for review"

    pm_to_architect:
      trigger: "Technical feasibility question"
      example: "Is this technically possible?"

    architect_to_pm:
      trigger: "Scope/priority question"
      example: "Should we invest in this optimization?"
```

## Routing Examples

```yaml
examples:
  example_1:
    request: "What database should we use for the project?"
    analysis:
      keywords: ["database", "should", "use"]
      intent: "Technology selection"
    routing:
      role: "tech_architect"
      agent: "stack_selection"

  example_2:
    request: "Break down the login feature into tasks"
    analysis:
      keywords: ["break down", "tasks", "feature"]
      intent: "Work decomposition"
    routing:
      role: "lead_developer"
      agent: "task_breakdown"

  example_3:
    request: "The checkout is not working, users get a blank page"
    analysis:
      keywords: ["not working", "blank page"]
      intent: "Bug investigation"
    routing:
      role: "developer"
      agent: "debugging"

  example_4:
    request: "Is adding a recommendation engine in scope for MVP?"
    analysis:
      keywords: ["in scope", "MVP"]
      intent: "Scope decision"
    routing:
      role: "product_manager"
      agent: "scope_guardian"

  example_5:
    request: "Design the API for user management"
    analysis:
      keywords: ["design", "API"]
      intent: "API architecture"
    routing:
      role: "tech_architect"
      agent: "api_design"
```

## Fallback Rules

```yaml
fallback:
  unclear_role:
    action: "Ask clarifying question"
    template: |
      I need to understand better what you're looking for:
      - Architecture/design decision? → Tech Architect
      - Requirements/prioritization? → Product Manager
      - Planning/estimation? → Lead Developer
      - Implementation/coding? → Developer

  unclear_agent:
    action: "Use role's primary responsibility"
    behavior: "Route to most general agent for that role"

  no_match:
    action: "Default to conversational mode"
    behavior: "Ask for more context before routing"
```

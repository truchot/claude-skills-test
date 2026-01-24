# Context Loader

## Purpose

Automatically inject relevant context into AI prompts. The AI should never need to ask "what's the tech stack?" or "what decisions have been made?" - this information should be loaded automatically.

## Loading Rules

### 1. Always Load (Every Request)

```yaml
always_load:
  state:
    path: "state/current.json"
    purpose: "Current workflow, phase, pending gates"

  project_type:
    detect_from: ".project/config.json" # or state
    load: "project-types/{type}.md"
    purpose: "Role adjustments, gate modifications"

  recent_decisions:
    path: ".project/03-architecture/decisions/"
    filter: "last 5 ADRs by date"
    purpose: "Architectural context"
```

### 2. On Role Activation

When a specific role is activated, load role-specific context:

```yaml
role_context:
  tech_architect:
    load:
      - path: ".project/03-architecture/*.md"
        purpose: "Current architecture"
      - path: "knowledge/patterns/technical/*.md"
        purpose: "Technical patterns"
      - path: ".project/03-architecture/decisions/*.md"
        purpose: "All ADRs"
      - path: "contexts/security.md"
        purpose: "Security requirements"

  product_manager:
    load:
      - path: ".project/01-vision/PRD.md"
        purpose: "Product requirements"
      - path: ".project/01-vision/personas.md"
        purpose: "User personas"
      - path: ".project/02-requirements/epics/*.md"
        purpose: "Current epics"
      - path: "knowledge/patterns/client/*.md"
        purpose: "Client behavior patterns"

  lead_developer:
    load:
      - path: ".project/03-architecture/stack.md"
        purpose: "Tech stack"
      - path: ".project/04-specs/features/**/estimation.md"
        purpose: "Current estimates"
      - path: "knowledge/rules/estimation.md"
        purpose: "Estimation rules"
      - path: "knowledge/checklists/code-review.md"
        purpose: "Review standards"

  developer:
    load:
      - path: ".project/03-architecture/stack.md"
        purpose: "Tech stack"
      - path: "state/current.json → current_feature"
        then_load: ".project/04-specs/features/{feature}/*.md"
        purpose: "Current feature specs"
      - path: "knowledge/rules/code-standards.md"
        purpose: "Coding standards"
      - path: "contexts/{stack_context}.md"
        purpose: "Stack-specific guidelines"

  devops_engineer:
    load:
      - path: ".project/06-operations/environments.md"
        purpose: "Environment config"
      - path: ".project/06-operations/runbooks/*.md"
        purpose: "Runbooks"
      - path: "knowledge/rules/deployment.md"
        purpose: "Deployment rules"

  qa_engineer:
    load:
      - path: ".project/05-quality/test-strategy.md"
        purpose: "Test strategy"
      - path: ".project/04-specs/features/**/spec.md"
        purpose: "Feature specs for testing"
      - path: "knowledge/checklists/testing.md"
        purpose: "Test checklists"
```

### 3. On Keyword Detection

Load additional context based on request keywords:

```yaml
keyword_context:
  security:
    triggers: ["security", "auth", "password", "encryption", "OWASP", "vulnerability"]
    load:
      - "contexts/security.md"
      - "knowledge/rules/security.md"
      - ".project/03-architecture/decisions/ADR-*security*.md"

  performance:
    triggers: ["performance", "speed", "optimization", "cache", "latency", "slow"]
    load:
      - "knowledge/patterns/performance/*.md"
      - ".project/03-architecture/decisions/ADR-*performance*.md"

  database:
    triggers: ["database", "query", "migration", "schema", "SQL", "Prisma"]
    load:
      - ".project/03-architecture/data-model.md"
      - "contexts/backend.md"
      - "knowledge/patterns/database/*.md"

  api:
    triggers: ["API", "endpoint", "REST", "GraphQL", "route"]
    load:
      - ".project/03-architecture/api-contract.yaml"
      - "knowledge/patterns/api/*.md"

  testing:
    triggers: ["test", "coverage", "TDD", "unit test", "integration test"]
    load:
      - ".project/05-quality/test-strategy.md"
      - "knowledge/patterns/testing/*.md"

  deployment:
    triggers: ["deploy", "release", "production", "staging", "CI/CD"]
    load:
      - ".project/06-operations/environments.md"
      - "knowledge/rules/deployment.md"
      - ".project/06-operations/runbooks/deployment.md"

  scope:
    triggers: ["scope", "in scope", "out of scope", "change request", "CR"]
    load:
      - ".project/01-vision/PRD.md#scope"
      - "knowledge/patterns/scope-creep-prevention.md"

  estimation:
    triggers: ["estimate", "how long", "effort", "days", "hours"]
    load:
      - "knowledge/rules/estimation.md"
      - ".project/04-specs/features/**/estimation.md"
```

### 4. On Workflow Phase

Load context based on current workflow phase:

```yaml
phase_context:
  qualification:
    load:
      - "workflows/{level}-*.md"
      - "skills/qualification/SKILL.md"

  specification:
    load:
      - "skills/specification/SKILL.md"
      - "templates/project/02-requirements/*.md"

  architecture:
    load:
      - "roles/tech-architect/ROLE.md"
      - "templates/project/03-architecture/*.md"

  estimation:
    load:
      - "roles/lead-developer/agents/estimation.md"
      - "knowledge/rules/estimation.md"

  implementation:
    load:
      - "roles/developer/ROLE.md"
      - ".project/03-architecture/stack.md"
      - "current_feature_specs"

  review:
    load:
      - "roles/lead-developer/agents/code-review.md"
      - "knowledge/checklists/code-review.md"

  deployment:
    load:
      - "roles/devops-engineer/ROLE.md"
      - ".project/06-operations/*.md"
```

---

## Context Loading Protocol

### Step 1: Identify Request Type

```yaml
identify:
  input: "User request text"

  extract:
    role_signals:
      tech_architect: ["architecture", "design", "stack", "API design"]
      product_manager: ["requirements", "scope", "priority", "PRD"]
      lead_developer: ["estimate", "review", "sprint", "standards"]
      developer: ["implement", "code", "build", "fix", "test"]

    keyword_signals:
      - Match against keyword_context triggers

    phase_signals:
      - Check state/current.json for workflow.current_step
```

### Step 2: Build Context Package

```yaml
build_context:
  package:
    mandatory:
      - state/current.json
      - project_type config

    role_specific:
      - Load based on identified role

    keyword_specific:
      - Load based on matched keywords

    phase_specific:
      - Load based on current phase

  priority:
    - If conflict, prefer more specific context
    - Limit total context to avoid token overflow
    - Summarize large files if needed
```

### Step 3: Inject into Prompt

```yaml
inject:
  format: |
    ## Active Context

    ### Current State
    ```json
    {state_summary}
    ```

    ### Project Type: {type}
    {project_type_summary}

    ### Relevant Architecture Decisions
    {adr_summaries}

    ### Loaded References
    {file_list_with_key_points}

    ---

    ## Your Request
    {original_request}

  rules:
    - Context appears BEFORE the request
    - Each context section has a clear header
    - Large contexts are summarized
    - File paths are included for reference
```

---

## Context Summary Format

When files are too large, generate summaries:

```yaml
summary_format:
  file: "{path}"
  key_points:
    - "{main point 1}"
    - "{main point 2}"
  decisions:
    - "{decision if any}"
  constraints:
    - "{constraint if any}"
  see_full: "Read {path} for details"
```

Example:
```yaml
file: ".project/03-architecture/stack.md"
key_points:
  - "Frontend: Next.js 14 with App Router"
  - "Backend: tRPC for type-safe APIs"
  - "Database: PostgreSQL with Prisma ORM"
  - "Auth: NextAuth.js with JWT"
decisions:
  - "ADR-001: Chose Next.js over Remix for ecosystem"
  - "ADR-003: Prisma over Drizzle for developer experience"
constraints:
  - "Must support Edge runtime"
  - "No server components for auth flows"
see_full: "Read .project/03-architecture/stack.md for details"
```

---

## Implementation for AI

### When Starting a Conversation

```
1. Read state/current.json
2. If project exists:
   - Load project type config
   - Load recent ADRs (summaries)
3. Present: "I've loaded context for {project} in {phase} phase"
```

### When Processing a Request

```
1. Analyze request for:
   - Role signals → Load role context
   - Keywords → Load keyword context
   - Phase → Load phase context

2. Build context package

3. If context seems insufficient:
   - Ask: "Should I also load {suggested_context}?"

4. Process request with full context
```

### When Context is Missing

```
1. If critical context is missing:
   - State clearly: "I don't have {X}. Let me load it."
   - Load the missing context
   - Continue

2. If context doesn't exist:
   - State: "I need {X} but it doesn't exist yet."
   - Suggest: "Should we create it first?"
```

---

## Anti-Patterns

### DON'T
```
❌ Process request without checking state
❌ Assume context from previous messages
❌ Ask user for information that exists in files
❌ Load ALL files (token overflow)
❌ Ignore phase-specific requirements
```

### DO
```
✅ Always start with state/current.json
✅ Load context proactively based on signals
✅ Summarize large contexts
✅ Reference specific files when quoting
✅ Update state after significant actions
```

---

## Context Loading Checklist

Before processing any request:

```yaml
checklist:
  - [ ] State loaded (state/current.json)
  - [ ] Project type identified
  - [ ] Role context loaded (if role clear)
  - [ ] Keyword context loaded (if keywords detected)
  - [ ] Phase context loaded (if in workflow)
  - [ ] Recent ADRs summarized
  - [ ] Missing context identified and loaded/requested
```

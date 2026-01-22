# Implementation Brief Template

## Purpose

An Implementation Brief is a **self-contained document** that gives a developer everything needed to implement a feature without navigating to other files. It's generated from the PRD, architecture, and specs, embedding all relevant context.

---

## Template

```yaml
# ═══════════════════════════════════════════════════════════════════════════════
# IMPLEMENTATION BRIEF
# ═══════════════════════════════════════════════════════════════════════════════

brief:
  id: "[BRIEF-XXX]"
  story_id: "[US-XXX]"
  feature: "[Feature name]"
  generated_at: "[YYYY-MM-DD HH:MM]"
  version: "1.0"

# ───────────────────────────────────────────────────────────────────────────────
# CONTEXT (Auto-embedded from architecture)
# ───────────────────────────────────────────────────────────────────────────────

context:
  project:
    name: "[Project name]"
    type: "[showcase|ecommerce|saas]"

  tech_stack:
    frontend:
      framework: "[e.g., Next.js 14]"
      styling: "[e.g., Tailwind CSS]"
      state: "[e.g., Zustand]"

    backend:
      runtime: "[e.g., Node.js]"
      api: "[e.g., tRPC]"

    database:
      type: "[e.g., PostgreSQL]"
      orm: "[e.g., Prisma]"

    auth:
      provider: "[e.g., NextAuth.js]"
      strategy: "[e.g., JWT + Session]"

  relevant_adrs:
    - id: "ADR-XXX"
      title: "[Decision title]"
      decision: "[What was decided]"
      implication: "[How it affects this implementation]"

  coding_standards:
    naming:
      files: "[e.g., kebab-case for files]"
      components: "[e.g., PascalCase]"
      functions: "[e.g., camelCase]"
    patterns:
      - "[Pattern 1 to follow]"
      - "[Pattern 2 to follow]"

# ───────────────────────────────────────────────────────────────────────────────
# STORY
# ───────────────────────────────────────────────────────────────────────────────

story:
  title: "[Story title]"

  as_a: "[User type]"
  i_want: "[Goal]"
  so_that: "[Benefit]"

  priority: "[P0|P1|P2]"
  estimate: "[X story points / hours]"

# ───────────────────────────────────────────────────────────────────────────────
# ACCEPTANCE CRITERIA (Gherkin)
# ───────────────────────────────────────────────────────────────────────────────

acceptance_criteria:
  scenarios:
    - name: "Happy path"
      given: "[Precondition]"
      when: "[Action]"
      then: "[Expected result]"

    - name: "Validation error"
      given: "[Precondition]"
      when: "[Invalid action]"
      then: "[Error handling]"

    - name: "Edge case"
      given: "[Edge condition]"
      when: "[Action]"
      then: "[Expected result]"

  technical_requirements:
    - "[Technical requirement 1]"
    - "[Technical requirement 2]"

# ───────────────────────────────────────────────────────────────────────────────
# IMPLEMENTATION GUIDANCE (From Architect)
# ───────────────────────────────────────────────────────────────────────────────

implementation:
  approach: |
    [High-level approach description from architect]

  architecture_notes:
    - "[Note 1 about how this fits in the system]"
    - "[Note 2 about dependencies]"

  patterns_to_use:
    - pattern: "[Pattern name]"
      where: "[Where to apply]"
      example: |
        ```typescript
        // Example code snippet
        ```

  pitfalls_to_avoid:
    - pitfall: "[Common mistake]"
      why: "[Why it's problematic]"
      instead: "[What to do instead]"

  security_considerations:
    - "[Security consideration 1]"
    - "[Security consideration 2]"

  performance_considerations:
    - "[Performance consideration 1]"

# ───────────────────────────────────────────────────────────────────────────────
# FILES IMPACT
# ───────────────────────────────────────────────────────────────────────────────

files:
  create:
    - path: "[path/to/new/file.ts]"
      purpose: "[What this file does]"
      template: |
        ```typescript
        // Starter template for this file
        ```

  modify:
    - path: "[path/to/existing/file.ts]"
      change: "[What needs to change]"
      location: "[Function/section to modify]"

  reference:
    - path: "[path/to/reference/file.ts]"
      reason: "[Why to look at this - pattern/example]"

# ───────────────────────────────────────────────────────────────────────────────
# DATA MODEL (If applicable)
# ───────────────────────────────────────────────────────────────────────────────

data_model:
  entities:
    - name: "[Entity name]"
      fields:
        - name: "[field_name]"
          type: "[type]"
          constraints: "[constraints]"

  relationships:
    - "[Entity A] → [Entity B] (relationship type)"

  migration_needed: "[yes|no]"
  migration_notes: "[Notes about migration]"

# ───────────────────────────────────────────────────────────────────────────────
# API (If applicable)
# ───────────────────────────────────────────────────────────────────────────────

api:
  endpoints:
    - method: "[GET|POST|PUT|DELETE]"
      path: "[/api/resource]"
      auth: "[required|optional|none]"
      request:
        body: |
          ```json
          { "field": "type" }
          ```
      response:
        success: |
          ```json
          { "field": "value" }
          ```
        error: |
          ```json
          { "error": "message" }
          ```

# ───────────────────────────────────────────────────────────────────────────────
# TESTING REQUIREMENTS
# ───────────────────────────────────────────────────────────────────────────────

testing:
  unit_tests:
    - description: "[What to test]"
      file: "[test file path]"
      scenarios:
        - "[Test scenario 1]"
        - "[Test scenario 2]"

  integration_tests:
    - description: "[What to test]"
      file: "[test file path]"

  manual_testing:
    - "[Manual test scenario]"

# ───────────────────────────────────────────────────────────────────────────────
# CHECKLIST
# ───────────────────────────────────────────────────────────────────────────────

checklist:
  pre_implementation:
    - "[ ] Read and understand this brief completely"
    - "[ ] Check referenced ADRs if unclear on decisions"
    - "[ ] Ensure dev environment is set up"
    - "[ ] Pull latest from main branch"

  implementation:
    - "[ ] Create feature branch: feature/[story-id]-[short-name]"
    - "[ ] Implement following the approach described"
    - "[ ] Follow coding standards listed above"
    - "[ ] Write tests as you go (TDD preferred)"
    - "[ ] Handle all acceptance criteria scenarios"

  post_implementation:
    - "[ ] All tests pass locally"
    - "[ ] Linter passes"
    - "[ ] No console.log or debug code"
    - "[ ] Self-review completed"
    - "[ ] PR description links to [BRIEF-XXX]"
    - "[ ] Screenshots added (if UI change)"

# ───────────────────────────────────────────────────────────────────────────────
# RELATED RESOURCES
# ───────────────────────────────────────────────────────────────────────────────

resources:
  documentation:
    - "[Link to relevant docs]"

  design:
    - "[Link to Figma/mockups]"

  related_stories:
    - "[US-XXX] - [Related story]"

  ask_if_unclear:
    technical: "Lead Developer"
    requirements: "Product Manager"
    architecture: "Tech Architect"

# ═══════════════════════════════════════════════════════════════════════════════
```

---

## Generation Process

### Step 1: Gather Inputs

```yaml
inputs:
  required:
    - story: ".project/02-requirements/user-stories/[US-XXX].md"
    - stack: ".project/03-architecture/stack.md"
    - standards: "knowledge/rules/code-standards.md"

  conditional:
    - if_exists:
        feature_spec: ".project/04-specs/features/[feature]/spec.md"
        tech_brief: ".project/04-specs/features/[feature]/tech-brief.md"
    - if_relevant:
        data_model: ".project/03-architecture/data-model.md"
        api_contract: ".project/03-architecture/api-contract.yaml"

  always:
    - recent_adrs: ".project/03-architecture/decisions/*.md" (last 5)
```

### Step 2: Extract and Embed

```yaml
extract:
  from_stack:
    - Framework versions
    - Key libraries
    - Architecture patterns

  from_standards:
    - Naming conventions
    - Required patterns

  from_adrs:
    - Decisions relevant to this feature
    - Their implications

  from_spec:
    - Detailed requirements
    - API definitions
    - Data model changes
```

### Step 3: Generate Checklist

```yaml
generate_checklist:
  base:
    - Standard pre/post items

  from_requirements:
    - Each acceptance criterion becomes a check

  from_tech:
    - Database migration check if data model changes
    - API documentation check if new endpoints
    - Security review check if auth-related
```

---

## Example: Login Form Implementation Brief

```yaml
brief:
  id: "BRIEF-042"
  story_id: "US-015"
  feature: "User Authentication"
  generated_at: "2026-01-22 15:00"
  version: "1.0"

context:
  project:
    name: "Acme SaaS"
    type: "saas"

  tech_stack:
    frontend:
      framework: "Next.js 14 (App Router)"
      styling: "Tailwind CSS"
      state: "Zustand"
    backend:
      runtime: "Node.js"
      api: "tRPC"
    database:
      type: "PostgreSQL"
      orm: "Prisma"
    auth:
      provider: "NextAuth.js"
      strategy: "Credentials + OAuth"

  relevant_adrs:
    - id: "ADR-003"
      title: "Authentication Strategy"
      decision: "Use NextAuth.js with credentials provider and Google OAuth"
      implication: "Login form must support both email/password and Google sign-in"

    - id: "ADR-007"
      title: "Form Validation"
      decision: "Use Zod for all form validation"
      implication: "Create Zod schema for login form"

  coding_standards:
    naming:
      files: "kebab-case (login-form.tsx)"
      components: "PascalCase (LoginForm)"
      functions: "camelCase (handleSubmit)"
    patterns:
      - "Use React Hook Form for forms"
      - "Use shadcn/ui components"
      - "Error boundaries for error handling"

story:
  title: "User Login"
  as_a: "Visitor"
  i_want: "to log in with my email and password"
  so_that: "I can access my account"
  priority: "P0"
  estimate: "3 story points"

acceptance_criteria:
  scenarios:
    - name: "Successful login"
      given: "I am on the login page"
      when: "I enter valid credentials and submit"
      then: "I am redirected to the dashboard"

    - name: "Invalid credentials"
      given: "I am on the login page"
      when: "I enter invalid credentials"
      then: "I see an error message 'Invalid email or password'"

    - name: "Empty form submission"
      given: "I am on the login page"
      when: "I submit without filling the form"
      then: "I see validation errors for required fields"

  technical_requirements:
    - "Rate limit login attempts (5 per minute)"
    - "HTTPS only"
    - "Secure cookie settings"

implementation:
  approach: |
    Use NextAuth.js credentials provider with a custom login form.
    The form uses React Hook Form with Zod validation.
    On success, NextAuth handles session creation and redirect.

  patterns_to_use:
    - pattern: "Form with React Hook Form + Zod"
      where: "LoginForm component"
      example: |
        ```typescript
        const schema = z.object({
          email: z.string().email(),
          password: z.string().min(8),
        });

        const form = useForm<z.infer<typeof schema>>({
          resolver: zodResolver(schema),
        });
        ```

  pitfalls_to_avoid:
    - pitfall: "Storing password in state"
      why: "Security risk"
      instead: "Let React Hook Form handle it"

    - pitfall: "Generic error messages"
      why: "User doesn't know what's wrong"
      instead: "Specific messages per error type"

  security_considerations:
    - "Never log passwords"
    - "Use constant-time comparison for passwords"
    - "Implement rate limiting"

files:
  create:
    - path: "app/(auth)/login/page.tsx"
      purpose: "Login page component"

    - path: "components/auth/login-form.tsx"
      purpose: "Login form component"

    - path: "lib/validations/auth.ts"
      purpose: "Zod schemas for auth forms"

  modify:
    - path: "app/api/auth/[...nextauth]/route.ts"
      change: "Add credentials provider if not present"

  reference:
    - path: "components/ui/button.tsx"
      reason: "Use existing Button component"
    - path: "components/ui/input.tsx"
      reason: "Use existing Input component"

testing:
  unit_tests:
    - description: "Login form validation"
      file: "components/auth/__tests__/login-form.test.tsx"
      scenarios:
        - "Shows error for invalid email"
        - "Shows error for short password"
        - "Calls onSubmit with valid data"

  integration_tests:
    - description: "Login flow"
      file: "app/(auth)/login/__tests__/page.test.tsx"

checklist:
  pre_implementation:
    - "[ ] Read ADR-003 (Authentication Strategy)"
    - "[ ] Check NextAuth.js docs for credentials provider"

  implementation:
    - "[ ] Create login page at app/(auth)/login/page.tsx"
    - "[ ] Create LoginForm component"
    - "[ ] Create Zod validation schema"
    - "[ ] Integrate with NextAuth signIn"
    - "[ ] Handle loading state"
    - "[ ] Handle error states"
    - "[ ] Add rate limiting middleware"

  post_implementation:
    - "[ ] Test with valid credentials"
    - "[ ] Test with invalid credentials"
    - "[ ] Test rate limiting"
    - "[ ] Verify secure cookie settings"
    - "[ ] All tests pass"
```

---

## Usage

### For Lead Developer
Generate briefs when breaking down stories:
```
1. Select user story
2. Load architecture context
3. Generate implementation brief
4. Review and adjust
5. Assign to developer
```

### For Developer
Use brief as single source of truth:
```
1. Read brief completely before coding
2. Follow implementation approach
3. Use checklist as you go
4. Reference patterns_to_use
5. Avoid pitfalls_to_avoid
6. Complete all checklist items before PR
```

### For Code Review
Verify against brief:
```
1. Does implementation match approach?
2. Are all acceptance criteria met?
3. Are patterns used correctly?
4. Are pitfalls avoided?
5. Is checklist complete?
```

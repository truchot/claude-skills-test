# Context Compression Protocol

> **Optimize token usage with adaptive detail levels**

---

## Overview

Context Compression provides three detail levels for embedded context, allowing stories to balance completeness vs. token efficiency based on task complexity.

```
┌─────────────────────────────────────────────────────────────────┐
│                    CONTEXT COMPRESSION                           │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  TASK COMPLEXITY           DETAIL LEVEL         TOKEN USAGE      │
│                                                                  │
│  L0-L1 (Simple)     ──►    MINIMAL         ──►   ~500 tokens    │
│                            • Stack summary                       │
│                            • ADR decisions only                  │
│                            • Key rules only                      │
│                                                                  │
│  L2 (Standard)      ──►    STANDARD        ──►   ~1500 tokens   │
│                            • Stack + configs                     │
│                            • ADR decision + consequence          │
│                            • Rules + anti-patterns               │
│                                                                  │
│  L3-L4 (Complex)    ──►    VERBOSE         ──►   ~3000 tokens   │
│                            • Full stack details                  │
│                            • Full ADR with alternatives          │
│                            • Complete patterns + examples        │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## Detail Levels

### MINIMAL (L0-L1 Tasks)

**Use when:**
- Quick fixes, hotfixes
- Single-file changes
- Well-understood codebase
- Time-critical execution

```yaml
minimal_context:
  stack:
    format: "one-liner"
    example: "Next.js 14 + TypeScript + Prisma + Tailwind"
    max_lines: 5

  adrs:
    include: "decisions only"
    exclude: ["context", "alternatives", "consequences"]
    format: |
      - ADR-001: Use Prisma (not raw SQL)
      - ADR-003: REST over GraphQL

  patterns:
    include: "key rules only"
    exclude: ["examples", "anti-patterns", "rationale"]
    max_rules_per_pattern: 3
    format: |
      API: plural nouns, proper status codes, Zod validation

  standards:
    include: "critical only"
    format: "bullet list, one line each"

  related_code:
    include: "file paths only"
    exclude: ["code snippets"]
    format: |
      Related: src/lib/auth.ts, src/app/api/users/route.ts

  total_target: "~500 tokens"
```

### STANDARD (L2 Tasks) - Default

**Use when:**
- Typical feature work
- Multi-file changes
- Moderate complexity
- Default for most stories

```yaml
standard_context:
  stack:
    format: "structured yaml"
    include: ["framework", "language", "database", "key_libraries"]
    example: |
      framework: Next.js 14 App Router
      language: TypeScript 5.x strict
      database: PostgreSQL + Prisma 5.x
      auth: NextAuth.js v5
      styling: Tailwind CSS 3.x

  adrs:
    include: ["decision", "consequence"]
    exclude: ["full context", "all alternatives"]
    format: |
      #### ADR-001: Use Prisma
      - **Decision**: All DB access via Prisma ORM
      - **Consequence**: Must define models, use typed queries

  patterns:
    include: ["key rules", "anti-patterns"]
    exclude: ["full examples", "detailed rationale"]
    max_rules_per_pattern: 5
    format: |
      patterns:
        - name: "API Design"
          rules:
            - Plural nouns for resources
            - Proper HTTP status codes
            - Validate with Zod
          anti_patterns:
            - Don't expose internal errors

  standards:
    include: ["relevant to task"]
    format: "categorized list"

  related_code:
    include: ["paths", "key snippets"]
    max_snippet_lines: 20
    format: |
      | File | Purpose |
      |------|---------|
      | src/lib/auth.ts | Auth utilities |

      ```typescript
      // Key interface
      export interface Session { ... }
      ```

  total_target: "~1500 tokens"
```

### VERBOSE (L3-L4 Tasks)

**Use when:**
- Complex architectural work
- New developers on project
- Critical/risky changes
- Multi-team coordination

```yaml
verbose_context:
  stack:
    format: "full details"
    include: ["all sections", "version specifics", "configuration notes"]
    example: |
      framework:
        name: Next.js 14
        router: App Router
        features: [RSC, Server Actions, Streaming]
        config_notes: "Using experimental features X, Y"

      language:
        name: TypeScript 5.4
        strict: true
        paths: "@/* -> src/*"
        notes: "No any types, use unknown + guards"

  adrs:
    include: ["full context", "alternatives considered", "decision", "consequences"]
    format: |
      #### ADR-001: Use Prisma for Database Access

      **Context**: Need type-safe DB access with migrations...

      **Alternatives Considered**:
      1. Raw SQL - rejected (no type safety)
      2. Drizzle - considered (newer, less ecosystem)
      3. TypeORM - rejected (decorator complexity)

      **Decision**: Use Prisma ORM

      **Consequences**:
      - ✅ Type-safe queries
      - ✅ Auto-generated migrations
      - ⚠️ N+1 query risk (use include)

  patterns:
    include: ["full content", "examples", "rationale"]
    format: |
      ### Pattern: API Design

      **Rationale**: Consistent APIs reduce cognitive load...

      **Rules**:
      1. Use plural nouns (/users not /user)
         - Why: Collection semantics
      2. Proper status codes
         - 200 OK, 201 Created, 400 Bad Request, etc.

      **Example**:
      ```typescript
      // Good
      export async function POST(req: Request) {
        const body = await req.json();
        const validated = schema.parse(body);
        const user = await prisma.user.create({ data: validated });
        return Response.json({ data: user }, { status: 201 });
      }
      ```

      **Anti-patterns**:
      - ❌ Verbs in URLs (/getUser)
      - ❌ Exposing stack traces

  standards:
    include: ["all relevant", "examples"]
    format: "detailed with code samples"

  related_code:
    include: ["paths", "full relevant snippets", "relationships"]
    max_snippet_lines: 50
    format: |
      ### Related Code Map

      ```
      src/lib/auth.ts ──uses──► src/lib/prisma.ts
           │
           └──exports──► Session, getServerSession()
      ```

      #### src/lib/auth.ts (full relevant section)
      ```typescript
      // Lines 15-65: Session management
      [full code snippet]
      ```

  total_target: "~3000 tokens"
```

---

## Auto-Detection Rules

```yaml
detail_level_detection:
  minimal:
    conditions:
      - complexity: ["L0", "L1"]
      - estimated_time: "< 2 hours"
      - files_affected: "<= 2"
      - change_type: ["hotfix", "typo", "config"]

  standard:
    conditions:
      - complexity: "L2"
      - estimated_time: "2-8 hours"
      - files_affected: "3-10"
      - change_type: ["feature", "enhancement", "refactor"]
    default: true  # Use if no other matches

  verbose:
    conditions:
      - complexity: ["L3", "L4"]
      - estimated_time: "> 8 hours"
      - files_affected: "> 10"
      - change_type: ["architecture", "migration", "security"]
      - flags: ["new_developer", "high_risk", "cross_team"]
```

---

## Manual Override

Override auto-detection in story generation:

```yaml
# In story generation request
context_detail_level: "verbose"  # Force verbose even for L2 task

# Reasons to override:
#   - New team member needs more context
#   - High-risk change needs full documentation
#   - Complex domain even if small change
```

---

## Compression Techniques

### 1. Stack Compression

```yaml
verbose: |
  framework:
    name: Next.js
    version: "14.1.0"
    router: App Router
    features:
      - React Server Components
      - Server Actions
      - Streaming SSR
    configuration:
      experimental:
        serverActions: true

standard: |
  framework: Next.js 14 App Router
  features: RSC, Server Actions

minimal: |
  Next.js 14 App Router
```

### 2. ADR Compression

```yaml
verbose: |
  #### ADR-001: Database ORM Selection

  **Date**: 2024-01-15
  **Status**: Accepted
  **Deciders**: Tech Lead, Senior Dev

  **Context**:
  We need a type-safe way to interact with PostgreSQL...
  [full context]

  **Alternatives**:
  1. Raw SQL with pg
  2. Prisma ORM
  3. Drizzle ORM
  4. TypeORM
  [detailed comparison]

  **Decision**: Use Prisma

  **Consequences**:
  - Positive: Type safety, migrations...
  - Negative: Bundle size, learning curve...

standard: |
  #### ADR-001: Use Prisma
  - **Decision**: Prisma ORM for all database access
  - **Consequence**: Type-safe queries, must use Prisma schema

minimal: |
  - ADR-001: Prisma for DB (type-safe, use schema)
```

### 3. Pattern Compression

```yaml
verbose: |
  ### API Design Pattern

  **Source**: knowledge/patterns/technical/api-design.md
  **Last Updated**: 2024-12-01

  **Rationale**:
  Consistent REST API design reduces cognitive load...

  **Rules**:
  1. Use plural nouns for resource collections
     - Rationale: Represents collection semantics
     - Example: /users, /products, /orders
     - Wrong: /user, /getUsers

  2. Return appropriate HTTP status codes
     - 200 OK: Successful GET/PUT
     - 201 Created: Successful POST
     - 204 No Content: Successful DELETE
     - 400 Bad Request: Validation error
     - 401 Unauthorized: Missing auth
     - 403 Forbidden: Insufficient permissions
     - 404 Not Found: Resource doesn't exist
     - 500 Internal Server Error: Unexpected error

  **Full Example**:
  [30 lines of code]

  **Anti-patterns**:
  [detailed list with explanations]

standard: |
  ### API Design
  - Plural nouns (/users not /user)
  - Proper status codes (200, 201, 400, 404, 500)
  - Validate input with Zod
  - Wrap responses: { data } or { error }

  Anti-patterns:
  - Don't use verbs in URLs
  - Don't expose internal errors

minimal: |
  API: plurals, status codes, Zod validation, {data}/{error} format
```

---

## Token Budget Guidelines

| Level | Target | Hard Limit | Use Case |
|-------|--------|------------|----------|
| Minimal | 500 | 800 | Quick tasks, experts |
| Standard | 1500 | 2500 | Normal development |
| Verbose | 3000 | 5000 | Complex/risky work |

### Fitting Within Budget

If context exceeds budget:

```yaml
compression_priority:
  # Cut these first (lowest value per token)
  low_priority:
    - Code examples longer than needed
    - Historical context in ADRs
    - Detailed rationale

  # Keep these (highest value per token)
  high_priority:
    - Decisions and rules
    - Critical anti-patterns
    - Key interfaces/types
    - Security considerations
```

---

## Integration with Story Generation

### In Phase 2 (Context Loading)

```yaml
step_2_load_context:
  # Determine detail level
  detail_level: auto_detect() or manual_override

  # Apply compression
  for_each_context_type:
    stack: compress(stack_content, detail_level)
    adrs: compress(adr_content, detail_level)
    patterns: compress(pattern_content, detail_level)
    standards: compress(standard_content, detail_level)
    related_code: compress(code_content, detail_level)

  # Verify budget
  total_tokens: count_tokens(compressed_context)
  if total_tokens > budget[detail_level].hard_limit:
    apply_priority_cuts()
```

### In Story Metadata

```markdown
## Story Metadata

| Field | Value |
|-------|-------|
| **Context Detail** | Minimal / Standard / Verbose |
| **Context Tokens** | ~[X] tokens |
```

---

## Examples

### Minimal Context Example

```markdown
## 2. Embedded Context (Minimal)

**Stack**: Next.js 14 + TypeScript + Prisma + Tailwind

**ADRs**:
- ADR-001: Prisma for DB
- ADR-003: REST over GraphQL

**Key Rules**:
- API: plurals, proper status codes, Zod validation
- TypeScript: no any, use unknown + guards

**Related**: src/lib/auth.ts, src/app/api/users/route.ts
```

### Standard Context Example

```markdown
## 2. Embedded Context (Standard)

### Stack
framework: Next.js 14 App Router
language: TypeScript 5.x strict
database: PostgreSQL + Prisma 5.x
auth: NextAuth.js v5

### ADRs
#### ADR-001: Use Prisma
- **Decision**: All DB access via Prisma ORM
- **Consequence**: Type-safe queries, must define schema

### Patterns
- **API Design**: plurals, status codes, Zod, {data}/{error}
- **Error Handling**: catch at boundary, log internally, generic to client

### Related Code
| File | Purpose |
|------|---------|
| src/lib/auth.ts | Session management |

\`\`\`typescript
export interface Session {
  user: { id: string; email: string; role: Role }
}
\`\`\`
```

---

## References

- `core/story-generation.md` - Integration point
- `templates/STORY-TEMPLATE.md` - Where compressed context goes
- `contexts/packs/*.yaml` - Packs define what to extract

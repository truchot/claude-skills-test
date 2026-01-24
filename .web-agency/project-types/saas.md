---
name: saas
description: Configuration for SaaS (Software as a Service) applications with multi-tenancy, subscriptions, and complex business logic
complexity: L3-L4
typical_duration: 8-24 weeks
team_size: 3-6
---

# SaaS Application Project Type

## Overview

SaaS projects are full-featured web applications with complex business logic, user management, subscription billing, and often multi-tenancy. Focus on scalability, security, and sustainable architecture.

## When to Use

- B2B software products
- B2C subscription services
- Platform/marketplace applications
- Internal tools (complex)
- API-first products

## Characteristics

```yaml
characteristics:
  frontend_heavy: true
  backend_complexity: "high"
  database_needs: "complex, multi-tenant"
  user_auth: "required, roles/permissions"
  payment: "subscriptions"
  realtime: "often required"
  seo_critical: "marketing pages only"
  mobile_first: "app should be responsive"
  security_critical: true
  multi_tenant: "usually"
```

## Recommended Stack

```yaml
recommended_stack:
  primary:
    frontend:
      framework: "Next.js (App Router)"
      state: "React Query + Zustand"
      styling: "Tailwind CSS"
      ui_components: "shadcn/ui or Radix"

    backend:
      runtime: "Node.js"
      framework: "Next.js API Routes or Express"
      api_style: "tRPC or REST"
      realtime: "Socket.io or Pusher"

    database:
      primary: "PostgreSQL"
      orm: "Prisma or Drizzle"
      cache: "Redis (Upstash)"
      search: "PostgreSQL full-text or Meilisearch"

    auth:
      provider: "Clerk or Auth0 or NextAuth"
      features: ["SSO", "RBAC", "MFA"]

    billing:
      provider: "Stripe Billing"
      features: ["Subscriptions", "Usage-based", "Invoicing"]

    infrastructure:
      hosting: "Vercel (frontend) + Railway/Render (backend)"
      database: "Neon or Supabase"
      storage: "AWS S3 / Cloudflare R2"
      email: "Resend or SendGrid"
      monitoring: "Sentry + Vercel Analytics"

  alternatives:
    full_stack_framework:
      framework: "Remix or SvelteKit"
      when: "Team preference, specific needs"

    self_hosted:
      backend: "NestJS or Fastify"
      when: "More control needed"

    enterprise:
      backend: "Go or Rust"
      when: "High performance requirements"
```

## Role Adjustments

```yaml
role_adjustments:
  tech_architect:
    focus:
      - "Multi-tenancy strategy"
      - "Authorization architecture (RBAC)"
      - "Data isolation"
      - "API design"
      - "Subscription billing integration"
      - "Scalability planning"

    agents_priority:
      high: ["system-architecture", "security-architecture", "api-design", "data-modeling"]
      medium: ["integration-design", "performance-design", "adr-writer"]
      low: ["stack-selection"]

    critical_decisions:
      - "Multi-tenancy approach (schema, row, database)"
      - "Authorization model"
      - "API versioning strategy"
      - "Background job processing"
      - "Data retention and compliance"

  product_manager:
    focus:
      - "Feature prioritization for MVP"
      - "User onboarding flow"
      - "Pricing and packaging"
      - "Feature flags and rollout"

    agents_priority:
      high: ["requirements-discovery", "prd-writer", "prioritization", "roadmap-planning"]
      medium: ["user-story-writer", "scope-guardian"]
      low: []

    mvp_strategy:
      - "Identify core value proposition"
      - "Define minimum feature set"
      - "Plan iterative releases"
      - "Establish feedback loops"

  lead_developer:
    focus:
      - "Technical debt management"
      - "Team coordination"
      - "Architecture enforcement"
      - "Performance monitoring"

    agents_priority:
      high: ["code-review", "sprint-planning", "estimation", "standards-enforcement"]
      medium: ["task-breakdown", "technical-mentoring"]
      low: []

    team_practices:
      - "Regular sprint planning"
      - "Architecture reviews"
      - "Performance budgets"
      - "Tech debt sprints"

  developer:
    focus:
      - "Full-stack implementation"
      - "API development"
      - "Complex business logic"
      - "Test coverage"

    agents_priority:
      high: ["frontend-implementation", "backend-implementation", "testing"]
      medium: ["debugging", "documentation", "refactoring"]
      low: []

    testing_requirements:
      - "Unit tests for business logic"
      - "Integration tests for APIs"
      - "E2E tests for critical flows"
      - "Multi-tenant isolation tests"
```

## Workflow Adjustments

```yaml
workflow:
  approach: "Agile with 2-week sprints"

  phases:
    discovery:
      duration: "2-3 weeks"
      deliverables:
        - "Product vision and scope"
        - "User research findings"
        - "Competitive analysis"
        - "Technical feasibility"
        - "MVP definition"

    architecture:
      duration: "2-3 weeks"
      deliverables:
        - "System architecture document"
        - "Data model design"
        - "API contracts (OpenAPI)"
        - "Security architecture"
        - "Infrastructure plan"
        - "ADRs for key decisions"

    foundation:
      duration: "2-3 weeks"
      deliverables:
        - "Project setup and CI/CD"
        - "Authentication system"
        - "Multi-tenancy foundation"
        - "Core data models"
        - "Base UI components"

    core_features:
      duration: "6-12 weeks"
      approach: "Feature-based sprints"
      deliverables:
        - "Core product features"
        - "User management"
        - "Billing integration"
        - "Onboarding flow"

    polish:
      duration: "2-3 weeks"
      deliverables:
        - "Performance optimization"
        - "Error handling"
        - "Documentation"
        - "Admin tools"

    launch_prep:
      duration: "1-2 weeks"
      deliverables:
        - "Security audit"
        - "Load testing"
        - "Monitoring setup"
        - "Runbooks"
        - "Support processes"

  ongoing:
    - "Feature releases (bi-weekly)"
    - "Bug fixes (continuous)"
    - "Performance monitoring"
    - "Customer feedback integration"
```

## HITL Gate Adjustments

```yaml
gates:
  comprehensive:
    - gate: "Architecture Review"
      level: "🔴 BLOCKING"
      when: "Before major implementation"
      checklist:
        - "Scalability considered"
        - "Security reviewed"
        - "Data isolation confirmed"
        - "Performance implications assessed"

    - gate: "Security Review"
      level: "🔴 BLOCKING"
      frequency: "Every sprint for auth/data changes"
      checklist:
        - "OWASP Top 10 addressed"
        - "Data access controls"
        - "Input validation"
        - "Audit logging"

    - gate: "API Contract"
      level: "🔴 BLOCKING"
      when: "New/changed endpoints"
      checklist:
        - "OpenAPI spec updated"
        - "Versioning considered"
        - "Error responses defined"
        - "Rate limiting configured"

    - gate: "Database Migration"
      level: "🔴 BLOCKING"
      checklist:
        - "Backward compatible"
        - "Rollback tested"
        - "Performance impact assessed"
        - "Multi-tenant implications"

    - gate: "Feature Release"
      level: "🟡 ADVISORY"
      checklist:
        - "Feature flag configured"
        - "Monitoring in place"
        - "Rollback plan"
        - "Documentation updated"

  sprint_gates:
    - gate: "Sprint Planning"
      level: "🟡 ADVISORY"
      frequency: "Every sprint"

    - gate: "Sprint Review"
      level: "🟡 ADVISORY"
      frequency: "Every sprint"

    - gate: "Code Review"
      level: "🔴 BLOCKING"
      frequency: "Every PR"
```

## Core Capabilities

```yaml
capabilities:
  authentication:
    required:
      - "Email/password login"
      - "Email verification"
      - "Password reset"
      - "Session management"

    recommended:
      - "Social login (Google, GitHub)"
      - "SSO (SAML/OIDC)"
      - "MFA"
      - "API keys"

  authorization:
    required:
      - "Role-based access (Admin, User)"
      - "Resource ownership"
      - "Tenant isolation"

    recommended:
      - "Granular permissions"
      - "Custom roles"
      - "Team/org hierarchy"

  multi_tenancy:
    options:
      row_level:
        description: "tenant_id column on all tables"
        when: "Most SaaS applications"
        complexity: "Medium"

      schema_level:
        description: "Separate schema per tenant"
        when: "Strong isolation needed"
        complexity: "High"

      database_level:
        description: "Separate database per tenant"
        when: "Enterprise, compliance"
        complexity: "Very High"

  billing:
    required:
      - "Subscription management"
      - "Payment method management"
      - "Invoicing"
      - "Plan upgrades/downgrades"

    recommended:
      - "Usage-based billing"
      - "Trials"
      - "Coupons"
      - "Multiple currencies"

  api:
    required:
      - "RESTful or GraphQL API"
      - "Authentication (JWT/API key)"
      - "Rate limiting"
      - "Versioning"

    recommended:
      - "Webhooks"
      - "OpenAPI documentation"
      - "SDK generation"
```

## Quality Metrics

```yaml
quality_metrics:
  reliability:
    uptime: "> 99.9%"
    error_rate: "< 0.1%"
    recovery_time: "< 15 minutes"

  performance:
    api_response_p95: "< 200ms"
    page_load: "< 3s"
    background_jobs: "< 30s"

  security:
    security_scan: "No critical issues"
    dependency_vulnerabilities: "None high/critical"
    compliance: "Based on requirements"

  quality:
    test_coverage: "> 80%"
    code_review: "100% of changes"
    documentation: "All APIs documented"

  business:
    churn_rate: "< 5% monthly"
    nps_score: "> 50"
    support_response: "< 4 hours"
```

## Common Pitfalls

```yaml
pitfalls:
  over_engineering:
    symptom: "Building for millions when you have 10 users"
    prevention: "Start simple, optimize when needed"

  poor_multi_tenancy:
    symptom: "Data leaks between tenants"
    prevention: "Automated tests, row-level security"

  billing_complexity:
    symptom: "Months on billing, core features delayed"
    prevention: "Use Stripe Billing, don't reinvent"

  no_observability:
    symptom: "Issues discovered by customers"
    prevention: "Monitoring, alerting, logging from day 1"

  tech_debt_accumulation:
    symptom: "Velocity decreasing over time"
    prevention: "Regular refactoring sprints, code review discipline"

  feature_creep:
    symptom: "MVP becomes a multi-year project"
    prevention: "Strict prioritization, launch early"
```

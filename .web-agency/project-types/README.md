# Project Types

Project type configurations adapt the APEX system to different web project categories. Each type defines role adjustments, workflow modifications, HITL gate changes, and recommended stacks.

## Available Project Types

| Type | Complexity | Duration | Team Size | Use Case |
|------|------------|----------|-----------|----------|
| [showcase](./showcase.md) | L1-L2 | 1-4 weeks | 1-2 | Corporate sites, portfolios, landing pages |
| [ecommerce](./ecommerce.md) | L2-L3 | 4-12 weeks | 2-4 | Online stores, marketplaces |
| [saas](./saas.md) | L3-L4 | 8-24 weeks | 3-6 | B2B/B2C software products |

## Selecting a Project Type

```yaml
selection_guide:
  showcase:
    signals:
      - "Primarily informational content"
      - "No user accounts or minimal"
      - "No payment processing"
      - "SEO is primary goal"
      - "< 20 pages"

  ecommerce:
    signals:
      - "Selling physical or digital products"
      - "Shopping cart needed"
      - "Payment processing required"
      - "Inventory management"
      - "Order management"

  saas:
    signals:
      - "Complex business logic"
      - "User accounts with roles"
      - "Subscription billing"
      - "Multi-tenancy needed"
      - "API for integrations"
      - "Long-term product evolution"
```

## How Project Types Work

### 1. Role Adjustments
Each project type modifies which roles and sub-agents are prioritized:

```yaml
example_adjustment:
  showcase:
    tech_architect:
      high: ["stack-selection", "performance-design"]
      low: ["api-design", "data-modeling"]

  saas:
    tech_architect:
      high: ["system-architecture", "security-architecture", "api-design"]
      low: ["stack-selection"]
```

### 2. Workflow Modifications
Project types define appropriate workflow phases and durations:

- **Showcase**: Linear, design-focused, short phases
- **E-commerce**: Feature-based with dedicated payment/security phases
- **SaaS**: Agile sprints with foundation → features → polish progression

### 3. HITL Gate Adjustments
Gates are relaxed or tightened based on project risk profile:

- **Showcase**: Relaxed estimation gates, strict design/performance gates
- **E-commerce**: Strict payment and security gates
- **SaaS**: Comprehensive architecture and security reviews

### 4. Stack Recommendations
Each type recommends appropriate technology choices:

- **Showcase**: Static/SSG focused (Next.js, Astro)
- **E-commerce**: Build vs buy decision (Shopify vs custom)
- **SaaS**: Full-stack with scalability (Next.js + PostgreSQL)

## Extending Project Types

To add a new project type:

1. Create a new file: `project-types/{type-name}.md`
2. Follow the existing structure:
   - Metadata (name, complexity, duration, team_size)
   - Overview and when to use
   - Characteristics
   - Recommended stack
   - Role adjustments
   - Workflow adjustments
   - HITL gate adjustments
   - Quality metrics
   - Common pitfalls

3. Add to this README's selection guide

## Hybrid Projects

Some projects combine elements:

- **Marketing site + SaaS**: Use SaaS type, apply showcase patterns to marketing pages
- **E-commerce + subscriptions**: Use e-commerce type, add SaaS billing patterns
- **Showcase + CMS + E-commerce**: Evaluate primary value, likely e-commerce type

When in doubt, choose the more complex type—it's easier to simplify than to add rigor later.

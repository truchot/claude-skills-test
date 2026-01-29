---
name: ecommerce
description: Configuration for e-commerce websites with shopping, payment, and order management
complexity: L2-L3
typical_duration: 4-12 weeks
team_size: 2-4
---

# E-Commerce Website Project Type

## Overview

E-commerce projects require robust payment processing, inventory management, and secure checkout flows. Focus on conversion optimization, trust signals, and reliable transactions.

## When to Use

- Online stores
- Marketplace sites
- Subscription box services
- Digital product sales
- Service booking with payment

## Characteristics

```yaml
characteristics:
  frontend_heavy: true
  backend_complexity: "moderate to high"
  database_needs: "required"
  user_auth: "required"
  payment: true
  realtime: "optional (inventory, chat)"
  seo_critical: true
  mobile_first: true
  security_critical: true
```

## Recommended Stack

```yaml
recommended_stack:
  build_vs_buy:
    decision_factors:
      - "Catalog size (< 1000 products: Shopify possible)"
      - "Customization needs"
      - "Integration requirements"
      - "Budget constraints"

  platform_solution:
    shopify:
      when: "Quick to market, standard e-commerce"
      pros: ["Fast setup", "Managed infrastructure", "Payment ready"]
      cons: ["Limited customization", "Monthly fees", "Vendor lock-in"]

    woocommerce:
      when: "WordPress ecosystem, flexible"
      pros: ["Customizable", "Large plugin ecosystem"]
      cons: ["Maintenance burden", "Security responsibility"]

  custom_solution:
    framework: "Next.js"
    backend: "Node.js with Express or tRPC"
    database: "PostgreSQL"
    payment: "Stripe"
    search: "Algolia or Meilisearch"
    hosting: "Vercel + Railway/Render"
    email: "SendGrid or Resend"
    cdn: "Cloudinary for images"

    when:
      - "High customization needed"
      - "Complex product configurations"
      - "Multiple integrations required"
      - "Specific business logic"

  hybrid:
    headless_shopify:
      frontend: "Next.js"
      backend: "Shopify (headless)"
      when: "Custom frontend, managed backend"

    medusa:
      description: "Open-source Shopify alternative"
      when: "Full control, self-hosted"
```

## Role Adjustments

```yaml
role_adjustments:
  tech_architect:
    focus:
      - "Payment integration security"
      - "Database schema for products/orders"
      - "Checkout flow reliability"
      - "Inventory management"
      - "Search architecture"

    agents_priority:
      high: ["security-architecture", "data-modeling", "integration-design"]
      medium: ["api-design", "performance-design", "adr-writer"]
      low: ["system-architecture"]

    critical_decisions:
      - "Build vs buy (Shopify vs custom)"
      - "Payment provider selection"
      - "Inventory strategy"
      - "Search solution"

  product_manager:
    focus:
      - "User journey (browse → checkout)"
      - "Conversion optimization"
      - "Product catalog structure"
      - "Promotion/discount rules"

    agents_priority:
      high: ["requirements-discovery", "prd-writer", "user-story-writer"]
      medium: ["prioritization", "scope-guardian"]
      low: ["roadmap-planning"]

    key_user_stories:
      - "Product browsing and filtering"
      - "Cart management"
      - "Checkout flow"
      - "Order tracking"
      - "Account management"
      - "Admin: product management"
      - "Admin: order management"

  lead_developer:
    focus:
      - "Payment integration quality"
      - "Checkout flow testing"
      - "Performance optimization"
      - "Security review"

    agents_priority:
      high: ["code-review", "estimation", "task-breakdown"]
      medium: ["sprint-planning", "standards-enforcement"]
      low: ["technical-mentoring"]

    critical_reviews:
      - "Payment handling code"
      - "User data handling"
      - "Inventory operations"

  developer:
    focus:
      - "Product display components"
      - "Cart functionality"
      - "Checkout implementation"
      - "Admin interfaces"

    agents_priority:
      high: ["frontend-implementation", "backend-implementation", "testing"]
      medium: ["debugging", "documentation"]
      low: ["refactoring"]

    testing_requirements:
      - "Payment flow (test mode)"
      - "Inventory edge cases"
      - "Discount calculations"
      - "Order state transitions"
```

## Workflow Adjustments

```yaml
workflow:
  phases:
    discovery:
      duration: "1 week"
      deliverables:
        - "Product catalog structure"
        - "User flow diagrams"
        - "Integration requirements"
        - "Build vs buy decision"

    architecture:
      duration: "1 week"
      deliverables:
        - "System architecture"
        - "Database schema"
        - "API contracts"
        - "Payment integration plan"
        - "Security architecture"

    core_development:
      duration: "3-6 weeks"
      approach: "Feature-based sprints"
      priority_order:
        1: "Product catalog (list, detail, search)"
        2: "Cart and wishlist"
        3: "Checkout flow"
        4: "Payment integration"
        5: "Order management"
        6: "User accounts"

    admin_development:
      duration: "1-2 weeks"
      deliverables:
        - "Product management"
        - "Order management"
        - "Customer management"
        - "Reports/analytics"

    testing:
      duration: "1 week"
      focus:
        - "Payment flow testing"
        - "Edge cases"
        - "Load testing (sale events)"
        - "Security testing"

    launch:
      duration: "1 week"
      steps:
        - "Staging validation"
        - "Payment go-live"
        - "DNS and SSL"
        - "Monitoring setup"
        - "Soft launch"
        - "Full launch"
```

## HITL Gate Adjustments

```yaml
gates:
  stricter:
    - gate: "Payment Integration"
      level: "🔴 BLOCKING"
      checklist:
        - "PCI compliance requirements met"
        - "Test transactions verified"
        - "Error handling complete"
        - "Refund flow tested"
        - "Webhook handling idempotent"

    - gate: "Security Review"
      level: "🔴 BLOCKING"
      checklist:
        - "Authentication secure"
        - "Payment data handling correct"
        - "SQL injection prevented"
        - "XSS prevented"
        - "CSRF protection"

    - gate: "Checkout Flow"
      level: "🔴 BLOCKING"
      checklist:
        - "Happy path works"
        - "Inventory validation"
        - "Price consistency"
        - "Error recovery"
        - "Abandonment handling"

  maintained:
    - gate: "Code Review"
      level: "🔴 BLOCKING"
      reason: "Financial transactions require scrutiny"

    - gate: "Performance"
      level: "🟡 ADVISORY"
      metrics:
        product_list: "< 2s load"
        product_detail: "< 1.5s load"
        checkout: "< 1s per step"

  added:
    - gate: "Legal Compliance"
      level: "🔴 BLOCKING"
      checklist:
        - "Terms of service"
        - "Privacy policy"
        - "Cookie consent"
        - "Return policy"
        - "Tax compliance"

    - gate: "Launch Readiness"
      level: "🔴 BLOCKING"
      checklist:
        - "Payment in live mode"
        - "Inventory synced"
        - "Email templates ready"
        - "Support process defined"
        - "Monitoring active"
```

## Critical Features

```yaml
critical_features:
  must_have:
    product_catalog:
      - "Product listing with filters"
      - "Product detail page"
      - "Search functionality"
      - "Categories and collections"

    shopping:
      - "Add to cart"
      - "Cart management"
      - "Persistent cart"

    checkout:
      - "Guest checkout option"
      - "Address management"
      - "Shipping options"
      - "Payment processing"
      - "Order confirmation"

    account:
      - "Registration/login"
      - "Order history"
      - "Address book"

    admin:
      - "Product management"
      - "Order management"
      - "Basic reporting"

  should_have:
    - "Wishlist"
    - "Product reviews"
    - "Discount codes"
    - "Inventory alerts"
    - "Email notifications"
    - "Related products"

  nice_to_have:
    - "Advanced analytics"
    - "A/B testing"
    - "Personalization"
    - "Live chat"
    - "Subscription support"
```

## Quality Metrics

```yaml
quality_metrics:
  conversion:
    cart_abandonment: "< 70%"
    checkout_completion: "> 50%"

  performance:
    product_list_load: "< 2s"
    checkout_load: "< 1s"
    search_response: "< 300ms"

  reliability:
    payment_success_rate: "> 98%"
    inventory_accuracy: "> 99%"
    order_sync: "Real-time"

  security:
    pci_compliance: "Required"
    ssl_grade: "A+"
    security_headers: "Complete"
```

## Common Pitfalls

```yaml
pitfalls:
  payment_complexity:
    symptom: "Underestimating payment edge cases"
    prevention: "Thorough testing, use Stripe test cards"

  inventory_sync:
    symptom: "Overselling, stock discrepancies"
    prevention: "Atomic operations, real-time sync"

  checkout_friction:
    symptom: "High abandonment rate"
    prevention: "Minimal steps, guest checkout, progress indicator"

  missing_error_handling:
    symptom: "Users stuck on payment failures"
    prevention: "Clear error messages, retry options"

  no_monitoring:
    symptom: "Issues discovered by customers"
    prevention: "Real-time monitoring, alerts"
```

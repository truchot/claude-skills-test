---
name: showcase
description: Configuration for showcase/portfolio websites with minimal backend requirements
complexity: L1-L2
typical_duration: 1-4 weeks
team_size: 1-2
---

# Showcase Website Project Type

## Overview

Showcase websites are primarily frontend projects with minimal backend requirements. Focus is on visual presentation, fast loading, and SEO optimization.

## When to Use

- Corporate/agency websites
- Portfolio sites
- Landing pages
- Marketing microsites
- Event websites
- Personal websites

## Characteristics

```yaml
characteristics:
  frontend_heavy: true
  backend_complexity: "minimal"
  database_needs: "optional (CMS)"
  user_auth: "rarely needed"
  payment: false
  realtime: false
  seo_critical: true
  mobile_first: true
```

## Recommended Stack

```yaml
recommended_stack:
  primary:
    framework: "Next.js"
    styling: "Tailwind CSS"
    hosting: "Vercel"
    cms: "Sanity or Strapi (optional)"
    forms: "Formspree or Netlify Forms"
    analytics: "Vercel Analytics / Plausible"

  alternatives:
    static:
      framework: "Astro"
      when: "Pure static, maximum performance"

    wordpress:
      framework: "WordPress + Elementor"
      when: "Client needs self-management"

    simple:
      framework: "HTML + Tailwind"
      when: "Single page, no JS needed"

  avoid:
    - "Full backend frameworks (Express, Django)"
    - "Complex databases (PostgreSQL)"
    - "Heavy state management (Redux)"
    - "Over-engineered solutions"
```

## Role Adjustments

```yaml
role_adjustments:
  tech_architect:
    focus:
      - "Performance optimization"
      - "SEO technical requirements"
      - "Hosting selection"
    skip:
      - "Complex system architecture"
      - "Database modeling (unless CMS)"
      - "Security architecture (minimal)"

    agents_priority:
      high: ["stack-selection", "performance-design"]
      medium: ["adr-writer"]
      low: ["api-design", "data-modeling", "security-architecture"]

  product_manager:
    focus:
      - "Content structure"
      - "User journey mapping"
      - "SEO requirements"
    skip:
      - "Complex feature prioritization"
      - "Detailed user stories (simpler pages)"

    agents_priority:
      high: ["requirements-discovery", "scope-guardian"]
      medium: ["prioritization"]
      low: ["prd-writer", "user-story-writer", "roadmap-planning"]

  lead_developer:
    focus:
      - "Component architecture"
      - "Build optimization"
      - "Responsive design review"
    skip:
      - "Complex estimation (smaller scope)"
      - "Sprint planning (often solo work)"

    agents_priority:
      high: ["code-review", "standards-enforcement"]
      medium: ["task-breakdown", "estimation"]
      low: ["sprint-planning", "technical-mentoring"]

  developer:
    focus:
      - "Frontend implementation"
      - "Animation/interactions"
      - "SEO optimization"
      - "Performance"
    skip:
      - "Backend development"
      - "Complex testing"

    agents_priority:
      high: ["frontend-implementation", "documentation"]
      medium: ["testing", "refactoring"]
      low: ["backend-implementation", "debugging"]
```

## Workflow Adjustments

```yaml
workflow:
  phases:
    discovery:
      duration: "1-3 days"
      deliverables:
        - "Content inventory"
        - "Sitemap"
        - "Technical requirements"

    design:
      duration: "3-5 days"
      deliverables:
        - "Wireframes"
        - "High-fidelity mockups"
        - "Component inventory"

    development:
      duration: "1-2 weeks"
      approach: "Page-by-page"
      deliverables:
        - "Responsive pages"
        - "CMS integration (if needed)"
        - "Contact forms"

    optimization:
      duration: "2-3 days"
      deliverables:
        - "Performance optimization"
        - "SEO implementation"
        - "Analytics setup"

    launch:
      duration: "1 day"
      deliverables:
        - "DNS configuration"
        - "SSL setup"
        - "Monitoring setup"

  skip_for_showcase:
    - "Complex sprint planning"
    - "Detailed API documentation"
    - "Integration testing"
    - "Load testing"
```

## HITL Gate Adjustments

```yaml
gates:
  relaxed:
    - gate: "Technical Estimation"
      original: "🔴 BLOCKING"
      adjusted: "🟡 ADVISORY"
      reason: "Smaller, predictable scope"

    - gate: "Sprint Commitment"
      original: "🟡 ADVISORY"
      adjusted: "🟢 AUTOMATIC"
      reason: "Usually solo work, no sprint"

  maintained:
    - gate: "Design Approval"
      level: "🔴 BLOCKING"
      reason: "Visual quality critical"

    - gate: "Performance Check"
      level: "🔴 BLOCKING"
      reason: "Core requirement for showcase"

    - gate: "SEO Checklist"
      level: "🔴 BLOCKING"
      reason: "Discoverability essential"

  added:
    - gate: "Mobile Responsiveness"
      level: "🔴 BLOCKING"
      checklist:
        - "Works on 320px width"
        - "No horizontal scroll"
        - "Touch targets 44px+"
        - "Readable without zoom"

    - gate: "Lighthouse Score"
      level: "🟡 ADVISORY"
      target:
        performance: "> 90"
        accessibility: "> 90"
        best_practices: "> 90"
        seo: "> 90"
```

## Deliverables

```yaml
deliverables:
  required:
    - "Responsive website"
    - "Contact form"
    - "Basic SEO setup"
    - "Analytics integration"
    - "Performance optimized"

  recommended:
    - "CMS for content updates"
    - "Blog/news section"
    - "Cookie consent"
    - "Social sharing"

  documentation:
    minimal:
      - "Deployment guide"
      - "CMS usage guide (if applicable)"
    skip:
      - "API documentation"
      - "Architecture diagrams"
      - "Complex README"
```

## Quality Metrics

```yaml
quality_metrics:
  performance:
    lighthouse_performance: "> 90"
    largest_contentful_paint: "< 2.5s"
    cumulative_layout_shift: "< 0.1"
    first_input_delay: "< 100ms"

  seo:
    lighthouse_seo: "> 90"
    meta_tags: "Complete"
    structured_data: "Implemented"
    sitemap: "Generated"

  accessibility:
    lighthouse_accessibility: "> 90"
    wcag_level: "AA"

  responsive:
    breakpoints_tested: ["320px", "768px", "1024px", "1440px"]
    devices_tested: ["iPhone SE", "iPad", "Desktop"]
```

## Common Pitfalls

```yaml
pitfalls:
  over_engineering:
    symptom: "Building complex CMS for 5-page site"
    prevention: "Match complexity to needs"

  neglecting_performance:
    symptom: "Heavy animations, large images"
    prevention: "Performance budget, image optimization"

  poor_seo:
    symptom: "Client-side only, no meta tags"
    prevention: "SSR/SSG, SEO checklist"

  no_mobile_first:
    symptom: "Desktop-first, mobile afterthought"
    prevention: "Design and build mobile-first"

  scope_creep:
    symptom: "Adding features until it's a SaaS"
    prevention: "Strict scope, redirect to appropriate type"
```

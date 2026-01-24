---
name: knowledge-base
description: |-
  Creates and maintains support knowledge base. Use when: (1) writing help articles, (2) documenting solutions, (3) organizing FAQs, (4) improving self-service.
metadata:
  version: 1.0.0
  status: active
  domain: support
roles: [support-lead]
---

# Knowledge Base Skill

## Purpose

Create and maintain a knowledge base that enables customers to self-serve and support team to resolve issues faster.

## You ARE

- A technical writer who explains complex things simply
- User-focused, thinking about search and navigation
- Quality-obsessed about accuracy and currency
- Data-driven about what content is needed

## You DO

1. Write clear, actionable articles
2. Organize content for findability
3. Keep content accurate and up-to-date
4. Analyze usage to identify gaps
5. Reduce support tickets through self-service
6. Maintain consistent style and quality

## You DO NOT

- Write articles nobody searches for → Data-driven priorities
- Use jargon without explanation → Plain language first
- Let articles become stale → Review cycle
- Duplicate content across articles → Single source of truth
- Publish without review → Quality gate

## Article Types

```yaml
article_types:
  how_to:
    purpose: "Step-by-step instructions for tasks"
    structure:
      - "Overview/Goal"
      - "Prerequisites"
      - "Steps"
      - "Expected outcome"
      - "Troubleshooting"
    example: "How to set up two-factor authentication"

  troubleshooting:
    purpose: "Diagnose and fix problems"
    structure:
      - "Symptoms"
      - "Possible causes"
      - "Solutions for each cause"
      - "When to contact support"
    example: "Login issues: causes and solutions"

  concept:
    purpose: "Explain ideas and features"
    structure:
      - "What it is"
      - "Why it matters"
      - "How it works"
      - "Related concepts"
    example: "Understanding user permissions"

  reference:
    purpose: "Technical specifications, API docs"
    structure:
      - "Overview"
      - "Parameters/options"
      - "Examples"
      - "Errors/edge cases"
    example: "API rate limits reference"

  faq:
    purpose: "Quick answers to common questions"
    structure:
      - "Question"
      - "Short answer"
      - "Link to detailed article"
    example: "How do I reset my password?"
```

## Article Template

```yaml
article:
  metadata:
    id: "KB-[XXXXX]"
    title: "[Clear, searchable title]"
    type: "[how_to|troubleshooting|concept|reference|faq]"

    taxonomy:
      category: "[Primary category]"
      subcategory: "[Subcategory]"
      product_area: "[Feature/module]"

    audience: "[Customer|Internal|Both]"
    skill_level: "[Beginner|Intermediate|Advanced]"

    search:
      keywords: ["[keyword1]", "[keyword2]"]
      synonyms: ["[alternate terms]"]

    versioning:
      created: "[YYYY-MM-DD]"
      last_updated: "[YYYY-MM-DD]"
      next_review: "[YYYY-MM-DD]"
      author: "[Name]"
      reviewed_by: "[Name]"

  content:
    summary: "[One-line description for search results]"

    # For How-To articles
    prerequisites:
      - "[What user needs before starting]"

    steps:
      - step_number: 1
        action: "[What to do]"
        details: "[Additional explanation if needed]"
        screenshot: "[Image URL]"
        note: "[Tip or warning]"

    expected_result: "[What success looks like]"

    # For Troubleshooting articles
    symptoms:
      - "[What the user experiences]"

    causes:
      - cause: "[What might be wrong]"
        likelihood: "[Common|Occasional|Rare]"
        solution:
          steps:
            - "[Fix step 1]"
            - "[Fix step 2]"

    # Common sections
    related_articles:
      - id: "KB-[XXXXX]"
        title: "[Article title]"

    faqs:
      - question: "[Common question]"
        answer: "[Quick answer]"

  analytics:
    views: "[X]"
    helpful_yes: "[X]"
    helpful_no: "[X]"
    support_tickets_deflected: "[X]"
```

## Writing Guidelines

### Principles

```yaml
writing_principles:
  clarity:
    - "Use simple, direct language"
    - "One idea per sentence"
    - "Avoid jargon, or define it first"
    - "Use active voice"

  scannability:
    - "Use descriptive headings"
    - "Keep paragraphs short (3-4 lines)"
    - "Use bulleted lists for items"
    - "Use numbered lists for steps"
    - "Bold key terms"

  completeness:
    - "Include prerequisites"
    - "Show expected outcomes"
    - "Anticipate common questions"
    - "Provide troubleshooting tips"

  accuracy:
    - "Test all steps before publishing"
    - "Keep screenshots current"
    - "Link to authoritative sources"
    - "Note version-specific information"
```

### Style Guide

```yaml
style_guide:
  titles:
    do: "How to set up two-factor authentication"
    dont: "2FA Setup Process and Configuration Guide"

  instructions:
    do: "Click **Settings** > **Security**"
    dont: "Navigate to the Settings menu and then find Security"

  warnings:
    format: "⚠️ **Warning:** [What could go wrong]"

  tips:
    format: "💡 **Tip:** [Helpful suggestion]"

  code:
    format: "Use `code blocks` for commands"
```

## Content Lifecycle

```yaml
lifecycle:
  creation:
    trigger:
      - "New feature launched"
      - "Repeated support tickets"
      - "Gap identified in analytics"
    process:
      - "Draft article"
      - "Technical review"
      - "Editorial review"
      - "Publish"

  maintenance:
    review_cycle: "Quarterly"
    triggers_for_update:
      - "Product change"
      - "Helpful rating < 70%"
      - "Support reports inaccuracy"
      - "Search rank dropping"

  retirement:
    triggers:
      - "Feature deprecated"
      - "Zero views in 6 months"
      - "Superseded by new article"
    process:
      - "Redirect to replacement"
      - "Archive, don't delete"
```

## Analytics & Optimization

```yaml
analytics:
  key_metrics:
    - metric: "Article views"
      purpose: "Popularity and demand"
    - metric: "Helpful rating"
      purpose: "Content quality"
    - metric: "Search-to-view rate"
      purpose: "Title/keyword effectiveness"
    - metric: "Exit rate to support"
      purpose: "Self-service success"
    - metric: "Ticket deflection"
      purpose: "Business impact"

  analysis_questions:
    - "Which articles are most/least viewed?"
    - "Which articles have low helpful ratings?"
    - "What are people searching for but not finding?"
    - "Which articles lead to support tickets?"

  optimization_actions:
    low_views:
      - "Improve SEO/keywords"
      - "Promote in product"
      - "Link from other articles"
    low_helpful:
      - "Review for accuracy"
      - "Improve clarity"
      - "Add missing information"
    high_exit_to_support:
      - "Content may be incomplete"
      - "Add troubleshooting section"
      - "Make next steps clearer"
```

## HITL Gates

| Gate | Type | Trigger |
|------|------|---------|
| New article | 🟡 ADVISORY | Before publishing |
| Major update | 🟡 ADVISORY | Significant content change |
| Retirement | 🟡 ADVISORY | Before archiving |
| Quality review | 🟢 AUTOMATIC | Quarterly cycle |

## Quality Checklist

```
BEFORE PUBLISHING:
- [ ] Title is clear and searchable
- [ ] Steps tested and accurate
- [ ] Screenshots current
- [ ] No broken links
- [ ] Keywords added
- [ ] Category assigned
- [ ] Reviewed by SME

PERIODIC REVIEW:
- [ ] Information still accurate
- [ ] Screenshots current
- [ ] Links working
- [ ] Helpful rating acceptable
- [ ] Traffic healthy
```

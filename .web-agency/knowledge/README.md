# Knowledge Base

Company knowledge repository for APEX method. Contains reusable patterns, documented cases, actionable rules, and verification checklists.

## Purpose

This knowledge base captures **organizational learning** to make procedures:
- **Repeatable**: Same approach works every time
- **Teachable**: Both AI and humans can learn from it
- **Improvable**: Lessons feed back into better practices

## Structure

```
knowledge/
├── README.md           ← This file
├── patterns/           ← Proven solutions to recurring problems
├── cases/              ← Real examples with context and outcomes
├── rules/              ← Actionable guidelines and constraints
└── checklists/         ← Verification lists for quality gates
```

## Knowledge Types

### 📐 Patterns

**What**: Proven solutions to recurring problems
**Format**: Problem → Context → Solution → Consequences
**Example**: "How to handle scope creep"

```yaml
# patterns/project-management/scope-creep.md
pattern:
  name: "Scope Creep Prevention"
  problem: "Stakeholders keep adding requirements"
  context: "Mid-project, team already committed"
  solution:
    steps:
      - "Document change request formally"
      - "Assess impact on timeline/budget"
      - "Require approval for changes"
  consequences:
    positive: "Scope remains controlled"
    negative: "May frustrate stakeholders short-term"
```

### 📚 Cases

**What**: Real examples with context and outcomes
**Format**: Situation → Decision → Outcome → Lessons
**Example**: "E-commerce migration that went wrong"

```yaml
# cases/migration/ecommerce-2024.md
case:
  title: "E-commerce Platform Migration"
  date: "2024-03"
  type: "migration"
  situation: "Client wanted to migrate from WooCommerce to custom"
  decision: "Proceeded without proper data audit"
  outcome: "Lost 3 weeks recovering product variants"
  lessons:
    - "Always audit data complexity before migration"
    - "Create rollback plan before starting"
  tags: ["migration", "e-commerce", "data"]
```

### 📏 Rules

**What**: Actionable guidelines and constraints
**Format**: Rule → Rationale → Exceptions → Enforcement
**Example**: "Never deploy on Fridays"

```yaml
# rules/deployment.md
rule:
  id: "RULE-001"
  statement: "No production deployments on Fridays"
  rationale: "Weekend support is limited"
  exceptions:
    - "Critical security patches"
    - "Explicit leadership approval"
  enforcement: "CI/CD blocks Friday deploys by default"
```

### ✅ Checklists

**What**: Verification lists for quality gates
**Format**: Ordered items to verify before proceeding
**Example**: "Pre-launch checklist"

```yaml
# checklists/pre-launch.md
checklist:
  name: "Pre-Launch Checklist"
  when: "Before any production release"
  items:
    - category: "Quality"
      checks:
        - "All tests passing"
        - "No P0/P1 bugs open"
    - category: "Operations"
      checks:
        - "Rollback plan documented"
        - "Monitoring alerts configured"
```

## Adding Knowledge

### When to Add

- **After a project**: Extract patterns and cases during retrospective
- **After an incident**: Document what happened and lessons
- **When repeating yourself**: If you explain something twice, document it
- **When onboarding**: Fill gaps that new team members expose

### How to Add

1. **Choose the right type**:
   - Reusable solution → Pattern
   - Specific example → Case
   - Guideline/constraint → Rule
   - Verification → Checklist

2. **Use the template**:
   - Copy from `_templates/`
   - Fill all required fields
   - Add relevant tags

3. **Review**:
   - Technical accuracy check
   - Clarity review
   - Tag appropriately

4. **Link**:
   - Reference from relevant ROLE.md files
   - Reference from relevant SKILL.md files

## Using Knowledge

### For AI Agents

Skills reference knowledge files in their `Knowledge References` section:

```markdown
## Knowledge References

- `knowledge/patterns/code-review.md`
- `knowledge/rules/estimation.md`
- `knowledge/checklists/pre-development.md`
```

When executing a skill, load relevant knowledge for context.

### For Humans

- Browse by category (patterns/cases/rules/checklists)
- Search by tags
- Follow references from role/skill documentation

## Maintenance

### Quarterly Review

- Remove outdated knowledge
- Update based on new learnings
- Consolidate duplicates
- Verify links still work

### Metrics

Track knowledge base health:
- Total items by type
- Last update dates
- Usage/reference frequency
- Gap identification

## Learning Loop

```
┌─────────────────┐
│   EXPERIENCE    │  ← Projects, incidents, feedback
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│    EXTRACT      │  ← Identify patterns, lessons, rules
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│   DOCUMENT      │  ← Add to knowledge base
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│     APPLY       │  ← Use in future work
└────────┬────────┘
         │
         └──────────────→ Back to EXPERIENCE
```

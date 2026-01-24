# Context Packs

> **Pre-packaged context sets for common task types**

---

## Overview

Context Packs are pre-defined bundles of context files that accelerate story generation. Instead of manually identifying which stack, ADRs, patterns, and standards apply to each story, agents load the appropriate Context Pack.

```
TASK TYPE DETECTED
       ↓
CONTEXT PACK LOADED
  • Stack sections (pre-selected)
  • ADR patterns (pre-matched)
  • Patterns (pre-identified)
  • Standards (pre-filtered)
       ↓
STORY GENERATION (3x faster)
```

---

## Available Packs

| Pack | Use When | Files |
|------|----------|-------|
| `api-endpoint.yaml` | Creating/modifying API endpoints | Stack, API patterns, validation |
| `react-component.yaml` | Creating React/Next.js components | Frontend stack, React patterns |
| `database-schema.yaml` | Database changes, migrations | DB stack, Prisma patterns |
| `authentication.yaml` | Auth features, permissions | Auth stack, security patterns |
| `testing.yaml` | Writing tests | Testing stack, test patterns |
| `deployment.yaml` | CI/CD, infrastructure | DevOps stack, deployment patterns |
| `seo-content.yaml` | SEO, content optimization | Marketing contexts, SEO patterns |
| `analytics.yaml` | Tracking, dashboards | Analytics context, GTM patterns |

---

## Pack Structure

```yaml
# contexts/packs/{pack-name}.yaml

name: "Pack Display Name"
description: "When to use this pack"
version: "1.0"

# Stack sections to extract (from .project/03-architecture/stack.md)
stack_sections:
  - "framework"
  - "language"
  - "specific_section"

# ADR patterns to match (glob patterns)
adr_patterns:
  - "ADR-*-api*"
  - "ADR-*-validation*"

# Knowledge patterns to include
patterns:
  - "technical/api-design.md"
  - "technical/error-handling.md"

# Standards to apply
standards:
  - "typescript"
  - "rest-conventions"

# Context files to load
contexts:
  - "backend.md"

# Common related file patterns (to search in codebase)
related_file_patterns:
  - "src/app/api/**/*.ts"
  - "src/lib/*.ts"
```

---

## Usage in Story Generation

### Automatic Pack Detection

The story generator auto-detects the appropriate pack:

```yaml
pack_detection_rules:
  api-endpoint:
    keywords: ["endpoint", "api", "route", "handler", "REST"]
    file_patterns: ["**/api/**", "**/routes/**"]

  react-component:
    keywords: ["component", "UI", "page", "form", "button"]
    file_patterns: ["**/components/**", "**/app/**/*.tsx"]

  database-schema:
    keywords: ["schema", "model", "migration", "table", "prisma"]
    file_patterns: ["**/prisma/**", "**/models/**"]
```

### Manual Pack Selection

Override auto-detection in story generation:

```yaml
# In story generation request
context_pack: "api-endpoint"  # Explicit pack selection
```

### Pack Composition

Combine multiple packs for complex stories:

```yaml
context_packs:
  - "api-endpoint"      # Primary
  - "authentication"    # Also needs auth context
  - "database-schema"   # Also touches DB
```

---

## Creating Custom Packs

1. Copy an existing pack as template
2. Adjust sections for your domain
3. Test with a sample story generation
4. Add to this README table

### Pack Quality Checklist

- [ ] All referenced files exist
- [ ] ADR patterns match actual ADRs
- [ ] Patterns are relevant (not too broad)
- [ ] Standards are applicable
- [ ] Related file patterns are accurate

---

## References

- `core/story-generation.md` - How packs integrate with story generation
- `templates/STORY-TEMPLATE.md` - Where pack context is embedded

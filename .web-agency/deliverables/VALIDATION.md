# Validation des Livrables

> Ce document décrit les règles de validation et les scripts pour vérifier l'intégrité des livrables.

## 1. Validation du Frontmatter

Chaque livrable doit avoir un frontmatter YAML valide avec les champs obligatoires :

```yaml
---
id: string           # Required - unique identifier (kebab-case)
name: string         # Required - human readable name
version: string      # Required - semver format (X.Y.Z)
category: string     # Required - one of: process, code, design, specification, report, strategy, documentation, marketing, wordpress
status: string       # Required - one of: active, draft, deprecated
phase: string        # Required - format "X-name" (e.g., "3-conception")
order: number        # Required - order within phase
agents: array        # Required - list of agent paths (skill/domain/agent)
consumes: array      # Optional - list of deliverable IDs this depends on
produces_for: array  # Optional - list of agent paths that use this
workflows: array     # Optional - workflow definitions
tags: array          # Required - at least one tag
---
```

### Script de Validation Frontmatter

```bash
#!/bin/bash
# validate-frontmatter.sh

for file in .web-agency/deliverables/by-category/**/*.md; do
  echo "Checking: $file"

  # Extract frontmatter
  frontmatter=$(sed -n '/^---$/,/^---$/p' "$file")

  # Check required fields
  for field in id name version category status phase order agents tags; do
    if ! echo "$frontmatter" | grep -q "^$field:"; then
      echo "  ❌ Missing required field: $field"
    fi
  done
done
```

## 2. Validation des Cross-References

### Règles

1. **`consumes`** : Chaque ID référencé doit exister comme fichier dans `/deliverables/`
2. **`produces_for`** : Chaque agent référencé doit exister dans `/skills/`
3. **`agents`** : Chaque agent référencé doit exister dans `/skills/`

### Script de Validation Cross-References

```bash
#!/bin/bash
# validate-crossrefs.sh

DELIVERABLES_DIR=".web-agency/deliverables/by-category"
SKILLS_DIR=".web-agency/skills"

# Build list of valid deliverable IDs
valid_deliverables=$(grep -rh "^id: " $DELIVERABLES_DIR --include="*.md" | sed 's/id: //')

# Build list of valid agent paths
valid_agents=$(find $SKILLS_DIR -name "*.md" -path "*/agents/*" | sed "s|$SKILLS_DIR/||" | sed 's|/agents/|/|' | sed 's|\.md$||')

# Check each deliverable
for file in $DELIVERABLES_DIR/**/*.md; do
  echo "Checking: $file"

  # Check consumes references
  consumes=$(grep -A 100 "^consumes:" "$file" | grep -E "^  - " | sed 's/  - //' | head -20)
  for ref in $consumes; do
    if ! echo "$valid_deliverables" | grep -q "^$ref$"; then
      echo "  ⚠️ Unknown deliverable in consumes: $ref"
    fi
  done

  # Check agent references
  agents=$(grep -A 100 "^agents:" "$file" | grep -E "^  - " | sed 's/  - //' | head -20)
  for agent in $agents; do
    if ! echo "$valid_agents" | grep -q "$agent"; then
      echo "  ⚠️ Unknown agent: $agent"
    fi
  done
done
```

## 3. Matrice des Dépendances

### Livrables et leurs Dépendances

| Livrable | Consomme | Produit pour |
|----------|----------|--------------|
| `client-request` | - | project-qualification, requirements-list |
| `requirements-list` | client-request | technical-specification, project-brief |
| `project-brief` | requirements-list, project-qualification | macro-estimation, stack-recommendation |
| `technical-specification` | requirements-list, data-model | database-schema, test-suite |
| `database-schema` | data-model, technical-specification | test-suite, ci-pipeline |
| `test-suite` | technical-specification | code-review-report, ci-pipeline |
| `ci-pipeline` | test-suite, database-schema | deployment-runbook |
| `deployment-runbook` | ci-pipeline | launch-checklist |

### Graphe de Dépendances

```
                    ┌─────────────────┐
                    │ client-request  │
                    └────────┬────────┘
                             │
              ┌──────────────┼──────────────┐
              ▼              ▼              ▼
     ┌────────────┐  ┌──────────────┐  ┌────────────┐
     │requirements│  │qualification │  │tech-audit  │
     └─────┬──────┘  └──────┬───────┘  └────────────┘
           │                │
           ▼                ▼
     ┌───────────────────────────────┐
     │        project-brief          │
     └───────────────┬───────────────┘
                     │
        ┌────────────┼────────────┐
        ▼            ▼            ▼
   ┌─────────┐  ┌─────────┐  ┌─────────┐
   │ macro-  │  │ stack-  │  │ risk-   │
   │estimate │  │ recomm. │  │ matrix  │
   └─────────┘  └─────────┘  └─────────┘
```

## 4. Validation de Catégorie

### Catégories Valides

| Catégorie | Description | Répertoire |
|-----------|-------------|------------|
| `process` | Processus et workflows | `by-category/process/` |
| `code` | Artefacts de code | `by-category/code/` |
| `design` | Livrables design | `by-category/design/` |
| `specification` | Spécifications | `by-category/specification/` |
| `report` | Rapports et audits | `by-category/report/` |
| `strategy` | Documents stratégiques | `by-category/strategy/` |
| `documentation` | Documentation | `by-category/documentation/` |
| `marketing` | Livrables marketing | `by-category/marketing/` |
| `wordpress` | Livrables WordPress | `by-category/wordpress/` |

### Règle

Le champ `category` dans le frontmatter doit correspondre au répertoire parent du fichier.

```bash
# Vérifier cohérence catégorie/répertoire
for file in .web-agency/deliverables/by-category/**/*.md; do
  dir_category=$(echo "$file" | sed 's|.*/by-category/\([^/]*\)/.*|\1|')
  yaml_category=$(grep "^category:" "$file" | sed 's/category: //')

  if [ "$dir_category" != "$yaml_category" ]; then
    echo "❌ Category mismatch: $file"
    echo "   Directory: $dir_category, YAML: $yaml_category"
  fi
done
```

## 5. Validation de Phase

### Phases Valides

| Phase | Description |
|-------|-------------|
| `1-intake` | Prise de brief client |
| `2-strategy` | Stratégie et estimation |
| `3-conception` | Spécifications et design |
| `4-realisation` | Développement et tests |
| `5-deploiement` | Déploiement et CI/CD |
| `6-maintenance` | Post-lancement et maintenance |

### Règle

L'`order` doit être unique au sein d'une phase.

## 6. CI Integration

### GitHub Actions Workflow

```yaml
# .github/workflows/validate-deliverables.yml
name: Validate Deliverables

on:
  pull_request:
    paths:
      - '.web-agency/deliverables/**'

jobs:
  validate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Validate Frontmatter
        run: |
          for file in .web-agency/deliverables/by-category/**/*.md; do
            # Check YAML validity
            head -50 "$file" | yq e '.' - > /dev/null || echo "Invalid YAML: $file"
          done

      - name: Check Cross-References
        run: ./scripts/validate-crossrefs.sh

      - name: Check Category Consistency
        run: ./scripts/validate-categories.sh
```

## 7. Rapport de Validation

### Commande de Génération

```bash
./scripts/generate-validation-report.sh > VALIDATION_REPORT.md
```

### Format du Rapport

```markdown
# Validation Report - [Date]

## Summary
- Total deliverables: XX
- Valid: XX
- Warnings: XX
- Errors: XX

## Errors
[List of errors]

## Warnings
[List of warnings]

## Coverage
- Agents with deliverables: XX/757 (XX%)
- Cross-referenced deliverables: XX/XX (XX%)
```

## 8. Checklist Manuelle

Pour chaque nouveau livrable :

- [ ] Frontmatter complet et valide
- [ ] ID unique en kebab-case
- [ ] Catégorie = répertoire parent
- [ ] Au moins un agent référencé
- [ ] `consumes` valides (IDs existants)
- [ ] `produces_for` valides (agents existants)
- [ ] Tags pertinents
- [ ] Version au format semver
- [ ] Structure suivant le template

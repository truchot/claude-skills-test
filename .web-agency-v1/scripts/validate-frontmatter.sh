#!/bin/bash
# validate-frontmatter.sh
# Validates that all deliverable files have required frontmatter fields

set -e
shopt -s globstar nullglob

DELIVERABLES_DIR=".web-agency/deliverables/by-category"
REQUIRED_FIELDS=("id" "name" "version" "category" "status" "phase" "order" "agents" "tags")
VALID_CATEGORIES=("process" "code" "design" "specification" "report" "strategy" "documentation" "marketing" "wordpress")
VALID_STATUSES=("active" "draft" "deprecated")

errors=0
warnings=0
checked=0

echo "🔍 Validating Deliverable Frontmatter"
echo "======================================"
echo ""

for file in "$DELIVERABLES_DIR"/**/*.md; do
  [ -f "$file" ] || continue
  ((checked++))

  filename=$(basename "$file")
  has_error=false

  # Extract frontmatter (between first two ---)
  frontmatter=$(sed -n '/^---$/,/^---$/p' "$file" | head -100)

  if [ -z "$frontmatter" ]; then
    echo "❌ $filename: No frontmatter found"
    ((errors++))
    continue
  fi

  # Check required fields
  for field in "${REQUIRED_FIELDS[@]}"; do
    if ! echo "$frontmatter" | grep -q "^$field:"; then
      echo "❌ $filename: Missing required field '$field'"
      ((errors++))
      has_error=true
    fi
  done

  # Check category matches directory
  dir_category=$(echo "$file" | sed 's|.*/by-category/\([^/]*\)/.*|\1|')
  yaml_category=$(echo "$frontmatter" | grep "^category:" | sed 's/category: //' | tr -d ' ')

  if [ -n "$yaml_category" ] && [ "$dir_category" != "$yaml_category" ]; then
    echo "❌ $filename: Category mismatch (dir: $dir_category, yaml: $yaml_category)"
    ((errors++))
    has_error=true
  fi

  # Check valid category
  if [ -n "$yaml_category" ]; then
    valid=false
    for cat in "${VALID_CATEGORIES[@]}"; do
      if [ "$yaml_category" = "$cat" ]; then
        valid=true
        break
      fi
    done
    if [ "$valid" = false ]; then
      echo "⚠️  $filename: Invalid category '$yaml_category'"
      ((warnings++))
    fi
  fi

  # Check valid status
  yaml_status=$(echo "$frontmatter" | grep "^status:" | sed 's/status: //' | tr -d ' ')
  if [ -n "$yaml_status" ]; then
    valid=false
    for stat in "${VALID_STATUSES[@]}"; do
      if [ "$yaml_status" = "$stat" ]; then
        valid=true
        break
      fi
    done
    if [ "$valid" = false ]; then
      echo "⚠️  $filename: Invalid status '$yaml_status'"
      ((warnings++))
    fi
  fi

  # Check version format (semver)
  yaml_version=$(echo "$frontmatter" | grep "^version:" | sed 's/version: //' | tr -d ' ')
  if [ -n "$yaml_version" ]; then
    if ! echo "$yaml_version" | grep -qE '^[0-9]+\.[0-9]+\.[0-9]+$'; then
      echo "⚠️  $filename: Invalid version format '$yaml_version' (expected X.Y.Z)"
      ((warnings++))
    fi
  fi

  # Check phase format
  yaml_phase=$(echo "$frontmatter" | grep "^phase:" | sed 's/phase: //' | tr -d '"' | tr -d ' ')
  if [ -n "$yaml_phase" ]; then
    if ! echo "$yaml_phase" | grep -qE '^[0-9]+-[a-z]+$'; then
      echo "⚠️  $filename: Invalid phase format '$yaml_phase' (expected X-name)"
      ((warnings++))
    fi
  fi

  if [ "$has_error" = false ]; then
    echo "✅ $filename"
  fi
done

echo ""
echo "======================================"
echo "Summary: $checked files checked"
echo "  ✅ Valid: $((checked - errors))"
echo "  ❌ Errors: $errors"
echo "  ⚠️  Warnings: $warnings"
echo ""

if [ $errors -gt 0 ]; then
  exit 1
fi

#!/bin/bash
# validate-crossrefs.sh
# Validates cross-references between deliverables and agents

set -e
shopt -s globstar nullglob

DELIVERABLES_DIR=".web-agency/deliverables/by-category"
SKILLS_DIR=".web-agency/skills"

errors=0
warnings=0
checked=0

echo "🔗 Validating Cross-References"
echo "======================================"
echo ""

# Build list of valid deliverable IDs
echo "Building deliverable index..."
valid_deliverables=$(grep -rh "^id: " "$DELIVERABLES_DIR" --include="*.md" 2>/dev/null | sed 's/id: //' | tr -d ' ' || echo "")

# Build list of valid agent paths
echo "Building agent index..."
if [ -d "$SKILLS_DIR" ]; then
  valid_agents=$(find "$SKILLS_DIR" -name "*.md" -path "*/agents/*" 2>/dev/null | \
    sed "s|$SKILLS_DIR/||" | \
    sed 's|/agents/|/|' | \
    sed 's|\.md$||' || echo "")
else
  echo "⚠️  Skills directory not found: $SKILLS_DIR"
  valid_agents=""
fi

echo ""
echo "Checking deliverables..."
echo ""

for file in "$DELIVERABLES_DIR"/**/*.md; do
  [ -f "$file" ] || continue
  ((checked++))

  filename=$(basename "$file")
  has_issue=false

  # Extract frontmatter
  frontmatter=$(sed -n '/^---$/,/^---$/p' "$file" | head -100)

  # Check consumes references
  in_consumes=false
  while IFS= read -r line; do
    if echo "$line" | grep -q "^consumes:"; then
      in_consumes=true
      continue
    fi
    if [ "$in_consumes" = true ]; then
      if echo "$line" | grep -qE "^  - "; then
        ref=$(echo "$line" | sed 's/  - //' | tr -d ' ')
        if [ -n "$ref" ] && ! echo "$valid_deliverables" | grep -q "^$ref$"; then
          echo "⚠️  $filename: Unknown deliverable in consumes: '$ref'"
          ((warnings++))
          has_issue=true
        fi
      elif ! echo "$line" | grep -qE "^  "; then
        in_consumes=false
      fi
    fi
  done <<< "$frontmatter"

  # Check agents references
  in_agents=false
  while IFS= read -r line; do
    if echo "$line" | grep -q "^agents:"; then
      in_agents=true
      continue
    fi
    if [ "$in_agents" = true ]; then
      if echo "$line" | grep -qE "^  - "; then
        agent=$(echo "$line" | sed 's/  - //' | tr -d ' ')
        if [ -n "$agent" ] && [ -n "$valid_agents" ]; then
          # Fuzzy match - check if any valid agent contains this path
          if ! echo "$valid_agents" | grep -q "$agent"; then
            echo "⚠️  $filename: Unverified agent reference: '$agent'"
            ((warnings++))
            has_issue=true
          fi
        fi
      elif ! echo "$line" | grep -qE "^  "; then
        in_agents=false
      fi
    fi
  done <<< "$frontmatter"

  # Check produces_for references
  in_produces=false
  while IFS= read -r line; do
    if echo "$line" | grep -q "^produces_for:"; then
      in_produces=true
      continue
    fi
    if [ "$in_produces" = true ]; then
      if echo "$line" | grep -qE "^  - "; then
        agent=$(echo "$line" | sed 's/  - //' | tr -d ' ')
        if [ -n "$agent" ] && [ -n "$valid_agents" ]; then
          if ! echo "$valid_agents" | grep -q "$agent"; then
            echo "⚠️  $filename: Unverified agent in produces_for: '$agent'"
            ((warnings++))
            has_issue=true
          fi
        fi
      elif ! echo "$line" | grep -qE "^  "; then
        in_produces=false
      fi
    fi
  done <<< "$frontmatter"

  if [ "$has_issue" = false ]; then
    echo "✅ $filename"
  fi
done

echo ""
echo "======================================"
echo "Summary: $checked files checked"
echo "  ❌ Errors: $errors"
echo "  ⚠️  Warnings: $warnings"
echo ""

if [ $errors -gt 0 ]; then
  exit 1
fi

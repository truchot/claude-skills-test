#!/bin/bash
# Detect circular dependencies in deliverable consumes relationships
# Implements DFS-based cycle detection
#
# Requirements: Bash 4.0+ (for associative arrays)

set -e

# Check Bash version (associative arrays require Bash 4+)
if ((BASH_VERSINFO[0] < 4)); then
  echo "❌ Error: Bash 4.0+ required for associative arrays"
  echo "   Current version: $BASH_VERSION"
  echo "   On macOS: brew install bash"
  exit 2
fi

# Enable globstar for ** patterns and nullglob for empty matches
shopt -s globstar nullglob

DELIVERABLES_DIR=".web-agency/deliverables/by-category"
declare -A DEPS
declare -A VISITING
declare -A VISITED
ERRORS=0

echo "🔍 Detecting circular dependencies in deliverables..."
echo ""

# Parse consumes from frontmatter
parse_consumes() {
  local file="$1"
  local name
  name=$(grep -m1 "^name:" "$file" 2>/dev/null | sed 's/name: *//' | tr -d '"' || echo "")

  if [ -z "$name" ]; then
    return
  fi

  # Extract consumes array from frontmatter
  local in_consumes=false
  local deps=""

  while IFS= read -r line; do
    # End of frontmatter
    [[ "$line" == "---" && "$in_consumes" == true ]] && break
    [[ "$line" == "---" ]] && continue

    # Start of consumes section
    if [[ "$line" =~ ^consumes: ]]; then
      in_consumes=true
      continue
    fi

    # End of consumes section (next key)
    if [[ "$in_consumes" == true && "$line" =~ ^[a-z_]+: ]]; then
      break
    fi

    # Parse consume item
    if [[ "$in_consumes" == true && "$line" =~ ^[[:space:]]*-[[:space:]]*(.*) ]]; then
      local dep="${BASH_REMATCH[1]}"
      dep=$(echo "$dep" | tr -d '"' | tr -d "'" | xargs)
      if [ -n "$dep" ]; then
        deps="$deps $dep"
      fi
    fi
  done < "$file"

  DEPS["$name"]="$deps"
}

# DFS cycle detection
has_cycle() {
  local node="$1"
  local path="$2"

  # Already fully visited - no cycle through this node
  if [[ "${VISITED[$node]}" == "1" ]]; then
    return 1
  fi

  # Currently visiting - cycle detected!
  if [[ "${VISITING[$node]}" == "1" ]]; then
    echo "❌ Circular dependency detected: $path → $node"
    return 0
  fi

  # Mark as currently visiting
  VISITING["$node"]="1"

  # Visit all dependencies
  local deps="${DEPS[$node]}"
  for dep in $deps; do
    if has_cycle "$dep" "$path → $node"; then
      return 0
    fi
  done

  # Done visiting this node
  VISITING["$node"]=""
  VISITED["$node"]="1"

  return 1
}

# Parse all deliverable files
echo "📂 Parsing deliverable dependencies..."
for file in "$DELIVERABLES_DIR"/**/*.md; do
  [ -f "$file" ] || continue
  parse_consumes "$file"
done

echo "   Found ${#DEPS[@]} deliverables with dependencies defined"
echo ""

# Check for cycles starting from each node
echo "🔄 Checking for circular dependencies..."
for node in "${!DEPS[@]}"; do
  # Reset visiting state for each starting node
  VISITING=()

  if has_cycle "$node" ""; then
    ((ERRORS++))
  fi
done

echo ""
echo "================================"
if [ $ERRORS -eq 0 ]; then
  echo "✅ No circular dependencies detected"
  exit 0
else
  echo "❌ Found $ERRORS circular dependency chain(s)"
  echo ""
  echo "To fix:"
  echo "  1. Review the dependency chain(s) above"
  echo "  2. Remove one dependency to break the cycle"
  echo "  3. Consider if the dependency is truly required"
  exit 1
fi

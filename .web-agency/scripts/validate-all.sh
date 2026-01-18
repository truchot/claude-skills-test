#!/bin/bash
# validate-all.sh
# Master validation script that runs all validations

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

echo "╔══════════════════════════════════════════════════════════╗"
echo "║         Web Agency Deliverables Validation               ║"
echo "╚══════════════════════════════════════════════════════════╝"
echo ""

total_errors=0

# Run frontmatter validation
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Step 1/3: Frontmatter Validation"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
if ! "$SCRIPT_DIR/validate-frontmatter.sh"; then
  ((total_errors++))
fi
echo ""

# Run cross-reference validation
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Step 2/3: Cross-Reference Validation"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
if ! "$SCRIPT_DIR/validate-crossrefs.sh"; then
  ((total_errors++))
fi
echo ""

# Generate coverage report
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Step 3/3: Coverage Report"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

DELIVERABLES_DIR=".web-agency/deliverables/by-category"

# Count deliverables by category
echo ""
echo "📊 Deliverables by Category:"
for cat_dir in "$DELIVERABLES_DIR"/*/; do
  if [ -d "$cat_dir" ]; then
    cat_name=$(basename "$cat_dir")
    count=$(find "$cat_dir" -name "*.md" -type f 2>/dev/null | wc -l)
    printf "   %-15s %3d files\n" "$cat_name:" "$count"
  fi
done

total=$(find "$DELIVERABLES_DIR" -name "*.md" -type f 2>/dev/null | wc -l)
echo ""
echo "   Total: $total deliverables"
echo ""

# Final status
echo "╔══════════════════════════════════════════════════════════╗"
if [ $total_errors -eq 0 ]; then
  echo "║  ✅ All validations passed!                              ║"
else
  echo "║  ❌ Some validations failed ($total_errors issues)                    ║"
fi
echo "╚══════════════════════════════════════════════════════════╝"

exit $total_errors

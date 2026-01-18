#!/bin/bash
# Verify that VERSION file matches actual agent count
# Prevents VERSION drift

set -e

SKILLS_DIR=".web-agency/skills"
VERSION_FILE="$SKILLS_DIR/VERSION"

echo "🔍 Verifying agent count consistency..."
echo ""

# Count actual agents
ACTUAL_COUNT=$(find "$SKILLS_DIR" -name "*.md" -path "*/agents/*" -type f | wc -l)

# Extract expected count from VERSION file
EXPECTED_COUNT=$(grep "^TOTAL_AGENTS=" "$VERSION_FILE" | cut -d'=' -f2)

# Extract skill count
ACTUAL_SKILLS=$(find "$SKILLS_DIR" -name "SKILL.md" -type f | wc -l)
EXPECTED_SKILLS=$(grep "^TOTAL_SKILLS=" "$VERSION_FILE" | cut -d'=' -f2)

echo "📊 Agent Count:"
echo "   Actual:   $ACTUAL_COUNT"
echo "   Expected: $EXPECTED_COUNT (from VERSION)"
echo ""
echo "📊 Skill Count:"
echo "   Actual:   $ACTUAL_SKILLS"
echo "   Expected: $EXPECTED_SKILLS (from VERSION)"
echo ""

ERRORS=0

if [ "$ACTUAL_COUNT" -ne "$EXPECTED_COUNT" ]; then
    echo "❌ ERROR: Agent count mismatch!"
    echo "   Please update VERSION file: TOTAL_AGENTS=$ACTUAL_COUNT"
    ERRORS=$((ERRORS + 1))
else
    echo "✅ Agent count matches"
fi

if [ "$ACTUAL_SKILLS" -ne "$EXPECTED_SKILLS" ]; then
    echo "❌ ERROR: Skill count mismatch!"
    echo "   Please update VERSION file: TOTAL_SKILLS=$ACTUAL_SKILLS"
    ERRORS=$((ERRORS + 1))
else
    echo "✅ Skill count matches"
fi

echo ""
echo "================================"
if [ $ERRORS -eq 0 ]; then
    echo "✅ VERSION file is in sync"
    exit 0
else
    echo "❌ VERSION file needs update"
    echo ""
    echo "To fix, run:"
    echo "  sed -i 's/TOTAL_AGENTS=.*/TOTAL_AGENTS=$ACTUAL_COUNT/' $VERSION_FILE"
    echo "  sed -i 's/TOTAL_SKILLS=.*/TOTAL_SKILLS=$ACTUAL_SKILLS/' $VERSION_FILE"
    exit 1
fi

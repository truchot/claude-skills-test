#!/bin/bash
# Test: Validate command → skill loading chain
# Ensures each command in .claude/commands/ references a valid skill in .web-agency/skills/

set -e

COMMANDS_DIR=".claude/commands"
SKILLS_DIR=".web-agency/skills"
ERRORS=0

echo "🔍 Validating command → skill references..."
echo ""

for cmd_file in "$COMMANDS_DIR"/*.md; do
    cmd_name=$(basename "$cmd_file" .md)

    # Extract skill reference from command file
    skill_ref=$(grep -oP '\.web-agency/skills/[^/]+' "$cmd_file" | head -1 | sed 's|.web-agency/skills/||')

    if [ -z "$skill_ref" ]; then
        echo "❌ $cmd_name: No skill reference found"
        ERRORS=$((ERRORS + 1))
        continue
    fi

    # Check if skill exists
    if [ -d "$SKILLS_DIR/$skill_ref" ]; then
        # Check if SKILL.md exists
        if [ -f "$SKILLS_DIR/$skill_ref/SKILL.md" ]; then
            echo "✅ $cmd_name → $skill_ref (SKILL.md found)"
        else
            echo "⚠️  $cmd_name → $skill_ref (missing SKILL.md)"
            ERRORS=$((ERRORS + 1))
        fi
    else
        echo "❌ $cmd_name → $skill_ref (skill directory not found)"
        ERRORS=$((ERRORS + 1))
    fi
done

echo ""
echo "================================"
if [ $ERRORS -eq 0 ]; then
    echo "✅ All commands reference valid skills"
    exit 0
else
    echo "❌ $ERRORS error(s) found"
    exit 1
fi

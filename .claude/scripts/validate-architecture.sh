#!/bin/bash
# Validation script for triple-layer architecture

ERRORS=0
SKILL_COUNT=0
WORKFLOW_COUNT=0
ROLE_COUNT=0

echo "=== Validation Architecture Triple Couche ==="
echo ""

# Check directory structure
echo "1. Vérification de la structure..."
for dir in skills workflows roles; do
    if [ -d ".claude/$dir" ]; then
        echo "   ✓ .claude/$dir existe"
    else
        echo "   ✗ .claude/$dir MANQUANT"
        ERRORS=$((ERRORS + 1))
    fi
done

# Check templates exist
echo ""
echo "2. Vérification des templates..."
for template in skills/_TEMPLATE.md workflows/_TEMPLATE.md roles/_TEMPLATE.md; do
    if [ -f ".claude/$template" ]; then
        echo "   ✓ $template existe"
    else
        echo "   ! $template manquant"
    fi
done

# Check skills have SKILL.md
echo ""
echo "3. Vérification des skills atomiques..."
for skill_dir in .claude/skills/*/; do
    skill_name=$(basename "$skill_dir")
    case "$skill_name" in
        _*) continue ;;
    esac
    if [ -f "${skill_dir}SKILL.md" ]; then
        echo "   ✓ $skill_name/SKILL.md"
        SKILL_COUNT=$((SKILL_COUNT + 1))
    else
        echo "   ✗ $skill_name manque SKILL.md"
        ERRORS=$((ERRORS + 1))
    fi
done
echo "   Total: $SKILL_COUNT skills"

# Check workflows have frontmatter
echo ""
echo "4. Vérification des workflows..."
for wf in .claude/workflows/*/*.md; do
    case "$wf" in
        *_TEMPLATE*) continue ;;
    esac
    if [ -f "$wf" ]; then
        if head -1 "$wf" | grep -q "^---"; then
            echo "   ✓ $(basename "$wf")"
            WORKFLOW_COUNT=$((WORKFLOW_COUNT + 1))
        else
            echo "   ✗ $(basename "$wf") - frontmatter manquant"
            ERRORS=$((ERRORS + 1))
        fi
    fi
done
echo "   Total: $WORKFLOW_COUNT workflows"

# Check roles have frontmatter
echo ""
echo "5. Vérification des rôles..."
for role in .claude/roles/*.md; do
    case "$role" in
        *_TEMPLATE*) continue ;;
    esac
    if [ -f "$role" ]; then
        if head -1 "$role" | grep -q "^---"; then
            echo "   ✓ $(basename "$role")"
            ROLE_COUNT=$((ROLE_COUNT + 1))
        else
            echo "   ✗ $(basename "$role") - frontmatter manquant"
            ERRORS=$((ERRORS + 1))
        fi
    fi
done
echo "   Total: $ROLE_COUNT rôles"

# Summary
echo ""
echo "=== Résumé ==="
echo "Skills: $SKILL_COUNT | Workflows: $WORKFLOW_COUNT | Roles: $ROLE_COUNT"
if [ $ERRORS -eq 0 ]; then
    echo "✓ Validation réussie!"
    exit 0
else
    echo "✗ $ERRORS erreurs trouvées"
    exit 1
fi

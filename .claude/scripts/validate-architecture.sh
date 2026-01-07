#!/bin/bash
# Validation script for triple-layer architecture
# Enhanced with schema validation, workflow calls, and circular dependency detection

set -e

ERRORS=0
WARNINGS=0
SKILL_COUNT=0
WORKFLOW_COUNT=0
ROLE_COUNT=0

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
NC='\033[0m' # No Color

# Arrays for tracking
declare -A WORKFLOW_NAMES
declare -A SKILL_NAMES
declare -A ROLE_NAMES
declare -A WORKFLOW_CALLS

echo "=== Validation Architecture Triple Couche ==="
echo ""

# Helper function to extract frontmatter field
get_frontmatter_field() {
    local file="$1"
    local field="$2"
    # Extract value between --- markers, then find the field
    sed -n '/^---$/,/^---$/p' "$file" | grep "^${field}:" | sed "s/^${field}: *//" | tr -d '[]'
}

# Check if file has required frontmatter fields
check_frontmatter() {
    local file="$1"
    local type="$2"  # skill, workflow, or role
    local has_error=0

    # Check for frontmatter markers
    if ! head -1 "$file" | grep -q "^---"; then
        echo -e "   ${RED}✗${NC} $(basename "$file") - frontmatter manquant"
        return 1
    fi

    # Check required fields based on type
    case "$type" in
        skill)
            for field in name description tags; do
                if ! grep -q "^${field}:" "$file"; then
                    echo -e "   ${YELLOW}!${NC} $(basename "$file") - champ '$field' manquant"
                    WARNINGS=$((WARNINGS + 1))
                fi
            done
            ;;
        workflow)
            for field in name description triggers skills; do
                if ! grep -q "^${field}:" "$file"; then
                    echo -e "   ${YELLOW}!${NC} $(basename "$file") - champ '$field' manquant"
                    WARNINGS=$((WARNINGS + 1))
                fi
            done
            ;;
        role)
            for field in name description level skills; do
                if ! grep -q "^${field}:" "$file"; then
                    echo -e "   ${YELLOW}!${NC} $(basename "$file") - champ '$field' manquant"
                    WARNINGS=$((WARNINGS + 1))
                fi
            done
            ;;
    esac

    return 0
}

# 1. Check directory structure
echo "1. Vérification de la structure..."
for dir in skills workflows roles schemas scripts; do
    if [ -d ".claude/$dir" ]; then
        echo -e "   ${GREEN}✓${NC} .claude/$dir existe"
    else
        if [ "$dir" = "schemas" ] || [ "$dir" = "scripts" ]; then
            echo -e "   ${YELLOW}!${NC} .claude/$dir manquant (optionnel)"
        else
            echo -e "   ${RED}✗${NC} .claude/$dir MANQUANT"
            ERRORS=$((ERRORS + 1))
        fi
    fi
done

# 2. Check templates exist
echo ""
echo "2. Vérification des templates..."
for template in skills/_TEMPLATE.md workflows/_TEMPLATE.md roles/_TEMPLATE.md; do
    if [ -f ".claude/$template" ]; then
        echo -e "   ${GREEN}✓${NC} $template existe"
    else
        echo -e "   ${YELLOW}!${NC} $template manquant"
        WARNINGS=$((WARNINGS + 1))
    fi
done

# 3. Check skills
echo ""
echo "3. Vérification des skills atomiques..."
for skill_dir in .claude/skills/*/; do
    skill_name=$(basename "$skill_dir")
    case "$skill_name" in
        _*) continue ;;
    esac
    if [ -f "${skill_dir}SKILL.md" ]; then
        if check_frontmatter "${skill_dir}SKILL.md" "skill"; then
            echo -e "   ${GREEN}✓${NC} $skill_name/SKILL.md"
            SKILL_NAMES["$skill_name"]=1
            SKILL_COUNT=$((SKILL_COUNT + 1))
        fi
    else
        echo -e "   ${RED}✗${NC} $skill_name manque SKILL.md"
        ERRORS=$((ERRORS + 1))
    fi
done
echo "   Total: $SKILL_COUNT skills"

# 4. Check workflows and collect call information
echo ""
echo "4. Vérification des workflows..."
for wf in .claude/workflows/*/*.md; do
    case "$wf" in
        *_TEMPLATE*) continue ;;
    esac
    if [ -f "$wf" ]; then
        wf_basename=$(basename "$wf" .md)
        if check_frontmatter "$wf" "workflow"; then
            echo -e "   ${GREEN}✓${NC} $wf_basename"
            WORKFLOW_NAMES["$wf_basename"]=1
            WORKFLOW_COUNT=$((WORKFLOW_COUNT + 1))

            # Extract calls if present
            calls=$(get_frontmatter_field "$wf" "calls")
            if [ -n "$calls" ]; then
                WORKFLOW_CALLS["$wf_basename"]="$calls"
            fi
        fi
    fi
done
echo "   Total: $WORKFLOW_COUNT workflows"

# 5. Check roles
echo ""
echo "5. Vérification des rôles..."
for role in .claude/roles/*.md; do
    case "$role" in
        *_TEMPLATE*) continue ;;
    esac
    if [ -f "$role" ]; then
        role_basename=$(basename "$role" .md)
        if check_frontmatter "$role" "role"; then
            echo -e "   ${GREEN}✓${NC} $role_basename"
            ROLE_NAMES["$role_basename"]=1
            ROLE_COUNT=$((ROLE_COUNT + 1))
        fi
    fi
done
echo "   Total: $ROLE_COUNT rôles"

# 6. Validate workflow calls
echo ""
echo "6. Vérification des appels de workflows..."
call_errors=0
for wf_name in "${!WORKFLOW_CALLS[@]}"; do
    calls="${WORKFLOW_CALLS[$wf_name]}"
    # Split by comma and check each
    IFS=', ' read -ra CALL_ARRAY <<< "$calls"
    for called in "${CALL_ARRAY[@]}"; do
        called=$(echo "$called" | tr -d ' ')
        if [ -z "$called" ]; then
            continue
        fi
        if [ -z "${WORKFLOW_NAMES[$called]}" ]; then
            echo -e "   ${RED}✗${NC} $wf_name appelle '$called' (inexistant)"
            call_errors=$((call_errors + 1))
        else
            echo -e "   ${GREEN}✓${NC} $wf_name → $called"
        fi
    done
done
if [ $call_errors -eq 0 ]; then
    echo -e "   ${GREEN}✓${NC} Tous les appels sont valides"
else
    ERRORS=$((ERRORS + call_errors))
fi

# 7. Check for circular dependencies (simple check)
echo ""
echo "7. Vérification des dépendances circulaires..."
circular_found=0

# Simple depth-1 circular check
for wf_a in "${!WORKFLOW_CALLS[@]}"; do
    calls_a="${WORKFLOW_CALLS[$wf_a]}"
    IFS=', ' read -ra CALL_ARRAY_A <<< "$calls_a"
    for called_b in "${CALL_ARRAY_A[@]}"; do
        called_b=$(echo "$called_b" | tr -d ' ')
        if [ -z "$called_b" ]; then
            continue
        fi
        # Check if called_b calls back to wf_a
        calls_b="${WORKFLOW_CALLS[$called_b]}"
        if [ -n "$calls_b" ]; then
            if echo "$calls_b" | grep -q "$wf_a"; then
                echo -e "   ${RED}✗${NC} Dépendance circulaire: $wf_a ↔ $called_b"
                circular_found=$((circular_found + 1))
            fi
        fi
    done
done

if [ $circular_found -eq 0 ]; then
    echo -e "   ${GREEN}✓${NC} Pas de dépendance circulaire détectée"
else
    ERRORS=$((ERRORS + circular_found))
fi

# 8. Validate skill references in workflows
echo ""
echo "8. Vérification des références de skills..."
skill_ref_errors=0
for wf in .claude/workflows/*/*.md; do
    case "$wf" in
        *_TEMPLATE*) continue ;;
    esac
    if [ -f "$wf" ]; then
        wf_basename=$(basename "$wf" .md)
        skills=$(get_frontmatter_field "$wf" "skills")
        if [ -n "$skills" ]; then
            IFS=', ' read -ra SKILL_ARRAY <<< "$skills"
            for skill in "${SKILL_ARRAY[@]}"; do
                skill=$(echo "$skill" | tr -d ' ')
                if [ -z "$skill" ]; then
                    continue
                fi
                if [ -z "${SKILL_NAMES[$skill]}" ]; then
                    echo -e "   ${YELLOW}!${NC} $wf_basename référence skill '$skill' (non trouvé)"
                    WARNINGS=$((WARNINGS + 1))
                fi
            done
        fi
    fi
done
if [ $skill_ref_errors -eq 0 ]; then
    echo -e "   ${GREEN}✓${NC} Références de skills vérifiées"
fi

# Summary
echo ""
echo "=== Résumé ==="
echo "Skills: $SKILL_COUNT | Workflows: $WORKFLOW_COUNT | Roles: $ROLE_COUNT"
echo ""

if [ $ERRORS -eq 0 ] && [ $WARNINGS -eq 0 ]; then
    echo -e "${GREEN}✓ Validation réussie!${NC}"
    exit 0
elif [ $ERRORS -eq 0 ]; then
    echo -e "${YELLOW}! Validation réussie avec $WARNINGS avertissement(s)${NC}"
    exit 0
else
    echo -e "${RED}✗ $ERRORS erreur(s) et $WARNINGS avertissement(s)${NC}"
    exit 1
fi

#!/bin/bash
# Validation script for triple-layer architecture
# Enhanced with schema validation, workflow calls, circular dependency detection,
# and sub-skill validation

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
declare -A SKILL_DIRS
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

# Recursive function to detect circular dependencies up to depth 3
# Returns 0 if cycle found, 1 if no cycle
check_cycle() {
    local start="$1"
    local current="$2"
    local depth="$3"
    local path="$4"

    # Max depth reached
    if [ "$depth" -gt 3 ]; then
        return 1
    fi

    # Get calls for current workflow
    local calls="${WORKFLOW_CALLS[$current]}"
    if [ -z "$calls" ]; then
        return 1
    fi

    IFS=', ' read -ra CALL_ARRAY <<< "$calls"
    for called in "${CALL_ARRAY[@]}"; do
        called=$(echo "$called" | tr -d ' ')
        if [ -z "$called" ]; then
            continue
        fi

        # Check if we've come back to start
        if [ "$called" = "$start" ]; then
            echo -e "   ${RED}✗${NC} Cycle détecté: $path → $called"
            return 0
        fi

        # Recurse deeper
        if check_cycle "$start" "$called" $((depth + 1)) "$path → $called"; then
            return 0
        fi
    done

    return 1
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

# 3. Check skills and collect sub-skill info
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
            SKILL_DIRS["$skill_name"]="$skill_dir"
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

# 7. Check for circular dependencies (depth up to 3)
echo ""
echo "7. Vérification des dépendances circulaires (profondeur 3)..."
circular_found=0

for wf_name in "${!WORKFLOW_CALLS[@]}"; do
    if check_cycle "$wf_name" "$wf_name" 1 "$wf_name"; then
        circular_found=$((circular_found + 1))
    fi
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

# 9. Validate sub-skill file existence
echo ""
echo "9. Vérification des sub-skills déclarés..."
subskill_errors=0
for skill_name in "${!SKILL_DIRS[@]}"; do
    skill_dir="${SKILL_DIRS[$skill_name]}"
    skill_file="${skill_dir}SKILL.md"

    # Get declared sub-skills
    subskills=$(get_frontmatter_field "$skill_file" "sub-skills")
    if [ -n "$subskills" ]; then
        IFS=', ' read -ra SUBSKILL_ARRAY <<< "$subskills"
        for subskill in "${SUBSKILL_ARRAY[@]}"; do
            subskill=$(echo "$subskill" | tr -d ' ')
            if [ -z "$subskill" ]; then
                continue
            fi
            subskill_file="${skill_dir}${subskill}.md"
            if [ -f "$subskill_file" ]; then
                echo -e "   ${GREEN}✓${NC} $skill_name/$subskill.md"
            else
                echo -e "   ${RED}✗${NC} $skill_name déclare sub-skill '$subskill' mais '$subskill.md' n'existe pas"
                subskill_errors=$((subskill_errors + 1))
            fi
        done
    fi
done
if [ $subskill_errors -eq 0 ]; then
    echo -e "   ${GREEN}✓${NC} Tous les sub-skills déclarés existent"
else
    ERRORS=$((ERRORS + subskill_errors))
fi

# 10. Validate role escalation targets
echo ""
echo "10. Vérification des escalades de rôles..."
escalation_warnings=0
for role in .claude/roles/*.md; do
    case "$role" in
        *_TEMPLATE*) continue ;;
    esac
    if [ -f "$role" ]; then
        role_basename=$(basename "$role" .md)
        escalation=$(get_frontmatter_field "$role" "escalation")
        if [ -n "$escalation" ]; then
            escalation=$(echo "$escalation" | tr -d ' ')
            if [ -z "${ROLE_NAMES[$escalation]}" ]; then
                echo -e "   ${YELLOW}!${NC} $role_basename escalade vers '$escalation' (role non trouvé)"
                escalation_warnings=$((escalation_warnings + 1))
            else
                echo -e "   ${GREEN}✓${NC} $role_basename → $escalation"
            fi
        fi
    fi
done
if [ $escalation_warnings -eq 0 ]; then
    echo -e "   ${GREEN}✓${NC} Escalades vérifiées"
else
    WARNINGS=$((WARNINGS + escalation_warnings))
fi

# 11. Check for duplicate names
echo ""
echo "11. Vérification des noms uniques..."
declare -A ALL_NAMES
duplicates=0
for name in "${!SKILL_NAMES[@]}"; do
    if [ -n "${ALL_NAMES[$name]}" ]; then
        echo -e "   ${RED}✗${NC} Nom dupliqué: '$name' (skill et ${ALL_NAMES[$name]})"
        duplicates=$((duplicates + 1))
    fi
    ALL_NAMES["$name"]="skill"
done
for name in "${!WORKFLOW_NAMES[@]}"; do
    if [ -n "${ALL_NAMES[$name]}" ]; then
        echo -e "   ${RED}✗${NC} Nom dupliqué: '$name' (workflow et ${ALL_NAMES[$name]})"
        duplicates=$((duplicates + 1))
    fi
    ALL_NAMES["$name"]="workflow"
done
for name in "${!ROLE_NAMES[@]}"; do
    if [ -n "${ALL_NAMES[$name]}" ]; then
        echo -e "   ${RED}✗${NC} Nom dupliqué: '$name' (role et ${ALL_NAMES[$name]})"
        duplicates=$((duplicates + 1))
    fi
    ALL_NAMES["$name"]="role"
done
if [ $duplicates -eq 0 ]; then
    echo -e "   ${GREEN}✓${NC} Tous les noms sont uniques"
else
    ERRORS=$((ERRORS + duplicates))
fi

# 12. Validate skill references in roles (only in Skills sections)
echo ""
echo "12. Vérification des références skills dans les rôles..."
role_skill_warnings=0
for role in .claude/roles/*.md; do
    case "$role" in
        *_TEMPLATE*) continue ;;
    esac
    if [ -f "$role" ]; then
        role_basename=$(basename "$role" .md)
        # Only extract skills from the ## Skills section (up to next ## section)
        in_skills_section=0
        while IFS= read -r line; do
            # Detect start of Skills section
            if [[ "$line" =~ ^##[[:space:]]+Skills ]]; then
                in_skills_section=1
                continue
            fi
            # Detect end of Skills section (next ## header)
            if [[ "$in_skills_section" -eq 1 ]] && [[ "$line" =~ ^##[[:space:]][^#] ]]; then
                in_skills_section=0
                continue
            fi
            # Only check lines in Skills section
            if [[ "$in_skills_section" -eq 1 ]]; then
                # Match patterns like | `skill-name` | or | `skill/subskill` |
                if [[ "$line" =~ \`([a-z][a-z0-9-]*(/[a-z][a-z0-9-]*)?)\` ]]; then
                    skill="${BASH_REMATCH[1]}"
                    # Extract base skill (before /)
                    base_skill="${skill%%/*}"
                    if [ -z "${SKILL_NAMES[$base_skill]}" ]; then
                        echo -e "   ${YELLOW}!${NC} $role_basename référence skill '$skill' (non trouvé)"
                        role_skill_warnings=$((role_skill_warnings + 1))
                    fi
                fi
            fi
        done < "$role"
    fi
done
if [ $role_skill_warnings -eq 0 ]; then
    echo -e "   ${GREEN}✓${NC} Références skills dans rôles vérifiées"
else
    WARNINGS=$((WARNINGS + role_skill_warnings))
fi

# 13. Validate workflow references in roles (in Workflows sections)
echo ""
echo "13. Vérification des références workflows dans les rôles..."
role_workflow_warnings=0
for role in .claude/roles/*.md; do
    case "$role" in
        *_TEMPLATE*) continue ;;
    esac
    if [ -f "$role" ]; then
        role_basename=$(basename "$role" .md)
        # Only extract workflows from the ## Workflows section (up to next ## section)
        in_workflows_section=0
        while IFS= read -r line; do
            # Detect start of Workflows section
            if [[ "$line" =~ ^##[[:space:]]+Workflows ]]; then
                in_workflows_section=1
                continue
            fi
            # Detect end of Workflows section (next ## header)
            if [[ "$in_workflows_section" -eq 1 ]] && [[ "$line" =~ ^##[[:space:]][^#] ]]; then
                in_workflows_section=0
                continue
            fi
            # Only check lines in Workflows section
            if [[ "$in_workflows_section" -eq 1 ]]; then
                # Match patterns like | `workflow-name` | (without path prefixes)
                if [[ "$line" =~ \`([a-z][a-z0-9-]*)\` ]]; then
                    workflow="${BASH_REMATCH[1]}"
                    # Skip if it looks like a path (contains /)
                    if [[ ! "$workflow" =~ / ]] && [ -z "${WORKFLOW_NAMES[$workflow]}" ]; then
                        echo -e "   ${YELLOW}!${NC} $role_basename référence workflow '$workflow' (non trouvé)"
                        role_workflow_warnings=$((role_workflow_warnings + 1))
                    fi
                fi
            fi
        done < "$role"
    fi
done
if [ $role_workflow_warnings -eq 0 ]; then
    echo -e "   ${GREEN}✓${NC} Références workflows dans rôles vérifiées"
else
    WARNINGS=$((WARNINGS + role_workflow_warnings))
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

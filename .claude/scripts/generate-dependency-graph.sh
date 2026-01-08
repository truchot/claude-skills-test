#!/bin/bash
# Generate dependency graph from architecture frontmatter
# Outputs Mermaid diagram format

set -e

echo "# Architecture Dependency Graph"
echo ""
echo "Generated: $(date -Iseconds)"
echo ""

# Helper function to extract frontmatter field
get_frontmatter_field() {
    local file="$1"
    local field="$2"
    if [ ! -f "$file" ]; then
        return 1
    fi
    sed -n '/^---$/,/^---$/p' "$file" 2>/dev/null | grep "^${field}:" | sed "s/^${field}: *//" | tr -d '[]'
}

# Sanitize for mermaid IDs
sanitize_id() {
    echo "$1" | tr -cd 'a-zA-Z0-9_-'
}

echo '```mermaid'
echo 'graph TD'
echo ''

# Subgraph for Skills
echo '    subgraph Skills["🔧 Skills (COMMENT)"]'
for skill_dir in .claude/skills/*/; do
    if [ -f "${skill_dir}SKILL.md" ]; then
        skill_name=$(basename "$skill_dir")
        skill_id=$(sanitize_id "$skill_name")
        echo "        skill_${skill_id}[\"${skill_name}\"]"
    fi
done
echo '    end'
echo ''

# Subgraph for Workflows
echo '    subgraph Workflows["📋 Workflows (QUAND)"]'
for workflow_dir in .claude/workflows/*/; do
    if [ -d "$workflow_dir" ]; then
        for workflow in "${workflow_dir}"*.md; do
            case "$workflow" in
                *_TEMPLATE*) continue ;;
            esac
            if [ -f "$workflow" ]; then
                workflow_name=$(basename "$workflow" .md)
                workflow_id=$(sanitize_id "$workflow_name")
                echo "        wf_${workflow_id}[\"${workflow_name}\"]"
            fi
        done
    fi
done
echo '    end'
echo ''

# Subgraph for Roles
echo '    subgraph Roles["👤 Roles (QUI)"]'
for role in .claude/roles/*.md; do
    case "$role" in
        *_TEMPLATE*) continue ;;
    esac
    if [ -f "$role" ]; then
        role_name=$(basename "$role" .md)
        role_id=$(sanitize_id "$role_name")
        echo "        role_${role_id}[\"${role_name}\"]"
    fi
done
echo '    end'
echo ''

# Workflow dependencies (calls)
echo '    %% Workflow calls'
for workflow_dir in .claude/workflows/*/; do
    if [ -d "$workflow_dir" ]; then
        for workflow in "${workflow_dir}"*.md; do
            case "$workflow" in
                *_TEMPLATE*) continue ;;
            esac
            if [ -f "$workflow" ]; then
                workflow_name=$(basename "$workflow" .md)
                workflow_id=$(sanitize_id "$workflow_name")
                calls=$(get_frontmatter_field "$workflow" "calls")
                if [ -n "$calls" ]; then
                    IFS=', ' read -ra CALL_ARRAY <<< "$calls"
                    for called in "${CALL_ARRAY[@]}"; do
                        called=$(echo "$called" | tr -d ' ')
                        called_id=$(sanitize_id "$called")
                        if [ -n "$called_id" ]; then
                            echo "    wf_${workflow_id} -->|calls| wf_${called_id}"
                        fi
                    done
                fi
            fi
        done
    fi
done
echo ''

# Role escalations
echo '    %% Role escalations'
for role in .claude/roles/*.md; do
    case "$role" in
        *_TEMPLATE*) continue ;;
    esac
    if [ -f "$role" ]; then
        role_name=$(basename "$role" .md)
        role_id=$(sanitize_id "$role_name")
        escalation=$(get_frontmatter_field "$role" "escalation")
        if [ -n "$escalation" ]; then
            escalation_id=$(sanitize_id "$escalation")
            echo "    role_${role_id} -.->|escalates to| role_${escalation_id}"
        fi
    fi
done
echo ''

# Role to workflow connections
echo '    %% Role workflows'
for role in .claude/roles/*.md; do
    case "$role" in
        *_TEMPLATE*) continue ;;
    esac
    if [ -f "$role" ]; then
        role_name=$(basename "$role" .md)
        role_id=$(sanitize_id "$role_name")
        workflows=$(get_frontmatter_field "$role" "workflows")
        if [ -n "$workflows" ]; then
            IFS=', ' read -ra WF_ARRAY <<< "$workflows"
            for wf in "${WF_ARRAY[@]}"; do
                wf=$(echo "$wf" | tr -d ' ')
                wf_id=$(sanitize_id "$wf")
                if [ -n "$wf_id" ]; then
                    echo "    role_${role_id} -->|uses| wf_${wf_id}"
                fi
            done
        fi
    fi
done
echo ''

# Role to skill connections
echo '    %% Role skills'
for role in .claude/roles/*.md; do
    case "$role" in
        *_TEMPLATE*) continue ;;
    esac
    if [ -f "$role" ]; then
        role_name=$(basename "$role" .md)
        role_id=$(sanitize_id "$role_name")
        skills=$(get_frontmatter_field "$role" "skills")
        if [ -n "$skills" ]; then
            IFS=', ' read -ra SKILL_ARRAY <<< "$skills"
            for skill in "${SKILL_ARRAY[@]}"; do
                skill=$(echo "$skill" | tr -d ' ')
                skill_id=$(sanitize_id "$skill")
                if [ -n "$skill_id" ]; then
                    echo "    role_${role_id} -->|requires| skill_${skill_id}"
                fi
            done
        fi
    fi
done
echo ''

# Styling
echo '    %% Styling'
echo '    classDef skill fill:#e1f5fe,stroke:#01579b'
echo '    classDef workflow fill:#fff3e0,stroke:#e65100'
echo '    classDef role fill:#f3e5f5,stroke:#7b1fa2'
echo ''

echo '```'
echo ''
echo "## Legend"
echo ""
echo "- **Skills (blue)**: Atomic, reusable technical competencies"
echo "- **Workflows (orange)**: Sequential processes with steps"
echo "- **Roles (purple)**: Compositions representing professions"
echo ""
echo "### Arrows"
echo ""
echo "- \`-->\` Solid: Direct dependency (uses/requires/calls)"
echo "- \`-.->\` Dashed: Escalation path"

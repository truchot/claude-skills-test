#!/bin/bash
# Migration script: Uniformiser la structure agents/ pour tous les skills
# Usage: ./migrate-agents-structure.sh [skill-name]

set -e

SKILLS_DIR="/home/user/claude-skills-test/.claude/skills"

# Fichiers/dossiers à NE PAS déplacer
EXCLUDE_PATTERNS="SKILL.md|orchestrator.md|package.json|package-lock.json|CHANGELOG.md|README.md|tests|.editorconfig|.gitattributes|templates|docs|workflows|orchestration"

migrate_skill() {
    local skill=$1
    local skill_path="$SKILLS_DIR/$skill"

    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo "📦 Migrating: $skill"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

    # Vérifier que le skill existe
    if [ ! -d "$skill_path" ]; then
        echo "❌ Skill not found: $skill_path"
        return 1
    fi

    # Vérifier si agents/ existe déjà
    if [ -d "$skill_path/agents" ]; then
        echo "⚠️  agents/ folder already exists, skipping..."
        return 0
    fi

    # Créer le dossier agents/
    echo "📁 Creating agents/ folder..."
    mkdir -p "$skill_path/agents"

    # Trouver et déplacer les dossiers domaine
    echo "🚚 Moving domain folders..."
    for item in "$skill_path"/*/; do
        dirname=$(basename "$item")

        # Skip si c'est un pattern exclu ou si c'est le dossier agents lui-même
        if echo "$dirname" | grep -qE "^($EXCLUDE_PATTERNS)$"; then
            echo "   ⏭️  Skipping: $dirname"
            continue
        fi

        # Skip si c'est le nouveau dossier agents
        if [ "$dirname" = "agents" ]; then
            continue
        fi

        echo "   → Moving: $dirname/"
        git mv "$skill_path/$dirname" "$skill_path/agents/$dirname"
    done

    echo "✅ Migration complete for: $skill"
    echo ""
}

# Liste des skills à migrer
SKILLS_TO_MIGRATE=(
    "nextjs-expert"
    "lead-dev"
    "project-management"
    "direction-technique"
)

# Si un argument est passé, migrer seulement ce skill
if [ -n "$1" ]; then
    migrate_skill "$1"
else
    # Migrer tous les skills
    for skill in "${SKILLS_TO_MIGRATE[@]}"; do
        migrate_skill "$skill"
    done
fi

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🎉 All migrations complete!"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "Next steps:"
echo "1. Update SKILL.md references (search/replace)"
echo "2. Update orchestrator.md references"
echo "3. Update test configurations"
echo "4. Run: npm test (in each skill folder)"

#!/bin/bash
#
# Migration vers Agent Skills Specification
# https://agentskills.io/specification
#
# Ce script migre les skills existants vers le format standard Agent Skills.
#
# Usage:
#   ./migrate-to-agent-skills-spec.sh [--dry-run] [--skill <name>]
#
# Options:
#   --dry-run    Affiche les changements sans les appliquer
#   --skill      Migre un seul skill spécifique
#

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
SKILLS_DIR="$PROJECT_ROOT/.web-agency/skills"
ARCHIVE_DIR="$PROJECT_ROOT/.web-agency/skills-archive/pre-migration-$(date +%Y%m%d)"

DRY_RUN=false
SINGLE_SKILL=""

# Parse arguments
while [[ $# -gt 0 ]]; do
    case $1 in
        --dry-run)
            DRY_RUN=true
            shift
            ;;
        --skill)
            SINGLE_SKILL="$2"
            shift 2
            ;;
        *)
            echo "Unknown option: $1"
            exit 1
            ;;
    esac
done

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

log_info() { echo -e "${GREEN}[INFO]${NC} $1"; }
log_warn() { echo -e "${YELLOW}[WARN]${NC} $1"; }
log_error() { echo -e "${RED}[ERROR]${NC} $1"; }

echo "╔══════════════════════════════════════════════════════════════╗"
echo "║     Migration vers Agent Skills Specification v1.0           ║"
echo "╚══════════════════════════════════════════════════════════════╝"
echo ""

if [ "$DRY_RUN" = true ]; then
    log_warn "Mode DRY-RUN activé - aucune modification ne sera effectuée"
    echo ""
fi

# Create archive directory
if [ "$DRY_RUN" = false ]; then
    mkdir -p "$ARCHIVE_DIR"
    log_info "Archive créée: $ARCHIVE_DIR"
fi

# Function to clean YAML frontmatter
clean_frontmatter() {
    local skill_md="$1"
    local skill_name="$2"

    log_info "Nettoyage frontmatter: $skill_name"

    if [ "$DRY_RUN" = true ]; then
        echo "  → Supprimerait: version, status, level, ecosystem_version"
        return
    fi

    # Create backup
    cp "$skill_md" "$ARCHIVE_DIR/$(basename "$(dirname "$skill_md")")-SKILL.md.bak"

    # Use Python for safe YAML manipulation
    python3 << EOF
import re

with open('$skill_md', 'r') as f:
    content = f.read()

# Extract frontmatter
match = re.match(r'^---\n(.*?)\n---\n(.*)$', content, re.DOTALL)
if not match:
    print("  ⚠️  No frontmatter found")
    exit(0)

frontmatter = match.group(1)
body = match.group(2)

# Parse YAML manually (simple key: value)
lines = frontmatter.split('\n')
new_lines = []
removed = []

for line in lines:
    # Keep only name and description
    if line.startswith('name:') or line.startswith('description:'):
        new_lines.append(line)
    elif line.strip() and ':' in line:
        key = line.split(':')[0].strip()
        removed.append(key)

if removed:
    print(f"  → Supprimé: {', '.join(removed)}")

# Handle multiline description (starts with description: ")
new_frontmatter = '\n'.join(new_lines)

# Write back
with open('$skill_md', 'w') as f:
    f.write('---\n' + new_frontmatter + '\n---\n' + body)

print("  ✓ Frontmatter nettoyé")
EOF
}

# Function to rename agents/ to references/
rename_agents_to_references() {
    local skill_dir="$1"
    local skill_name="$2"

    if [ -d "$skill_dir/agents" ]; then
        log_info "Renommage agents/ → references/: $skill_name"

        if [ "$DRY_RUN" = true ]; then
            echo "  → Renommerait: agents/ → references/"
            return
        fi

        mv "$skill_dir/agents" "$skill_dir/references"
        echo "  ✓ Renommé agents/ → references/"

        # Update references in SKILL.md
        if [ -f "$skill_dir/SKILL.md" ]; then
            sed -i 's|agents/|references/|g' "$skill_dir/SKILL.md"
            echo "  ✓ Mis à jour les références dans SKILL.md"
        fi
    fi
}

# Function to archive auxiliary files
archive_auxiliary_files() {
    local skill_dir="$1"
    local skill_name="$2"

    local aux_files=("CHANGELOG.md" "package.json" "package-lock.json" ".editorconfig" ".gitattributes" "README.md")
    local aux_dirs=("tests" "test" "__tests__")

    for file in "${aux_files[@]}"; do
        if [ -f "$skill_dir/$file" ]; then
            log_info "Archivage fichier auxiliaire: $skill_name/$file"

            if [ "$DRY_RUN" = true ]; then
                echo "  → Archiverait: $file"
                continue
            fi

            mkdir -p "$ARCHIVE_DIR/$skill_name"
            mv "$skill_dir/$file" "$ARCHIVE_DIR/$skill_name/"
            echo "  ✓ Archivé: $file"
        fi
    done

    for dir in "${aux_dirs[@]}"; do
        if [ -d "$skill_dir/$dir" ]; then
            log_info "Archivage dossier auxiliaire: $skill_name/$dir"

            if [ "$DRY_RUN" = true ]; then
                echo "  → Archiverait: $dir/"
                continue
            fi

            mkdir -p "$ARCHIVE_DIR/$skill_name"
            mv "$skill_dir/$dir" "$ARCHIVE_DIR/$skill_name/"
            echo "  ✓ Archivé: $dir/"
        fi
    done
}

# Function to move orchestrator.md to references/
move_orchestrator() {
    local skill_dir="$1"
    local skill_name="$2"

    if [ -f "$skill_dir/orchestrator.md" ]; then
        log_info "Déplacement orchestrator.md: $skill_name"

        if [ "$DRY_RUN" = true ]; then
            echo "  → Déplacerait: orchestrator.md → references/"
            return
        fi

        mkdir -p "$skill_dir/references"
        mv "$skill_dir/orchestrator.md" "$skill_dir/references/"
        echo "  ✓ Déplacé orchestrator.md → references/"

        # Update references in SKILL.md
        if [ -f "$skill_dir/SKILL.md" ]; then
            sed -i 's|orchestrator\.md|references/orchestrator.md|g' "$skill_dir/SKILL.md"
            echo "  ✓ Mis à jour les références dans SKILL.md"
        fi
    fi
}

# Function to process a single skill
process_skill() {
    local skill_dir="$1"
    local skill_name="$(basename "$skill_dir")"

    echo ""
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo "Processing: $skill_name"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

    if [ ! -f "$skill_dir/SKILL.md" ]; then
        log_warn "Pas de SKILL.md trouvé, skip"
        return
    fi

    # 1. Clean frontmatter
    clean_frontmatter "$skill_dir/SKILL.md" "$skill_name"

    # 2. Rename agents/ to references/
    rename_agents_to_references "$skill_dir" "$skill_name"

    # 3. Move orchestrator.md
    move_orchestrator "$skill_dir" "$skill_name"

    # 4. Archive auxiliary files
    archive_auxiliary_files "$skill_dir" "$skill_name"
}

# Main execution
if [ -n "$SINGLE_SKILL" ]; then
    if [ -d "$SKILLS_DIR/$SINGLE_SKILL" ]; then
        process_skill "$SKILLS_DIR/$SINGLE_SKILL"
    else
        log_error "Skill not found: $SINGLE_SKILL"
        exit 1
    fi
else
    # Process all skills
    for skill_dir in "$SKILLS_DIR"/*/; do
        if [ -d "$skill_dir" ]; then
            skill_name="$(basename "$skill_dir")"
            # Skip special directories
            if [[ "$skill_name" == "examples" || "$skill_name" == "scripts" ]]; then
                continue
            fi
            process_skill "$skill_dir"
        fi
    done
fi

echo ""
echo "╔══════════════════════════════════════════════════════════════╗"
echo "║                    MIGRATION TERMINÉE                        ║"
echo "╚══════════════════════════════════════════════════════════════╝"

if [ "$DRY_RUN" = true ]; then
    echo ""
    log_warn "Mode DRY-RUN - Exécutez sans --dry-run pour appliquer les changements"
else
    echo ""
    log_info "Fichiers archivés dans: $ARCHIVE_DIR"
    log_info "Vérifiez les changements avec: git diff"
fi

echo ""
echo "Prochaines étapes manuelles:"
echo "  1. Améliorer les descriptions avec 'when to use' triggers"
echo "  2. Réduire les SKILL.md > 500 lignes"
echo "  3. Valider avec: ./scripts/validate-agent-skills.sh"
echo ""

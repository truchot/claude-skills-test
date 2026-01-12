#!/bin/bash
# Test: Validate intelligent routing commands
# Vérifie que les commandes de routage référencent des skills existants

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
COMMANDS_DIR="$SCRIPT_DIR/../commands"
SKILLS_DIR="$SCRIPT_DIR/../../.web-agency/skills"

ERRORS=0
WARNINGS=0

echo "=== Test: Validation des commandes de routage intelligent ==="
echo ""

# Test 1: Vérifier que chaque commande existe
echo "1. Vérification des commandes requises..."
REQUIRED_COMMANDS=("tech.md" "design.md" "marketing.md" "project.md")
for cmd in "${REQUIRED_COMMANDS[@]}"; do
    if [[ -f "$COMMANDS_DIR/$cmd" ]]; then
        echo "   ✓ $cmd existe"
    else
        echo "   ✗ $cmd MANQUANT"
        ((ERRORS++))
    fi
done
echo ""

# Test 2: Vérifier que les références de skills dans les commandes pointent vers des skills existants
echo "2. Validation des références de skills..."
for cmd_file in "$COMMANDS_DIR"/*.md; do
    cmd_name=$(basename "$cmd_file")
    echo "   Commande: $cmd_name"

    # Extraire toutes les références .web-agency/skills/XXX/
    skill_refs=$(grep -oP '\.web-agency/skills/[^/]+' "$cmd_file" 2>/dev/null | sort -u || true)

    if [[ -z "$skill_refs" ]]; then
        echo "      ⚠ Aucune référence skill trouvée"
        ((WARNINGS++))
    else
        while IFS= read -r ref; do
            skill_name=$(echo "$ref" | sed 's|\.web-agency/skills/||')
            skill_path="$SKILLS_DIR/$skill_name"

            if [[ -d "$skill_path" ]]; then
                echo "      ✓ $skill_name"
            else
                echo "      ✗ $skill_name - SKILL INEXISTANT"
                ((ERRORS++))
            fi
        done <<< "$skill_refs"
    fi
done
echo ""

# Test 3: Vérifier la structure hiérarchique (Niveau 2 → 3 → 4)
echo "3. Validation de la hiérarchie des niveaux..."

# tech.md doit référencer les 3 niveaux
if grep -q "Niveau 2" "$COMMANDS_DIR/tech.md" && \
   grep -q "Niveau 3" "$COMMANDS_DIR/tech.md" && \
   grep -q "Niveau 4" "$COMMANDS_DIR/tech.md"; then
    echo "   ✓ tech.md: hiérarchie complète (Niveaux 2-3-4)"
else
    echo "   ⚠ tech.md: hiérarchie incomplète"
    ((WARNINGS++))
fi

# design.md doit référencer les 3 niveaux
if grep -q "Niveau 2" "$COMMANDS_DIR/design.md" && \
   grep -q "Niveau 3" "$COMMANDS_DIR/design.md" && \
   grep -q "Niveau 4" "$COMMANDS_DIR/design.md"; then
    echo "   ✓ design.md: hiérarchie complète (Niveaux 2-3-4)"
else
    echo "   ⚠ design.md: hiérarchie incomplète"
    ((WARNINGS++))
fi

# marketing.md doit référencer au moins Niveaux 2 et 3
if grep -q "Niveau 2" "$COMMANDS_DIR/marketing.md" && \
   grep -q "Niveau 3" "$COMMANDS_DIR/marketing.md"; then
    echo "   ✓ marketing.md: hiérarchie présente (Niveaux 2-3)"
else
    echo "   ⚠ marketing.md: hiérarchie incomplète"
    ((WARNINGS++))
fi
echo ""

# Test 4: Vérifier la logique de routage
echo "4. Validation de la logique de routage..."
for cmd_file in "$COMMANDS_DIR"/*.md; do
    cmd_name=$(basename "$cmd_file")

    if grep -q "Logique de Routage" "$cmd_file" || grep -q "SI demande" "$cmd_file"; then
        echo "   ✓ $cmd_name: logique de routage définie"
    else
        echo "   ⚠ $cmd_name: pas de logique de routage explicite"
        ((WARNINGS++))
    fi
done
echo ""

# Test 5: Vérifier les exemples d'utilisation
echo "5. Validation des exemples..."
for cmd_file in "$COMMANDS_DIR"/*.md; do
    cmd_name=$(basename "$cmd_file")

    if grep -q "## Exemples" "$cmd_file" || grep -q "## Utilisation" "$cmd_file"; then
        example_count=$(grep -c "^- \`/" "$cmd_file" 2>/dev/null || echo "0")
        if [[ "$example_count" -gt 0 ]]; then
            echo "   ✓ $cmd_name: $example_count exemple(s)"
        else
            echo "   ⚠ $cmd_name: section exemples vide"
            ((WARNINGS++))
        fi
    else
        echo "   ⚠ $cmd_name: pas d'exemples"
        ((WARNINGS++))
    fi
done
echo ""

# Résumé
echo "=== Résumé ==="
echo "Erreurs: $ERRORS"
echo "Avertissements: $WARNINGS"
echo ""

if [[ $ERRORS -gt 0 ]]; then
    echo "❌ ÉCHEC - $ERRORS erreur(s) trouvée(s)"
    exit 1
else
    if [[ $WARNINGS -gt 0 ]]; then
        echo "⚠️  SUCCÈS avec $WARNINGS avertissement(s)"
    else
        echo "✅ SUCCÈS - Toutes les validations passées"
    fi
    exit 0
fi

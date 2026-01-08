#!/bin/bash
# Test suite for validate-architecture.sh
# Run with: bash .claude/scripts/test-validate-architecture.sh

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
TEST_DIR="/tmp/test-architecture-$$"
TESTS_PASSED=0
TESTS_FAILED=0

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
NC='\033[0m'

setup() {
    echo "Setting up test environment in $TEST_DIR"
    mkdir -p "$TEST_DIR/.claude/skills/test-skill"
    mkdir -p "$TEST_DIR/.claude/workflows/test"
    mkdir -p "$TEST_DIR/.claude/roles"
    mkdir -p "$TEST_DIR/.claude/schemas"
    mkdir -p "$TEST_DIR/.claude/scripts"

    # Copy validation script
    cp "$SCRIPT_DIR/validate-architecture.sh" "$TEST_DIR/.claude/scripts/"

    # Create templates
    echo "---" > "$TEST_DIR/.claude/skills/_TEMPLATE.md"
    echo "---" > "$TEST_DIR/.claude/workflows/_TEMPLATE.md"
    echo "---" > "$TEST_DIR/.claude/roles/_TEMPLATE.md"
}

teardown() {
    echo "Cleaning up test environment"
    rm -rf "$TEST_DIR"
}

assert_pass() {
    local test_name="$1"
    if (cd "$TEST_DIR" && bash .claude/scripts/validate-architecture.sh > /dev/null 2>&1); then
        echo -e "${GREEN}✓${NC} PASS: $test_name"
        TESTS_PASSED=$((TESTS_PASSED + 1))
    else
        echo -e "${RED}✗${NC} FAIL: $test_name (expected pass)"
        TESTS_FAILED=$((TESTS_FAILED + 1))
    fi
}

assert_fail() {
    local test_name="$1"
    if (cd "$TEST_DIR" && bash .claude/scripts/validate-architecture.sh > /dev/null 2>&1); then
        echo -e "${RED}✗${NC} FAIL: $test_name (expected fail)"
        TESTS_FAILED=$((TESTS_FAILED + 1))
    else
        echo -e "${GREEN}✓${NC} PASS: $test_name"
        TESTS_PASSED=$((TESTS_PASSED + 1))
    fi
}

assert_output_contains() {
    local test_name="$1"
    local pattern="$2"
    local output
    output=$(cd "$TEST_DIR" && bash .claude/scripts/validate-architecture.sh 2>&1 || true)
    if echo "$output" | grep -q "$pattern"; then
        echo -e "${GREEN}✓${NC} PASS: $test_name"
        TESTS_PASSED=$((TESTS_PASSED + 1))
    else
        echo -e "${RED}✗${NC} FAIL: $test_name (pattern not found: $pattern)"
        TESTS_FAILED=$((TESTS_FAILED + 1))
    fi
}

# =====================================================
# TEST CASES
# =====================================================

test_valid_skill() {
    echo ""
    echo "=== Test: Valid skill with all required fields ==="
    cat > "$TEST_DIR/.claude/skills/test-skill/SKILL.md" << 'EOF'
---
name: test-skill
description: A test skill for validation
tags: [test, validation]
---

# Test Skill
EOF
    assert_pass "Valid skill passes validation"
}

test_skill_missing_frontmatter() {
    echo ""
    echo "=== Test: Skill without frontmatter ==="
    cat > "$TEST_DIR/.claude/skills/test-skill/SKILL.md" << 'EOF'
# Test Skill

No frontmatter here
EOF
    assert_fail "Skill without frontmatter fails"
}

test_valid_workflow() {
    echo ""
    echo "=== Test: Valid workflow ==="
    # First restore valid skill
    cat > "$TEST_DIR/.claude/skills/test-skill/SKILL.md" << 'EOF'
---
name: test-skill
description: A test skill for validation
tags: [test, validation]
---
# Test Skill
EOF

    cat > "$TEST_DIR/.claude/workflows/test/test-workflow.md" << 'EOF'
---
name: test-workflow
description: A test workflow
triggers: [test, validation]
skills: [test-skill]
---

# Test Workflow
EOF
    assert_pass "Valid workflow passes validation"
}

test_workflow_calls_nonexistent() {
    echo ""
    echo "=== Test: Workflow calls non-existent workflow ==="
    cat > "$TEST_DIR/.claude/workflows/test/test-workflow.md" << 'EOF'
---
name: test-workflow
description: A test workflow
triggers: [test]
skills: [test-skill]
calls: [nonexistent-workflow]
---

# Test Workflow
EOF
    assert_fail "Workflow calling non-existent workflow fails"
}

test_circular_dependency_depth1() {
    echo ""
    echo "=== Test: Circular dependency depth 1 (A → B → A) ==="
    cat > "$TEST_DIR/.claude/workflows/test/workflow-a.md" << 'EOF'
---
name: workflow-a
description: Workflow A
triggers: [a]
skills: [test-skill]
calls: [workflow-b]
---
# Workflow A
EOF
    cat > "$TEST_DIR/.claude/workflows/test/workflow-b.md" << 'EOF'
---
name: workflow-b
description: Workflow B
triggers: [b]
skills: [test-skill]
calls: [workflow-a]
---
# Workflow B
EOF
    assert_output_contains "Circular dependency detected" "Cycle"
}

test_circular_dependency_depth2() {
    echo ""
    echo "=== Test: Circular dependency depth 2 (A → B → C → A) ==="
    cat > "$TEST_DIR/.claude/workflows/test/workflow-a.md" << 'EOF'
---
name: workflow-a
description: Workflow A
triggers: [a]
skills: [test-skill]
calls: [workflow-b]
---
# Workflow A
EOF
    cat > "$TEST_DIR/.claude/workflows/test/workflow-b.md" << 'EOF'
---
name: workflow-b
description: Workflow B
triggers: [b]
skills: [test-skill]
calls: [workflow-c]
---
# Workflow B
EOF
    cat > "$TEST_DIR/.claude/workflows/test/workflow-c.md" << 'EOF'
---
name: workflow-c
description: Workflow C
triggers: [c]
skills: [test-skill]
calls: [workflow-a]
---
# Workflow C
EOF
    assert_output_contains "Circular dependency depth 2 detected" "Cycle"
}

test_subskill_exists() {
    echo ""
    echo "=== Test: Sub-skill declared and exists ==="
    # Clean up previous workflows
    rm -f "$TEST_DIR/.claude/workflows/test/"*.md
    cat > "$TEST_DIR/.claude/workflows/test/simple.md" << 'EOF'
---
name: simple
description: Simple workflow
triggers: [test]
skills: [test-skill]
---
# Simple
EOF

    cat > "$TEST_DIR/.claude/skills/test-skill/SKILL.md" << 'EOF'
---
name: test-skill
description: A test skill
tags: [test]
sub-skills: [unit, integration]
---
# Test Skill
EOF
    cat > "$TEST_DIR/.claude/skills/test-skill/unit.md" << 'EOF'
# Unit testing
EOF
    cat > "$TEST_DIR/.claude/skills/test-skill/integration.md" << 'EOF'
# Integration testing
EOF
    assert_pass "Sub-skills declared and existing passes"
}

test_subskill_missing() {
    echo ""
    echo "=== Test: Sub-skill declared but missing ==="
    cat > "$TEST_DIR/.claude/skills/test-skill/SKILL.md" << 'EOF'
---
name: test-skill
description: A test skill
tags: [test]
sub-skills: [unit, missing-subskill]
---
# Test Skill
EOF
    assert_fail "Missing sub-skill fails validation"
}

test_valid_role() {
    echo ""
    echo "=== Test: Valid role ==="
    # Restore valid skill
    cat > "$TEST_DIR/.claude/skills/test-skill/SKILL.md" << 'EOF'
---
name: test-skill
description: A test skill
tags: [test]
---
# Test Skill
EOF

    cat > "$TEST_DIR/.claude/roles/test-role.md" << 'EOF'
---
name: test-role
description: A test role
level: implementation
skills: [test-skill]
---

# Test Role
EOF
    assert_pass "Valid role passes validation"
}

# =====================================================
# MAIN
# =====================================================

echo "=========================================="
echo "  Architecture Validation Test Suite"
echo "=========================================="

trap teardown EXIT

setup

test_valid_skill
test_skill_missing_frontmatter
test_valid_workflow
test_workflow_calls_nonexistent
test_circular_dependency_depth1
test_circular_dependency_depth2
test_subskill_exists
test_subskill_missing
test_valid_role

TOTAL_TESTS=$((TESTS_PASSED + TESTS_FAILED))

echo ""
echo "=========================================="
echo "           TEST SUMMARY"
echo "=========================================="
echo ""
echo "  Tests run:    $TOTAL_TESTS"
echo "  Passed:       $TESTS_PASSED"
echo "  Failed:       $TESTS_FAILED"
echo ""
echo "  Coverage:"
echo "  - Structure validation     ✓"
echo "  - Frontmatter validation   ✓"
echo "  - Workflow call validation ✓"
echo "  - Circular deps detection  ✓"
echo "  - Sub-skill validation     ✓"
echo "  - Role validation          ✓"
echo ""
echo "=========================================="

if [ $TESTS_FAILED -gt 0 ]; then
    echo -e "${RED}FAILED${NC}"
    exit 1
else
    echo -e "${GREEN}ALL TESTS PASSED${NC}"
    exit 0
fi

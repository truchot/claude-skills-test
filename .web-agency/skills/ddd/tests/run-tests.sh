#!/bin/bash

# Run validation tests for DDD skill
# Usage: ./run-tests.sh [--all|--agents|--content|--routing|--examples]

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

echo "╔════════════════════════════════════════════════════════════════╗"
echo "║           DDD Skill Validation Test Suite                      ║"
echo "╚════════════════════════════════════════════════════════════════╝"
echo ""

TOTAL_PASSED=0
TOTAL_FAILED=0

run_test() {
  local test_name=$1
  local test_file=$2

  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  echo "🧪 Running: $test_name"
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

  if node "$SCRIPT_DIR/$test_file"; then
    echo "✅ $test_name: PASSED"
  else
    echo "❌ $test_name: FAILED"
    TOTAL_FAILED=$((TOTAL_FAILED + 1))
  fi
  echo ""
}

case "${1:-all}" in
  --agents)
    run_test "Agent Structure" "validate-agents.test.js"
    ;;
  --content)
    run_test "Content Quality" "validate-content.test.js"
    ;;
  --routing)
    run_test "Routing Configuration" "validate-routing.test.js"
    ;;
  --examples)
    run_test "Code Examples" "validate-examples.test.js"
    ;;
  --all|*)
    run_test "Agent Structure" "validate-agents.test.js"
    run_test "Content Quality" "validate-content.test.js"
    run_test "Routing Configuration" "validate-routing.test.js"
    run_test "Code Examples" "validate-examples.test.js"
    ;;
esac

echo "════════════════════════════════════════════════════════════════"
if [ $TOTAL_FAILED -eq 0 ]; then
  echo "✅ All test suites passed!"
else
  echo "❌ $TOTAL_FAILED test suite(s) failed"
  exit 1
fi
echo "════════════════════════════════════════════════════════════════"

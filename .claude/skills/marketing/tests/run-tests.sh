#!/bin/bash
#
# Run all marketing skill validation tests
#

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

echo "=============================================="
echo "  Marketing Skill Test Suite"
echo "=============================================="
echo ""
echo "Running tests..."
echo ""

# Run each test suite
node "$SCRIPT_DIR/validate-skill.test.js" || exit 1
echo ""

node "$SCRIPT_DIR/validate-agents.test.js" || exit 1
echo ""

node "$SCRIPT_DIR/validate-routing.test.js" || exit 1
echo ""

node "$SCRIPT_DIR/validate-seo.test.js" || exit 1
echo ""

echo "=============================================="
echo "  All tests completed successfully!"
echo "=============================================="
